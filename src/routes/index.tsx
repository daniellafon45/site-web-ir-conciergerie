import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { RentalPlatformLinks } from "@/components/RentalPlatformLinks";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { HeroCrossfadeVideos } from "@/components/HeroCrossfadeVideos";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SeoHead } from "@/components/SeoHead";
import { SiteFloatingNav } from "@/components/SiteFloatingNav";
import { getBlogUi } from "@/lib/blog/blog-i18n";
import { getFeaturedPosts } from "@/lib/blog/posts";
import type { BlogLocale } from "@/lib/blog/types";
import { useI18n } from "@/lib/i18n/I18nProvider";
import type { Locale } from "@/lib/i18n/types";
import { resolveServiceSlugForLocale } from "@/lib/services/pages";
import { FOOTER_SERVICES, getServiceUi, HOME_CARD_SERVICE_SLUGS } from "@/lib/services/service-i18n";
import type { ServiceLocale } from "@/lib/services/types";
import { buildFaqJsonLd, ldJsonMeta, SITE_URL } from "@/lib/seo";
import { HOME_FAQ_FR } from "@/lib/i18n/home-faq-i18n";
import aboutIrConciergerie from "@/assets/about-ir-conciergerie.png";
import arrivalAirportAr from "@/assets/arrival-airport/ar.webp";
import arrivalAirportEn from "@/assets/arrival-airport/en.webp";
import arrivalAirportEs from "@/assets/arrival-airport/es.webp";
import arrivalAirportFf from "@/assets/arrival-airport/ff.webp";
import arrivalAirportFr from "@/assets/arrival-airport/fr.webp";
import arrivalAirportHt from "@/assets/arrival-airport/ht.webp";
import arrivalAirportLn from "@/assets/arrival-airport/ln.webp";
import arrivalAirportPt from "@/assets/arrival-airport/pt.webp";
import arrivalAirportSw from "@/assets/arrival-airport/sw.webp";
import arrivalAirportWo from "@/assets/arrival-airport/wo.webp";
import arrivalAirportZh from "@/assets/arrival-airport/zh.webp";
import contactDeal from "@/assets/contact-deal.png";
import inspectionMaison from "@/assets/inspection-maison.png";
import installationFamille from "@/assets/installation-famille.png";
import logoIrConciergerie from "@/assets/logo-ir-conciergerie.png";
import logementMaison from "@/assets/logement-maison.png";
import pillarAccueilVip from "@/assets/pillar-accueil-vip.png";
import pillarLogement from "@/assets/pillar-logement.png";
import pillarTranquillite from "@/assets/pillar-tranquillite.png";
import serviceInspectionLogement from "@/assets/service-inspection-logement.png";
import serviceInstallationComplete from "@/assets/service-installation-complete.png";
import serviceRechercheLogement from "@/assets/service-recherche-logement.png";
import serviceTransfertAeroport from "@/assets/service-transfert-aeroport.png";
import transportEscalade from "@/assets/transport-escalade.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "IR Conciergerie — Aide à l'installation au Canada | Montréal, Toronto, Vancouver",
      },
      {
        name: "description",
        content:
          "Trouver un logement à Montréal depuis l'étranger : recherche, inspection, transfert aéroport et accompagnement pour familles et étudiants internationaux. Montréal, Toronto, Vancouver.",
      },
      { property: "og:url", content: SITE_URL },
      ...ldJsonMeta(buildFaqJsonLd(HOME_FAQ_FR.items)),
    ],
  }),
  component: Index,
});

const ARRIVAL_IMAGES: Record<Locale, string> = {
  fr: arrivalAirportFr,
  en: arrivalAirportEn,
  es: arrivalAirportEs,
  pt: arrivalAirportPt,
  ht: arrivalAirportHt,
  zh: arrivalAirportZh,
  ar: arrivalAirportAr,
  ln: arrivalAirportLn,
  sw: arrivalAirportSw,
  wo: arrivalAirportWo,
  ff: arrivalAirportFf,
};

