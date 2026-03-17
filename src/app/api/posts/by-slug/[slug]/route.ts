import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    if (!db) return NextResponse.json({ error: "BD no configurada" }, { status: 503 });

    const { slug } = await params;
    const [post] = await db
      .select()
      .from(posts)
      .where(and(eq(posts.slug, slug), eq(posts.published, "published")))
      .limit(1);

    if (!post) return NextResponse.json({ error: "Post no encontrado" }, { status: 404 });
    return NextResponse.json(post);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Error al obtener post" }, { status: 500 });
  }
}
