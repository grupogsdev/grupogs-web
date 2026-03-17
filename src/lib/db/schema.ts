import { pgTable, text, timestamp, serial } from "drizzle-orm/pg-core";

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Lead = typeof leads.$inferSelect;

export const botConfig = pgTable("bot_config", {
  id: text("id").primaryKey().default("default"),
  name: text("name").notNull().default("Asistente Grupo GS"),
  systemPrompt: text("system_prompt").notNull().default(""),
  welcomeMessage: text("welcome_message").notNull().default("¡Hola! Soy el asistente de Grupo GS. ¿En qué puedo ayudarte hoy?"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type BotConfig = typeof botConfig.$inferSelect;
