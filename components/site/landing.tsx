import { t, type Lang } from "@/content/site-data";
import { Header, StickyBar } from "./header";
import { Hero } from "./hero";
import { Stays } from "./stays";
import { Marquee, ScrollProgress } from "./effects";
import { Cursor, Grain } from "./atmosphere";
import { ZoomGallery } from "./zoom-gallery";
import { QuizProvider } from "./quiz";
import {
  Faq,
  FinalCta,
  Footer,
  Hosts,
  HowItWorks,
  Lake,
  TrustBar,
  Villa,
} from "./sections";

export function Landing({ lang }: { lang: Lang }) {
  const d = t[lang];
  const marquee = [d.hero.chips[0], ...d.villa.items.map((i) => i.title)];
  return (
    <div className="pb-16 md:pb-0">
      <Grain />
      <Cursor />
      <ScrollProgress />
      <Header lang={lang} />
      <main>
        <Hero lang={lang} />
        <TrustBar lang={lang} />
        <Stays lang={lang} />
        <Marquee items={marquee} />
        <Villa lang={lang} />
        <ZoomGallery lang={lang} />
        <Lake lang={lang} />
        <Hosts lang={lang} />
        <HowItWorks lang={lang} />
        <Faq lang={lang} />
        <FinalCta lang={lang} />
      </main>
      <Footer lang={lang} />
      <StickyBar lang={lang} />
      <QuizProvider lang={lang} />
    </div>
  );
}
