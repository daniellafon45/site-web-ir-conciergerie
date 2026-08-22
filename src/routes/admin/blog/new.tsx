import { createFileRoute, redirect } from "@tanstack/react-router";

import { AdminBlogEditor } from "@/components/admin/AdminBlogEditor";
import { adminCheckSession } from "@/lib/api/blog-admin.functions";

export const Route = createFileRoute("/admin/blog/new")({
  loader: async () => {
    const session = await adminCheckSession();
    if (!session.authenticated) {
      throw redirect({ to: "/admin/blog/login" });
    }
    return null;
  },
  component: () => <AdminBlogEditor />,
  head: () => ({
    meta: [{ title: "Admin blogue — Nouvel article" }],
  }),
});
