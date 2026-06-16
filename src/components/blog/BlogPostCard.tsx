import { Link } from "@tanstack/react-router";

import type { BlogPost } from "@/lib/blog/types";
import { getBlogImage } from "@/lib/blog/images";
import { formatBlogDate } from "@/lib/blog/posts";
import type { BlogUiStrings } from "@/lib/blog/blog-i18n";

type BlogPostCardProps = {
  post: BlogPost;
  ui: BlogUiStrings;
};

export function BlogPostCard({ post, ui }: BlogPostCardProps) {
  const imageSrc = getBlogImage(post.imageKey);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line/30 bg-white shadow-sm hover:shadow-md transition-shadow">
      <Link to="/blog/$slug" params={{ slug: post.slug }} className="block relative aspect-[16/10] overflow-hidden">
        <img
          src={imageSrc}
          alt={post.heroImageAlt}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute bottom-3 left-3 rounded-full bg-brand-primary/90 px-3 py-1 text-xs font-semibold text-white">
          {post.category}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="flex items-center gap-1.5 text-xs text-muted mb-3">
          <span className="material-symbols-outlined text-[16px]">schedule</span>
          {post.readingMinutes} {ui.readingTime}
          <span className="mx-1">·</span>
          {formatBlogDate(post.publishedAt, post.locale)}
        </p>
        <h2 className="text-lg sm:text-xl font-bold text-text mb-2 leading-snug">
          <Link
            to="/blog/$slug"
            params={{ slug: post.slug }}
            className="hover:text-brand-primary transition-colors"
          >
            {post.title}
          </Link>
        </h2>
        <p className="text-sm text-muted leading-relaxed mb-4 flex-1">{post.excerpt}</p>
        <Link
          to="/blog/$slug"
          params={{ slug: post.slug }}
          className="inline-flex items-center gap-1 text-sm font-semibold text-brand-primary hover:text-brand-primary/80 transition-colors"
        >
          {ui.readArticle}
          <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}
