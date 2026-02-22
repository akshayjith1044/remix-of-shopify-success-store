import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductByHandle } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import type { ShopifyProduct } from "@/lib/shopify";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart, Loader2 } from "lucide-react";
import { toast } from "sonner";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct["node"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
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

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    await addItem({
      product: shopifyProduct,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
    toast.success("Added to cart", { description: product.title, position: "top-center" });
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
              <div className="aspect-square rounded-lg overflow-hidden bg-secondary mb-4">
                {images[selectedImage]?.node ? (
                  <img src={images[selectedImage].node.url} alt={images[selectedImage].node.altText || product.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <ShoppingCart className="h-12 w-12" />
                  </div>
                )}
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-16 h-16 rounded-md overflow-hidden flex-shrink-0 border-2 transition-colors ${
                        i === selectedImage ? 'border-primary' : 'border-transparent'
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
              <h1 className="font-display text-3xl md:text-4xl text-foreground mb-4">{product.title}</h1>
              <p className="text-2xl font-semibold text-primary mb-6">
                {selectedVariant?.price.currencyCode} {parseFloat(selectedVariant?.price.amount || '0').toFixed(2)}
              </p>
              <p className="text-muted-foreground font-body leading-relaxed mb-8">{product.description}</p>

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

              <Button
                onClick={handleAddToCart}
                disabled={isLoading || !selectedVariant?.availableForSale}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-4"
                size="lg"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : !selectedVariant?.availableForSale ? (
                  'Out of Stock'
                ) : (
                  <><ShoppingCart className="h-5 w-5 mr-2" />Add to Cart</>
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
