import { useEffect, useState } from "react";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "./ProductCard";
import { Loader2, PackageOpen } from "lucide-react";

export const ProductGrid = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts(20)
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <PackageOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="font-display text-xl text-foreground mb-2">No products yet</h3>
        <p className="text-muted-foreground font-body max-w-md mx-auto">
          Tell me what products you'd like to sell — just describe the product name and price, and I'll add them to your store.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <ProductCard key={product.node.id} product={product} index={index} />
      ))}
    </div>
  );
};
