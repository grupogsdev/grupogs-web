import Link from "next/link";
import { SITE, SERVICES, COLORS, TESTIMONIALS, CLIENT_LOGOS } from "@/lib/constants";
import { Bug, Droplets, ArrowRight } from "lucide-react";
import { Testimonials } from "@/components/Testimonials";
import { NewsletterForm } from "@/components/NewsletterForm";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

async function getLatestPosts() {
  if (!db) return [];
  return db
    .select({ slug: posts.slug, title: posts.title, createdAt: posts.createdAt })
    .from(posts)
    .where(eq(posts.published, "published"))
    .orderBy(desc(posts.createdAt))
    .limit(3);
}

export default async function Home() {
  const latestPosts = await getLatestPosts();
  return (
    <>
      <section className="relative bg-gradient-to-br from-gray-50 to-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              {SITE.slogan} para su empresa y hogar
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Control de plagas y lavado de tanques. Servicios profesionales.
              Conoce más sobre nosotros.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/cotizacion"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold text-white transition hover:opacity-90"
                style={{ backgroundColor: COLORS.primary }}
              >
                Cotiza tu servicio
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold border-2 border-gray-300 text-gray-700 hover:border-[var(--primary)] hover:text-[var(--primary)] transition"
              >
                Contactar
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Te entregamos las mejores soluciones para ti y tu compañía
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/servicios/${service.slug}`}
                className="group block p-6 lg:p-8 rounded-2xl border border-gray-200 hover:border-[var(--primary)] hover:shadow-xl transition"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${COLORS.primary}20` }}
                >
                  {service.slug === "control-de-plagas" ? (
                    <Bug size={28} style={{ color: COLORS.primary }} />
                  ) : (
                    <Droplets size={28} style={{ color: COLORS.primary }} />
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[var(--primary)] transition">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">{service.shortDesc}</p>
                <span className="inline-flex items-center gap-1 font-semibold text-[var(--primary)]">
                  Conocer más
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Sobre Grupo GS
              </h2>
              <p className="text-gray-600 mb-4">
                {SITE.name} es una empresa constituida legalmente, fundada en{" "}
                {SITE.founded} en Barranquilla por el {SITE.founder}.
              </p>
              <p className="text-gray-600 mb-6">
                Más de 14 años de experiencia en control de plagas y lavado de
                tanques. Cobertura en el Caribe, Bogotá y Panamá. Atención 24/7.
              </p>
              <Link
                href="/nosotros"
                className="inline-flex items-center gap-2 font-semibold text-[var(--primary)] hover:underline"
              >
                Conocer más sobre nosotros
                <ArrowRight size={18} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-xl bg-white border border-gray-200 text-center">
                <span className="text-3xl font-bold text-[var(--primary)]">14+</span>
                <p className="text-sm text-gray-600 mt-1">Años de experiencia</p>
              </div>
              <div className="p-6 rounded-xl bg-white border border-gray-200 text-center">
                <span className="text-3xl font-bold text-[var(--primary)]">24/7</span>
                <p className="text-sm text-gray-600 mt-1">Atención</p>
              </div>
              <div className="p-6 rounded-xl bg-white border border-gray-200 text-center col-span-2">
                <span className="text-3xl font-bold text-[var(--primary)]">Caribe + Bogotá + Panamá</span>
                <p className="text-sm text-gray-600 mt-1">Cobertura nacional e internacional</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestros clientes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Empresas que confían en nosotros</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            {CLIENT_LOGOS.map((c) => (
              <div
                key={c.name}
                className="w-20 h-20 rounded-full flex items-center justify-center font-bold text-gray-600 bg-gray-100 border-2 border-gray-200 text-sm"
              >
                {c.initials}
              </div>
            ))}
          </div>

          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Lo que dicen nuestros clientes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Testimonios y reseñas de quienes nos eligieron</p>
          </div>
          <Testimonials testimonials={TESTIMONIALS} columns={3} showAll={false} />
          <div className="mt-12 text-center">
            <Link
              href="/clientes"
              className="inline-flex items-center gap-2 font-semibold text-[var(--primary)] hover:underline"
            >
              Ver todos los testimonios
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Galería</h2>
              <p className="text-gray-600 mb-6">Algunos de nuestros trabajos en control de plagas y lavado de tanques</p>
              <Link
                href="/galeria"
                className="inline-flex items-center gap-2 font-semibold text-[var(--primary)] hover:underline"
              >
                Ver galería completa
                <ArrowRight size={18} />
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((i) => (
                <Link
                  key={i}
                  href="/galeria"
                  className="aspect-square rounded-xl bg-gray-200 flex items-center justify-center text-gray-400 text-sm hover:bg-gray-300 transition"
                >
                  Trabajo {i}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Blog</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Consejos, noticias e ideas para tu hogar y oficina</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {latestPosts.length === 0 ? (
              <p className="col-span-3 text-center text-gray-500 py-8">Próximamente artículos del blog.</p>
            ) : (
              latestPosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="block p-5 rounded-xl border border-gray-200 hover:border-[var(--primary)] hover:shadow-lg transition"
                >
                  <p className="text-xs text-gray-500 mb-2">
                    {new Date(p.createdAt).toLocaleDateString("es-CO", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                  <h3 className="font-bold text-gray-900">{p.title}</h3>
                </Link>
              ))
            )}
          </div>
          <div className="text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-semibold text-[var(--primary)] hover:underline"
            >
              Ver todos los artículos
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Newsletter</h2>
          <p className="text-gray-600 mb-6">
            Recibe noticias, consejos y ofertas de Grupo GS
          </p>
          <NewsletterForm />
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            ¿Listo para cotizar?
          </h2>
          <p className="text-gray-600 mb-8">
            Solicita tu cotización sin compromiso. Te respondemos en menos de 24 horas.
          </p>
          <Link
            href="/cotizacion"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-white transition hover:opacity-90"
            style={{ backgroundColor: COLORS.primary }}
          >
            Solicitar cotización
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </>
  );
}
