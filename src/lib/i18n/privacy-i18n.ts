import type { Locale } from "./types";
import { privacyPolicyEn } from "./privacy-policy-en";
import { privacyPolicyFr } from "./privacy-policy-fr";
import { termsOfUseEn } from "./terms-of-use-en";
import { termsOfUseFr } from "./terms-of-use-fr";

type PrivacyBanner = {
  bannerTitle: string;
  bannerBody: string;
  acknowledge: string;
  learnMore: string;
  ariaLabel: string;
};

export const PRIVACY_BANNERS: Record<Locale, PrivacyBanner> = {
  fr: {
    bannerTitle: "Votre confidentialité",
    bannerBody:
      "Nous collectons des renseignements via notre formulaire de soumission, enregistrons votre préférence de langue localement et utilisons des journaux techniques (hébergement) ainsi que Google Fonts. Nous n'utilisons pas de témoins publicitaires ni d'outils d'analyse marketing.",
    acknowledge: "J'ai compris",
    learnMore: "Politique de confidentialité",
    ariaLabel: "Avis de confidentialité",
  },
  en: {
    bannerTitle: "Your privacy",
    bannerBody:
      "We collect information through our quote form, store your language preference locally, and use technical logs (hosting) and Google Fonts. We do not use advertising cookies or marketing analytics tools.",
    acknowledge: "I understand",
    learnMore: "Privacy policy",
    ariaLabel: "Privacy notice",
  },
  es: {
    bannerTitle: "Su privacidad",
    bannerBody:
      "Recopilamos información mediante nuestro formulario de solicitud, guardamos su preferencia de idioma localmente y utilizamos registros técnicos (alojamiento) y Google Fonts. No usamos cookies publicitarias ni herramientas de análisis de marketing.",
    acknowledge: "Entendido",
    learnMore: "Política de privacidad",
    ariaLabel: "Aviso de privacidad",
  },
  pt: {
    bannerTitle: "A sua privacidade",
    bannerBody:
      "Recolhemos informações através do formulário de pedido, guardamos a sua preferência de idioma localmente e utilizamos registos técnicos (alojamento) e Google Fonts. Não usamos cookies publicitários nem ferramentas de análise de marketing.",
    acknowledge: "Compreendi",
    learnMore: "Política de privacidade",
    ariaLabel: "Aviso de privacidade",
  },
  ht: {
    bannerTitle: "Konfidansyalite ou",
    bannerBody:
      "Nou kolekte enfòmasyon atravè fòm demann nou an, nou anrejistre preferans lang ou lokalman epi nou itilize jounal teknik (hebergement) ak Google Fonts. Nou pa itilize bonbon piblisite ni zouti analytics marketing.",
    acknowledge: "Mwen konprann",
    learnMore: "Politik konfidansyalite",
    ariaLabel: "Avi konfidansyalite",
  },
  zh: {
    bannerTitle: "您的隐私",
    bannerBody:
      "我们通过报价表单收集信息，在本地保存您的语言偏好，并使用技术日志（托管）和 Google Fonts。我们不使用广告 Cookie 或营销分析工具。",
    acknowledge: "我知道了",
    learnMore: "隐私政策",
    ariaLabel: "隐私提示",
  },
  ar: {
    bannerTitle: "خصوصيتك",
    bannerBody:
      "نجمع المعلومات عبر نموذج الطلب، ونحفظ تفضيل اللغة محلياً، ونستخدم السجلات التقنية (الاستضافة) وخطوط Google. لا نستخدم ملفات تعريف ارتباط إعلانية أو أدوات تحليل تسويقية.",
    acknowledge: "فهمت",
    learnMore: "سياسة الخصوصية",
    ariaLabel: "إشعار الخصوصية",
  },
  ln: {
    bannerTitle: "Bokomi na yo",
    bannerBody:
      "Tozali kokanga ba informations na formulaire, kobomba langue na yo na navigateur, mpe kozala na ba logs techniques (hébergement) na Google Fonts. Tozali kosalela te ba cookies ya publicité to ba outils analytics.",
    acknowledge: "Nayebi",
    learnMore: "Politique ya confidentialité",
    ariaLabel: "Avis ya confidentialité",
  },
  sw: {
    bannerTitle: "Faragha yako",
    bannerBody:
      "Tunakusanya taarifa kupitia fomu ya ombi, tunahifadhi mapendeleo ya lugha ndani ya kivinjari, na tunatumia kumbukumbu za kiufundi (uhifadhi) na Google Fonts. Hatutumii vidakuzi vya matangazo wala zana za uchambuzi wa uuzaji.",
    acknowledge: "Nimeelewa",
    learnMore: "Sera ya faragha",
    ariaLabel: "Taarifa ya faragha",
  },
  wo: {
    bannerTitle: "Sa sutura",
    bannerBody:
      "Dinañu denc xibaar ci sunu formulaire, dinañu denc sa tànneef làkk ci sa navigateur, te jëfandikoo jurnal teknik (hébergement) ak Google Fonts. Dinañu jëfandikoo bonbon publicitaire wala analytics marketing.",
    acknowledge: "Dégg naa",
    learnMore: "Politique de confidentialité",
    ariaLabel: "Xibaar sutura",
  },
  ff: {
    bannerTitle: "Suturo maa",
    bannerBody:
      "Min ngolata humpito e formule amen, min denda tànnde maa e navigateur maa, e min huutora loge teknikal (hébergement) e Google Fonts. Alaa bonbon publicitaire walla analytics marketing.",
    acknowledge: "Mi faamii",
    learnMore: "Politique de confidentialité",
    ariaLabel: "Xibaaru suturo",
  },
};

