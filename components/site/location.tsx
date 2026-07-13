"use client";

import { heroAnnotated, type Lang } from "@/content/site-data";
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
          <div className="relative rounded-2xl overflow-hidden aspect-[16/10] md:aspect-[3/2] shadow-[0_24px_60px_-30px_rgba(22,52,60,0.5)]">
            {/* фото с уже вжжённым указателем «вилла → 50 m → пляж» */}
            <img
              src={heroAnnotated}
              alt={`Villa Idro location on Lake Idro — ${l.pin}, ${l.beach}`}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <span className="absolute top-4 left-4 rounded-full bg-[#16343c]/90 px-3.5 py-1.5 text-xs font-semibold text-[#f7f4ee] shadow-lg">
              📍 {l.pin} · 🏖️ {l.beach}
            </span>
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
