import { Check, Minus } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

interface Row {
  feature: string;
  starsync: boolean | string;
  manual: boolean | string;
  competitor: boolean | string;
}

const ROWS: Row[] = [
  { feature: "Direcționare automată către Google Maps", starsync: true, manual: false, competitor: true },
  { feature: "Filtrare privată a feedback-ului negativ", starsync: true, manual: false, competitor: false },
  { feature: "SMS automat post-programare", starsync: true, manual: false, competitor: "Parțial" },
  { feature: "Calculator ROI & analytics live", starsync: true, manual: false, competitor: false },
  { feature: "Instalare fără cod, sub 10 minute", starsync: true, manual: true, competitor: false },
  { feature: "Preț fix, fără comisioane per recenzie", starsync: true, manual: true, competitor: false },
];

function Cell({ value }: { value: boolean | string }) {
  if (value === true) {
    return (
      <div className="flex justify-center">
        <Check className="h-4 w-4 text-emerald-glow" />
      </div>
    );
  }
  if (value === false) {
    return (
      <div className="flex justify-center">
        <Minus className="h-4 w-4 text-ink/20" />
      </div>
    );
  }
  return <div className="text-center text-xs text-ink/50">{value}</div>;
}

export function Comparison() {
  return (
    <section id="comparație" className="relative mx-auto max-w-5xl px-6 py-24">
      <Reveal>
        <SectionHeading
          eyebrow="Comparație"
          title="De ce StarSync, nu procesul manual"
          description="Cerutul recenziilor pe cont propriu costă timp; platformele generice costă bani pe fiecare recenzie."
        />
      </Reveal>

      <Reveal delay={0.1} className="mt-14 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111315] shadow-inset-hairline">
        <div className="grid grid-cols-4 border-b border-white/[0.06] px-6 py-4 text-xs font-medium text-ink/40">
          <span className="col-span-1" />
          <span className="text-center text-emerald-glow">StarSync</span>
          <span className="text-center">Manual</span>
          <span className="text-center">Altele</span>
        </div>
        {ROWS.map((row, i) => (
          <div
            key={row.feature}
            className={cn(
              "grid grid-cols-4 items-center px-6 py-4 text-sm",
              i !== ROWS.length - 1 && "border-b border-white/[0.04]"
            )}
          >
            <span className="col-span-1 pr-4 text-ink/70">{row.feature}</span>
            <Cell value={row.starsync} />
            <Cell value={row.manual} />
            <Cell value={row.competitor} />
          </div>
        ))}
      </Reveal>
    </section>
  );
}
