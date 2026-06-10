/** Détecte l'exécution sur Cloudflare Workers/Pages (SMTP nodemailer indisponible). */
export function isCloudflareWorkersRuntime(): boolean {
  const preset = process.env.NITRO_PRESET ?? "";
  if (preset.includes("cloudflare")) return true;

  const globalScope = globalThis as {
    caches?: unknown;
    WebSocketPair?: unknown;
  };

  return typeof globalScope.caches !== "undefined" && typeof globalScope.WebSocketPair !== "undefined";
}
