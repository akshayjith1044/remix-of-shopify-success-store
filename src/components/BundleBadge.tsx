import { Gift } from "lucide-react";

interface BundleBadgeProps {
  label?: string;
}

export const BundleBadge = ({ label = "Buy 2 Get 1 Free" }: BundleBadgeProps) => (
  <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-destructive/90 text-destructive-foreground text-[10px] font-body font-semibold uppercase tracking-wider">
    <Gift className="h-3 w-3" />
    {label}
  </div>
);
