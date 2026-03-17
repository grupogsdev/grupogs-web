import { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { SERVICES } from "@/lib/constants";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE.url;
  const blogPosts: MetadataRoute.Sitemap = [];
  if (db) {
    const published = await db
      .select({ slug: posts.slug, updatedAt: posts.updatedAt })
      .from(posts)
      .where(eq(posts.published, "published"));
    blogPosts.push(
      ...published.map((p) => ({
        url: `${base}/blog/${p.slug}`,
        lastModified: p.updatedAt,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      }))
    );
  }
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/nosotros`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/servicios`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    ...SERVICES.map((s) => ({
      url: `${base}/servicios/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${base}/clientes`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/galeria`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    ...blogPosts,
    { url: `${base}/contacto`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/cotizacion`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/politica-privacidad`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terminos-condiciones`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/politica-cookies`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];
}
