import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  return session?.value === "authenticated";
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!db) return NextResponse.json({ error: "BD no configurada" }, { status: 503 });

    const { id } = await params;
    const idNum = parseInt(id, 10);
    if (Number.isNaN(idNum)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const [post] = await db.select().from(posts).where(eq(posts.id, idNum)).limit(1);
    if (!post) return NextResponse.json({ error: "Post no encontrado" }, { status: 404 });

    return NextResponse.json(post);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Error al obtener post" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await checkAuth())) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    if (!db) return NextResponse.json({ error: "BD no configurada" }, { status: 503 });

    const { id } = await params;
    const idNum = parseInt(id, 10);
    if (Number.isNaN(idNum)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const body = await request.json();
    const { title, excerpt, content, imageUrl, published, slug } = body;

    if (!title || !content) {
      return NextResponse.json({ error: "Título y contenido son requeridos" }, { status: 400 });
    }

    const [updated] = await db
      .update(posts)
      .set({
        title: String(title).trim(),
        excerpt: excerpt ? String(excerpt).trim() : null,
        content: String(content).trim(),
        imageUrl: imageUrl ? String(imageUrl).trim() : null,
        published: published === "published" ? "published" : "draft",
        slug: slug ? String(slug).trim() : undefined,
        updatedAt: new Date(),
      })
      .where(eq(posts.id, idNum))
      .returning();

    if (!updated) return NextResponse.json({ error: "Post no encontrado" }, { status: 404 });
    return NextResponse.json(updated);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Error al actualizar post" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await checkAuth())) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    if (!db) return NextResponse.json({ error: "BD no configurada" }, { status: 503 });

    const { id } = await params;
    const idNum = parseInt(id, 10);
    if (Number.isNaN(idNum)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    await db.delete(posts).where(eq(posts.id, idNum));
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Error al eliminar post" }, { status: 500 });
  }
}