const IMG = {
  logo: logoIrConciergerie,
  c2: logementMaison,
  c4: transportEscalade,
  c5: inspectionMaison,
  avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNTnrjB28yx2fG-iKp_7185Z8yuyzrZccYe0lyvbWrO90bIwaNzadrRd57GRnNf_EEJCbu1gSdZSe9Hwe-6ZERvmWHqVlRzUtjHa8UX-g7KmPTLYXqGaX0Lzf58Y25u-m2PxO9sX10Ugu8TlZqftWm-SJFgL3JlWWMg7pPZ51rWPOOdIkHSn45hjLx6E3VLD-dvic6Fg4zsrQbFYX-QrjpUd7G35m9EeVssIOrKmIyJB94TEg3G3Gbc8k2gylifg9E5ja25T_9wWck",
  testimonial: "https://lh3.googleusercontent.com/aida-public/AB6AXuDOeKDmumL8FqKgzgMTaoxdjsJh5GfzigKJ-avfIvXJz__urA68dHOfSzp2RmhHMWZV_u0TUM-HZRHJVMWgOI0Nsmw8Sw27JxpnYcfqiBKxQIbvqQsGxUyc6dd-8y5phBVpf6bqxMaJb4sLFJzCN10QmKPYlyBVTsgFBvj4ZGjjEIRcJArpa4gu3ui1QAFw1VzGDwYma9N-EMzeUEgYjwFEGRBjjMIwDmFrdfMBdJOVWKUwpXjA0AqX0armPRCUiQ49FLP5UUfLb1Xv",
  s1: serviceTransfertAeroport,
  s2: serviceRechercheLogement,
  s3: serviceInspectionLogement,
  s4: serviceInstallationComplete,
};

function CollageSoumissionButton({
  alwaysVisible = false,
  showOnMobile = false,
  className = "",
}: {
  alwaysVisible?: boolean;
  showOnMobile?: boolean;
  className?: string;
}) {
  const { t } = useI18n();
  const visibilityClass = alwaysVisible
    ? "opacity-100 scale-100"
    : showOnMobile
      ? "opacity-100 scale-100 lg:opacity-0 lg:scale-95 lg:group-hover:opacity-100 lg:group-hover:scale-100"
      : "opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100";

  return (
    <Link
      to="/soumission"
      className={`absolute left-1/2 z-20 inline-flex items-center justify-center gap-1 bg-brand-primary text-white rounded-full font-semibold uppercase tracking-wider hover:bg-brand-primary/90 shadow-lg transition-all duration-300 max-w-[calc(100%-1.5rem)] text-[9px] leading-tight px-3 py-2 sm:text-[10px] sm:px-4 sm:py-2 sm:gap-1.5 sm:leading-normal sm:max-w-none whitespace-normal text-center sm:whitespace-nowrap -translate-x-1/2 max-lg:bottom-4 max-lg:top-auto max-lg:translate-y-0 lg:top-1/2 lg:-translate-y-1/2 lg:bottom-auto ${visibilityClass} ${className}`}
    >
      {t.premium.requestQuote}
      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
    </Link>
  );
}

const PILLAR_BACKGROUNDS = [pillarAccueilVip, pillarLogement, pillarTranquillite];
const PILLAR_ROTATE_MS = 5000;

