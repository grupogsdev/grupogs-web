import type { Metadata } from "next";
import { CLIENT_LOGOS, TESTIMONIALS } from "@/lib/constants";
import { Testimonials } from "@/components/Testimonials";

export const metadata: Metadata = {
  title: "Clientes | Grupo GS",
  description: "Clientes que confiaron en Grupo GS. Testimonios y reseñas de control de plagas y lavado de tanques.",
};

export default function ClientesPage() {
  return (
    <>
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Nuestros clientes</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Ellos confiaron en nosotros. Conoce sus experiencias.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Empresas que nos eligen
          </h2>
          <div className="flex flex-wrap justify-center gap-8 mb-20">
            {CLIENT_LOGOS.map((c) => (
              <div
                key={c.name}
                className="w-24 h-24 rounded-full flex items-center justify-center font-bold text-gray-600 bg-gray-100 border-2 border-gray-200 text-base hover:border-[var(--primary)] transition"
                title={c.name}
              >
                {c.initials}
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Testimonios y reseñas
          </h2>
          <Testimonials testimonials={TESTIMONIALS} columns={3} showAll={true} />
        </div>
      </section>
    </>
  );
}
