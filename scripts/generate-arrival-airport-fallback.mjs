/**
 * Fallback local (sharp) : remplace le texte « Arrivals » sur l'image de référence.
 * Utilisé quand RUNCOMFY_TOKEN n'est pas disponible (ex. Windows sans CLI).
 */
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const REF = path.join(ROOT, "src", "assets", "arrival-airport", "_reference.png");
const OUT_DIR = path.join(ROOT, "src", "assets", "arrival-airport");

const SIGNS = {
  fr: "Arrivées",
  en: "Arrivals",
  es: "Llegadas",
  pt: "Chegadas",
  ht: "Ariv",
  zh: "到达",
  ar: "الوصول",
  ln: "Koya",
  sw: "Kuwasili",
  wo: "Ñëw",
  ff: "Yahrugo",
};

/** Zone du texte « Arrivals » (1024×682 — lettres vers x≈298–568, y≈270–320) */
const SIGN = {
  rectX: 274,
  rectY: 232,
  rectW: 316,
  rectH: 96,
  textY: 288,
  yellow: "#FFE200",
};

function fontSizeFor(signText) {
  const len = [...signText].length;
  if (len <= 8) return 54;
  if (len <= 10) return 48;
  return 42;
}

function textX(locale) {
  const pad = 12;
  if (locale === "ar") return SIGN.rectX + SIGN.rectW - pad;
  return SIGN.rectX + pad;
}

function escapeXml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function fontFamily(locale) {
  if (locale === "zh") return "Microsoft YaHei, Segoe UI, sans-serif";
  if (locale === "ar") return "Segoe UI, Tahoma, Arial, sans-serif";
  return "Arial Black, Arial, sans-serif";
}

function textAnchor(locale) {
  return locale === "ar" ? "end" : "start";
}

function buildOverlaySvg(locale, signText) {
  const text = escapeXml(signText);
  const family = escapeXml(fontFamily(locale));
  const anchor = textAnchor(locale);
  const x = textX(locale);
  const fontSize = fontSizeFor(signText);
  const rtlAttrs =
    locale === "ar"
      ? ' direction="rtl" unicode-bidi="bidi-override"'
      : "";

  return Buffer.from(
    `<svg width="1024" height="682" xmlns="http://www.w3.org/2000/svg">
  <rect x="${SIGN.rectX}" y="${SIGN.rectY}" width="${SIGN.rectW}" height="${SIGN.rectH}" fill="${SIGN.yellow}"/>
  <text x="${x}" y="${SIGN.textY}" font-family="${family}" font-size="${fontSize}" font-weight="700" fill="#111111" text-anchor="${anchor}" dominant-baseline="middle"${rtlAttrs}>${text}</text>
</svg>`,
  );
}

async function generateLocale(locale) {
  const signText = SIGNS[locale];
  const dest = path.join(OUT_DIR, `${locale}.webp`);
  if (locale === "en") {
    await sharp(REF).webp({ quality: 88 }).toFile(dest);
    console.log(`✓ ${locale}.webp — original`);
    return;
  }
  const svg = buildOverlaySvg(locale, signText);
  const buf = await sharp(REF)
    .composite([{ input: svg, top: 0, left: 0 }])
    .webp({ quality: 88 })
    .toBuffer();
  await writeFile(dest, buf);
  console.log(`✓ ${locale}.webp — "${signText}"`);
}

async function main() {
  if (!existsSync(REF)) {
    console.error(`Image de référence introuvable: ${REF}`);
    console.error("Copiez arrivee-airport.png vers src/assets/arrival-airport/_reference.png");
    process.exit(1);
  }
  await mkdir(OUT_DIR, { recursive: true });
  const locales = process.argv.slice(2);
  const targets = locales.length > 0 ? locales : Object.keys(SIGNS);
  for (const locale of targets) {
    await generateLocale(locale);
  }
  console.log("Fallback terminé.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
