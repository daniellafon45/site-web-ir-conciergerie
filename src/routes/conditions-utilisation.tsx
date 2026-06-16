import { createFileRoute } from "@tanstack/react-router";

import { LegalDocumentPage } from "@/components/LegalDocumentPage";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { termsOfUseFr } from "@/lib/i18n/terms-of-use-fr";

export const Route = createFileRoute("/conditions-utilisation")({
  head: () => ({
    meta: [
      { title: "Conditions d'utilisation — IR Conciergerie" },
      { name: "description", content: termsOfUseFr.metaDescription },
      { property: "og:title", content: "Conditions d'utilisation — IR Conciergerie" },
      { property: "og:description", content: termsOfUseFr.metaDescription },
    ],
  }),
  component: ConditionsUtilisationPage,
});

function ConditionsUtilisationPage() {
  const { t } = useI18n();
  return <LegalDocumentPage document={t.termsOfUse} canonicalPath="/conditions-utilisation" />;
}
