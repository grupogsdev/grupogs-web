import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function AdminGaleriaPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  if (!session || session.value !== "authenticated") redirect("/admin");

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Galeria</h2>
      <p className="text-gray-600">Gestion de imagenes con Vercel Blob proximamente.</p>
    </div>
  );
}
