-- Create table for products
CREATE TABLE IF NOT EXISTS public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  title TEXT NOT NULL,
  handle TEXT NOT NULL UNIQUE,
  description TEXT,
  price NUMERIC NOT NULL,
  compare_at_price NUMERIC,
  currency TEXT NOT NULL DEFAULT 'USD',
  image_url TEXT,
  images TEXT[],
  category TEXT,
  tags TEXT[],
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER DEFAULT 0
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Anyone can view active products" ON public.products FOR SELECT USING (is_active = true);

-- Admin write access (allow insert/update/delete for authenticated users)
CREATE POLICY "Allow insert products" ON public.products FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update products" ON public.products FOR UPDATE USING (true);
CREATE POLICY "Allow delete products" ON public.products FOR DELETE USING (true);

-- Indexes for fast lookups
CREATE INDEX idx_products_handle ON public.products (handle);
CREATE INDEX idx_products_active ON public.products (is_active);
CREATE INDEX idx_products_sort_order ON public.products (sort_order);
