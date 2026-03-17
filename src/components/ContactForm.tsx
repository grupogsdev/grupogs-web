"use client";

import { useState } from "react";

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

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [captcha, setCaptcha] = useState(() => generateCaptcha());

  const resetCaptcha = () => setCaptcha(generateCaptcha());

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
      captchaAnswer: formData.get("captchaAnswer"),
      captchaExpected: captcha.answer,
    };
    try {
      const res = await fetch("/api/contact", {
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
        if (json.error?.includes("captcha")) resetCaptcha();
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Envíanos un mensaje</h2>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Nombre completo *
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
          placeholder="Tu nombre completo"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
          placeholder="tu@email.com"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Teléfono *
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
          placeholder="+57 300 123 4567"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Mensaje *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
          placeholder="Cuéntanos tu requerimiento"
        />
      </div>
      <div>
        <label htmlFor="captchaAnswer" className="block text-sm font-medium text-gray-700 mb-1">
          ¿Cuánto es {captcha.question}? *
        </label>
        <input
          id="captchaAnswer"
          name="captchaAnswer"
          type="number"
          required
          min={0}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
          placeholder="Respuesta"
        />
      </div>
      {status === "success" && (
        <div className="p-4 rounded-lg bg-green-50 border border-green-200">
          <p className="text-green-800 font-medium">¡Gracias! Pronto te contactaremos.</p>
        </div>
      )}
      {status === "error" && (
        <p className="text-red-600 font-medium">Error al enviar. Verifica el captcha e intenta de nuevo.</p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full py-3 rounded-lg font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
        style={{ backgroundColor: "var(--primary)" }}
      >
        {status === "sending" ? "Enviando..." : "Enviar mensaje"}
      </button>
    </form>
  );
}
