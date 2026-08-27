"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { playPopSound } from "@/lib/sound";
import { BorderBeam } from "./BorderBeam";
import { ArrowRight } from "lucide-react";

interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
  showArrow?: boolean;
  withBeam?: boolean;
}

export const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(
  (
    { className, variant = "primary", showArrow = true, withBeam = false, children, onClick, ...props },
    ref
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      playPopSound("click");
      onClick?.(e);
    };

    if (variant === "ghost") {
      return (
        <button
          ref={ref}
          onClick={handleClick}
          className={cn(
            "group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-6 py-3 text-sm font-medium text-ink/90 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]",
            className
          )}
          {...props}
        >
          {children}
        </button>
      );
    }

    return (
      <button
        ref={ref}
        onClick={handleClick}
        className={cn(
          "group relative isolate inline-flex items-center gap-2 overflow-hidden rounded-full bg-emerald-glow px-7 py-3.5 text-sm font-semibold tracking-tight text-[#04120c] shadow-glow-emerald transition-transform duration-300 ease-out hover:scale-[1.03] active:scale-[0.98]",
          className
        )}
        {...props}
      >
        {withBeam && <BorderBeam duration={4} colorFrom="#FFFFFF" colorVia="#D1FAE5" />}
        <span className="relative z-10 flex items-center gap-2">
          {children}
          {showArrow && (
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          )}
        </span>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:animate-shine group-hover:opacity-100"
        />
      </button>
    );
  }
);

GlowButton.displayName = "GlowButton";
