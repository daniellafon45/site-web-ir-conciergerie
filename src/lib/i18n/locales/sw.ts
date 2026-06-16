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

export const sw: Messages = {
  ...fr,
  meta: {
    ...fr.meta,
    homeTitle: "IR Conciergerie — Huduma ya uhamiaji Canada | Montreal, Toronto, Vancouver",
    homeDescription:
      "Msaada wa kuhamia Canada: utafutaji wa nyumba, ukaguzi, usafiri wa uwanja wa ndege na taratibu za wapya. Montreal, Toronto na Vancouver.",
    homeKeywords: "uhamiaji Canada, concierge Canada, usafiri uwanja Montreal, IR Conciergerie",
    soumissionTitle: "Omba bei — IR Conciergerie",
    soumissionDescription: "Pata bei maalum kwa kuhamia Canada.",
  },
  nav: { services: "Huduma", about: "Kuhusu", contact: "Wasiliana", cta: "Omba bei", ctaShort: "Bei" },
  hero: { title: "Pata nyumba na uhamie Canada bila kufanya kila kitu peke yako" },
  trust: ["Biashara", "Wahamiaji", "Wanafunzi wa Kimataifa", "Familia", "Wataalamu"],
  premium: {
    title: "Msaada halisi wa kuhamia",
    subtitle: "Huduma muhimu na za bei nafuu, kuanzia $80 CAD + kodi",
    requestQuote: "Omba bei",
    arrival: "Kuwasili",
    arrivalSign: "Kuwasili",
    arrivalImageAlt: "Bango la Kuwasili uwanjani",
    assistance: "Msaada",
    supportTitle: "Msaada kwa Wateja",
    support247: "Inapatikana 24/7",
    secureTransport: "Usafiri wa kuaminika",
    guaranteedInspection: "Nyumba iliyokaguliwa kabla ya kusaini",
    testimonialName: "Marie L.",
    testimonialText: "Tulipata nyumba bila msongo.",
  },
  manifesto:
    "Kupata nyumba, kusaini mkataba kwa mbali na kushughulikia hatua zote za kuhamia Canada ni ngumu unapokuja kutoka nje. IR Conciergerie inakuongoza kwa vitendo, hatua kwa hatua.",
  pillars: {
    sectionTitle: "Hatua ngumu,\ntunazishughulikia.",
    pillars: [
      {
        title: "Kuwasili bila kubahatisha",
        desc: "Kushuka katika mji usioujua, bila anwani wala alama, ni stress. Tunakupokea uwanjani na kukupeleka moja kwa moja nyumbani au makazi ya muda.",
        cardTitle: "Kuwasili kwako",
        items: [
          { icon: "flight_land", label: "Karibu_Uwanja", pitch: "Mtu anakusubiri mlangoni akuongoze mara unaposhuka." },
          { icon: "directions_car", label: "Usafiri_Moja_kwa_Moja", pitch: "Kutoka uwanjani hadi anwani yako, bila urambazaji mgumu." },
          { icon: "luggage", label: "Mizigo", pitch: "Mizigo yako inashughulikiwa kwa siku ya kwanza rahisi." },
          { icon: "key", label: "Utoaji_Funguo", pitch: "Ufikiaji wa nyumba yako umeandaliwa, tayari unapofika." },
        ],
      },
      {
        title: "Kupata nyumba bila kupoteza wiki",
        desc: "Soko ni gumu, ziara ni chache na kusaini kwa mbali ni hatari. Tunatafuta kwa ajili yako, tunatembelea na kuthibitisha kabla ya kuhamia.",
        cardTitle: "Faili la Nyumba",
        items: [
          { icon: "home_work", label: "Utafutaji_Aktifu", pitch: "Tunachuja matangazo kulingana na bajeti, eneo na tarehe ya kuwasili." },
          { icon: "fact_check", label: "Ziara_Iliyothibitishwa", pitch: "Tunagundua matatizo kabla ya kusaini mkataba." },
          { icon: "description", label: "Kusaini_Mkataba", pitch: "Mazungumzo na kusaini mkataba tunashughulikia kwa ajili yako." },
          { icon: "chair", label: "Samani", pitch: "Nyumba iliyopangwa na kuandaliwa, tayari unapofika." },
        ],
      },
      {
        title: "Taratibu zako za kila siku, zimerahisishwa",
        desc: "Benki, umeme, intaneti, bima: hatua hizi mara nyingi huwazuia wapya. Tunakuongoza ili kila kitu kiwe tayari haraka.",
        cardTitle: "Hatua za Kiutawala",
        items: [
          { icon: "account_balance", label: "Akaunti_Benki", pitch: "Kufungua akaunti ni rahisi kupitia washirika wetu wa benki." },
          { icon: "bolt", label: "Huduma_Za_Umma", pitch: "Umeme, gesi na maji yamewashwa kabla ya kuhamia." },
          { icon: "wifi", label: "Intaneti_Simu", pitch: "Vifurushi vya intaneti na simu vimeandaliwa na kusakinishwa." },
          { icon: "health_and_safety", label: "Bima_ya_Afya", pitch: "Bima ya afya inayofaa, inawekwa haraka." },
        ],
      },
    ],
  },
  services: {
    sectionTitle: "Huduma zetu za kuhamia.",
    cards: [
      { id: "service-transfert-aeroport", title: "Usafiri wa uwanja wa ndege", desc: "Kukaribishwa uwanjani na safari moja kwa moja hadi nyumbani au makazi." },
      { id: "service-recherche-logement", title: "Utafutaji wa nyumba", desc: "Tunatafuta kwa ajili yako katika soko gumu, kulingana na bajeti na vigezo vyako." },
      { id: "service-inspection", title: "Ukaguzi wa kina wa nyumba yako", desc: "Tunathibitisha hali ya nyumba kabla ya kusaini, ili kuepuka mshangao mbaya." },
      { id: "service-installation", title: "Usanidi kamili", desc: "Usajili, huduma muhimu na samani tayari kabla ya kuwasili kwako." },
    ],
  },
  about: {
    label: "Hadithi Yetu",
    title: "Tumepitia hatua hizi kabla yako",
    body: "Tulipofika Canada, tulikumbana na vizuizi vile vile: kushuka bila alama, kutafuta nyumba katika soko gumu, na kufuata hatua moja baada ya nyingine — benki, umeme, intaneti — bila kujua pa kuanzia. Badala ya kuwaacha wengine wakabiliane peke yao, tuliunda IR Conciergerie: msaada ulioundwa na watu waliopitia hapo, kutoka kukaribishwa uwanjani hadi kuhamia kwako.",
    immigration: "Unahitaji msaada wa uhamiaji? Wasiliana na idara yetu:",
  },
  testimonial: {
    quote:
      "IR Conciergerie ilibadilisha msongo wa kuhamia kwetu kimataifa kuwa uzoefu laini na wa kutuliza. Huduma ya kweli bora.",
    name: "Jean-François M.",
    role: "Mkurugenzi Mtendaji, Alihamia Montreal",
  },
  homeFaq: HOME_FAQ_FR,
  cta: {
    title: "Uko tayari kupanga kuwasili kwako?",
    body: "Wasiliana nasi kwa tathmini maalum ya mahitaji yako.",
    button: "Omba bei",
  },
  privacy: PRIVACY_BANNERS.sw,
  privacyPolicy: getPrivacyPolicyForLocale("sw"),
  termsOfUse: getTermsOfUseForLocale("sw"),
  footer: {
    ...fr.footer,
    tagline: "Mshirika wako wa kuaminika kwa uhamiaji wa amani Canada.",
    rights: "© 2026 IR Conciergerie. Haki zote zimehifadhiwa.",
    links: { ...fr.footer.links, privacy: FOOTER_PRIVACY.sw, terms: FOOTER_TERMS.sw, blog: FOOTER_BLOG.sw },
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
    consentLabel: PRIVACY_CONSENT.sw.consentLabel,
    consentRequired: PRIVACY_CONSENT.sw.consentRequired,
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
