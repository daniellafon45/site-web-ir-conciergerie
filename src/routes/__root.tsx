import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import { JsonLd } from "../components/JsonLd";
import { I18nProvider, useI18n } from "../lib/i18n/I18nProvider";
import { SITE_URL } from "../lib/seo";
import appCss from "../styles.css?url";
import favicon from "../assets/favicon.png?url";
import logoIrConciergerie from "../assets/logo-ir-conciergerie.png?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  const { t } = useI18n();
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">{t.common.notFoundTitle}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{t.common.notFoundBody}</p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t.common.goHome}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const { t } = useI18n();
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">{t.common.errorTitle}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t.common.errorBody}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t.common.tryAgain}
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-white px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            {t.common.goHome}
          </a>
        </div>
      </div>
    </div>
  );
}

const HREFLANG_LINKS = [
  { hreflang: "fr", href: `${SITE_URL}/` },
  { hreflang: "en", href: `${SITE_URL}/?lang=en` },
  { hreflang: "es", href: `${SITE_URL}/?lang=es` },
  { hreflang: "pt", href: `${SITE_URL}/?lang=pt` },
  { hreflang: "ht", href: `${SITE_URL}/?lang=ht` },
  { hreflang: "zh-Hans", href: `${SITE_URL}/?lang=zh` },
  { hreflang: "ar", href: `${SITE_URL}/?lang=ar` },
  { hreflang: "ln", href: `${SITE_URL}/?lang=ln` },
  { hreflang: "sw", href: `${SITE_URL}/?lang=sw` },
  { hreflang: "wo", href: `${SITE_URL}/?lang=wo` },
  { hreflang: "ff", href: `${SITE_URL}/?lang=ff` },
  { hreflang: "x-default", href: `${SITE_URL}/` },
] as const;

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        title:
          "IR Conciergerie — Conciergerie relocalisation Canada | Montréal, Toronto, Vancouver",
      },
      {
        name: "description",
        content:
          "Conciergerie premium pour votre arrivée au Canada : transfert aéroport, recherche de logement, inspection, installation. Montréal, Toronto, Vancouver.",
      },
      {
        name: "keywords",
        content:
          "conciergerie Canada, relocalisation Canada, installation Canada, transfert aéroport Montréal, recherche logement Canada, conciergerie immigration, IR Conciergerie",
      },
      { name: "author", content: "IR Conciergerie" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "geo.region", content: "CA-QC" },
      { name: "geo.placename", content: "Montréal" },
      {
        property: "og:title",
        content: "IR Conciergerie — Votre arrivée au Canada, maîtrisée.",
      },
      {
        property: "og:description",
        content:
          "Service de conciergerie premium pour votre relocalisation au Canada. Accueil VIP, logement et démarches.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:site_name", content: "IR Conciergerie" },
      { property: "og:locale", content: "fr_CA" },
      { property: "og:image", content: logoIrConciergerie },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "IR Conciergerie — Relocalisation Canada" },
      {
        name: "twitter:description",
        content: "Conciergerie premium : transfert aéroport, logement, installation au Canada.",
      },
    ],
    links: [
      { rel: "icon", type: "image/png", href: favicon },
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: SITE_URL },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap",
      },
      ...HREFLANG_LINKS.map(({ hreflang, href }) => ({
        rel: "alternate" as const,
        hrefLang: hreflang,
        href,
      })),
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body className="bg-white">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <JsonLd />
        <Outlet />
      </I18nProvider>
    </QueryClientProvider>
  );
}
