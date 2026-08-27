"use client";

import { Star } from "lucide-react";
import { GlowButton } from "./GlowButton";

const LINKS = [
  { label: "Funcționalități", href: "#funcționalități" },
  { label: "Comparație", href: "#comparație" },
  { label: "Prețuri", href: "#prețuri" },
  { label: "Întrebări", href: "#faq" },
];

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav className="glass-panel flex w-full max-w-5xl items-center justify-between rounded-full px-4 py-2.5">
        <a href="#" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-glow/15">
            <Star className="h-3.5 w-3.5 fill-emerald-glow text-emerald-glow" />
          </div>
          <span className="text-sm font-semibold tracking-tight text-ink">StarSync</span>
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-ink/60 transition-colors duration-200 hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </div>

        <GlowButton className="!px-5 !py-2 text-xs" showArrow={false}>
          Începe gratuit
        </GlowButton>
      </nav>
    </header>
  );
}
