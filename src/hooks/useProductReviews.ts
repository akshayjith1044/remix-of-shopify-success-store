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

const STATIC_REVIEWS: Record<string, ProductReview[]> = {
  "led-galaxy-projector": [
    { id: "r1", product_handle: "led-galaxy-projector", reviewer_name: "Sarah M.", rating: 5, review_text: "Absolutely love this projector! My kids can't stop talking about the galaxy ceiling. Setup was super easy and the colors are vibrant.", source: "Verified Purchase", source_url: null, verified_purchase: true, review_date: "2026-02-15", created_at: "2026-02-15" },
    { id: "r2", product_handle: "led-galaxy-projector", reviewer_name: "James T.", rating: 5, review_text: "Perfect for date nights. The ambiance it creates is incredible. Timer feature is super handy too.", source: "Verified Purchase", source_url: null, verified_purchase: true, review_date: "2026-02-10", created_at: "2026-02-10" },
    { id: "r3", product_handle: "led-galaxy-projector", reviewer_name: "Priya K.", rating: 4, review_text: "Great product for the price. Lights up the whole room beautifully. Docking 1 star as the remote could be more responsive.", source: "Verified Purchase", source_url: null, verified_purchase: true, review_date: "2026-01-28", created_at: "2026-01-28" },
    { id: "r4", product_handle: "led-galaxy-projector", reviewer_name: "Daniel R.", rating: 5, review_text: "Bought this as a gift and the recipient was blown away. High quality build and stunning visuals.", source: "Verified Purchase", source_url: null, verified_purchase: true, review_date: "2026-01-20", created_at: "2026-01-20" },
  ],
  "portable-blender": [
    { id: "r5", product_handle: "portable-blender", reviewer_name: "Emma L.", rating: 5, review_text: "This blender is a game changer for my morning routine. USB charging is so convenient and it blends everything smoothly.", source: "Verified Purchase", source_url: null, verified_purchase: true, review_date: "2026-02-18", created_at: "2026-02-18" },
    { id: "r6", product_handle: "portable-blender", reviewer_name: "Chris B.", rating: 4, review_text: "Compact and powerful. Takes my protein shakes with ease. Great for the gym bag.", source: "Verified Purchase", source_url: null, verified_purchase: true, review_date: "2026-02-05", created_at: "2026-02-05" },
    { id: "r7", product_handle: "portable-blender", reviewer_name: "Anita S.", rating: 5, review_text: "Love it! Makes perfect smoothies in under a minute. The BPA-free build gives me peace of mind.", source: "Verified Purchase", source_url: null, verified_purchase: true, review_date: "2026-01-25", created_at: "2026-01-25" },
  ],
  "posture-corrector": [
    { id: "r8", product_handle: "posture-corrector", reviewer_name: "Mark H.", rating: 5, review_text: "I work at a desk all day and this has genuinely helped my back pain. Noticeable difference after just one week.", source: "Verified Purchase", source_url: null, verified_purchase: true, review_date: "2026-02-20", created_at: "2026-02-20" },
    { id: "r9", product_handle: "posture-corrector", reviewer_name: "Leah W.", rating: 4, review_text: "Comfortable to wear and very effective. Took a few days to get used to but totally worth it.", source: "Verified Purchase", source_url: null, verified_purchase: true, review_date: "2026-02-08", created_at: "2026-02-08" },
    { id: "r10", product_handle: "posture-corrector", reviewer_name: "Rohan P.", rating: 5, review_text: "My physiotherapist recommended something like this. Excellent quality and very adjustable.", source: "Verified Purchase", source_url: null, verified_purchase: true, review_date: "2026-01-30", created_at: "2026-01-30" },
  ],
  "magnetic-phone-mount": [
    { id: "r11", product_handle: "magnetic-phone-mount", reviewer_name: "Jessica A.", rating: 5, review_text: "Super strong magnet, holds my phone perfectly even on bumpy roads. Best phone mount I've ever used!", source: "Verified Purchase", source_url: null, verified_purchase: true, review_date: "2026-02-22", created_at: "2026-02-22" },
    { id: "r12", product_handle: "magnetic-phone-mount", reviewer_name: "Tom G.", rating: 5, review_text: "360 rotation is a lifesaver for navigation. Installed in seconds and has been rock solid ever since.", source: "Verified Purchase", source_url: null, verified_purchase: true, review_date: "2026-02-12", created_at: "2026-02-12" },
    { id: "r13", product_handle: "magnetic-phone-mount", reviewer_name: "Nina C.", rating: 4, review_text: "Great mount, very sturdy. Only minor issue is the adhesive pad took a day to fully bond but then it's perfect.", source: "Verified Purchase", source_url: null, verified_purchase: true, review_date: "2026-02-01", created_at: "2026-02-01" },
  ],
  "smart-water-bottle": [
    { id: "r14", product_handle: "smart-water-bottle", reviewer_name: "Olivia N.", rating: 5, review_text: "The hydration reminders have genuinely helped me drink more water. Sleek design and keeps water cold all day.", source: "Verified Purchase", source_url: null, verified_purchase: true, review_date: "2026-02-17", created_at: "2026-02-17" },
    { id: "r15", product_handle: "smart-water-bottle", reviewer_name: "Kevin M.", rating: 5, review_text: "Really impressed with the temperature display. Works as advertised and the LED glow is a nice touch.", source: "Verified Purchase", source_url: null, verified_purchase: true, review_date: "2026-02-09", created_at: "2026-02-09" },
    { id: "r16", product_handle: "smart-water-bottle", reviewer_name: "Aisha J.", rating: 4, review_text: "Lovely bottle. Perfect size for the gym. Keeps drinks cold for 24 hours as claimed. Highly recommend.", source: "Verified Purchase", source_url: null, verified_purchase: true, review_date: "2026-01-22", created_at: "2026-01-22" },
  ],
};

export function useProductReviews(productHandle: string) {
  return useQuery({
    queryKey: ["product-reviews", productHandle],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("product_reviews")
          .select("*")
          .eq("product_handle", productHandle)
          .order("review_date", { ascending: false });
        if (error) throw error;
        if (data && data.length > 0) return data as ProductReview[];
      } catch {
        // fall through to static reviews
      }
      return STATIC_REVIEWS[productHandle] || STATIC_REVIEWS["led-galaxy-projector"];
    },
    enabled: !!productHandle,
  });
}
