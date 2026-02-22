import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ProductGrid } from "@/components/ProductGrid";
import { Zap } from "lucide-react";

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
      <footer className="border-t border-border py-10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            <span className="font-display text-sm font-semibold text-foreground">EmmigoExpress</span>
          </div>
          <p className="text-xs text-muted-foreground font-body">© 2026 emmigoexpress.com — All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
