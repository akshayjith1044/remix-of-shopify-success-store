import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import type { ShopifyProduct } from "@/lib/shopify";
import { toast } from "sonner";

interface ProductCardProps {
  product: ShopifyProduct;
  index: number;
}

export const ProductCard = ({ product, index }: ProductCardProps) => {
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
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative aspect-square overflow-hidden rounded-lg bg-secondary mb-4">
        {image ? (
          <img
            src={image.url}
            alt={image.altText || node.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <ShoppingCart className="h-8 w-8" />
          </div>
        )}
        <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-300" />
        <Button
          onClick={handleAddToCart}
          disabled={isLoading || !variant}
          size="sm"
          className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><ShoppingCart className="h-4 w-4 mr-1" />Add</>}
        </Button>
      </div>
      <h3 className="font-body text-sm font-medium text-foreground group-hover:text-primary transition-colors">
        {node.title}
      </h3>
      <p className="text-sm text-primary font-semibold mt-1">
        {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
      </p>
    </Link>
  );
};
