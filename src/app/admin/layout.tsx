import Link from "next/link";
import { cookies } from "next/headers";
import { LogoutButton } from "@/components/LogoutButton";
import { LayoutDashboard, FileText, Image, Bot, Users, ExternalLink, Newspaper, FileCheck } from "lucide-react";

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
    { href: "/admin/dashboard/cotizaciones", label: "Cotizaciones", icon: FileCheck },
  ];

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#f0fdf4" }}>
      {isAuth && (
        <aside className="w-56 flex-shrink-0 hidden md:block border-r border-[var(--primary)]/20" style={{ backgroundColor: "#dcfce7" }}>
          <div className="sticky top-0 py-4">
            <Link href="/admin/dashboard" className="px-4 block mb-4">
              <span className="text-lg font-bold" style={{ color: "var(--primary)" }}>Panel Grupo GS</span>
            </Link>
            <nav className="space-y-1 px-2">
              {adminNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-[var(--primary)]/15 hover:text-[var(--primary)] transition font-medium"
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
        <header className="sticky top-0 z-50 border-b-2" style={{ backgroundColor: "var(--primary)", borderColor: "var(--secondary)" }}>
          <div className="px-4 py-3 flex justify-between items-center">
            <span className="font-semibold text-white md:hidden">Panel Grupo GS</span>
            <div className="flex items-center gap-4 ml-auto text-white">
              <Link href="/" target="_blank" className="flex items-center gap-1 text-sm text-white/90 hover:text-white transition">
                <ExternalLink size={16} />
                Ver sitio
              </Link>
              {isAuth && (
                <span className="[&_button]:text-white/90 [&_button]:hover:text-white [&_button]:text-sm">
                  <LogoutButton />
                </span>
              )}
            </div>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
