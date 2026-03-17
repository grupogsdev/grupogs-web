"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Tu correo electrónico"
        required
        className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--primary)]"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="px-6 py-3 rounded-lg font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
        style={{ backgroundColor: "var(--primary)" }}
      >
        {status === "sending" ? "..." : "Suscribirme"}
      </button>
      {status === "success" && <p className="text-green-600 text-sm">¡Gracias! Te contactaremos pronto.</p>}
      {status === "error" && <p className="text-red-600 text-sm">Error. Intenta de nuevo.</p>}
    </form>
  );
}
