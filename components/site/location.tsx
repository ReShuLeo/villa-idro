"use client";

import { gallery, type Lang } from "@/content/site-data";
import { Reveal } from "./reveal";
import { SectionHead } from "./ui";

const loc: Record<Lang, { title: string; sub: string; pin: string; beach: string; map: string }> = {
  en: { title: "Exactly where you'll be", sub: "Our villa sits just 50 metres above two beaches of Lake Idro — you see the water from the garden.", pin: "Villa Idro", beach: "50 m to the beaches", map: "Open in Google Maps" },
  it: { title: "Esattamente dove sarai", sub: "La nostra villa è a soli 50 metri sopra due spiagge del Lago d'Idro — vedi l'acqua dal giardino.", pin: "Villa Idro", beach: "50 m dalle spiagge", map: "Apri in Google Maps" },
  de: { title: "Genau hier sind Sie", sub: "Unsere Villa liegt nur 50 Meter über zwei Stränden des Idrosees — vom Garten sieht man das Wasser.", pin: "Villa Idro", beach: "50 m zu den Stränden", map: "In Google Maps öffnen" },
  ru: { title: "Вот где вы будете", sub: "Наша вилла — всего в 50 метрах над двумя пляжами озера Идро. Воду видно прямо из сада.", pin: "Villa Idro", beach: "50 м до пляжей", map: "Открыть в Google Картах" },
};

const MAP_URL = "https://www.google.com/maps/search/?api=1&query=Villa%20Idro%20Vesta%20Lago%20d%27Idro";

export function Location({ lang }: { lang: Lang }) {
  const l = loc[lang];
  return (
    <section id="location" className="py-20 md:py-28 bg-[#f7f4ee]">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <Reveal>
          <SectionHead title={l.title} sub={l.sub} />
        </Reveal>

        <Reveal className="mt-8">
          <div className="relative rounded-2xl overflow-hidden aspect-[16/10] md:aspect-[2/1] shadow-[0_24px_60px_-30px_rgba(22,52,60,0.5)]">
            <img src={gallery.hero} alt="Villa Idro location on Lake Idro" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/25" />

            {/* стрелка от дома к пляжу */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
              <defs>
                <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="#ffd9ae" />
                </marker>
              </defs>
              <path d="M46,44 C42,56 40,64 39,72" fill="none" stroke="#ffd9ae" strokeWidth="0.7" strokeDasharray="2 1.6" markerEnd="url(#arrow)" />
            </svg>

            {/* пин виллы */}
            <div className="absolute" style={{ left: "46%", top: "44%", transform: "translate(-50%,-100%)" }}>
              <div className="relative flex flex-col items-center">
                <span className="mb-1 whitespace-nowrap rounded-full bg-[#16343c] px-3 py-1 text-xs font-semibold text-[#f7f4ee] shadow-lg">
                  📍 {l.pin}
                </span>
                <span className="relative flex h-4 w-4">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ffd9ae] opacity-70" />
                  <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-white bg-[#1d7f5f]" />
                </span>
              </div>
            </div>

            {/* бейдж пляжа */}
            <div className="absolute" style={{ left: "39%", top: "74%", transform: "translate(-50%,0)" }}>
              <span className="whitespace-nowrap rounded-full bg-[#1d7f5f] px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
                🏖️ {l.beach}
              </span>
            </div>

            <a
              href={MAP_URL}
              target="_blank"
              rel="noopener"
              data-cursor
              className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2.5 text-sm font-medium text-[#16343c] shadow-lg hover:bg-white transition-colors"
            >
              🗺️ {l.map} ↗
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
