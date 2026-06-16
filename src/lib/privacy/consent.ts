const STORAGE_KEY = "ir-privacy-notice-v1";

type PrivacyNoticeRecord = {
  acknowledgedAt: string;
};

export function hasAcknowledgedPrivacyNotice(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw) as PrivacyNoticeRecord;
    return Boolean(parsed.acknowledgedAt);
  } catch {
    return false;
  }
}

export function getPrivacyNoticeRecordedAt(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PrivacyNoticeRecord;
    return parsed.acknowledgedAt ?? null;
  } catch {
    return null;
  }
}

export function acknowledgePrivacyNotice(): void {
  if (typeof window === "undefined") return;
  const record: PrivacyNoticeRecord = { acknowledgedAt: new Date().toISOString() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
}
