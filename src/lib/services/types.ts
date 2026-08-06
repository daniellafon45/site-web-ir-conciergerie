import type { ServiceId } from "@/lib/soumission.constants";

export type ServiceLocale = "fr" | "en";

export type ServiceFaqItem = {
  question: string;
  answer: string;
};

export type ServiceSection = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
};

export type ComparisonRow = {
  aspect: string;
  alone: string;
  concierge: string;
};

export type ServicePage = {
  slug: string;
  locale: ServiceLocale;
  alternateSlug: string;
  serviceId?: ServiceId;
  pageType: "service" | "comparison";
  title: string;
  metaDescription: string;
  heroIcon: string;
  primaryKeyword: string;
  lead: string;
  sections: ServiceSection[];
  faq: ServiceFaqItem[];
  comparisonRows?: ComparisonRow[];
  relatedSlugs: string[];
  relatedBlogSlugs?: string[];
};
