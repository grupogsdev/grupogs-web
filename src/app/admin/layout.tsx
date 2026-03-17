import Link from "next/link";
import { cookies } from "next/headers";
import { LogoutButton } from "@/components/LogoutButton";
import { LayoutDashboard, FileText, Image, Bot, Users, ExternalLink, Newspaper } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  const isAuth = session?.value === "authenticated";

  const adminNav = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/dashboard/contenido", label: "Contenido", icon: FileText },
    { href: "/admin/dashboard/galeria", label: "Galería", icon: Image },
    { href: "/admin/dashboard/blog", label: "Blog", icon: Newspaper },
    { href: "/admin/dashboard/bot", label: "Chat Bot", icon: Bot },
    { href: "/admin/dashboard/leads", label: "Leads", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {isAuth && (
        <aside className="w-56 bg-white border-r border-gray-200 flex-shrink-0 hidden md:block">
          <div className="sticky top-0 py-4">
            <Link href="/admin/dashboard" className="px-4 block mb-4">
              <span className="text-lg font-bold text-gray-900">Panel Grupo GS</span>
            </Link>
            <nav className="space-y-1 px-2">
              {adminNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-[var(--primary)] transition"
                >
                  <item.icon size={18} />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </aside>
      )}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="px-4 py-3 flex justify-between items-center">
            <span className="font-semibold text-gray-900 md:hidden">Panel Grupo GS</span>
            <div className="flex items-center gap-4 ml-auto">
              <Link href="/" target="_blank" className="flex items-center gap-1 text-sm text-gray-600 hover:text-[var(--primary)]">
                <ExternalLink size={16} />
                Ver sitio
              </Link>
              {isAuth && <LogoutButton />}
            </div>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
