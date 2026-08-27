import { GlowButton } from "./GlowButton";
import { Reveal } from "./Reveal";

export function FinalCTA() {
  return (
    <section className="relative mx-auto max-w-5xl px-6 py-24">
      <Reveal className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#111315] px-8 py-16 text-center shadow-inset-hairline sm:px-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-full bg-grid-fade"
        />
        <h2 className="relative text-balance text-3xl font-semibold tracking-tightest text-ink sm:text-4xl">
          Pregătit să transformi clienții fericiți în{" "}
          <span className="text-emerald-glow">recenzii de 5 stele?</span>
        </h2>
        <p className="relative mx-auto mt-4 max-w-md text-balance text-base text-ink/50">
          Instalare în 10 minute. Fără card bancar. Anulezi oricând.
        </p>
        <div className="relative mt-8 flex justify-center">
          <GlowButton className="!px-8 !py-4 text-base">Începe gratuit, 14 zile</GlowButton>
        </div>
      </Reveal>
    </section>
  );
}
