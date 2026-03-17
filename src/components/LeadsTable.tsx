"use client";

import { useState, useEffect, useCallback } from "react";
import { Eye, Pencil, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { COLORS } from "@/lib/constants";
import { LeadModal } from "./LeadModal";
import { ConfirmDialog } from "./ConfirmDialog";

type Lead = {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
};

type SortConfig = { key: keyof Lead | "createdAt"; order: "asc" | "desc" };

export function LeadsTable() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: "createdAt", order: "desc" });
  const [modalLead, setModalLead] = useState<Lead | null>(null);
  const [modalMode, setModalMode] = useState<"view" | "edit">("view");
  const [deleteLead, setDeleteLead] = useState<Lead | null>(null);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/leads?sortBy=${sortConfig.key === "createdAt" ? "createdAt" : sortConfig.key}&sortOrder=${sortConfig.order}`
      );
      if (!res.ok) throw new Error("Error al cargar");
      const data = await res.json();
      setLeads(data);
      setError("");
    } catch {
      setError("No se pudieron cargar los leads. Verifica DATABASE_URL.");
    } finally {
      setLoading(false);
    }
  }, [sortConfig.key, sortConfig.order]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  function handleSort(key: keyof Lead | "createdAt") {
    setSortConfig((prev) => ({
      key,
      order: prev.key === key && prev.order === "asc" ? "desc" : "asc",
    }));
  }

  function SortIcon({ column }: { column: keyof Lead | "createdAt" }) {
    if (sortConfig.key !== column) return null;
    return sortConfig.order === "asc" ? (
      <ChevronUp size={16} className="inline ml-1" />
    ) : (
      <ChevronDown size={16} className="inline ml-1" />
    );
  }

  async function handleDelete(id: number) {
    try {
      const res = await fetch(`/api/leads/${id}`, { method: "DELETE" });
      if (res.ok) {
        setDeleteLead(null);
        fetchLeads();
      }
    } catch {
      setError("Error al eliminar");
    }
  }

  async function handleSave(lead: Lead) {
    try {
      const res = await fetch(`/api/leads/${lead.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (res.ok) {
        setModalLead(null);
        fetchLeads();
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

  if (error) {
    return (
      <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700">
        {error}
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-xl border-2 bg-white shadow-sm" style={{ borderColor: "var(--primary)" }}>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 text-white" style={{ backgroundColor: "var(--primary)" }}>
              <th className="text-left py-3 px-4">
                <button
                  type="button"
                  onClick={() => handleSort("name")}
                  className="font-semibold hover:opacity-90 flex items-center"
                >
                  Nombre
                  <SortIcon column="name" />
                </button>
              </th>
              <th className="text-left py-3 px-4">
                <button
                  type="button"
                  onClick={() => handleSort("email")}
                  className="font-semibold hover:opacity-90 flex items-center"
                >
                  Email
                  <SortIcon column="email" />
                </button>
              </th>
              <th className="text-left py-3 px-4">
                <button
                  type="button"
                  onClick={() => handleSort("phone")}
                  className="font-semibold hover:opacity-90 flex items-center"
                >
                  Teléfono
                  <SortIcon column="phone" />
                </button>
              </th>
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
            {leads.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-500">
                  No hay leads registrados
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead.id} className="border-b border-gray-100 hover:bg-[var(--primary)]/5 transition">
                  <td className="py-3 px-4">{lead.name}</td>
                  <td className="py-3 px-4">{lead.email}</td>
                  <td className="py-3 px-4">{lead.phone}</td>
                  <td className="py-3 px-4">
                    {new Date(lead.createdAt).toLocaleDateString("es-CO", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setModalLead(lead);
                          setModalMode("view");
                        }}
                        className="p-2 rounded-lg hover:bg-gray-200 transition"
                        title="Ver"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setModalLead({ ...lead });
                          setModalMode("edit");
                        }}
                        className="p-2 rounded-lg hover:bg-gray-200 transition"
                        title="Editar"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteLead(lead)}
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

      {modalLead && (
        <LeadModal
          lead={modalLead}
          onClose={() => setModalLead(null)}
          onSave={handleSave}
          initialMode={modalMode}
        />
      )}

      {deleteLead && (
        <ConfirmDialog
          title="Eliminar lead"
          message={`¿Estás seguro de eliminar el lead de ${deleteLead.name}?`}
          confirmLabel="Eliminar"
          onConfirm={() => handleDelete(deleteLead.id)}
          onCancel={() => setDeleteLead(null)}
        />
      )}
    </>
  );
}
