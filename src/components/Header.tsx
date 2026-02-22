import { Link } from "react-router-dom";
import { CartDrawer } from "./CartDrawer";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-display text-xl tracking-wider text-gradient-gold">
          LUXE STORE
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-body tracking-wide text-muted-foreground hover:text-foreground transition-colors">
            Shop
          </Link>
        </nav>
        <CartDrawer />
      </div>
    </header>
  );
};
