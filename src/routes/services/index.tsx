import { createFileRoute, Link } from "@tanstack/react-router";

import { SeoHead } from "@/components/SeoHead";
import { SiteFloatingNav } from "@/components/SiteFloatingNav";
import { useI18n } from "@/lib/i18n/I18nProvider";
import {
  getFeaturedComparison,
  getServicePagesForListing,
} from "@/lib/services/pages";
import { getServiceUi } from "@/lib/services/service-i18n";
import { SITE_URL, buildBreadcrumbJsonLd, buildItemListJsonLd, ldJsonMeta } from "@/lib/seo";

export const Route = createFileRoute("/services/")({
  head: () => {
    const ui = getServiceUi("fr");
    const items = getServicePagesForListing("fr").map((p) => ({
      name: p.title,
      url: `${SITE_URL}/services/${p.slug}`,
    }));
    const jsonLd = [
      buildBreadcrumbJsonLd([
        { name: "Accueil", url: SITE_URL },
        { name: ui.heading },
      ]),
      buildItemListJsonLd(items),
    ];
    return {
      meta: [
        { title: ui.pageTitle },
        { name: "description", content: ui.metaDescription },
        { property: "og:title", content: ui.pageTitle },
        { property: "og:description", content: ui.metaDescription },
        ...ldJsonMeta(...jsonLd),
      ],
    };
  },
  component: ServicesIndexPage,
});

function ServicesIndexPage() {
  const { locale } = useI18n();
  const contentLocale = locale === "en" ? "en" : "fr";
  const ui = getServiceUi(locale);
  const pages = getServicePagesForListing(contentLocale);
  const comparison = getFeaturedComparison(contentLocale);

  return (
    <div className="min-h-screen bg-white text-text">
      <SeoHead title={ui.pageTitle} description={ui.metaDescription} canonicalPath="/services" />
      <SiteFloatingNav />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-16">
        <h1 className="text-3xl sm:text-4xl md:text-[48px] font-bold tracking-tight mb-4">{ui.heading}</h1>
        <p className="text-lg text-muted max-w-2xl mb-12">{ui.subtitle}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-14">
          {pages.map((page) => (
            <Link
              key={page.slug}
              to="/services/$slug"
              params={{ slug: page.slug }}
              className="group rounded-2xl border border-line/40 p-6 hover:border-brand-primary/40 hover:shadow-md transition"
            >
              <span className="material-symbols-outlined text-[32px] text-brand-primary mb-4 block">
                {page.heroIcon}
              </span>
              <h2 className="text-lg font-bold mb-2 group-hover:text-brand-primary transition-colors">
                {page.title.split(":")[0]}
              </h2>
              <p className="text-sm text-muted leading-relaxed line-clamp-3">{page.lead}</p>
              <span className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-brand-primary">
                {ui.ctaButton}
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </span>
            </Link>
          ))}
        </div>

        {comparison && (
          <section className="rounded-2xl border border-brand-primary/30 bg-brand-primary/5 p-6 sm:p-8">
            <h2 className="text-xl font-bold mb-3">{comparison.title}</h2>
            <p className="text-muted mb-6">{comparison.lead}</p>
            <Link
              to="/services/$slug"
              params={{ slug: comparison.slug }}
              className="inline-flex items-center gap-2 text-brand-primary font-semibold hover:underline"
            >
              {contentLocale === "fr" ? "Voir la comparaison détaillée" : "View detailed comparison"}
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </section>
        )}
      </main>
    </div>
  );
}
