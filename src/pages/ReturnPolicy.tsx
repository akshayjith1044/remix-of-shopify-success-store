import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const ReturnPolicy = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="pt-16">
      <div className="container mx-auto px-6 py-16 max-w-3xl">
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">Return & Refund Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: February 23, 2026</p>

        <div className="space-y-6 text-sm text-secondary-foreground leading-relaxed font-body">
          <section>
            <h2 className="text-lg font-display font-semibold text-foreground mb-2">30-Day Return Window</h2>
            <p>We offer a 30-day return policy. You have 30 days from the date of delivery to initiate a return. Items must be unused, in their original packaging, and in the same condition you received them.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-foreground mb-2">How to Initiate a Return</h2>
            <p>To start a return, email us at support@emmigoexpress.com with your order number and reason for return. We will provide a return shipping label and instructions. Return shipping costs are the responsibility of the customer unless the item arrived defective or incorrect.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-foreground mb-2">Refunds</h2>
            <p>Once we receive and inspect your return, we will notify you via email. Approved refunds are processed to your original payment method within 5–10 business days. Please note your bank may take additional time to post the refund.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-foreground mb-2">Exchanges</h2>
            <p>We do not offer direct exchanges. To get a different item, please return the original and place a new order.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-foreground mb-2">Non-Returnable Items</h2>
            <p>The following items cannot be returned: gift cards, items marked as final sale, and items that have been used, damaged by the customer, or are missing original packaging.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-foreground mb-2">Defective or Incorrect Items</h2>
            <p>If you receive a defective or incorrect item, contact us immediately at support@emmigoexpress.com. We will cover return shipping and send a replacement or full refund at no cost to you.</p>
          </section>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default ReturnPolicy;
