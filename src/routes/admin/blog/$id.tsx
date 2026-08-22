import { createFileRoute, notFound, redirect } from "@tanstack/react-router";

import { AdminBlogEditor } from "@/components/admin/AdminBlogEditor";
import { adminCheckSession, adminGetPost } from "@/lib/api/blog-admin.functions";

export const Route = createFileRoute("/admin/blog/$id")({
  loader: async ({ params }) => {
    const session = await adminCheckSession();
    if (!session.authenticated) {
      throw redirect({ to: "/admin/blog/login" });
    }
    const post = await adminGetPost({ data: { id: params.id } });
    if (!post) throw notFound();
    return { post };
  },
  component: AdminBlogEditRoute,
  head: () => ({
    meta: [{ title: "Admin blogue — Édition" }],
  }),
});

function AdminBlogEditRoute() {
  const { post } = Route.useLoaderData();
  return <AdminBlogEditor initial={post} />;
}
