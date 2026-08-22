import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import {
  resolveAlternatePost,
  resolveFeaturedPosts,
  resolvePostBySlug,
  resolvePostsForListing,
  resolveRelatedPosts,
} from "../blog/resolve.server";
import type { BlogLocale, BlogPost } from "../blog/types";

const localeSchema = z.enum(["fr", "en"]);

export const fetchBlogListing = createServerFn({ method: "GET" })
  .validator(z.object({ locale: localeSchema }))
  .handler(async ({ data }): Promise<BlogPost[]> => {
    return resolvePostsForListing(data.locale as BlogLocale);
  });

export const fetchBlogPost = createServerFn({ method: "GET" })
  .validator(z.object({ slug: z.string().min(1) }))
  .handler(
    async ({
      data,
    }): Promise<{ post: BlogPost; related: BlogPost[]; alternate: BlogPost | null } | null> => {
      const post = await resolvePostBySlug(data.slug);
      if (!post) return null;
      const [related, alternate] = await Promise.all([
        resolveRelatedPosts(post.relatedSlugs),
        resolveAlternatePost(post),
      ]);
      return { post, related, alternate };
    },
  );

export const fetchFeaturedPosts = createServerFn({ method: "GET" })
  .validator(z.object({ locale: localeSchema, limit: z.number().int().min(1).max(12).optional() }))
  .handler(async ({ data }): Promise<BlogPost[]> => {
    return resolveFeaturedPosts(data.locale as BlogLocale, data.limit ?? 3);
  });
