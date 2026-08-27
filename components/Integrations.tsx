import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import {
  MessageCircle,
  Mail,
  Calendar,
  CreditCard,
  Smartphone,
  Globe,
} from "lucide-react";

const INTEGRATIONS = [
  { name: "SMS Gateway", icon: MessageCircle },
  { name: "Email", icon: Mail },
  { name: "Calendar Booking", icon: Calendar },
  { name: "POS & Plăți", icon: CreditCard },
  { name: "WhatsApp Business", icon: Smartphone },
  { name: "Google Business Profile", icon: Globe },
];

export function Integrations() {
  return (
    <section className="relative mx-auto max-w-5xl px-6 py-24">
      <Reveal>
        <SectionHeading
          eyebrow="Integrări"
          title="Se conectează cu ce folosești deja"
          description="StarSync se branșează pe fluxul tău actual — fără să schimbi sistemul de programări sau de plăți."
        />
      </Reveal>
      <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {INTEGRATIONS.map(({ name, icon: Icon }, i) => (
          <Reveal key={name} delay={i * 0.05}>
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/[0.08] bg-[#111315] px-4 py-6 text-center shadow-inset-hairline transition-colors duration-300 hover:border-emerald-glow/30">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06]">
                <Icon className="h-5 w-5 text-ink/70" />
              </div>
              <span className="text-xs font-medium leading-tight text-ink/60">{name}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
