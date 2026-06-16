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

/** Lingala — traductions basées sur le français avec adaptations clés. */
export const ln: Messages = {
  ...fr,
  meta: {
    ...fr.meta,
    homeTitle: "IR Conciergerie — Conciergerie ya kobanda na Canada | Montréal, Toronto, Vancouver",
    homeDescription:
      "Lisalisi ya installaade na Canada: koluka ndako, inspection, transfert na avion mpe makambo ya bato ya sika. Montréal, Toronto mpe Vancouver.",
    homeKeywords: "kobanda na Canada, conciergerie Canada, transfert avion Montréal, IR Conciergerie",
    soumissionTitle: "Kosenga offre — IR Conciergerie",
    soumissionDescription: "Zwa offre ya moto moko mpo na kobanda na Canada.",
  },
  nav: { services: "Misala", about: "Biso", contact: "Benga biso", cta: "Kosenga offre", ctaShort: "Offre" },
  hero: { title: "Koluka ndako mpe kobanda na Canada, na kozanga kosala yango nyonso moko" },
  trust: ["Bisnes", "Bato ya kofanda na mboka mosusu", "Batelisi ya mokili mobimba", "Libota", "Bato ya mosala"],
  premium: {
    title: "Lisalisi ya solo mpo na kobanda",
    subtitle: "Misala ya utilité mpe ya accessibilité, kowuta na 80$ CAD + taxes",
    requestQuote: "Kosenga offre",
    arrival: "Koya",
    arrivalSign: "Koya",
    arrivalImageAlt: "Elembo ya Koya na libándá ya aviɔ",
    assistance: "Lisalisi",
    supportTitle: "Lisungi ya ba clients",
    support247: "Ezali na 24/7",
    secureTransport: "Transfert ya confiance",
    guaranteedInspection: "Ndako eponami liboso ya signature",
    testimonialName: "Marie L.",
    testimonialText: "Tolukaki ndako na biso na kozanga stress.",
  },
  manifesto:
    "Koluka ndako, kosigner contrat na distance mpe kosala makambo nyonso ya installation na Canada ezali pasi soki okowi na esika mosusu. IR Conciergerie ekamba yo na solo, etape na etape.",
  pillars: {
    sectionTitle: "Ba étapes ya pasi,\nto sali yango.",
    pillars: [
      {
        title: "Koya na kozanga improvisation",
        desc: "Kokita na engumba oyo oyebi te, na kozanga adresse to repère, ezali stressant. Tozali kozela yo na avion mpe tokamba yo mbala moko na ndako na yo to hébergement ya mwa ntango.",
        cardTitle: "Koya na yo",
        items: [
          { icon: "flight_land", label: "Accueil_Aéroport", pitch: "Moto moko azali kozela yo na sortie mpo na kokamba yo mbala moko okiti." },
          { icon: "directions_car", label: "Transfert_Direct", pitch: "Kowuta na avion kino na adresse na yo, na kozanga navigation ya pasi." },
          { icon: "luggage", label: "Gestion_Bagages", pitch: "Bagages na yo esalemi mpo mokolo ya liboso ezala pasi te." },
          { icon: "key", label: "Remise_des_Clés", pitch: "Accès na ndako na yo eorganisé, prêt na koya na yo." },
        ],
      },
      {
        title: "Koluka ndako, na kozanga kobunga ba semaines",
        desc: "Marché ezali tendu, ba visites ezali moke mpe kosigner na distance ezali riskant. Tolukaka mpo na yo, tovisité mpe toponi liboso ya kobongisa.",
        cardTitle: "Dossier Logement",
        items: [
          { icon: "home_work", label: "Recherche_Active", pitch: "To filtre ba annonces selon budget na yo, quartier mpe mokolo ya koya." },
          { icon: "fact_check", label: "Visite_Vérifiée", pitch: "To repère ba problèmes liboso ya kosigner bail." },
          { icon: "description", label: "Signature_Bail", pitch: "Négociation mpe signature ya bail esalemi mpo na yo." },
          { icon: "chair", label: "Ameublement", pitch: "Ndako ya meubles mpe équipée, prête na kobanda okowi." },
        ],
      },
      {
        title: "Ba démarches na yo ya mokolo na mokolo, simplifiées",
        desc: "Banque, courant, internet, assurance : ba démarches oyo e bloque mbala mingi bato ya sika. Tokamba yo mpo na nionso ezala na place nokinoki.",
        cardTitle: "Démarches Administratives",
        items: [
          { icon: "account_balance", label: "Compte_Bancaire", pitch: "Ouverture ya compte facilitée na ba partenaires na biso." },
          { icon: "bolt", label: "Services_Publics", pitch: "Courant, gaz mpe mai activés liboso ya kobongisa." },
          { icon: "wifi", label: "Internet_Téléphonie", pitch: "Forfaits internet mpe mobile souscrits mpe installés." },
          { icon: "health_and_safety", label: "Assurance_Santé", pitch: "Couverture santé adaptée, mise en place nokinoki." },
        ],
      },
    ],
  },
  services: {
    sectionTitle: "Misala na biso mpo na kobanda.",
    cards: [
      { id: "service-transfert-aeroport", title: "Transfert avion", desc: "Accueil na avion mpe trajet direct na ndako na yo to hébergement." },
      { id: "service-recherche-logement", title: "Koluka ndako", desc: "Tolukaka mpo na yo na marché tendu, selon budget mpe critères na yo." },
      { id: "service-inspection", title: "Inspection détaillée ya ndako na yo", desc: "Toponi état ya ndako liboso ya signature, mpo na koboya mauvaises surprises." },
      { id: "service-installation", title: "Installation complète", desc: "Abonnements, services essentiels mpe meubles prêts liboso ya koya na yo." },
    ],
  },
  about: {
    label: "Lisolo na biso",
    title: "Tozali koyambwama na ba étapes oyo liboso na yo",
    body: "Na koya na biso na Canada, tozali koyeba ba obstacles moko : kokita na kozanga repère, koluka ndako na marché tendu, mpe kosala ba démarches moko na moko — banque, courant, internet — na kozanga koyeba wapi kobanda. Na esika ya kotika basusu kosala yango moko, to créer IR Conciergerie : accompagnement e pensé na bato oyo basali yango liboso, kowuta na accueil na avion tii na installation na yo.",
    immigration: "Ozali na besoin ya lisalisi na immigration ? Benga département na biso :",
  },
  testimonial: {
    quote:
      "IR Conciergerie ebongoli stress ya kobongisa na biso na mokili mobimba na expérience ya malamu mpe ya kimia. Service ya solo mpenza.",
    name: "Jean-François M.",
    role: "Directeur Exécutif, Abongisami na Montréal",
  },
  homeFaq: HOME_FAQ_FR,
  cta: {
    title: "Ozali prêt kolanda koya na yo ?",
    body: "Benga biso mpo na évaluation ya besoin na yo.",
    button: "Kosenga offre",
  },
  privacy: PRIVACY_BANNERS.ln,
  privacyPolicy: getPrivacyPolicyForLocale("ln"),
  termsOfUse: getTermsOfUseForLocale("ln"),
  footer: {
    ...fr.footer,
    tagline: "Partenaire ya confiance mpo na kobanda na kimia na Canada.",
    rights: "© 2026 IR Conciergerie. Makoki nyonso ebatami.",
    links: { ...fr.footer.links, privacy: FOOTER_PRIVACY.ln, terms: FOOTER_TERMS.ln, blog: FOOTER_BLOG.ln },
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
    consentLabel: PRIVACY_CONSENT.ln.consentLabel,
    consentRequired: PRIVACY_CONSENT.ln.consentRequired,
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
