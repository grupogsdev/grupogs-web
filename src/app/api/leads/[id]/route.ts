import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { leads } from "@/lib/db/schema";
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
  const [lead] = await db.select().from(leads).where(eq(leads.id, parseInt(id, 10))).limit(1);
  if (!lead) return NextResponse.json({ error: "Lead no encontrado" }, { status: 404 });
  return NextResponse.json(lead);
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
  const { name, email, phone, message } = body;

  if (!name || !email || !phone || !message) {
    return NextResponse.json({ error: "Todos los campos son requeridos" }, { status: 400 });
  }

  await db
    .update(leads)
    .set({
      name: String(name).trim(),
      email: String(email).trim(),
      phone: String(phone).trim(),
      message: String(message).trim(),
    })
    .where(eq(leads.id, parseInt(id, 10)));

  const [updated] = await db.select().from(leads).where(eq(leads.id, parseInt(id, 10))).limit(1);
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
  await db.delete(leads).where(eq(leads.id, parseInt(id, 10)));
  return NextResponse.json({ success: true });
}
