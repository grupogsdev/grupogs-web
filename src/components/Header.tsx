"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { SITE, COLORS } from "@/lib/constants";

export function Header() {
  const [open, setOpen] = useState(false);
  const [serviciosOpen, setServiciosOpen] = useState(false);

  const mainNav = [
    { href: "/", label: "Inicio" },
    { href: "/nosotros", label: "Nosotros" },
    { href: "/clientes", label: "Clientes" },
    { href: "/contacto", label: "Contacto" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center font-bold text-white text-sm"
              style={{ backgroundColor: COLORS.primary }}
            >
              GS
            </div>
            <span className="font-bold text-xl text-gray-900 hidden sm:inline">
              {SITE.shortName}
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {mainNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-[var(--primary)] font-medium transition"
              >
                {link.label}
              </Link>
            ))}

            <div
              className="relative"
              onMouseEnter={() => setServiciosOpen(true)}
              onMouseLeave={() => setServiciosOpen(false)}
            >
              <Link
                href="/servicios"
                className="flex items-center gap-1 text-gray-700 hover:text-[var(--primary)] font-medium transition"
              >
                Servicios
                <ChevronDown size={18} className={serviciosOpen ? "rotate-180" : ""} />
              </Link>
              {serviciosOpen && (
                <div className="absolute top-full left-0 mt-1 py-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                  <Link
                    href="/servicios/control-de-plagas"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[var(--primary)]"
                    onClick={() => setServiciosOpen(false)}
                  >
                    Control de Plagas
                  </Link>
                  <Link
                    href="/servicios/lavado-tanques"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[var(--primary)]"
                    onClick={() => setServiciosOpen(false)}
                  >
                    Lavado de Tanques
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/cotizacion"
              className="px-5 py-2.5 rounded-lg font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: COLORS.primary }}
            >
              Cotizar
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-[var(--primary)] whitespace-nowrap"
            >
              <Phone size={18} />
              {SITE.phone}
            </a>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              aria-label="Menú"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col gap-1">
              <Link href="/" onClick={() => setOpen(false)} className="py-2.5 px-3 rounded-lg hover:bg-gray-100 font-medium">
                Inicio
              </Link>
              <Link href="/nosotros" onClick={() => setOpen(false)} className="py-2.5 px-3 rounded-lg hover:bg-gray-100 font-medium">
                Nosotros
              </Link>
              <Link href="/servicios" onClick={() => setOpen(false)} className="py-2.5 px-3 rounded-lg hover:bg-gray-100 font-medium">
                Servicios
              </Link>
              <Link href="/servicios/control-de-plagas" onClick={() => setOpen(false)} className="py-2 px-3 pl-6 rounded-lg hover:bg-gray-100 text-sm text-gray-600">
                Control de Plagas
              </Link>
              <Link href="/servicios/lavado-tanques" onClick={() => setOpen(false)} className="py-2 px-3 pl-6 rounded-lg hover:bg-gray-100 text-sm text-gray-600">
                Lavado de Tanques
              </Link>
              <Link href="/clientes" onClick={() => setOpen(false)} className="py-2.5 px-3 rounded-lg hover:bg-gray-100 font-medium">
                Clientes
              </Link>
              <Link href="/contacto" onClick={() => setOpen(false)} className="py-2.5 px-3 rounded-lg hover:bg-gray-100 font-medium">
                Contacto
              </Link>
              <Link
                href="/cotizacion"
                onClick={() => setOpen(false)}
                className="mt-2 py-3 px-4 rounded-lg font-semibold text-white text-center"
                style={{ backgroundColor: COLORS.primary }}
              >
                Cotizar
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
