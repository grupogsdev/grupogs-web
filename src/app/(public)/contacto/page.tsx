import type { Metadata } from "next";
import { SITE, OFFICES, COLORS } from "@/lib/constants";
import { ContactForm } from "@/components/ContactForm";
import { Phone, Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contacto Grupo GS | Fumigación y Lavado Tanques | Barranquilla",
  description:
    "Cotiza, agenda o consulta. WhatsApp 310 648 8113. Oficinas en Barranquilla, Cartagena, Santa Marta.",
};

export default function ContactoPage() {
  return (
    <>
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contacto</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Cotiza, agenda o consulta. Estamos para atenderte
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Datos de contacto
              </h2>
              <p className="text-gray-600 mb-6">{SITE.slogan} para tu empresa y hogar</p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <Phone size={24} style={{ color: COLORS.primary }} />
                  <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="hover:underline">
                    {SITE.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={24} style={{ color: COLORS.primary }} />
                  <a href={`mailto:${SITE.email}`} className="hover:underline">
                    {SITE.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={24} style={{ color: COLORS.primary }} className="flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Horario: 24/7</p>
                    <p className="text-sm text-gray-600">Oficinas en todo el Caribe</p>
                  </div>
                </li>
              </ul>
              <div className="mt-8">
                <h3 className="font-bold text-gray-900 mb-3">Oficinas</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  {OFFICES.slice(0, 5).map((o) => (
                    <li key={o.city}>
                      <strong>{o.city}:</strong> {o.address}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
