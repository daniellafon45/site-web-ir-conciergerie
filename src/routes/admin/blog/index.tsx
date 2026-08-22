import { createFileRoute, redirect } from "@tanstack/react-router";

import { AdminBlogList } from "@/components/admin/AdminBlogList";
import { adminCheckSession, adminListPosts } from "@/lib/api/blog-admin.functions";

export const Route = createFileRoute("/admin/blog/")({
  loader: async () => {
    const session = await adminCheckSession();
    if (!session.authenticated) {
      throw redirect({ to: "/admin/blog/login" });
    }
    const posts = await adminListPosts();
    return { posts };
  },
  component: AdminBlogIndex,
  head: () => ({
    meta: [{ title: "Admin blogue — Articles" }],
  }),
});

function AdminBlogIndex() {
  const { posts } = Route.useLoaderData();
  return <AdminBlogList posts={posts} />;
}
