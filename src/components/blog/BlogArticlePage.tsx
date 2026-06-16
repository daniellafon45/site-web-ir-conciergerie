import { Link } from "@tanstack/react-router";

import { RentalPlatformLinks } from "@/components/RentalPlatformLinks";
import { PageJsonLd } from "@/components/PageJsonLd";
import { SeoHead } from "@/components/SeoHead";
import { SiteFloatingNav } from "@/components/SiteFloatingNav";
import { getBlogImage } from "@/lib/blog/images";
import { getBlogUi } from "@/lib/blog/blog-i18n";
import {
  estimateWordCount,
  formatBlogDate,
  getAlternatePost,
  getPostBySlug,
} from "@/lib/blog/posts";
import type { BlogPost } from "@/lib/blog/types";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { SITE_URL, buildArticlePageJsonLd } from "@/lib/seo";

type BlogArticlePageProps = {
  post: BlogPost;
};

export function BlogArticlePage({ post }: BlogArticlePageProps) {
  const { locale } = useI18n();
  const ui = getBlogUi(locale);
  const alternate = getAlternatePost(post);
  const heroSrc = getBlogImage(post.imageKey);
  const canonicalPath = `/blog/${post.slug}`;
  const articleUrl = `${SITE_URL}${canonicalPath}`;
  const imageUrl = heroSrc.startsWith("http") ? heroSrc : `${SITE_URL}${heroSrc}`;
  const blogUi = getBlogUi(post.locale === "en" ? "en" : "fr");
  const jsonLd = buildArticlePageJsonLd({
    post: {
      headline: post.title,
      description: post.metaDescription,
      datePublished: post.publishedAt,
      url: articleUrl,
      image: imageUrl,
      inLanguage: post.locale === "fr" ? "fr-CA" : "en-CA",
      wordCount: estimateWordCount(post),
    },
    faq: post.faq,
    breadcrumbs: [
      { name: "Accueil", url: SITE_URL },
      { name: blogUi.heading, url: `${SITE_URL}/blog` },
      { name: post.title },
    ],
  });

  const showFrBanner = locale !== "fr" && locale !== "en" && post.locale === "fr";
  const showEnBanner = locale !== "fr" && locale !== "en" && post.locale === "en";

  return (
    <div className="min-h-screen bg-white text-text">
      <PageJsonLd data={jsonLd} />
      <SeoHead
        title={`${post.title} — IR Conciergerie`}
        description={post.metaDescription}
        canonicalPath={canonicalPath}
        ogType="article"
        ogImage={heroSrc}
      />
      <SiteFloatingNav />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-8 sm:pb-12">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-brand-primary transition-colors mb-8"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          {ui.backToBlog}
        </Link>

        <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-8 border border-line/20">
          <img src={heroSrc} alt={post.heroImageAlt} className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted mb-6">
          <span className="rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-semibold text-brand-primary">
            {post.category}
          </span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">schedule</span>
            {post.readingMinutes} {ui.readingTime}
          </span>
          <span>{formatBlogDate(post.publishedAt, post.locale)}</span>
          <span>·</span>
          <span>{ui.teamAuthor}</span>
        </div>

        {(showFrBanner || showEnBanner) && (
          <p className="text-sm text-muted border border-line/40 rounded-xl bg-soft-card px-4 py-3 mb-6">
            {showFrBanner ? ui.availableInFr || ui.readInFr : ui.availableInEn}
            {alternate && (
              <>
                {" "}
                <Link
                  to="/blog/$slug"
                  params={{ slug: alternate.slug }}
                  className="font-semibold text-brand-primary hover:underline"
                >
                  {alternate.locale === "fr" ? ui.readInFr : ui.readInEn}
                </Link>
              </>
            )}
          </p>
        )}

        {locale === "fr" && post.locale === "en" && alternate && (
          <p className="text-sm text-muted border border-line/40 rounded-xl bg-soft-card px-4 py-3 mb-6">
            {ui.availableInFr}{" "}
            <Link
              to="/blog/$slug"
              params={{ slug: alternate.slug }}
              className="font-semibold text-brand-primary hover:underline"
            >
              {ui.readInFr}
            </Link>
          </p>
        )}

        {locale === "en" && post.locale === "fr" && alternate && (
          <p className="text-sm text-muted border border-line/40 rounded-xl bg-soft-card px-4 py-3 mb-6">
            {ui.availableInEn}{" "}
            <Link
              to="/blog/$slug"
              params={{ slug: alternate.slug }}
              className="font-semibold text-brand-primary hover:underline"
            >
              {ui.readInEn}
            </Link>
          </p>
        )}

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">{post.title}</h1>

        <p className="text-muted leading-relaxed border-l-4 border-brand-primary pl-5 mb-10 text-base sm:text-lg">
          {post.lead}
        </p>

        <div className="space-y-10 prose-blog">
          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-bold mb-4">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="text-muted leading-relaxed mb-4">
                  <RentalPlatformLinks text={paragraph} locale={post.locale} />
                </p>
              ))}
              {section.list && (
                <ul className="list-disc pl-5 space-y-2 text-muted leading-relaxed">
                  {section.list.map((item) => (
                    <li key={item.slice(0, 48)}>
                      <RentalPlatformLinks text={item} locale={post.locale} />
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {post.faq.length > 0 && (
          <section className="mt-12 pt-10 border-t border-line/40">
            <h2 className="text-xl font-bold mb-6">{ui.faqTitle}</h2>
            <div className="space-y-6">
              {post.faq.map((item) => (
                <div key={item.question}>
                  <h3 className="font-semibold text-text mb-2">{item.question}</h3>
                  <p className="text-muted leading-relaxed">
                    <RentalPlatformLinks text={item.answer} locale={post.locale} />
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {post.relatedSlugs.length > 0 && (
          <section className="mt-10">
            <h2 className="text-lg font-bold mb-4">{ui.relatedTitle}</h2>
            <ul className="space-y-2">
              {post.relatedSlugs.map((slug) => {
                const related = getPostBySlug(slug);
                if (!related) return null;
                return (
                  <li key={slug}>
                    <Link
                      to="/blog/$slug"
                      params={{ slug }}
                      className="text-sm font-medium text-brand-primary hover:underline"
                    >
                      {related.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        <div className="mt-12 rounded-2xl border border-brand-primary/20 bg-soft-card p-6 sm:p-8">
          <h2 className="text-lg font-bold mb-2">{ui.ctaTitle}</h2>
          <p className="text-sm text-muted leading-relaxed mb-5">{ui.ctaBody}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/soumission"
              className="inline-flex items-center justify-center rounded-full bg-brand-primary px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-brand-primary/90 transition-colors"
            >
              {ui.ctaButton}
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full border border-line/60 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-text/80 hover:border-brand-primary/40 hover:text-brand-primary transition-colors"
            >
              {ui.ctaHome}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
