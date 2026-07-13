// РЕАЛЬНЫЕ отзывы гостей. НЕ выдумывать — только настоящие (с Booking/Airbnb/Google/переписки).
// Формат: имя, страна/город, оценка (4.0–5.0, реалистично — не все 5.0), текст на языке оригинала, ссылка на источник (если есть).
export type Review = {
  name: string;
  country: string;
  rating: number; // 4.0 .. 5.0
  text: string;
  source?: string; // ссылка на отзыв (Booking/Airbnb/Google) — усиливает доверие
  sourceLabel?: string; // "Booking.com" / "Airbnb" / "Google"
};

// Пусто по умолчанию → секция не показывается, пока владелец не даст настоящие отзывы.
export const reviews: Review[] = [];

export const reviewsHeading: Record<string, { title: string; sub: string; verified: string }> = {
  en: { title: "What our guests say", sub: "Real reviews from families who stayed with us.", verified: "Verified guest" },
  it: { title: "Cosa dicono i nostri ospiti", sub: "Recensioni reali di famiglie che sono state da noi.", verified: "Ospite verificato" },
  de: { title: "Was unsere Gäste sagen", sub: "Echte Bewertungen von Familien, die bei uns waren.", verified: "Verifizierter Gast" },
  ru: { title: "Что говорят наши гости", sub: "Настоящие отзывы семей, которые у нас отдыхали.", verified: "Проверенный гость" },
};
