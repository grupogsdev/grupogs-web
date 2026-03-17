import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const POSTS: Record<string, { title: string; date: string; content: string }> = {
  "prevencion-control-plagas": {
    title: "Prevencion y control de plagas",
    date: "2020-08-15",
    content: "Consejos para prevenir y controlar plagas en tu hogar o empresa.",
  },
  "plagas-historia": {
    title: "Las plagas en la historia",
    date: "2020-07-12",
    content: "Breve recorrido por la historia del control de plagas.",
  },
  "limpiar-hogar": {
    title: "El secreto de limpiar su hogar",
    date: "2020-05-26",
    content: "Tips para mantener tu hogar limpio y libre de plagas.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) return { title: "Blog | Grupo GS" };
  return { title: `${post.title} | Grupo GS` };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <Link href="/blog" className="text-[var(--primary)] hover:underline mb-6 inline-block">
        Volver al blog
      </Link>
      <p className="text-gray-500 text-sm mb-2">{post.date}</p>
      <h1 className="text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>
      <p className="text-gray-600">{post.content}</p>
    </div>
  );
}
