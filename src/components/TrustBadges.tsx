import { ShieldCheck, Lock, CreditCard, RefreshCw } from "lucide-react";

const badges = [
  { icon: ShieldCheck, label: "Secure Checkout", sub: "SSL Encrypted" },
  { icon: CreditCard, label: "Stripe Payments", sub: "Trusted by millions" },
  { icon: Lock, label: "Data Protected", sub: "PCI Compliant" },
  { icon: RefreshCw, label: "Easy Returns", sub: "30-day guarantee" },
];

export const TrustBadges = () => (
  <div className="flex flex-wrap items-center justify-center gap-6 py-6">
    {badges.map((b) => (
      <div key={b.label} className="flex items-center gap-2.5">
        <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-primary/10">
          <b.icon className="h-4.5 w-4.5 text-primary" />
        </div>
        <div>
          <p className="font-display text-xs font-semibold text-foreground leading-tight">{b.label}</p>
          <p className="text-[10px] text-muted-foreground font-body leading-tight">{b.sub}</p>
        </div>
      </div>
    ))}
  </div>
);
