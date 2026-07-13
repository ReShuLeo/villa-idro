"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { gallery, type Lang } from "@/content/site-data";

const heading: Record<Lang, { title: string; sub: string; subMobile: string }> = {
  en: { title: "Feel the place before you arrive", sub: "Tap any photo to open it full-screen", subMobile: "Swipe through — tap to enlarge" },
  it: { title: "Senti il luogo prima di arrivare", sub: "Tocca una foto per aprirla a schermo intero", subMobile: "Scorri — tocca per ingrandire" },
  de: { title: "Spüren Sie den Ort, bevor Sie ankommen", sub: "Tippen Sie auf ein Foto für die Vollbildansicht", subMobile: "Wischen — zum Vergrößern tippen" },
  ru: { title: "Почувствуйте место ещё до приезда", sub: "Нажмите на любое фото — откроется на весь экран", subMobile: "Листайте пальцем — нажмите, чтобы увеличить" },
};

type Img = { src: string; alt?: string };

/** Полноэкранный просмотр: стрелки, свайп пальцем, клавиши, счётчик. Скролл страницы не блокируется. */
function GalleryLightbox({
  images,
  index,
  setIndex,
  onClose,
}: {
  images: Img[];
  index: number;
  setIndex: (v: number | ((p: number | null) => number | null)) => void;
  onClose: () => void;
}) {
  const n = images.length;
  const go = (d: number) => setIndex((p) => ((p ?? 0) + d + n) % n);
  const touchX = useRef(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((p) => ((p ?? 0) + 1) % n);
      if (e.key === "ArrowLeft") setIndex((p) => ((p ?? 0) - 1 + n) % n);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [n, onClose, setIndex]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[70] flex flex-col bg-[#0d2227]/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="flex items-center justify-end px-5 py-4 text-[#f7f4ee]">
        <span className="mr-auto text-sm text-[#9db3ae]">{index + 1} / {n}</span>
        <button onClick={onClose} aria-label="Close" className="px-2 text-3xl leading-none hover:text-[#ffd9ae]">
          ×
        </button>
      </div>

      <div
        className="relative flex flex-1 items-center justify-center px-4 pb-6"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (dx > 40) go(-1);
          else if (dx < -40) go(1);
        }}
      >
        <button
          onClick={() => go(-1)}
          aria-label="Previous"
          className="absolute left-3 z-10 h-11 w-11 rounded-full border border-white/20 bg-white/10 text-2xl text-white hover:bg-white/20 md:left-8"
        >
          ‹
        </button>
        {/* простое переключение по индексу (без AnimatePresence): картинка всегда обновляется */}
        <motion.img
          key={index}
          initial={{ opacity: 0.35 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          src={images[index].src}
          alt={images[index].alt || `Villa Idro ${index + 1}`}
          className="max-h-[80vh] max-w-[92vw] rounded-lg object-contain"
        />
        <button
          onClick={() => go(1)}
          aria-label="Next"
          className="absolute right-3 z-10 h-11 w-11 rounded-full border border-white/20 bg-white/10 text-2xl text-white hover:bg-white/20 md:right-8"
        >
          ›
        </button>
      </div>
    </motion.div>
  );
}

/** Мобильная свайп-карусель: палец листает, точки + счётчик, тап открывает фото на весь экран. */
function MobileGallery({ images, sub, onOpen }: { images: Img[]; sub: string; onOpen: (i: number) => void }) {
  const scroller = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const onScroll = () => {
    const el = scroller.current;
    if (!el) return;
    const nn = Math.round(el.scrollLeft / el.clientWidth);
    if (nn !== i) setI(nn);
  };
  return (
    <div className="md:hidden">
      <p className="text-center text-xs uppercase tracking-[0.2em] text-[#e8c9a8]">{sub}</p>
      <div className="relative mt-4">
        <div
          ref={scroller}
          onScroll={onScroll}
          className="flex overflow-x-auto snap-x snap-mandatory rounded-2xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((im, n) => (
            <button
              key={n}
              onClick={() => onOpen(n)}
              className="relative aspect-[4/5] w-full shrink-0 snap-center cursor-zoom-in"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={im.src}
                alt={im.alt || `Villa Idro ${n + 1}`}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
        <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/45 px-2.5 py-1 text-xs text-white">
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
  // ровно 6 кадров — чистая сетка без пустых мест (2 колонки × 3 ряда / 3 колонки × 2 ряда)
  const images: Img[] = [
    { src: gallery.hero, alt: "Villa Idro panorama" },
    { src: gallery.beaches[0], alt: "Wild beach of Lake Idro" },
    { src: gallery.pool[0], alt: "Villa pool" },
    { src: gallery.beaches[1], alt: "Public beach" },
    { src: gallery.park[0], alt: "Alpine trails" },
    { src: gallery.sport[0], alt: "Windsurfing on Lake Idro" },
  ];
  const [lb, setLb] = useState<number | null>(null);

  return (
    <section id="gallery" className="relative bg-[#0d2227] py-16 md:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-24 h-[70vmin] w-[70vmin] -translate-x-1/2 rounded-full opacity-40"
        style={{ background: "radial-gradient(ellipse at center, rgba(255,217,174,0.16), transparent 60%)" }}
      />
      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <div className="text-center">
          <h2 className="mx-auto max-w-2xl font-display text-3xl leading-[1.1] text-[#f7f4ee] md:text-5xl">
            {h.title}
          </h2>
          <p className="mt-3 text-sm uppercase tracking-[0.18em] text-[#e8c9a8] hidden md:block">{h.sub}</p>
        </div>

        {/* МОБИЛЬНЫЙ: свайп-карусель */}
        <div className="mt-8">
          <MobileGallery images={images} sub={h.subMobile} onOpen={(i) => setLb(i)} />
        </div>

        {/* ДЕСКТОП: РОВНАЯ сетка одинаковых плиток (aspect 4:3, object-cover) — без пустых мест справа.
            Клик по фото — полноэкранный просмотр. Скролл не блокируется. */}
        <div className="mt-10 hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
          {images.map((im, i) => (
            <button
              key={i}
              onClick={() => setLb(i)}
              className="group relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-xl shadow-[0_16px_40px_-24px_rgba(0,0,0,0.7)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={im.src}
                alt={im.alt || `Villa Idro ${i + 1}`}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>

      {lb !== null && (
        <GalleryLightbox images={images} index={lb} setIndex={setLb} onClose={() => setLb(null)} />
      )}
    </section>
  );
}
