"use client";

import Link from "next/link";

const MAIN = process.env.NEXT_PUBLIC_MAIN_SITE_URL || "https://www.vncra.com";

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-black/10">
      <div
        className="
          mx-auto max-w-5xl 
          px-3 sm:px-6 lg:px-8 
          py-6 sm:py-8 
          text-xs sm:text-sm 
          flex flex-col sm:flex-row 
          items-center justify-between 
          gap-3 sm:gap-4
        "
      >
        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <Link href={MAIN} className="hover:underline">VINCERA Home</Link>
          <Link href="/privacy" className="hover:underline">Privacy</Link>
          <Link href="/cookies" className="hover:underline">Cookies</Link>
          <Link href="/terms" className="hover:underline">Terms</Link>
          <Link href="/imprint" className="hover:underline">Imprint</Link>
          <Link href="/rss.xml" className="hover:underline">RSS</Link>
        </div>

        {/* Rechts */}
        <div className="flex items-center gap-2 sm:gap-3 mt-2 sm:mt-0">
          <button
            onClick={() => window.dispatchEvent(new Event("openCookieSettings"))}
            className="h-8 px-2.5 sm:px-3 rounded border border-black/15 hover:bg-black/5 text-xs sm:text-sm"
          >
            Cookie settings
          </button>
          <p className="text-black/60 text-xs sm:text-sm">
            © {new Date().getFullYear()} VINCERA
          </p>
        </div>
      </div>
    </footer>
  );
}
