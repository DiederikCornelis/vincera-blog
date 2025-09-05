// Helpers for reading/writing cookie consent

export type Consent = {
  necessary: true;     // always true (required)
  analytics: boolean;
  marketing: boolean;
  date?: string;
};

export const CONSENT_COOKIE = "cookie-consent";

export function parseConsent(raw?: string | null): Consent | null {
  if (!raw) return null;
  try {
    const c = JSON.parse(raw) as Consent;
    if (typeof c.analytics !== "boolean" || typeof c.marketing !== "boolean") return null;
    return { necessary: true, analytics: c.analytics, marketing: c.marketing, date: c.date };
  } catch {
    return null;
  }
}

export function defaultConsent(): Consent {
  return { necessary: true, analytics: false, marketing: false };
}
