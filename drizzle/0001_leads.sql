CREATE TABLE IF NOT EXISTS "leads" (
  "id" serial PRIMARY KEY,
  "name" text NOT NULL,
  "email" text NOT NULL,
  "phone" text NOT NULL,
  "message" text NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL
);
