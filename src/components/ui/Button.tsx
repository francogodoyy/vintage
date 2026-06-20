"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium uppercase tracking-widest transition-colors border",
          "disabled:opacity-40 disabled:cursor-not-allowed",
          {
            primary:
              "bg-rust text-carbon border-rust hover:bg-rust-light active:bg-rust",
            secondary:
              "bg-transparent text-parchment border-steel hover:bg-charcoal active:bg-concrete",
            ghost:
              "bg-transparent text-smoke border-transparent hover:text-parchment hover:border-steel",
            danger:
              "bg-transparent text-rust border-rust/30 hover:bg-rust hover:text-carbon",
          }[variant],
          {
            sm: "px-3 py-1.5 text-xs",
            md: "px-5 py-2.5 text-sm",
            lg: "px-8 py-3.5 text-base",
          }[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export default Button;
