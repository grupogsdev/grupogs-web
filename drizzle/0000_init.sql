CREATE TABLE IF NOT EXISTS "bot_config" (
  "id" text PRIMARY KEY DEFAULT 'default',
  "name" text NOT NULL DEFAULT 'Asistente Grupo GS',
  "system_prompt" text NOT NULL DEFAULT '',
  "welcome_message" text NOT NULL DEFAULT '¡Hola! Soy el asistente de Grupo GS. ¿En qué puedo ayudarte hoy?',
  "updated_at" timestamp DEFAULT now() NOT NULL
);
