import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "mint" | "excellent" | "good" | "fair" | "reserved";
  className?: string;
}

const variantStyles: Record<string, string> = {
  default: "bg-steel text-smoke",
  mint: "bg-rust/20 text-rust border-rust/30",
  excellent: "bg-green-950 text-green-400 border-green-800",
  good: "bg-yellow-950 text-yellow-400 border-yellow-800",
  fair: "bg-orange-950 text-orange-400 border-orange-800",
  reserved: "bg-rust text-carbon",
};

export default function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest border",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
