import type { Messages } from "../types";
import { fr } from "./fr";

/** Pular / Peulh (Fulfulde) */
export const ff: Messages = {
  ...fr,
  meta: {
    ...fr.meta,
    homeTitle: "IR Conciergerie — Conciergerie ngam yahrugo e Canada | Montréal, Toronto, Vancouver",
    homeDescription:
      "Conciergerie premium ngam yahrugo e Canada: jokkorgo e leydi diiron, yiytugo jaaɓnorgo, inspection e installation.",
    homeKeywords: "yahrugo e Canada, conciergerie Canada, jokkorgo leydi diiron Montréal, IR Conciergerie, Pular, Peulh",
    soumissionTitle: "Ñaami dañal — IR Conciergerie",
    soumissionDescription: "Heɓ dañal moƴƴin ngam installaade maa e Canada.",
  },
  nav: {
    services: "Golle",
    about: "Baɗte amen",
    contact: "Jokkondiral",
    cta: "Ñaami dañal",
    ctaShort: "Dañal",
  },
  hero: {
    title: "Waylu yahrugo maa e installaade maa e Canada ina haani, salmin e hakkille.",
  },
  trust: ["Kompaniije dow", "Ƴeewɓe", "Jannguɓe aduna", "Galle", "Golluɓe"],
  premium: {
    title: "Golle Premium",
    subtitle: "fuɗɗo e 80$ CAD + taxe tan",
    requestQuote: "Ñaami dañal",
    arrival: "Yahrugo",
    assistance: "Wallitgol",
    supportTitle: "Wallitgol Kliyan",
    support247: "Ina woodi 24/7",
    secureTransport: "Jokkorgo Kisal",
    guaranteedInspection: "Inspection Waranti",
    testimonialName: "Marie L.",
    testimonialText: "Installaade moƴƴin!",
  },
  manifesto:
    "Hokk amen golle logistics yahrugo maa, installaade maa e yahrugo e Canada. IR Conciergerie ina tawa tikkere fof installaade maa.",
  pillars: {
    sectionTitle: "Ɓural ngam\ninstallaade maa.",
    pillars: fr.pillars.pillars.map((p, i) => ({
      ...p,
      title: ["Dalal VIP", "Jaaɓnorgo moƴƴin", "Hakkille"][i] ?? p.title,
      desc: [
        "Dooɗo moƴƴin ina mawnii e leydi diiron ngam jokkorgo moƴƴin.",
        "Min ngalata jaaɓnorgo moƴƴin e min ngolla inspection ɓurɗe.",
        "Min wallitima fof baɗte administrative e renndo maa.",
      ][i] ?? p.desc,
    })),
  },
  services: { ...fr.services, sectionTitle: "Golle amen Premium." },
  about: {
    label: "Baɗte amen",
    title: "Ɓural ngam Installaade Maa",
    body: "IR Conciergerie ina waylu dalal e Canada. Golle amen ko jox kala ɗo yahrudo installaade salmin, kisal e ƴettol.",
    immigration: "Aɗa sokli wallitgol e baɗte immigration ? Jokkondir e amen :",
  },
  testimonial: {
    quote:
      "IR Conciergerie ina waylu stress amen e yahrugo aduna ina haani, salmin e hakkille. Golle moƴƴin ngam kala neɗɗo.",
    name: "Jean-François M.",
    role: "Direkteer Ejikutif, Yahrii e Montréal",
  },
  cta: {
    title: "Aɗa heɓii ngam teelude yahrugo maa ?",
    body: "Jokkondir e amen ngam ƴeewtinde baɗte maa e installaade.",
    button: "Ñaami dañal",
  },
  footer: {
    ...fr.footer,
    tagline: "Partner maa kisal ngam installaade salmin e Canada.",
    rights: "© 2026 IR Conciergerie. Kala hakkil ko woodi.",
  },
  soumission: {
    ...fr.soumission,
    pageTitle: "Ñaami dañal",
    stepOf: "Tappa",
    steps: ["Golle maa", "Humpito maa", "Baɗte proje"],
    step0Title: "Golle ɗiɗi ɗe aɗa yiɗi ?",
    step0Desc: "Suɓ golle goɗɗe walla ɗuuɗ. Min waylu wallitgol maa.",
    step1Title: "Anndu en.",
    step1Desc: "Humpito maa ina wallu min rutude e dañal moƴƴin.",
    step2Title: "Waxnu amen baɗte proje maa.",
    step2Desc: "Baɗte ɗooɗe ngam teelude yahrugo maa.",
    previous: "Ɓennu",
    continue: "Jokku",
    submit: "Neldu dañal am",
    submitting: "Ina neldaa...",
    thankYou: "A jaraama",
    thankYouBody: "Dañal maa neldaa e amen. Maa rutat e 24h e",
    backHome: "Rutto e fuɗɗorde",
  },
  common: {
    notFoundTitle: "Hello alaa",
    notFoundBody: "Hello oo alaa walla ina njahaa.",
    goHome: "Rutto e fuɗɗorde",
    errorTitle: "Hello oo yeesataa",
    errorBody: "Ko waɗi ko alaa haani. Eto kadi walla rutto.",
    tryAgain: "Eto kadi",
  },
};
