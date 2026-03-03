import { useEffect, useState } from "react";
import { fetchAllProducts, type Product } from "@/lib/products";
import { ProductCard } from "./ProductCard";
import { Loader2, PackageOpen } from "lucide-react";
import { Link } from "react-router-dom";

export const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllProducts()
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
        <p className="text-muted-foreground font-body max-w-md mx-auto mb-4">
          No products have been added to the store. Add products from the admin panel.
        </p>
        <Link to="/admin" className="text-primary hover:underline text-sm font-body">
          Go to Admin Panel →
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
