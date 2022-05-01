ALTER TABLE "garments" DROP COLUMN IF EXISTS service_type;
ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS service_type varchar NOT NULL DEFAULT 'Lavado';