export const SITE_URL = "https://conciergerie.ir-immigration.com";

const ORG_ID = `${SITE_URL}/#organization`;
const LOCAL_BUSINESS_ID = `${SITE_URL}/#localbusiness`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export const ORGANIZATION = {
  name: "IR Conciergerie",
  legalName: "IR Conciergerie",
  url: SITE_URL,
  logo: `${SITE_URL}/assets/logo-ir-conciergerie-D0eG8BhH.png`,
  email: "conciergerie@ir-immigration.com",
  areaServed: ["Montreal", "Toronto", "Vancouver", "Quebec", "Canada"],
  sameAs: ["https://ir-immigration.com"],
};

const ORG_DESCRIPTION =
  "Aide à l'installation au Canada : recherche de logement, inspection, transfert aéroport et démarches pour nouveaux arrivants à Montréal, Toronto et Vancouver.";

export function buildOrganizationJsonLd() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: ORGANIZATION.name,
    legalName: ORGANIZATION.legalName,
    url: ORGANIZATION.url,
    logo: ORGANIZATION.logo,
    image: ORGANIZATION.logo,
    description: ORG_DESCRIPTION,
    email: ORGANIZATION.email,
    contactPoint: {
      "@type": "ContactPoint",
      email: ORGANIZATION.email,
      contactType: "customer service",
      areaServed: "CA",
      availableLanguage: ["fr", "en", "es", "pt", "ht", "zh", "ar", "ln", "sw", "wo", "ff"],
    },
    sameAs: ORGANIZATION.sameAs,
  };
}

export function buildLocalBusinessJsonLd() {
  return {
    "@type": "ProfessionalService",
    "@id": LOCAL_BUSINESS_ID,
    name: ORGANIZATION.name,
    url: ORGANIZATION.url,
    logo: ORGANIZATION.logo,
    image: ORGANIZATION.logo,
    email: ORGANIZATION.email,
    description: ORG_DESCRIPTION,
    parentOrganization: { "@id": ORG_ID },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Montréal",
      addressRegion: "QC",
      addressCountry: "CA",
    },
    areaServed: ORGANIZATION.areaServed.map((city) => ({
      "@type": "City",
      name: city,
    })),
    serviceType: [
      "Transfert aéroport",
      "Recherche de logement",
      "Inspection de logement",
      "Installation complète",
      "Services d'établissement au Canada",
    ],
    priceRange: "$$",
    knowsLanguage: ["fr", "en", "es", "pt", "ht", "zh", "ar", "ln", "sw", "wo", "ff"],
    sameAs: ORGANIZATION.sameAs,
  };
}

export function buildWebSiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: ORGANIZATION.name,
    description:
      "Service de conciergerie pour votre arrivée et installation au Canada. Demandez une soumission en ligne.",
    inLanguage: ["fr-CA", "en-CA", "es", "pt", "ht", "zh-Hans", "ar", "ln", "sw", "wo", "ff"],
    publisher: { "@id": ORG_ID },
  };
}

export function buildRootJsonLdGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [buildOrganizationJsonLd(), buildLocalBusinessJsonLd(), buildWebSiteJsonLd()],
  };
}

export type BlogPostingInput = {
  headline: string;
  description: string;
  datePublished: string;
  url: string;
  image: string;
  inLanguage: string;
  wordCount: number;
};

export function buildBlogPostingJsonLd(input: BlogPostingInput) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.headline,
    description: input.description,
    datePublished: input.datePublished,
    dateModified: input.datePublished,
    url: input.url,
    mainEntityOfPage: { "@type": "WebPage", "@id": input.url },
    image: input.image,
    inLanguage: input.inLanguage,
    wordCount: input.wordCount,
    author: {
      "@type": "Organization",
      name: ORGANIZATION.name,
      url: ORGANIZATION.url,
    },
    publisher: {
      "@type": "Organization",
      name: ORGANIZATION.name,
      logo: { "@type": "ImageObject", url: ORGANIZATION.logo },
    },
  };
}

export function buildLegalWebPageJsonLd(input: {
  name: string;
  description: string;
  url: string;
  inLanguage: string;
  dateModified?: string;
  about?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": input.url,
    name: input.name,
    description: input.description,
    url: input.url,
    inLanguage: input.inLanguage,
    ...(input.dateModified ? { dateModified: input.dateModified } : {}),
    isPartOf: { "@id": `${SITE_URL}/#website` },
    ...(input.about
      ? {
          about: {
            "@type": "Thing",
            name: input.about,
          },
        }
      : {}),
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function buildFaqJsonLd(faq: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export type BreadcrumbItem = {
  name: string;
  url?: string;
};

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  };
}

export type BlogListItemInput = {
  name: string;
  url: string;
};

export function buildBlogItemListJsonLd(items: BlogListItemInput[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

/** Alias used by service listing and other non-blog item lists. */
export const buildItemListJsonLd = buildBlogItemListJsonLd;

export type ServiceJsonLdInput = {
  name: string;
  description: string;
  url: string;
  serviceType: string;
};

export function buildServiceJsonLd(input: ServiceJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: input.url,
    serviceType: input.serviceType,
    provider: { "@id": ORG_ID },
    areaServed: ORGANIZATION.areaServed.map((city) => ({
      "@type": "City",
      name: city,
    })),
    offers: {
      "@type": "Offer",
      priceCurrency: "CAD",
      price: "80",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "CAD",
        minPrice: "80",
      },
    },
  };
}

export function buildArticlePageJsonLd(input: {
  post: BlogPostingInput;
  faq?: { question: string; answer: string }[];
  breadcrumbs: BreadcrumbItem[];
}) {
  const schemas: object[] = [
    buildBlogPostingJsonLd(input.post),
    buildBreadcrumbJsonLd(input.breadcrumbs),
  ];
  if (input.faq && input.faq.length > 0) {
    schemas.push(buildFaqJsonLd(input.faq));
  }
  return schemas;
}

/** TanStack Router head meta entries for SSR-friendly JSON-LD. */
export function ldJsonMeta(...schemas: object[]) {
  return schemas.map((schema) => ({ "script:ld+json": schema }) as const);
}
