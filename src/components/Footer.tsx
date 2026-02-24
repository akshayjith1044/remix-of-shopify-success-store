import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

export const Footer = () => (
  <footer className="border-t border-border py-10">
    <div className="container mx-auto px-6">
      <div className="grid gap-8 sm:grid-cols-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Zap className="h-4 w-4 text-primary" />
            <span className="font-display text-sm font-semibold text-foreground">EmmigoExpress</span>
          </div>
          <p className="text-xs text-muted-foreground font-body leading-relaxed">Trending products delivered fast across the United States.</p>
        </div>
        <div>
          <p className="font-display text-xs font-semibold text-foreground mb-3 uppercase tracking-wider">Shop</p>
          <nav className="flex flex-col gap-2">
            <Link to="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors font-body">Home</Link>
            <Link to="/products" className="text-xs text-muted-foreground hover:text-foreground transition-colors font-body">All Products</Link>
            <Link to="/bundles" className="text-xs text-muted-foreground hover:text-foreground transition-colors font-body">Bundles</Link>
          </nav>
        </div>
        <div>
          <p className="font-display text-xs font-semibold text-foreground mb-3 uppercase tracking-wider">Support</p>
          <nav className="flex flex-col gap-2">
            <Link to="/track-order" className="text-xs text-muted-foreground hover:text-foreground transition-colors font-body">Track Order</Link>
            <Link to="/contact" className="text-xs text-muted-foreground hover:text-foreground transition-colors font-body">Contact Us</Link>
          </nav>
        </div>
        <div>
          <p className="font-display text-xs font-semibold text-foreground mb-3 uppercase tracking-wider">Policies</p>
          <nav className="flex flex-col gap-2">
            <Link to="/privacy-policy" className="text-xs text-muted-foreground hover:text-foreground transition-colors font-body">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-xs text-muted-foreground hover:text-foreground transition-colors font-body">Terms of Service</Link>
            <Link to="/shipping-policy" className="text-xs text-muted-foreground hover:text-foreground transition-colors font-body">Shipping Policy</Link>
            <Link to="/return-policy" className="text-xs text-muted-foreground hover:text-foreground transition-colors font-body">Return & Refund Policy</Link>
          </nav>
        </div>
      </div>
      <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-xs text-muted-foreground font-body">© 2026 emmigoexpress.com — All rights reserved.</p>
        <p className="text-xs text-muted-foreground font-body">United States 🇺🇸</p>
      </div>
    </div>
  </footer>
);
