import { Stethoscope, Scissors, Wrench, Sparkles, Dumbbell, Home } from "lucide-react";

const CATEGORIES = [
  { label: "Clinici Dentare", icon: Stethoscope },
  { label: "Saloane & Frizerii", icon: Scissors },
  { label: "Service-uri Auto", icon: Wrench },
  { label: "Curățenie & Detailing", icon: Sparkles },
  { label: "Săli de Fitness", icon: Dumbbell },
  { label: "Agenții Imobiliare", icon: Home },
];

export function SocialProof() {
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-ink/30">
        Folosit de peste 2.100 de afaceri locale
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-4">
        {CATEGORIES.map(({ label, icon: Icon }) => (
          <div
            key={label}
            className="flex items-center gap-2 text-ink/25 grayscale transition-colors duration-300 hover:text-ink/50"
          >
            <Icon className="h-4 w-4" />
            <span className="text-sm font-medium tracking-tight">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
