import { useEffect } from "react";

import { useI18n } from "@/lib/i18n/I18nProvider";
import { SITE_URL } from "@/lib/seo";

type SeoHeadProps = {
  page?: "home" | "soumission";
};

export function SeoHead({ page = "home" }: SeoHeadProps) {
  const { t, locale } = useI18n();

  useEffect(() => {
    const title = page === "soumission" ? t.meta.soumissionTitle : t.meta.homeTitle;
    const description = page === "soumission" ? t.meta.soumissionDescription : t.meta.homeDescription;
    const path = page === "soumission" ? "/soumission" : "/";
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
    setMeta("keywords", t.meta.homeKeywords);
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:type", "website", true);
    setMeta("og:url", canonical, true);
    setMeta("og:locale", locale === "fr" ? "fr_CA" : locale === "en" ? "en_CA" : locale, true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);

    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = canonical;
  }, [t, locale, page]);

  return null;
}
