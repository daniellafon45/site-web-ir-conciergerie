import { createFileRoute, notFound } from "@tanstack/react-router";

import { ServiceLandingPage } from "@/components/services/ServiceLandingPage";
import { getServicePageBySlug } from "@/lib/services/pages";
import { getServiceUi } from "@/lib/services/service-i18n";
import {
  SITE_URL,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  ldJsonMeta,
} from "@/lib/seo";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const page = getServicePageBySlug(params.slug);
    if (!page) throw notFound();
    return { page };
  },
  head: ({ loaderData }) => {
    const page = loaderData?.page;
    if (!page) return { meta: [{ title: "Service — IR Conciergerie" }] };

    const title = `${page.title} — IR Conciergerie`;
    const pageUrl = `${SITE_URL}/services/${page.slug}`;
    const servicesUi = getServiceUi(page.locale === "en" ? "en" : "fr");

    const jsonLd: object[] = [
      buildBreadcrumbJsonLd([
        { name: "Accueil", url: SITE_URL },
        { name: servicesUi.heading, url: `${SITE_URL}/services` },
        { name: page.title },
      ]),
    ];

    if (page.pageType === "service") {
      jsonLd.push(
        buildServiceJsonLd({
          name: page.title,
          description: page.metaDescription,
          url: pageUrl,
          serviceType: page.primaryKeyword,
        }),
      );
    }

    if (page.faq.length > 0) {
      jsonLd.push(buildFaqJsonLd(page.faq));
    }

    return {
      meta: [
        { title },
        { name: "description", content: page.metaDescription },
        { name: "keywords", content: page.primaryKeyword },
        { property: "og:title", content: title },
        { property: "og:description", content: page.metaDescription },
        { property: "og:type", content: "website" },
        { property: "og:url", content: pageUrl },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: page.metaDescription },
        ...ldJsonMeta(...jsonLd),
      ],
    };
  },
  component: ServiceRoute,
});

function ServiceRoute() {
  const { page } = Route.useLoaderData();
  return <ServiceLandingPage page={page} />;
}
