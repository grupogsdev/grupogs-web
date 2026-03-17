import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { PostsTable } from "@/components/PostsTable";

export default async function AdminBlogPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  if (!session || session.value !== "authenticated") redirect("/admin");

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--primary)" }}>Blog</h2>
      <p className="text-gray-600 mb-6">
        Gestiona los artículos y noticias del blog
      </p>
      <PostsTable />
    </div>
  );
}
