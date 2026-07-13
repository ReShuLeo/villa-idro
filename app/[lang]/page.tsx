import type { Metadata } from "next";
import { Landing } from "@/components/site/landing";
import type { Lang } from "@/content/site-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ lang: "de" }, { lang: "ru" }];
}

const meta: Record<string, { title: string; description: string }> = {
  de: {
    title: "Villa Idro — Ferienwohnungen & Ferienhäuser direkt am Idrosee, Italien",
    description:
      "Private Familienvilla 50 m vom Strand des Idrosees: 8 Ferienwohnungen und 4 Häuser mit Pool. Direkt vom Eigentümer buchen — ohne Gebühren.",
  },
  ru: {
    title: "Villa Idro — апартаменты и дома на озере Идро, Италия",
    description:
      "Частная семейная вилла в 50 метрах от пляжей озера Идро: 8 апартаментов и 4 дома с бассейном. Бронь напрямую у хозяев — без комиссий.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return meta[lang] ?? {};
}

export default async function LangPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return <Landing lang={lang as Lang} />;
}
