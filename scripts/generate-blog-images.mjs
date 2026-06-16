/**
 * Génère les images hero du blog via RunComfy (Nano Banana 2).
 * Fallback sharp si pas de RUNCOMFY_TOKEN.
 *
 * Usage:
 *   node scripts/generate-blog-images.mjs
 *   RUNCOMFY_TOKEN=<token> node scripts/generate-blog-images.mjs
 */
import { readFileSync, existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "src", "assets", "blog");

const API_BASE = "https://model-api.runcomfy.net/v1";
const MODEL = "google/nano-banana-2/text-to-image";

const IMAGES = [
  {
    key: "guide-canada",
    prompt:
      "Photorealistic wide shot of a diverse newcomer family with rolling suitcases standing in front of a modern Canadian apartment building, autumn golden hour light, Toronto or Montreal residential street, documentary travel photography style, shallow depth of field",
  },
  {
    key: "montreal-abroad",
    prompt:
      "Photorealistic wide shot of a classic Montreal Plateau Mont-Royal residential street with colorful triplex apartment buildings and exterior wrought-iron staircases, international couple with luggage looking at a for-rent sign, sunny summer day, documentary real estate photography",
  },
  {
    key: "montreal-comparison",
    prompt:
      "Photorealistic panoramic view of Montreal downtown skyline from Mount Royal lookout, Saint Lawrence River and diverse neighborhoods below, clear summer blue sky, realistic cityscape documentary photography",
  },
  {
    key: "montreal-moving",
    prompt:
      "Photorealistic scene at Montreal Pierre Elliott Trudeau International Airport arrivals hall, diverse newcomer family with rolling suitcases walking toward exit, warm terminal lighting, subtle Montreal city imagery visible, travel documentary photography",
  },
  {
    key: "bank-account",
    prompt:
      "Photorealistic scene of a newcomer sitting with a bank advisor at a modern Canadian bank branch, friendly consultation, glass and wood interior, natural daylight, professional documentary style",
  },
  {
    key: "immigration-services",
    prompt:
      "Photorealistic image of a professional concierge accompanying a couple viewing a bright apartment for rent in Canada, real estate visit, urban neighbourhood visible through window, natural light, documentary style",
  },
  {
    key: "housing-search",
    prompt:
      "Photorealistic scene of newcomers reviewing rental apartment listings on a laptop at a kitchen table in Canada, cozy interior, natural daylight, documentary lifestyle photography",
  },
  {
    key: "toronto",
    prompt:
      "Photorealistic wide shot of Toronto skyline with CN Tower and Lake Ontario waterfront, residential neighbourhood in foreground, clear summer day, documentary city photography, realistic urban landscape",
  },
  {
    key: "vancouver",
    prompt:
      "Photorealistic photograph of Vancouver skyline with North Shore mountains and Burrard Inlet, Stanley Park trees in foreground, golden hour light, Pacific Northwest cityscape, documentary travel photography style",
  },
  {
    key: "housing-search",
    prompt:
      "Photorealistic scene of a newcomer couple reviewing rental apartment listings on a laptop at a kitchen table, bright modern Canadian apartment interior, natural window light, documentary lifestyle photography style",
  },
];

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
  if (!token) throw new Error("No token");
  const res = await fetch(`${API_BASE}${pathname}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });
  if (!res.ok) throw new Error(`API ${pathname} → ${res.status}: ${await res.text()}`);
  return res.json();
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
  throw new Error(`Timeout pour ${requestId}`);
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
  throw new Error(`URL introuvable: ${str.slice(0, 300)}`);
}

async function generateOne({ key, prompt }, force = false) {
  const dest = path.join(OUT_DIR, `${key}.webp`);
  if (!force && existsSync(dest)) {
    console.log(`  skip ${key}`);
    return;
  }
  console.log(`→ ${key}`);
  const { request_id } = await api(`/models/${MODEL}`, {
    method: "POST",
    body: JSON.stringify({
      prompt,
      aspect_ratio: "16:9",
      resolution: "2K",
      seed: 1000 + IMAGES.findIndex((i) => i.key === key),
      output_format: "webp",
      num_images: 1,
    }),
  });
  await pollUntilDone(request_id);
  const result = await api(`/requests/${request_id}/result`);
  const url = extractImageUrl(result);
  const res = await fetch(url);
  await writeFile(dest, Buffer.from(await res.arrayBuffer()));
  console.log(`  ✓ ${dest}`);
}

async function main() {
  const force = process.argv.includes("--force");
  const onlyArg = process.argv.find((a) => a.startsWith("--only="));
  const onlyKeys = onlyArg ? onlyArg.slice("--only=".length).split(",") : null;
  const useFallback = process.argv.includes("--fallback") || !getToken();
  if (useFallback) {
    console.log("Pas de RUNCOMFY_TOKEN — téléchargement photos réalistes (Unsplash)…");
    const args = [path.join(__dirname, "download-blog-images.mjs")];
    if (onlyKeys) args.push(`--only=${onlyKeys.join(",")}`);
    const child = spawn(process.execPath, args, {
      stdio: "inherit",
      cwd: ROOT,
    });
    process.exit(await new Promise((res) => child.on("close", res)) ?? 1);
  }
  await mkdir(OUT_DIR, { recursive: true });
  const queue = onlyKeys ? IMAGES.filter((img) => onlyKeys.includes(img.key)) : IMAGES;
  for (const img of queue) {
    await generateOne(img, force);
  }
  console.log("Terminé.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
