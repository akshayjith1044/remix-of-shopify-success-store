import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Truck, Clock, DollarSign } from "lucide-react";

const ShippingPolicy = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="pt-16">
      <div className="container mx-auto px-6 py-16 max-w-3xl">
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">Shipping Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: February 23, 2026</p>

        <div className="grid gap-4 mb-10 sm:grid-cols-3">
          {[
            { icon: Truck, title: "Free Shipping", desc: "On orders over $50" },
            { icon: Clock, title: "Processing", desc: "1–3 business days" },
            { icon: DollarSign, title: "Flat Rate", desc: "$4.99 under $50" },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-xl border border-border bg-card p-4 text-center">
              <Icon className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="font-display font-semibold text-foreground text-sm">{title}</p>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>

        <div className="space-y-6 text-sm text-secondary-foreground leading-relaxed font-body">
          <section>
            <h2 className="text-lg font-display font-semibold text-foreground mb-2">Domestic Shipping (United States)</h2>
            <p>We ship to all 50 US states, including Alaska, Hawaii, and US territories. Standard shipping typically takes 5–8 business days. Expedited shipping (2–4 business days) is available at checkout for an additional fee.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-foreground mb-2">Order Processing</h2>
            <p>Orders are processed within 1–3 business days (Monday–Friday, excluding federal holidays). You will receive a shipping confirmation email with your tracking number once your order ships.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-foreground mb-2">Shipping Carriers</h2>
            <p>We ship via USPS, UPS, and FedEx depending on package size and destination. The carrier is selected automatically at checkout for the best rate and delivery time.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-foreground mb-2">International Shipping</h2>
            <p>We currently ship only within the United States. We are working on expanding to international destinations — stay tuned!</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-foreground mb-2">Lost or Damaged Packages</h2>
            <p>If your package is lost or arrives damaged, please contact us at support@emmigoexpress.com within 7 days of the expected delivery date. We will work with the carrier to resolve the issue or send a replacement.</p>
          </section>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default ShippingPolicy;
