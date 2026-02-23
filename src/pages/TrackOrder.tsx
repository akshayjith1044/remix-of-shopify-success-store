import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package, ExternalLink, Search } from "lucide-react";

const carriers = [
  { name: "USPS", url: "https://tools.usps.com/go/TrackConfirmAction?tLabels=", color: "text-blue-400" },
  { name: "UPS", url: "https://www.ups.com/track?tracknum=", color: "text-yellow-400" },
  { name: "FedEx", url: "https://www.fedex.com/fedextrack/?trknbr=", color: "text-orange-400" },
];

const TrackOrder = () => {
  const [trackingNumber, setTrackingNumber] = useState("");

  const handleTrack = (carrierUrl: string) => {
    if (trackingNumber.trim()) {
      window.open(`${carrierUrl}${trackingNumber.trim()}`, "_blank");
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
            <p className="text-sm text-muted-foreground font-body">Enter your tracking number and select a carrier to track your package.</p>
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
                  className="pl-9 bg-secondary/30 border-border"
                />
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground font-body">Select Carrier</p>
              <div className="grid gap-2">
                {carriers.map((carrier) => (
                  <Button
                    key={carrier.name}
                    variant="outline"
                    className="w-full justify-between"
                    disabled={!trackingNumber.trim()}
                    onClick={() => handleTrack(carrier.url)}
                  >
                    <span className={`font-display font-semibold ${carrier.color}`}>{carrier.name}</span>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-6 font-body">
            You'll find your tracking number in the shipping confirmation email we sent after your order shipped.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TrackOrder;
