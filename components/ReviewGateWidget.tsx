"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star, MapPin, Lock, CheckCircle2, Send } from "lucide-react";
import { cn } from "@/lib/utils";

type GateState = "idle" | "positive" | "negative";

const spring = { type: "spring" as const, stiffness: 300, damping: 30 };

const CONFETTI_COLORS = ["#10B981", "#34D399", "#EDEDED", "#6EE7B7"];

function Confetti() {
  const pieces = Array.from({ length: 24 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
      {pieces.map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 0.3;
        const duration = 1.1 + Math.random() * 0.8;
        const color = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
        const size = 4 + Math.random() * 4;
        return (
          <motion.span
            key={i}
            initial={{ y: -20, x: `${left}%`, opacity: 1, rotate: 0 }}
            animate={{ y: "120%", opacity: 0, rotate: 360 }}
            transition={{ duration, delay, ease: "easeIn" }}
            className="absolute top-0 block rounded-sm"
            style={{
              left: `${left}%`,
              width: size,
              height: size,
              backgroundColor: color,
            }}
          />
        );
      })}
    </div>
  );
}

export function ReviewGateWidget() {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [state, setState] = useState<GateState>("idle");

  const handleSelect = (value: number) => {
    setRating(value);
    setState(value >= 4 ? "positive" : "negative");
  };

  const reset = () => {
    setState("idle");
    setRating(0);
  };

  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="glass-panel relative overflow-hidden rounded-2xl p-6 shadow-card-hover">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-24 h-48 bg-grid-fade"
        />

        <div className="relative flex items-center justify-between border-b border-white/[0.06] pb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-glow/15">
              <MapPin className="h-4 w-4 text-emerald-glow" />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-tight text-ink">
                Clinica Dentară Zâmbet
              </p>
              <p className="text-xs text-ink/50">Cum a fost experiența ta?</p>
            </div>
          </div>
          <span className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-ink/50">
            Live
          </span>
        </div>

        <div className="relative min-h-[220px] pt-5">
          <AnimatePresence mode="wait">
            {state === "idle" && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={spring}
                className="flex flex-col items-center gap-6 py-4 text-center"
              >
                <p className="text-sm text-ink/70">
                  Apasă pe numărul de stele pentru simulare live
                </p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((value) => {
                    const active = (hovered || rating) >= value;
                    return (
                      <button
                        key={value}
                        type="button"
                        aria-label={`${value} stele`}
                        onMouseEnter={() => setHovered(value)}
                        onMouseLeave={() => setHovered(0)}
                        onClick={() => handleSelect(value)}
                        className="transition-transform duration-150 hover:scale-110 active:scale-95"
                      >
                        <Star
                          className={cn(
                            "h-9 w-9 transition-colors duration-150",
                            active
                              ? "fill-emerald-glow text-emerald-glow"
                              : "fill-transparent text-white/20"
                          )}
                        />
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {state === "positive" && (
              <motion.div
                key="positive"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={spring}
                className="relative flex flex-col items-center gap-4 py-2 text-center"
              >
                <Confetti />
                <div className="flex items-center gap-1">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-emerald-glow text-emerald-glow" />
                  ))}
                </div>
                <p className="text-sm font-semibold tracking-tight text-ink">
                  Redirecționare Google Maps
                </p>
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...spring, delay: 0.15 }}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] p-3 text-left"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-ink">
                      A
                    </div>
                    <div>
                      <p className="text-xs font-medium text-ink">Andreea P.</p>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-emerald-glow text-emerald-glow" />
                        ))}
                      </div>
                    </div>
                    <CheckCircle2 className="ml-auto h-4 w-4 text-emerald-glow" />
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-ink/60">
                    &ldquo;Experiență excelentă, personal foarte atent și profesionist. Recomand!&rdquo;
                  </p>
                </motion.div>
                <button
                  onClick={reset}
                  className="text-xs font-medium text-ink/40 underline-offset-2 hover:text-ink/70 hover:underline"
                >
                  Resetează simularea
                </button>
              </motion.div>
            )}

            {state === "negative" && (
              <motion.div
                key="negative"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={spring}
                className="flex flex-col items-center gap-4 py-2 text-center"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.06]">
                  <Lock className="h-5 w-5 text-ink/60" />
                </div>
                <p className="text-sm font-semibold tracking-tight text-ink">
                  Mesajul tău ajunge direct la fondator
                </p>
                <p className="text-xs text-ink/50">
                  Nu va apărea pe Google
                </p>
                <div className="w-full rounded-xl border border-white/10 bg-white/[0.03] p-3 text-left">
                  <textarea
                    placeholder="Spune-ne ce am putea îmbunătăți..."
                    rows={2}
                    className="w-full resize-none bg-transparent text-xs text-ink/80 placeholder:text-ink/30 focus:outline-none"
                  />
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-3.5 w-3.5",
                            i < rating
                              ? "fill-ink/60 text-ink/60"
                              : "fill-transparent text-white/15"
                          )}
                        />
                      ))}
                    </div>
                    <button
                      type="button"
                      className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-medium text-ink transition-colors hover:bg-white/[0.15]"
                    >
                      Trimite <Send className="h-3 w-3" />
                    </button>
                  </div>
                </div>
                <button
                  onClick={reset}
                  className="text-xs font-medium text-ink/40 underline-offset-2 hover:text-ink/70 hover:underline"
                >
                  Resetează simularea
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div
        aria-hidden
        className="absolute -inset-x-6 -bottom-6 -z-10 h-24 rounded-full bg-emerald-glow/10 blur-3xl"
      />
    </div>
  );
}
