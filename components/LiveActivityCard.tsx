"use client";

import { MessageSquareText, CheckCheck } from "lucide-react";
import { BentoCard } from "./BentoCard";

interface Event {
  name: string;
  business: string;
  status: "trimis" | "livrat" | "recenzie";
}

const EVENTS: Event[] = [
  { name: "Mihai T.", business: "AutoService Nord", status: "recenzie" },
  { name: "Elena V.", business: "Salon Belle Époque", status: "livrat" },
  { name: "Radu I.", business: "Clinica Dentară Zâmbet", status: "trimis" },
  { name: "Ioana M.", business: "FitZone Gym", status: "recenzie" },
  { name: "Cristian D.", business: "Curat & Lucios Detailing", status: "livrat" },
  { name: "Alexandra P.", business: "Imobiliare Central", status: "trimis" },
  { name: "Bogdan S.", business: "Service Rapid Auto", status: "recenzie" },
  { name: "Diana C.", business: "Salon Belle Époque", status: "livrat" },
];

const STATUS_LABEL: Record<Event["status"], string> = {
  trimis: "SMS trimis",
  livrat: "Livrat",
  recenzie: "Recenzie primită",
};

function EventRow({ event }: { event: Event }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.06]">
        <MessageSquareText className="h-3.5 w-3.5 text-ink/60" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium text-ink/85">{event.name}</p>
        <p className="truncate text-[11px] text-ink/40">{event.business}</p>
      </div>
      <div
        className={cnStatus(event.status)}
      >
        {event.status === "recenzie" && <CheckCheck className="h-3 w-3" />}
        {STATUS_LABEL[event.status]}
      </div>
    </div>
  );
}

function cnStatus(status: Event["status"]) {
  const base =
    "flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[10px] font-medium";
  if (status === "recenzie") return `${base} bg-emerald-glow/15 text-emerald-glow`;
  if (status === "livrat") return `${base} bg-white/[0.08] text-ink/60`;
  return `${base} bg-white/[0.04] text-ink/40`;
}

export function LiveActivityCard() {
  const loopEvents = [...EVENTS, ...EVENTS];

  return (
    <BentoCard
      eyebrow="Timp real"
      title="Flux de activitate live"
      description="Fiecare SMS trimis, livrat și transformat în recenzie, la vedere."
      className="lg:col-span-1"
    >
      <div className="relative h-72 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]">
        <div className="absolute inset-x-0 top-0 flex animate-marquee flex-col gap-2 [animation-duration:16s]">
          {loopEvents.map((event, i) => (
            <EventRow key={`${event.name}-${i}`} event={event} />
          ))}
        </div>
      </div>
    </BentoCard>
  );
}
