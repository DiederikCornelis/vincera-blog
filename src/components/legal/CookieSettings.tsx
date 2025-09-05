"use client";

import { useEffect, useState } from "react";
import { CONSENT_COOKIE, Consent, defaultConsent, parseConsent } from "@/lib/consent";

export default function CookieSettings({ compact = false }: { compact?: boolean }) {
  const [consent, setConsent] = useState<Consent>(defaultConsent());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const raw = document.cookie.split("; ").find(c => c.startsWith(CONSENT_COOKIE + "="))?.split("=")[1];
    const parsed = parseConsent(raw ? decodeURIComponent(raw) : null);
    setConsent(parsed ?? defaultConsent());
    setLoaded(true);
  }, []);

  function save(next: Consent) {
    const value = encodeURIComponent(JSON.stringify({ ...next, date: new Date().toISOString() }));
    // 6 months, Lax
    document.cookie = `${CONSENT_COOKIE}=${value}; Max-Age=${60*60*24*180}; Path=/; SameSite=Lax`;
    setConsent(next);
    // Inform listeners (e.g. to (un)load scripts)
    window.dispatchEvent(new CustomEvent("consent:change", { detail: next }));
  }

  if (!loaded) return null;

  return (
    <div className={compact ? "space-y-3" : "space-y-6"}>
      {!compact && <h1 className="text-2xl font-semibold">Cookie preferences</h1>}

      <div className="space-y-3">
        <Toggle
          title="Necessary"
          desc="Required for basic site functionality."
          checked
          disabled
        />
        <Toggle
          title="Analytics"
          desc="Helps us understand usage to improve the site."
          checked={consent.analytics}
          onChange={(v) => save({ ...consent, analytics: v })}
        />
        <Toggle
          title="Marketing"
          desc="Used to personalize content and measure campaigns."
          checked={consent.marketing}
          onChange={(v) => save({ ...consent, marketing: v })}
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => save({ necessary: true, analytics: false, marketing: false })}
          className="h-10 px-4 rounded border border-black/15 hover:bg-black/5 text-sm"
        >
          Reject non-essential
        </button>
        <button
          onClick={() => save({ necessary: true, analytics: true, marketing: true })}
          className="h-10 px-4 rounded border border-black/15 bg-black text-white text-sm hover:opacity-90"
        >
          Accept all
        </button>
      </div>
    </div>
  );
}

function Toggle({
  title, desc, checked, onChange, disabled
}: {
  title: string; desc: string; checked?: boolean; onChange?: (v: boolean) => void; disabled?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border border-black/10 rounded-lg p-3">
      <div>
        <div className="font-medium">{title}</div>
        <div className="text-sm text-black/60">{desc}</div>
      </div>
      <label className={`inline-flex items-center cursor-pointer ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}>
        <input
          type="checkbox"
          className="sr-only"
          checked={!!checked}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
        />
        <span className={`relative h-6 w-11 rounded-full transition-colors ${checked ? "bg-black" : "bg-black/20"}`}>
          <span className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-all ${checked ? "translate-x-5" : ""}`} />
        </span>
      </label>
    </div>
  );
}
