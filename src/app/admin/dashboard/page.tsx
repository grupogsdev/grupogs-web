import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";
import { LayoutDashboard, FileText, Image, Bot, Users, FileCheck } from "lucide-react";

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  if (!session || session.value !== "authenticated") {
    redirect("/admin");
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--primary)" }}>Dashboard</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/admin/dashboard/contenido"
            className="p-6 rounded-xl border-2 bg-white hover:shadow-lg transition group"
            style={{ borderColor: "var(--primary)", boxShadow: "0 0 0 1px rgba(0,166,81,0.1)" }}
          >
            <div className="p-2 rounded-lg w-fit mb-3" style={{ backgroundColor: "var(--primary)" }}>
              <FileText size={28} className="text-white" />
            </div>
            <h3 className="font-bold text-gray-900 group-hover:text-[var(--primary)] transition">Contenido</h3>
            <p className="text-sm text-gray-600 mt-1">Editar textos y páginas</p>
          </Link>
          <Link
            href="/admin/dashboard/galeria"
            className="p-6 rounded-xl border-2 bg-white hover:shadow-lg transition group"
            style={{ borderColor: "var(--primary)", boxShadow: "0 0 0 1px rgba(0,166,81,0.1)" }}
          >
            <div className="p-2 rounded-lg w-fit mb-3" style={{ backgroundColor: "var(--primary)" }}>
              <Image size={28} className="text-white" />
            </div>
            <h3 className="font-bold text-gray-900 group-hover:text-[var(--primary)] transition">Galería</h3>
            <p className="text-sm text-gray-600 mt-1">Gestionar imágenes</p>
          </Link>
          <Link
            href="/admin/dashboard/blog"
            className="p-6 rounded-xl border-2 bg-white hover:shadow-lg transition group"
            style={{ borderColor: "var(--primary)", boxShadow: "0 0 0 1px rgba(0,166,81,0.1)" }}
          >
            <div className="p-2 rounded-lg w-fit mb-3" style={{ backgroundColor: "var(--secondary)" }}>
              <LayoutDashboard size={28} className="text-gray-900" />
            </div>
            <h3 className="font-bold text-gray-900 group-hover:text-[var(--primary)] transition">Blog</h3>
            <p className="text-sm text-gray-600 mt-1">Artículos y noticias</p>
          </Link>
          <Link
            href="/admin/dashboard/bot"
            className="p-6 rounded-xl border-2 bg-white hover:shadow-lg transition group"
            style={{ borderColor: "var(--primary)", boxShadow: "0 0 0 1px rgba(0,166,81,0.1)" }}
          >
            <div className="p-2 rounded-lg w-fit mb-3" style={{ backgroundColor: "var(--primary)" }}>
              <Bot size={28} className="text-white" />
            </div>
            <h3 className="font-bold text-gray-900 group-hover:text-[var(--primary)] transition">Chat Bot</h3>
            <p className="text-sm text-gray-600 mt-1">Nombre, entrenamiento y configuración</p>
          </Link>
          <Link
            href="/admin/dashboard/leads"
            className="p-6 rounded-xl border-2 bg-white hover:shadow-lg transition group"
            style={{ borderColor: "var(--primary)", boxShadow: "0 0 0 1px rgba(0,166,81,0.1)" }}
          >
            <div className="p-2 rounded-lg w-fit mb-3" style={{ backgroundColor: "var(--primary)" }}>
              <Users size={28} className="text-white" />
            </div>
            <h3 className="font-bold text-gray-900 group-hover:text-[var(--primary)] transition">Leads</h3>
            <p className="text-sm text-gray-600 mt-1">Contactos del formulario</p>
          </Link>
          <Link
            href="/admin/dashboard/cotizaciones"
            className="p-6 rounded-xl border-2 bg-white hover:shadow-lg transition group"
            style={{ borderColor: "var(--primary)", boxShadow: "0 0 0 1px rgba(0,166,81,0.1)" }}
          >
            <div className="p-2 rounded-lg w-fit mb-3" style={{ backgroundColor: "var(--secondary)" }}>
              <FileCheck size={28} className="text-gray-900" />
            </div>
            <h3 className="font-bold text-gray-900 group-hover:text-[var(--primary)] transition">Cotizaciones</h3>
            <p className="text-sm text-gray-600 mt-1">Solicitudes de cotización</p>
          </Link>
        </div>
    </main>
  );
}
