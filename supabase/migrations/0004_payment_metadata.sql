-- Add payment and delivery metadata to orders table
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS payment_id TEXT,
ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'PENDING',
ADD COLUMN IF NOT EXISTS payment_timestamp TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS delivery_fee DECIMAL(10, 2) DEFAULT 0;

-- Optional: You can create an index on payment_id for faster lookups during webhooks
CREATE INDEX IF NOT EXISTS idx_orders_payment_id ON orders(payment_id);
