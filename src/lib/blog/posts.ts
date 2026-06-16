import type { BlogLocale, BlogPost } from "./types";

import { bankAccountNewcomers } from "./content/en/bank-account";
import { movingToCanadaGuide } from "./content/en/moving-to-canada";
import { movingToMontreal } from "./content/en/moving-to-montreal";
import { movingToToronto } from "./content/en/moving-to-toronto";
import { movingToVancouver } from "./content/en/moving-to-vancouver";
import { settlementServices } from "./content/en/settlement-services";
import { compteBancaire } from "./content/fr/compte-bancaire";
import { comparatifLogementMontreal } from "./content/fr/comparatif-logement-montreal";
import { demenagerMontreal } from "./content/fr/demenager-montreal";
import { demenagerToronto } from "./content/fr/demenager-toronto";
import { demenagerVancouver } from "./content/fr/demenager-vancouver";
import { guideInstallationCanada } from "./content/fr/guide-installation";
import { rechercheLogement } from "./content/fr/recherche-logement";
import { servicesImmigration } from "./content/fr/services-immigration";
import { trouverLogementMontrealEtranger } from "./content/fr/trouver-logement-montreal-etranger";
import { findHousingMontrealFromAbroad } from "./content/en/find-housing-montreal-from-abroad";
import { housingSearchNewcomers } from "./content/en/housing-search";
import { montrealHousingServicesComparison } from "./content/en/montreal-housing-services-comparison";

const ALL_POSTS: BlogPost[] = [
  trouverLogementMontrealEtranger,
  comparatifLogementMontreal,
  findHousingMontrealFromAbroad,
  montrealHousingServicesComparison,
  rechercheLogement,
  guideInstallationCanada,
  demenagerMontreal,
  compteBancaire,
  servicesImmigration,
  demenagerToronto,
  demenagerVancouver,
  movingToCanadaGuide,
  movingToMontreal,
  bankAccountNewcomers,
  settlementServices,
  movingToToronto,
  movingToVancouver,
  housingSearchNewcomers,
];

const bySlug = new Map(ALL_POSTS.map((p) => [p.slug, p]));

export function getAllPosts(): BlogPost[] {
  return ALL_POSTS;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return bySlug.get(slug);
}

export function getPostsForListing(locale: BlogLocale): BlogPost[] {
  return ALL_POSTS.filter((p) => p.locale === locale).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getFeaturedPosts(locale: BlogLocale, limit = 3): BlogPost[] {
  return getPostsForListing(locale).slice(0, limit);
}

export function getAlternatePost(post: BlogPost): BlogPost | undefined {
  return bySlug.get(post.alternateSlug);
}

export function formatBlogDate(isoDate: string, locale: BlogLocale): string {
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-CA" : "en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(isoDate + "T12:00:00"));
}

export function estimateWordCount(post: BlogPost): number {
  const text = [
    post.lead,
    ...post.sections.flatMap((s) => [...s.paragraphs, ...(s.list ?? [])]),
    ...post.faq.flatMap((f) => [f.question, f.answer]),
  ].join(" ");
  return text.split(/\s+/).filter(Boolean).length;
}
