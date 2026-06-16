import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { useI18n } from "@/lib/i18n/I18nProvider";
import {
  acknowledgePrivacyNotice,
  hasAcknowledgedPrivacyNotice,
} from "@/lib/privacy/consent";

export function PrivacyNoticeBanner() {
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!hasAcknowledgedPrivacyNotice());
  }, []);

  if (!visible) return null;

  const handleAcknowledge = () => {
    acknowledgePrivacyNotice();
    setVisible(false);
  };

  return (
    <div
      role="region"
      aria-label={t.privacy.ariaLabel}
      className="fixed inset-x-0 bottom-0 z-[60] px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-6 pointer-events-none"
    >
      <div className="pointer-events-auto mx-auto max-w-4xl rounded-2xl border border-line/30 bg-white/95 backdrop-blur-xl shadow-2xl p-4 sm:p-5">
        <p className="text-sm font-bold text-text mb-1.5">{t.privacy.bannerTitle}</p>
        <p className="text-sm text-muted leading-relaxed mb-4">{t.privacy.bannerBody}</p>
        <div className="flex flex-col-reverse sm:flex-row sm:items-center gap-2 sm:gap-3">
          <Link
            to="/confidentialite"
            className="inline-flex items-center justify-center rounded-full border border-line/60 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-text/80 hover:text-brand-primary hover:border-brand-primary/40 transition-colors text-center"
          >
            {t.privacy.learnMore}
          </Link>
          <button
            type="button"
            onClick={handleAcknowledge}
            className="inline-flex items-center justify-center rounded-full bg-brand-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-brand-primary/90 transition-colors shadow-md"
          >
            {t.privacy.acknowledge}
          </button>
        </div>
      </div>
    </div>
  );
}
