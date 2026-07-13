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

const villaWord: Record<Lang, string> = { en: "Our villa", it: "La villa", de: "Unsere Villa", ru: "Наша вилла" };
const beachWord: Record<Lang, string> = { en: "beaches", it: "spiagge", de: "Strände", ru: "пляжи" };

function Route({
  villa,
  m50,
  beach,
  path,
  lang,
}: {
  villa: [string, string];
  m50: [string, string];
  beach: [string, string];
  path: string;
  lang: Lang;
}) {
  return (
    <>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
        <path
          className="route-path"
          d={path}
          fill="none"
          stroke="#ffd9ae"
          strokeWidth="0.5"
          strokeLinecap="round"
          strokeDasharray="2.4 1.8"
        />
      </svg>
      <div className="absolute" style={{ left: villa[0], top: villa[1], transform: "translate(-50%,-50%)" }}>
        <span className="relative flex h-3.5 w-3.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ffd9ae] opacity-70" />
          <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-white bg-[#1d7f5f]" />
        </span>
        <span className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap text-sm font-semibold text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.9)]">
          {villaWord[lang]}
        </span>
      </div>
      <div className="absolute" style={{ left: m50[0], top: m50[1], transform: "translate(0,-50%)" }}>
        <span className="whitespace-nowrap text-lg font-bold text-[#ffd9ae] [text-shadow:0_2px_10px_rgba(0,0,0,0.95)]">
          50&nbsp;m
        </span>
      </div>
      <div className="absolute" style={{ left: beach[0], top: beach[1], transform: "translate(-50%,-50%)" }}>
        <span className="text-xl [filter:drop-shadow(0_2px_6px_rgba(0,0,0,0.75))]">🏖️</span>
        <span className="absolute left-7 top-1/2 -translate-y-1/2 whitespace-nowrap text-sm font-semibold text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.9)]">
          {beachWord[lang]}
        </span>
      </div>
    </>
  );
}

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
        .fromTo(".hero-route", { autoAlpha: 0 }, { autoAlpha: 1, duration: 1 }, 0.9)
        .fromTo(".route-path", { strokeDashoffset: 60 }, { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut" }, 1);

      gsap.to(".hero-bg", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });

      return () => split.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative min-h-[100svh] flex items-start md:items-center overflow-hidden">
      <div
        className="hero-bg absolute inset-0 bg-cover bg-center will-change-transform"
        style={{ backgroundImage: `url(${gallery.hero})` }}
        role="img"
        aria-label="Villa Idro on Lake Idro — the villa and the short path to the beach"
      />
      {/* мобильный градиент — темнее сверху (под текст), низ открыт под путь;
          десктопный — темнее слева, центр-право открыт */}
      <div className="absolute inset-0 md:hidden bg-gradient-to-b from-[#0d2227]/92 via-[#0d2227]/35 to-[#0d2227]/10" />
      <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-[#0d2227]/90 via-[#0d2227]/40 to-transparent" />

      {/* Путь вилла → пляж, нарисованный НА фото. Разные позиции для мобильного и десктопа. */}
      <div className="hero-route absolute inset-0 z-[5] pointer-events-none md:hidden">
        <Route lang={lang} villa={["50%", "57%"]} m50={["54%", "71%"]} beach={["52%", "87%"]} path="M50,57 Q55,71 52,87" />
      </div>
      <div className="hero-route absolute inset-0 z-[5] pointer-events-none hidden md:block">
        <Route lang={lang} villa={["63%", "42%"]} m50={["68%", "59%"]} beach={["65%", "78%"]} path="M63,42 Q67,58 65,78" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 md:px-8 pt-28 md:pt-0">
        <div className="max-w-lg">
          <p className="hero-sub text-[13px] md:text-sm tracking-[0.22em] uppercase text-[#e8c9a8] mb-4">
            {d.hero.eyebrow}
          </p>

          <h1 className="hero-h1 font-display text-[#f7f4ee] text-[clamp(2.1rem,6vw,4.2rem)] leading-[1.06] tracking-tight">
            {d.hero.h1a} <span className="text-[#ffd9ae]">{d.hero.h1b}</span>
          </h1>

          {/* подзаголовок — только десктоп (на мобильном тот же смысл в блоке доверия ниже) */}
          <p className="hero-sub mt-5 hidden md:block text-lg leading-relaxed text-[#dbe5e2]">{d.hero.sub}</p>

          <div className="hero-cta mt-7 flex flex-col sm:flex-row sm:items-center gap-3.5">
            <Magnetic>
              <CtaButton href={contact.wa(d.hero.waMessage)} pulse variant="primary">
                <WaIcon />
                {d.hero.ctaMain}
              </CtaButton>
            </Magnetic>
            <button
              onClick={openQuiz}
              data-cursor
              className="hidden md:inline-flex items-center justify-center gap-2 rounded-full border border-white/30 text-[#f7f4ee] px-7 py-4 min-h-[52px] leading-none font-medium hover:bg-white/10 transition-colors"
            >
              ✨ {quizLabel(lang)}
            </button>
          </div>
          <p className="hero-cta mt-3 text-sm text-[#b9cbc6]">{d.hero.ctaDoubt}</p>
        </div>
      </div>
    </section>
  );
}
