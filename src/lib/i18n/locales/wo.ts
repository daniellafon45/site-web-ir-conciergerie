import type { Messages } from "../types";
import { fr } from "./fr";

export const wo: Messages = {
  ...fr,
  meta: {
    ...fr.meta,
    homeTitle: "IR Conciergerie — Conciergerie ngir ñëw ci Kanadaa | Montréal, Toronto, Vancouver",
    homeDescription:
      "Service conciergerie bu gëna rafet ngir ñëw ci Kanadaa: transfert aeroport, wut kër, inspection ak installation.",
    homeKeywords: "ñëw ci Kanadaa, conciergerie Kanadaa, transfert aeroport Montréal, IR Conciergerie",
    soumissionTitle: "Laaj offre — IR Conciergerie",
    soumissionDescription: "Am offre bu saafa ngir sa installation ci Kanadaa.",
  },
  nav: { services: "Serwiis yi", about: "Nu", contact: "Jëndal", cta: "Laaj offre", ctaShort: "Offre" },
  hero: { title: "Defal sa ñëw ak sa installation ci Kanadaa ni expérience bu mat nañu ko." },
  trust: ["Kumpaani yu réew mi", "Expatriés", "Étudiants yu aduna bi", "Waa kër", "Professionnels"],
  premium: {
    ...fr.premium,
    title: "Serwiis yu Premium",
    subtitle: "ci 80$ CAD + taxe rekk",
    requestQuote: "Laaj offre",
    support247: "Am na 24/7",
  },
  manifesto:
    "Defal nu logistics sa ñëw, sa installation ak sa dem ci Kanadaa. IR Conciergerie di orchestrer lépp ci sa installation.",
  pillars: {
    sectionTitle: "Excellence ngir\nsa installation.",
    pillars: fr.pillars.pillars.map((p, i) => ({
      ...p,
      title: ["Dalal VIP", "Kër bu pare", "Xel mu sedd"][i] ?? p.title,
      desc: [
        "Chauffeur bu saafa di xaar la ci aeroport.",
        "Dinañu gis kër bu baax te def inspection bu mat.",
        "Dinañu dimbali la ci lépp ci administratif.",
      ][i] ?? p.desc,
    })),
  },
  services: { ...fr.services, sectionTitle: "Sunu Serwiis yu Premium." },
  about: {
    label: "Sunu Xibaar",
    title: "Excellence ngir Sa Installation",
    body: "IR Conciergerie di soppi dalal ci Kanadaa. Mission bi mooy jox ku nekk installation bu sedd, bu am sécurité ak bu gëna rafet.",
    immigration: "Danga soxla ndimbal ci immigration ? Jëndal sunu département :",
  },
  cta: {
    title: "Pare nga ngir planifie sa ñëw ?",
    body: "Jëndal nu ngir évaluation bu saafa ci sa besoin.",
    button: "Laaj offre",
  },
  footer: {
    ...fr.footer,
    tagline: "Sa partner bu am kool ngir installation bu sedd ci Kanadaa.",
    rights: "© 2026 IR Conciergerie. Yépp a ngi am droit.",
  },
  soumission: {
    ...fr.soumission,
    pageTitle: "Demande offre",
    stepOf: "Etape",
    steps: ["Sa serwiis yi", "Sa xibaar", "Mbind mi"],
    step0Title: "Ban serwiis yi la neex ?",
    submit: "Yónnee sama demande",
    submitting: "Mi ngi yónnee...",
    thankYou: "Jërejëf",
    backHome: "Dellu ci kër",
  },
  common: {
    notFoundTitle: "Xët bi amul",
    notFoundBody: "Xët bi amul walla dañu ko jëm.",
    goHome: "Dellu ci kër",
    errorTitle: "Xët bi mënuwul yéeg",
    errorBody: "Am na lu jaax. Jéemaatal walla dellu ci kër.",
    tryAgain: "Jéemaatal",
  },
};
