export type BlogLocale = "fr" | "en";

export type BlogImageKey =
  | "guide-canada"
  | "montreal-abroad"
  | "montreal-comparison"
  | "montreal-moving"
  | "bank-account"
  | "immigration-services"
  | "toronto"
  | "vancouver"
  | "housing-search";

export type BlogSection = {
  heading: string;
  paragraphs: string[];
  list?: string[];
};

export type BlogFaqItem = {
  question: string;
  answer: string;
};

export type BlogPost = {
  slug: string;
  locale: BlogLocale;
  alternateSlug: string;
  title: string;
  metaDescription: string;
  excerpt: string;
  category: string;
  readingMinutes: number;
  publishedAt: string;
  imageKey: BlogImageKey;
  heroImageAlt: string;
  lead: string;
  sections: BlogSection[];
  faq: BlogFaqItem[];
  primaryKeyword: string;
  relatedSlugs: string[];
};
