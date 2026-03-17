"use client";

import { useState } from "react";
import { SERVICES, COLORS } from "@/lib/constants";

function generateCaptcha(): { question: string; answer: number } {
  const ops = [
    () => {
      const a = Math.floor(Math.random() * 9) + 1;
      const b = Math.floor(Math.random() * 9) + 1;
      return { question: `${a} + ${b}`, answer: a + b };
    },
    () => {
      const a = Math.floor(Math.random() * 9) + 5;
      const b = Math.floor(Math.random() * 4) + 1;
      return { question: `${a} - ${b}`, answer: a - b };
    },
    () => {
      const a = Math.floor(Math.random() * 5) + 2;
      const b = Math.floor(Math.random() * 5) + 2;
      return { question: `${a} × ${b}`, answer: a * b };
    },
  ];
  return ops[Math.floor(Math.random() * ops.length)]();
}

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
  const [captcha, setCaptcha] = useState(() => generateCaptcha());
  const resetCaptcha = () => setCaptcha(generateCaptcha());

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      ...Object.fromEntries(formData),
      captchaAnswer: formData.get("captchaAnswer"),
      captchaExpected: captcha.answer,
    };
    try {
      const res = await fetch("/api/cotizacion", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      const json = await res.json();
      if (res.ok) {
        setStatus("success");
        form.reset();
        resetCaptcha();
      } else {
        setStatus("error");
        if (json?.error?.includes("captcha")) resetCaptcha();
      }
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
      <div>
        <label htmlFor="captchaAnswer" className="block text-sm font-medium text-gray-700 mb-2">
          ¿Cuánto es {captcha.question}? *
        </label>
        <input
          id="captchaAnswer"
          name="captchaAnswer"
          type="number"
          required
          min={0}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--primary)]"
          placeholder="Respuesta"
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
        <p className="text-red-600 font-medium">Error al enviar. Verifica el captcha e intenta de nuevo.</p>
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
