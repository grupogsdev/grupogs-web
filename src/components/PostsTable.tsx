"use client";

import { useState, useEffect, useCallback } from "react";
import { Eye, Pencil, Trash2, Plus, ChevronUp, ChevronDown } from "lucide-react";
import { PostForm } from "./PostForm";
import { ConfirmDialog } from "./ConfirmDialog";

type Post = {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  imageUrl: string | null;
  published: string;
  createdAt: string;
  updatedAt: string;
};

type SortConfig = { key: "title" | "slug" | "createdAt"; order: "asc" | "desc" };

export function PostsTable() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: "createdAt", order: "desc" });
  const [formPost, setFormPost] = useState<Post | null | "new">(null);
  const [deletePost, setDeletePost] = useState<Post | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/posts?sortBy=${sortConfig.key}&sortOrder=${sortConfig.order}`
      );
      if (!res.ok) throw new Error("Error al cargar");
      const data = await res.json();
      setPosts(data);
      setError("");
    } catch {
      setError("No se pudieron cargar los artículos.");
    } finally {
      setLoading(false);
    }
  }, [sortConfig.key, sortConfig.order]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  function handleSort(key: "title" | "slug" | "createdAt") {
    setSortConfig((prev) => ({
      key,
      order: prev.key === key && prev.order === "asc" ? "desc" : "asc",
    }));
  }

  function SortIcon({ column }: { column: "title" | "slug" | "createdAt" }) {
    if (sortConfig.key !== column) return null;
    return sortConfig.order === "asc" ? (
      <ChevronUp size={16} className="inline ml-1" />
    ) : (
      <ChevronDown size={16} className="inline ml-1" />
    );
  }

  async function handleDelete(id: number) {
    try {
      const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
      if (res.ok) {
        setDeletePost(null);
        fetchPosts();
      }
    } catch {
      setError("Error al eliminar");
    }
  }

  async function handleSave(post: { slug: string; title: string; excerpt: string | null; content: string; imageUrl: string | null; published: string }) {
    try {
      if (formPost === "new") {
        const res = await fetch("/api/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(post),
        });
        if (res.ok) {
          setFormPost(null);
          fetchPosts();
        } else {
          const data = await res.json();
          setError(data.error || "Error al crear");
        }
      } else if (formPost && "id" in formPost) {
        const res = await fetch(`/api/posts/${formPost.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(post),
        });
        if (res.ok) {
          setFormPost(null);
          fetchPosts();
        } else {
          const data = await res.json();
          setError(data.error || "Error al actualizar");
        }
      }
    } catch {
      setError("Error al guardar");
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error && posts.length === 0) {
    return (
      <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700">
        {error}
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 flex justify-between items-center">
        <button
          type="button"
          onClick={() => setFormPost("new")}
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white"
          style={{ backgroundColor: "var(--primary)" }}
        >
          <Plus size={20} />
          Nuevo artículo
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-sm">
          {error}
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border-2 bg-white shadow-sm" style={{ borderColor: "var(--primary)" }}>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 text-white" style={{ backgroundColor: "var(--primary)" }}>
              <th className="text-left py-3 px-4">
                <button
                  type="button"
                  onClick={() => handleSort("title")}
                  className="font-semibold hover:opacity-90 flex items-center"
                >
                  Título
                  <SortIcon column="title" />
                </button>
              </th>
              <th className="text-left py-3 px-4">
                <button
                  type="button"
                  onClick={() => handleSort("slug")}
                  className="font-semibold hover:opacity-90 flex items-center"
                >
                  Slug
                  <SortIcon column="slug" />
                </button>
              </th>
              <th className="text-left py-3 px-4 font-semibold">Estado</th>
              <th className="text-left py-3 px-4">
                <button
                  type="button"
                  onClick={() => handleSort("createdAt")}
                  className="font-semibold hover:opacity-90 flex items-center"
                >
                  Fecha
                  <SortIcon column="createdAt" />
                </button>
              </th>
              <th className="text-right py-3 px-4 font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-gray-500">
                  No hay artículos. Crea un nuevo artículo para comenzar.
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="border-b border-gray-100 hover:bg-[var(--primary)]/5 transition">
                  <td className="py-3 px-4 font-medium">{post.title}</td>
                  <td className="py-3 px-4 text-gray-600">{post.slug}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        post.published === "published"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {post.published === "published" ? "Publicado" : "Borrador"}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {new Date(post.createdAt).toLocaleDateString("es-CO", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex justify-end gap-2">
                      <a
                        href={post.published === "published" ? `/blog/${post.slug}` : "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-lg transition ${
                          post.published === "published"
                            ? "hover:bg-gray-200"
                            : "opacity-50 cursor-not-allowed"
                        }`}
                        title="Ver"
                      >
                        <Eye size={18} />
                      </a>
                      <button
                        type="button"
                        onClick={() => setFormPost(post)}
                        className="p-2 rounded-lg hover:bg-gray-200 transition"
                        title="Editar"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeletePost(post)}
                        className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition"
                        title="Eliminar"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {formPost && (
        <PostForm
          post={formPost === "new" ? undefined : formPost}
          onClose={() => setFormPost(null)}
          onSave={handleSave}
          mode={formPost === "new" ? "create" : "edit"}
        />
      )}

      {deletePost && (
        <ConfirmDialog
          title="Eliminar artículo"
          message={`¿Estás seguro de eliminar "${deletePost.title}"?`}
          confirmLabel="Eliminar"
          onConfirm={() => handleDelete(deletePost.id)}
          onCancel={() => setDeletePost(null)}
        />
      )}
    </>
  );
}
