import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2, TrendingUp } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import type { ShopifyProduct } from "@/lib/shopify";
import { toast } from "sonner";
import { BundleBadge } from "./BundleBadge";

const PRODUCT_FALLBACK_IMAGES: Record<string, string> = {
  "led-galaxy-projector": "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=600&q=80",
  "portable-blender": "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=600&q=80",
  "posture-corrector": "https://images.unsplash.com/photo-1588776814546-1ffbb9b571cd?w=600&q=80",
  "magnetic-phone-mount": "https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=600&q=80",
  "smart-water-bottle": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80",
};

const DEFAULT_FALLBACK = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80";

interface ProductCardProps {
  product: ShopifyProduct;
  index: number;
  showBundleBadge?: boolean;
}

export const ProductCard = ({ product, index, showBundleBadge }: ProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  const { node } = product;
  const image = node.images.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;
  const variant = node.variants.edges[0]?.node;

  const imageUrl = image?.url || PRODUCT_FALLBACK_IMAGES[node.handle] || DEFAULT_FALLBACK;
  const imageAlt = image?.altText || node.title;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Added to cart", { description: node.title, position: "top-center" });
  };

  return (
    <Link
      to={`/product/${node.handle}`}
      className="group block animate-fade-in"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="card-hover rounded-xl overflow-hidden bg-card border border-border">
        <div className="relative aspect-square overflow-hidden bg-secondary">
          <img
            src={imageUrl}
            alt={imageAlt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-primary/90 text-primary-foreground text-[10px] font-body font-semibold uppercase tracking-wider">
              <TrendingUp className="h-3 w-3" />
              Trending
            </div>
            {showBundleBadge && <BundleBadge />}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <Button
            onClick={handleAddToCart}
            disabled={isLoading || !variant}
            size="sm"
            className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><ShoppingCart className="h-4 w-4 mr-2" />Add to Cart</>}
          </Button>
        </div>
        <div className="p-4">
          <h3 className="font-display text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {node.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2 font-body">{node.description}</p>
          <p className="text-lg font-display font-bold text-primary mt-2">
            {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  );
};
