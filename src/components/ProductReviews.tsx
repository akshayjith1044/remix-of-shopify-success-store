import { useProductReviews } from "@/hooks/useProductReviews";
import { Star, CheckCircle, ExternalLink } from "lucide-react";

interface ProductReviewsProps {
  productHandle: string;
}

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? "fill-primary text-primary" : "text-muted-foreground/30"}`}
      />
    ))}
  </div>
);

export const ProductReviews = ({ productHandle }: ProductReviewsProps) => {
  const { data: reviews, isLoading } = useProductReviews(productHandle);

  if (isLoading || !reviews?.length) return null;

  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <section className="mt-12">
      <div className="flex items-center gap-3 mb-6">
        <Star className="h-5 w-5 fill-primary text-primary" />
        <h2 className="font-display text-2xl font-bold text-foreground">Customer Reviews</h2>
        <div className="flex items-center gap-1.5 ml-auto">
          <StarRating rating={Math.round(avgRating)} />
          <span className="text-sm font-body text-muted-foreground">
            {avgRating.toFixed(1)} ({reviews.length})
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="rounded-xl border border-border bg-card p-5"
          >
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-display font-semibold text-sm text-foreground">
                    {review.reviewer_name}
                  </span>
                  {review.verified_purchase && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-body font-semibold uppercase tracking-wider text-primary">
                      <CheckCircle className="h-3 w-3" /> Verified
                    </span>
                  )}
                </div>
                <StarRating rating={review.rating} />
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-body">
                {review.source !== "manual" && (
                  <span className="px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground text-[10px] uppercase tracking-wider">
                    {review.source}
                  </span>
                )}
                <span>{new Date(review.review_date).toLocaleDateString()}</span>
              </div>
            </div>
            {review.review_text && (
              <p className="text-sm font-body text-muted-foreground leading-relaxed mt-2">
                {review.review_text}
              </p>
            )}
            {review.source_url && (
              <a
                href={review.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2 font-body"
              >
                View original <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
