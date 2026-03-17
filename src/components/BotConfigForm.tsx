"use client";

import { useState, useEffect } from "react";
import { Save, Loader2 } from "lucide-react";
import { COLORS } from "@/lib/constants";
import { DEFAULT_BOT_CONFIG } from "@/lib/bot-defaults";

export function BotConfigForm() {
  const [name, setName] = useState(DEFAULT_BOT_CONFIG.name);
  const [systemPrompt, setSystemPrompt] = useState(DEFAULT_BOT_CONFIG.systemPrompt);
  const [welcomeMessage, setWelcomeMessage] = useState(DEFAULT_BOT_CONFIG.welcomeMessage);
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/bot-config")
      .then((r) => r.json())
      .then((d) => {
        if (d.name) setName(d.name);
        if (d.systemPrompt) setSystemPrompt(d.systemPrompt);
        if (d.welcomeMessage) setWelcomeMessage(d.welcomeMessage);
      })
      .finally(() => setLoaded(true));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    setErrorMsg("");
    try {
      const res = await fetch("/api/bot-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, systemPrompt, welcomeMessage }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Error al guardar");
        setStatus("error");
        return;
      }
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setErrorMsg("Error de conexión");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del bot</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Asistente Grupo GS"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--primary)]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Mensaje de bienvenida</label>
        <textarea
          value={welcomeMessage}
          onChange={(e) => setWelcomeMessage(e.target.value)}
          rows={3}
          placeholder="¡Hola! ¿En qué puedo ayudarte?"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--primary)]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Entrenamiento (System Prompt)
        </label>
        <textarea
          value={systemPrompt}
          onChange={(e) => setSystemPrompt(e.target.value)}
          rows={12}
          placeholder="Instrucciones para el comportamiento del bot..."
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--primary)] font-mono text-sm"
        />
        <p className="mt-1 text-xs text-gray-500">
          Define la personalidad, conocimientos y contexto del bot. Incluye información sobre servicios, precios, contacto, etc.
        </p>
      </div>
      {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}
      {status === "success" && <p className="text-green-600 text-sm">Guardado correctamente.</p>}
      <button
        type="submit"
        disabled={status === "saving"}
        className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition disabled:opacity-50"
        style={{ backgroundColor: COLORS.primary }}
      >
        {status === "saving" ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Guardando...
          </>
        ) : (
          <>
            <Save size={18} />
            Guardar configuración
          </>
        )}
      </button>
    </form>
  );
}
