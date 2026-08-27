"use client";

import { MapPin, Star, TrendingDown, TrendingUp } from "lucide-react";
import { BentoCard } from "./BentoCard";
import { cn } from "@/lib/utils";

interface RankingRowProps {
  rank: number;
  name: string;
  rating: number;
  reviews: number;
  highlight?: boolean;
}

function RankingRow({ rank, name, rating, reviews, highlight }: RankingRowProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors duration-300",
        highlight
          ? "border-emerald-glow/30 bg-emerald-glow/[0.08]"
          : "border-white/[0.06] bg-white/[0.02]"
      )}
    >
      <span
        className={cn(
          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold",
          highlight ? "bg-emerald-glow text-[#04120c]" : "bg-white/[0.08] text-ink/50"
        )}
      >
        {rank}
      </span>
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "truncate text-xs font-medium",
            highlight ? "text-ink" : "text-ink/60"
          )}
        >
          {name}
        </p>
        <div className="flex items-center gap-1">
          <Star
            className={cn(
              "h-3 w-3",
              highlight ? "fill-emerald-glow text-emerald-glow" : "fill-ink/30 text-ink/30"
            )}
          />
          <span className="text-[10px] text-ink/40">
            {rating.toFixed(1)} ({reviews})
          </span>
        </div>
      </div>
      <MapPin className={cn("h-3.5 w-3.5", highlight ? "text-emerald-glow" : "text-ink/20")} />
    </div>
  );
}

export function RankingComparisonCard() {
  return (
    <BentoCard
      eyebrow="Local SEO"
      title="Poziția ta în Google Maps"
      description="Recenziile constante te urcă direct în top 3 rezultate."
      className="lg:col-span-1"
    >
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="mb-2 flex items-center gap-1.5 text-[11px] font-medium text-ink/40">
            <TrendingDown className="h-3.5 w-3.5" />
            Fără StarSync
          </div>
          <div className="space-y-1.5">
            <RankingRow rank={6} name="Afacerea Ta" rating={3.6} reviews={41} />
            <RankingRow rank={7} name="Competitor B" rating={4.1} reviews={112} />
            <RankingRow rank={8} name="Competitor C" rating={4.4} reviews={203} />
          </div>
        </div>
        <div>
          <div className="mb-2 flex items-center gap-1.5 text-[11px] font-medium text-emerald-glow">
            <TrendingUp className="h-3.5 w-3.5" />
            Cu StarSync
          </div>
          <div className="space-y-1.5">
            <RankingRow rank={1} name="Afacerea Ta" rating={4.9} reviews={487} highlight />
            <RankingRow rank={2} name="Competitor C" rating={4.4} reviews={203} />
            <RankingRow rank={3} name="Competitor B" rating={4.1} reviews={112} />
          </div>
        </div>
      </div>
    </BentoCard>
  );
}
