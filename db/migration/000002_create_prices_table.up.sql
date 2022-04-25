CREATE TABLE IF NOT EXISTS "prices" (
  "id" uuid UNIQUE PRIMARY KEY NOT NULL,
  "category" varchar NOT NULL,
  "price_washing" varchar NOT NULL,
  "price_ironing" varchar NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);
