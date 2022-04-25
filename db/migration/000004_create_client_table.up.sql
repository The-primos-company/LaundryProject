CREATE TABLE IF NOT EXISTS "clients" (
  "id" uuid UNIQUE PRIMARY KEY NOT NULL,
  "name" varchar NOT NULL,
  "identification" varchar NOT NULL,
  "address" varchar NOT NULL,
  "phone" varchar NOT NULL,
  "email" varchar NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);