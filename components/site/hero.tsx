"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { BASE, contact, gallery, type Lang, t } from "@/content/site-data";
import { CtaButton, WaIcon } from "./ui";
import { Magnetic } from "./effects";

const WebGLHero = dynamic(() => import("./webgl-hero"), { ssr: false });

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export function Hero({ lang }: { lang: Lang }) {
  const d = t[lang];
  const root = useRef<HTMLDivElement>(null);
  const [desktopMotion, setDesktopMotion] = useState(false);
  const [webglCapable, setWebglCapable] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    // Тяжёлый фон (видео/WebGL) — только десктоп без reduced-motion (беречь INP/трафик на мобильном)
    if (!reduced && !coarse) {
      setDesktopMotion(true);
      try {
        setWebglCapable(!!document.createElement("canvas").getContext("webgl"));
      } catch {
        setWebglCapable(false);
      }
    }
  }, []);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced || !root.current) return;

      const split = new SplitText(".hero-h1", { type: "lines,words", linesClass: "overflow-hidden" });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".hero-bg", { scale: 1.14 }, { scale: 1, duration: 1.8, ease: "power2.out" })
        .fromTo(
          split.words,
          { yPercent: 118 },
          { yPercent: 0, duration: 1, stagger: 0.045 },
          0.25
        )
        .fromTo(".hero-sub", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.8)
        .fromTo(".hero-cta", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 1)
        .fromTo(".hero-chip", { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.06 }, 1.15)
        .fromTo(".hero-cue", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, 1.4);

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
      {desktopMotion && !videoFailed && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={gallery.hero}
          onError={() => setVideoFailed(true)}
        >
          <source src={`${BASE}/videos/hero.mp4`} type="video/mp4" />
        </video>
      )}
      {desktopMotion && videoFailed && webglCapable && <WebGLHero image={gallery.hero} />}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d2227]/92 via-[#0d2227]/45 to-[#0d2227]/25" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 md:px-8 pb-16 md:pb-20 pt-36">
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
          <a
            href="#stays"
            className="inline-flex items-center justify-center rounded-full border border-white/30 text-[#f7f4ee] px-7 py-4 min-h-[52px] leading-none font-medium hover:bg-white/10 transition-colors"
          >
            {d.hero.ctaSecondary}
          </a>
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
