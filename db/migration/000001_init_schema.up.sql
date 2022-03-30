CREATE TABLE "orders" (
  "id" uuid UNIQUE PRIMARY KEY NOT NULL,
  "identifier" SERIAL NOT NULL,
  "recieved_date" timestamptz NOT NULL,
  "delivery_date" timestamptz NOT NULL,
  "client_name" varchar NOT NULL,
  "client_id" varchar NOT NULL,
  "client_address" varchar NOT NULL,
  "client_phone" varchar NOT NULL,
  "client_email" varchar NOT NULL,
  "garment_total" numeric NOT NULL,
  "payment_total_payed" MONEY NOT NULL,
  "payment_total" MONEY NOT NULL,
  "payment_total_real" MONEY NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "garments" (
  "id" uuid UNIQUE PRIMARY KEY NOT NULL,
  "order_id" uuid NOT NULL,
  "total" MONEY NOT NULL,
  "category" varchar NOT NULL,
  "gendre" varchar NOT NULL,
  "color" varchar NOT NULL,
  "brand" varchar NOT NULL,
  "price" varchar NOT NULL,
  "comment" varchar NOT NULL,
  "defects" varchar NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);


ALTER TABLE "garments" ADD FOREIGN KEY ("order_id") REFERENCES "orders" ("id");

CREATE INDEX ON "orders" ("identifier");

CREATE INDEX ON "garments" ("order_id");
