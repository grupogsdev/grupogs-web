import { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { SERVICES } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
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
    { url: `${base}/contacto`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/cotizacion`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/politica-privacidad`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terminos-condiciones`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/politica-cookies`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];
}
