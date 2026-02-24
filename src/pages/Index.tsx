import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ProductGrid } from "@/components/ProductGrid";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <HeroSection />
        <section id="products" className="container mx-auto px-6 py-16">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-xs font-body tracking-widest uppercase text-primary mb-2">What's Hot</p>
              <h2 className="font-display text-3xl font-bold text-foreground">Our Products</h2>
            </div>
          </div>
          <ProductGrid />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
