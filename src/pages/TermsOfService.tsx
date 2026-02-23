import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const TermsOfService = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="pt-16">
      <div className="container mx-auto px-6 py-16 max-w-3xl">
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: February 23, 2026</p>

        <div className="space-y-6 text-sm text-secondary-foreground leading-relaxed font-body">
          <section>
            <h2 className="text-lg font-display font-semibold text-foreground mb-2">1. Acceptance of Terms</h2>
            <p>By accessing or using EmmigoExpress ("we", "us", "our"), you agree to be bound by these Terms of Service. If you do not agree, please do not use our website. These terms are governed by the laws of the United States.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-foreground mb-2">2. Eligibility</h2>
            <p>You must be at least 18 years old or the age of majority in your state of residence to make purchases. By using this site, you represent that you meet these requirements.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-foreground mb-2">3. Products & Pricing</h2>
            <p>All prices are listed in US Dollars (USD). We reserve the right to modify prices at any time. We make every effort to display accurate product information but do not guarantee that descriptions, images, or pricing are error-free.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-foreground mb-2">4. Orders & Payment</h2>
            <p>By placing an order, you agree to provide accurate payment and shipping information. We reserve the right to cancel or refuse any order for any reason, including suspected fraud. All payments are processed securely through our payment provider.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-foreground mb-2">5. Intellectual Property</h2>
            <p>All content on this website, including text, images, logos, and graphics, is the property of EmmigoExpress and is protected by US copyright and trademark laws. You may not reproduce, distribute, or create derivative works without our written consent.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-foreground mb-2">6. Limitation of Liability</h2>
            <p>To the fullest extent permitted by law, EmmigoExpress shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or products.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-foreground mb-2">7. Dispute Resolution</h2>
            <p>Any disputes arising from these terms shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association. You agree to waive your right to a jury trial or participation in a class action.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-foreground mb-2">8. Contact</h2>
            <p>Questions about these Terms? Contact us at support@emmigoexpress.com.</p>
          </section>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default TermsOfService;
