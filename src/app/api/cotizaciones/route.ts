import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { cotizaciones } from "@/lib/db/schema";
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
      sortBy === "nombre"
        ? sortOrder === "asc"
          ? asc(cotizaciones.nombre)
          : desc(cotizaciones.nombre)
        : sortBy === "email"
          ? sortOrder === "asc"
            ? asc(cotizaciones.email)
            : desc(cotizaciones.email)
          : sortBy === "telefono"
            ? sortOrder === "asc"
              ? asc(cotizaciones.telefono)
              : desc(cotizaciones.telefono)
            : sortOrder === "asc"
              ? asc(cotizaciones.createdAt)
              : desc(cotizaciones.createdAt);

    const data = await db.select().from(cotizaciones).orderBy(orderBy);

    return NextResponse.json(data);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Error al obtener cotizaciones" }, { status: 500 });
  }
}
