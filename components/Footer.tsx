import { Star } from "lucide-react";

const COLUMNS = [
  {
    title: "Produs",
    links: ["Funcționalități", "Comparație", "Prețuri", "Integrări"],
  },
  {
    title: "Companie",
    links: ["Despre noi", "Cariere", "Contact"],
  },
  {
    title: "Legal",
    links: ["Termeni & Condiții", "Confidențialitate", "GDPR"],
  },
];

export function Footer() {
  return (
    <footer className="relative mx-auto max-w-6xl px-6 py-16">
      <div className="grid grid-cols-2 gap-8 border-t border-white/[0.06] pt-12 sm:grid-cols-4">
        <div className="col-span-2 sm:col-span-1">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-glow/15">
              <Star className="h-3.5 w-3.5 fill-emerald-glow text-emerald-glow" />
            </div>
            <span className="text-sm font-semibold tracking-tight text-ink">StarSync</span>
          </div>
          <p className="mt-3 max-w-[220px] text-xs leading-relaxed text-ink/40">
            Sistemul automat de gestionare a reputației pentru afaceri locale.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
              {col.title}
            </p>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-ink/50 transition-colors duration-200 hover:text-ink"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-6 text-xs text-ink/30 sm:flex-row">
        <p>&copy; {new Date().getFullYear()} StarSync. Toate drepturile rezervate.</p>
        <p>Made for local businesses, cu drag.</p>
      </div>
    </footer>
  );
}
