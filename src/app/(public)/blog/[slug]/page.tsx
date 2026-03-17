import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!db) return { title: "Blog | Grupo GS" };
  const [post] = await db
    .select({ title: posts.title, excerpt: posts.excerpt })
    .from(posts)
    .where(and(eq(posts.slug, slug), eq(posts.published, "published")))
    .limit(1);
  if (!post) return { title: "Blog | Grupo GS" };
  return {
    title: `${post.title} | Grupo GS`,
    description: post.excerpt ?? undefined,
  };
}

async function getPost(slug: string) {
  if (!db) return null;
  const [post] = await db
    .select()
    .from(posts)
    .where(and(eq(posts.slug, slug), eq(posts.published, "published")))
    .limit(1);
  return post;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <article className="max-w-3xl mx-auto px-4 py-16">
      <Link href="/blog" className="text-[var(--primary)] hover:underline mb-6 inline-block">
        ← Volver al blog
      </Link>

      {post.imageUrl && (
        <div className="aspect-video rounded-xl overflow-hidden mb-8 bg-gray-100">
          <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}

      <p className="text-gray-500 text-sm mb-2">
        {new Date(post.createdAt).toLocaleDateString("es-CO", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
      <h1 className="text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>
      <div className="prose prose-lg max-w-none text-gray-600 whitespace-pre-wrap">
        {post.content}
      </div>
    </article>
  );
}
