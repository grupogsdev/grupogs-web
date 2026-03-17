import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cotizaciones } from "@/lib/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      tipo,
      servicio,
      ciudad,
      descripcion,
      frecuencia,
      nombre,
      email,
      telefono,
      captchaAnswer,
      captchaExpected,
    } = body;

    if (!tipo || !servicio || !ciudad || !descripcion || !nombre || !email || !telefono) {
      return NextResponse.json({ error: "Campos requeridos faltantes" }, { status: 400 });
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
        { error: "Configura DATABASE_URL para guardar las cotizaciones" },
        { status: 503 }
      );
    }

    await db.insert(cotizaciones).values({
      tipo: String(tipo).trim(),
      servicio: String(servicio).trim(),
      ciudad: String(ciudad).trim(),
      descripcion: String(descripcion).trim(),
      frecuencia: String(frecuencia || "Única").trim(),
      nombre: String(nombre).trim(),
      email: String(email).trim(),
      telefono: String(telefono).trim(),
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
