-- Drop NOT NULL constraint on user_id to allow guest orders
ALTER TABLE public.orders ALTER COLUMN user_id DROP NOT NULL;

-- Add new columns for guest tracking and data storage
ALTER TABLE public.orders ADD COLUMN customer_email TEXT;
ALTER TABLE public.orders ADD COLUMN tracking_token UUID DEFAULT gen_random_uuid();
ALTER TABLE public.orders ADD COLUMN is_guest BOOLEAN DEFAULT false;

-- (Optional but recommended) Add an index on tracking_token for fast lookups
CREATE INDEX IF NOT EXISTS idx_orders_tracking_token ON public.orders(tracking_token);
