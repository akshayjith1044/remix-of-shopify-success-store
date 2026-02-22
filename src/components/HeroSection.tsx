import { ArrowDown } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-dark overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(40_55%_55%/0.15),transparent_70%)]" />
      </div>
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 font-body animate-fade-in">
          Curated Collection
        </p>
        <h1 className="text-5xl md:text-7xl font-display font-semibold leading-tight mb-6 text-foreground animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Discover <span className="text-gradient-gold">Luxury</span>
        </h1>
        <p className="text-lg text-muted-foreground font-body max-w-lg mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Premium products crafted with intention. Explore our exclusive selection.
        </p>
        <a
          href="#products"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors animate-fade-in"
          style={{ animationDelay: '0.3s' }}
        >
          <span className="text-sm tracking-wider uppercase font-body">Shop Now</span>
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
};
