import { createFileRoute, notFound } from "@tanstack/react-router";

import { BlogArticlePage } from "@/components/blog/BlogArticlePage";
import { fetchBlogPost } from "@/lib/api/blog.functions";
import { getBlogImage } from "@/lib/blog/images";
import { SITE_URL } from "@/lib/seo";

function resolveOgImage(image: string) {
  return image.startsWith("http") ? image : `${SITE_URL}${image}`;
}

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const data = await fetchBlogPost({ data: { slug: params.slug } });
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    if (!post) return { meta: [{ title: "Article — IR Conciergerie" }] };
    const title = `${post.title} — IR Conciergerie`;
    const imageUrl = resolveOgImage(getBlogImage(post.imageKey));
    const articleUrl = `${SITE_URL}/blog/${post.slug}`;

    return {
      meta: [
        { title },
        { name: "description", content: post.metaDescription },
        { property: "og:title", content: title },
        { property: "og:description", content: post.metaDescription },
        { property: "og:type", content: "article" },
        { property: "og:image", content: imageUrl },
        { property: "og:url", content: articleUrl },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: post.metaDescription },
      ],
    };
  },
  component: BlogArticleRoute,
});

function BlogArticleRoute() {
  const { post, related, alternate } = Route.useLoaderData();
  return <BlogArticlePage post={post} relatedPosts={related} alternate={alternate} />;
}
