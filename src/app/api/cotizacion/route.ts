import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tipo, servicio, ciudad, descripcion, nombre, email, telefono } = body;
    if (!tipo || !servicio || !ciudad || !descripcion || !nombre || !email || !telefono) {
      return NextResponse.json({ error: "Campos requeridos faltantes" }, { status: 400 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Error al procesar" }, { status: 500 });
  }
}
