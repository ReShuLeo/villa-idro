"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { contact, type Lang } from "@/content/site-data";
import { WaIcon } from "./ui";

export function openQuiz() {
  window.dispatchEvent(new Event("villa-open-quiz"));
}

export function quizLabel(lang: Lang) {
  return qt[lang].startTitle;
}
export function quizBadge(lang: Lang) {
  return qt[lang].badge;
}

type Opt = { key: string; label: string; emoji: string };
type Q = { q: string; opts: Opt[] };
type QT = {
  badge: string;
  startTitle: string;
  startSub: string;
  start: string;
  questions: Q[];
  progress: (a: number, b: number) => string;
  back: string;
  nameLabel: string;
  namePlaceholder: string;
  resultTitle: string;
  resultSub: string;
  send: string;
  tg: string;
  build: (parts: string[], name: string) => string;
};

const qt: Record<Lang, QT> = {
  en: {
    badge: "30-second match",
    startTitle: "Find your perfect stay",
    startSub: "Answer 4 quick questions — we'll send your options and the exact price to WhatsApp.",
    start: "Start — it's free",
    questions: [
      { q: "Who's coming?", opts: [
        { key: "couple", label: "A couple", emoji: "💑" },
        { key: "family", label: "Family with kids", emoji: "👨‍👩‍👧" },
        { key: "friends", label: "Group of friends", emoji: "🥂" },
        { key: "two-families", label: "Two families", emoji: "👨‍👩‍👧‍👦" },
      ] },
      { q: "Apartment or a whole home?", opts: [
        { key: "apartment", label: "Apartment (4–5)", emoji: "🛏️" },
        { key: "home", label: "Whole home (up to 8)", emoji: "🏡" },
        { key: "help", label: "Help me choose", emoji: "🤝" },
      ] },
      { q: "When would you come?", opts: [
        { key: "june", label: "June", emoji: "🌤️" },
        { key: "july", label: "July", emoji: "☀️" },
        { key: "august", label: "August", emoji: "🏖️" },
        { key: "sept-other", label: "September / other", emoji: "🍂" },
      ] },
      { q: "How many nights?", opts: [
        { key: "2-3", label: "2–3 nights", emoji: "🌙" },
        { key: "4-6", label: "4–6 nights", emoji: "📆" },
        { key: "7+", label: "A week or more", emoji: "🗓️" },
      ] },
    ],
    progress: (a, b) => `Question ${a} of ${b}`,
    back: "Back",
    nameLabel: "Your name (optional)",
    namePlaceholder: "Name",
    resultTitle: "Your stay is ready 🎉",
    resultSub: "Send it to Valery & Vita — they reply with availability and the exact price, usually within hours.",
    send: "Get my price on WhatsApp",
    tg: "Or send on Telegram",
    build: (p, name) =>
      `Hello Valery & Vita! I'd like to book Villa Idro.\n${name ? `Name: ${name}\n` : ""}${p.join("\n")}\nPlease send availability and the exact price 🙏`,
  },
  it: {
    badge: "Match in 30 secondi",
    startTitle: "Trova il tuo alloggio ideale",
    startSub: "Rispondi a 4 domande veloci — inviamo le opzioni e il prezzo esatto su WhatsApp.",
    start: "Inizia — è gratis",
    questions: [
      { q: "Chi viene?", opts: [
        { key: "couple", label: "Una coppia", emoji: "💑" },
        { key: "family", label: "Famiglia con bambini", emoji: "👨‍👩‍👧" },
        { key: "friends", label: "Gruppo di amici", emoji: "🥂" },
        { key: "two-families", label: "Due famiglie", emoji: "👨‍👩‍👧‍👦" },
      ] },
      { q: "Appartamento o casa intera?", opts: [
        { key: "apartment", label: "Appartamento (4–5)", emoji: "🛏️" },
        { key: "home", label: "Casa intera (fino a 8)", emoji: "🏡" },
        { key: "help", label: "Aiutami a scegliere", emoji: "🤝" },
      ] },
      { q: "Quando verresti?", opts: [
        { key: "june", label: "Giugno", emoji: "🌤️" },
        { key: "july", label: "Luglio", emoji: "☀️" },
        { key: "august", label: "Agosto", emoji: "🏖️" },
        { key: "sept-other", label: "Settembre / altro", emoji: "🍂" },
      ] },
      { q: "Quante notti?", opts: [
        { key: "2-3", label: "2–3 notti", emoji: "🌙" },
        { key: "4-6", label: "4–6 notti", emoji: "📆" },
        { key: "7+", label: "Una settimana o più", emoji: "🗓️" },
      ] },
    ],
    progress: (a, b) => `Domanda ${a} di ${b}`,
    back: "Indietro",
    nameLabel: "Il tuo nome (facoltativo)",
    namePlaceholder: "Nome",
    resultTitle: "Il tuo alloggio è pronto 🎉",
    resultSub: "Invialo a Valery e Vita — rispondono con disponibilità e prezzo esatto, di solito entro poche ore.",
    send: "Ricevi il prezzo su WhatsApp",
    tg: "Oppure invia su Telegram",
    build: (p, name) =>
      `Buongiorno Valery e Vita! Vorrei prenotare a Villa Idro.\n${name ? `Nome: ${name}\n` : ""}${p.join("\n")}\nInviatemi disponibilità e prezzo esatto 🙏`,
  },
  de: {
    badge: "In 30 Sekunden",
    startTitle: "Finden Sie Ihre perfekte Unterkunft",
    startSub: "4 kurze Fragen — wir senden Ihre Optionen und den genauen Preis per WhatsApp.",
    start: "Los geht's — kostenlos",
    questions: [
      { q: "Wer kommt?", opts: [
        { key: "couple", label: "Ein Paar", emoji: "💑" },
        { key: "family", label: "Familie mit Kindern", emoji: "👨‍👩‍👧" },
        { key: "friends", label: "Freundesgruppe", emoji: "🥂" },
        { key: "two-families", label: "Zwei Familien", emoji: "👨‍👩‍👧‍👦" },
      ] },
      { q: "Wohnung oder ganzes Haus?", opts: [
        { key: "apartment", label: "Wohnung (4–5)", emoji: "🛏️" },
        { key: "home", label: "Ganzes Haus (bis 8)", emoji: "🏡" },
        { key: "help", label: "Helft mir zu wählen", emoji: "🤝" },
      ] },
      { q: "Wann möchten Sie kommen?", opts: [
        { key: "june", label: "Juni", emoji: "🌤️" },
        { key: "july", label: "Juli", emoji: "☀️" },
        { key: "august", label: "August", emoji: "🏖️" },
        { key: "sept-other", label: "September / andere", emoji: "🍂" },
      ] },
      { q: "Wie viele Nächte?", opts: [
        { key: "2-3", label: "2–3 Nächte", emoji: "🌙" },
        { key: "4-6", label: "4–6 Nächte", emoji: "📆" },
        { key: "7+", label: "Eine Woche oder mehr", emoji: "🗓️" },
      ] },
    ],
    progress: (a, b) => `Frage ${a} von ${b}`,
    back: "Zurück",
    nameLabel: "Ihr Name (optional)",
    namePlaceholder: "Name",
    resultTitle: "Ihre Unterkunft ist bereit 🎉",
    resultSub: "Senden Sie es an Valery & Vita — sie antworten mit Verfügbarkeit und genauem Preis, meist innerhalb von Stunden.",
    send: "Preis per WhatsApp erhalten",
    tg: "Oder per Telegram senden",
    build: (p, name) =>
      `Hallo Valery & Vita! Ich möchte in der Villa Idro buchen.\n${name ? `Name: ${name}\n` : ""}${p.join("\n")}\nBitte senden Sie Verfügbarkeit und genauen Preis 🙏`,
  },
  ru: {
    badge: "Подбор за 30 секунд",
    startTitle: "Подберите идеальный вариант",
    startSub: "Ответьте на 4 быстрых вопроса — пришлём варианты и точную цену в WhatsApp.",
    start: "Начать — это бесплатно",
    questions: [
      { q: "Кто едет?", opts: [
        { key: "couple", label: "Пара", emoji: "💑" },
        { key: "family", label: "Семья с детьми", emoji: "👨‍👩‍👧" },
        { key: "friends", label: "Компания друзей", emoji: "🥂" },
        { key: "two-families", label: "Две семьи", emoji: "👨‍👩‍👧‍👦" },
      ] },
      { q: "Апартамент или целый дом?", opts: [
        { key: "apartment", label: "Апартамент (4–5)", emoji: "🛏️" },
        { key: "home", label: "Целый дом (до 8)", emoji: "🏡" },
        { key: "help", label: "Помогите выбрать", emoji: "🤝" },
      ] },
      { q: "Когда планируете?", opts: [
        { key: "june", label: "Июнь", emoji: "🌤️" },
        { key: "july", label: "Июль", emoji: "☀️" },
        { key: "august", label: "Август", emoji: "🏖️" },
        { key: "sept-other", label: "Сентябрь / другое", emoji: "🍂" },
      ] },
      { q: "Сколько ночей?", opts: [
        { key: "2-3", label: "2–3 ночи", emoji: "🌙" },
        { key: "4-6", label: "4–6 ночей", emoji: "📆" },
        { key: "7+", label: "Неделя и больше", emoji: "🗓️" },
      ] },
    ],
    progress: (a, b) => `Вопрос ${a} из ${b}`,
    back: "Назад",
    nameLabel: "Ваше имя (необязательно)",
    namePlaceholder: "Имя",
    resultTitle: "Ваш вариант готов 🎉",
    resultSub: "Отправьте Валерию и Вите — они ответят со свободными датами и точной ценой, обычно за пару часов.",
    send: "Узнать цену в WhatsApp",
    tg: "Или написать в Telegram",
    build: (p, name) =>
      `Здравствуйте, Валерий и Вита! Хочу забронировать Villa Idro.\n${name ? `Имя: ${name}\n` : ""}${p.join("\n")}\nПришлите, пожалуйста, свободные даты и точную цену 🙏`,
  },
};

