ALTER TABLE "orders" DROP COLUMN IF EXISTS service_type;
ALTER TABLE "garments" ADD COLUMN IF NOT EXISTS service_type varchar NOT NULL;