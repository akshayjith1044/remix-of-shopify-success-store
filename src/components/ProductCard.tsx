import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2, TrendingUp } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import type { ShopifyProduct } from "@/lib/shopify";
import { toast } from "sonner";
import { BundleBadge } from "./BundleBadge";

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
          {image ? (
            <img
              src={image.url}
              alt={image.altText || node.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <ShoppingCart className="h-8 w-8" />
            </div>
          )}
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