export const PRIVACY_LEGAL_NOTICE: Record<Locale, string> = {
  fr: "",
  en: "",
  es: "El texto legal completo se muestra en francés. En caso de divergencia, prevalece la versión francesa.",
  pt: "O texto legal completo é apresentado em francês. Em caso de divergência, prevalece a versão francesa.",
  ht: "Tèks legal konplè a an franse. Si gen konfli, vèsyon franse a gen priyorite.",
  zh: "完整法律文本以法语显示。如有冲突，以法语版本为准。",
  ar: "يُعرض النص القانوني الكامل بالفرنسية. عند التعارض، تسود النسخة الفرنسية.",
  ln: "Mokanda ya mibeko ezali na lifalansé. Soki ezali na bokeseni, lifalansé ezali ya liboso.",
  sw: "Maandishi kamili ya kisheria yamoonyeshwa kwa Kifaransa. Iwapo kuna tofauti, toleo la Kifaransa linatawala.",
  wo: "Mbind mi legal ci àll bu fees ci fransé. Su amee wuute, vèsion bu fransé mooy ki mu gën a am solo.",
  ff: "Binndi legal timmunnde ina jiyaa e Faransinko. So a woodi ceertogal, Faransinko ina firta.",
};

export const PRIVACY_PAGE_TITLES: Record<Locale, string> = {
  fr: "Politique de confidentialité",
  en: "Privacy Policy",
  es: "Política de privacidad",
  pt: "Política de privacidade",
  ht: "Politik konfidansyalite",
  zh: "隐私政策",
  ar: "سياسة الخصوصية",
  ln: "Politique ya confidentialité",
  sw: "Sera ya faragha",
  wo: "Politique de confidentialité",
  ff: "Politique de confidentialité",
};

