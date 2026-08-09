import type { PrivacyPolicy } from "./types";

export const privacyPolicyEn: PrivacyPolicy = {
  pageTitle: "Privacy Policy",
  metaDescription:
    "Learn how IR Conciergerie protects your data: collection, cookies, Law 25 rights and contact for our privacy officer. Read our full policy.",
  intro:
    "IR Conciergerie is committed to protecting your personal information in accordance with Quebec Law 25. This policy describes data collected through our quote form, your rights and how to contact us.",
  lastUpdatedLabel: "Last updated",
  lastUpdatedDate: "June 9, 2026",
  dateModifiedIso: "2026-06-09",
  sections: [
    {
      title: "1. Data controller",
      paragraphs: [
        "The site conciergerie.ir-immigration.com is operated by IR Conciergerie, in connection with IR Immigration. For any questions about this policy, contact us at info@ir-conciergerie.com.",
      ],
    },
    {
      title: "2. Person responsible for the protection of personal information (PRP) — Law 25",
      paragraphs: [
        "The person responsible for the protection of personal information within our organization can be reached at: info@ir-conciergerie.com.",
        "They oversee compliance of our practices with Quebec's Act respecting the protection of personal information in the private sector (Law 25) and applicable Canadian laws.",
      ],
    },
    {
      title: "3. Information we collect",
      paragraphs: ["We only collect information necessary for the purposes described below:"],
      list: [
        "Quote request form: first name, last name, email address, phone number, requested services, expected arrival date, settlement city, number of people and optional notes.",
        "Language preference: site display language, stored locally in your browser.",
        "Technical data: IP address, browser type, server logs and connection metadata automatically generated when you visit (Cloudflare hosting).",
        "Fonts and icons: when loading Google Fonts, your IP address may be transmitted to Google for display purposes.",
      ],
    },
    {
      title: "4. Purposes and legal basis",
      paragraphs: [
        "We use your information to respond to quote requests, support your settlement project in Canada, ensure site operation and security, and meet our legal obligations.",
        "Processing via the form is based on your explicit consent when submitting. Storing your language preference is based on our legitimate interest in providing an adapted experience.",
      ],
    },
    {
      title: "5. Cookies and local storage",
      paragraphs: [
        "We do not use advertising cookies or marketing analytics tools (Google Analytics, pixels, etc.).",
        "Local storage (localStorage) may record your language preference and acknowledgment of this privacy notice. These are necessary for proper site operation.",
      ],
    },
    {
      title: "6. Subprocessors and third parties",
      paragraphs: ["We use the following providers, who may process certain information on our behalf:"],
      list: [
        "Cloudflare — site hosting and technical logs.",
        "Resend — email delivery when a form is submitted.",
        "Google Fonts — site font display.",
      ],
    },
    {
      title: "7. Retention period",
      paragraphs: [
        "Form submissions are retained for as long as needed to follow up on your file and meet legal, accounting and business obligations, then deleted or anonymized.",
        "Technical logs are kept for a limited period in line with our host's security practices.",
      ],
    },
    {
      title: "8. Your rights",
      paragraphs: [
        "Under Law 25, you may request access to your personal information, rectification, deletion where provided by law, limitation of use, or withdraw consent for processing that depends on it.",
        "To exercise your rights, write to info@ir-conciergerie.com. We will respond within the timeframes required by law.",
        "If you believe your rights are not respected, you may file a complaint with the Commission d'accès à l'information du Québec (CAI).",
      ],
    },
    {
      title: "9. Transfers outside Quebec",
      paragraphs: [
        "Some subprocessors (including Cloudflare, Resend and Google) may process information in the United States or elsewhere. We ensure appropriate contractual and security measures govern these transfers.",
      ],
    },
    {
      title: "10. Changes",
      paragraphs: [
        "We may update this policy to reflect changes in our practices or legal requirements. The last updated date appears at the top of this page.",
      ],
    },
  ],
};
