import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ProductReview {
  id: string;
  product_handle: string;
  reviewer_name: string;
  rating: number;
  review_text: string | null;
  source: string;
  source_url: string | null;
  verified_purchase: boolean;
  review_date: string;
  created_at: string;
}

export function useProductReviews(productHandle: string) {
  return useQuery({
    queryKey: ["product-reviews", productHandle],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("product_reviews")
        .select("*")
        .eq("product_handle", productHandle)
        .order("review_date", { ascending: false });
      if (error) throw error;
      return data as ProductReview[];
    },
    enabled: !!productHandle,
  });
}
