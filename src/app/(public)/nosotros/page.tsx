import type { Metadata } from "next";
import Link from "next/link";
import { SITE, COLORS, TESTIMONIALS } from "@/lib/constants";
import { Target, Eye, Award, ArrowRight } from "lucide-react";
import { Testimonials } from "@/components/Testimonials";

export const metadata: Metadata = {
  title: "Nosotros | Grupo GS Servicios Empresariales",
  description:
    "Grupo GS fundada en 2011 en Barranquilla. Misión, visión, valores. Control de plagas y lavado de tanques en el Caribe.",
};

const VALUES = [
  {
    title: "Responsabilidad",
    desc: "Capacidad para dar respuesta a los compromisos asumidos con nuestros clientes.",
  },
  {
    title: "Calidad",
    desc: "Satisfacer las necesidades relacionadas con los servicios prestados.",
  },
  {
    title: "Honestidad",
    desc: "Transparencia en cada proceso y comunicación con el cliente.",
  },
  {
    title: "Integridad",
    desc: "Compromiso con la ética y los más altos estándares profesionales.",
  },
];

export default function NosotrosPage() {
  return (
    <>
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Nosotros</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            {SITE.name} es una empresa constituida legalmente, fundada en{" "}
            {SITE.founded} en Barranquilla por el {SITE.founder}.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Target size={28} style={{ color: COLORS.primary }} />
                Misión
              </h2>
              <p className="text-gray-600">
                {SITE.name} es una organización comprometida en desarrollar
                Control de Plagas y Lavado de Tanques, servicios inscritos en
                el objeto social ante Cámara de Comercio. Garantizamos un
                servicio de calidad, seguro y con disponibilidad permanente que
                permite el cumplimiento de los requisitos del cliente.
                Aportamos crecimiento en el desarrollo de nuestros
                colaboradores, contribución activa a la comunidad y una cultura
                ambiental favorable.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Eye size={28} style={{ color: COLORS.primary }} />
                Visión
              </h2>
              <p className="text-gray-600">
                Lograr un posicionamiento a nivel nacional, brindando un
                servicio con altos niveles de calidad por profesionales que cada
                día se actualizan, con el fin de generar gran satisfacción a
                todos nuestros clientes, manteniendo el compromiso por el medio
                ambiente y la seguridad y salud de nuestros trabajadores.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Una empresa con valores
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="p-6 rounded-xl bg-white border border-gray-200"
              >
                <Award size={32} style={{ color: COLORS.primary }} className="mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-600">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Lo que dicen quienes nos conocen
          </h2>
          <Testimonials testimonials={TESTIMONIALS} columns={3} showAll={false} />
        </div>
      </section>

      <section id="servicios" className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Nuestros servicios
          </h2>
          <p className="text-gray-600 mb-8">
            Control de plagas y lavado de tanques profesionales
          </p>
          <Link
            href="/servicios"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-white transition hover:opacity-90"
            style={{ backgroundColor: COLORS.primary }}
          >
            Ver servicios
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </>
  );
}
