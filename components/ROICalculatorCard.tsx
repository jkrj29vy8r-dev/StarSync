"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BentoCard } from "./BentoCard";

const CONVERSION_RATE = 0.34;

export function ROICalculatorCard() {
  const [customers, setCustomers] = useState(400);

  const newReviews = useMemo(
    () => Math.round(customers * CONVERSION_RATE),
    [customers]
  );

  const percentage = Math.round(((customers - 50) / (2000 - 50)) * 100);

  return (
    <BentoCard
      eyebrow="Calculator ROI"
      title="Câte recenzii poți câștiga"
      description="Mută sliderul pentru numărul lunar de clienți activi."
      className="lg:col-span-1"
    >
      <div className="flex h-full flex-col justify-between gap-6">
        <div className="text-center">
          <motion.p
            key={newReviews}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="text-5xl font-semibold tracking-tightest text-emerald-glow"
          >
            +{newReviews}
          </motion.p>
          <p className="mt-1 text-xs text-ink/50">recenzii noi de 5 stele / lună</p>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between text-xs text-ink/50">
            <span>Clienți lunari</span>
            <span className="font-medium text-ink/80">{customers}</span>
          </div>
          <input
            type="range"
            min={50}
            max={2000}
            step={10}
            value={customers}
            onChange={(e) => setCustomers(Number(e.target.value))}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-emerald-glow"
            style={{
              background: `linear-gradient(to right, #10B981 ${percentage}%, rgba(255,255,255,0.1) ${percentage}%)`,
            }}
          />
          <div className="mt-1 flex justify-between text-[10px] text-ink/30">
            <span>50</span>
            <span>2.000</span>
          </div>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-center">
          <p className="text-[11px] text-ink/40">
            Rată medie de conversie: <span className="text-ink/70">{Math.round(CONVERSION_RATE * 100)}%</span> dintre clienți lasă recenzie
          </p>
        </div>
      </div>
    </BentoCard>
  );
}
