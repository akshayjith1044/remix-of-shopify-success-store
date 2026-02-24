import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package, Search } from "lucide-react";

const TrackOrder = () => {
  const [trackingNumber, setTrackingNumber] = useState("");

  const handleTrack = () => {
    const num = trackingNumber.trim();
    if (!num) return;
    // Auto-detect carrier and open tracking
    if (/^1Z/i.test(num)) {
      window.open(`https://www.ups.com/track?tracknum=${num}`, "_blank");
    } else if (/^\d{12,15}$/.test(num)) {
      window.open(`https://www.fedex.com/fedextrack/?trknbr=${num}`, "_blank");
    } else {
      window.open(`https://tools.usps.com/go/TrackConfirmAction?tLabels=${num}`, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-6 py-16 max-w-xl">
          <div className="text-center mb-10">
            <div className="h-14 w-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
              <Package className="h-7 w-7 text-primary" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">Track Your Order</h1>
            <p className="text-sm text-muted-foreground font-body">Enter your tracking number to check your package status.</p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 space-y-5">
            <div>
              <label htmlFor="tracking" className="text-xs font-medium text-muted-foreground mb-1.5 block font-body">
                Tracking Number
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="tracking"
                  placeholder="e.g. 9400111899223456789012"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleTrack()}
                  className="pl-9 bg-secondary/30 border-border"
                />
              </div>
            </div>

            <Button
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={!trackingNumber.trim()}
              onClick={handleTrack}
            >
              <Search className="h-4 w-4 mr-2" />
              Track Package
            </Button>

            <p className="text-[11px] text-muted-foreground text-center font-body">
              We auto-detect your carrier (USPS, UPS, FedEx). Find your tracking number in the shipping confirmation email.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TrackOrder;
