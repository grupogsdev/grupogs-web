import Link from "next/link";
import { SITE, OFFICES, SOCIAL, SERVICES, COLORS } from "@/lib/constants";
import { Facebook, Instagram } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div>
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white text-sm mb-4"
              style={{ backgroundColor: COLORS.primary }}
            >
              GS
            </div>
            <p className="text-sm mb-2">
              {SITE.slogan} para tu empresa y hogar
            </p>
            <p className="text-xs text-gray-400">
              Control de plagas y lavado de tanques
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Servicios</h4>
            <ul className="space-y-2">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/servicios/${s.slug}`}
                    className="text-sm hover:text-white transition"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/galeria" className="text-sm hover:text-white transition">
                  Galería
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm hover:text-white transition">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="tel:+573218992537" className="hover:text-white">
                  Tel: +57 321 8992537
                </a>
              </li>
              <li>
                <a href="tel:+573137407078" className="hover:text-white">
                  Tel: +57 313 7407078
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${SITE.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  WhatsApp: +57 321 8992537
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="hover:text-white">
                  {SITE.email}
                </a>
              </li>
              <li>Horario: 24/7</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/politica-privacidad" className="hover:text-white">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/terminos-condiciones" className="hover:text-white">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="/politica-cookies" className="hover:text-white">
                  Política de Cookies
                </Link>
              </li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a
                href={SOCIAL.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>
            © {currentYear} {SITE.name}. Todos los derechos reservados.
          </p>
          <p className="mt-1 text-xs">
            Oficinas: Barranquilla · Cartagena · Sincelejo - Sucre · Valledupar - Cesar
          </p>
        </div>
      </div>
    </footer>
  );
}
