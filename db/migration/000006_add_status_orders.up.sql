ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS payed_at timestamptz;
ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS delivered_at timestamptz;