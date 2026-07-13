"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { contact, heroAnnotated, type Lang, t } from "@/content/site-data";
import { CtaButton, WaIcon } from "./ui";
import { Magnetic } from "./effects";
import { openQuiz, quizLabel } from "./quiz";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export function Hero({ lang }: { lang: Lang }) {
  const d = t[lang];
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced || !root.current) return;

      const split = new SplitText(".hero-h1", { type: "lines,words", linesClass: "overflow-hidden" });
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".hero-bg", { scale: 1.12 }, { scale: 1, duration: 1.8, ease: "power2.out" })
        .fromTo(split.words, { yPercent: 118 }, { yPercent: 0, duration: 1, stagger: 0.045 }, 0.25)
        .fromTo(".hero-sub", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.8)
        .fromTo(".hero-cta", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 1);

      gsap.to(".hero-bg", {
        yPercent: 10,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });

      return () => split.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative min-h-[100svh] flex items-start overflow-hidden">
      {/* аэрофото с ВЖЖЁННЫМ указателем «вилла → 50 m → пляж» (маркеры всегда точны при любом кропе) */}
      <div
        className="hero-bg absolute inset-0 bg-cover will-change-transform [background-position:36%_45%] md:[background-position:50%_38%]"
        style={{ backgroundImage: `url(${heroAnnotated})` }}
        role="img"
        aria-label="Villa Idro on Lake Idro — the villa marked, 50 metres to the beach"
      />
      {/* затемнение только сверху (под текст); низ с виллой, путём и пляжем открыт */}
      <div className="absolute inset-x-0 top-0 h-[62%] bg-gradient-to-b from-[#0d2227]/92 via-[#0d2227]/45 to-transparent" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 md:px-8 pt-24 md:pt-28">
        <div className="max-w-xl">
          <p className="hero-sub text-[13px] md:text-sm tracking-[0.22em] uppercase text-[#e8c9a8] mb-4">
            {d.hero.eyebrow}
          </p>

          <h1 className="hero-h1 font-display text-[#f7f4ee] text-[clamp(2.1rem,5.6vw,4rem)] leading-[1.05] tracking-tight">
            {d.hero.h1a} <span className="text-[#ffd9ae]">{d.hero.h1b}</span>
          </h1>

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
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-black/15 backdrop-blur-sm text-[#f7f4ee] px-7 py-4 min-h-[52px] leading-none font-medium hover:bg-white/10 transition-colors"
            >
              ✨ {quizLabel(lang)}
            </button>
          </div>
          <p className="hero-cta mt-3 text-sm text-[#cdd9d5]">{d.hero.ctaDoubt}</p>
        </div>
      </div>
    </section>
  );
}
