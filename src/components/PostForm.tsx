"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { COLORS } from "@/lib/constants";

type PostFormData = {
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  imageUrl: string | null;
  published: string;
};

export function PostForm({
  post,
  onClose,
  onSave,
  mode,
}: {
  post?: PostFormData | null;
  onClose: () => void;
  onSave: (data: PostFormData) => void;
  mode: "create" | "edit";
}) {
  const [form, setForm] = useState<PostFormData>({
    slug: post?.slug ?? "",
    title: post?.title ?? "",
    excerpt: post?.excerpt ?? "",
    content: post?.content ?? "",
    imageUrl: post?.imageUrl ?? "",
    published: post?.published ?? "draft",
  });
  const [saving, setSaving] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    onSave(form);
    setSaving(false);
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col my-8">
        <div
          className="flex justify-between items-center px-6 py-4 text-white"
          style={{ backgroundColor: COLORS.primary }}
        >
          <h3 className="text-lg font-bold">
            {mode === "create" ? "Nuevo artículo" : "Editar artículo"}
          </h3>
          <button type="button" onClick={onClose} className="p-1 rounded-lg hover:bg-white/20">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--primary)]"
              placeholder="Título del artículo"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--primary)]"
              placeholder="url-del-articulo"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Extracto</label>
            <textarea
              value={form.excerpt ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value || null }))}
              rows={2}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--primary)]"
              placeholder="Breve descripción"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contenido *</label>
            <textarea
              value={form.content}
              onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
              required
              rows={10}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--primary)]"
              placeholder="Contenido del artículo"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL de imagen</label>
            <input
              type="url"
              value={form.imageUrl ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value || null }))}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--primary)]"
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
            <select
              value={form.published}
              onChange={(e) => setForm((f) => ({ ...f, published: e.target.value }))}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--primary)]"
            >
              <option value="draft">Borrador</option>
              <option value="published">Publicado</option>
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-3 rounded-lg font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50">
              Cancelar
            </button>
            <button type="submit" disabled={saving} className="flex-1 py-3 rounded-lg font-semibold text-white disabled:opacity-50" style={{ backgroundColor: COLORS.primary }}>
              {saving ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
