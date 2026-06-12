import type { Messages } from "../types";
import { fr } from "./fr";

export const sw: Messages = {
  ...fr,
  meta: {
    ...fr.meta,
    homeTitle: "IR Conciergerie — Huduma ya uhamiaji Canada | Montreal, Toronto, Vancouver",
    homeDescription:
      "Huduma ya concierge kwa kuhamia Canada: usafiri wa uwanja wa ndege, utafutaji wa nyumba, ukaguzi na usanidi.",
    homeKeywords: "uhamiaji Canada, concierge Canada, usafiri uwanja Montreal, IR Conciergerie",
    soumissionTitle: "Omba bei — IR Conciergerie",
    soumissionDescription: "Pata bei maalum kwa kuhamia Canada.",
  },
  nav: { services: "Huduma", about: "Kuhusu", contact: "Wasiliana", cta: "Omba bei", ctaShort: "Bei" },
  hero: { title: "Fanya kuwasili na kuishi Canada kuwe uzoefu ulio na mpangilio na utulivu." },
  trust: ["Biashara za Ndani", "Wahamiaji", "Wanafunzi wa Kimataifa", "Familia", "Wataalamu"],
  premium: {
    ...fr.premium,
    title: "Huduma za Premium",
    subtitle: "kuanzia $80 CAD + kodi tu",
    requestQuote: "Omba bei",
    support247: "Inapatikana 24/7",
  },
  manifesto:
    "Acha changamoto za kuwasili, kujumuishwa na kuhamia Canada kwetu. IR Conciergerie inaratibu kila hatua ya uhamishaji wako.",
  pillars: {
    sectionTitle: "Ubora katika huduma\nya uhamishaji wako.",
    pillars: fr.pillars.pillars.map((p, i) => ({
      ...p,
      title: ["Karibu VIP", "Nyumba Tayari", "Utulivu wa Akili"][i] ?? p.title,
      desc: [
        "Dereva binafsi anakusubiri uwanjani wa ndege.",
        "Tunapata nyumba bora na kufanya ukaguzi kabla ya kuhamia.",
        "Tunasaidia taratibu zote za kiutawala.",
      ][i] ?? p.desc,
    })),
  },
  services: { ...fr.services, sectionTitle: "Huduma Zetu za Premium." },
  about: {
    label: "Hadithi Yetu",
    title: "Ubora katika Huduma ya Uhamishaji Wako",
    body: "IR Conciergerie inabadilisha ukarimu nchini Canada. Tunatoa uhamishaji laini, salama na wa kiwango cha juu.",
    immigration: "Unahitaji msaada wa uhamiaji? Wasiliana na idara yetu:",
  },
  cta: {
    title: "Uko tayari kupanga kuwasili kwako?",
    body: "Wasiliana nasi kwa tathmini maalum ya mahitaji yako.",
    button: "Omba bei",
  },
  footer: {
    ...fr.footer,
    tagline: "Mshirika wako wa kuaminika kwa uhamiaji wa amani Canada.",
    rights: "© 2026 IR Conciergerie. Haki zote zimehifadhiwa.",
  },
  soumission: {
    ...fr.soumission,
    pageTitle: "Ombi la bei",
    stepOf: "Hatua",
    steps: ["Huduma zako", "Taarifa zako", "Maelezo ya mradi"],
    step0Title: "Huduma zipi unazovutiwa?",
    submit: "Tuma ombi langu",
    submitting: "Inatuma...",
    thankYou: "Asante",
    backHome: "Rudi nyumbani",
  },
  common: {
    notFoundTitle: "Ukurasa haupatikani",
    notFoundBody: "Ukurasa haupo au umehamishwa.",
    goHome: "Rudi nyumbani",
    errorTitle: "Ukurasa haujapakia",
    errorBody: "Kuna tatizo. Jaribu tena au rudi nyumbani.",
    tryAgain: "Jaribu tena",
  },
};
