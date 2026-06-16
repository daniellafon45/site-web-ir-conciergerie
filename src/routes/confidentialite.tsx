import { createFileRoute } from "@tanstack/react-router";

import { LegalDocumentPage } from "@/components/LegalDocumentPage";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { privacyPolicyFr } from "@/lib/i18n/privacy-policy-fr";

export const Route = createFileRoute("/confidentialite")({
  head: () => ({
    meta: [
      { title: "Politique de confidentialité — IR Conciergerie" },
      { name: "description", content: privacyPolicyFr.metaDescription },
      { property: "og:title", content: "Politique de confidentialité — IR Conciergerie" },
      { property: "og:description", content: privacyPolicyFr.metaDescription },
    ],
  }),
  component: ConfidentialitePage,
});

function ConfidentialitePage() {
  const { t } = useI18n();
  return <LegalDocumentPage document={t.privacyPolicy} canonicalPath="/confidentialite" />;
}
