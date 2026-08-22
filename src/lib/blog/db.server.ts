import type { BlogFaqItem, BlogImageKey, BlogLocale, BlogPost, BlogSection } from "./types";

export type BlogPostRow = {
  id: string;
  slug: string;
  locale: string;
  alternate_slug: string;
  title: string;
  meta_description: string;
  excerpt: string;
  category: string;
  reading_minutes: number;
  published_at: string;
  image_key: string;
  hero_image_alt: string;
  lead: string;
  primary_keyword: string;
  sections_json: string;
  faq_json: string;
  related_slugs_json: string;
  created_at: string;
  updated_at: string;
};

export type BlogPostInput = Omit<BlogPost, never> & {
  id?: string;
};

type StmtResult = {
  results?: BlogPostRow[];
  success?: boolean;
  meta?: { changes?: number; last_row_id?: number };
};

type Prepared = {
  bind: (...args: unknown[]) => {
    all: <T = BlogPostRow>() => Promise<{ results: T[] }>;
    first: <T = BlogPostRow>() => Promise<T | null>;
    run: () => Promise<StmtResult>;
  };
};

export type BlogDatabase = {
  prepare: (sql: string) => Prepared;
};

const IMAGE_KEYS = new Set<BlogImageKey>([
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

function parseJson<T>(raw: string, fallback: T): T {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function asImageKey(value: string): BlogImageKey {
  return IMAGE_KEYS.has(value as BlogImageKey) ? (value as BlogImageKey) : "guide-canada";
}

export function rowToPost(row: BlogPostRow): BlogPost {
  return {
    slug: row.slug,
    locale: row.locale === "en" ? "en" : "fr",
    alternateSlug: row.alternate_slug,
    title: row.title,
    metaDescription: row.meta_description,
    excerpt: row.excerpt,
    category: row.category,
    readingMinutes: Number(row.reading_minutes) || 5,
    publishedAt: row.published_at,
    imageKey: asImageKey(row.image_key),
    heroImageAlt: row.hero_image_alt,
    lead: row.lead,
    sections: parseJson<BlogSection[]>(row.sections_json, []),
    faq: parseJson<BlogFaqItem[]>(row.faq_json, []),
    primaryKeyword: row.primary_keyword,
    relatedSlugs: parseJson<string[]>(row.related_slugs_json, []),
  };
}

export function postToRowValues(post: BlogPostInput, id: string, now: string) {
  return {
    id,
    slug: post.slug.trim(),
    locale: post.locale,
    alternate_slug: post.alternateSlug?.trim() ?? "",
    title: post.title.trim(),
    meta_description: post.metaDescription.trim(),
    excerpt: post.excerpt.trim(),
    category: post.category.trim(),
    reading_minutes: post.readingMinutes,
    published_at: post.publishedAt,
    image_key: post.imageKey,
    hero_image_alt: post.heroImageAlt.trim(),
    lead: post.lead.trim(),
    primary_keyword: post.primaryKeyword.trim(),
    sections_json: JSON.stringify(post.sections ?? []),
    faq_json: JSON.stringify(post.faq ?? []),
    related_slugs_json: JSON.stringify(post.relatedSlugs ?? []),
    updated_at: now,
  };
}

async function getD1Database(): Promise<BlogDatabase | null> {
  try {
    // @ts-expect-error Cloudflare Workers runtime module
    const { env } = await import("cloudflare:workers");
    const db = (env as { DB?: BlogDatabase }).DB;
    return db ?? null;
  } catch {
    return null;
  }
}

let localDbPromise: Promise<BlogDatabase> | null = null;

async function getLocalSqlite(): Promise<BlogDatabase> {
  if (!localDbPromise) {
    localDbPromise = (async () => {
      const fs = await import("node:fs");
      const path = await import("node:path");
      const { DatabaseSync } = await import("node:sqlite");

      const dataDir = path.resolve(process.cwd(), "data");
      fs.mkdirSync(dataDir, { recursive: true });
      const dbPath = path.join(dataDir, "blog.sqlite");
      const sqlite = new DatabaseSync(dbPath);

      const migrationPath = path.resolve(process.cwd(), "migrations", "0001_blog_posts.sql");
      if (fs.existsSync(migrationPath)) {
        sqlite.exec(fs.readFileSync(migrationPath, "utf8"));
      }

      const wrap = (sql: string): Prepared => ({
        bind: (...args: unknown[]) => {
          const stmt = sqlite.prepare(sql);
          const values = args as (string | number | null | bigint | Uint8Array)[];
          return {
            all: async <T = BlogPostRow>() => {
              const results = stmt.all(...values) as T[];
              return { results };
            },
            first: async <T = BlogPostRow>() => {
              const row = stmt.get(...values) as T | undefined;
              return row ?? null;
            },
            run: async () => {
              const info = stmt.run(...values) as { changes?: number };
              return { success: true, meta: { changes: info?.changes ?? 0 } };
            },
          };
        },
      });

      return { prepare: wrap };
    })();
  }
  return localDbPromise;
}

export async function getBlogDb(): Promise<BlogDatabase> {
  const d1 = await getD1Database();
  if (d1) return d1;
  return getLocalSqlite();
}

export async function listBlogPosts(locale?: BlogLocale): Promise<(BlogPost & { id: string })[]> {
  const db = await getBlogDb();
  if (locale) {
    const { results } = await db
      .prepare(
        `SELECT * FROM blog_posts WHERE locale = ? ORDER BY published_at DESC`,
      )
      .bind(locale)
      .all<BlogPostRow>();
    return results.map((row) => ({ ...rowToPost(row), id: row.id }));
  }
  const { results } = await db
    .prepare(`SELECT * FROM blog_posts ORDER BY published_at DESC`)
    .bind()
    .all<BlogPostRow>();
  return results.map((row) => ({ ...rowToPost(row), id: row.id }));
}

export async function getBlogPostBySlug(slug: string): Promise<(BlogPost & { id: string }) | null> {
  const db = await getBlogDb();
  const row = await db
    .prepare(`SELECT * FROM blog_posts WHERE slug = ? LIMIT 1`)
    .bind(slug)
    .first<BlogPostRow>();
  if (!row) return null;
  return { ...rowToPost(row), id: row.id };
}

export async function getBlogPostById(id: string): Promise<(BlogPost & { id: string }) | null> {
  const db = await getBlogDb();
  const row = await db
    .prepare(`SELECT * FROM blog_posts WHERE id = ? LIMIT 1`)
    .bind(id)
    .first<BlogPostRow>();
  if (!row) return null;
  return { ...rowToPost(row), id: row.id };
}

export async function countBlogPosts(): Promise<number> {
  const db = await getBlogDb();
  const row = await db.prepare(`SELECT COUNT(*) as c FROM blog_posts`).bind().first<{ c: number }>();
  return Number(row?.c ?? 0);
}

export async function upsertBlogPost(post: BlogPostInput): Promise<BlogPost & { id: string }> {
  const db = await getBlogDb();
  const now = new Date().toISOString();
  const id = post.id?.trim() || crypto.randomUUID();
  const values = postToRowValues(post, id, now);

  const existing = await db
    .prepare(`SELECT id, created_at FROM blog_posts WHERE id = ? OR slug = ? LIMIT 1`)
    .bind(id, values.slug)
    .first<{ id: string; created_at: string }>();

  if (existing) {
    await db
      .prepare(
        `UPDATE blog_posts SET
          slug = ?, locale = ?, alternate_slug = ?, title = ?, meta_description = ?,
          excerpt = ?, category = ?, reading_minutes = ?, published_at = ?, image_key = ?,
          hero_image_alt = ?, lead = ?, primary_keyword = ?, sections_json = ?, faq_json = ?,
          related_slugs_json = ?, updated_at = ?
        WHERE id = ?`,
      )
      .bind(
        values.slug,
        values.locale,
        values.alternate_slug,
        values.title,
        values.meta_description,
        values.excerpt,
        values.category,
        values.reading_minutes,
        values.published_at,
        values.image_key,
        values.hero_image_alt,
        values.lead,
        values.primary_keyword,
        values.sections_json,
        values.faq_json,
        values.related_slugs_json,
        values.updated_at,
        existing.id,
      )
      .run();
    const updated = await getBlogPostById(existing.id);
    if (!updated) throw new Error("Mise à jour impossible");
    return updated;
  }

  await db
    .prepare(
      `INSERT INTO blog_posts (
        id, slug, locale, alternate_slug, title, meta_description, excerpt, category,
        reading_minutes, published_at, image_key, hero_image_alt, lead, primary_keyword,
        sections_json, faq_json, related_slugs_json, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      values.id,
      values.slug,
      values.locale,
      values.alternate_slug,
      values.title,
      values.meta_description,
      values.excerpt,
      values.category,
      values.reading_minutes,
      values.published_at,
      values.image_key,
      values.hero_image_alt,
      values.lead,
      values.primary_keyword,
      values.sections_json,
      values.faq_json,
      values.related_slugs_json,
      now,
      now,
    )
    .run();

  const created = await getBlogPostById(id);
  if (!created) throw new Error("Création impossible");
  return created;
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  const db = await getBlogDb();
  const result = await db.prepare(`DELETE FROM blog_posts WHERE id = ?`).bind(id).run();
  return (result.meta?.changes ?? 0) > 0;
}