export const PRIVACY_CONSENT: Record<Locale, { consentLabel: string; consentRequired: string }> = {
  fr: {
    consentLabel:
      "J'accepte que mes renseignements personnels soient collectés et utilisés pour traiter ma demande, conformément à la politique de confidentialité.",
    consentRequired: "Veuillez accepter la politique de confidentialité pour envoyer votre demande.",
  },
  en: {
    consentLabel:
      "I agree that my personal information may be collected and used to process my request, in accordance with the privacy policy.",
    consentRequired: "Please accept the privacy policy to submit your request.",
  },
  es: {
    consentLabel:
      "Acepto que mis datos personales sean recopilados y utilizados para tramitar mi solicitud, conforme a la política de privacidad.",
    consentRequired: "Acepte la política de privacidad para enviar su solicitud.",
  },
  pt: {
    consentLabel:
      "Aceito que os meus dados pessoais sejam recolhidos e utilizados para processar o meu pedido, em conformidade com a política de privacidade.",
    consentRequired: "Aceite a política de privacidade para enviar o seu pedido.",
  },
  ht: {
    consentLabel:
      "Mwen dakò pou yo kolekte epi itilize enfòmasyon pèsonèl mwen pou trete demann mwen an, dapre politik konfidansyalite a.",
    consentRequired: "Tanpri aksepte politik konfidansyalite a pou voye demann ou an.",
  },
  zh: {
    consentLabel: "我同意根据隐私政策收集和使用我的个人信息以处理我的申请。",
    consentRequired: "请接受隐私政策后再提交申请。",
  },
  ar: {
    consentLabel:
      "أوافق على جمع معلوماتي الشخصية واستخدامها لمعالجة طلبي، وفقاً لسياسة الخصوصية.",
    consentRequired: "يرجى قبول سياسة الخصوصية لإرسال طلبك.",
  },
  ln: {
    consentLabel:
      "Nandimi ete ba informations na ngai ekangama mpe esalelama mpo na kosala demande na ngai, selon politique ya confidentialité.",
    consentRequired: "Ndima politique ya confidentialité mpo na kotinda demande na yo.",
  },
  sw: {
    consentLabel:
      "Nakubali taarifa zangu za kibinafsi zikusanywe na kutumika kushughulikia ombi langu, kulingana na sera ya faragha.",
    consentRequired: "Tafadhali kubali sera ya faragha ili kutuma ombi lako.",
  },
  wo: {
    consentLabel:
      "Dama bëgg ne sama xibaar yu sutura dinañu leen denc te jëfandikoo ngir def sama demande, ci politique de confidentialité bi.",
    consentRequired: "Ndigal politique de confidentialité bi ngir yónnee sa demande.",
  },
  ff: {
    consentLabel:
      "Mi accorde humpito am ina ngolataa e ina huutora ngam waɗde dañal am, e politique de confidentialité.",
    consentRequired: "Accorde politique de confidentialité ngam neldu dañal maa.",
  },
};

export const FOOTER_PRIVACY: Record<Locale, string> = {
  fr: "Confidentialité",
  en: "Privacy",
  es: "Privacidad",
  pt: "Privacidade",
  ht: "Konfidansyalite",
  zh: "隐私",
  ar: "الخصوصية",
  ln: "Confidentialité",
  sw: "Faragha",
  wo: "Sutura",
  ff: "Suturo",
};

export const FOOTER_TERMS: Record<Locale, string> = {
  fr: "Conditions d'utilisation",
  en: "Terms of Use",
  es: "Condiciones de uso",
  pt: "Termos de utilização",
  ht: "Kondisyon itilizasyon",
  zh: "使用条款",
  ar: "شروط الاستخدام",
  ln: "Conditions d'utilisation",
  sw: "Masharti ya matumizi",
  wo: "Conditions d'utilisation",
  ff: "Conditions d'utilisation",
};

export const TERMS_PAGE_TITLES: Record<Locale, string> = {
  fr: "Conditions d'utilisation",
  en: "Terms of Use",
  es: "Condiciones de uso",
  pt: "Termos de utilização",
  ht: "Kondisyon itilizasyon",
  zh: "使用条款",
  ar: "شروط الاستخدام",
  ln: "Conditions d'utilisation",
  sw: "Masharti ya matumizi",
  wo: "Conditions d'utilisation",
  ff: "Conditions d'utilisation",
};

