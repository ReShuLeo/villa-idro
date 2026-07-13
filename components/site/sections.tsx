"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { contact, gallery, lakeImgs, stays, villaImgs, type Lang, t } from "@/content/site-data";
import { CountUp, Reveal } from "./reveal";
import { CtaButton, SectionHead, TgIcon, WaIcon } from "./ui";

export function TrustBar({ lang }: { lang: Lang }) {
  const d = t[lang];
  return (
    <section className="bg-[#16343c] text-[#f7f4ee] py-14 md:py-16">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <Reveal stagger=".trust-item" className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {d.trust.items.map((it) => (
            <div key={it.label} className="trust-item">
              <CountUp value={it.n} className="font-display text-4xl md:text-5xl text-[#ffd9ae]" />
              <p className="mt-2 text-sm md:text-[15px] text-[#c9d6d2] leading-snug">{it.label}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function Villa({ lang }: { lang: Lang }) {
  const d = t[lang];
  return (
    <section id="villa" className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <Reveal>
          <SectionHead title={d.villa.title} sub={d.villa.sub} />
        </Reveal>
        <Reveal stagger=".villa-item" className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {d.villa.items.map((it, i) => (
            <figure
              key={it.title}
              className="villa-item group rounded-2xl overflow-hidden bg-[#f7f4ee] border border-[#eee7d8]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={villaImgs[i] ?? gallery.pool[0]}
                  alt={it.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                />
              </div>
              <figcaption className="p-5">
                <h3 className="font-display text-xl text-[#16343c]">{it.title}</h3>
                <p className="mt-1.5 text-[15px] text-[#4a5e5c] leading-relaxed">{it.text}</p>
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function Lake({ lang }: { lang: Lang }) {
  const d = t[lang];
  return (
    <section id="lake" className="py-20 md:py-28 bg-[#0f2b31] text-[#f7f4ee]">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <Reveal>
          <SectionHead title={d.lake.title} sub={d.lake.sub} light />
        </Reveal>

        <div className="mt-12 space-y-16">
          {d.lake.blocks.map((b, i) => (
            <Reveal key={b.title}>
              <div
                className={`grid gap-6 lg:gap-12 lg:grid-cols-2 items-center ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div>
                  <span className="font-display text-[#e8c9a8]/50 text-5xl leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-3xl mt-3">{b.title}</h3>
                  <p className="mt-3 text-[#c9d6d2] text-lg leading-relaxed max-w-md">{b.text}</p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {(lakeImgs[i] ?? b.imgs).map((img, j) => (
                    <div
                      key={img}
                      className={`relative rounded-xl overflow-hidden ${j === 0 ? "col-span-2 row-span-2 aspect-[4/3]" : "aspect-square"}`}
                    >
                      <Image src={img} alt={b.title} fill sizes="33vw" className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Hosts({ lang }: { lang: Lang }) {
  const d = t[lang];
  return (
    <section className="py-20 md:py-28 bg-[#f7f4ee]">
      <div className="max-w-6xl mx-auto px-5 md:px-8 grid gap-10 lg:grid-cols-2 items-center">
        <Reveal>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Image src={gallery.pool[0]} alt="Villa Idro pool" fill sizes="50vw" className="object-cover" />
          </div>
        </Reveal>
        <Reveal>
          <SectionHead title={d.hosts.title} />
          <p className="mt-5 text-lg text-[#4a5e5c] leading-relaxed">{d.hosts.text1}</p>
          <p className="mt-4 text-lg text-[#4a5e5c] leading-relaxed">{d.hosts.text2}</p>
          <p className="mt-6 font-display text-xl text-[#16343c] italic">— {d.hosts.sign}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <CtaButton href={contact.wa(d.hero.waMessage)} variant="primary">
              <WaIcon /> WhatsApp
            </CtaButton>
            <CtaButton href={contact.tg()} variant="dark">
              <TgIcon /> Telegram
            </CtaButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function HowItWorks({ lang }: { lang: Lang }) {
  const d = t[lang];
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <Reveal>
          <SectionHead title={d.how.title} />
        </Reveal>
        <Reveal stagger=".how-step" className="mt-10 grid gap-6 md:grid-cols-3">
          {d.how.steps.map((s, i) => (
            <div key={s.title} className="how-step relative rounded-2xl border border-[#eee7d8] bg-[#f7f4ee] p-6 pt-8">
              <span className="absolute -top-5 left-6 w-10 h-10 rounded-full bg-[#1d7f5f] text-white font-display text-lg flex items-center justify-center shadow-lg">
                {i + 1}
              </span>
              <h3 className="font-display text-xl text-[#16343c]">{s.title}</h3>
              <p className="mt-2 text-[15px] text-[#4a5e5c] leading-relaxed">{s.text}</p>
            </div>
          ))}
        </Reveal>
        <p className="mt-7 text-sm text-[#6b7d7a]">{d.how.doubt}</p>
      </div>
    </section>
  );
}

export function Faq({ lang }: { lang: Lang }) {
  const d = t[lang];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-20 md:py-28 bg-[#f7f4ee]">
      <div className="max-w-3xl mx-auto px-5 md:px-8">
        <Reveal>
          <SectionHead title={d.faq.title} />
        </Reveal>
        <div className="mt-9 space-y-3">
          {d.faq.items.map((item, i) => (
            <div key={item.q} className="rounded-xl bg-white border border-[#eee7d8] overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 text-left px-5 md:px-6 py-4.5 min-h-[56px]"
                aria-expanded={open === i}
              >
                <span className="font-medium text-[#16343c] text-[16px]">{item.q}</span>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-[#1d7f5f] text-2xl leading-none shrink-0"
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                  >
                    <p className="px-5 md:px-6 pb-5 text-[15px] leading-relaxed text-[#4a5e5c]">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCta({ lang }: { lang: Lang }) {
  const d = t[lang];
  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${gallery.beaches[0]})` }}
      />
      <div className="absolute inset-0 bg-[#0d2227]/80" />
      <Reveal className="relative z-10 max-w-3xl mx-auto px-5 md:px-8 text-center">
        <h2 className="font-display text-4xl md:text-5xl text-[#f7f4ee] leading-[1.06]">{d.final.title}</h2>
        <p className="mt-4 text-lg text-[#c9d6d2]">{d.final.sub}</p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <CtaButton href={contact.wa(d.hero.waMessage)} pulse variant="primary">
            <WaIcon /> {d.final.cta}
          </CtaButton>
          <CtaButton href={contact.tg()} variant="ghost">
            <TgIcon /> {d.final.tg}
          </CtaButton>
        </div>
        <p className="mt-4 text-sm text-[#a8bcb6]">{d.final.doubt}</p>
      </Reveal>
    </section>
  );
}

export function Footer({ lang }: { lang: Lang }) {
  const d = t[lang];
  return (
    <footer className="bg-[#0d2227] text-[#8fa5a0] py-12 text-sm">
      <div className="max-w-6xl mx-auto px-5 md:px-8 grid gap-8 md:grid-cols-3">
        <div>
          <p className="font-display text-xl text-[#f7f4ee]">Villa Idro</p>
          <p className="mt-2">{d.footer.addr}</p>
          <p className="mt-2">{d.footer.direct}</p>
          <p className="mt-1">{contact.phoneDisplay}</p>
        </div>
        <div>
          <p className="text-[#c9d6d2] font-medium mb-2">{d.footer.cirTitle}</p>
          <ul className="space-y-0.5 text-xs leading-relaxed">
            {stays.map((s) => (
              <li key={s.id}>
                {s.kind === "apartment" ? "Ap." : "Home"} {s.name}: {s.cir}
              </li>
            ))}
          </ul>
        </div>
        <div className="md:text-right">
          <p>{d.footer.rights}</p>
          <p className="mt-2 text-xs">© {new Date().getFullYear()} Villa Idro</p>
        </div>
      </div>
    </footer>
  );
}
