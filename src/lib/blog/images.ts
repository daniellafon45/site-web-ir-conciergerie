import type { BlogImageKey } from "./types";

import imgBankAccount from "@/assets/blog/bank-account.webp";
import imgGuideCanada from "@/assets/blog/guide-canada.webp";
import imgHousingSearch from "@/assets/blog/housing-search.webp";
import imgImmigrationServices from "@/assets/blog/immigration-services.webp";
import imgMontrealAbroad from "@/assets/blog/montreal-abroad.webp";
import imgMontrealComparison from "@/assets/blog/montreal-comparison.webp";
import imgMontrealMoving from "@/assets/blog/montreal-moving.webp";
import imgToronto from "@/assets/blog/toronto.webp";
import imgVancouver from "@/assets/blog/vancouver.webp";

export const BLOG_IMAGES: Record<BlogImageKey, string> = {
  "guide-canada": imgGuideCanada,
  "montreal-abroad": imgMontrealAbroad,
  "montreal-comparison": imgMontrealComparison,
  "montreal-moving": imgMontrealMoving,
  "bank-account": imgBankAccount,
  "housing-search": imgHousingSearch,
  "immigration-services": imgImmigrationServices,
  toronto: imgToronto,
  vancouver: imgVancouver,
};

export function getBlogImage(key: BlogImageKey): string {
  return BLOG_IMAGES[key] ?? BLOG_IMAGES["guide-canada"];
}
