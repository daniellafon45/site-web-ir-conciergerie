import type { BlogPost } from "../types";

export const bankAccountNewcomers: BlogPost = {
  slug: "bank-account-newcomers-canada",
  locale: "en",
  alternateSlug: "compte-bancaire-nouveaux-arrivants-canada",
  title: "Opening a bank account in Canada as a newcomer",
  metaDescription:
    "Bank account for newcomers in Canada: banks, documents, timelines and credit cards. Practical guide by IR Conciergerie.",
  excerpt:
    "A Canadian bank account is essential from day one. Here is how to open one, which documents to prepare and which newcomer offers exist.",
  category: "Finance",
  readingMinutes: 7,
  publishedAt: "2026-06-09",
  imageKey: "bank-account",
  heroImageAlt: "Newcomer opening a bank account with an advisor in Canada",
  primaryKeyword: "bank account for newcomers in Canada",
  relatedSlugs: [
    "housing-search-newcomers-canada",
    "moving-to-canada-newcomer-guide",
    "moving-to-toronto-guide",
  ],
  lead:
    "Opening a bank account in Canada is among the first tasks for newcomers: without a local account, receiving pay, paying rent or subscribing to services is difficult. Canadian banks offer dedicated programs if you arrive with the right documents.",
  sections: [
    {
      heading: "Why open an account quickly",
      paragraphs: [
        "From arrival you need an account to: receive pay, pay rent by transfer, handle daily purchases and build Canadian credit history.",
        "Without a Social Insurance Number (SIN), some banks still open accounts with passport and immigration permit. SIN can be added later.",
      ],
    },
    {
      heading: "Documents typically required",
      paragraphs: ["Prepare originals and digital copies before your branch appointment or online application."],
      list: [
        "Valid passport.",
        "Permanent resident card, work permit or study permit.",
        "Proof of Canadian address (lease, welcome letter, bill) — sometimes within 30 days.",
        "Social Insurance Number (SIN) if already obtained.",
        "Immigration status proof (Confirmation of Permanent Residence, etc.).",
      ],
    },
    {
      heading: "Banks and newcomer programs",
      paragraphs: [
        "The big five — RBC, TD, BMO, Scotiabank and CIBC — offer Newcomer packages: 12 months fee-free, credit card without Canadian history, preferential international transfer rates.",
        "Neobanks (Tangerine, Simplii Financial) provide no-fee accounts with online opening — good complements to traditional banks.",
        "Compare international transfer fees if moving savings from your home country — rates and commissions vary significantly.",
      ],
    },
    {
      heading: "Credit cards and credit score",
      paragraphs: [
        "Canadian credit scores (Equifax, TransUnion) start at zero on arrival. Newcomer programs ease first credit card approval, often with modest limits.",
        "Using the card and paying on time builds history — essential for renting, mobile plans or car financing later.",
        "Avoid multiple simultaneous credit applications: each check can temporarily affect your file.",
      ],
    },
    {
      heading: "Practical tips",
      paragraphs: [
        "Book a branch appointment in your first week if possible. Wait times spike during university intake and summer.",
        "IR Conciergerie can support your first trips and logistics while you finalize settlement — including orientation to banking services in your neighbourhood.",
      ],
    },
  ],
  faq: [
    {
      question: "Can I open an account before arriving in Canada?",
      answer:
        "Some banks allow pre-opening online from abroad. Check conditions on your chosen bank's site for your immigration status.",
    },
    {
      question: "How long for a debit card?",
      answer: "Often issued same day in branch, or mailed within 5–10 business days.",
    },
    {
      question: "Does IR Conciergerie open accounts for me?",
      answer:
        "No. Banking remains personal. We facilitate settlement so you can focus on these steps.",
    },
  ],
};
