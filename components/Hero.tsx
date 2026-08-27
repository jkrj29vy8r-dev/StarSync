"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { GlowButton } from "./GlowButton";
import { ReviewGateWidget } from "./ReviewGateWidget";
import { SocialProof } from "./SocialProof";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-28 sm:pt-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px] bg-grid-fade"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]"
      />

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col items-start">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-2.5 pr-4 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-emerald-glow opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-glow" />
            </span>
            <span className="text-xs font-medium text-ink/70">
              Peste 18.400 recenzii capturate luna aceasta
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.05 }}
            className="mt-6 max-w-xl text-balance text-4xl font-semibold leading-[1.08] tracking-tightest text-ink sm:text-5xl lg:text-[3.4rem]"
          >
            Fără recenzii de 1 stea pe Google.{" "}
            <span className="text-emerald-glow">Doar clienți de 5 stele.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.1 }}
            className="mt-5 max-w-lg text-balance text-base leading-relaxed text-ink/60 sm:text-lg"
          >
            Sistemul automat de gestionare a reputației care direcționează
            clienții fericiți către Google Maps și captează feedback-ul
            negativ în mod privat.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.15 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <GlowButton>Începe gratuit, 14 zile</GlowButton>
            <GlowButton variant="ghost" showArrow={false}>
              Vezi demo live
            </GlowButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="mt-6 flex items-center gap-2 text-xs text-ink/40"
          >
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-emerald-glow text-emerald-glow" />
              ))}
            </div>
            <span>4.9/5 din peste 2.100 de afaceri locale</span>
          </motion.div>

          <div className="mt-14 w-full">
            <SocialProof />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.15 }}
        >
          <ReviewGateWidget />
        </motion.div>
      </div>
    </section>
  );
}
