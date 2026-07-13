"use client";

import { gallery, type Lang } from "@/content/site-data";
import { ZoomParallax } from "@/components/ui/zoom-parallax";

const heading: Record<Lang, { title: string; sub: string }> = {
  en: { title: "Feel the place before you arrive", sub: "Scroll — the villa unfolds around you" },
  de: { title: "Spüren Sie den Ort, bevor Sie ankommen", sub: "Scrollen — die Villa entfaltet sich um Sie" },
  ru: { title: "Почувствуйте место ещё до приезда", sub: "Листайте — вилла раскрывается вокруг вас" },
};

export function ZoomGallery({ lang }: { lang: Lang }) {
  const h = heading[lang];
  const images = [
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
      <div className="relative z-10 flex h-[55vh] flex-col items-center justify-center px-5 text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/3 h-[90vmin] w-[90vmin] -translate-x-1/2 rounded-full opacity-40"
          style={{ background: "radial-gradient(ellipse at center, rgba(255,217,174,0.18), transparent 55%)" }}
        />
        <p className="relative text-sm uppercase tracking-[0.22em] text-[#e8c9a8]">{h.sub}</p>
        <h2 className="relative mt-4 max-w-2xl font-display text-4xl md:text-5xl leading-[1.08] text-[#f7f4ee]">
          {h.title}
        </h2>
      </div>
      <ZoomParallax images={images} />
    </section>
  );
}
