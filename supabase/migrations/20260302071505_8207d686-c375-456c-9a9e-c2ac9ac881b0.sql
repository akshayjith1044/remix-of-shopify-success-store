
-- Allow insert/update/delete on product_videos and product_reviews for admin usage
-- (Temporary open policies — should be restricted with auth later)
CREATE POLICY "Allow insert product videos" ON public.product_videos FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow delete product videos" ON public.product_videos FOR DELETE USING (true);
CREATE POLICY "Allow insert product reviews" ON public.product_reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow delete product reviews" ON public.product_reviews FOR DELETE USING (true);

-- Allow upload to product-videos bucket
CREATE POLICY "Allow upload product videos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'product-videos');
