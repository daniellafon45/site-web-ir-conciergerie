import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useI18n } from "@/lib/i18n/I18nProvider";
import logoIrConciergerie from "@/assets/logo-ir-conciergerie.png";

export function SiteFloatingNav() {
  const { t } = useI18n();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHome = useRouterState({ select: (s) => s.location.pathname === "/" });
  const anchorPrefix = isHome ? "" : "/";

  const sectionLinks = [
    { type: "route" as const, to: "/services" as const, label: t.nav.services },
    { type: "anchor" as const, href: `${anchorPrefix}#about`, label: t.nav.about },
    { type: "anchor" as const, href: `${anchorPrefix}#contact`, label: t.nav.contact },
  ];

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <header className="fixed top-[max(0.75rem,env(safe-area-inset-top))] sm:top-6 left-0 right-0 z-50 flex items-center justify-center px-3 sm:px-6 pointer-events-none">
      <div className="pointer-events-auto relative w-full max-w-[1280px]">
        <div className="flex items-center justify-between gap-3 bg-white/95 backdrop-blur-xl rounded-full md:rounded-full px-3 sm:px-8 py-2.5 sm:py-3 shadow-lg border border-line/20 min-h-[3.5rem] sm:min-h-20 md:h-20">
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-10 md:flex-initial pl-0.5 sm:pl-3">
            <Link to="/" className="block min-w-0" onClick={closeMobile}>
              <img
                alt="IR Conciergerie"
                className="h-8 w-auto max-w-[6.75rem] object-contain object-left sm:h-10 md:h-12 md:max-w-none"
                src={logoIrConciergerie}
              />
            </Link>
            <nav className="hidden md:flex items-center gap-8 lg:gap-10">
              {sectionLinks.map((link) =>
                link.type === "route" ? (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-[13px] lg:text-sm font-semibold tracking-[0.06em] text-text/70 hover:text-brand-primary transition-colors uppercase"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    className="text-[13px] lg:text-sm font-semibold tracking-[0.06em] text-text/70 hover:text-brand-primary transition-colors uppercase"
                    href={link.href}
                  >
                    {link.label}
                  </a>
                ),
              )}
              <Link
                className="text-[13px] lg:text-sm font-semibold tracking-[0.06em] text-text/70 hover:text-brand-primary transition-colors uppercase"
                to="/blog"
              >
                {t.footer.links.blog}
              </Link>
            </nav>
          </div>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3 mr-0.5 sm:mr-2">
            <div className="hidden md:flex items-center gap-3">
              <LanguageSwitcher compact />
              <Link
                to="/soumission"
                className="bg-brand-primary text-white rounded-full hover:bg-brand-primary/90 transition-all shrink-0 flex items-center px-8 text-xs h-12 font-semibold uppercase tracking-wider shadow-md"
              >
                {t.nav.cta}
              </Link>
            </div>
            <button
              type="button"
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-line/60 text-text/80 hover:text-brand-primary transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-label="Menu"
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              <span className="material-symbols-outlined text-[22px]">
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <nav className="md:hidden pointer-events-auto absolute left-0 right-0 top-[calc(100%+0.5rem)] rounded-2xl border border-line/20 bg-white/98 backdrop-blur-xl p-4 shadow-xl flex flex-col gap-1">
            {sectionLinks.map((link) =>
              link.type === "route" ? (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={closeMobile}
                  className="rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-wide text-text/80 hover:bg-soft-card hover:text-brand-primary transition-colors"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMobile}
                  className="rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-wide text-text/80 hover:bg-soft-card hover:text-brand-primary transition-colors"
                >
                  {link.label}
                </a>
              ),
            )}
            <Link
              to="/blog"
              onClick={closeMobile}
              className="rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-wide text-text/80 hover:bg-soft-card hover:text-brand-primary transition-colors"
            >
              {t.footer.links.blog}
            </Link>
            <div className="mt-2 border-t border-line/30 pt-4">
              <LanguageSwitcher menu />
            </div>
            <Link
              to="/soumission"
              onClick={closeMobile}
              className="mt-3 flex w-full items-center justify-center rounded-full bg-brand-primary px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white shadow-md hover:bg-brand-primary/90 transition-colors"
            >
              {t.nav.cta}
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
