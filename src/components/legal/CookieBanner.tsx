"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CookieSettings from "./CookieSettings";
import { CONSENT_COOKIE, defaultConsent, parseConsent } from "@/lib/consent";

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  const [manage, setManage] = useState(false);

  useEffect(() => {
    const raw = document.cookie.split("; ").find(c => c.startsWith(CONSENT_COOKIE + "="))?.split("=")[1];
    const parsed = parseConsent(raw ? decodeURIComponent(raw) : null);
    if (!parsed) setShow(true);
  }, []);

  // Allow opening settings from footer button:
  useEffect(() => {
    const open = () => setManage(true);
    window.addEventListener("openCookieSettings", open as EventListener);
    return () => window.removeEventListener("openCookieSettings", open as EventListener);
  }, []);

  if (!show && !manage) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50">
      <div className="mx-auto max-w-3xl m-4 rounded-xl border border-black/10 bg-white shadow-lg">
        {!manage ? (
          <div className="p-4 flex flex-col sm:flex-row sm:items-center gap-3">
            <p className="text-sm text-black/80">
              We use cookies to operate this site and, with your consent, for analytics and marketing. Read our{" "}
              <Link href="/privacy" className="underline">Privacy Policy</Link> and{" "}
              <Link href="/cookies" className="underline">Cookies Policy</Link>.
            </p>
            <div className="flex gap-2 sm:ml-auto">
              <button
                onClick={() => {
                  const v = encodeURIComponent(JSON.stringify(defaultConsent()));
                  document.cookie = `${CONSENT_COOKIE}=${v}; Max-Age=${60*60*24*180}; Path=/; SameSite=Lax`;
                  window.dispatchEvent(new CustomEvent("consent:change", { detail: defaultConsent() }));
                  setShow(false);
                }}
                className="h-9 px-3 rounded border border-black/15 text-sm hover:bg-black/5"
              >
                Reject non-essential
              </button>
              <button
                onClick={() => setManage(true)}
                className="h-9 px-3 rounded border border-black/15 text-sm"
              >
                Manage preferences
              </button>
              <button
                onClick={() => {
                  const c = { necessary: true, analytics: true, marketing: true, date: new Date().toISOString() };
                  const v = encodeURIComponent(JSON.stringify(c));
                  document.cookie = `${CONSENT_COOKIE}=${v}; Max-Age=${60*60*24*180}; Path=/; SameSite=Lax`;
                  window.dispatchEvent(new CustomEvent("consent:change", { detail: c }));
                  setShow(false);
                }}
                className="h-9 px-3 rounded border border-black/15 bg-black text-white text-sm hover:opacity-90"
              >
                Accept all
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4">
            <CookieSettings compact />
            <div className="mt-3 flex justify-end">
              <button
                onClick={() => { setManage(false); setShow(false); }}
                className="h-9 px-3 rounded border border-black/15 text-sm hover:bg-black/5"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
