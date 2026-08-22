import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";

import { adminLogin } from "@/lib/api/blog-admin.functions";

export function AdminBlogLoginForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    try {
      const result = await adminLogin({ data: { username, password } });
      if (!result.success) {
        setError(result.error);
        return;
      }
      await navigate({ to: "/admin/blog" });
    } catch {
      setError("Connexion impossible. Réessayez.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="min-h-screen bg-soft-card flex items-center justify-center px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-2xl border border-line/30 bg-white p-8 shadow-sm"
      >
        <p className="text-xs uppercase tracking-widest font-bold text-muted mb-2">Admin</p>
        <h1 className="text-2xl font-bold mb-6">Connexion blogue</h1>
        <label className="block text-sm font-medium mb-1.5">Nom d&apos;utilisateur</label>
        <input
          className="w-full mb-4 rounded-xl border border-line/50 px-3 py-2.5 text-sm outline-none focus:border-brand-primary"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          required
        />
        <label className="block text-sm font-medium mb-1.5">Mot de passe</label>
        <input
          type="password"
          className="w-full mb-6 rounded-xl border border-line/50 px-3 py-2.5 text-sm outline-none focus:border-brand-primary"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
        {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-full bg-brand-primary text-white py-3 text-sm font-semibold uppercase tracking-wider hover:bg-brand-primary/90 disabled:opacity-60"
        >
          {pending ? "Connexion…" : "Se connecter"}
        </button>
        <p className="mt-4 text-center text-xs text-muted">
          <Link to="/" className="hover:text-brand-primary">
            Retour au site
          </Link>
        </p>
      </form>
    </div>
  );
}
