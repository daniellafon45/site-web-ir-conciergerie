import { useMemo, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";

import { adminSavePost, type AdminBlogPost } from "@/lib/api/blog-admin.functions";
import type { BlogFaqItem, BlogImageKey, BlogLocale, BlogSection } from "@/lib/blog/types";

const IMAGE_KEYS: BlogImageKey[] = [
  "guide-canada",
  "montreal-abroad",
  "montreal-comparison",
  "montreal-moving",
  "bank-account",
  "immigration-services",
  "toronto",
  "vancouver",
  "housing-search",
];

type FormState = {
  id?: string;
  slug: string;
  locale: BlogLocale;
  alternateSlug: string;
  title: string;
  metaDescription: string;
  excerpt: string;
  category: string;
  readingMinutes: number;
  publishedAt: string;
  imageKey: BlogImageKey;
  heroImageAlt: string;
  lead: string;
  primaryKeyword: string;
  sections: BlogSection[];
  faq: BlogFaqItem[];
  relatedSlugsText: string;
};

function emptyForm(): FormState {
  return {
    slug: "",
    locale: "fr",
    alternateSlug: "",
    title: "",
    metaDescription: "",
    excerpt: "",
    category: "",
    readingMinutes: 8,
    publishedAt: new Date().toISOString().slice(0, 10),
    imageKey: "guide-canada",
    heroImageAlt: "",
    lead: "",
    primaryKeyword: "",
    sections: [{ heading: "", paragraphs: [""], list: [] }],
    faq: [{ question: "", answer: "" }],
    relatedSlugsText: "",
  };
}

function fromPost(post: AdminBlogPost): FormState {
  return {
    id: post.id,
    slug: post.slug,
    locale: post.locale,
    alternateSlug: post.alternateSlug,
    title: post.title,
    metaDescription: post.metaDescription,
    excerpt: post.excerpt,
    category: post.category,
    readingMinutes: post.readingMinutes,
    publishedAt: post.publishedAt,
    imageKey: post.imageKey,
    heroImageAlt: post.heroImageAlt,
    lead: post.lead,
    primaryKeyword: post.primaryKeyword,
    sections: post.sections.length
      ? post.sections.map((s) => ({
          heading: s.heading,
          paragraphs: s.paragraphs.length ? s.paragraphs : [""],
          list: s.list ?? [],
        }))
      : [{ heading: "", paragraphs: [""], list: [] }],
    faq: post.faq.length ? post.faq : [{ question: "", answer: "" }],
    relatedSlugsText: post.relatedSlugs.join("\n"),
  };
}

type Props = {
  initial?: AdminBlogPost | null;
};

export function AdminBlogEditor({ initial }: Props) {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>(() => (initial ? fromPost(initial) : emptyForm()));
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const isEdit = Boolean(initial?.id);

  const title = useMemo(() => (isEdit ? "Éditer l'article" : "Nouvel article"), [isEdit]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    try {
      const result = await adminSavePost({
        data: {
          id: form.id,
          slug: form.slug,
          locale: form.locale,
          alternateSlug: form.alternateSlug,
          title: form.title,
          metaDescription: form.metaDescription,
          excerpt: form.excerpt,
          category: form.category,
          readingMinutes: form.readingMinutes,
          publishedAt: form.publishedAt,
          imageKey: form.imageKey,
          heroImageAlt: form.heroImageAlt,
          lead: form.lead,
          primaryKeyword: form.primaryKeyword,
          sections: form.sections
            .filter((s) => s.heading.trim() || s.paragraphs.some((p) => p.trim()))
            .map((s) => ({
              heading: s.heading.trim(),
              paragraphs: s.paragraphs.map((p) => p.trim()).filter(Boolean),
              list: (s.list ?? []).map((l) => l.trim()).filter(Boolean),
            })),
          faq: form.faq
            .filter((f) => f.question.trim() || f.answer.trim())
            .map((f) => ({ question: f.question.trim(), answer: f.answer.trim() })),
          relatedSlugs: form.relatedSlugsText
            .split(/\n|,/)
            .map((s) => s.trim())
            .filter(Boolean),
        },
      });
      if (!result.success) {
        setError(result.error);
        return;
      }
      await navigate({ to: "/admin/blog" });
    } catch {
      setError("Enregistrement impossible.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="min-h-screen bg-white text-text">
      <header className="border-b border-line/30">
        <div className="max-w-3xl mx-auto px-4 py-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-widest font-bold text-muted">Admin</p>
            <h1 className="text-xl font-bold">{title}</h1>
          </div>
          <Link to="/admin/blog" className="text-sm text-muted hover:text-brand-primary">
            Retour liste
          </Link>
        </div>
      </header>

      <form onSubmit={onSubmit} className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Titre">
            <input
              className="input"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </Field>
          <Field label="Slug (URL)">
            <input
              className="input"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              required
              pattern="[a-z0-9\-]+"
              title="minuscules, chiffres et tirets"
            />
          </Field>
          <Field label="Langue">
            <select
              className="input"
              value={form.locale}
              onChange={(e) => setForm({ ...form, locale: e.target.value as BlogLocale })}
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
            </select>
          </Field>
          <Field label="Slug version autre langue">
            <input
              className="input"
              value={form.alternateSlug}
              onChange={(e) => setForm({ ...form, alternateSlug: e.target.value })}
            />
          </Field>
          <Field label="Catégorie">
            <input
              className="input"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
          </Field>
          <Field label="Date de publication">
            <input
              type="date"
              className="input"
              value={form.publishedAt}
              onChange={(e) => setForm({ ...form, publishedAt: e.target.value })}
              required
            />
          </Field>
          <Field label="Minutes de lecture">
            <input
              type="number"
              min={1}
              max={60}
              className="input"
              value={form.readingMinutes}
              onChange={(e) => setForm({ ...form, readingMinutes: Number(e.target.value) || 5 })}
            />
          </Field>
          <Field label="Image">
            <select
              className="input"
              value={form.imageKey}
              onChange={(e) => setForm({ ...form, imageKey: e.target.value as BlogImageKey })}
            >
              {IMAGE_KEYS.map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Meta description">
          <textarea
            className="input min-h-20"
            value={form.metaDescription}
            onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
          />
        </Field>
        <Field label="Extrait">
          <textarea
            className="input min-h-20"
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          />
        </Field>
        <Field label="Chapô (lead)">
          <textarea
            className="input min-h-28"
            value={form.lead}
            onChange={(e) => setForm({ ...form, lead: e.target.value })}
          />
        </Field>
        <Field label="Alt image hero">
          <input
            className="input"
            value={form.heroImageAlt}
            onChange={(e) => setForm({ ...form, heroImageAlt: e.target.value })}
          />
        </Field>
        <Field label="Mot-clé principal">
          <input
            className="input"
            value={form.primaryKeyword}
            onChange={(e) => setForm({ ...form, primaryKeyword: e.target.value })}
          />
        </Field>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold">Sections</h2>
            <button
              type="button"
              className="text-xs font-semibold text-brand-primary"
              onClick={() =>
                setForm({
                  ...form,
                  sections: [...form.sections, { heading: "", paragraphs: [""], list: [] }],
                })
              }
            >
              + Section
            </button>
          </div>
          {form.sections.map((section, si) => (
            <div key={si} className="rounded-xl border border-line/30 p-4 space-y-3">
              <input
                className="input"
                placeholder="Titre de section"
                value={section.heading}
                onChange={(e) => {
                  const sections = [...form.sections];
                  sections[si] = { ...section, heading: e.target.value };
                  setForm({ ...form, sections });
                }}
              />
              {section.paragraphs.map((p, pi) => (
                <textarea
                  key={pi}
                  className="input min-h-20"
                  placeholder={`Paragraphe ${pi + 1}`}
                  value={p}
                  onChange={(e) => {
                    const sections = [...form.sections];
                    const paragraphs = [...section.paragraphs];
                    paragraphs[pi] = e.target.value;
                    sections[si] = { ...section, paragraphs };
                    setForm({ ...form, sections });
                  }}
                />
              ))}
              <button
                type="button"
                className="text-xs text-muted"
                onClick={() => {
                  const sections = [...form.sections];
                  sections[si] = { ...section, paragraphs: [...section.paragraphs, ""] };
                  setForm({ ...form, sections });
                }}
              >
                + Paragraphe
              </button>
              <textarea
                className="input min-h-16"
                placeholder="Liste (une puce par ligne)"
                value={(section.list ?? []).join("\n")}
                onChange={(e) => {
                  const sections = [...form.sections];
                  sections[si] = {
                    ...section,
                    list: e.target.value.split("\n"),
                  };
                  setForm({ ...form, sections });
                }}
              />
            </div>
          ))}
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold">FAQ</h2>
            <button
              type="button"
              className="text-xs font-semibold text-brand-primary"
              onClick={() => setForm({ ...form, faq: [...form.faq, { question: "", answer: "" }] })}
            >
              + Question
            </button>
          </div>
          {form.faq.map((item, fi) => (
            <div key={fi} className="rounded-xl border border-line/30 p-4 space-y-3">
              <input
                className="input"
                placeholder="Question"
                value={item.question}
                onChange={(e) => {
                  const faq = [...form.faq];
                  faq[fi] = { ...item, question: e.target.value };
                  setForm({ ...form, faq });
                }}
              />
              <textarea
                className="input min-h-20"
                placeholder="Réponse"
                value={item.answer}
                onChange={(e) => {
                  const faq = [...form.faq];
                  faq[fi] = { ...item, answer: e.target.value };
                  setForm({ ...form, faq });
                }}
              />
            </div>
          ))}
        </section>

        <Field label="Articles liés (slugs, un par ligne)">
          <textarea
            className="input min-h-20"
            value={form.relatedSlugsText}
            onChange={(e) => setForm({ ...form, relatedSlugsText: e.target.value })}
          />
        </Field>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-brand-primary px-8 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-brand-primary/90 disabled:opacity-60"
        >
          {pending ? "Enregistrement…" : "Enregistrer"}
        </button>
      </form>

      <style>{`
        .input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid color-mix(in oklab, var(--color-line, #d4d4d4) 50%, transparent);
          padding: 0.625rem 0.75rem;
          font-size: 0.875rem;
          outline: none;
        }
        .input:focus {
          border-color: var(--color-brand-primary, #0f4c5c);
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium mb-1.5">{label}</span>
      {children}
    </label>
  );
}
