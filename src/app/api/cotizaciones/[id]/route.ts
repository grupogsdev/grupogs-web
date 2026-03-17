import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { cotizaciones } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  if (!session || session.value !== "authenticated") {
    return false;
  }
  return true;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  if (!db) return NextResponse.json({ error: "BD no configurada" }, { status: 503 });

  const { id } = await params;
  const [cotizacion] = await db
    .select()
    .from(cotizaciones)
    .where(eq(cotizaciones.id, parseInt(id, 10)))
    .limit(1);
  if (!cotizacion) return NextResponse.json({ error: "Cotización no encontrada" }, { status: 404 });
  return NextResponse.json(cotizacion);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  if (!db) return NextResponse.json({ error: "BD no configurada" }, { status: 503 });

  const { id } = await params;
  const body = await request.json();
  const { tipo, servicio, ciudad, descripcion, frecuencia, nombre, email, telefono } = body;

  if (!tipo || !servicio || !ciudad || !descripcion || !nombre || !email || !telefono) {
    return NextResponse.json({ error: "Todos los campos son requeridos" }, { status: 400 });
  }

  await db
    .update(cotizaciones)
    .set({
      tipo: String(tipo).trim(),
      servicio: String(servicio).trim(),
      ciudad: String(ciudad).trim(),
      descripcion: String(descripcion).trim(),
      frecuencia: String(frecuencia || "Única").trim(),
      nombre: String(nombre).trim(),
      email: String(email).trim(),
      telefono: String(telefono).trim(),
    })
    .where(eq(cotizaciones.id, parseInt(id, 10)));

  const [updated] = await db
    .select()
    .from(cotizaciones)
    .where(eq(cotizaciones.id, parseInt(id, 10)))
    .limit(1);
  return NextResponse.json(updated);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  if (!db) return NextResponse.json({ error: "BD no configurada" }, { status: 503 });

  const { id } = await params;
  await db.delete(cotizaciones).where(eq(cotizaciones.id, parseInt(id, 10)));
  return NextResponse.json({ success: true });
}
