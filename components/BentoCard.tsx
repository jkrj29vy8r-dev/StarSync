import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BentoCardProps {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
  children: ReactNode;
}

export function BentoCard({ eyebrow, title, description, className, children }: BentoCardProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111315] p-6 shadow-inset-hairline transition-all duration-300 hover:border-white/[0.14] hover:shadow-card-hover",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-emerald-glow/[0.06] blur-3xl transition-opacity duration-500 group-hover:opacity-100"
      />
      <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-emerald-glow/80">
        {eyebrow}
      </span>
      <h3 className="mt-2 text-lg font-semibold tracking-tight text-ink">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-ink/50">{description}</p>
      <div className="relative mt-6 flex-1">{children}</div>
    </div>
  );
}
