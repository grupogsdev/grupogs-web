"use client";

import { useState, useEffect, useCallback } from "react";
import { Eye, Pencil, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { CotizacionModal } from "./CotizacionModal";
import { ConfirmDialog } from "./ConfirmDialog";
import { SERVICES } from "@/lib/constants";

function servicioLabel(slug: string) {
  return SERVICES.find((s) => s.slug === slug)?.title ?? slug;
}

type Cotizacion = {
  id: number;
  tipo: string;
  servicio: string;
  ciudad: string;
  descripcion: string;
  frecuencia: string;
  nombre: string;
  email: string;
  telefono: string;
  createdAt: string;
};

type SortConfig = { key: keyof Cotizacion | "createdAt"; order: "asc" | "desc" };

export function CotizacionesTable() {
  const [cotizaciones, setCotizaciones] = useState<Cotizacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: "createdAt", order: "desc" });
  const [modalCotizacion, setModalCotizacion] = useState<Cotizacion | null>(null);
  const [modalMode, setModalMode] = useState<"view" | "edit">("view");
  const [deleteCotizacion, setDeleteCotizacion] = useState<Cotizacion | null>(null);

  const fetchCotizaciones = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/cotizaciones?sortBy=${sortConfig.key === "createdAt" ? "createdAt" : sortConfig.key}&sortOrder=${sortConfig.order}`
      );
      if (!res.ok) throw new Error("Error al cargar");
      const data = await res.json();
      setCotizaciones(data);
      setError("");
    } catch {
      setError("No se pudieron cargar las cotizaciones. Verifica DATABASE_URL.");
    } finally {
      setLoading(false);
    }
  }, [sortConfig.key, sortConfig.order]);

  useEffect(() => {
    fetchCotizaciones();
  }, [fetchCotizaciones]);

  function handleSort(key: keyof Cotizacion | "createdAt") {
    setSortConfig((prev) => ({
      key,
      order: prev.key === key && prev.order === "asc" ? "desc" : "asc",
    }));
  }

  function SortIcon({ column }: { column: keyof Cotizacion | "createdAt" }) {
    if (sortConfig.key !== column) return null;
    return sortConfig.order === "asc" ? (
      <ChevronUp size={16} className="inline ml-1" />
    ) : (
      <ChevronDown size={16} className="inline ml-1" />
    );
  }

  async function handleDelete(id: number) {
    try {
      const res = await fetch(`/api/cotizaciones/${id}`, { method: "DELETE" });
      if (res.ok) {
        setDeleteCotizacion(null);
        fetchCotizaciones();
      }
    } catch {
      setError("Error al eliminar");
    }
  }

  async function handleSave(cotizacion: Cotizacion) {
    try {
      const res = await fetch(`/api/cotizaciones/${cotizacion.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cotizacion),
      });
      if (res.ok) {
        setModalCotizacion(null);
        fetchCotizaciones();
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
                  onClick={() => handleSort("nombre")}
                  className="font-semibold hover:opacity-90 flex items-center"
                >
                  Nombre
                  <SortIcon column="nombre" />
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
                  onClick={() => handleSort("telefono")}
                  className="font-semibold hover:opacity-90 flex items-center"
                >
                  Teléfono
                  <SortIcon column="telefono" />
                </button>
              </th>
              <th className="text-left py-3 px-4 font-semibold">Servicio</th>
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
            {cotizaciones.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-500">
                  No hay cotizaciones registradas
                </td>
              </tr>
            ) : (
              cotizaciones.map((cot) => (
                <tr key={cot.id} className="border-b border-gray-100 hover:bg-[var(--primary)]/5 transition">
                  <td className="py-3 px-4">{cot.nombre}</td>
                  <td className="py-3 px-4">{cot.email}</td>
                  <td className="py-3 px-4">{cot.telefono}</td>
                  <td className="py-3 px-4">{servicioLabel(cot.servicio)}</td>
                  <td className="py-3 px-4">
                    {new Date(cot.createdAt).toLocaleDateString("es-CO", {
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
                          setModalCotizacion(cot);
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
                          setModalCotizacion({ ...cot });
                          setModalMode("edit");
                        }}
                        className="p-2 rounded-lg hover:bg-gray-200 transition"
                        title="Editar"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteCotizacion(cot)}
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

      {modalCotizacion && (
        <CotizacionModal
          cotizacion={modalCotizacion}
          onClose={() => setModalCotizacion(null)}
          onSave={handleSave}
          initialMode={modalMode}
        />
      )}

      {deleteCotizacion && (
        <ConfirmDialog
          title="Eliminar cotización"
          message={`¿Estás seguro de eliminar la cotización de ${deleteCotizacion.nombre}?`}
          confirmLabel="Eliminar"
          onConfirm={() => handleDelete(deleteCotizacion.id)}
          onCancel={() => setDeleteCotizacion(null)}
        />
      )}
    </>
  );
}
