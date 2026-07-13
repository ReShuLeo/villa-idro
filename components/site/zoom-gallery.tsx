"use client";

import { useRef, useState } from "react";
import { gallery, type Lang } from "@/content/site-data";
import { ZoomParallax } from "@/components/ui/zoom-parallax";

const heading: Record<Lang, { title: string; sub: string; subMobile: string }> = {
  en: { title: "Feel the place before you arrive", sub: "Scroll — the villa unfolds around you", subMobile: "Swipe through the villa" },
  it: { title: "Senti il luogo prima di arrivare", sub: "Scorri — la villa si apre intorno a te", subMobile: "Scorri le foto della villa" },
  de: { title: "Spüren Sie den Ort, bevor Sie ankommen", sub: "Scrollen — die Villa entfaltet sich um Sie", subMobile: "Wischen Sie durch die Villa" },
  ru: { title: "Почувствуйте место ещё до приезда", sub: "Листайте — вилла раскрывается вокруг вас", subMobile: "Листайте фото виллы пальцем" },
};

type Img = { src: string; alt?: string };

/** Мобильная логичная свайп-карусель: палец листает, точки + счётчик. */
function MobileGallery({ images, sub }: { images: Img[]; sub: string }) {
  const scroller = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const onScroll = () => {
    const el = scroller.current;
    if (!el) return;
    const n = Math.round(el.scrollLeft / el.clientWidth);
    if (n !== i) setI(n);
  };
  return (
    <div className="md:hidden px-5 pb-16">
      <p className="text-center text-xs uppercase tracking-[0.2em] text-[#e8c9a8]">{sub}</p>
      <div className="relative mt-4">
        <div
          ref={scroller}
          onScroll={onScroll}
          className="flex overflow-x-auto snap-x snap-mandatory rounded-2xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((im, n) => (
            <div key={n} className="relative shrink-0 w-full snap-center aspect-[4/5]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={im.src}
                alt={im.alt || `Villa Idro ${n + 1}`}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
        <span className="absolute top-3 right-3 rounded-full bg-black/45 text-white text-xs px-2.5 py-1 pointer-events-none">
          {i + 1}/{images.length}
        </span>
      </div>
      <div className="mt-3 flex justify-center gap-1.5">
        {images.map((_, n) => (
          <span
            key={n}
            className={`h-1.5 rounded-full transition-all ${n === i ? "w-5 bg-[#ffd9ae]" : "w-1.5 bg-white/30"}`}
          />
        ))}
      </div>
    </div>
  );
}

export function ZoomGallery({ lang }: { lang: Lang }) {
  const h = heading[lang];
  const images: Img[] = [
    { src: gallery.hero, alt: "Villa Idro panorama" },
    { src: gallery.pool[1], alt: "Pool with mountain views" },
    { src: gallery.beaches[0], alt: "Wild beach of Lake Idro" },
    { src: gallery.pool[0], alt: "Villa pool" },
    { src: gallery.beaches[1], alt: "Public beach" },
    { src: gallery.park[0], alt: "Alpine trails" },
    { src: gallery.sport[0], alt: "Windsurfing on Lake Idro" },
  ];

  return (
    <section className="relative bg-[#0d2227]">
      {/* заголовок: на мобильном компактный, на десктопе — во весь экран перед zoom-эффектом */}
      <div className="relative z-10 flex flex-col items-center justify-center px-5 pt-16 pb-4 text-center md:h-[55vh] md:pt-0 md:pb-0">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/3 h-[90vmin] w-[90vmin] -translate-x-1/2 rounded-full opacity-40"
          style={{ background: "radial-gradient(ellipse at center, rgba(255,217,174,0.18), transparent 55%)" }}
        />
        <p className="relative hidden md:block text-sm uppercase tracking-[0.22em] text-[#e8c9a8]">{h.sub}</p>
        <h2 className="relative mt-4 max-w-2xl font-display text-3xl md:text-5xl leading-[1.08] text-[#f7f4ee]">
          {h.title}
        </h2>
      </div>

      {/* МОБИЛЬНЫЙ: понятная свайп-карусель (все фото листаются пальцем) */}
      <MobileGallery images={images} sub={h.subMobile} />

      {/* ДЕСКТОП: кинематографичный zoom-parallax при прокрутке колесом */}
      <div className="hidden md:block">
        <ZoomParallax images={images} />
      </div>
    </section>
  );
}
