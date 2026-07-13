"use client";

import { useEffect, useState } from "react";
import { BASE, contact, langs, type Lang, t } from "@/content/site-data";
import { WaIcon } from "./ui";

const langHref = (l: Lang) => (l === "en" ? `${BASE}/` : `${BASE}/${l}/`);

export function Header({ lang }: { lang: Lang }) {
  const d = t[lang];
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-[#0d2227]/90 backdrop-blur border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between gap-4">
        <a href={langHref(lang)} className="font-display text-xl text-[#f7f4ee] tracking-tight">
          Villa <span className="text-[#ffd9ae]">Idro</span>
        </a>

        <nav className="hidden lg:flex items-center gap-7 text-[15px] text-[#dbe5e2]">
          <a href="#stays" className="hover:text-[#ffd9ae] transition-colors">{d.nav.stays}</a>
          <a href="#villa" className="hover:text-[#ffd9ae] transition-colors">{d.nav.villa}</a>
          <a href="#lake" className="hover:text-[#ffd9ae] transition-colors">{d.nav.lake}</a>
          <a href="#faq" className="hover:text-[#ffd9ae] transition-colors">{d.nav.faq}</a>
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-[13px]">
            {langs.map((l) => (
              <a
                key={l}
                href={langHref(l)}
                className={`px-2 py-1 rounded uppercase transition-colors ${
                  l === lang ? "text-[#ffd9ae] font-semibold" : "text-[#9db3ae] hover:text-[#f7f4ee]"
                }`}
              >
                {l}
              </a>
            ))}
          </div>
          <a
            href={contact.wa(d.hero.waMessage)}
            target="_blank"
            rel="noopener"
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-[#1d7f5f] text-white text-sm font-semibold px-4 py-2.5 leading-none hover:bg-[#23996f] transition-colors"
          >
            <WaIcon className="w-4 h-4" />
            WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}

export function StickyBar({ lang }: { lang: Lang }) {
  const d = t[lang];
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-[#0d2227]/95 backdrop-blur border-t border-white/10 px-3 py-2.5 flex gap-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))]">
      <a
        href={contact.wa(d.hero.waMessage)}
        target="_blank"
        rel="noopener"
        className="cta-pulse flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#1d7f5f] text-white font-semibold py-3.5 leading-none min-h-[48px]"
      >
        <WaIcon className="w-5 h-5" />
        {d.hero.ctaMain}
      </a>
      <a
        href={contact.tg()}
        target="_blank"
        rel="noopener"
        aria-label="Telegram"
        className="inline-flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white w-12 min-h-[48px]"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden>
          <path d="M21.9 4.6c.3-1.1-.8-1.6-1.7-1.2L2.9 10.1c-1.1.4-1 1.9 0 2.2l4.4 1.4 1.7 5.3c.3.9 1.4 1 2 .4l2.5-2.4 4.5 3.3c.8.6 2 .1 2.2-.9l1.7-14.8ZM8.5 13.2l8.5-5.4c.3-.2.6.2.4.4l-6.9 6.5-.3 3-1.7-4.5Z" />
        </svg>
      </a>
    </div>
  );
}
