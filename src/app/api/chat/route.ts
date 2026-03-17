import { NextResponse } from "next/server";
import OpenAI from "openai";
import { db } from "@/lib/db";
import { botConfig } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { DEFAULT_BOT_CONFIG } from "@/lib/bot-defaults";

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export async function POST(request: Request) {
  try {
    if (!openai) {
      return NextResponse.json(
        { error: "Chat no configurado. Agrega OPENAI_API_KEY." },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { messages } = body as { messages: Array<{ role: string; content: string }> };

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Mensajes requeridos" }, { status: 400 });
    }

    let systemPrompt = DEFAULT_BOT_CONFIG.systemPrompt;
    if (db) {
      const [config] = await db.select().from(botConfig).where(eq(botConfig.id, "default")).limit(1);
      if (config?.systemPrompt) systemPrompt = config.systemPrompt;
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.map((m) => ({
          role: m.role as "user" | "assistant" | "system",
          content: m.content,
        })),
      ],
      max_tokens: 500,
    });

    const reply = completion.choices[0]?.message?.content ?? "Lo siento, no pude generar una respuesta.";

    return NextResponse.json({ message: reply });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Error al procesar el mensaje" },
      { status: 500 }
    );
  }
}
