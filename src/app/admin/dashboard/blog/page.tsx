import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function AdminBlogPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  if (!session || session.value !== "authenticated") redirect("/admin");

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Blog</h2>
      <p className="text-gray-600">Gestion de articulos proximamente.</p>
    </div>
  );
}
