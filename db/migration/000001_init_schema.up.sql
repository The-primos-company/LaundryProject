CREATE TABLE "orders" (
  "id" uuid UNIQUE PRIMARY KEY NOT NULL,
  "identifier" SERIAL NOT NULL,
  "recievedDate" date NOT NULL,
  "deliveryDate" date NOT NULL,
  "client_id" uuid NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "clients" (
  "id" uuid UNIQUE PRIMARY KEY NOT NULL,
  "name" varchar NOT NULL,
  "phone" varchar NOT NULL,
  "address" varchar NOT NULL
);

ALTER TABLE "orders" ADD FOREIGN KEY ("client_id") REFERENCES "clients" ("id");
