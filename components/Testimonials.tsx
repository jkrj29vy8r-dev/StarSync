import { Star, Quote } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
  metric: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "În trei luni am trecut de la 3,8 la 4,9 stele pe Google. Clienții noi ne găsesc pentru că apărem primii în căutări.",
    name: "Cristina Nedelcu",
    role: "Fondator, Salon Belle Époque",
    initials: "CN",
    metric: "+340% recenzii",
  },
  {
    quote:
      "Recenziile negative ajungeau direct la mine, nu pe Google. Am rezolvat problemele din spate și reputația s-a schimbat radical.",
    name: "Vlad Ionescu",
    role: "Manager, AutoService Nord",
    initials: "VI",
    metric: "0 recenzii de 1★ noi",
  },
  {
    quote:
      "Instalarea a durat 10 minute. Din prima săptămână am văzut SMS-urile ieșind automat după fiecare programare.",
    name: "Alina Dumitru",
    role: "Co-fondator, Clinica Dentară Zâmbet",
    initials: "AD",
    metric: "487 recenzii noi",
  },
];

export function Testimonials() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        eyebrow="Rezultate reale"
        title="Afacerile care au trecut la StarSync nu se mai întorc"
        description="Peste 2.100 de afaceri locale își gestionează astăzi reputația automat."
      />
      <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <div
            key={t.name}
            className="flex flex-col rounded-2xl border border-white/[0.08] bg-[#111315] p-6 shadow-inset-hairline"
          >
            <Quote className="h-5 w-5 text-emerald-glow/50" />
            <p className="mt-4 flex-1 text-sm leading-relaxed text-ink/70">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-3 border-t border-white/[0.06] pt-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.08] text-xs font-semibold text-ink/80">
                {t.initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-ink">{t.name}</p>
                <p className="truncate text-[11px] text-ink/40">{t.role}</p>
              </div>
              <div className="flex items-center gap-1 rounded-full bg-emerald-glow/10 px-2 py-1 text-[10px] font-medium text-emerald-glow">
                <Star className="h-2.5 w-2.5 fill-emerald-glow" />
                {t.metric}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
