import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import {
  clearAdminSession,
  createAdminSession,
  isAdminAuthenticated,
  requireAdmin,
  verifyAdminCredentials,
} from "../blog/auth.server";
import {
  deleteBlogPost,
  getBlogPostById,
  listBlogPosts,
  upsertBlogPost,
  type BlogPostInput,
} from "../blog/db.server";
import type { BlogImageKey, BlogPost } from "../blog/types";

const imageKeySchema = z.enum([
  "guide-canada",
  "montreal-abroad",
  "montreal-comparison",
  "montreal-moving",
  "bank-account",
  "immigration-services",
  "toronto",
  "vancouver",
  "housing-search",
]);

const sectionSchema = z.object({
  heading: z.string(),
  paragraphs: z.array(z.string()),
  list: z.array(z.string()).optional(),
});

const faqSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

const postInputSchema = z.object({
  id: z.string().optional(),
  slug: z.string().trim().min(1),
  locale: z.enum(["fr", "en"]),
  alternateSlug: z.string().default(""),
  title: z.string().trim().min(1),
  metaDescription: z.string().default(""),
  excerpt: z.string().default(""),
  category: z.string().default(""),
  readingMinutes: z.number().int().min(1).max(60).default(5),
  publishedAt: z.string().min(1),
  imageKey: imageKeySchema,
  heroImageAlt: z.string().default(""),
  lead: z.string().default(""),
  primaryKeyword: z.string().default(""),
  sections: z.array(sectionSchema).default([]),
  faq: z.array(faqSchema).default([]),
  relatedSlugs: z.array(z.string()).default([]),
});

export type AdminBlogPost = BlogPost & { id: string };

export const adminCheckSession = createServerFn({ method: "GET" }).handler(async () => {
  return { authenticated: await isAdminAuthenticated() };
});

export const adminLogin = createServerFn({ method: "POST" })
  .validator(
    z.object({
      username: z.string().min(1),
      password: z.string().min(1),
    }),
  )
  .handler(async ({ data }) => {
    const ok = await verifyAdminCredentials(data.username, data.password);
    if (!ok) return { success: false as const, error: "Identifiants invalides" };
    await createAdminSession();
    return { success: true as const };
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  await clearAdminSession();
  return { success: true as const };
});

export const adminListPosts = createServerFn({ method: "GET" }).handler(async (): Promise<AdminBlogPost[]> => {
  await requireAdmin();
  return listBlogPosts();
});

export const adminGetPost = createServerFn({ method: "GET" })
  .validator(z.object({ id: z.string().min(1) }))
  .handler(async ({ data }): Promise<AdminBlogPost | null> => {
    await requireAdmin();
    return getBlogPostById(data.id);
  });

export const adminSavePost = createServerFn({ method: "POST" })
  .validator(postInputSchema)
  .handler(async ({ data }): Promise<{ success: true; post: AdminBlogPost } | { success: false; error: string }> => {
    try {
      await requireAdmin();
      const post = await upsertBlogPost(data as BlogPostInput);
      return { success: true, post };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur";
      if (message === "UNAUTHORIZED") return { success: false, error: "Non autorisé" };
      console.error("adminSavePost:", error);
      return { success: false, error: message };
    }
  });

export const adminDeletePost = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string().min(1) }))
  .handler(async ({ data }): Promise<{ success: boolean; error?: string }> => {
    try {
      await requireAdmin();
      const ok = await deleteBlogPost(data.id);
      return { success: ok };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur";
      if (message === "UNAUTHORIZED") return { success: false, error: "Non autorisé" };
      return { success: false, error: message };
    }
  });

export const BLOG_IMAGE_KEYS = imageKeySchema.options as BlogImageKey[];
