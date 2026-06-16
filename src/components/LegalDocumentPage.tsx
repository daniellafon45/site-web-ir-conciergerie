import { Link } from "@tanstack/react-router";

import { SeoHead } from "@/components/SeoHead";
import { SiteFloatingNav } from "@/components/SiteFloatingNav";
import { LEGAL_RELATED_UI } from "@/lib/i18n/privacy-i18n";
import type { PrivacyPolicy } from "@/lib/i18n/types";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { buildLegalWebPageJsonLd, ORGANIZATION, SITE_URL } from "@/lib/seo";

type LegalDocumentPageProps = {
  document: PrivacyPolicy;
  canonicalPath: "/confidentialite" | "/conditions-utilisation";
};

function localeToSchemaLanguage(locale: string) {
  if (locale === "fr") return "fr-CA";
  if (locale === "en") return "en-CA";
  if (locale === "zh") return "zh-Hans";
  return locale;
}

export function LegalDocumentPage({ document, canonicalPath }: LegalDocumentPageProps) {
  const { t, locale } = useI18n();
  const seoTitle = `${document.pageTitle} — IR Conciergerie`;
  const canonicalUrl = `${SITE_URL}${canonicalPath}${locale !== "fr" ? `?lang=${locale}` : ""}`;
  const relatedUi = LEGAL_RELATED_UI[locale];
  const isPrivacyPage = canonicalPath === "/confidentialite";

  const webPageSchema = buildLegalWebPageJsonLd({
    name: seoTitle,
    description: document.metaDescription,
    url: canonicalUrl,
    inLanguage: localeToSchemaLanguage(locale),
    dateModified: document.dateModifiedIso,
    about: isPrivacyPage
      ? locale === "en"
        ? "Personal information protection — Quebec Law 25"
        : "Protection des renseignements personnels — Loi 25 (Québec)"
      : undefined,
  });

  return (
    <div className="min-h-screen bg-white text-text">
      <SeoHead
        title={seoTitle}
        description={document.metaDescription}
        canonicalPath={canonicalPath}
        ogImage={ORGANIZATION.logo}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <SiteFloatingNav />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-12 sm:pb-16">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">{document.pageTitle}</h1>

        {document.intro && (
          <p className="text-muted leading-relaxed mb-4">{document.intro}</p>
        )}

        <p className="text-sm text-muted mb-8">
          {document.lastUpdatedLabel} : {document.lastUpdatedDate}
        </p>

        {document.legalNotice && (
          <p className="text-sm text-muted border border-line/40 rounded-xl bg-soft-card px-4 py-3 mb-8">
            {document.legalNotice}
          </p>
        )}

        <div className="space-y-10">
          {document.sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-lg font-bold mb-3">{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="text-muted leading-relaxed mb-3">
                  {paragraph}
                </p>
              ))}
              {section.list && (
                <ul className="list-disc pl-5 space-y-2 text-muted leading-relaxed">
                  {section.list.map((item) => (
                    <li key={item.slice(0, 40)}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <nav
          aria-label={relatedUi.relatedPagesTitle}
          className="mt-10 pt-8 border-t border-line/40"
        >
          <p className="text-sm font-semibold text-text mb-3">{relatedUi.relatedPagesTitle}</p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/soumission"
                className="text-brand-primary hover:text-brand-primary/80 underline underline-offset-2 transition-colors"
              >
                {t.nav.cta}
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className="text-brand-primary hover:text-brand-primary/80 underline underline-offset-2 transition-colors"
              >
                {relatedUi.blogLink}
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="text-brand-primary hover:text-brand-primary/80 underline underline-offset-2 transition-colors"
              >
                {relatedUi.servicesLink}
              </Link>
            </li>
            <li>
              <Link
                to={isPrivacyPage ? "/conditions-utilisation" : "/confidentialite"}
                className="text-brand-primary hover:text-brand-primary/80 underline underline-offset-2 transition-colors"
              >
                {isPrivacyPage ? t.footer.links.terms : t.footer.links.privacy}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:text-brand-primary/80 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            {t.common.goHome}
          </Link>
        </div>
      </main>
    </div>
  );
}
