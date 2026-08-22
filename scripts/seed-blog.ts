import { getAllPosts } from "../src/lib/blog/posts";
import { upsertBlogPost } from "../src/lib/blog/db.server";

async function main() {
  const posts = getAllPosts();
  for (const post of posts) {
    const saved = await upsertBlogPost(post);
    console.log(`✓ ${saved.locale} ${saved.slug} (${saved.id})`);
  }
  console.log(`\nSeed terminé : ${posts.length} articles → data/blog.sqlite (local)`);
  console.log("Prod D1 : wrangler d1 create + migrations + variables ADMIN_* sur Cloudflare.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
