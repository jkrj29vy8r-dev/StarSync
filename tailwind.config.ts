import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: "#080A0A",
          surface: "#111315",
          border: "rgba(255, 255, 255, 0.08)",
        },
        ink: {
          DEFAULT: "#EDEDED",
          muted: "rgba(237, 237, 237, 0.6)",
          faint: "rgba(237, 237, 237, 0.4)",
        },
        emerald: {
          glow: "#10B981",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-geist-sans)",
          "Plus Jakarta Sans",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        "inset-hairline": "inset 0 1px 0 0 rgba(255,255,255,0.1)",
        "glow-emerald": "0 0 0 1px rgba(16,185,129,0.4), 0 0 24px rgba(16,185,129,0.35), 0 0 64px rgba(16,185,129,0.15)",
        "card-hover": "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 0 rgba(255,255,255,0.1)",
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(16,185,129,0.15), transparent)",
      },
      animation: {
        marquee: "marquee 18s linear infinite",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
        shine: "shine 1.2s ease forwards",
        "fade-up": "fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateY(0%)" },
          "100%": { transform: "translateY(-50%)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(0.85)" },
        },
        shine: {
          "0%": { transform: "translateX(-100%) skewX(-20deg)" },
          "100%": { transform: "translateX(200%) skewX(-20deg)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      letterSpacing: {
        tightest: "-0.03em",
      },
    },
  },
  plugins: [],
};

export default config;
