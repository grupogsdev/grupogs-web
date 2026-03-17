import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

export const metadata: Metadata = {
  title: "Blog | Grupo GS",
  description: "Consejos, noticias e ideas sobre control de plagas y lavado de tanques.",
};

async function getPosts() {
  if (!db) return [];
  return db
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
    .orderBy(desc(posts.createdAt));
}

export default async function BlogPage() {
  const postsList = await getPosts();

  return (
    <>
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Consejos, noticias e ideas para tu hogar y oficina
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {postsList.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <p className="text-lg">Próximamente publicaremos artículos aquí.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {postsList.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="block group rounded-xl border border-gray-200 bg-white overflow-hidden hover:border-[var(--primary)] hover:shadow-lg transition"
                >
                  {post.imageUrl ? (
                    <div className="aspect-video bg-gray-200 overflow-hidden">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-gray-100 flex items-center justify-center">
                      <span className="text-4xl text-gray-300">GS</span>
                    </div>
                  )}
                  <div className="p-5">
                    <p className="text-sm text-gray-500 mb-2">
                      {new Date(post.createdAt).toLocaleDateString("es-CO", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <h2 className="font-bold text-gray-900 text-lg group-hover:text-[var(--primary)] transition">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-gray-600 text-sm mt-2 line-clamp-2">{post.excerpt}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
