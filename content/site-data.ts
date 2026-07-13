export type Lang = "en" | "de" | "ru" | "it";
export const langs: Lang[] = ["en", "it", "de", "ru"];

/** базовый путь для GitHub Pages preview; при кастомном домене пуст */
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const contact = {
  whatsappNumber: "393924447775",
  telegramUser: "valeryandvita",
  phoneDisplay: "+39 392 444 77 75",
  wa(msg: string) {
    return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  },
  tg() {
    return `https://t.me/${this.telegramUser}`;
  },
};

export type Stay = {
  id: string;
  kind: "apartment" | "home";
  name: string;
  sleeps: number;
  size: number;
  cir: string;
  balcony: boolean;
  photos: string[];
  sharedPhotos?: boolean;
};

const p = (path: string) => `${BASE}${path}`;
/**
 * Явный порядок кадров: [бассейн (превью), спальня, гостиная/просторные, столовая, кухня, санузел, коридор].
 * Кухню/ванную/коридор — в конец. Файлы уникальны на каждый объект (GPT Image 2).
 */
const enh = (id: string, order: number[]) =>
  order.map((i) => p(`/photos/enhanced/enh-${id}-${i}.jpg`));

export const stays: Stay[] = [
  { id: "ap-a", kind: "apartment", name: "A", sleeps: 5, size: 40, cir: "IT017082B4RR7F5FY4", balcony: false, photos: enh("ap-a", [0, 5, 1, 4, 2, 3, 6, 7]) },
  { id: "ap-b", kind: "apartment", name: "B", sleeps: 4, size: 36, cir: "IT017082B4W885KLNP", balcony: true, photos: enh("ap-b", [0, 4, 3, 1, 2, 5]) },
  { id: "ap-c", kind: "apartment", name: "C", sleeps: 4, size: 38, cir: "IT017082B4L7OOHQCW", balcony: true, photos: enh("ap-c", [0, 4, 1, 3, 2, 5]) },
  { id: "ap-d", kind: "apartment", name: "D", sleeps: 4, size: 40, cir: "IT017082B4KAFC4UWN", balcony: true, photos: enh("ap-d", [0, 4, 1, 2, 3, 5]) },
  { id: "ap-e", kind: "apartment", name: "E", sleeps: 5, size: 40, cir: "IT017082B4OZIUOF4X", balcony: true, photos: enh("ap-e", [0, 4, 3, 1, 2, 5]) },
  { id: "ap-f", kind: "apartment", name: "F", sleeps: 4, size: 38, cir: "IT017082B4JR98TNTM", balcony: true, photos: enh("ap-f", [0, 5, 4, 2, 3, 6, 7, 1]) },
  { id: "ap-g", kind: "apartment", name: "G", sleeps: 5, size: 40, cir: "IT017082B4HRPIXZ5H", balcony: true, photos: enh("ap-g", [0, 5, 2, 4, 3, 6, 7, 1]) },
  { id: "ap-h", kind: "apartment", name: "H", sleeps: 5, size: 40, cir: "IT017082B4T52CHCUL", balcony: true, photos: enh("ap-h", [0, 5, 2, 3, 4, 6, 7, 1]) },
  { id: "hm-a", kind: "home", name: "A", sleeps: 8, size: 80, cir: "017082-LIM-00003", balcony: true, photos: enh("hm-a", [0, 4, 3, 6, 7, 1, 2, 5]) },
  { id: "hm-b", kind: "home", name: "B", sleeps: 8, size: 80, cir: "017082-LIM-00005", balcony: true, photos: enh("hm-b", [0, 4, 3, 5, 6, 7, 1, 2]) },
  { id: "hm-c", kind: "home", name: "C", sleeps: 8, size: 80, cir: "017082-LNI-00001", balcony: true, photos: enh("hm-c", [0, 4, 3, 6, 7, 1, 2, 5]) },
  { id: "hm-d", kind: "home", name: "D", sleeps: 8, size: 80, cir: "017082-CNI-00023", balcony: true, photos: enh("hm-d", [0, 4, 3, 5, 6, 7, 1, 2]) },
];

const e = (name: string) => p(`/photos/enhanced/${name}.jpg`);

/** аэрофото с ВЖЖЁННЫМ указателем «вилла → 50 m → пляж» (для hero и секции локации) */
export const heroAnnotated = e("villa-hero-annotated");

export const gallery = {
  hero: e("villa-panorama-hero"),
  pool: [e("villa-pool-1"), e("villa-pool-2"), e("enh-villa-pool-3"), e("enh-villa-pool-4")],
  beaches: [e("beach-wild"), e("beach-public"), e("enh-beach-volleyball"), e("enh-beach-bar")],
  park: [e("enh-park-alpine"), e("enh-park-river"), e("enh-park-tunnel")],
  sport: [e("enh-sport-windsurf"), e("enh-sport-kite"), e("enh-sport-climb")],
  travel: [
    p("/photos/villa-idro-lake-travel-venice-6-600.jpg"),
    p("/photos/villa-idro-lake-travel-milan-8-600.jpg"),
    p("/photos/villa-idro-lake-travel-gardaland-9-600.jpg"),
  ],
};

/** 6 фото удобств виллы (совпадают с порядком villa.items в словарях) */
export const villaImgs = [
  e("villa-pool-2"),
  e("grill-1"),
  e("playground-1"),
  e("enh-parking"),
  e("enh-storage"),
  e("enh-pingpong"),
];

/** 4 блока секции «Озеро» (совпадают с порядком lake.blocks) */
export const lakeImgs = [gallery.beaches.slice(0, 3), gallery.park, gallery.sport, gallery.travel];

