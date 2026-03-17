import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { BotConfigForm } from "@/components/BotConfigForm";

export default async function AdminBotPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  if (!session || session.value !== "authenticated") redirect("/admin");

  return (
    <div className="p-6 max-w-3xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Configuración del Bot</h2>
      <p className="text-gray-600 mb-6">
        Personaliza el nombre, mensaje de bienvenida y entrenamiento (prompt) del asistente de chat.
      </p>
      <BotConfigForm />
    </div>
  );
}
