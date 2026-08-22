import { Link, useNavigate } from "@tanstack/react-router";

import { adminDeletePost, adminLogout, type AdminBlogPost } from "@/lib/api/blog-admin.functions";

type Props = {
  posts: AdminBlogPost[];
};

export function AdminBlogList({ posts }: Props) {
  const navigate = useNavigate();

  async function onLogout() {
    await adminLogout();
    await navigate({ to: "/admin/blog/login" });
  }

  async function onDelete(id: string, title: string) {
    if (!confirm(`Supprimer « ${title} » ?`)) return;
    const result = await adminDeletePost({ data: { id } });
    if (!result.success) {
      alert(result.error ?? "Suppression impossible");
      return;
    }
    window.location.reload();
  }

  return (
    <div className="min-h-screen bg-white text-text">
      <header className="border-b border-line/30">
        <div className="max-w-5xl mx-auto px-4 py-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-widest font-bold text-muted">Admin</p>
            <h1 className="text-xl font-bold">Articles du blogue</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/admin/blog/new"
              className="rounded-full bg-brand-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-brand-primary/90"
            >
              Nouvel article
            </Link>
            <button
              type="button"
              onClick={onLogout}
              className="rounded-full border border-line/50 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted hover:text-text"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {posts.length === 0 ? (
          <p className="text-muted">Aucun article en base. Créez-en un ou lancez le seed.</p>
        ) : (
          <ul className="divide-y divide-line/30 border border-line/30 rounded-2xl overflow-hidden">
            {posts.map((post) => (
              <li key={post.id} className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-white">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{post.title}</p>
                  <p className="text-xs text-muted mt-1">
                    {post.locale.toUpperCase()} · {post.publishedAt} · /blog/{post.slug}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Link
                    to="/admin/blog/$id"
                    params={{ id: post.id }}
                    className="rounded-full border border-line/50 px-4 py-2 text-xs font-semibold hover:border-brand-primary/40"
                  >
                    Éditer
                  </Link>
                  <button
                    type="button"
                    onClick={() => onDelete(post.id, post.title)}
                    className="rounded-full border border-red-200 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                  >
                    Supprimer
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-6 text-xs text-muted">
          <Link to="/blog" className="hover:text-brand-primary">
            Voir le blogue public
          </Link>
        </p>
      </main>
    </div>
  );
}
