import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES, COLORS } from "@/lib/constants";
import { Bug, Droplets, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Servicios | Control Plagas y Lavado Tanques",
  description:
    "Control de plagas y lavado de tanques. Fumigación, MIP, nebulización. Lavado y desinfección decreto 1575. Barranquilla, Cartagena, Caribe.",
};

export default function ServiciosPage() {
  return (
    <>
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Nuestros Servicios
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Las mejores soluciones para tu hogar, oficina y compañía pensando en tu bienestar
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/servicios/${service.slug}`}
                className="group block p-8 rounded-2xl border-2 border-gray-200 hover:border-[var(--primary)] hover:shadow-xl transition"
              >
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${COLORS.primary}20` }}
                >
                  {service.slug === "control-de-plagas" ? (
                    <Bug size={32} style={{ color: COLORS.primary }} />
                  ) : (
                    <Droplets size={32} style={{ color: COLORS.primary }} />
                  )}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[var(--primary)] transition">
                  {service.title}
                </h2>
                <p className="text-gray-600 mb-4">{service.shortDesc}</p>
                <span className="inline-flex items-center gap-1 font-semibold text-[var(--primary)]">
                  Ver detalles
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
