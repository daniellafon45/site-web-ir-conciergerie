import { createFileRoute } from "@tanstack/react-router";

import { BlogListingPage } from "@/components/blog/BlogListingPage";
import { fetchBlogListing } from "@/lib/api/blog.functions";
import { getBlogUi } from "@/lib/blog/blog-i18n";
import { SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/blog/")({
  loader: async () => {
    const [fr, en] = await Promise.all([
      fetchBlogListing({ data: { locale: "fr" } }),
      fetchBlogListing({ data: { locale: "en" } }),
    ]);
    return { postsByLocale: { fr, en } };
  },
  head: () => {
    const ui = getBlogUi("fr");
    const blogUrl = `${SITE_URL}/blog`;

    return {
      meta: [
        { title: ui.pageTitle },
        { name: "description", content: ui.metaDescription },
        { property: "og:title", content: ui.pageTitle },
        { property: "og:description", content: ui.metaDescription },
        { property: "og:type", content: "website" },
        { property: "og:url", content: blogUrl },
      ],
    };
  },
  component: BlogListingRoute,
});

function BlogListingRoute() {
  const { postsByLocale } = Route.useLoaderData();
  return <BlogListingPage postsByLocale={postsByLocale} />;
}
