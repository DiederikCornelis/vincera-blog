"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { CONSENT_COOKIE, parseConsent } from "@/lib/consent";

export default function GA() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const check = () => {
      const raw = document.cookie.split("; ").find(c => c.startsWith(CONSENT_COOKIE + "="))?.split("=")[1];
      const parsed = parseConsent(raw ? decodeURIComponent(raw) : null);
      setEnabled(!!parsed?.analytics);
    };
    check();
    const onChange = () => check();
    window.addEventListener("consent:change", onChange as EventListener);
    return () => window.removeEventListener("consent:change", onChange as EventListener);
  }, []);

  if (!enabled) return null;

  return (
    <>
      {/* Replace with your GA ID */}
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX" strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXX', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
