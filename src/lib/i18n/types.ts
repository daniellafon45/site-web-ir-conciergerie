export const LOCALES = ["fr", "en", "es", "pt", "ht", "zh", "ar", "ln", "sw", "wo", "ff"] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_LABELS: Record<Locale, string> = {
  fr: "Français",
  en: "English",
  es: "Español",
  pt: "Português",
  ht: "Kreyòl",
  zh: "中文 (Mandarin)",
  ar: "العربية",
  ln: "Lingala",
  sw: "Kiswahili",
  wo: "Wolof",
  ff: "Pular / Peulh",
};

export const LOCALE_HTML_LANG: Record<Locale, string> = {
  fr: "fr",
  en: "en",
  es: "es",
  pt: "pt",
  ht: "ht",
  zh: "zh-Hans",
  ar: "ar",
  ln: "ln",
  sw: "sw",
  wo: "wo",
  ff: "ff",
};

export type PillarItem = {
  icon: string;
  label: string;
  pitch: string;
};

export type Pillar = {
  title: string;
  desc: string;
  cardTitle: string;
  items: PillarItem[];
};

export type ServiceCard = {
  id: string;
  title: string;
  desc: string;
};

export type ServiceOption = {
  id: string;
  title: string;
  desc: string;
};

export type HomeFaqItem = {
  question: string;
  answer: string;
};

export type PrivacyPolicySection = {
  title: string;
  paragraphs: string[];
  list?: string[];
};

export type PrivacyPolicy = {
  pageTitle: string;
  metaDescription: string;
  intro?: string;
  lastUpdatedLabel: string;
  lastUpdatedDate: string;
  dateModifiedIso?: string;
  legalNotice?: string;
  sections: PrivacyPolicySection[];
};

export type Messages = {
  meta: {
    siteName: string;
    homeTitle: string;
    homeDescription: string;
    homeKeywords: string;
    soumissionTitle: string;
    soumissionDescription: string;
  };
  nav: {
    services: string;
    about: string;
    contact: string;
    cta: string;
    ctaShort: string;
  };
  hero: {
    title: string;
  };
  trust: string[];
  premium: {
    title: string;
    subtitle: string;
    requestQuote: string;
    arrival: string;
    arrivalSign: string;
    arrivalImageAlt: string;
    assistance: string;
    supportTitle: string;
    support247: string;
    secureTransport: string;
    guaranteedInspection: string;
    testimonialName: string;
    testimonialText: string;
  };
  manifesto: string;
  pillars: {
    sectionTitle: string;
    pillars: Pillar[];
  };
  services: {
    sectionTitle: string;
    cards: ServiceCard[];
  };
  about: {
    label: string;
    title: string;
    body: string;
    immigration: string;
  };
  testimonial: {
    quote: string;
    name: string;
    role: string;
  };
  homeFaq: {
    title: string;
    subtitle: string;
    guideLink: string;
    items: HomeFaqItem[];
  };
  cta: {
    title: string;
    body: string;
    button: string;
  };
  privacy: {
    bannerTitle: string;
    bannerBody: string;
    acknowledge: string;
    learnMore: string;
    ariaLabel: string;
  };
  privacyPolicy: PrivacyPolicy;
  termsOfUse: PrivacyPolicy;
  footer: {
    tagline: string;
    services: string;
    company: string;
    contact: string;
    links: {
      airport: string;
      housing: string;
      inspection: string;
      admin: string;
      about: string;
      contact: string;
      privacy: string;
      terms: string;
      blog: string;
    };
    irConciergerie: string;
    irImmigration: string;
    irRecruitment: string;
    cities: string;
    rights: string;
  };
  soumission: {
    pageTitle: string;
    stepOf: string;
    steps: [string, string, string];
    step0Title: string;
    step0Desc: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    arrival: string;
    city: string;
    people: string;
    notes: string;
    notesPlaceholder: string;
    selectedServices: string;
    previous: string;
    continue: string;
    submit: string;
    submitting: string;
    thankYou: string;
    thankYouBody: string;
    backHome: string;
    consentLabel: string;
    consentRequired: string;
    errors: {
      validation: string;
      smtpConfig: string;
      smtpSendDev: string;
      generic: string;
      email: string;
      network: string;
    };
    services: ServiceOption[];
  };
  common: {
    notFoundTitle: string;
    notFoundBody: string;
    goHome: string;
    errorTitle: string;
    errorBody: string;
    tryAgain: string;
  };
};
