"use client";

import { ReactNode, useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUp, MessageSquareText, ShieldCheck, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const spring = { type: "spring" as const, stiffness: 300, damping: 30 };
const tiltSpring = { stiffness: 150, damping: 20, mass: 0.5 };

function useAnimatedNumber(target: number, decimals = 0) {
  const value = useSpring(target, { stiffness: 300, damping: 30, mass: 0.6 });
  const [display, setDisplay] = useState(target);

  useEffect(() => {
    value.set(target);
  }, [target, value]);

  useEffect(() => {
    const factor = 10 ** decimals;
    return value.on("change", (latest) => setDisplay(Math.round(latest * factor) / factor));
  }, [value, decimals]);

  return display;
}

function Card({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(useSpring(mouseY, tiltSpring), [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(useSpring(mouseX, tiltSpring), [-0.5, 0.5], ["-7deg", "7deg"]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.015, borderColor: "rgba(255,255,255,0.16)" }}
      transition={spring}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111315] p-6 shadow-inset-hairline"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-emerald-glow/[0.06] blur-3xl"
      />
      <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-emerald-glow/80">
        {eyebrow}
      </span>
      <h3 className="mt-2 text-lg font-semibold tracking-tight text-ink">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-ink/50">{description}</p>
      <div className="relative mt-6 flex-1">{children}</div>
    </motion.div>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-2 py-3 text-center">
      <p className="text-2xl font-semibold tracking-tightest text-emerald-glow">+{value}</p>
      <p className="mt-1 text-[10px] leading-tight text-ink/45">{label}</p>
    </div>
  );
}

const REVIEW_CONVERSION_RATE = 0.185;
const BAD_REVIEW_INTERCEPT_RATE = 0.04;
const CUSTOMERS_MIN = 50;
const CUSTOMERS_MAX = 5000;

function estimateRankingBoost(monthlyReviews: number) {
  return Math.min(8, Math.max(1, Math.round(monthlyReviews / 40)));
}

function ROIEstimatorCard() {
  const [customers, setCustomers] = useState(750);

  const reviewsTarget = Math.round(customers * REVIEW_CONVERSION_RATE);
  const interceptedTarget = Math.round(customers * BAD_REVIEW_INTERCEPT_RATE);
  const boostTarget = estimateRankingBoost(reviewsTarget);

  const reviews = useAnimatedNumber(reviewsTarget);
  const intercepted = useAnimatedNumber(interceptedTarget);
  const boost = useAnimatedNumber(boostTarget);

  const percentage = ((customers - CUSTOMERS_MIN) / (CUSTOMERS_MAX - CUSTOMERS_MIN)) * 100;

  return (
    <Card
      eyebrow="Calculator ROI"
      title="Estimează recenziile & impactul"
      description="Mută sliderul pentru numărul lunar de clienți activi."
    >
      <div className="grid grid-cols-3 gap-2">
        <Metric label="Recenzii 5★ / lună" value={reviews} />
        <Metric label="Recenzii negative interceptate" value={intercepted} />
        <Metric label="Poziții câștigate în Maps" value={boost} />
      </div>

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between text-xs text-ink/50">
          <span>Clienți lunari</span>
          <span className="font-medium text-ink/80">{customers.toLocaleString("ro-RO")}</span>
        </div>
        <input
          type="range"
          min={CUSTOMERS_MIN}
          max={CUSTOMERS_MAX}
          step={50}
          value={customers}
          onChange={(e) => setCustomers(Number(e.target.value))}
          className="range-slider h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10"
          style={{
            background: `linear-gradient(to right, #10B981 ${percentage}%, rgba(255,255,255,0.1) ${percentage}%)`,
          }}
        />
        <div className="mt-1 flex justify-between text-[10px] text-ink/30">
          <span>50</span>
          <span>5.000</span>
        </div>
      </div>

      <p className="mt-4 text-center text-[11px] text-ink/40">
        Rată de conversie recenzii: <span className="text-ink/70">~18,5%</span> · Feedback negativ
        filtrat: <span className="text-ink/70">~4%</span>
      </p>
    </Card>
  );
}

interface FeedEvent {
  business: string;
  message: string;
  tone: "neutral" | "positive" | "intercepted";
}

const FEED_EVENTS: FeedEvent[] = [
  { business: "Clinica Dentară Suceava", message: "Cerere de recenzie trimisă", tone: "neutral" },
  { business: "Service Auto Rapid", message: "Recenzie nouă de 5 stele captată", tone: "positive" },
  { business: "Salon Belle Époque", message: "Feedback negativ interceptat și privatizat", tone: "intercepted" },
  { business: "FitZone Gym", message: "SMS livrat cu succes", tone: "neutral" },
  { business: "Imobiliare Central", message: "Cerere de recenzie trimisă", tone: "neutral" },
  { business: "Curat & Lucios Detailing", message: "Recenzie nouă de 5 stele captată", tone: "positive" },
  { business: "Clinica Dentară Zâmbet", message: "Feedback negativ interceptat și privatizat", tone: "intercepted" },
  { business: "AutoService Nord", message: "SMS livrat cu succes", tone: "neutral" },
];

const LEAD_POOL: FeedEvent[] = [
  { business: "Cabinet Stomatologic Prieteni", message: "Lead nou: programare confirmată", tone: "neutral" },
  { business: "Pizzeria Bella Napoli", message: "Recenzie nouă de 5 stele captată", tone: "positive" },
  { business: "Beauty Studio Iris", message: "Feedback negativ interceptat și privatizat", tone: "intercepted" },
  { business: "Service Moto Expert", message: "Cerere de recenzie trimisă", tone: "neutral" },
];

function useLeadTicker() {
  const [lead, setLead] = useState<(FeedEvent & { id: number }) | null>(null);

  useEffect(() => {
    let hideTimer: ReturnType<typeof setTimeout>;
    const interval = setInterval(() => {
      const pick = LEAD_POOL[Math.floor(Math.random() * LEAD_POOL.length)];
      setLead({ ...pick, id: Date.now() });
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => setLead(null), 2600);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(hideTimer);
    };
  }, []);

  return lead;
}

function toneIcon(tone: FeedEvent["tone"]) {
  if (tone === "positive") return Star;
  if (tone === "intercepted") return ShieldCheck;
  return MessageSquareText;
}

function FeedRow({ event, isNew }: { event: FeedEvent; isNew?: boolean }) {
  const Icon = toneIcon(event.tone);
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl border px-3 py-2.5",
        isNew
          ? "border-emerald-glow/40 bg-[#0d1712] shadow-glow-emerald"
          : "border-white/[0.06] bg-white/[0.02]"
      )}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          event.tone === "positive" ? "bg-emerald-glow/15" : "bg-white/[0.06]"
        )}
      >
        <Icon
          className={cn(
            "h-3.5 w-3.5",
            event.tone === "positive" ? "fill-emerald-glow text-emerald-glow" : "text-ink/60"
          )}
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium text-ink/85">{event.business}</p>
        <p className="truncate text-[11px] text-ink/40">{event.message}</p>
      </div>
      {isNew && (
        <span className="shrink-0 rounded-full bg-emerald-glow px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-[#04120c]">
          Nou
        </span>
      )}
    </div>
  );
}

