"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function BorderBeam({
  className,
  duration = 6,
  colorFrom = "#10B981",
  colorVia = "#6EE7B7",
}: {
  className?: string;
  duration?: number;
  colorFrom?: string;
  colorVia?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] p-px",
        "[mask-image:linear-gradient(#000_0_0),linear-gradient(#000_0_0)] [mask-clip:content-box,border-box] [mask-composite:exclude] [-webkit-mask-composite:xor]",
        className
      )}
    >
      <motion.div
        className="absolute inset-[-100%]"
        style={{
          background: `conic-gradient(from 0deg, transparent 0%, ${colorFrom} 6%, ${colorVia} 10%, transparent 22%, transparent 100%)`,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
