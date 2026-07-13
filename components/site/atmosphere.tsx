"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/** Плёночное зерно поверх всего сайта — премиальная фактура */
export function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[45] opacity-[0.055] mix-blend-overlay"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  );
}

/** Кастомный курсор (десктоп): точка + кольцо, растёт на интерактивных элементах */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    document.documentElement.classList.add("has-cursor");
    const d = dot.current!;
    const r = ring.current!;
    gsap.set([d, r], { xPercent: -50, yPercent: -50, opacity: 0 });
    const dx = gsap.quickTo(d, "x", { duration: 0.15, ease: "power3" });
    const dy = gsap.quickTo(d, "y", { duration: 0.15, ease: "power3" });
    const rx = gsap.quickTo(r, "x", { duration: 0.5, ease: "power3" });
    const ry = gsap.quickTo(r, "y", { duration: 0.5, ease: "power3" });

    const move = (e: MouseEvent) => {
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
      gsap.to([d, r], { opacity: 1, duration: 0.2 });
      const interactive = (e.target as HTMLElement)?.closest("a,button,[data-cursor]");
      gsap.to(r, { scale: interactive ? 1.8 : 1, borderColor: interactive ? "#1d7f5f" : "rgba(247,244,238,0.55)", duration: 0.25 });
    };
    const leave = () => gsap.to([d, r], { opacity: 0, duration: 0.2 });

    window.addEventListener("mousemove", move);
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.classList.remove("has-cursor");
    };
  });

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[80] hidden md:block">
      <div ref={ring} className="fixed top-0 left-0 w-9 h-9 rounded-full border border-[#f7f4ee]/55" />
      <div ref={dot} className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#ffd9ae]" />
    </div>
  );
}
