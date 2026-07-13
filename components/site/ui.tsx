"use client";

import { type ReactNode } from "react";

export function WaIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.7 14.2c-.24.68-1.4 1.3-1.93 1.35-.52.05-1 .24-3.37-.7-2.85-1.12-4.66-4-4.8-4.2-.14-.18-1.14-1.52-1.14-2.9 0-1.37.72-2.05 1-2.33.24-.28.56-.35.75-.35h.54c.17 0 .4-.06.63.48.24.56.8 1.94.87 2.08.07.14.12.3.02.49-.42.84-.87.8-.64 1.2.86 1.47 1.72 1.98 3.02 2.63.22.11.35.1.48-.06.13-.15.55-.64.7-.86.14-.22.29-.18.49-.1.2.06 1.26.6 1.48.7.22.12.36.17.42.26.05.1.05.55-.2 1.24Z" />
    </svg>
  );
}

export function TgIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M21.9 4.6c.3-1.1-.8-1.6-1.7-1.2L2.9 10.1c-1.1.4-1 1.9 0 2.2l4.4 1.4 1.7 5.3c.3.9 1.4 1 2 .4l2.5-2.4 4.5 3.3c.8.6 2 .1 2.2-.9l1.7-14.8ZM8.5 13.2l8.5-5.4c.3-.2.6.2.4.4l-6.9 6.5-.3 3-1.7-4.5Z" />
    </svg>
  );
}

export function CtaButton({
  href,
  children,
  pulse = false,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  pulse?: boolean;
  variant?: "primary" | "ghost" | "dark";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2.5 rounded-full font-semibold transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] px-7 py-4 text-base leading-none min-h-[52px]";
  const styles = {
    primary: "bg-[#1d7f5f] text-white shadow-[0_10px_30px_-8px_rgba(29,127,95,0.55)]",
    ghost: "bg-white/10 text-white backdrop-blur border border-white/25 hover:bg-white/20",
    dark: "bg-[#16343c] text-[#f7f4ee] hover:bg-[#1c424c]",
  } as const;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className={`${base} ${styles[variant]} ${pulse ? "cta-pulse" : ""} ${className}`}
    >
      {children}
    </a>
  );
}

export function SectionHead({
  title,
  sub,
  light = false,
}: {
  title: string;
  sub?: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-2xl">
      <h2
        className={`font-display text-4xl md:text-5xl leading-[1.06] tracking-tight ${
          light ? "text-[#f7f4ee]" : "text-[#16343c]"
        }`}
      >
        {title}
      </h2>
      {sub && (
        <p className={`mt-4 text-lg leading-relaxed ${light ? "text-[#c9d6d2]" : "text-[#4a5e5c]"}`}>
          {sub}
        </p>
      )}
    </div>
  );
}
