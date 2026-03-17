import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { CotizacionForm } from "@/components/CotizacionForm";

export const metadata: Metadata = {
  title: "Cotización | Grupo GS",
  description: "Solicita cotización para control de plagas o lavado de tanques.",
};

export default function CotizacionPage() {
  return (
    <>
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Cotiza tu servicio
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Escoge tu servicio y si necesitas algo a la medida nosotros lo cotizamos
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <CotizacionForm />
          <p className="mt-6 text-center text-gray-600 text-sm">
            Prefieres WhatsApp?{" "}
            <a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[var(--primary)] hover:underline"
            >
              Escríbenos directamente
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
