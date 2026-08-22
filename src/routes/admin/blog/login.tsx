import { createFileRoute, redirect } from "@tanstack/react-router";

import { AdminBlogLoginForm } from "@/components/admin/AdminBlogLoginForm";
import { adminCheckSession } from "@/lib/api/blog-admin.functions";

export const Route = createFileRoute("/admin/blog/login")({
  loader: async () => {
    const session = await adminCheckSession();
    if (session.authenticated) {
      throw redirect({ to: "/admin/blog" });
    }
    return null;
  },
  component: AdminBlogLoginForm,
  head: () => ({
    meta: [{ title: "Admin blogue — Connexion" }],
  }),
});
