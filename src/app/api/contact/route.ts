import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { leads } from "@/lib/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, captchaAnswer, captchaExpected } = body;

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
        { status: 400 }
      );
    }

    const expected = Number(captchaExpected);
    const answer = Number(captchaAnswer);
    if (Number.isNaN(expected) || Number.isNaN(answer) || answer !== expected) {
      return NextResponse.json(
        { error: "Respuesta del captcha incorrecta" },
        { status: 400 }
      );
    }

    if (!db) {
      return NextResponse.json(
        { error: "Configura DATABASE_URL para guardar los leads" },
        { status: 503 }
      );
    }

    await db.insert(leads).values({
      name: String(name).trim(),
      email: String(email).trim(),
      phone: String(phone).trim(),
      message: String(message).trim(),
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
}
