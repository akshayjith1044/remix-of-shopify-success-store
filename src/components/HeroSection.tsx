import { ArrowDown, Sparkles, TrendingUp, Truck } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-glow bg-primary/5 mb-6 animate-fade-in">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-body font-medium text-primary tracking-wider uppercase">Trending Now</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold leading-tight mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Discover What's{' '}
          <span className="text-gradient-brand">Next</span>
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground font-body max-w-lg mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Curated trending products delivered to your door. We find the hottest niche products so you don't have to.
        </p>

        <a
          href="#products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-body font-medium text-sm hover:bg-primary/90 transition-colors animate-fade-in"
          style={{ animationDelay: '0.3s' }}
        >
          Shop Trending
          <ArrowDown className="h-4 w-4" />
        </a>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-6 mt-14 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          {[
            { icon: TrendingUp, label: "Trending Products" },
            { icon: Truck, label: "Fast Shipping" },
            { icon: Sparkles, label: "Quality Guaranteed" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-muted-foreground">
              <Icon className="h-4 w-4 text-primary/60" />
              <span className="text-xs font-body">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
