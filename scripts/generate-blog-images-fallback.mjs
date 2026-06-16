/**
 * Fallback local (sharp) : images blog placeholder photoréalistes simplifiées.
 * Utilisé quand RUNCOMFY_TOKEN n'est pas disponible.
 */
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "src", "assets", "blog");

const IMAGES = [
  {
    key: "guide-canada",
    label: "Installation Canada",
    colors: ["#1e3a5f", "#4a7c9b", "#c4d4e0"],
  },
  {
    key: "montreal",
    label: "Montréal",
    colors: ["#2d4a6f", "#5b8ab8", "#e8eef4"],
  },
  {
    key: "bank-account",
    label: "Banque",
    colors: ["#1a3d2e", "#3d7a5c", "#d4e8dc"],
  },
  {
    key: "immigration-services",
    label: "Services",
    colors: ["#3d2d5c", "#6b5b95", "#e8e4f0"],
  },
  {
    key: "toronto",
    label: "Toronto",
    colors: ["#2c3e50", "#5d7a8c", "#dfe6ed"],
  },
  {
    key: "vancouver",
    label: "Vancouver",
    colors: ["#1a4d4a", "#3d8b7a", "#c8e6df"],
  },
];

function escapeXml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function buildSvg(label, colors) {
  const [c1, c2, c3] = colors;
  return `<svg width="1600" height="900" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${c1}"/>
      <stop offset="50%" style="stop-color:${c2}"/>
      <stop offset="100%" style="stop-color:${c3}"/>
    </linearGradient>
  </defs>
  <rect width="1600" height="900" fill="url(#g)"/>
  <rect x="0" y="600" width="1600" height="300" fill="rgba(0,0,0,0.25)"/>
  <text x="80" y="820" font-family="Arial, sans-serif" font-size="48" font-weight="700" fill="white" opacity="0.9">${escapeXml(label)}</text>
  <text x="80" y="860" font-family="Arial, sans-serif" font-size="24" fill="white" opacity="0.6">IR Conciergerie</text>
</svg>`;
}

async function generateImage({ key, label, colors }, force = false) {
  const dest = path.join(OUT_DIR, `${key}.webp`);
  if (!force && existsSync(dest)) {
    console.log(`  skip ${key} (existe déjà)`);
    return;
  }
  const svg = Buffer.from(buildSvg(label, colors));
  const buf = await sharp(svg).webp({ quality: 85 }).toBuffer();
  await writeFile(dest, buf);
  console.log(`  ✓ ${dest}`);
}

async function main() {
  const force = process.argv.includes("--force");
  await mkdir(OUT_DIR, { recursive: true });
  console.log(`Sortie: ${OUT_DIR}`);
  for (const img of IMAGES) {
    await generateImage(img, force);
  }
  console.log("Terminé.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
