"use client";

import { reviews, reviewsHeading } from "@/content/reviews";
import { type Lang } from "@/content/site-data";
import { SectionHead } from "./ui";
import { Reveal } from "./reveal";

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <span className="text-[#e0a53c] text-sm tracking-tight" aria-label={`${rating} / 5`}>
      {"★".repeat(full)}
      {half ? "½" : ""}
      <span className="text-[#d8cdb6]">{"★".repeat(5 - full - (half ? 1 : 0))}</span>
    </span>
  );
}

export function Reviews({ lang }: { lang: Lang }) {
  // По протоколу честности: без реальных отзывов секция не рендерится (никаких фейков).
  if (reviews.length === 0) return null;
  const h = reviewsHeading[lang] ?? reviewsHeading.en;

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <Reveal>
          <SectionHead title={h.title} sub={h.sub} />
        </Reveal>
        <Reveal stagger=".review-card" className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <figure
              key={i}
              className="review-card rounded-2xl border border-[#eee7d8] bg-[#f7f4ee] p-6 flex flex-col"
            >
              <Stars rating={r.rating} />
              <blockquote className="mt-3 text-[#4a5e5c] leading-relaxed grow">“{r.text}”</blockquote>
              <figcaption className="mt-5 flex items-center justify-between gap-3">
                <span>
                  <span className="block font-semibold text-[#16343c]">{r.name}</span>
                  <span className="block text-sm text-[#8a978f]">{r.country}</span>
                </span>
                {r.source ? (
                  <a
                    href={r.source}
                    target="_blank"
                    rel="noopener"
                    className="text-xs text-[#1d7f5f] hover:underline shrink-0"
                  >
                    {r.sourceLabel ?? "Verified"} ↗
                  </a>
                ) : (
                  <span className="text-xs text-[#8a978f] shrink-0">{h.verified}</span>
                )}
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
