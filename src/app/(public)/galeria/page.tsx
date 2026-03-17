import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galeria | Grupo GS",
  description: "Galeria de trabajos de control de plagas y lavado de tanques.",
};

export default function GaleriaPage() {
  return (
    <>
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Galeria</h1>
          <p className="text-xl text-gray-600">Algunos de nuestros trabajos</p>
        </div>
      </section>
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-video rounded-xl bg-gray-200 flex items-center justify-center text-gray-500">
                Imagen {i}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
