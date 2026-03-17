import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { CotizacionesTable } from "@/components/CotizacionesTable";

export default async function AdminCotizacionesPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  if (!session || session.value !== "authenticated") redirect("/admin");

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--primary)" }}>Cotizaciones</h2>
      <p className="text-gray-600 mb-6">
        Solicitudes de cotización desde el formulario
      </p>
      <CotizacionesTable />
    </div>
  );
}
