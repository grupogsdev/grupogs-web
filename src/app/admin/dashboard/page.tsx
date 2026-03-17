import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";
import { LayoutDashboard, FileText, Image, Bot, Users } from "lucide-react";

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  if (!session || session.value !== "authenticated") {
    redirect("/admin");
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/admin/dashboard/contenido"
            className="p-6 rounded-xl border border-gray-200 bg-white hover:border-[var(--primary)] hover:shadow-lg transition"
          >
            <FileText size={32} className="text-[var(--primary)] mb-3" />
            <h3 className="font-bold text-gray-900">Contenido</h3>
            <p className="text-sm text-gray-600 mt-1">Editar textos y páginas</p>
          </Link>
          <Link
            href="/admin/dashboard/galeria"
            className="p-6 rounded-xl border border-gray-200 bg-white hover:border-[var(--primary)] hover:shadow-lg transition"
          >
            <Image size={32} className="text-[var(--primary)] mb-3" />
            <h3 className="font-bold text-gray-900">Galería</h3>
            <p className="text-sm text-gray-600 mt-1">Gestionar imágenes</p>
          </Link>
          <Link
            href="/admin/dashboard/blog"
            className="p-6 rounded-xl border border-gray-200 bg-white hover:border-[var(--primary)] hover:shadow-lg transition"
          >
            <LayoutDashboard size={32} className="text-[var(--primary)] mb-3" />
            <h3 className="font-bold text-gray-900">Blog</h3>
            <p className="text-sm text-gray-600 mt-1">Artículos y noticias</p>
          </Link>
          <Link
            href="/admin/dashboard/bot"
            className="p-6 rounded-xl border border-gray-200 bg-white hover:border-[var(--primary)] hover:shadow-lg transition"
          >
            <Bot size={32} className="text-[var(--primary)] mb-3" />
            <h3 className="font-bold text-gray-900">Chat Bot</h3>
            <p className="text-sm text-gray-600 mt-1">Nombre, entrenamiento y configuración</p>
          </Link>
          <Link
            href="/admin/dashboard/leads"
            className="p-6 rounded-xl border border-gray-200 bg-white hover:border-[var(--primary)] hover:shadow-lg transition"
          >
            <Users size={32} className="text-[var(--primary)] mb-3" />
            <h3 className="font-bold text-gray-900">Leads</h3>
            <p className="text-sm text-gray-600 mt-1">Contactos del formulario</p>
          </Link>
        </div>
    </main>
  );
}
