import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@grupogscol.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "GrupoGS2026!";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const cookieStore = await cookies();
      cookieStore.set("admin_session", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24,
        path: "/",
      });
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: "Credenciales incorrectas" }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "Error al procesar" }, { status: 500 });
  }
}
