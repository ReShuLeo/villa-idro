"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {
  children: ReactNode;
  className?: string;
  /** stagger children matching this selector */
  stagger?: string;
  delay?: number;
  y?: number;
};

export function Reveal({ children, className, stagger, delay = 0, y = 36 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced || !ref.current) return;
      const targets = stagger ? ref.current.querySelectorAll(stagger) : ref.current;
      gsap.fromTo(
        targets,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: "power3.out",
          stagger: stagger ? 0.09 : 0,
          scrollTrigger: { trigger: ref.current, start: "top 82%", once: true },
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

export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const num = parseFloat(value.replace(/[^\d.]/g, ""));
    if (reduced || isNaN(num)) {
      el.textContent = value;
      return;
    }
    const prefixMatch = value.match(/^[^\d]*/);
    const suffix = value.replace(/^[^\d]*[\d.]+/, "");
    const prefix = prefixMatch ? prefixMatch[0] : "";
    const obj = { v: 0 };
    gsap.to(obj, {
      v: num,
      duration: 1.4,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
      onUpdate: () => {
        el.textContent = `${prefix}${Math.round(obj.v)}${suffix}`;
      },
    });
  });

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
