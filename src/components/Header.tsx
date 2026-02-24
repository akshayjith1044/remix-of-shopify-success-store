import { Link } from "react-router-dom";
import { CartDrawer } from "./CartDrawer";
import { Zap } from "lucide-react";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Zap className="h-4 w-4 text-primary" />
          </div>
          <span className="font-display text-lg font-bold tracking-tight text-foreground">
            Emmigo<span className="text-primary">Express</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-body tracking-wide text-muted-foreground hover:text-foreground transition-colors">
            Trending
          </Link>
          <Link to="/products" className="text-sm font-body tracking-wide text-muted-foreground hover:text-foreground transition-colors">
            All Products
          </Link>
          <Link to="/track-order" className="text-sm font-body tracking-wide text-muted-foreground hover:text-foreground transition-colors">
            Track Order
          </Link>
          <Link to="/contact" className="text-sm font-body tracking-wide text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </Link>
        </nav>
        <CartDrawer />
      </div>
    </header>
  );
};
