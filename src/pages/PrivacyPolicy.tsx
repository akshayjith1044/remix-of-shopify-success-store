import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const PrivacyPolicy = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="pt-16">
      <div className="container mx-auto px-6 py-16 max-w-3xl">
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: February 23, 2026</p>

        <div className="prose-policy space-y-6 text-sm text-secondary-foreground leading-relaxed font-body">
          <section>
            <h2 className="text-lg font-display font-semibold text-foreground mb-2">1. Information We Collect</h2>
            <p>When you visit EmmigoExpress, we may collect personal information you provide directly, such as your name, email address, shipping address, and payment details when you place an order. We also automatically collect device and browsing information through cookies and similar technologies, including your IP address, browser type, and pages viewed.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-foreground mb-2">2. How We Use Your Information</h2>
            <p>We use the information we collect to process and fulfill your orders, communicate with you about your purchases, improve our website and services, send promotional communications (with your consent), and comply with legal obligations under United States law.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-foreground mb-2">3. Information Sharing</h2>
            <p>We do not sell your personal information. We may share your data with shipping carriers (USPS, UPS, FedEx) to deliver your orders, payment processors to complete transactions, and service providers who assist our operations under strict confidentiality agreements.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-foreground mb-2">4. Data Security</h2>
            <p>We implement industry-standard security measures including SSL encryption, secure payment processing, and restricted access controls. However, no method of electronic transmission is 100% secure.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-foreground mb-2">5. Your Rights</h2>
            <p>Depending on your state of residence, you may have the right to access, correct, delete, or port your personal data. California residents have additional rights under the CCPA/CPRA. To exercise any rights, contact us at support@emmigoexpress.com.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-foreground mb-2">6. Cookies</h2>
            <p>We use essential cookies for site functionality and analytics cookies to understand how visitors interact with our site. You can manage cookie preferences through your browser settings.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-foreground mb-2">7. Children's Privacy</h2>
            <p>Our website is not directed at children under 13. We do not knowingly collect personal information from children under 13 in compliance with COPPA.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-foreground mb-2">8. Contact Us</h2>
            <p>If you have questions about this Privacy Policy, contact us at support@emmigoexpress.com.</p>
          </section>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default PrivacyPolicy;
