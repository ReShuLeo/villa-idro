"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { contact, stays, type Lang, type Stay, t } from "@/content/site-data";
import { SectionHead, WaIcon } from "./ui";
import { Reveal } from "./reveal";
import { openQuiz, quizBadge, quizLabel } from "./quiz";

function stayTitle(lang: Lang, stay: Stay) {
  const isApt = stay.kind === "apartment";
  const word = isApt
    ? lang === "ru" ? "Апартамент" : lang === "de" ? "Wohnung" : "Apartment"
    : lang === "ru" ? "Дом" : lang === "de" ? "Haus" : "Home";
  return `${word} ${stay.name}`;
}

function StayCard({
  lang,
  stay,
  onOpen,
}: {
  lang: Lang;
  stay: Stay;
  onOpen: (stay: Stay, index: number) => void;
}) {
  const d = t[lang];
  const [photo, setPhoto] = useState(0);
  const isApt = stay.kind === "apartment";
  const title = stayTitle(lang, stay);
  const fromPrice = isApt ? d.stays.aptFrom : d.stays.homeFrom;
  const features = isApt ? d.stays.aptFeatures : d.stays.homeFeatures;
  const len = stay.photos.length;
  const dots = Math.min(len, 10);
  const scroller = useRef<HTMLDivElement>(null);

  const scrollToIdx = (i: number) => {
    const el = scroller.current;
    if (el) el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };
  const go = (dir: number) => scrollToIdx((photo + dir + len) % len);
  const onScroll = () => {
    const el = scroller.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    if (i !== photo) setPhoto(i);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ type: "spring", stiffness: 220, damping: 26 }}
      className="stay-card bg-white rounded-2xl overflow-hidden shadow-[0_18px_45px_-22px_rgba(22,52,60,0.35)] border border-[#e7e0d2] flex flex-col"
    >
      <div className="relative aspect-[4/3] overflow-hidden group">
        {/* Нативная свайп-лента (палец листает; тап по фото открывает галерею) */}
        <div
          ref={scroller}
          onScroll={onScroll}
          className="flex h-full w-full overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {stay.photos.map((src, i) => (
            <button
              key={i}
              onClick={() => onOpen(stay, i)}
              aria-label={`${title} photo ${i + 1}`}
              className="relative shrink-0 w-full h-full snap-center cursor-zoom-in"
            >
              <Image
                src={src}
                alt={`${title} — Villa Idro ${i + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>

        {/* стрелки — десктоп */}
        <button
          aria-label="Previous photo"
          onClick={() => go(-1)}
          className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 items-center justify-center rounded-full bg-white/80 text-[#16343c] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
        >
          ‹
        </button>
        <button
          aria-label="Next photo"
          onClick={() => go(1)}
          className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 items-center justify-center rounded-full bg-white/80 text-[#16343c] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
        >
          ›
        </button>

        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 pointer-events-none">
          {stay.photos.slice(0, dots).map((_, i) => (
            <span
              key={i}
              className={`h-2 rounded-full transition-all ${i === photo ? "w-5 bg-white" : "w-2 bg-white/50"}`}
            />
          ))}
        </div>
        <span className="absolute top-3 left-3 z-20 bg-[#16343c]/85 backdrop-blur text-[#f7f4ee] text-xs font-medium rounded-full px-3 py-1.5 pointer-events-none">
          {stay.sleeps} {d.stays.sleeps} · {stay.size} {d.stays.size}
        </span>
        <span className="absolute top-3 right-3 z-20 bg-white/85 text-[#16343c] text-xs font-medium rounded-full px-3 py-1.5 pointer-events-none">
          {photo + 1}/{len}
        </span>
      </div>

      <div className="p-5 flex flex-col grow">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-2xl text-[#16343c]">{title}</h3>
          <p className="text-right leading-tight shrink-0">
            <span className="text-sm text-[#6b7d7a]">{d.stays.from} </span>
            <span className="text-xl font-semibold text-[#1d7f5f]">€{fromPrice}</span>
            <span className="text-sm text-[#6b7d7a]"> {d.stays.night}</span>
          </p>
        </div>

        <ul className="mt-3 space-y-1.5 text-[15px] text-[#4a5e5c]">
          {features.map((f) => (
            <li key={f} className="flex gap-2">
              <span className="text-[#1d7f5f] mt-0.5">✓</span>
              {f}
            </li>
          ))}
          {/* Балкон ВСЕГДА занимает строку (правило владельца: нет балкона → пустая строка той же
              высоты, чтобы CIR и кнопка WhatsApp во ВСЕХ карточках были на одной высоте). */}
          <li className={`flex gap-2${stay.balcony ? "" : " invisible"}`} aria-hidden={!stay.balcony}>
            <span className="text-[#1d7f5f] mt-0.5">✓</span>
            {stay.balcony ? d.stays.balcony.charAt(0).toUpperCase() + d.stays.balcony.slice(1) : d.stays.balcony}
          </li>
        </ul>

        <p className="mt-2 text-[11px] text-[#a5aea6] tracking-wide">CIR: {stay.cir}</p>

        <a
          href={contact.wa(d.stays.waStay(title))}
          target="_blank"
          rel="noopener"
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-[#16343c] text-[#f7f4ee] font-medium px-5 py-3 min-h-[46px] leading-none hover:bg-[#1d7f5f] transition-colors"
        >
          <WaIcon className="w-4.5 h-4.5" />
          {d.stays.cta}
        </a>
      </div>
    </motion.article>
  );
}

function Lightbox({
  lang,
  stay,
  start,
  onClose,
}: {
  lang: Lang;
  stay: Stay;
  start: number;
  onClose: () => void;
}) {
  const d = t[lang];
  const [i, setI] = useState(start);
  const title = stayTitle(lang, stay);
  const next = () => setI((i + 1) % stay.photos.length);
  const prev = () => setI((i - 1 + stay.photos.length) % stay.photos.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setI((v) => (v + 1) % stay.photos.length);
      if (e.key === "ArrowLeft") setI((v) => (v - 1 + stay.photos.length) % stay.photos.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [stay.photos.length, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] bg-[#0d2227]/95 backdrop-blur-sm flex flex-col"
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-5 py-4 text-[#f7f4ee]">
        <span className="font-display text-xl">
          {title} <span className="text-[#9db3ae] text-base">· {i + 1}/{stay.photos.length}</span>
        </span>
        <button onClick={onClose} aria-label="Close" className="text-3xl leading-none px-2 hover:text-[#ffd9ae]">
          ×
        </button>
      </div>

      <div className="relative flex-1 flex items-center justify-center px-4 pb-4" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={prev}
          aria-label="Previous"
          className="absolute left-3 md:left-8 z-10 w-11 h-11 rounded-full bg-white/10 border border-white/20 text-white text-2xl hover:bg-white/20"
        >
          ‹
        </button>
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-5xl aspect-[4/3]"
          >
            <Image src={stay.photos[i]} alt={`${title} ${i + 1}`} fill sizes="90vw" className="object-contain" />
          </motion.div>
        </AnimatePresence>
        <button
          onClick={next}
          aria-label="Next"
          className="absolute right-3 md:right-8 z-10 w-11 h-11 rounded-full bg-white/10 border border-white/20 text-white text-2xl hover:bg-white/20"
        >
          ›
        </button>
      </div>

      <div className="px-4 pb-5 flex justify-center" onClick={(e) => e.stopPropagation()}>
        <a
          href={contact.wa(d.stays.waStay(title))}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2 rounded-full bg-[#1d7f5f] text-white font-semibold px-6 py-3 leading-none"
        >
          <WaIcon /> {d.stays.cta}
        </a>
      </div>
    </motion.div>
  );
}

export function Stays({ lang }: { lang: Lang }) {
  const d = t[lang];
  const [tab, setTab] = useState<"apartment" | "home">("apartment");
  const [lb, setLb] = useState<{ stay: Stay; start: number } | null>(null);
  const list = stays.filter((s) => s.kind === tab);

  return (
    <section id="stays" className="py-20 md:py-28 bg-[#f7f4ee]">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <Reveal>
          <SectionHead title={d.stays.title} sub={d.stays.sub} />
        </Reveal>

        <button
          onClick={openQuiz}
          data-cursor
          className="mt-6 group inline-flex items-center gap-3 rounded-2xl border border-[#1d7f5f]/25 bg-white px-5 py-4 text-left shadow-[0_10px_30px_-18px_rgba(29,127,95,0.5)] hover:border-[#1d7f5f] transition-colors"
        >
          <span className="text-2xl">✨</span>
          <span>
            <span className="block font-semibold text-[#16343c] group-hover:text-[#1d7f5f] transition-colors">
              {quizLabel(lang)}
            </span>
            <span className="block text-sm text-[#6b7d7a]">{quizBadge(lang)}</span>
          </span>
          <span className="ml-2 text-[#1d7f5f] text-xl">→</span>
        </button>

        <div className="mt-8 inline-flex rounded-full bg-[#e9e2d2] p-1.5 lg:ml-3">
          {(["apartment", "home"] as const).map((k) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`relative rounded-full px-5 md:px-7 py-2.5 text-[15px] font-medium transition-colors ${
                tab === k ? "text-[#f7f4ee]" : "text-[#16343c] hover:text-[#1d7f5f]"
              }`}
            >
              {tab === k && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 bg-[#16343c] rounded-full"
                  transition={{ type: "spring", stiffness: 320, damping: 30 }}
                />
              )}
              <span className="relative z-10">{k === "apartment" ? d.stays.tabApartments : d.stays.tabHomes}</span>
            </button>
          ))}
        </div>

        <motion.div layout className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((s) => (
              <StayCard key={s.id} lang={lang} stay={s} onOpen={(stay, start) => setLb({ stay, start })} />
            ))}
          </AnimatePresence>
        </motion.div>

        <p className="mt-8 text-sm text-[#6b7d7a] max-w-2xl">{d.stays.priceNote}</p>
      </div>

      <AnimatePresence>
        {lb && <Lightbox lang={lang} stay={lb.stay} start={lb.start} onClose={() => setLb(null)} />}
      </AnimatePresence>
    </section>
  );
}
