import { buildLocalBusinessJsonLd, buildWebSiteJsonLd } from "@/lib/seo";

export function JsonLd() {
  const data = [buildLocalBusinessJsonLd(), buildWebSiteJsonLd()];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
