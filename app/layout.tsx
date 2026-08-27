import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "StarSync — Fără recenzii de 1 stea pe Google",
  description:
    "Sistemul automat de gestionare a reputației care direcționează clienții fericiți către Google Maps și captează feedback-ul negativ în mod privat.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-screen bg-obsidian font-sans antialiased selection:bg-emerald-glow/30">
        {children}
      </body>
    </html>
  );
}