function Index() {
  const { locale, t } = useI18n();
  const arrivalImg = ARRIVAL_IMAGES[locale] ?? ARRIVAL_IMAGES.en;
  const [activePillar, setActivePillar] = useState(0);
  const [pillarAutoPlay, setPillarAutoPlay] = useState(true);
  const pillars = t.pillars.pillars.map((p, i) => ({ ...p, bg: PILLAR_BACKGROUNDS[i] }));
  const current = pillars[activePillar];
  const trustItems = t.trust;
  const blogUi = getBlogUi(locale);
  const blogLocale: BlogLocale = locale === "en" ? "en" : "fr";
  const serviceUi = getServiceUi(locale);
  const serviceContentLocale: ServiceLocale = locale === "en" ? "en" : "fr";
  const featuredPosts = getFeaturedPosts(blogLocale, 3);

  const serviceSlug = (cardId: string) => {
    const frSlug = HOME_CARD_SERVICE_SLUGS[cardId];
    return frSlug ? resolveServiceSlugForLocale(frSlug, serviceContentLocale) : null;
  };

  const selectPillar = useCallback((i: number) => {
    setActivePillar(i);
    setPillarAutoPlay(false);
  }, []);

  useEffect(() => {
    if (!pillarAutoPlay) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const id = window.setInterval(() => {
      setActivePillar((prev) => (prev + 1) % pillars.length);
    }, PILLAR_ROTATE_MS);

    return () => window.clearInterval(id);
  }, [pillarAutoPlay, pillars.length]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-text">
      <SeoHead page="home" />
      <SiteFloatingNav />

      <main>
        {/* Hero */}
        <section className="pt-28 sm:pt-40 md:pt-[248px] px-4 sm:px-6 md:px-10 max-w-[1728px] mx-auto flex flex-col items-center text-center pb-16 sm:pb-24 md:pb-[200px]">
          <ScrollReveal as="h1" className="text-balance max-w-5xl mb-8 sm:mb-12 md:mb-16 tracking-tighter text-[1.75rem] leading-[1.1] sm:text-4xl md:text-[64px] lg:text-[82px] md:leading-[1.05] font-bold px-1">
            {t.hero.title}
          </ScrollReveal>
          <ScrollReveal className="w-full max-w-[1492px] overflow-hidden shadow-2xl relative rounded-2xl sm:rounded-[32px] md:rounded-[40px] h-[220px] sm:h-[360px] md:h-[600px] lg:h-[800px]" delay={120} duration={900}>
            <HeroCrossfadeVideos />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
          </ScrollReveal>
        </section>

        {/* Trust Strip */}
        <section className="py-12 sm:py-20 px-4 sm:px-6 md:px-10 border-t border-line/30 max-w-[1728px] mx-auto">
          <div className="overflow-hidden w-full opacity-70">
            <div className="animate-marquee gap-[100px] items-center text-muted">
              {[...trustItems, ...trustItems, ...trustItems].map((item, i) => (
                <span key={i} className="text-lg sm:text-2xl font-semibold tracking-tight whitespace-nowrap hover:text-brand-primary transition-colors px-6 sm:px-[50px]">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Floating Collage */}
        <section className="w-full max-w-[1728px] mx-auto px-4 sm:px-6 lg:px-10 pt-16 sm:pt-20 pb-8 lg:pt-32 lg:pb-12">
          <ScrollReveal className="text-center mb-10 sm:mb-12 lg:mb-20 relative z-30 max-w-4xl mx-auto px-1">
            <h2 className="font-bold tracking-tighter leading-[0.95] text-3xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl 2xl:text-[80px]">
              {t.premium.title}
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-[32px] font-medium text-muted mt-3 lg:mt-4 text-balance px-2">
              {t.premium.subtitle}
            </p>
          </ScrollReveal>

          {/* Desktop collage */}
          <div className="relative hidden lg:block min-h-[760px] xl:min-h-[840px] 2xl:min-h-[900px] overflow-hidden">
            <ScrollReveal className="absolute left-[12%] xl:left-[14%] top-[2%] w-[280px] xl:w-[360px] h-[240px] xl:h-[290px] z-[5] rounded-[32px] overflow-hidden bg-white/50 backdrop-blur-2xl border border-white/80 shadow-2xl group" delay={0}>
              <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={arrivalImg} alt={t.premium.arrivalImageAlt} />
              <div className="absolute inset-0 z-[1] bg-black/0 group-hover:bg-black/30 transition-colors duration-300 pointer-events-none" />
              <CollageSoumissionButton />
              <div className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-xl border border-white rounded-2xl p-4 shadow-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] text-brand-primary font-bold uppercase tracking-wider">{t.premium.arrival}</span>
                  <span className="text-[10px] text-text font-bold">100%</span>
                </div>
                <div className="w-full bg-line/30 rounded-full h-1.5"><div className="bg-brand-primary w-full h-1.5 rounded-full" /></div>
              </div>
            </ScrollReveal>

            <ScrollReveal className="absolute right-[10%] xl:right-[12%] top-[2%] w-[260px] xl:w-[320px] h-[300px] xl:h-[360px] z-[5] rounded-[32px] overflow-hidden bg-white/50 border border-white/80 shadow-2xl group" delay={80} variant="fade-left">
              <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={IMG.c2} alt="Maison résidentielle moderne" />
              <div className="absolute inset-0 z-[1] bg-black/0 group-hover:bg-black/30 transition-colors duration-300 pointer-events-none" />
              <CollageSoumissionButton />
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md border border-white flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-brand-primary text-sm">home</span>
              </div>
            </ScrollReveal>

            <ScrollReveal className="absolute left-[8%] xl:left-[10%] top-[32%] w-[260px] xl:w-[300px] z-[15] rounded-[28px] bg-white/80 backdrop-blur-3xl border border-white shadow-[0_12px_40px_rgba(0,0,0,0.08)] flex flex-col p-5" delay={160} variant="zoom-in">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold">{t.premium.assistance}</span>
                <div className="w-10 h-6 bg-brand-primary rounded-full relative shadow-inner">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20">
                  <span className="material-symbols-outlined text-brand-primary text-sm">support_agent</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold">{t.premium.supportTitle}</span>
                  <span className="text-[12px] text-muted leading-tight">{t.premium.support247}</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal className="absolute right-[6%] xl:right-[8%] top-[38%] w-[300px] xl:w-[360px] h-[210px] xl:h-[260px] z-[5] rounded-[32px] overflow-hidden bg-white/50 border border-white/80 shadow-2xl group" delay={240} variant="fade-left">
              <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={IMG.c4} alt="Cadillac Escalade noire de luxe" />
              <div className="absolute inset-0 z-[1] bg-black/0 group-hover:bg-black/30 transition-colors duration-300 pointer-events-none" />
              <CollageSoumissionButton />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xl px-4 py-2 rounded-full border border-white shadow-sm flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                <span className="text-[10px] font-bold uppercase tracking-wider">{t.premium.secureTransport}</span>
              </div>
            </ScrollReveal>

            <ScrollReveal className="absolute left-[14%] xl:left-[16%] top-[56%] w-[340px] xl:w-[420px] h-[240px] xl:h-[290px] z-[5] rounded-[32px] overflow-hidden bg-white/50 border border-white/80 shadow-2xl group" delay={320} variant="fade-right">
              <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={IMG.c5} alt="Inspection de maison avec loupe" />
              <div className="absolute inset-0 z-[1] bg-black/0 group-hover:bg-black/30 transition-colors duration-300 pointer-events-none" />
              <CollageSoumissionButton />
              <div className="absolute bottom-5 left-5 bg-white/90 backdrop-blur-xl px-4 py-2 rounded-full border border-white shadow-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-brand-primary text-sm">verified</span>
                <span className="text-[10px] font-bold uppercase tracking-wider">{t.premium.guaranteedInspection}</span>
              </div>
            </ScrollReveal>

            <ScrollReveal className="absolute right-[12%] xl:right-[14%] top-[60%] w-[320px] xl:w-[400px] h-[230px] xl:h-[280px] z-[5] rounded-[32px] overflow-hidden bg-white/50 border border-white/80 shadow-2xl group" delay={400} variant="fade-left">
              <img
                className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                src={installationFamille}
                alt="Famille heureuse dans leur nouveau logement"
              />
              <div className="absolute inset-0 z-[1] bg-black/0 group-hover:bg-black/30 transition-colors duration-300 pointer-events-none" />
              <CollageSoumissionButton />
            </ScrollReveal>

            <ScrollReveal className="absolute left-[40%] xl:left-[42%] top-[76%] z-[20] bg-white/90 backdrop-blur-3xl rounded-[24px] flex items-center gap-4 p-3 shadow-[0_12px_40px_rgba(0,0,0,0.1)] border border-white" delay={480} variant="zoom-in">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-line/20">
                <img className="w-full h-full object-cover" src={IMG.avatar} alt={t.premium.testimonialName} />
              </div>
              <div className="flex flex-col pr-4">
                <span className="text-[11px] font-bold">{t.premium.testimonialName}</span>
                <span className="text-[13px] text-muted leading-tight">{t.premium.testimonialText}</span>
              </div>
            </ScrollReveal>
          </div>

          {/* Mobile / tablet grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
            {[
              (
                <div key="arrival" className="relative h-56 rounded-[24px] overflow-hidden border border-line/20 shadow-lg group">
                  <img className="w-full h-full object-cover" src={arrivalImg} alt={t.premium.arrivalImageAlt} />
                  <div className="absolute inset-0 z-[1] bg-black/20 pointer-events-none" />
                  <CollageSoumissionButton alwaysVisible className="max-lg:bottom-[5.5rem]" />
                  <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-xl border border-white rounded-xl p-3 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] text-brand-primary font-bold uppercase tracking-wider">{t.premium.arrival}</span>
                      <span className="text-[10px] text-text font-bold">100%</span>
                    </div>
                    <div className="w-full bg-line/30 rounded-full h-1.5"><div className="bg-brand-primary w-full h-1.5 rounded-full" /></div>
                  </div>
                </div>
              ),
              (
                <div key="home" className="relative h-56 rounded-[24px] overflow-hidden border border-line/20 shadow-lg group">
                  <img className="w-full h-full object-cover" src={IMG.c2} alt="Maison résidentielle moderne" />
                  <div className="absolute inset-0 z-[1] bg-black/20 pointer-events-none" />
                  <CollageSoumissionButton alwaysVisible />
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md border border-white flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-brand-primary text-sm">home</span>
                  </div>
                </div>
              ),
              (
                <div key="assistance" className="rounded-[24px] bg-white border border-line/20 shadow-lg p-5 flex flex-col justify-center h-48">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold">{t.premium.assistance}</span>
                    <div className="w-10 h-6 bg-brand-primary rounded-full relative shadow-inner">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20">
                      <span className="material-symbols-outlined text-brand-primary text-sm">support_agent</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-bold">{t.premium.supportTitle}</span>
                      <span className="text-[12px] text-muted leading-tight">{t.premium.support247}</span>
                    </div>
                  </div>
                </div>
              ),
              (
                <div key="transport" className="relative h-48 rounded-[24px] overflow-hidden border border-line/20 shadow-lg group">
                  <img className="w-full h-full object-cover" src={IMG.c4} alt="Cadillac Escalade noire de luxe" />
                  <div className="absolute inset-0 z-[1] bg-black/20 pointer-events-none" />
                  <CollageSoumissionButton alwaysVisible />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xl px-3 py-1.5 rounded-full border border-white shadow-sm flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">{t.premium.secureTransport}</span>
                  </div>
                </div>
              ),
              (
                <div key="inspection" className="relative h-48 rounded-[24px] overflow-hidden border border-line/20 shadow-lg group">
                  <img className="w-full h-full object-cover" src={IMG.c5} alt="Inspection de maison avec loupe" />
                  <div className="absolute inset-0 z-[1] bg-black/20 pointer-events-none" />
                  <CollageSoumissionButton alwaysVisible className="max-lg:bottom-14" />
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xl px-3 py-1.5 rounded-full border border-white shadow-sm flex items-center gap-2">
                    <span className="material-symbols-outlined text-brand-primary text-sm">verified</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider">{t.premium.guaranteedInspection}</span>
                  </div>
                </div>
              ),
              (
                <div key="family" className="relative h-48 rounded-[24px] overflow-hidden border border-line/20 shadow-lg group">
                  <img className="w-full h-full object-cover" src={installationFamille} alt="Famille heureuse dans leur nouveau logement" />
                  <div className="absolute inset-0 z-[1] bg-black/20 pointer-events-none" />
                  <CollageSoumissionButton alwaysVisible />
                </div>
              ),
              (
                <div key="testimonial" className="md:col-span-2 bg-white border border-line/20 shadow-lg rounded-[24px] flex items-center gap-4 p-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-line/20 shrink-0">
                    <img className="w-full h-full object-cover" src={IMG.avatar} alt={t.premium.testimonialName} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold">{t.premium.testimonialName}</span>
                    <span className="text-sm text-muted leading-tight">{t.premium.testimonialText}</span>
                  </div>
                </div>
              ),
            ].map((node, i) => (
              <ScrollReveal key={i} delay={i * 70}>
                {node}
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Manifesto */}
        <section className="pt-8 pb-20 md:pt-12 md:pb-28 lg:pt-16 lg:pb-32 px-4 sm:px-6 md:px-10 max-w-[1728px] mx-auto flex flex-col items-center text-center">
          <ScrollReveal as="h2" className="text-2xl sm:text-3xl md:text-[36px] lg:text-[49px] leading-[1.15] sm:leading-[1.1] text-balance tracking-tight max-w-[1000px] font-medium" variant="fade">
            {t.manifesto}
          </ScrollReveal>
        </section>

        {/* Brand OS */}
        <section id="demarches" className="py-16 sm:py-24 lg:py-[120px] px-4 sm:px-6 md:px-10 max-w-[1728px] mx-auto scroll-mt-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[100px] items-center">
            <ScrollReveal className="relative rounded-2xl sm:rounded-[32px] lg:rounded-[40px] p-4 sm:p-6 lg:p-8 h-[420px] sm:h-[540px] lg:h-[700px] flex items-center justify-center border border-brand-primary/10 overflow-hidden" variant="fade-right">
              <img
                key={current.bg}
                src={current.bg}
                alt={current.title}
                className="absolute inset-0 w-full h-full object-cover animate-in fade-in duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/40 via-black/30 to-brand-secondary/40" />
              <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-line/20 p-4 sm:p-6 max-h-[calc(100%-1rem)] overflow-y-auto">
                <div className="flex items-center justify-between mb-4 sm:mb-8">
                  <span className="font-bold text-sm">{current.cardTitle}</span>
                  <span className="material-symbols-outlined text-muted">more_horiz</span>
                </div>
                <div key={activePillar} className="space-y-2 animate-in fade-in duration-300">
                  {current.items.map((item) => (
                    <div
                      key={item.label}
                      className="group/item relative p-3 rounded-xl hover:bg-soft-card max-lg:bg-soft-card/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <span className="material-symbols-outlined text-brand-primary shrink-0">{item.icon}</span>
                        <span className="font-medium text-sm sm:text-base">{item.label}</span>
                      </div>
                      <div className="grid grid-rows-[0fr] group-hover/item:grid-rows-[1fr] max-lg:grid-rows-[1fr] transition-all duration-300 ease-out">
                        <div className="overflow-hidden">
                          <p className="text-[13px] text-muted leading-relaxed pt-3 pl-0 sm:pl-10 pr-1">{item.pitch}</p>
                          <div className="pl-0 sm:pl-10 pt-3 pb-1">
                            <Link
                              to="/soumission"
                              className="inline-flex items-center gap-1.5 bg-brand-primary text-white rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-wider hover:bg-brand-primary/90 transition-colors shadow-sm"
                            >
                              {t.premium.requestQuote}
                              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal className="flex flex-col justify-center max-w-lg w-full" variant="fade-left" delay={120}>

              <h3 className="text-3xl sm:text-[40px] md:text-[48px] leading-[1.2] mb-8 sm:mb-12 font-bold tracking-tight whitespace-pre-line">{t.pillars.sectionTitle}</h3>
              <div className="relative pl-6 sm:pl-8 border-l-[3px] border-line space-y-8 sm:space-y-12">
                <div
                  className="absolute left-[-3px] w-[3px] bg-brand-primary transition-all duration-500"
                  style={{
                    top: `${(activePillar * 100) / pillars.length}%`,
                    height: `${100 / pillars.length}%`,
                  }}
                />
                {pillars.map((p, i) => (
                  <button
                    key={p.title}
                    type="button"
                    onClick={() => selectPillar(i)}
                    className={`block text-left w-full transition-opacity cursor-pointer ${
                      activePillar === i ? "opacity-100" : "opacity-50 hover:opacity-100"
                    }`}
                  >
                    <h4 className="text-xl font-bold mb-3">{p.title}</h4>
                    <p className="text-muted leading-relaxed">{p.desc}</p>
                  </button>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-20 sm:py-32 lg:py-[160px] px-4 sm:px-6 md:px-10 max-w-[1728px] mx-auto scroll-mt-28">
          <ScrollReveal as="h2" className="text-3xl sm:text-[40px] md:text-[48px] mb-10 sm:mb-16 font-bold tracking-tight text-center">
            {t.services.sectionTitle}
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {[
              [IMG.s1, t.services.cards[0]],
              [IMG.s2, t.services.cards[1]],
              [IMG.s3, t.services.cards[2]],
              [IMG.s4, t.services.cards[3]],
            ].map(([src, card], i) => {
              const slug = serviceSlug(card.id);
              return (
              <ScrollReveal key={card.id} delay={i * 100}>
                <div id={card.id} className="relative min-h-[320px] h-auto sm:h-[360px] lg:h-[400px] rounded-2xl sm:rounded-[32px] p-6 sm:p-8 flex flex-col justify-end group overflow-hidden border border-line/20 scroll-mt-28">
                  <img alt={card.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src={src as string} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="relative z-10">
                    <h4 className="text-xl sm:text-2xl font-bold mb-2 text-white">{card.title}</h4>
                    <p className="text-sm sm:text-base text-white/90">{card.desc}</p>
                    {slug ? (
                      <Link
                        to="/services/$slug"
                        params={{ slug }}
                        className="inline-flex items-center gap-1.5 mt-5 bg-brand-primary text-white rounded-full px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider hover:bg-brand-primary/90 shadow-md opacity-100 translate-y-0 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300"
                      >
                        {serviceUi.learnMore}
                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </Link>
                    ) : (
                      <Link
                        to="/soumission"
                        className="inline-flex items-center gap-1.5 mt-5 bg-brand-primary text-white rounded-full px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider hover:bg-brand-primary/90 shadow-md opacity-100 translate-y-0 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300"
                      >
                        {t.premium.requestQuote}
                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </Link>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            );})}
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-20 sm:py-32 lg:py-40 px-4 sm:px-6 md:px-10 max-w-[1728px] mx-auto scroll-mt-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 items-center">
            <ScrollReveal className="flex flex-col gap-4 sm:gap-6" variant="fade-right">
              <span className="text-brand-primary text-xs font-bold uppercase tracking-widest">{t.about.label}</span>
              <h2 className="text-3xl sm:text-[40px] md:text-[48px] tracking-tight font-bold leading-[1.1]">{t.about.title}</h2>
              <p className="text-base sm:text-lg text-muted leading-relaxed">
                {t.about.body}
              </p>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-[32px] xl:text-[40px] tracking-tight font-bold leading-[1.25] break-words">
                {t.about.immigration}{" "}
                <a
                  href="mailto:direction@ir-immigration.com"
                  className="text-brand-primary hover:text-brand-primary/80 transition-colors"
                >
                  direction@ir-immigration.com
                </a>
              </p>
            </ScrollReveal>
            <ScrollReveal className="relative h-[280px] sm:h-[380px] lg:h-[500px] rounded-2xl sm:rounded-[32px] lg:rounded-[40px] overflow-hidden shadow-2xl border border-line/20 group" variant="fade-left" delay={150}>
              <img alt="IR Conciergerie — installation réussie" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={aboutIrConciergerie} />
              <div className="absolute inset-0 bg-brand-primary/10 mix-blend-multiply pointer-events-none" />
              <div className="absolute inset-0 z-[1] bg-black/0 group-hover:bg-black/30 transition-colors duration-300 pointer-events-none" />
              <CollageSoumissionButton showOnMobile />
            </ScrollReveal>
          </div>
        </section>

        {/* Blog resources */}
        <ScrollReveal as="section" className="py-20 sm:py-28 px-4 sm:px-6 md:px-10 max-w-[1200px] mx-auto" variant="fade-up">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">{blogUi.resourcesTitle}</h2>
              <p className="text-muted max-w-xl">{blogUi.resourcesSubtitle}</p>
            </div>
            <Link
              to="/blog"
              className="inline-flex items-center gap-1 text-sm font-semibold text-brand-primary hover:text-brand-primary/80 transition-colors shrink-0"
            >
              {blogUi.heading}
              <span aria-hidden>→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <BlogPostCard key={post.slug} post={post} ui={blogUi} />
            ))}
          </div>
        </ScrollReveal>

        {/* FAQ — logement Montréal */}
        <ScrollReveal as="section" id="faq" className="py-20 sm:py-28 px-4 sm:px-6 md:px-10 max-w-[800px] mx-auto scroll-mt-28" variant="fade-up">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">{t.homeFaq.title}</h2>
            <p className="text-muted leading-relaxed">{t.homeFaq.subtitle}</p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {t.homeFaq.items.map((item, index) => (
              <AccordionItem key={item.question} value={`faq-${index}`}>
                <AccordionTrigger className="text-left text-base font-semibold">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted leading-relaxed">
                  <RentalPlatformLinks text={item.answer} locale={blogLocale} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <p className="mt-8 text-center">
            <Link
              to="/blog/$slug"
              params={{
                slug:
                  blogLocale === "en"
                    ? "find-housing-montreal-from-abroad"
                    : "trouver-logement-montreal-etranger",
              }}
              className="text-sm font-semibold text-brand-primary hover:text-brand-primary/80 transition-colors"
            >
              {t.homeFaq.guideLink} →
            </Link>
          </p>
        </ScrollReveal>

        {/* Testimonial */}
        <section className="py-20 sm:py-32 lg:py-40 px-4 sm:px-6 md:px-10 max-w-[1200px] mx-auto flex flex-col items-center text-center">
          <ScrollReveal as="h2" className="text-xl sm:text-[28px] md:text-[40px] lg:text-[56px] leading-[1.2] sm:leading-[1.15] tracking-tight mb-10 sm:mb-16 text-balance font-normal italic px-2" variant="fade">
            &ldquo;{t.testimonial.quote}&rdquo;
          </ScrollReveal>
          <ScrollReveal delay={120} variant="zoom-in" className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-16 h-16 rounded-full overflow-hidden shadow-md">
              <img className="w-full h-full object-cover" src={IMG.testimonial} alt={t.testimonial.name} />
            </div>
            <div className="text-left">
              <p className="text-base font-bold">{t.testimonial.name}</p>
              <p className="text-sm text-muted">{t.testimonial.role}</p>
            </div>
          </ScrollReveal>
        </section>

        {/* CTA */}
        <ScrollReveal as="section" id="contact" className="relative py-20 sm:py-32 lg:py-40 px-4 sm:px-6 md:px-10 rounded-2xl sm:rounded-[32px] lg:rounded-[40px] mx-4 sm:mx-6 lg:mx-10 mb-16 sm:mb-32 overflow-hidden border border-line/20 scroll-mt-28" variant="zoom-in" duration={900}>
          <img
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
            src={contactDeal}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/50 to-black/30" />
          <div className="relative z-10 max-w-screen-xl mx-auto flex flex-col items-center text-center">
            <div className="bg-white rounded-2xl px-6 py-3 mb-8 shadow-md inline-block">
              <img alt="IR Conciergerie" className="h-10 w-auto object-contain" src={IMG.logo} />
            </div>
            <h2 className="text-3xl sm:text-[40px] md:text-[64px] font-bold tracking-tighter leading-[1.1] mb-6 sm:mb-8 max-w-3xl text-balance text-white px-2">
              {t.cta.title}
            </h2>
            <p className="text-white/85 mb-12 max-w-xl text-lg">
              {t.cta.body}
            </p>
            <Link to="/soumission" className="bg-brand-primary text-white rounded-full hover:bg-brand-primary/90 transition-all flex items-center px-8 py-4 text-[13px] font-bold uppercase tracking-wider shadow-lg">
              {t.cta.button}
            </Link>
          </div>
        </ScrollReveal>
      </main>

      <ScrollReveal as="footer" className="bg-text text-white pt-20 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 md:px-10 rounded-t-3xl sm:rounded-t-[64px]" variant="fade-up" threshold={0.05}>
        <div className="max-w-[1728px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="flex flex-col items-start text-left gap-6">
              <img alt="IR Conciergerie" className="h-12 w-auto object-contain object-left" src={IMG.logo} />
              <p className="text-white/60 text-sm leading-relaxed max-w-xs">{t.footer.tagline}</p>
            </div>
            <div>
              <h5 className="text-xs uppercase tracking-widest font-bold mb-4 text-white/40">{t.footer.services}</h5>
              <ul className="space-y-3 text-white/80">
                <li>
                  <Link
                    to="/services/$slug"
                    params={{ slug: resolveServiceSlugForLocale("transfert-aeroport", serviceContentLocale) }}
                    className="hover:text-white transition-colors"
                  >
                    {t.footer.links.airport}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/$slug"
                    params={{ slug: resolveServiceSlugForLocale("recherche-logement", serviceContentLocale) }}
                    className="hover:text-white transition-colors"
                  >
                    {t.footer.links.housing}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/$slug"
                    params={{ slug: resolveServiceSlugForLocale("inspection-logement", serviceContentLocale) }}
                    className="hover:text-white transition-colors"
                  >
                    {t.footer.links.inspection}
                  </Link>
                </li>
                <li>
                  <a href="#demarches" className="hover:text-white transition-colors">
                    {t.footer.links.admin}
                  </a>
                </li>
                <li>
                  <Link to="/services" className="hover:text-white transition-colors">
                    {FOOTER_SERVICES[locale]}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-xs uppercase tracking-widest font-bold mb-4 text-white/40">{t.footer.company}</h5>
              <ul className="space-y-3 text-white/80">
                <li><Link to="/blog" className="hover:text-white transition-colors">{t.footer.links.blog}</Link></li>
                <li><a href="#about" className="hover:text-white transition-colors">{t.footer.links.about}</a></li>
                <li><Link to="/confidentialite" className="hover:text-white transition-colors">{t.footer.links.privacy}</Link></li>
                <li><Link to="/conditions-utilisation" className="hover:text-white transition-colors">{t.footer.links.terms}</Link></li>
                <li><a href="#contact" className="hover:text-white transition-colors">{t.footer.links.contact}</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-xs uppercase tracking-widest font-bold mb-4 text-white/40">{t.footer.contact}</h5>
              <ul className="space-y-3 text-white/80">
                <li>Montréal, QC</li>
                <li>
                  <span className="block text-[10px] uppercase tracking-wider font-bold text-white/40 mb-1">
                    {t.footer.irConciergerie}
                  </span>
                  <a href="mailto:conciergerie@ir-immigration.com" className="hover:text-white transition-colors break-all">
                    conciergerie@ir-immigration.com
                  </a>
                </li>
                <li>
                  <span className="block text-[10px] uppercase tracking-wider font-bold text-white/40 mb-1">
                    {t.footer.irImmigration}
                  </span>
                  <a href="mailto:direction@ir-immigration.com" className="hover:text-white transition-colors break-all">
                    direction@ir-immigration.com
                  </a>
                </li>
                <li>
                  <span className="block text-[10px] uppercase tracking-wider font-bold text-white/40 mb-1">
                    {t.footer.irRecruitment}
                  </span>
                  <a href="mailto:recrutement@industriellerh.com" className="hover:text-white transition-colors break-all">
                    recrutement@industriellerh.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-sm text-white/40 flex flex-col sm:flex-row sm:justify-between items-center sm:items-start gap-3 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <span>{t.footer.rights}</span>
              <span className="hidden sm:inline text-white/20">|</span>
              <span className="flex items-center gap-3">
                <Link to="/confidentialite" className="hover:text-white transition-colors">
                  {t.footer.links.privacy}
                </Link>
                <span className="text-white/20">·</span>
                <Link to="/conditions-utilisation" className="hover:text-white transition-colors">
                  {t.footer.links.terms}
                </Link>
              </span>
            </div>
            <span>{t.footer.cities}</span>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
