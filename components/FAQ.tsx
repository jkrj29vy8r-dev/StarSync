"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

const ITEMS = [
  {
    q: "Cum direcționați clienții doar către recenzii pozitive fără să încălcați regulile Google?",
    a: "StarSync nu ascunde nicio recenzie de pe Google — filtrăm doar unde trimitem invitația inițială. Clienții nemulțumiți sunt rugați să lase feedback direct către afacere, în timp ce clienții mulțumiți sunt ghidați spre pagina publică de Google. Este o practică complet conformă cu politicile Google.",
  },
  {
    q: "Cât durează implementarea?",
    a: "Majoritatea afacerilor sunt live în sub 10 minute. Conectezi numărul de telefon sau sistemul de programări existent, iar SMS-urile automate pornesc imediat după prima programare finalizată.",
  },
  {
    q: "Ce se întâmplă cu recenziile negative?",
    a: "Feedback-ul de 1-3 stele ajunge instant, în privat, direct la fondator sau manager — niciodată pe Google. Primești notificare imediată ca să poți rezolva problema înainte să devină publică.",
  },
  {
    q: "Pot anula abonamentul oricând?",
    a: "Da. Nu există contracte pe termen lung — poți anula lunar direct din dashboard, fără penalizări.",
  },
  {
    q: "Funcționează pentru afaceri cu mai multe locații?",
    a: "Da, planul Enterprise oferă dashboard multi-locație, roluri de echipă separate și rapoarte agregate sau per sediu.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative mx-auto max-w-3xl px-6 py-24">
      <Reveal>
        <SectionHeading eyebrow="Întrebări frecvente" title="Tot ce trebuie să știi" />
      </Reveal>

      <div className="mt-12 space-y-3">
        {ITEMS.map((item, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={item.q} delay={i * 0.06}>
              <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111315] shadow-inset-hairline">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-sm font-medium tracking-tight text-ink">{item.q}</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 text-ink/40 transition-transform duration-300",
                      isOpen && "rotate-180 text-emerald-glow"
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm leading-relaxed text-ink/50">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
