
-- Create table for UGC videos linked to products
CREATE TABLE public.product_videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_handle TEXT NOT NULL,
  video_url TEXT NOT NULL,
  title TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for imported reviews
CREATE TABLE public.product_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_handle TEXT NOT NULL,
  reviewer_name TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5,
  review_text TEXT,
  source TEXT DEFAULT 'manual',
  source_url TEXT,
  verified_purchase BOOLEAN DEFAULT false,
  review_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.product_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_reviews ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Anyone can view product videos" ON public.product_videos FOR SELECT USING (true);
CREATE POLICY "Anyone can view product reviews" ON public.product_reviews FOR SELECT USING (true);

-- Indexes for fast lookups
CREATE INDEX idx_product_videos_handle ON public.product_videos (product_handle);
CREATE INDEX idx_product_reviews_handle ON public.product_reviews (product_handle);

-- Storage bucket for video uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('product-videos', 'product-videos', true);

-- Public read access for videos
CREATE POLICY "Anyone can view product videos storage" ON storage.objects FOR SELECT USING (bucket_id = 'product-videos');
