"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { contact, gallery, type Lang, t } from "@/content/site-data";
import { CtaButton, WaIcon } from "./ui";
import { Magnetic } from "./effects";
import { openQuiz, quizLabel } from "./quiz";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const beachLabel: Record<Lang, string> = {
  en: "50 m to the beach",
  it: "50 m dalla spiaggia",
  de: "50 m zum Strand",
  ru: "50 м до пляжа",
};

export function Hero({ lang }: { lang: Lang }) {
  const d = t[lang];
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced || !root.current) return;

      const split = new SplitText(".hero-h1", { type: "lines,words", linesClass: "overflow-hidden" });
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".hero-bg", { scale: 1.14 }, { scale: 1, duration: 1.8, ease: "power2.out" })
        .fromTo(split.words, { yPercent: 118 }, { yPercent: 0, duration: 1, stagger: 0.045 }, 0.25)
        .fromTo(".hero-sub", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.8)
        .fromTo(".hero-cta", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 1)
        .fromTo(".hero-chip", { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.06 }, 1.15)
        .fromTo(".hero-pin", { autoAlpha: 0, scale: 0.7 }, { autoAlpha: 1, scale: 1, duration: 0.6 }, 1.3)
        .fromTo(".hero-cue", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, 1.5);

      gsap.to(".hero-bg", {
        yPercent: 16,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-cue-dot", { y: 10, repeat: -1, yoyo: true, duration: 0.9, ease: "sine.inOut" });

      return () => split.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative min-h-[100svh] flex items-end overflow-hidden">
      <div
        className="hero-bg absolute inset-0 bg-cover bg-center will-change-transform"
        style={{ backgroundImage: `url(${gallery.hero})` }}
        role="img"
        aria-label="Villa Idro panorama, Lake Idro"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d2227]/92 via-[#0d2227]/35 to-[#0d2227]/15" />

      {/* Указатель «вот наш дом → 50 м до пляжа» в верхней зоне (без наложения на текст) */}
      <div className="hero-pin absolute right-4 top-24 md:right-10 md:top-28 z-10 flex flex-col items-end gap-1.5 text-right">
        <span className="flex items-center gap-1.5 rounded-full bg-[#16343c]/90 backdrop-blur px-3 py-1.5 text-xs md:text-sm font-semibold text-[#f7f4ee] shadow-lg">
          📍 Villa Idro
        </span>
        <span className="flex items-center gap-1.5 rounded-full bg-[#1d7f5f] px-3 py-1.5 text-xs md:text-sm font-semibold text-white shadow-lg">
          🏖️ {beachLabel[lang]} ↓
        </span>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 md:px-8 pb-16 md:pb-20 pt-40">
        <p className="hero-sub text-[13px] md:text-sm tracking-[0.22em] uppercase text-[#e8c9a8] mb-5">
          {d.hero.eyebrow}
        </p>

        <h1 className="hero-h1 font-display text-[#f7f4ee] text-[clamp(2.4rem,7vw,4.6rem)] leading-[1.05] tracking-tight max-w-3xl">
          {d.hero.h1a} <span className="text-[#ffd9ae]">{d.hero.h1b}</span>
        </h1>

        <p className="hero-sub mt-6 max-w-xl text-lg leading-relaxed text-[#dbe5e2]">{d.hero.sub}</p>

        <div className="hero-cta mt-9 flex flex-col sm:flex-row sm:items-center gap-4">
          <Magnetic>
            <CtaButton href={contact.wa(d.hero.waMessage)} pulse variant="primary">
              <WaIcon />
              {d.hero.ctaMain}
            </CtaButton>
          </Magnetic>
          <button
            onClick={openQuiz}
            data-cursor
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 text-[#f7f4ee] px-7 py-4 min-h-[52px] leading-none font-medium hover:bg-white/10 transition-colors"
          >
            ✨ {quizLabel(lang)}
          </button>
        </div>
        <p className="hero-cta mt-3 text-sm text-[#b9cbc6]">{d.hero.ctaDoubt}</p>

        <ul className="mt-10 flex flex-wrap gap-2.5">
          {d.hero.chips.map((c) => (
            <li
              key={c}
              className="hero-chip text-[13px] md:text-sm text-[#eef3f1] bg-white/10 backdrop-blur border border-white/15 rounded-full px-4 py-2"
            >
              {c}
            </li>
          ))}
        </ul>
      </div>

      <div className="hero-cue absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2">
        <span className="w-6 h-10 rounded-full border border-white/40 flex justify-center pt-2">
          <span className="hero-cue-dot w-1 h-2 rounded-full bg-white/70" />
        </span>
      </div>
    </section>
  );
}
