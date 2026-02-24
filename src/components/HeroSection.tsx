import { ArrowDown, Sparkles, TrendingUp, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Trending products collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-glow bg-primary/10 mb-6 animate-fade-in">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-body font-medium text-primary tracking-wider uppercase">Trending Now</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-8xl font-display font-bold leading-[0.95] mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Discover What's{' '}
            <span className="text-gradient-brand">Next</span>
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground font-body max-w-lg mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Curated trending products delivered to your door. We find the hottest niche products so you don't have to.
          </p>

          <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-body font-semibold text-sm hover:bg-primary/90 transition-colors shadow-glow"
            >
              Shop Trending
              <ArrowDown className="h-4 w-4" />
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-6 mt-14 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            {[
              { icon: TrendingUp, label: "Trending Products" },
              { icon: Truck, label: "Fast US Shipping" },
              { icon: Sparkles, label: "Quality Guaranteed" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-muted-foreground">
                <Icon className="h-4 w-4 text-primary/60" />
                <span className="text-xs font-body">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
