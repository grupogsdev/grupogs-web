import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES, COLORS, TESTIMONIALS } from "@/lib/constants";
import { Droplets, ArrowRight, Check } from "lucide-react";
import { Testimonials } from "@/components/Testimonials";

const service = SERVICES.find((s) => s.slug === "lavado-tanques")!;

export const metadata: Metadata = {
  title: "Lavado de Tanques Barranquilla | Decreto 1575 | Grupo GS",
  description:
    "Lavado y desinfección de tanques de agua potable. Cumplimiento normativo. Soledad, Malambo, Caribe.",
};

export default function LavadoTanquesPage() {
  return (
    <>
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${COLORS.primary}20` }}
            >
              <Droplets size={32} style={{ color: COLORS.primary }} />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">{service.title}</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl">{service.shortDesc}</p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Descripción del servicio
              </h2>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <Link
                href="/cotizacion"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-white transition hover:opacity-90"
                style={{ backgroundColor: COLORS.primary }}
              >
                Solicitar cotización
                <ArrowRight size={20} />
              </Link>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Incluye
              </h2>
              <ul className="space-y-3">
                {service.techniques.map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <Check size={20} style={{ color: COLORS.primary }} />
                    <span className="text-gray-700">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Lo que dicen nuestros clientes
          </h2>
          <Testimonials testimonials={TESTIMONIALS.filter((t) => t.role.includes("Yesos") || t.role.includes("Davivienda") || t.role.includes("ICBF"))} columns={2} showAll={true} />
        </div>
      </section>
    </>
  );
}
