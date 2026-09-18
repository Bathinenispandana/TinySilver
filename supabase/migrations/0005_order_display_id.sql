-- 1. Clean up any previous attempts
ALTER TABLE public.orders DROP COLUMN IF EXISTS display_id;
DROP SEQUENCE IF EXISTS orders_display_id_seq;

-- 2. Create a sequence that starts at 1
CREATE SEQUENCE orders_display_id_seq START 1;

-- 3. Add the display_id column. 
-- LPAD pads the number with zeros until it is 4 digits long (e.g., 1 becomes 0001)
ALTER TABLE public.orders 
ADD COLUMN display_id TEXT UNIQUE DEFAULT 'TSC-' || LPAD(nextval('orders_display_id_seq')::TEXT, 4, '0');

-- 4. Create an index to make searching lightning fast
CREATE INDEX IF NOT EXISTS idx_orders_display_id ON public.orders(display_id);
