"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Bot, X, Send, Loader2 } from "lucide-react";
import { COLORS } from "@/lib/constants";

const STORAGE_KEY = "grupogs_chat_history";
const MAX_HISTORY = 50;

type Message = { role: "user" | "assistant"; content: string };

export function ChatWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState<{ name: string; welcomeMessage: string } | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isAdmin = pathname?.startsWith("/admin");

  useEffect(() => {
    if (isAdmin) return;
    fetch("/api/bot-config")
      .then((r) => r.json())
      .then((d) => setConfig({ name: d.name, welcomeMessage: d.welcomeMessage }))
      .catch(() => setConfig({ name: "Asistente Grupo GS", welcomeMessage: "¡Hola! ¿En qué puedo ayudarte?" }));
  }, [isAdmin]);

  useEffect(() => {
    if (isAdmin) return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Message[];
        if (Array.isArray(parsed)) setMessages(parsed.slice(-MAX_HISTORY));
      }
    } catch {
      setMessages([]);
    }
  }, [isAdmin]);

  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-MAX_HISTORY)));
      } catch {
        /* ignore */
      }
    }
  }, [messages]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error");
      setMessages((m) => [...m, { role: "assistant", content: data.message }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Lo siento, no pude procesar tu mensaje. Intenta de nuevo o contacta al +57 321 8992537." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  if (isAdmin) return null;

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 min-w-[56px] min-h-[56px] rounded-full shadow-lg text-white transition hover:scale-105 hover:shadow-xl md:w-16 md:h-16 touch-manipulation"
        style={{ backgroundColor: COLORS.primary }}
        aria-label="Abrir chat"
      >
        {open ? <X size={24} /> : <Bot size={24} />}
      </button>

      {open && (
        <div
          className="fixed bottom-20 right-3 left-3 z-50 flex flex-col rounded-2xl border border-gray-200 bg-white shadow-2xl max-h-[min(70vh,500px)] w-[calc(100vw-24px)] sm:left-auto sm:right-6 sm:w-96 sm:max-h-[min(500px,80vh)]"
          role="dialog"
          aria-label="Chat con asistente"
        >
          <div
            className="flex items-center gap-2 px-4 py-3 rounded-t-2xl text-white"
            style={{ backgroundColor: COLORS.primary }}
          >
            <Bot size={20} />
            <span className="font-semibold">{config?.name ?? "Asistente"}</span>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[200px] max-h-[300px] sm:max-h-[350px]"
          >
            {messages.length === 0 && (
              <p className="text-sm text-gray-600">{config?.welcomeMessage ?? "¡Hola! ¿En qué puedo ayudarte?"}</p>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                    m.role === "user"
                      ? "rounded-br-md text-white"
                      : "rounded-bl-md bg-gray-100 text-gray-800"
                  }`}
                  style={m.role === "user" ? { backgroundColor: COLORS.primary } : {}}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-md bg-gray-100 px-4 py-2">
                  <Loader2 size={18} className="animate-spin" />
                </div>
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="flex gap-2 p-4 border-t border-gray-200"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu mensaje..."
              className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent text-sm"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="p-3 rounded-xl text-white transition disabled:opacity-50"
              style={{ backgroundColor: COLORS.primary }}
              aria-label="Enviar"
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
