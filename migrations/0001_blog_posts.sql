CREATE TABLE IF NOT EXISTS blog_posts (
  id TEXT PRIMARY KEY NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  locale TEXT NOT NULL CHECK (locale IN ('fr', 'en')),
  alternate_slug TEXT NOT NULL DEFAULT '',
  title TEXT NOT NULL,
  meta_description TEXT NOT NULL DEFAULT '',
  excerpt TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT '',
  reading_minutes INTEGER NOT NULL DEFAULT 5,
  published_at TEXT NOT NULL,
  image_key TEXT NOT NULL DEFAULT 'guide-canada',
  hero_image_alt TEXT NOT NULL DEFAULT '',
  lead TEXT NOT NULL DEFAULT '',
  primary_keyword TEXT NOT NULL DEFAULT '',
  sections_json TEXT NOT NULL DEFAULT '[]',
  faq_json TEXT NOT NULL DEFAULT '[]',
  related_slugs_json TEXT NOT NULL DEFAULT '[]',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_locale_published
  ON blog_posts (locale, published_at DESC);
