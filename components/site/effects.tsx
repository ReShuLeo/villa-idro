"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Тонкая полоса прогресса скролла сверху страницы */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
    });
  });
  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-[#ffd9ae] origin-left scale-x-0"
      style={{ transformOrigin: "left center" }}
    />
  );
}

/** Магнитная кнопка — тянется к курсору (десктоп). Эффект из CRO-исследования (клик ↑). */
export function Magnetic({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(pointer: coarse)").matches) return;
      const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * 0.32);
        yTo((e.clientY - (r.top + r.height / 2)) * 0.32);
      };
      const onLeave = () => {
        xTo(0);
        yTo(0);
      };
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      return () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: ref }
  );

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {children}
    </span>
  );
}

/** Раскрытие изображения по clip-path при въезде в экран (Awwwards-приём) */
export function ClipReveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        el,
        { clipPath: "inset(12% 12% 12% 12% round 16px)", scale: 1.12 },
        {
          clipPath: "inset(0% 0% 0% 0% round 16px)",
          scale: 1,
          duration: 1.15,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        }
      );
    },
    { scope: ref }
  );
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/** Бесконечная бегущая строка удобств (kinetic typography) */
export function Marquee({ items }: { items: string[] }) {
  const track = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (!track.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.to(track.current, { xPercent: -50, duration: 26, ease: "none", repeat: -1 });
  });
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-[#2a4a52] bg-[#0f2b31] py-5">
      <div ref={track} className="flex whitespace-nowrap will-change-transform">
        {row.map((it, i) => (
          <span key={i} className="mx-6 inline-flex items-center gap-6 text-[#c9d6d2] text-lg font-display">
            {it}
            <span className="text-[#ffd9ae]">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