type Dict = {
  langName: string;
  nav: { stays: string; villa: string; lake: string; faq: string; contact: string };
  hero: {
    eyebrow: string; h1a: string; h1b: string; sub: string;
    ctaMain: string; ctaDoubt: string; ctaSecondary: string;
    chips: string[];
    waMessage: string;
  };
  trust: { title: string; items: { n: string; label: string }[] };
  stays: {
    title: string; sub: string; tabApartments: string; tabHomes: string;
    sleeps: string; size: string; balcony: string; from: string; night: string;
    aptFrom: number; homeFrom: number;
    features: string; aptFeatures: string[]; homeFeatures: string[];
    cta: string; sharedNote: string; priceNote: string;
    waStay: (name: string) => string;
  };
  villa: { title: string; sub: string; items: { title: string; text: string; img: string }[] };
  lake: { title: string; sub: string; blocks: { title: string; text: string; imgs: string[] }[] };
  hosts: { title: string; text1: string; text2: string; sign: string };
  how: { title: string; steps: { title: string; text: string }[]; doubt: string };
  faq: { title: string; items: { q: string; a: string }[] };
  final: { title: string; sub: string; cta: string; tg: string; doubt: string };
  footer: { addr: string; cirTitle: string; rights: string; direct: string };
};

export const t: Record<Lang, Dict> = {
  en: {
    langName: "English",
    nav: { stays: "Apartments & homes", villa: "The villa", lake: "Lake & around", faq: "FAQ", contact: "Contact" },
    hero: {
      eyebrow: "Lake Idro · Vesta · Northern Italy",
      h1a: "Your Italian lake summer,",
      h1b: "50 metres from the water",
      sub: "A private family villa with a pool: 8 apartments and 4 holiday homes for 4–8 guests. You book directly with the owners — no platform fees, honest prices, personal care.",
      ctaMain: "Check dates on WhatsApp",
      ctaDoubt: "Valery & Vita reply personally — usually within a few hours",
      ctaSecondary: "See apartments & homes",
      chips: ["50 m to the beaches", "Private pool", "12 stays · 4–8 guests", "Registered stays (CIR)", "Direct from owners"],
      waMessage: "Hello Valery & Vita! I'd like to check available dates at Villa Idro.",
    },
    trust: {
      title: "Why families come back to Vesta",
      items: [
        { n: "50 m", label: "to two beaches of Lake Idro" },
        { n: "12", label: "stays: 8 apartments + 4 homes" },
        { n: "0 %", label: "booking fees — you pay the owners, not a platform" },
        { n: "100 %", label: "legal: every stay has an Italian CIR registration" },
      ],
    },
    stays: {
      title: "Choose your stay",
      sub: "Every apartment and home has its own kitchen, bathroom and access to the pool, BBQ and garden. Real photos — this is exactly what you get.",
      tabApartments: "Apartments · 4–5 guests",
      tabHomes: "Holiday homes · up to 8 guests",
      sleeps: "guests", size: "m²", balcony: "balcony", from: "from", night: "/ night",
      aptFrom: 69, homeFrom: 129,
      features: "What's inside",
      aptFeatures: ["1 bedroom + sofa bed", "Kitchen: gas hob, fridge, microwave, coffee machine", "Own bathroom", "Dishes, kettle, starter set included"],
      homeFeatures: ["3 bedrooms on 2 floors", "Full kitchen & living room", "Terrace and balcony", "Perfect for 2 families together"],
      cta: "Ask about this stay",
      sharedNote: "Same layout as the photos — every apartment in this line is furnished alike.",
      priceNote: "Final price depends on dates and number of guests. Tourist tax €1/person/night (Apr–Oct, 15+ y.o.). Ask for an exact quote — it takes one message.",
      waStay: (name: string) => `Hello! I'm interested in ${name} at Villa Idro. Could you tell me availability and price for my dates?`,
    },
    villa: {
      title: "One villa — everything your family needs",
      sub: "You don't rent just a room. You get the whole territory.",
      items: [
        { title: "Pool with mountain views", text: "Open May to September, sun loungers included. Kids' side is shallow.", img: "/photos/villa-pool-2-600.jpg" },
        { title: "BBQ & gazebo", text: "Grill dinner as the sun sets over the lake. Charcoal grill, big table, lights.", img: "/photos/villa-idro-lake-grill-1-600.jpg" },
        { title: "Children's playground", text: "Swings and slides on the territory — kids play, you actually rest.", img: "/photos/villa-idro-lake-childrens-playground-1-600.jpg" },
        { title: "Free private parking", text: "Gated parking inside the territory. Your car is 30 seconds from your door.", img: "/photos/villa-idro-lake-parking.jpg" },
        { title: "Storage for your gear", text: "Boats, SUP boards, bikes, mattresses — a dedicated storage room.", img: "/photos/villa-idro-lake-place-for-boats-mattresses-bicycles-600.jpg" },
        { title: "Ping-pong & laundry", text: "Table tennis for the evenings, washing machine for long stays.", img: "/photos/villa-idro-lake-ping-pong-table-600.jpg" },
      ],
    },
    lake: {
      title: "Lake Idro: the quiet Italian lake",
      sub: "No crowds of Garda, all the beauty of the Alps. Water warms to 24 °C in summer.",
      blocks: [
        { title: "Two beaches, 50 metres away", text: "A wild pebble beach and an equipped public one with a bar and volleyball — both a one-minute walk from the villa gate.", imgs: ["/photos/villa-idro-lake-beach-wild-600.jpg", "/photos/villa-idro-lake-beach-public-600.jpg", "/photos/villa-idro-lake-beach-bar-600.jpg"] },
        { title: "A natural park behind the house", text: "Alpine trails, a mineral water stream, WWI tunnels and deer at dawn — straight from the villa, no car needed.", imgs: ["/photos/villa-idro-lake-natural-park-alpine-trails-1-600.jpg", "/photos/villa-idro-lake-natural-park-mineral-water-river-2-600.jpg", "/photos/villa-idro-lake-natural-park-defense-tunnel-5-600.jpg"] },
        { title: "Sport on water and rock", text: "Windsurfing, kiting, diving, climbing, road cycling — Lake Idro is a quiet legend among active travellers.", imgs: ["/photos/villa-idro-lake-sport-windsurfing-yachting-4-600.jpg", "/photos/villa-idro-lake-sport-kiting-5-600.jpg", "/photos/villa-idro-lake-sport-climbing-3-600.jpg"] },
        { title: "Day trips that make the album", text: "Venice, Milan, Verona, Gardaland and the outlet village — all reachable as day trips by car.", imgs: ["/photos/villa-idro-lake-travel-venice-6-600.jpg", "/photos/villa-idro-lake-travel-milan-8-600.jpg", "/photos/villa-idro-lake-travel-gardaland-9-600.jpg"] },
      ],
    },
    hosts: {
      title: "You write directly to us",
      text1: "We are Valery and Vita — the family that owns and runs Villa Idro. No managers, no call centers: the person answering your message is the person who will hand you the keys.",
      text2: "We live here, we know where the water is warmest in June and which trail is fine for a stroller. Ask us anything — before and during your stay.",
      sign: "Valery & Vita, your hosts on Lake Idro",
    },
    how: {
      title: "Booking takes three messages",
      steps: [
        { title: "Write your dates", text: "WhatsApp or Telegram: dates + number of guests. That's all we need to start." },
        { title: "Get exact price & stay", text: "We confirm availability, suggest the best apartment or home for your group and give the final price. No hidden extras." },
        { title: "Arrive — we meet you", text: "We greet you at the villa, show everything around and stay in touch during your whole stay." },
      ],
      doubt: "No prepayment pressure: we hold your dates while you decide.",
    },
    faq: {
      title: "Questions families ask us",
      items: [
        { q: "Is it really cheaper than Booking or Airbnb?", a: "Yes. You pay no platform service fees (usually 10–18%). Our price is the owners' price — and you can always ask us for a better offer for long stays." },
        { q: "What's included in the price?", a: "Bed linen, towels, kitchen starter set (spices, coffee, dish soap), parking, pool, BBQ, playground and storage. Tourist tax €1/person/night (Apr–Oct) is paid on arrival." },
        { q: "Is the villa good for small kids?", a: "Very. Playground on site, shallow pool side, beaches without waves 50 m away, and the natural park for easy walks. Cots available on request." },
        { q: "How far is the beach really?", a: "50 metres — measured. You walk out of the gate and see the water. Two beaches: a wild one and an equipped one with a bar." },
        { q: "Can two or three families come together?", a: "That's our speciality. Book 2–4 apartments or homes next to each other — shared pool, shared BBQ evenings, separate kitchens and bathrooms." },
        { q: "How do I pay and can I cancel?", a: "We confirm everything in writing in the messenger, including the cancellation terms for your dates, before you pay anything. No hidden conditions." },
      ],
    },
    final: {
      title: "Summer dates on Lake Idro fill up first",
      sub: "Write today — get availability and an exact price within hours, with no obligation to book.",
      cta: "Check my dates on WhatsApp",
      tg: "Or write on Telegram",
      doubt: "Free cancellation terms confirmed in writing · No platform fees",
    },
    footer: {
      addr: "Villa Idro · Vesta, Lake Idro, Lombardy, Italy",
      cirTitle: "Italian tourist registrations (CIR)",
      rights: "Villa Idro — a private family villa. All photos are real and taken at the villa.",
      direct: "Direct booking: WhatsApp · Telegram",
    },
  },

  de: {
    langName: "Deutsch",
    nav: { stays: "Wohnungen & Häuser", villa: "Die Villa", lake: "See & Umgebung", faq: "FAQ", contact: "Kontakt" },
    hero: {
      eyebrow: "Idrosee · Vesta · Norditalien",
      h1a: "Ihr italienischer Sommer am See,",
      h1b: "50 Meter vom Wasser",
      sub: "Private Familienvilla mit Pool: 8 Ferienwohnungen und 4 Ferienhäuser für 4–8 Gäste. Sie buchen direkt bei den Eigentümern — ohne Plattformgebühren, mit ehrlichen Preisen.",
      ctaMain: "Termine per WhatsApp anfragen",
      ctaDoubt: "Valery & Vita antworten persönlich — meist innerhalb weniger Stunden",
      ctaSecondary: "Wohnungen & Häuser ansehen",
      chips: ["50 m zum Strand", "Eigener Pool", "12 Unterkünfte · 4–8 Gäste", "Registriert (CIR)", "Direkt vom Eigentümer"],
      waMessage: "Hallo Valery & Vita! Ich möchte freie Termine in der Villa Idro anfragen.",
    },
    trust: {
      title: "Warum Familien nach Vesta zurückkommen",
      items: [
        { n: "50 m", label: "zu zwei Stränden des Idrosees" },
        { n: "12", label: "Unterkünfte: 8 Wohnungen + 4 Häuser" },
        { n: "0 %", label: "Buchungsgebühren — Sie zahlen dem Eigentümer, nicht der Plattform" },
        { n: "100 %", label: "legal: jede Unterkunft hat eine italienische CIR-Registrierung" },
      ],
    },
    stays: {
      title: "Wählen Sie Ihre Unterkunft",
      sub: "Jede Wohnung und jedes Haus hat eigene Küche, Bad und Zugang zu Pool, Grill und Garten. Echte Fotos — genau das bekommen Sie.",
      tabApartments: "Wohnungen · 4–5 Gäste",
      tabHomes: "Ferienhäuser · bis 8 Gäste",
      sleeps: "Gäste", size: "m²", balcony: "Balkon", from: "ab", night: "/ Nacht",
      aptFrom: 69, homeFrom: 129,
      features: "Ausstattung",
      aptFeatures: ["1 Schlafzimmer + Schlafsofa", "Küche: Gasherd, Kühlschrank, Mikrowelle, Kaffeemaschine", "Eigenes Bad", "Geschirr, Wasserkocher, Starterset inklusive"],
      homeFeatures: ["3 Schlafzimmer auf 2 Etagen", "Volle Küche & Wohnzimmer", "Terrasse und Balkon", "Ideal für 2 Familien zusammen"],
      cta: "Diese Unterkunft anfragen",
      sharedNote: "Gleicher Grundriss wie auf den Fotos — alle Wohnungen dieser Linie sind gleich eingerichtet.",
      priceNote: "Endpreis abhängig von Terminen und Gästezahl. Kurtaxe 1 €/Person/Nacht (Apr–Okt, ab 15 J.). Fragen Sie nach dem genauen Angebot — eine Nachricht genügt.",
      waStay: (name: string) => `Hallo! Ich interessiere mich für ${name} in der Villa Idro. Können Sie mir Verfügbarkeit und Preis für meine Termine nennen?`,
    },
    villa: {
      title: "Eine Villa — alles, was Ihre Familie braucht",
      sub: "Sie mieten nicht nur ein Zimmer. Das ganze Gelände gehört Ihnen.",
      items: [
        { title: "Pool mit Bergblick", text: "Geöffnet Mai bis September, Liegen inklusive. Flacher Kinderbereich.", img: "/photos/villa-pool-2-600.jpg" },
        { title: "Grill & Pavillon", text: "Grillabende, während die Sonne über dem See untergeht. Holzkohlegrill, großer Tisch, Licht.", img: "/photos/villa-idro-lake-grill-1-600.jpg" },
        { title: "Kinderspielplatz", text: "Schaukeln und Rutschen auf dem Gelände — die Kinder spielen, Sie erholen sich wirklich.", img: "/photos/villa-idro-lake-childrens-playground-1-600.jpg" },
        { title: "Kostenloser Privatparkplatz", text: "Bewachter Parkplatz auf dem Gelände. Ihr Auto steht 30 Sekunden von der Tür.", img: "/photos/villa-idro-lake-parking.jpg" },
        { title: "Lager für Ihre Ausrüstung", text: "Boote, SUP-Boards, Fahrräder, Matratzen — ein eigener Lagerraum.", img: "/photos/villa-idro-lake-place-for-boats-mattresses-bicycles-600.jpg" },
        { title: "Tischtennis & Waschmaschine", text: "Tischtennis für die Abende, Waschmaschine für längere Aufenthalte.", img: "/photos/villa-idro-lake-ping-pong-table-600.jpg" },
      ],
    },
    lake: {
      title: "Idrosee: der stille italienische See",
      sub: "Ohne die Menschenmassen des Gardasees, mit der ganzen Schönheit der Alpen. Wasser bis 24 °C im Sommer.",
      blocks: [
        { title: "Zwei Strände, 50 Meter entfernt", text: "Ein wilder Kiesstrand und ein ausgestatteter öffentlicher Strand mit Bar und Volleyball — beide eine Minute zu Fuß vom Villentor.", imgs: ["/photos/villa-idro-lake-beach-wild-600.jpg", "/photos/villa-idro-lake-beach-public-600.jpg", "/photos/villa-idro-lake-beach-bar-600.jpg"] },
        { title: "Naturpark hinter dem Haus", text: "Alpenpfade, ein Mineralwasserbach, Tunnel aus dem Ersten Weltkrieg und Rehe im Morgengrauen — direkt von der Villa, ohne Auto.", imgs: ["/photos/villa-idro-lake-natural-park-alpine-trails-1-600.jpg", "/photos/villa-idro-lake-natural-park-mineral-water-river-2-600.jpg", "/photos/villa-idro-lake-natural-park-defense-tunnel-5-600.jpg"] },
        { title: "Sport auf Wasser und Fels", text: "Windsurfen, Kiten, Tauchen, Klettern, Rennrad — der Idrosee ist eine stille Legende unter Aktivurlaubern.", imgs: ["/photos/villa-idro-lake-sport-windsurfing-yachting-4-600.jpg", "/photos/villa-idro-lake-sport-kiting-5-600.jpg", "/photos/villa-idro-lake-sport-climbing-3-600.jpg"] },
        { title: "Tagesausflüge fürs Fotoalbum", text: "Venedig, Mailand, Verona, Gardaland und das Outlet-Village — alles als Tagesausflug mit dem Auto erreichbar.", imgs: ["/photos/villa-idro-lake-travel-venice-6-600.jpg", "/photos/villa-idro-lake-travel-milan-8-600.jpg", "/photos/villa-idro-lake-travel-gardaland-9-600.jpg"] },
      ],
    },
    hosts: {
      title: "Sie schreiben direkt mit uns",
      text1: "Wir sind Valery und Vita — die Familie, der die Villa Idro gehört und die sie führt. Keine Manager, kein Callcenter: Wer Ihre Nachricht beantwortet, übergibt Ihnen auch die Schlüssel.",
      text2: "Wir leben hier und wissen, wo das Wasser im Juni am wärmsten ist und welcher Weg kinderwagentauglich ist. Fragen Sie uns alles — vor und während Ihres Aufenthalts.",
      sign: "Valery & Vita, Ihre Gastgeber am Idrosee",
    },
    how: {
      title: "Buchung in drei Nachrichten",
      steps: [
        { title: "Termine schreiben", text: "WhatsApp oder Telegram: Termine + Gästezahl. Mehr brauchen wir nicht." },
        { title: "Preis & Unterkunft erhalten", text: "Wir bestätigen die Verfügbarkeit, empfehlen die beste Wohnung oder das beste Haus für Ihre Gruppe und nennen den Endpreis. Ohne versteckte Kosten." },
        { title: "Ankommen — wir empfangen Sie", text: "Wir begrüßen Sie an der Villa, zeigen Ihnen alles und bleiben während des gesamten Aufenthalts erreichbar." },
      ],
      doubt: "Kein Vorkassedruck: Wir halten Ihre Termine, während Sie entscheiden.",
    },
    faq: {
      title: "Was Familien uns fragen",
      items: [
        { q: "Ist es wirklich günstiger als Booking oder Airbnb?", a: "Ja. Sie zahlen keine Plattform-Servicegebühren (üblich 10–18 %). Unser Preis ist der Eigentümerpreis — und für längere Aufenthalte fragen Sie gern nach einem besseren Angebot." },
        { q: "Was ist im Preis enthalten?", a: "Bettwäsche, Handtücher, Küchen-Starterset (Gewürze, Kaffee, Spülmittel), Parkplatz, Pool, Grill, Spielplatz und Lager. Kurtaxe 1 €/Person/Nacht (Apr–Okt) zahlbar vor Ort." },
        { q: "Ist die Villa gut für kleine Kinder?", a: "Sehr. Spielplatz auf dem Gelände, flacher Poolbereich, wellenfreie Strände 50 m entfernt und der Naturpark für leichte Spaziergänge. Kinderbetten auf Anfrage." },
        { q: "Wie weit ist der Strand wirklich?", a: "50 Meter — nachgemessen. Sie treten aus dem Tor und sehen das Wasser. Zwei Strände: ein wilder und ein ausgestatteter mit Bar." },
        { q: "Können zwei oder drei Familien zusammen kommen?", a: "Das ist unsere Spezialität. Buchen Sie 2–4 Wohnungen oder Häuser nebeneinander — gemeinsamer Pool, gemeinsame Grillabende, getrennte Küchen und Bäder." },
        { q: "Wie bezahle ich und kann ich stornieren?", a: "Wir bestätigen alles schriftlich im Messenger, einschließlich der Stornobedingungen für Ihre Termine, bevor Sie etwas bezahlen. Keine versteckten Bedingungen." },
      ],
    },
    final: {
      title: "Die Sommertermine am Idrosee sind zuerst weg",
      sub: "Schreiben Sie heute — Verfügbarkeit und genauer Preis innerhalb von Stunden, ganz unverbindlich.",
      cta: "Meine Termine per WhatsApp anfragen",
      tg: "Oder per Telegram schreiben",
      doubt: "Stornobedingungen schriftlich bestätigt · Keine Plattformgebühren",
    },
    footer: {
      addr: "Villa Idro · Vesta, Idrosee, Lombardei, Italien",
      cirTitle: "Italienische Tourismus-Registrierungen (CIR)",
      rights: "Villa Idro — eine private Familienvilla. Alle Fotos sind echt und in der Villa aufgenommen.",
      direct: "Direktbuchung: WhatsApp · Telegram",
    },
  },

  ru: {
    langName: "Русский",
    nav: { stays: "Апартаменты и дома", villa: "Вилла", lake: "Озеро и вокруг", faq: "Вопросы", contact: "Контакты" },
    hero: {
      eyebrow: "Озеро Идро · Веста · Северная Италия",
      h1a: "Ваше итальянское лето у озера,",
      h1b: "в 50 метрах от воды",
      sub: "Частная семейная вилла с бассейном: 8 апартаментов и 4 дома для компаний от 4 до 8 человек. Бронь напрямую у хозяев — без комиссий площадок, с честными ценами.",
      ctaMain: "Узнать свободные даты в WhatsApp",
      ctaDoubt: "Валерий и Вита отвечают лично — обычно в течение пары часов",
      ctaSecondary: "Посмотреть апартаменты и дома",
      chips: ["50 м до пляжей", "Свой бассейн", "12 вариантов · 4–8 гостей", "Официальная регистрация (CIR)", "Напрямую от хозяев"],
      waMessage: "Здравствуйте, Валерий и Вита! Хочу узнать свободные даты на Villa Idro.",
    },
    trust: {
      title: "Почему семьи возвращаются в Весту",
      items: [
        { n: "50 м", label: "до двух пляжей озера Идро" },
        { n: "12", label: "вариантов: 8 апартаментов + 4 дома" },
        { n: "0 %", label: "комиссий — вы платите хозяевам, а не площадке" },
        { n: "100 %", label: "легально: у каждого объекта итальянская регистрация CIR" },
      ],
    },
    stays: {
      title: "Выберите свой вариант",
      sub: "В каждом апартаменте и доме — своя кухня, ванная и доступ к бассейну, барбекю и саду. Все фото настоящие: именно это вы и получите.",
      tabApartments: "Апартаменты · 4–5 гостей",
      tabHomes: "Дома · до 8 гостей",
      sleeps: "гостей", size: "м²", balcony: "балкон", from: "от", night: "/ ночь",
      aptFrom: 69, homeFrom: 129,
      features: "Что внутри",
      aptFeatures: ["1 спальня + диван-кровать", "Кухня: газовая плита, холодильник, СВЧ, кофемашина", "Своя ванная", "Посуда, чайник и стартовый набор включены"],
      homeFeatures: ["3 спальни на 2 этажах", "Полная кухня и гостиная", "Терраса и балкон", "Идеально для 2 семей вместе"],
      cta: "Спросить об этом варианте",
      sharedNote: "Планировка как на фото — апартаменты этой линии обставлены одинаково.",
      priceNote: "Точная цена зависит от дат и числа гостей. Туристический сбор €1/чел./ночь (апр–окт, с 15 лет). Запросите расчёт — это одно сообщение.",
      waStay: (name: string) => `Здравствуйте! Интересует ${name} на Villa Idro. Подскажите, свободно ли на мои даты и сколько будет стоить?`,
    },
    villa: {
      title: "Одна вилла — всё, что нужно семье",
      sub: "Вы снимаете не комнату. Вся территория — ваша.",
      items: [
        { title: "Бассейн с видом на горы", text: "Открыт с мая по сентябрь, шезлонги включены. Есть мелкая детская зона.", img: "/photos/villa-pool-2-600.jpg" },
        { title: "Барбекю и беседка", text: "Ужин на гриле, пока солнце садится за озеро. Угольный гриль, большой стол, подсветка.", img: "/photos/villa-idro-lake-grill-1-600.jpg" },
        { title: "Детская площадка", text: "Качели и горки на территории — дети играют, вы наконец отдыхаете.", img: "/photos/villa-idro-lake-childrens-playground-1-600.jpg" },
        { title: "Бесплатная парковка", text: "Закрытая парковка на территории. Машина в 30 секундах от двери.", img: "/photos/villa-idro-lake-parking.jpg" },
        { title: "Хранилище для снаряжения", text: "Лодки, SUP-доски, велосипеды, матрасы — отдельная кладовая.", img: "/photos/villa-idro-lake-place-for-boats-mattresses-bicycles-600.jpg" },
        { title: "Настольный теннис и стирка", text: "Пинг-понг на вечер, стиральная машина для долгого отпуска.", img: "/photos/villa-idro-lake-ping-pong-table-600.jpg" },
      ],
    },
    lake: {
      title: "Озеро Идро: тихое итальянское озеро",
      sub: "Без толп Гарды, со всей красотой Альп. Вода летом прогревается до 24 °C.",
      blocks: [
        { title: "Два пляжа в 50 метрах", text: "Дикий галечный и оборудованный городской с баром и волейболом — оба в минуте пешком от ворот виллы.", imgs: ["/photos/villa-idro-lake-beach-wild-600.jpg", "/photos/villa-idro-lake-beach-public-600.jpg", "/photos/villa-idro-lake-beach-bar-600.jpg"] },
        { title: "Природный парк за домом", text: "Альпийские тропы, ручей с минеральной водой, тоннели Первой мировой и олени на рассвете — прямо от виллы, без машины.", imgs: ["/photos/villa-idro-lake-natural-park-alpine-trails-1-600.jpg", "/photos/villa-idro-lake-natural-park-mineral-water-river-2-600.jpg", "/photos/villa-idro-lake-natural-park-defense-tunnel-5-600.jpg"] },
        { title: "Спорт на воде и скалах", text: "Виндсёрфинг, кайт, дайвинг, скалолазание, шоссейный велосипед — Идро тихая легенда среди активных путешественников.", imgs: ["/photos/villa-idro-lake-sport-windsurfing-yachting-4-600.jpg", "/photos/villa-idro-lake-sport-kiting-5-600.jpg", "/photos/villa-idro-lake-sport-climbing-3-600.jpg"] },
        { title: "Поездки на день, которые попадут в альбом", text: "Венеция, Милан, Верона, Gardaland и аутлет-виллидж — всё в пределах дневной поездки на машине.", imgs: ["/photos/villa-idro-lake-travel-venice-6-600.jpg", "/photos/villa-idro-lake-travel-milan-8-600.jpg", "/photos/villa-idro-lake-travel-gardaland-9-600.jpg"] },
      ],
    },
    hosts: {
      title: "Вы пишете напрямую нам",
      text1: "Мы — Валерий и Вита, семья, которой принадлежит Villa Idro. Никаких менеджеров и колл-центров: человек, который отвечает на сообщение, сам встретит вас и передаст ключи.",
      text2: "Мы живём здесь и знаем, где вода теплее в июне и какая тропа подойдёт для коляски. Спрашивайте о чём угодно — до и во время отдыха.",
      sign: "Валерий и Вита, ваши хозяева на озере Идро",
    },
    how: {
      title: "Бронь — это три сообщения",
      steps: [
        { title: "Напишите даты", text: "WhatsApp или Telegram: даты + число гостей. Больше ничего не нужно." },
        { title: "Получите цену и вариант", text: "Подтвердим свободные даты, предложим лучший апартамент или дом под вашу компанию и назовём финальную цену. Без скрытых доплат." },
        { title: "Приезжайте — мы встретим", text: "Встретим у виллы, всё покажем и будем на связи весь отпуск." },
      ],
      doubt: "Никакого давления предоплатой: держим ваши даты, пока вы решаете.",
    },
    faq: {
      title: "Что у нас спрашивают семьи",
      items: [
        { q: "Это правда дешевле, чем Booking или Airbnb?", a: "Да. Вы не платите сервисные сборы площадок (обычно 10–18%). Наша цена — цена хозяев, а за долгий отдых всегда можно спросить спеццену." },
        { q: "Что входит в цену?", a: "Постельное бельё, полотенца, стартовый набор на кухне (специи, кофе, средство для посуды), парковка, бассейн, барбекю, площадка и хранилище. Туристический сбор €1/чел./ночь (апр–окт) — на месте." },
        { q: "Подходит ли вилла для маленьких детей?", a: "Очень. Площадка на территории, мелкая зона бассейна, пляжи без волн в 50 метрах и парк для лёгких прогулок. Детская кроватка — по запросу." },
        { q: "Пляж правда так близко?", a: "50 метров — мы измеряли. Выходите из ворот и видите воду. Два пляжа: дикий и оборудованный с баром." },
        { q: "Можно приехать двумя-тремя семьями?", a: "Это наша специализация. Берите 2–4 апартамента или дома рядом — общий бассейн и вечера у гриля, но отдельные кухни и ванные." },
        { q: "Как оплатить и можно ли отменить?", a: "Все условия, включая правила отмены для ваших дат, подтверждаем письменно в мессенджере до любой оплаты. Никаких скрытых условий." },
      ],
    },
    final: {
      title: "Летние даты на Идро разбирают первыми",
      sub: "Напишите сегодня — за пару часов получите свободные даты и точную цену. Ни к чему не обязывает.",
      cta: "Узнать мои даты в WhatsApp",
      tg: "Или написать в Telegram",
      doubt: "Условия отмены подтверждаем письменно · Без комиссий площадок",
    },
    footer: {
      addr: "Villa Idro · Веста, озеро Идро, Ломбардия, Италия",
      cirTitle: "Итальянские туристические регистрации (CIR)",
      rights: "Villa Idro — частная семейная вилла. Все фотографии настоящие и сделаны на вилле.",
      direct: "Прямая бронь: WhatsApp · Telegram",
    },
  },

  it: {
    langName: "Italiano",
    nav: { stays: "Appartamenti & case", villa: "La villa", lake: "Lago & dintorni", faq: "FAQ", contact: "Contatti" },
    hero: {
      eyebrow: "Lago d'Idro · Vesta · Nord Italia",
      h1a: "La tua estate italiana sul lago,",
      h1b: "a 50 metri dall'acqua",
      sub: "Villa privata di famiglia con piscina: 8 appartamenti e 4 case vacanza per 4–8 ospiti. Prenoti direttamente con i proprietari — nessuna commissione, prezzi onesti, cura personale.",
      ctaMain: "Verifica le date su WhatsApp",
      ctaDoubt: "Valery e Vita rispondono di persona — di solito entro poche ore",
      ctaSecondary: "Vedi appartamenti e case",
      chips: ["50 m dalle spiagge", "Piscina privata", "12 alloggi · 4–8 ospiti", "Registrati (CIR)", "Diretto dai proprietari"],
      waMessage: "Buongiorno Valery e Vita! Vorrei verificare le date disponibili a Villa Idro.",
    },
    trust: {
      title: "Perché le famiglie tornano a Vesta",
      items: [
        { n: "50 m", label: "da due spiagge del Lago d'Idro" },
        { n: "12", label: "alloggi: 8 appartamenti + 4 case" },
        { n: "0 %", label: "commissioni — paghi i proprietari, non una piattaforma" },
        { n: "100 %", label: "in regola: ogni alloggio ha una registrazione CIR" },
      ],
    },
    stays: {
      title: "Scegli il tuo alloggio",
      sub: "Ogni appartamento e casa ha cucina, bagno e accesso a piscina, barbecue e giardino. Foto reali — è esattamente ciò che avrai.",
      tabApartments: "Appartamenti · 4–5 ospiti",
      tabHomes: "Case vacanza · fino a 8 ospiti",
      sleeps: "ospiti", size: "m²", balcony: "balcone", from: "da", night: "/ notte",
      aptFrom: 69, homeFrom: 129,
      features: "Cosa c'è dentro",
      aptFeatures: ["1 camera + divano letto", "Cucina: piano gas, frigo, microonde, macchina caffè", "Bagno privato", "Stoviglie, bollitore, kit di benvenuto inclusi"],
      homeFeatures: ["3 camere su 2 piani", "Cucina completa e soggiorno", "Terrazza e balcone", "Ideale per 2 famiglie insieme"],
      cta: "Chiedi di questo alloggio",
      sharedNote: "Stessa disposizione delle foto — ogni appartamento di questa linea è arredato allo stesso modo.",
      priceNote: "Il prezzo finale dipende dalle date e dal numero di ospiti. Tassa di soggiorno €1/persona/notte (apr–ott, dai 15 anni). Chiedi un preventivo esatto — basta un messaggio.",
      waStay: (name: string) => `Buongiorno! Sono interessato a ${name} a Villa Idro. Potreste dirmi disponibilità e prezzo per le mie date?`,
    },
    villa: {
      title: "Una villa — tutto ciò che serve alla tua famiglia",
      sub: "Non affitti solo una stanza. Hai tutta la proprietà.",
      items: [
        { title: "Piscina con vista sui monti", text: "Aperta da maggio a settembre, lettini inclusi. Lato bimbi poco profondo.", img: "" },
        { title: "Barbecue e gazebo", text: "Cena alla griglia mentre il sole tramonta sul lago. Griglia a carbone, tavolo grande, luci.", img: "" },
        { title: "Parco giochi per bambini", text: "Altalene e scivoli nella proprietà — i bimbi giocano, tu riposi davvero.", img: "" },
        { title: "Parcheggio privato gratuito", text: "Parcheggio recintato interno. L'auto è a 30 secondi dalla porta.", img: "" },
        { title: "Deposito per la tua attrezzatura", text: "Barche, SUP, bici, materassini — un locale dedicato.", img: "" },
        { title: "Ping-pong e lavatrice", text: "Ping-pong per le sere, lavatrice per i soggiorni lunghi.", img: "" },
      ],
    },
    lake: {
      title: "Lago d'Idro: il tranquillo lago italiano",
      sub: "Senza la folla del Garda, con tutta la bellezza delle Alpi. In estate l'acqua arriva a 24 °C.",
      blocks: [
        { title: "Due spiagge, a 50 metri", text: "Una spiaggia selvaggia di ciottoli e una attrezzata con bar e beach volley — entrambe a un minuto a piedi dal cancello.", imgs: [] },
        { title: "Un parco naturale dietro casa", text: "Sentieri alpini, un ruscello di acqua minerale, gallerie della Grande Guerra e cervi all'alba — direttamente dalla villa, senza auto.", imgs: [] },
        { title: "Sport sull'acqua e sulla roccia", text: "Windsurf, kite, immersioni, arrampicata, ciclismo su strada — il Lago d'Idro è una leggenda silenziosa tra i viaggiatori attivi.", imgs: [] },
        { title: "Gite in giornata da album", text: "Venezia, Milano, Verona, Gardaland e l'outlet — tutto raggiungibile in giornata in auto.", imgs: [] },
      ],
    },
    hosts: {
      title: "Scrivi direttamente a noi",
      text1: "Siamo Valery e Vita — la famiglia proprietaria di Villa Idro. Niente manager, niente call center: chi risponde al tuo messaggio è chi ti consegnerà le chiavi.",
      text2: "Viviamo qui e sappiamo dove l'acqua è più calda a giugno e quale sentiero va bene con il passeggino. Chiedici tutto — prima e durante il soggiorno.",
      sign: "Valery e Vita, i tuoi ospiti sul Lago d'Idro",
    },
    how: {
      title: "Prenotare sono tre messaggi",
      steps: [
        { title: "Scrivi le tue date", text: "WhatsApp o Telegram: date + numero di ospiti. È tutto ciò che serve per iniziare." },
        { title: "Ricevi prezzo e alloggio", text: "Confermiamo la disponibilità, suggeriamo l'appartamento o la casa migliore per il tuo gruppo e diamo il prezzo finale. Nessun costo nascosto." },
        { title: "Arriva — ti accogliamo", text: "Ti accogliamo alla villa, ti mostriamo tutto e restiamo in contatto per tutto il soggiorno." },
      ],
      doubt: "Nessuna pressione di acconto: teniamo le tue date mentre decidi.",
    },
    faq: {
      title: "Le domande delle famiglie",
      items: [
        { q: "È davvero più conveniente di Booking o Airbnb?", a: "Sì. Non paghi commissioni di piattaforma (di solito 10–18%). Il nostro prezzo è quello dei proprietari — e per soggiorni lunghi puoi sempre chiederci un'offerta migliore." },
        { q: "Cosa è incluso nel prezzo?", a: "Biancheria, asciugamani, kit cucina (spezie, caffè, detersivo), parcheggio, piscina, barbecue, parco giochi e deposito. Tassa di soggiorno €1/persona/notte (apr–ott) all'arrivo." },
        { q: "La villa è adatta ai bambini piccoli?", a: "Moltissimo. Parco giochi interno, lato piscina basso, spiagge senza onde a 50 m e il parco naturale per passeggiate facili. Culle su richiesta." },
        { q: "Quanto dista davvero la spiaggia?", a: "50 metri — misurati. Esci dal cancello e vedi l'acqua. Due spiagge: una selvaggia e una attrezzata con bar." },
        { q: "Possono venire due o tre famiglie insieme?", a: "È la nostra specialità. Prenota 2–4 appartamenti o case vicini — piscina e serate barbecue condivise, ma cucine e bagni separati." },
        { q: "Come pago e posso disdire?", a: "Confermiamo tutto per iscritto nel messenger, comprese le condizioni di cancellazione per le tue date, prima di qualsiasi pagamento. Nessuna condizione nascosta." },
      ],
    },
    final: {
      title: "Le date estive sul Lago d'Idro vanno via per prime",
      sub: "Scrivi oggi — ricevi disponibilità e prezzo esatto entro poche ore, senza impegno.",
      cta: "Verifica le mie date su WhatsApp",
      tg: "Oppure scrivi su Telegram",
      doubt: "Condizioni di cancellazione confermate per iscritto · Nessuna commissione",
    },
    footer: {
      addr: "Villa Idro · Vesta, Lago d'Idro, Lombardia, Italia",
      cirTitle: "Registrazioni turistiche italiane (CIR)",
      rights: "Villa Idro — villa privata di famiglia. Tutte le foto sono reali e scattate alla villa.",
      direct: "Prenotazione diretta: WhatsApp · Telegram",
    },
  },
};
