import type { Messages } from "../types";
import { fr } from "./fr";

/** Lingala — traductions basées sur le français avec adaptations clés. */
export const ln: Messages = {
  ...fr,
  meta: {
    ...fr.meta,
    homeTitle: "IR Conciergerie — Conciergerie ya kobanda na Canada | Montréal, Toronto, Vancouver",
    homeDescription:
      "Service ya conciergerie premium mpo na koya na Canada: transfert na avion, koluka ndako, inspection mpe installation.",
    homeKeywords: "kobanda na Canada, conciergerie Canada, transfert avion Montréal, IR Conciergerie",
    soumissionTitle: "Kosenga offre — IR Conciergerie",
    soumissionDescription: "Zwa offre ya moto moko mpo na kobanda na Canada.",
  },
  nav: { services: "Misala", about: "Biso", contact: "Benga biso", cta: "Kosenga offre", ctaShort: "Offre" },
  hero: { title: "Sala koya na Canada mpe kobanda kaka expérience ya malamu mpe ya kimia." },
  trust: ["Bisnes ya mboka", "Bato ya kofanda na mboka mosusu", "Batelisi ya mokili mobimba", "Libota", "Bato ya mosala"],
  premium: {
    title: "Misala ya Premium",
    subtitle: "kowuta na 80$ CAD + taxes",
    requestQuote: "Kosenga offre",
    arrival: "Koya",
    assistance: "Lisalisi",
    supportTitle: "Lisungi ya ba clients",
    support247: "Ezali na 24/7",
    secureTransport: "Transfert ya sécurité",
    guaranteedInspection: "Inspection garanti",
    testimonialName: "Marie L.",
    testimonialText: "Installation ya malamu!",
  },
  manifesto:
    "Tika biso kosala makambo ya logistics ya koya, kobanda mpe kobongisa na Canada. IR Conciergerie ekamba nguya etape nyonso ya installation na yo.",
  pillars: {
    sectionTitle: "Excellence mpo na\ninstallation na yo.",
    pillars: fr.pillars.pillars.map((p, i) => ({
      ...p,
      title: ["Boyei VIP", "Ndako ya kolongola", "Kimia ya motema"][i] ?? p.title,
      desc: [
        "Moto ya kotambwisa motuka azali kozela yo na avion.",
        "Toluka ndako ya malamu mpe tosala inspection liboso ya kobanda.",
        "Tosalisa yo na makambo nyonso ya administratif na mboka.",
      ][i] ?? p.desc,
    })),
  },
  services: { ...fr.services, sectionTitle: "Misala na biso ya Premium." },
  about: {
    label: "Lisolo na biso",
    title: "Excellence mpo na installation na yo",
    body: "IR Conciergerie ezali kobongola boyei na Canada. Mission na biso: kopesa bato nyonso kobanda ya malamu, ya sécurité mpe ya niveau ya likolo.",
    immigration: "Ozali na besoin ya lisalisi na immigration ? Benga département na biso :",
  },
  testimonial: {
    quote:
      "IR Conciergerie ebongoli stress ya kobongisa na biso na mokili mobimba na expérience ya malamu mpe ya kimia. Service ya solo mpenza.",
    name: "Jean-François M.",
    role: "Directeur Exécutif, Abongisami na Montréal",
  },
  cta: {
    title: "Ozali prêt kolanda koya na yo ?",
    body: "Benga biso mpo na évaluation ya besoin na yo.",
    button: "Kosenga offre",
  },
  footer: {
    ...fr.footer,
    tagline: "Partenaire ya confiance mpo na kobanda na kimia na Canada.",
    rights: "© 2026 IR Conciergerie. Makoki nyonso ebatami.",
  },
  soumission: {
    ...fr.soumission,
    pageTitle: "Demande ya offre",
    stepOf: "Etape",
    steps: ["Misala na yo", "Ba informations na yo", "Makambo ya projet"],
    step0Title: "Misala nini ezali kopesa yo intérêt ?",
    submit: "Tinda demande na ngai",
    submitting: "Ezali kotinda...",
    thankYou: "Matondo",
    backHome: "Zonga na ebandeli",
  },
  common: {
    notFoundTitle: "Page ezali te",
    notFoundBody: "Page oyo ezali te to elongolami.",
    goHome: "Zonga na ebandeli",
    errorTitle: "Page elongi te",
    errorBody: "Libunga moko esalemi. Zongisa lisusu to zonga na ebandeli.",
    tryAgain: "Zongisa lisusu",
  },
};