function LiveActivityCard() {
  const loop = [...FEED_EVENTS, ...FEED_EVENTS];
  const newLead = useLeadTicker();

  return (
    <Card
      eyebrow="Timp real"
      title="Flux de activitate live"
      description="Fiecare SMS trimis, livrat și transformat în rezultat, la vedere."
    >
      <div className="relative h-72 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]">
        <motion.div
          className="absolute inset-x-0 top-0 flex flex-col gap-2"
          animate={{ y: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        >
          {loop.map((event, i) => (
            <FeedRow key={`${event.business}-${i}`} event={event} />
          ))}
        </motion.div>

        <AnimatePresence>
          {newLead && (
            <motion.div
              key={newLead.id}
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute inset-x-0 top-0 z-10"
            >
              <FeedRow event={newLead} isNew />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
}

function RankingPreview({
  positionLabel,
  rank,
  rating,
  reviews,
  highlight,
}: {
  positionLabel: string;
  rank: number;
  rating: number;
  reviews: number;
  highlight?: boolean;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={spring}
      className={cn(
        "flex w-full items-center gap-3 rounded-xl border px-4 py-3",
        highlight
          ? "border-emerald-glow/30 bg-emerald-glow/[0.08]"
          : "border-white/[0.08] bg-white/[0.02]"
      )}
    >
      <span
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
          highlight ? "bg-emerald-glow text-[#04120c]" : "bg-white/[0.08] text-ink/50"
        )}
      >
        {rank}
      </span>
      <div className="min-w-0 flex-1">
        <p className={cn("truncate text-sm font-medium", highlight ? "text-ink" : "text-ink/60")}>
          Afacerea Ta
        </p>
        <div className="flex items-center gap-1">
          <Star
            className={cn(
              "h-3 w-3",
              highlight ? "fill-emerald-glow text-emerald-glow" : "fill-ink/30 text-ink/30"
            )}
          />
          <span className="text-[11px] text-ink/40">
            {rating.toFixed(1)} ({reviews})
          </span>
        </div>
      </div>
      <span className="shrink-0 text-[10px] font-medium uppercase tracking-wide text-ink/30">
        {positionLabel}
      </span>
    </motion.div>
  );
}

function RankingVisualizerCard() {
  const [inView, setInView] = useState(false);
  const rank = useAnimatedNumber(inView ? 1 : 7);
  const rating = useAnimatedNumber(inView ? 4.9 : 3.9, 1);
  const reviews = useAnimatedNumber(inView ? 240 : 12);

  return (
    <Card
      eyebrow="Local SEO"
      title="Vizualizator ranking Google Maps"
      description="Aceeași afacere, înainte și după StarSync."
    >
      <motion.div
        onViewportEnter={() => setInView(true)}
        viewport={{ once: true, amount: 0.6 }}
        className="flex flex-col items-center gap-3"
      >
        <RankingPreview positionLabel="Fără StarSync" rank={7} rating={3.9} reviews={12} />

        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-0.5 text-emerald-glow"
        >
          <ArrowUp className="h-4 w-4" />
          <span className="text-[10px] font-semibold">+6 poziții</span>
        </motion.div>

        <RankingPreview
          positionLabel="Cu StarSync"
          rank={Math.round(rank)}
          rating={rating}
          reviews={Math.round(reviews)}
          highlight
        />
      </motion.div>
    </Card>
  );
}

export function BentoGrid() {
  const cards = [<ROIEstimatorCard key="roi" />, <LiveActivityCard key="feed" />, <RankingVisualizerCard key="rank" />];

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <SectionHeading
          eyebrow="De ce trec afacerile de top la StarSync"
          title="Reputația ta, pe pilot automat"
          description="Trei motoare care lucrează simultan: automatizare, predictibilitate și vizibilitate locală."
        />
      </Reveal>
      <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {cards.map((card, i) => (
          <Reveal key={card.key} delay={i * 0.1} className="h-full">
            {card}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
