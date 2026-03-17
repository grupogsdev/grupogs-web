import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { LeadsTable } from "@/components/LeadsTable";

export default async function AdminLeadsPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  if (!session || session.value !== "authenticated") redirect("/admin");

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Leads</h2>
      <p className="text-gray-600 mb-6">
        Contactos registrados desde el formulario
      </p>
      <LeadsTable />
    </div>
  );
}
