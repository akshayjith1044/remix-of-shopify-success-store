import { useEffect, useState } from "react";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Gift, Loader2 } from "lucide-react";

const Bundles = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts(20)
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-destructive/10 border border-destructive/20 mb-4">
              <Gift className="h-4 w-4 text-destructive" />
              <span className="text-xs font-body font-semibold text-destructive tracking-wider uppercase">Limited Time</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">Bundle & Save</h1>
            <p className="text-muted-foreground font-body max-w-md mx-auto">
              Buy 2 of any product and get 1 free. Mix and match across our entire collection!
            </p>
          </div>

          {/* How it works */}
          <div className="grid sm:grid-cols-3 gap-6 mb-16 max-w-2xl mx-auto">
            {[
              { step: "1", title: "Pick Any 2", desc: "Choose any two products from our store" },
              { step: "2", title: "Add to Cart", desc: "Add them to your cart as usual" },
              { step: "3", title: "Get 1 Free", desc: "We'll add a free item at checkout" },
            ].map((s) => (
              <div key={s.step} className="text-center p-4 rounded-xl border border-border bg-card">
                <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-3 font-display font-bold text-primary text-sm">
                  {s.step}
                </div>
                <p className="font-display font-semibold text-foreground text-sm mb-1">{s.title}</p>
                <p className="text-xs text-muted-foreground font-body">{s.desc}</p>
              </div>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <ProductCard key={product.node.id} product={product} index={index} showBundleBadge />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Bundles;