export function QuizProvider({ lang }: { lang: Lang }) {
  const d = qt[lang];
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(-1); // -1 start, 0..n questions, n result
  const [answers, setAnswers] = useState<Record<number, Opt>>({});
  const [name, setName] = useState("");
  const total = d.questions.length;

  useEffect(() => {
    const h = () => {
      setStep(-1);
      setAnswers({});
      setName("");
      setOpen(true);
    };
    window.addEventListener("villa-open-quiz", h);
    return () => window.removeEventListener("villa-open-quiz", h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const pick = (opt: Opt) => {
    const next = { ...answers, [step]: opt };
    setAnswers(next);
    setTimeout(() => setStep(step + 1), 180);
  };

  const parts = d.questions.map((q, i) => `• ${q.q} ${answers[i]?.label ?? "—"}`);
  const message = d.build(parts, name.trim());
  const progressPct = step < 0 ? 0 : ((Math.min(step, total)) / total) * 100;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[75] bg-[#0d2227]/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.94, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 10 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-[#f7f4ee] rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="h-1.5 bg-[#e4ddcd]">
              <motion.div
                className="h-full bg-[#1d7f5f]"
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.35 }}
              />
            </div>

            <div className="p-6 md:p-8">
              <div className="flex justify-between items-center mb-5">
                <span className="text-xs uppercase tracking-[0.18em] text-[#1d7f5f] font-semibold">{d.badge}</span>
                <button onClick={() => setOpen(false)} aria-label="Close" className="text-2xl leading-none text-[#6b7d7a] hover:text-[#16343c]">
                  ×
                </button>
              </div>

              <AnimatePresence mode="wait">
                {step === -1 && (
                  <motion.div key="start" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
                    <h3 className="font-display text-3xl text-[#16343c]">{d.startTitle}</h3>
                    <p className="mt-3 text-[#4a5e5c] leading-relaxed">{d.startSub}</p>
                    <button
                      onClick={() => setStep(0)}
                      className="mt-6 w-full cta-pulse rounded-full bg-[#1d7f5f] text-white font-semibold py-4 min-h-[52px]"
                    >
                      {d.start}
                    </button>
                  </motion.div>
                )}

                {step >= 0 && step < total && (
                  <motion.div key={`q${step}`} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
                    <p className="text-sm text-[#8a978f] mb-1">{d.progress(step + 1, total)}</p>
                    <h3 className="font-display text-2xl text-[#16343c] mb-5">{d.questions[step].q}</h3>
                    <div className="grid gap-2.5">
                      {d.questions[step].opts.map((o) => (
                        <button
                          key={o.key}
                          onClick={() => pick(o)}
                          className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-colors min-h-[52px] ${
                            answers[step]?.key === o.key
                              ? "border-[#1d7f5f] bg-[#1d7f5f]/8"
                              : "border-[#e0d8c6] bg-white hover:border-[#1d7f5f]"
                          }`}
                        >
                          <span className="text-xl">{o.emoji}</span>
                          <span className="text-[#16343c] font-medium">{o.label}</span>
                        </button>
                      ))}
                    </div>
                    {step > 0 && (
                      <button onClick={() => setStep(step - 1)} className="mt-4 text-sm text-[#6b7d7a] hover:text-[#16343c]">
                        ← {d.back}
                      </button>
                    )}
                  </motion.div>
                )}

                {step >= total && (
                  <motion.div key="result" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
                    <h3 className="font-display text-3xl text-[#16343c]">{d.resultTitle}</h3>
                    <p className="mt-2 text-[#4a5e5c] leading-relaxed">{d.resultSub}</p>

                    <div className="mt-4 rounded-xl bg-white border border-[#e0d8c6] p-4 text-sm text-[#4a5e5c] space-y-1">
                      {d.questions.map((q, i) => (
                        <div key={i} className="flex justify-between gap-3">
                          <span className="text-[#8a978f]">{q.q}</span>
                          <span className="font-medium text-[#16343c]">{answers[i]?.emoji} {answers[i]?.label ?? "—"}</span>
                        </div>
                      ))}
                    </div>

                    <label className="block mt-4 text-sm text-[#6b7d7a]">
                      {d.nameLabel}
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={d.namePlaceholder}
                        className="mt-1 w-full rounded-lg border border-[#e0d8c6] bg-white px-3 py-2.5 text-[#16343c] outline-none focus:border-[#1d7f5f]"
                      />
                    </label>

                    <a
                      href={contact.wa(message)}
                      target="_blank"
                      rel="noopener"
                      className="mt-5 w-full inline-flex items-center justify-center gap-2 cta-pulse rounded-full bg-[#1d7f5f] text-white font-semibold py-4 min-h-[52px]"
                    >
                      <WaIcon /> {d.send}
                    </a>
                    <a
                      href={contact.tg()}
                      target="_blank"
                      rel="noopener"
                      className="mt-2 w-full inline-flex items-center justify-center text-[#16343c] font-medium py-3"
                    >
                      {d.tg}
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
