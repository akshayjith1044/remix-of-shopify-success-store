import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductByHandle } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import type { ShopifyProduct } from "@/lib/shopify";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart, Loader2, Gift, Star, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { BundleBadge } from "@/components/BundleBadge";

const PRODUCT_FALLBACK_IMAGES: Record<string, string> = {
  "led-galaxy-projector": "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=600&q=80",
  "portable-blender": "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=600&q=80",
  "posture-corrector": "https://images.unsplash.com/photo-1588776814546-1ffbb9b571cd?w=600&q=80",
  "magnetic-phone-mount": "https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=600&q=80",
  "smart-water-bottle": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80",
};

const DEFAULT_FALLBACK = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80";

const bundleOptions = [
  { id: "single", label: "1 Pack", qty: 1, discount: 0, tag: "" },
  { id: "double", label: "2 Pack", qty: 2, discount: 10, tag: "Save 10%" },
  { id: "triple", label: "3 Pack", qty: 3, discount: 20, tag: "Best Value" },
];

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct["node"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedBundle, setSelectedBundle] = useState("single");
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);

  useEffect(() => {
    if (!handle) return;
    fetchProductByHandle(handle)
      .then(setProduct)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [handle]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 flex justify-center items-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 flex justify-center items-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="font-display text-2xl text-foreground mb-2">Product not found</h2>
            <Link to="/" className="text-primary hover:underline font-body text-sm">Back to shop</Link>
          </div>
        </div>
      </div>
    );
  }

  const images = product.images.edges;
  const variants = product.variants.edges;
  const selectedVariant = variants[selectedVariantIndex]?.node;
  const shopifyProduct: ShopifyProduct = { node: product };
  const bundle = bundleOptions.find(b => b.id === selectedBundle)!;
  const basePrice = parseFloat(selectedVariant?.price.amount || '0');
  const discountedTotal = (basePrice * bundle.qty * (1 - bundle.discount / 100));

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    await addItem({
      product: shopifyProduct,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: bundle.qty,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
    toast.success(`Added ${bundle.qty}x to cart`, { description: product.title, position: "top-center" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-6 py-10">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 font-body text-sm">
            <ArrowLeft className="h-4 w-4" /> Back to shop
          </Link>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Images */}
            <div>
              <div className="aspect-square rounded-xl overflow-hidden bg-secondary mb-4 border border-border">
                {images[selectedImage]?.node || PRODUCT_FALLBACK_IMAGES[product.handle] ? (
                  <img 
                    src={images[selectedImage]?.node.url || PRODUCT_FALLBACK_IMAGES[product.handle] || DEFAULT_FALLBACK} 
                    alt={images[selectedImage]?.node.altText || product.title} 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <ShoppingCart className="h-12 w-12" />
                  </div>
                )}
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                        i === selectedImage ? 'border-primary shadow-glow' : 'border-border hover:border-primary/40'
                      }`}
                    >
                      <img src={img.node.url} alt={img.node.altText || ''} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <BundleBadge label="Bundle Available" />
              </div>

              <h1 className="font-display text-3xl md:text-4xl text-foreground mb-4">{product.title}</h1>
              <p className="text-muted-foreground font-body leading-relaxed mb-6">{product.description}</p>

              {/* Options */}
              {product.options?.filter(o => o.name !== 'Title').map((option) => (
                <div key={option.name} className="mb-6">
                  <label className="block text-sm font-medium text-foreground mb-2 font-body">{option.name}</label>
                  <div className="flex flex-wrap gap-2">
                    {option.values.map((value) => {
                      const variantIndex = variants.findIndex(v => 
                        v.node.selectedOptions.some(o => o.name === option.name && o.value === value)
                      );
                      const isSelected = variants[selectedVariantIndex]?.node.selectedOptions.some(
                        o => o.name === option.name && o.value === value
                      );
                      return (
                        <button
                          key={value}
                          onClick={() => variantIndex >= 0 && setSelectedVariantIndex(variantIndex)}
                          className={`px-4 py-2 rounded-md text-sm font-body border transition-colors ${
                            isSelected
                              ? 'border-primary bg-primary/10 text-primary'
                              : 'border-border text-muted-foreground hover:border-primary/50'
                          }`}
                        >
                          {value}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Bundle options */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2 font-body">
                  <Gift className="h-4 w-4 inline mr-1.5 text-primary" />
                  Bundle & Save
                </label>
                <div className="grid gap-2">
                  {bundleOptions.map((opt) => {
                    const total = basePrice * opt.qty * (1 - opt.discount / 100);
                    const isSelected = selectedBundle === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => setSelectedBundle(opt.id)}
                        className={`flex items-center justify-between p-3 rounded-lg border transition-all text-left ${
                          isSelected
                            ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
                            : 'border-border hover:border-primary/30'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                            isSelected ? 'border-primary' : 'border-muted-foreground/30'
                          }`}>
                            {isSelected && <div className="h-2.5 w-2.5 rounded-full bg-primary" />}
                          </div>
                          <div>
                            <span className="font-display font-semibold text-sm text-foreground">{opt.label}</span>
                            {opt.tag && (
                              <span className="ml-2 text-[10px] font-body font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-destructive/10 text-destructive">
                                {opt.tag}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-display font-bold text-foreground text-sm">
                            {selectedVariant?.price.currencyCode} {total.toFixed(2)}
                          </p>
                          {opt.discount > 0 && (
                            <p className="text-[11px] text-muted-foreground font-body line-through">
                              {selectedVariant?.price.currencyCode} {(basePrice * opt.qty).toFixed(2)}
                            </p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price + Add to cart */}
              <div className="rounded-xl border border-border bg-card p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground font-body">Total</p>
                    <p className="text-2xl font-display font-bold text-primary">
                      {selectedVariant?.price.currencyCode} {discountedTotal.toFixed(2)}
                    </p>
                  </div>
                  {bundle.discount > 0 && (
                    <div className="flex items-center gap-1.5 text-xs text-primary font-body">
                      <CheckCircle className="h-3.5 w-3.5" />
                      You save {selectedVariant?.price.currencyCode} {(basePrice * bundle.qty - discountedTotal).toFixed(2)}
                    </div>
                  )}
                </div>
                <Button 
                  onClick={handleAddToCart}
                  disabled={isLoading || !selectedVariant?.availableForSale}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  size="lg"
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : !selectedVariant?.availableForSale ? (
                    'Out of Stock'
                  ) : (
                    <><ShoppingCart className="h-5 w-5 mr-2" />Add {bundle.qty}x to Cart</>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
