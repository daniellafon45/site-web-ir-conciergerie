import { Link } from "@tanstack/react-router";

import { RentalPlatformLinks } from "@/components/RentalPlatformLinks";
import { SeoHead } from "@/components/SeoHead";
import { SiteFloatingNav } from "@/components/SiteFloatingNav";
import { getPostBySlug } from "@/lib/blog/posts";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { getAlternateServicePage, getServicePageBySlug } from "@/lib/services/pages";
import { getServiceUi } from "@/lib/services/service-i18n";
import type { ServicePage } from "@/lib/services/types";

type ServiceLandingPageProps = {
  page: ServicePage;
};

export function ServiceLandingPage({ page }: ServiceLandingPageProps) {
  const { locale } = useI18n();
  const ui = getServiceUi(locale);
  const alternate = getAlternateServicePage(page);
  const canonicalPath = `/services/${page.slug}`;

  const showLangBanner =
    locale !== "fr" && locale !== "en" && alternate && (page.locale === "fr" || page.locale === "en");

  return (
    <div className="min-h-screen bg-white text-text">
      <SeoHead
        title={`${page.title} — IR Conciergerie`}
        description={page.metaDescription}
        canonicalPath={canonicalPath}
        ogType="website"
      />
      <SiteFloatingNav />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-8 sm:pb-12">
        <Link
          to="/services"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-brand-primary transition-colors mb-8"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          {ui.backToServices}
        </Link>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[32px] text-brand-primary">{page.heroIcon}</span>
          </div>
          <p className="text-sm font-semibold text-brand-primary uppercase tracking-wider">{ui.fromPrice}</p>
        </div>

        {showLangBanner && alternate && (
          <p className="text-sm text-muted border border-line/40 rounded-xl bg-soft-card px-4 py-3 mb-6">
            {page.locale === "fr" ? ui.availableInEn : ui.availableInFr}{" "}
            <Link
              to="/services/$slug"
              params={{ slug: alternate.slug }}
              className="font-semibold text-brand-primary hover:underline"
            >
              {alternate.locale === "fr" ? ui.readInFr : ui.readInEn}
            </Link>
          </p>
        )}

        {locale === "fr" && page.locale === "en" && alternate && (
          <p className="text-sm text-muted mb-6">
            {ui.availableInFr}{" "}
            <Link to="/services/$slug" params={{ slug: alternate.slug }} className="text-brand-primary font-semibold hover:underline">
              {ui.readInFr}
            </Link>
          </p>
        )}
        {locale === "en" && page.locale === "fr" && alternate && (
          <p className="text-sm text-muted mb-6">
            {ui.availableInEn}{" "}
            <Link to="/services/$slug" params={{ slug: alternate.slug }} className="text-brand-primary font-semibold hover:underline">
              {ui.readInEn}
            </Link>
          </p>
        )}

        <h1 className="text-3xl sm:text-4xl md:text-[44px] font-bold tracking-tight leading-[1.1] mb-6">
          {page.title}
        </h1>
        <p className="text-lg text-muted leading-relaxed mb-10">{page.lead}</p>

        {page.pageType === "comparison" && page.comparisonRows && (
          <div className="overflow-x-auto mb-12 rounded-2xl border border-line/40">
            <table className="w-full text-sm text-left min-w-[520px]">
              <thead>
                <tr className="bg-soft-card border-b border-line/40">
                  <th className="px-4 py-3 font-semibold">{ui.comparisonAspect}</th>
                  <th className="px-4 py-3 font-semibold">{ui.comparisonAlone}</th>
                  <th className="px-4 py-3 font-semibold text-brand-primary">{ui.comparisonConcierge}</th>
                </tr>
              </thead>
              <tbody>
                {page.comparisonRows.map((row) => (
                  <tr key={row.aspect} className="border-b border-line/30 last:border-0">
                    <td className="px-4 py-3 font-medium align-top">{row.aspect}</td>
                    <td className="px-4 py-3 text-muted align-top">{row.alone}</td>
                    <td className="px-4 py-3 align-top">{row.concierge}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <article className="prose-service space-y-10">
          {page.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-4">{section.heading}</h2>
              {section.paragraphs.map((p) => (
                <p key={p.slice(0, 40)} className="text-muted leading-relaxed mb-4 last:mb-0">
                  <RentalPlatformLinks text={p} locale={page.locale} />
                </p>
              ))}
              {section.list && (
                <ul className="mt-4 space-y-2">
                  {section.list.map((item) => (
                    <li key={item} className="flex gap-2 text-muted leading-relaxed">
                      <span className="material-symbols-outlined text-brand-primary text-[18px] shrink-0 mt-0.5">
                        check_circle
                      </span>
                      <RentalPlatformLinks text={item} locale={page.locale} />
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </article>

        {page.faq.length > 0 && (
          <section className="mt-14 pt-10 border-t border-line/40">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-6">{ui.faqTitle}</h2>
            <div className="space-y-6">
              {page.faq.map((item) => (
                <div key={item.question}>
                  <h3 className="font-semibold mb-2">{item.question}</h3>
                  <p className="text-muted leading-relaxed">
                    <RentalPlatformLinks text={item.answer} locale={page.locale} />
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {page.relatedSlugs.length > 0 && (
          <section className="mt-14">
            <h2 className="text-lg font-bold mb-4">{ui.relatedTitle}</h2>
            <div className="flex flex-wrap gap-2">
              {page.relatedSlugs.map((slug) => {
                const related = getServicePageBySlug(slug);
                if (!related || related.locale !== page.locale) return null;
                return (
                  <Link
                    key={slug}
                    to="/services/$slug"
                    params={{ slug }}
                    className="inline-flex items-center gap-1 rounded-full border border-line/60 px-4 py-2 text-sm font-medium hover:border-brand-primary hover:text-brand-primary transition"
                  >
                    {related.title.split(":")[0]}
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {page.relatedBlogSlugs && page.relatedBlogSlugs.length > 0 && (
          <section className="mt-10">
            <h2 className="text-lg font-bold mb-4">{ui.relatedBlogTitle}</h2>
            <div className="flex flex-wrap gap-2">
              {page.relatedBlogSlugs.map((slug) => {
                const post = getPostBySlug(slug);
                if (!post || post.locale !== page.locale) return null;
                return (
                  <Link
                    key={slug}
                    to="/blog/$slug"
                    params={{ slug }}
                    className="inline-flex items-center gap-1 rounded-full bg-soft-card border border-line/40 px-4 py-2 text-sm font-medium hover:border-brand-primary hover:text-brand-primary transition"
                  >
                    {post.title.length > 48 ? `${post.title.slice(0, 48)}…` : post.title}
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        <section className="mt-14 p-8 rounded-2xl bg-brand-primary/5 border border-brand-primary/20 text-center">
          <h2 className="text-xl font-bold mb-3">{ui.ctaTitle}</h2>
          <p className="text-muted mb-6 max-w-lg mx-auto">{ui.ctaBody}</p>
          <Link
            to="/soumission"
            className="inline-flex items-center gap-2 bg-brand-primary text-white rounded-full px-8 py-3.5 text-[12px] font-bold uppercase tracking-wider hover:bg-brand-primary/90 shadow-md transition"
          >
            {ui.ctaButton}
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </section>
      </main>
    </div>
  );
}
