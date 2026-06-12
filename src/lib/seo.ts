export const SITE_URL = "https://conciergerie.ir-immigration.com";

export const ORGANIZATION = {
  name: "IR Conciergerie",
  legalName: "IR Conciergerie",
  url: SITE_URL,
  logo: `${SITE_URL}/assets/logo-ir-conciergerie-D0eG8BhH.png`,
  email: "conciergerie@ir-immigration.com",
  telephone: "+1-514-000-0000",
  areaServed: ["Montreal", "Toronto", "Vancouver", "Quebec", "Canada"],
  sameAs: ["https://ir-immigration.com"],
};

export function buildLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#organization`,
    name: ORGANIZATION.name,
    url: ORGANIZATION.url,
    logo: ORGANIZATION.logo,
    image: ORGANIZATION.logo,
    email: ORGANIZATION.email,
    description:
      "Conciergerie premium pour relocalisation au Canada : transfert aéroport, recherche de logement, inspection, installation et démarches administratives à Montréal, Toronto et Vancouver.",
    areaServed: ORGANIZATION.areaServed.map((city) => ({
      "@type": "City",
      name: city,
    })),
    serviceType: [
      "Airport transfer concierge",
      "Housing search Canada",
      "Relocation concierge",
      "Settlement services Canada",
    ],
    priceRange: "$$",
    knowsLanguage: ["fr", "en", "es", "zh", "ar", "ln", "sw", "wo"],
    sameAs: ORGANIZATION.sameAs,
  };
}

export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: ORGANIZATION.name,
    description:
      "Service de conciergerie pour votre arrivée et installation au Canada. Demandez une soumission en ligne.",
    inLanguage: ["fr-CA", "en-CA", "es", "zh-Hans", "ar", "ln", "sw", "wo"],
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/soumission`,
      "query-input": "required name=search_term_string",
    },
  };
}
