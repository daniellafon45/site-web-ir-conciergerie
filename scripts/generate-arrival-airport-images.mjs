/**
 * Génère les images panneau aéroport par locale via RunComfy Model API
 * (Nano Banana 2). Compatible Windows — pas besoin du CLI @runcomfy/cli.
 *
 * Usage:
 *   RUNCOMFY_TOKEN=<token> node scripts/generate-arrival-airport-images.mjs
 *   RUNCOMFY_TOKEN=<token> node scripts/generate-arrival-airport-images.mjs fr en
 */
import { readFileSync, existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "src", "assets", "arrival-airport");

const API_BASE = "https://model-api.runcomfy.net/v1";
const MODEL = "google/nano-banana-2/text-to-image";
const SEED = 424242;

/** Miroir des clés premium.arrivalSign des locales */
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

function buildPrompt(signText) {
  return [
    "Close-up photograph of a bright yellow horizontal airport directional sign inside a busy terminal,",
    "motion-blurred neutral gray background with horizontal streaks.",
    `The sign reads '${signText}' in bold black sans-serif lettering,`,
    "followed by a black airplane landing pictogram in a square and a black arrow pointing right.",
    "Realistic travel photography, shallow depth of field, warm lighting.",
  ].join(" ");
}

function getToken() {
  if (process.env.RUNCOMFY_TOKEN) return process.env.RUNCOMFY_TOKEN;
  const tokenPath = path.join(
    process.env.HOME || process.env.USERPROFILE || "",
    ".config",
    "runcomfy",
    "token.json",
  );
  if (existsSync(tokenPath)) {
    const raw = JSON.parse(readFileSync(tokenPath, "utf8"));
    return raw.token ?? raw.api_token ?? raw.access_token;
  }
  return null;
}

async function api(pathname, options = {}) {
  const token = getToken();
  if (!token) {
    console.error(
      "Erreur: définissez RUNCOMFY_TOKEN ou exécutez runcomfy login (macOS/Linux).",
    );
    process.exit(77);
  }
  const res = await fetch(`${API_BASE}${pathname}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`API ${pathname} → ${res.status}: ${body}`);
  }
  return res.json();
}

async function submitGeneration(signText) {
  const body = {
    prompt: buildPrompt(signText),
    aspect_ratio: "4:3",
    resolution: "1K",
    seed: SEED,
    output_format: "webp",
    num_images: 1,
  };
  return api(`/models/${MODEL}`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

async function pollUntilDone(requestId, maxWaitMs = 300_000) {
  const start = Date.now();
  while (Date.now() - start < maxWaitMs) {
    const status = await api(`/requests/${requestId}/status`);
    if (status.status === "completed") return status;
    if (status.status === "failed" || status.status === "cancelled") {
      throw new Error(`Génération échouée: ${JSON.stringify(status)}`);
    }
    await new Promise((r) => setTimeout(r, 3000));
  }
  throw new Error(`Timeout après ${maxWaitMs}ms pour ${requestId}`);
}

async function fetchResult(requestId) {
  return api(`/requests/${requestId}/result`);
}

async function downloadImage(url, destPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Téléchargement échoué: ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(destPath, buf);
}

function extractImageUrl(result) {
  const output = result.output ?? result;
  if (typeof output === "string" && output.startsWith("http")) return output;
  if (Array.isArray(output?.images)?.[0]) {
    const img = output.images[0];
    return typeof img === "string" ? img : img.url;
  }
  if (output?.image_url) return output.image_url;
  if (output?.url) return output.url;
  const str = JSON.stringify(output);
  const match = str.match(/https:\/\/[^"\\]+\.(webp|png|jpeg|jpg)/);
  if (match) return match[0];
  throw new Error(`URL image introuvable dans: ${str.slice(0, 500)}`);
}

async function generateLocale(locale) {
  const signText = SIGNS[locale];
  if (!signText) throw new Error(`Locale inconnue: ${locale}`);
  const dest = path.join(OUT_DIR, `${locale}.webp`);
  if (existsSync(dest)) {
    console.log(`  skip ${locale} (existe déjà)`);
    return;
  }
  console.log(`→ ${locale}: "${signText}"`);
  const { request_id } = await submitGeneration(signText);
  console.log(`  request_id=${request_id}`);
  await pollUntilDone(request_id);
  const result = await fetchResult(request_id);
  const imageUrl = extractImageUrl(result);
  await downloadImage(imageUrl, dest);
  console.log(`  ✓ ${dest}`);
}

async function main() {
  const locales = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  const useFallback = process.argv.includes("--fallback") || !getToken();
  const targets = locales.length > 0 ? locales : Object.keys(SIGNS);

  if (useFallback) {
    console.log("Mode fallback sharp (pas de RUNCOMFY_TOKEN)…");
    const { spawn } = await import("node:child_process");
    const child = spawn(
      process.execPath,
      [path.join(__dirname, "generate-arrival-airport-fallback.mjs"), ...targets],
      { stdio: "inherit", cwd: ROOT },
    );
    const code = await new Promise((res) => child.on("close", res));
    process.exit(code ?? 1);
  }

  await mkdir(OUT_DIR, { recursive: true });
  console.log(`Sortie: ${OUT_DIR}`);
  console.log(`Locales: ${targets.join(", ")}`);
  for (const locale of targets) {
    await generateLocale(locale);
  }
  console.log("Terminé.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
