  CREATE TABLE "orders" (
  "id" uuid UNIQUE PRIMARY KEY NOT NULL,
  "identifier" SERIAL NOT NULL,
  "recieved_date" date NOT NULL,
  "delivery_date" date NOT NULL,
  "client_name" varchar NOT NULL,
  "client_id" varchar NOT NULL,
  "client_address" varchar NOT NULL,
  "client_phone" varchar NOT NULL,
  "client_email" varchar NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);
