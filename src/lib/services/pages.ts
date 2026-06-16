import type { ServiceLocale, ServicePage } from "./types";
import { SERVICE_PAGES } from "./content/pages";

const bySlug = new Map(SERVICE_PAGES.map((p) => [p.slug, p]));

export function getAllServicePages(): ServicePage[] {
  return SERVICE_PAGES;
}

export function getServicePageBySlug(slug: string): ServicePage | undefined {
  return bySlug.get(slug);
}

export function getAlternateServicePage(page: ServicePage): ServicePage | undefined {
  return bySlug.get(page.alternateSlug);
}

export function getServicePagesForListing(locale: ServiceLocale): ServicePage[] {
  return SERVICE_PAGES.filter((p) => p.locale === locale && p.pageType === "service");
}

export function getFeaturedComparison(locale: ServiceLocale): ServicePage | undefined {
  const slug = locale === "fr" ? "conciergerie-vs-seul" : "concierge-vs-diy";
  return bySlug.get(slug);
}

export function resolveServiceSlugForLocale(slug: string, locale: ServiceLocale): string {
  const page = bySlug.get(slug);
  if (!page) return slug;
  if (page.locale === locale) return slug;
  const alternate = bySlug.get(page.alternateSlug);
  return alternate?.locale === locale ? alternate.slug : slug;
}

export function estimateServiceWordCount(page: ServicePage): number {
  const text = [
    page.lead,
    ...page.sections.flatMap((s) => [...s.paragraphs, ...(s.list ?? [])]),
    ...(page.comparisonRows?.flatMap((r) => [r.aspect, r.alone, r.concierge]) ?? []),
    ...page.faq.flatMap((f) => [f.question, f.answer]),
  ].join(" ");
  return text.split(/\s+/).filter(Boolean).length;
}
