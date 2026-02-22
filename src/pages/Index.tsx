import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ProductGrid } from "@/components/ProductGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <HeroSection />
        <section id="products" className="container mx-auto px-6 py-16">
          <div className="mb-10">
            <h2 className="font-display text-3xl text-foreground mb-2">Our Collection</h2>
            <p className="text-muted-foreground font-body">Handpicked for the discerning eye</p>
          </div>
          <ProductGrid />
        </section>
      </main>
      <footer className="border-t border-border py-8 text-center">
        <p className="text-sm text-muted-foreground font-body">© 2026 Luxe Store. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