export const PRIVACY_META_DESCRIPTIONS: Record<Locale, string> = {
  fr: privacyPolicyFr.metaDescription,
  en: privacyPolicyEn.metaDescription,
  es: "Descubra cómo IR Conciergerie protege sus datos: recopilación, cookies, derechos Ley 25 y contacto del responsable de privacidad.",
  pt: "Saiba como a IR Conciergerie protege os seus dados: recolha, cookies, direitos Lei 25 e contacto do responsável pela privacidade.",
  ht: "Aprann kijan IR Conciergerie pwoteje done ou yo: koleksyon, bonbon, dwa Lwa 25 ak kontak responsab konfidansyalite a.",
  zh: "了解 IR Conciergerie 如何保护您的数据：收集方式、Cookie、第25号法案权利及隐私负责人联系方式。",
  ar: "اكتشف كيف تحمي IR Conciergerie بياناتك: الجمع والملفات والحقوق بموجب القانون 25 وجهة اتصال مسؤول الخصوصية.",
  ln: "Yeba ndenge IR Conciergerie ezali kobatela ba données na yo : collecte, cookies, makoki Loi 25 mpe contact ya responsable PRP.",
  sw: "Jifunze jinsi IR Conciergerie inavyolinda data yako: ukusanyaji, vidakuzi, haki za Sheria 25 na mawasiliano ya afisa wa faragha.",
  wo: "Xam ni IR Conciergerie di ngi aar sutura sa xibaar : denc, cookies, yoon Loi 25 ak jokkoo responsable PRP bi.",
  ff: "Anndu no fe IR Conciergerie aardirta humpito maa: ngolata, cookies, yamiroore Loi 25 e jokkondiral responsable PRP.",
};

export const LEGAL_RELATED_UI: Record<
  Locale,
  { relatedPagesTitle: string; servicesLink: string; blogLink: string }
> = {
  fr: {
    relatedPagesTitle: "Pages connexes",
    servicesLink: "Services IR Conciergerie",
    blogLink: "Guides d'installation au Canada",
  },
  en: {
    relatedPagesTitle: "Related pages",
    servicesLink: "IR Conciergerie services",
    blogLink: "Canada settlement guides",
  },
  es: {
    relatedPagesTitle: "Páginas relacionadas",
    servicesLink: "Servicios IR Conciergerie",
    blogLink: "Guías de instalación en Canadá",
  },
  pt: {
    relatedPagesTitle: "Páginas relacionadas",
    servicesLink: "Serviços IR Conciergerie",
    blogLink: "Guias de instalação no Canadá",
  },
  ht: {
    relatedPagesTitle: "Paj ki gen rapò",
    servicesLink: "Sèvis IR Conciergerie",
    blogLink: "Gid enstalasyon nan Kanada",
  },
  zh: {
    relatedPagesTitle: "相关页面",
    servicesLink: "IR Conciergerie 服务",
    blogLink: "加拿大安家指南",
  },
  ar: {
    relatedPagesTitle: "صفحات ذات صلة",
    servicesLink: "خدمات IR Conciergerie",
    blogLink: "أدلة الاستقرار في كندا",
  },
  ln: {
    relatedPagesTitle: "Ba pages oyo ezali na boyokani",
    servicesLink: "Ba services IR Conciergerie",
    blogLink: "Ba guides installation Canada",
  },
  sw: {
    relatedPagesTitle: "Kurasa zinazohusiana",
    servicesLink: "Huduma za IR Conciergerie",
    blogLink: "Miongozo ya uhamiaji Canada",
  },
  wo: {
    relatedPagesTitle: "Xët yu am solo",
    servicesLink: "Serwiis IR Conciergerie",
    blogLink: "Gid installation ci Kanadaa",
  },
  ff: {
    relatedPagesTitle: "Hellooje ɗiɗam",
    servicesLink: "Kuutorɗe IR Conciergerie",
    blogLink: "Gid installaade Canada",
  },
};

export function getPrivacyPolicyForLocale(locale: Locale) {
  if (locale === "en") return privacyPolicyEn;
  if (locale === "fr") return privacyPolicyFr;
  return {
    ...privacyPolicyFr,
    pageTitle: PRIVACY_PAGE_TITLES[locale],
    metaDescription: PRIVACY_META_DESCRIPTIONS[locale],
    legalNotice: PRIVACY_LEGAL_NOTICE[locale],
  };
}

export function getTermsOfUseForLocale(locale: Locale) {
  if (locale === "en") return termsOfUseEn;
  if (locale === "fr") return termsOfUseFr;
  return {
    ...termsOfUseFr,
    pageTitle: TERMS_PAGE_TITLES[locale],
    metaDescription: termsOfUseFr.metaDescription,
    legalNotice: PRIVACY_LEGAL_NOTICE[locale],
  };
}
