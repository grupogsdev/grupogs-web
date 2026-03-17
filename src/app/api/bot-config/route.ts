import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { botConfig } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { DEFAULT_BOT_CONFIG } from "@/lib/bot-defaults";

export async function GET() {
  try {
    if (!db) {
      return NextResponse.json(DEFAULT_BOT_CONFIG);
    }
    const [config] = await db.select().from(botConfig).where(eq(botConfig.id, "default")).limit(1);
    if (!config) {
      return NextResponse.json(DEFAULT_BOT_CONFIG);
    }
    return NextResponse.json({
      name: config.name,
      systemPrompt: config.systemPrompt,
      welcomeMessage: config.welcomeMessage,
    });
  } catch {
    return NextResponse.json(DEFAULT_BOT_CONFIG);
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");
    if (!session || session.value !== "authenticated") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { name, systemPrompt, welcomeMessage } = body;

    if (!db) {
      return NextResponse.json(
        { error: "Configura DATABASE_URL para guardar la configuración del bot" },
        { status: 503 }
      );
    }

    const data = {
      name: String(name || DEFAULT_BOT_CONFIG.name),
      systemPrompt: String(systemPrompt ?? DEFAULT_BOT_CONFIG.systemPrompt),
      welcomeMessage: String(welcomeMessage ?? DEFAULT_BOT_CONFIG.welcomeMessage),
    };
    await db
      .insert(botConfig)
      .values({
        id: "default",
        ...data,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: botConfig.id,
        set: { ...data, updatedAt: new Date() },
      });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Error al guardar" }, { status: 500 });
  }
}
