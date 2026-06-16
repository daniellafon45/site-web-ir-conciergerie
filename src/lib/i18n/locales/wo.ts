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

export const wo: Messages = {
  ...fr,
  meta: {
    ...fr.meta,
    homeTitle: "IR Conciergerie — Conciergerie ngir ñëw ci Kanadaa | Montréal, Toronto, Vancouver",
    homeDescription:
      "Ndimbal ngir installaade ci Kanadaa: wut kër, inspection, transfert aeroport ak jëf yi ñu bees. Montréal, Toronto ak Vancouver.",
    homeKeywords: "ñëw ci Kanadaa, conciergerie Kanadaa, transfert aeroport Montréal, IR Conciergerie",
    soumissionTitle: "Laaj offre — IR Conciergerie",
    soumissionDescription: "Am offre bu saafa ngir sa installation ci Kanadaa.",
  },
  nav: { services: "Serwiis yi", about: "Nu", contact: "Jëndal", cta: "Laaj offre", ctaShort: "Offre" },
  hero: { title: "Wut kër te installé ci Kanadaa, te doo ko def lépp sa bopp" },
  trust: ["Kumpaani", "Expatriés", "Étudiants yu aduna bi", "Waa kër", "Professionnels"],
  premium: {
    title: "Ndimbal bu dëgg ngir sa installation",
    subtitle: "Serwiis yu am solo ak yu accessibles, ci 80$ CAD + taxe rekk",
    requestQuote: "Laaj offre",
    arrival: "Ñëw",
    arrivalSign: "Ñëw",
    arrivalImageAlt: "Panneau Ñëw ci aéroport bi",
    assistance: "Ndimbal",
    supportTitle: "Ndimbal Client",
    support247: "Am na 24/7",
    secureTransport: "Transfert bu am kool",
    guaranteedInspection: "Kër bu xoolaat bu bañ signature",
    testimonialName: "Marie L.",
    testimonialText: "Nu gisoon kër wi ci kàddu gu amul stress.",
  },
  manifesto:
    "Wut kër, signature contrat ci distance ak def lépp ci sa installation ci Kanadaa dafa metti bu ñëwee ci réew wu wuute. IR Conciergerie di la accompagner ci solo, etape ci etape.",
  pillars: {
    sectionTitle: "Etape yi metti,\nnu ngi leen def.",
    pillars: [
      {
        title: "Ñëw bu amul improvisation",
        desc: "Dagg ci dëkk bu nga xamul, amul adresse walla repère, dafa metti. Nu ngi la moom ci aeroport te nu la yóbb ci kër gi walla hébergement bu moytu.",
        cardTitle: "Sa ñëw",
        items: [
          { icon: "flight_land", label: "Accueil_Aéroport", pitch: "Kenn dafa la xaar ci sortie bi ngir la accompagner bu ñëw bi." },
          { icon: "directions_car", label: "Transfert_Direct", pitch: "Ci aeroport ba adresse bi, amul navigation bu metti." },
          { icon: "luggage", label: "Gestion_Bagages", pitch: "Sa valise yi ñu ngi leen def ngir bés bu jëkk bi gën a yomb." },
          { icon: "key", label: "Remise_des_Clés", pitch: "Accès ci kër gi organisé, pare bu ñëw bi." },
        ],
      },
      {
        title: "Wut kër, te doo ñàkk ay ayu-bis",
        desc: "Marché bi metti, visites yi néew, signature ci distance dafa riské. Dinañu wut la, visité ak xool bu bañ sa dem.",
        cardTitle: "Dossier Logement",
        items: [
          { icon: "home_work", label: "Recherche_Active", pitch: "Nu filtre annonces yi selon sa budget, quartier ak bés ñëw bi." },
          { icon: "fact_check", label: "Visite_Vérifiée", pitch: "Nu gis problèmes yi bu bañ signature bail bi." },
          { icon: "description", label: "Signature_Bail", pitch: "Négociation ak signature bail bi ñu ngi ko def la." },
          { icon: "chair", label: "Ameublement", pitch: "Kër bu am meuble ak équipé, pare bu ñëw bi." },
        ],
      },
      {
        title: "Sa démarches yu bés bu nekk, yombal",
        desc: "Banque, courant, internet, assurance : démarches yii dañu koy bloquer ñu bees ñëw. Dinañu la accompagner ngir lépp a nekk ci place bu gaaw.",
        cardTitle: "Démarches Administratives",
        items: [
          { icon: "account_balance", label: "Compte_Bancaire", pitch: "Ouverture compte yomb ci partenaires yi." },
          { icon: "bolt", label: "Services_Publics", pitch: "Courant, gaz ak ndox activés bu bañ dem bi." },
          { icon: "wifi", label: "Internet_Téléphonie", pitch: "Forfaits internet ak mobile souscrits ak installés." },
          { icon: "health_and_safety", label: "Assurance_Santé", pitch: "Couverture santé adaptée, mise en place bu gaaw." },
        ],
      },
    ],
  },
  services: {
    sectionTitle: "Sunu serwiis ngir sa installation.",
    cards: [
      { id: "service-transfert-aeroport", title: "Transfert aeroport", desc: "Accueil ci aeroport ak trajet direct ci kër gi walla hébergement." },
      { id: "service-recherche-logement", title: "Wut kër", desc: "Dinañu wut la ci marché bu metti, selon sa budget ak critères yi." },
      { id: "service-inspection", title: "Inspection détaillée sa kër", desc: "Nu xool état kër gi bu bañ signature, ngir amul mauvaises surprises." },
      { id: "service-installation", title: "Installation complète", desc: "Abonnements, services essentiels ak meubles pare bu ñëw bi." },
    ],
  },
  about: {
    label: "Sunu Xibaar",
    title: "Nu ngi leen jële etape yii laata la",
    body: "Bu nu ñëw ci Kanadaa, nu ngi jële obstacles yu mel ni : dagg ci kàddu gu amul repère, wut kër ci marché bu metti, te def démarches moy-moy — banque, courant, internet — te xamul fu nga tàmbalee. Ci lieu bi nu bàyyi ñeneen def ko boppam, nu sos IR Conciergerie : accompagnement bu ñu xalaat ko ñi mu ngi jële yoon wi, ci accueil aeroport ba sa installation.",
    immigration: "Danga soxla ndimbal ci immigration ? Jëndal sunu département :",
  },
  testimonial: {
    quote:
      "IR Conciergerie soppi stress bi ci sunu dem ci aduna bi ci expérience bu sedd ak bu am kool. Serwiis bu gëna rafet.",
    name: "Jean-François M.",
    role: "Directeur Exécutif, Dem ci Montréal",
  },
  homeFaq: HOME_FAQ_FR,
  cta: {
    title: "Pare nga ngir planifie sa ñëw ?",
    body: "Jëndal nu ngir évaluation bu saafa ci sa besoin.",
    button: "Laaj offre",
  },
  privacy: PRIVACY_BANNERS.wo,
  privacyPolicy: getPrivacyPolicyForLocale("wo"),
  termsOfUse: getTermsOfUseForLocale("wo"),
  footer: {
    ...fr.footer,
    tagline: "Sa partner bu am kool ngir installation bu sedd ci Kanadaa.",
    rights: "© 2026 IR Conciergerie. Yépp a ngi am droit.",
    links: { ...fr.footer.links, privacy: FOOTER_PRIVACY.wo, terms: FOOTER_TERMS.wo, blog: FOOTER_BLOG.wo },
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
    consentLabel: PRIVACY_CONSENT.wo.consentLabel,
    consentRequired: PRIVACY_CONSENT.wo.consentRequired,
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
