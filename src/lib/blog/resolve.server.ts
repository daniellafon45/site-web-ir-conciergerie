import {
  countBlogPosts,
  getBlogPostBySlug as dbGetBySlug,
  listBlogPosts,
} from "./db.server";
import {
  getAllPosts,
  getFeaturedPosts as getStaticFeatured,
  getPostBySlug as getStaticBySlug,
  getPostsForListing as getStaticListing,
} from "./posts";
import type { BlogLocale, BlogPost } from "./types";

/** Prefers D1/SQLite when populated; falls back to static TypeScript posts. */
export async function resolvePostsForListing(locale: BlogLocale): Promise<BlogPost[]> {
  try {
    const count = await countBlogPosts();
    if (count > 0) {
      const posts = await listBlogPosts(locale);
      return posts.map(({ id: _id, ...post }) => post);
    }
  } catch (error) {
    console.error("Blog DB list fallback:", error);
  }
  return getStaticListing(locale);
}

export async function resolvePostBySlug(slug: string): Promise<(BlogPost & { id?: string }) | null> {
  try {
    const fromDb = await dbGetBySlug(slug);
    if (fromDb) return fromDb;
  } catch (error) {
    console.error("Blog DB get fallback:", error);
  }
  return getStaticBySlug(slug) ?? null;
}

export async function resolveFeaturedPosts(locale: BlogLocale, limit = 3): Promise<BlogPost[]> {
  const posts = await resolvePostsForListing(locale);
  if (posts.length > 0) return posts.slice(0, limit);
  return getStaticFeatured(locale, limit);
}

export async function resolveAlternatePost(post: BlogPost): Promise<BlogPost | null> {
  if (!post.alternateSlug) return null;
  return resolvePostBySlug(post.alternateSlug);
}

export async function resolveRelatedPosts(slugs: string[]): Promise<BlogPost[]> {
  const posts: BlogPost[] = [];
  for (const slug of slugs) {
    const post = await resolvePostBySlug(slug);
    if (post) posts.push(post);
  }
  return posts;
}

export { getAllPosts };
