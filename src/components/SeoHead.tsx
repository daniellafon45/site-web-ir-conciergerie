import { useEffect } from "react";

import { useI18n } from "@/lib/i18n/I18nProvider";
import { SITE_URL } from "@/lib/seo";

type CanonicalPath =
  | "/"
  | "/soumission"
  | "/confidentialite"
  | "/conditions-utilisation"
  | "/blog"
  | `/blog/${string}`
  | "/services"
  | `/services/${string}`;

type SeoHeadProps = {
  page?: "home" | "soumission";
  title?: string;
  description?: string;
  canonicalPath?: CanonicalPath;
  ogType?: "website" | "article";
  ogImage?: string;
};

export function SeoHead({
  page = "home",
  title: titleOverride,
  description: descriptionOverride,
  canonicalPath,
  ogType = "website",
  ogImage,
}: SeoHeadProps) {
  const { t, locale } = useI18n();

  useEffect(() => {
    const title = titleOverride ?? (page === "soumission" ? t.meta.soumissionTitle : t.meta.homeTitle);
    const description =
      descriptionOverride ?? (page === "soumission" ? t.meta.soumissionDescription : t.meta.homeDescription);
    const path =
      canonicalPath ??
      (page === "soumission" ? "/soumission" : titleOverride ? "/confidentialite" : "/");
    const canonical = `${SITE_URL}${path}${locale !== "fr" ? `?lang=${locale}` : ""}`;

    document.title = title;

    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description);
    if (!titleOverride) {
      setMeta("keywords", t.meta.homeKeywords);
    }
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:type", ogType, true);
    setMeta("og:url", canonical, true);
    setMeta("og:locale", locale === "fr" ? "fr_CA" : locale === "en" ? "en_CA" : locale, true);
    if (ogImage) {
      const imgUrl = ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`;
      setMeta("og:image", imgUrl, true);
      setMeta("twitter:image", imgUrl);
    }
    setMeta("twitter:card", ogImage ? "summary_large_image" : "summary");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);

    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = canonical;
  }, [t, locale, page, titleOverride, descriptionOverride, canonicalPath, ogType, ogImage]);

  return null;
}
