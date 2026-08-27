import { Check } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { GlowButton } from "./GlowButton";
import { cn } from "@/lib/utils";

interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

const PLANS: Plan[] = [
  {
    name: "Starter",
    price: "149 lei",
    period: "/lună",
    description: "Pentru afaceri cu un singur sediu, la început de drum.",
    features: [
      "Până la 300 solicitări/lună",
      "SMS automat post-vizită",
      "Filtrare feedback negativ",
      "Dashboard de bază",
    ],
  },
  {
    name: "Growth",
    price: "349 lei",
    period: "/lună",
    description: "Cel mai popular — pentru afaceri în creștere activă.",
    features: [
      "Solicitări nelimitate",
      "SMS + WhatsApp + Email",
      "Calculator ROI & analytics avansate",
      "Integrare Google Business Profile",
      "Suport prioritar",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Personalizat",
    period: "",
    description: "Pentru lanțuri cu mai multe locații și cerințe API.",
    features: [
      "Multi-locație & roluri de echipă",
      "API & webhook-uri dedicate",
      "SLA & manager de cont dedicat",
      "Onboarding personalizat",
    ],
  },
];

export function Pricing() {
  return (
    <section id="prețuri" className="relative mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        eyebrow="Prețuri"
        title="Simplu, transparent, fără comisioane ascunse"
        description="Plătești un abonament fix — niciodată per recenzie captată."
      />
      <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              "relative flex flex-col rounded-2xl border p-7 shadow-inset-hairline",
              plan.highlighted
                ? "border-emerald-glow/40 bg-gradient-to-b from-emerald-glow/[0.08] to-[#111315]"
                : "border-white/[0.08] bg-[#111315]"
            )}
          >
            {plan.highlighted && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-glow px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#04120c]">
                Cel mai ales
              </span>
            )}
            <h3 className="text-lg font-semibold tracking-tight text-ink">{plan.name}</h3>
            <p className="mt-1.5 text-sm text-ink/50">{plan.description}</p>
            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-4xl font-semibold tracking-tightest text-ink">
                {plan.price}
              </span>
              <span className="text-sm text-ink/40">{plan.period}</span>
            </div>
            <ul className="mt-6 flex-1 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-ink/70">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-glow" />
                  {feature}
                </li>
              ))}
            </ul>
            <GlowButton
              variant={plan.highlighted ? "primary" : "ghost"}
              showArrow={false}
              className="mt-8 w-full justify-center"
            >
              {plan.name === "Enterprise" ? "Contactează-ne" : "Alege planul"}
            </GlowButton>
          </div>
        ))}
      </div>
    </section>
  );
}
