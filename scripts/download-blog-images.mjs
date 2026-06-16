/**
 * Télécharge des photos réalistes (Unsplash) et les convertit en WebP 16:9.
 * Utilisé sur Windows où @runcomfy/cli n'est pas supporté.
 * Pour Nano Banana 2 : RUNCOMFY_TOKEN=... node scripts/generate-blog-images.mjs --force
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "src", "assets", "blog");

const IMAGES = [
  {
    key: "guide-canada",
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop&q=85",
  },
  {
    key: "montreal-abroad",
    url: "https://images.unsplash.com/photo-1677791267383-df800fe824f0?w=1920&h=1080&fit=crop&q=85",
  },
  {
    key: "montreal-comparison",
    url: "https://images.unsplash.com/photo-1751738866641-4205ba6fb14e?w=1920&h=1080&fit=crop&q=85",
  },
  {
    key: "montreal-moving",
    url: "https://images.unsplash.com/photo-1659618486174-245686c0aac4?w=1920&h=1080&fit=crop&q=85",
  },
  {
    key: "bank-account",
    url: "https://images.unsplash.com/photo-1554224311-beee415c201f?w=1920&h=1080&fit=crop&q=85",
  },
  {
    key: "immigration-services",
    url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&h=1080&fit=crop&q=85",
  },
  {
    key: "housing-search",
    url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920&h=1080&fit=crop&q=85",
  },
  {
    key: "toronto",
    url: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=1920&h=1080&fit=crop&q=85",
  },
  {
    key: "vancouver",
    url: "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?w=1920&h=1080&fit=crop&q=85",
  },
  {
    key: "housing-search",
    url: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=1920&h=1080&fit=crop&q=85",
  },
];

async function downloadOne({ key, url }) {
  const dest = path.join(OUT_DIR, `${key}.webp`);
  console.log(`→ ${key}`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${key}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const webp = await sharp(buf).resize(1600, 900, { fit: "cover" }).webp({ quality: 88 }).toBuffer();
  await writeFile(dest, webp);
  console.log(`  ✓ ${dest}`);
}

async function main() {
  const onlyArg = process.argv.find((a) => a.startsWith("--only="));
  const onlyKeys = onlyArg ? onlyArg.slice("--only=".length).split(",") : null;
  await mkdir(OUT_DIR, { recursive: true });
  const queue = onlyKeys ? IMAGES.filter((img) => onlyKeys.includes(img.key)) : IMAGES;
  for (const img of queue) {
    await downloadOne(img);
  }
  console.log("Terminé.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
