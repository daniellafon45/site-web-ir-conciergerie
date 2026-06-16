import { PageJsonLd } from "@/components/PageJsonLd";
import { SeoHead } from "@/components/SeoHead";
import { SiteFloatingNav } from "@/components/SiteFloatingNav";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { getBlogUi } from "@/lib/blog/blog-i18n";
import { getPostsForListing } from "@/lib/blog/posts";
import type { BlogLocale } from "@/lib/blog/types";
import { useI18n } from "@/lib/i18n/I18nProvider";
import {
  SITE_URL,
  buildBlogItemListJsonLd,
  buildBreadcrumbJsonLd,
} from "@/lib/seo";

function resolveBlogLocale(siteLocale: string): BlogLocale {
  return siteLocale === "en" ? "en" : "fr";
}

export function BlogListingPage() {
  const { locale } = useI18n();
  const ui = getBlogUi(locale);
  const blogLocale = resolveBlogLocale(locale);
  const posts = getPostsForListing(blogLocale);
  const jsonLd = [
    buildBreadcrumbJsonLd([
      { name: "Accueil", url: SITE_URL },
      { name: ui.heading },
    ]),
    buildBlogItemListJsonLd(
      posts.map((post) => ({
        name: post.title,
        url: `${SITE_URL}/blog/${post.slug}`,
      })),
    ),
  ];

  return (
    <div className="min-h-screen bg-white text-text">
      <PageJsonLd data={jsonLd} />
      <SeoHead title={ui.pageTitle} description={ui.metaDescription} canonicalPath="/blog" />
      <SiteFloatingNav />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-10 sm:pb-16">
        <header className="mb-10 sm:mb-14">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">{ui.heading}</h1>
          <p className="text-muted text-base sm:text-lg max-w-2xl leading-relaxed">{ui.subtitle}</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {posts.map((post) => (
            <BlogPostCard key={post.slug} post={post} ui={ui} />
          ))}
        </div>
      </main>
    </div>
  );
}
