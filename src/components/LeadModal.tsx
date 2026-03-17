"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { COLORS } from "@/lib/constants";

type Lead = {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
};

export function LeadModal({
  lead,
  onClose,
  onSave,
  initialMode = "view",
}: {
  lead: Lead;
  onClose: () => void;
  onSave: (lead: Lead) => void;
  initialMode?: "view" | "edit";
}) {
  const [edit, setEdit] = useState(initialMode === "edit");
  const [form, setForm] = useState(lead);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave(form);
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div
          className="flex justify-between items-center px-6 py-4 text-white"
          style={{ backgroundColor: COLORS.primary }}
        >
          <h3 className="text-lg font-bold">
            {edit ? "Editar lead" : "Ver lead"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/20 transition"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                readOnly={!edit}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--primary)] bg-gray-50 read-only:bg-gray-100 read-only:cursor-default"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                readOnly={!edit}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--primary)] bg-gray-50 read-only:bg-gray-100 read-only:cursor-default"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                readOnly={!edit}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--primary)] bg-gray-50 read-only:bg-gray-100 read-only:cursor-default"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                readOnly={!edit}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--primary)] bg-gray-50 read-only:bg-gray-100 read-only:cursor-default"
              />
            </div>
            {!edit && (
              <p className="text-sm text-gray-500">
                Registrado:{" "}
                {new Date(form.createdAt).toLocaleString("es-CO", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            )}
          </div>

          <div className="flex gap-3 mt-6">
            {edit ? (
              <>
                <button
                  type="button"
                  onClick={() => setEdit(false)}
                  className="flex-1 py-3 rounded-lg font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-lg font-semibold text-white"
                  style={{ backgroundColor: COLORS.primary }}
                >
                  Guardar
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 rounded-lg font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  onClick={() => setEdit(true)}
                  className="flex-1 py-3 rounded-lg font-semibold text-white"
                  style={{ backgroundColor: COLORS.primary }}
                >
                  Editar
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
