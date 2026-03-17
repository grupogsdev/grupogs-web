"use client";

import { useState } from "react";
import { SERVICES, COLORS } from "@/lib/constants";

const TIPOS = ["Empresa", "Casa", "Apartamento", "Otro"] as const;
const CIUDADES = [
  "Barranquilla",
  "Cartagena",
  "Santa Marta",
  "Montería",
  "Valledupar",
  "Sincelejo",
  "Bogotá",
  "Otra",
] as const;
const FRECUENCIAS = ["Única", "Mensual", "Trimestral", "Anual"] as const;

export function CotizacionForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      const res = await fetch("/api/cotizacion", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 rounded-2xl border border-gray-200 bg-white">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de inmueble *</label>
        <select
          name="tipo"
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--primary)]"
        >
          {TIPOS.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Servicio *</label>
        <select
          name="servicio"
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--primary)]"
        >
          {SERVICES.map((s) => (
            <option key={s.slug} value={s.slug}>{s.title}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Ciudad *</label>
        <select
          name="ciudad"
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--primary)]"
        >
          {CIUDADES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Descripción del requerimiento *</label>
        <textarea
          name="descripcion"
          required
          rows={4}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--primary)]"
          placeholder="Describe brevemente tu necesidad"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Frecuencia deseada</label>
        <select
          name="frecuencia"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--primary)]"
        >
          {FRECUENCIAS.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>
      <hr />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Nombre completo *</label>
        <input
          name="nombre"
          type="text"
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--primary)]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
        <input
          name="email"
          type="email"
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--primary)]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono / WhatsApp *</label>
        <input
          name="telefono"
          type="tel"
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--primary)]"
        />
      </div>
      <div className="flex items-start gap-2">
        <input
          id="politica"
          name="politica"
          type="checkbox"
          required
          className="mt-1 rounded"
        />
        <label htmlFor="politica" className="text-sm text-gray-600">
          Acepto la{" "}
          <a href="/politica-privacidad" className="text-[var(--primary)] hover:underline">
            Política de Privacidad
          </a>
        </label>
      </div>
      {status === "success" && (
        <p className="text-green-600 font-medium">Cotización enviada. Te contactaremos pronto.</p>
      )}
      {status === "error" && (
        <p className="text-red-600 font-medium">Error al enviar. Intenta de nuevo.</p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full py-4 rounded-lg font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
        style={{ backgroundColor: COLORS.primary }}
      >
        {status === "sending" ? "Enviando..." : "Solicitar cotización"}
      </button>
    </form>
  );
}
