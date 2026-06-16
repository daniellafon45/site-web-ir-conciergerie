import type { Messages } from "../types";
import {
  FOOTER_PRIVACY,
  FOOTER_TERMS,
  getPrivacyPolicyForLocale,
  getTermsOfUseForLocale,
  PRIVACY_BANNERS,
  PRIVACY_CONSENT,
} from "../privacy-i18n";
import { FOOTER_BLOG } from "../../blog/blog-i18n";
import { HOME_FAQ_FR } from "../home-faq-i18n";
import { fr } from "./fr";

/** Pular / Peulh (Fulfulde) */
export const ff: Messages = {
  ...fr,
  meta: {
    ...fr.meta,
    homeTitle: "IR Conciergerie — Conciergerie ngam yahrugo e Canada | Montréal, Toronto, Vancouver",
    homeDescription:
      "Wallitgol ngam installaade e Canada: yiytugo jaaɓnorgo, inspection, jokkorgo e leydi diiron e baɗte ɗuuɗe. Montréal, Toronto e Vancouver.",
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
    title: "Yiytugo jaaɓnorgo e installaade e Canada, tawa a waɗa fof ko a hoore maa",
  },
  trust: ["Kompaniije", "Ƴeewɓe", "Jannguɓe aduna", "Galle", "Golluɓe"],
  premium: {
    title: "Wallitgol moƴƴin ngam installaade maa",
    subtitle: "Golle ina haani e ina accessibles, fuɗɗo e 80$ CAD + taxe",
    requestQuote: "Ñaami dañal",
    arrival: "Yahrugo",
    arrivalSign: "Yahrugo",
    arrivalImageAlt: "Panel Yahrugo e leydi leemngal",
    assistance: "Wallitgol",
    supportTitle: "Wallitgol Kliyan",
    support247: "Ina woodi 24/7",
    secureTransport: "Jokkorgo kisal",
    guaranteedInspection: "Jaaɓnorgo ƴeewtaama fuɗɗo signature",
    testimonialName: "Marie L.",
    testimonialText: "Min heɓii jaaɓnorgo amen salmin.",
  },
  manifesto:
    "Yiytugo jaaɓnorgo, signature contrat e distance e waɗde fof baɗte installaade e Canada ko gelluɗo so a yahii e leydi goɗɗo. IR Conciergerie ina accompagner maa e solo, tappa e tappa.",
  pillars: {
    sectionTitle: "Tappe ɗe gelluɗe,\nmin ngollata ɗe.",
    pillars: [
      {
        title: "Yahrugo salmin improvisation",
        desc: "Naatde e galle ndu a anndaa, alaa adresse walla repère, ko stress. Min mawnii e leydi diiron e min jokkorga maa haa jaaɓnorgo maa walla hébergement moƴƴin.",
        cardTitle: "Yahrugo maa",
        items: [
          { icon: "flight_land", label: "Accueil_Aéroport", pitch: "Goɗɗo ina mawnii e sortie ngam accompagner maa so a naatii." },
          { icon: "directions_car", label: "Transfert_Direct", pitch: "E leydi diiron haa adresse maa, alaa navigation gelluɗo." },
          { icon: "luggage", label: "Gestion_Bagages", pitch: "Bagages maa ina waɗee ngam ñalnde fof ndee ina haani." },
          { icon: "key", label: "Remise_des_Clés", pitch: "Accès e jaaɓnorgo maa organisé, pare so a yahii." },
        ],
      },
      {
        title: "Yiytugo jaaɓnorgo, tawa a ñaataa ayu-bis",
        desc: "Marché ina gellu, visites ina usti e signature e distance ina riskant. Min ngalata maa, min visiti e min ƴeewti fuɗɗo installaade maa.",
        cardTitle: "Dossier Logement",
        items: [
          { icon: "home_work", label: "Recherche_Active", pitch: "Min filtre annonces selon budget maa, quartier e ñalnde yahrugo." },
          { icon: "fact_check", label: "Visite_Vérifiée", pitch: "Min gorto baɗte ɓurɗe fuɗɗo signature bail." },
          { icon: "description", label: "Signature_Bail", pitch: "Négociation e signature bail ina waɗee ngam maa." },
          { icon: "chair", label: "Ameublement", pitch: "Jaaɓnorgo meublé e équipé, pare so a yahii." },
        ],
      },
      {
        title: "Baɗte maa ummoraade, ina haani",
        desc: "Banque, courant, internet, assurance : baɗte ɗee ina bloquer ɗuuɗe ɗe yahata. Min accompagner maa ngam fof ina woodi lawol.",
        cardTitle: "Démarches Administratives",
        items: [
          { icon: "account_balance", label: "Compte_Bancaire", pitch: "Ouverture compte facilitée e partner amen." },
          { icon: "bolt", label: "Services_Publics", pitch: "Courant, gaz e ndiyam activés fuɗɗo installaade." },
          { icon: "wifi", label: "Internet_Téléphonie", pitch: "Forfaits internet e mobile souscrits e installés." },
          { icon: "health_and_safety", label: "Assurance_Santé", pitch: "Couverture santé adaptée, mise en place lawol." },
        ],
      },
    ],
  },
  services: {
    sectionTitle: "Golle amen ngam installaade maa.",
    cards: [
      { id: "service-transfert-aeroport", title: "Jokkorgo leydi diiron", desc: "Accueil e leydi diiron e trajet direct haa jaaɓnorgo maa walla hébergement." },
      { id: "service-recherche-logement", title: "Yiytugo jaaɓnorgo", desc: "Min ngalata maa e marché gelluɗo, selon budget maa e critères maa." },
      { id: "service-inspection", title: "Inspection détaillée jaaɓnorgo maa", desc: "Min ƴeewti état jaaɓnorgo fuɗɗo signature, ngam amul mauvaises surprises." },
      { id: "service-installation", title: "Installaade timmungal", desc: "Abonnements, services essentiels e meubles pare fuɗɗo yahrugo maa." },
    ],
  },
  about: {
    label: "Baɗte amen",
    title: "Min ngalatii tappe ɗee laat maa",
    body: "So min yahrii e Canada, min anndii obstacles ɗooɗe : naatde alaa repère, yiytugo jaaɓnorgo e marché gelluɗo, e waɗde baɗte gooto e gooto — banque, courant, internet — alaa anndude fuɗɗorde. Cato min hokk ɗo goɗɗe waɗde ko boppam, min sosii IR Conciergerie : accompagnement e pensé ɗe ɓe ngalatii yoon oo, e accueil leydi diiron haa installaade maa.",
    immigration: "Aɗa sokli wallitgol e baɗte immigration ? Jokkondir e amen :",
  },
  testimonial: {
    quote:
      "IR Conciergerie ina waylu stress amen e yahrugo aduna ina haani, salmin e hakkille. Golle moƴƴin ngam kala neɗɗo.",
    name: "Jean-François M.",
    role: "Direkteer Ejikutif, Yahrii e Montréal",
  },
  homeFaq: HOME_FAQ_FR,
  cta: {
    title: "Aɗa heɓii ngam teelude yahrugo maa ?",
    body: "Jokkondir e amen ngam ƴeewtinde baɗte maa e installaade.",
    button: "Ñaami dañal",
  },
  privacy: PRIVACY_BANNERS.ff,
  privacyPolicy: getPrivacyPolicyForLocale("ff"),
  termsOfUse: getTermsOfUseForLocale("ff"),
  footer: {
    ...fr.footer,
    tagline: "Partner maa kisal ngam installaade salmin e Canada.",
    rights: "© 2026 IR Conciergerie. Kala hakkil ko woodi.",
    links: { ...fr.footer.links, privacy: FOOTER_PRIVACY.ff, terms: FOOTER_TERMS.ff, blog: FOOTER_BLOG.ff },
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
    consentLabel: PRIVACY_CONSENT.ff.consentLabel,
    consentRequired: PRIVACY_CONSENT.ff.consentRequired,
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
