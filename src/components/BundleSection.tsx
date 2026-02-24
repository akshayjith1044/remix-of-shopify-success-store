import { useEffect, useState } from "react";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "./ProductCard";
import { Gift, Loader2 } from "lucide-react";

export const BundleSection = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts(4)
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (products.length < 2) return null;

  return (
    <section className="container mx-auto px-6 py-16">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/10 border border-destructive/20 mb-3">
            <Gift className="h-3.5 w-3.5 text-destructive" />
            <span className="text-xs font-body font-medium text-destructive tracking-wider uppercase">Save More</span>
          </div>
          <h2 className="font-display text-3xl font-bold text-foreground">Bundle & Save</h2>
          <p className="text-sm text-muted-foreground font-body mt-2">Buy 2, get 1 free on select products. Mix and match!</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.slice(0, 4).map((product, index) => (
          <ProductCard key={product.node.id} product={product} index={index} showBundleBadge />
        ))}
      </div>
    </section>
  );
};
