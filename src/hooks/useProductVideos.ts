import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ProductVideo {
  id: string;
  product_handle: string;
  video_url: string;
  title: string | null;
  sort_order: number;
  created_at: string;
}

export function useProductVideos(productHandle: string) {
  return useQuery({
    queryKey: ["product-videos", productHandle],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("product_videos")
        .select("*")
        .eq("product_handle", productHandle)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as ProductVideo[];
    },
    enabled: !!productHandle,
  });
}
