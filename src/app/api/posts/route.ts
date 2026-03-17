import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { desc, asc, eq } from "drizzle-orm";
import { slugify } from "@/lib/slug";

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  return session?.value === "authenticated";
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const publicOnly = searchParams.get("public") === "true";
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    if (!db) {
      return NextResponse.json({ error: "BD no configurada" }, { status: 503 });
    }

    const orderBy =
      sortBy === "title"
        ? sortOrder === "asc"
          ? asc(posts.title)
          : desc(posts.title)
        : sortBy === "slug"
          ? sortOrder === "asc"
            ? asc(posts.slug)
            : desc(posts.slug)
          : sortOrder === "asc"
            ? asc(posts.createdAt)
            : desc(posts.createdAt);

    if (publicOnly) {
      const data = await db
        .select({
          id: posts.id,
          slug: posts.slug,
          title: posts.title,
          excerpt: posts.excerpt,
          imageUrl: posts.imageUrl,
          createdAt: posts.createdAt,
        })
        .from(posts)
        .where(eq(posts.published, "published"))
        .orderBy(orderBy);
      return NextResponse.json(data);
    }

    const isAuth = await checkAuth();
    if (!isAuth) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const data = await db.select().from(posts).orderBy(orderBy);
    return NextResponse.json(data);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Error al obtener posts" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!(await checkAuth())) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    if (!db) return NextResponse.json({ error: "BD no configurada" }, { status: 503 });

    const body = await request.json();
    const { title, excerpt, content, imageUrl, published, slug: slugInput } = body;

    if (!title || !content) {
      return NextResponse.json({ error: "Título y contenido son requeridos" }, { status: 400 });
    }

    const baseSlug = slugify(slugInput && String(slugInput).trim() ? String(slugInput).trim() : title);
    let slug = baseSlug;
    let counter = 1;
    let existing = await db.select().from(posts).where(eq(posts.slug, slug)).limit(1);
    while (existing.length > 0) {
      slug = `${baseSlug}-${counter}`;
      counter++;
      existing = await db.select().from(posts).where(eq(posts.slug, slug)).limit(1);
    }

    const [post] = await db
      .insert(posts)
      .values({
        slug,
        title: String(title).trim(),
        excerpt: excerpt ? String(excerpt).trim() : null,
        content: String(content).trim(),
        imageUrl: imageUrl ? String(imageUrl).trim() : null,
        published: published === "published" ? "published" : "draft",
      })
      .returning();

    return NextResponse.json(post);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Error al crear post" }, { status: 500 });
  }
}
