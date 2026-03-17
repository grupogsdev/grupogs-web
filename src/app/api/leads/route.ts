import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { desc, asc } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");
    if (!session || session.value !== "authenticated") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    if (!db) {
      return NextResponse.json({ error: "Base de datos no configurada" }, { status: 503 });
    }

    const { searchParams } = new URL(request.url);
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    const orderBy =
      sortBy === "name"
        ? sortOrder === "asc"
          ? asc(leads.name)
          : desc(leads.name)
        : sortBy === "email"
          ? sortOrder === "asc"
            ? asc(leads.email)
            : desc(leads.email)
          : sortBy === "phone"
            ? sortOrder === "asc"
              ? asc(leads.phone)
              : desc(leads.phone)
            : sortOrder === "asc"
              ? asc(leads.createdAt)
              : desc(leads.createdAt);

    const data = await db.select().from(leads).orderBy(orderBy);

    return NextResponse.json(data);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Error al obtener leads" }, { status: 500 });
  }
}
