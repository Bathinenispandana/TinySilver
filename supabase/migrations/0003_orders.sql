-- 1. Create custom ENUM type for Order Status
CREATE TYPE public.order_status AS ENUM ('PENDING', 'PAID', 'PROCESSING', 'DISPATCHED', 'DELIVERED', 'CANCELLED');

-- 2. Create the Orders table
CREATE TABLE public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  status public.order_status DEFAULT 'PENDING' NOT NULL,
  total_amount NUMERIC NOT NULL,
  shipping_address JSONB NOT NULL,
  payment_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create the Order Items table
CREATE TABLE public.order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  product_id TEXT NOT NULL, -- Store as TEXT to handle both string and integer IDs safely
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price_at_time NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- 5. Create RLS Policies for Orders

-- Customers can view their own orders
CREATE POLICY "Customers can view own orders" 
ON public.orders 
FOR SELECT 
USING (auth.uid() = user_id);

-- Customers can create their own orders
CREATE POLICY "Customers can create own orders" 
ON public.orders 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Admins can view all orders
CREATE POLICY "Admins can view all orders" 
ON public.orders 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() AND profiles.role = 'ADMIN'
  )
);

-- Admins can update all orders (e.g., change status)
CREATE POLICY "Admins can update all orders" 
ON public.orders 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() AND profiles.role = 'ADMIN'
  )
);


-- 6. Create RLS Policies for Order Items

-- Customers can view items in their own orders
CREATE POLICY "Customers can view own order items" 
ON public.order_items 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.orders 
    WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()
  )
);

-- Customers can insert items into their own orders
CREATE POLICY "Customers can create own order items" 
ON public.order_items 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.orders 
    WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()
  )
);

-- Admins can view all order items
CREATE POLICY "Admins can view all order items" 
ON public.order_items 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() AND profiles.role = 'ADMIN'
  )
);
