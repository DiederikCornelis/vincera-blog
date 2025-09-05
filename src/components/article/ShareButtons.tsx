"use client";

import { useMemo, useState } from "react";

type Props = {
  title: string;
  path: string; // e.g. `/post/slug`
  size?: "sm" | "md";
};

export default function ShareButtons({ title, path, size = "md" }: Props) {
  const [copied, setCopied] = useState(false);

  const url = useMemo(() => {
    const origin =
      typeof window !== "undefined"
        ? window.location.origin
        : process.env.NEXT_PUBLIC_BLOG_URL || "https://blog.vincera.com";
    return origin.replace(/\/$/, "") + path;
  }, [path]);

  const btnBase =
    "inline-flex items-center justify-center rounded-full border border-black/15 bg-white hover:bg-black/5 transition h-9 w-9";
  const btnSm = "h-8 w-8";
  const iconBase = "h-4 w-4";

  const S = size === "sm" ? { btn: `${btnBase} ${btnSm}`, icon: iconBase } : { btn: btnBase, icon: iconBase };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const waText = encodeURIComponent(`${title} — ${url}`);

  const items = [
    {
      name: "X (Twitter)",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      svg: (
        <svg viewBox="0 0 24 24" className={S.icon} aria-hidden><path fill="currentColor" d="M18.244 2H21.5l-7.59 8.67L23 22h-6.73l-5.26-6.35L4.7 22H1.5l8.13-9.29L1 2h6.86l4.77 5.77L18.24 2Zm-1.18 18h2.02L7.01 4h-2L17.06 20Z"/></svg>
      ),
    },
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      svg: (
        <svg viewBox="0 0 24 24" className={S.icon} aria-hidden><path fill="currentColor" d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.5 8h4V23h-4V8Zm7.5 0h3.84v2.05h.06C12.66 8.83 14.2 8 16.36 8 21.1 8 22 10.93 22 15.22V23h-4v-6.71c0-1.6-.03-3.66-2.23-3.66-2.24 0-2.58 1.75-2.58 3.55V23h-4V8Z"/></svg>
      ),
    },
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      svg: (
        <svg viewBox="0 0 24 24" className={S.icon} aria-hidden><path fill="currentColor" d="M22 12a10 10 0 1 0-11.56 9.9v-7h-2.2V12h2.2V9.8c0-2.17 1.29-3.37 3.27-3.37.95 0 1.94.17 1.94.17v2.14h-1.09c-1.07 0-1.4.66-1.4 1.33V12h2.38l-.38 2.9h-2v7A10 10 0 0 0 22 12Z"/></svg>
      ),
    },
    {
      name: "WhatsApp",
      href: `https://api.whatsapp.com/send?text=${waText}`,
      svg: (
        <svg viewBox="0 0 24 24" className={S.icon} aria-hidden><path fill="currentColor" d="M20.52 3.48A11.86 11.86 0 0 0 12.02 0C5.4 0 0 5.4 0 12.06c0 2.12.55 4.2 1.6 6.05L0 24l6.06-1.58a12.04 12.04 0 0 0 5.96 1.58h.01c6.63 0 12.02-5.4 12.02-12.06 0-3.22-1.25-6.24-3.53-8.46Zm-8.5 18.07h-.01a10.2 10.2 0 0 1-5.2-1.43l-.37-.22-3.6.94.96-3.51-.24-.36a10.07 10.07 0 1 1 8.46 4.58ZM18 14.57c-.25-.12-1.47-.72-1.7-.8-.23-.08-.4-.12-.57.13-.17.25-.65.8-.8.97-.15.17-.3.19-.55.07-.25-.12-1.06-.39-2.02-1.23-.75-.64-1.25-1.43-1.4-1.67-.15-.25-.02-.38.11-.5.12-.12.25-.3.37-.45.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.07-.12-.57-1.38-.78-1.88-.2-.48-.4-.42-.57-.42l-.49-.01c-.17 0-.43.06-.65.31-.22.25-.85.83-.85 2.02 0 1.19.87 2.35 1 2.51.12.17 1.72 2.6 4.17 3.55.58.25 1.03.39 1.38.5.58.18 1.11.16 1.53.1.47-.07 1.47-.6 1.68-1.18.2-.58.2-1.07.14-1.18-.06-.1-.22-.16-.48-.28Z"/></svg>
      ),
    },
    {
      name: "Reddit",
      href: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
      svg: (
        <svg viewBox="0 0 24 24" className={S.icon} aria-hidden><path fill="currentColor" d="M22 12c0 5.52-4.93 10-11 10S0 17.52 0 12 4.93 2 11 2c5.12 0 9.38 3.14 10.62 7.39.22.05.43.14.62.26.58.4.76 1.2.37 1.8a1.34 1.34 0 0 1-1.2.61c-.23 0-.45-.06-.64-.16a7.96 7.96 0 0 1-2.26 4.13C16.93 18.6 14.2 20 11 20c-3.2 0-5.93-1.4-7.51-3.97A7.96 7.96 0 0 1 1.23 12c0-1.04.2-2.04.57-2.95C3.38 5.48 6.86 3 11 3c4.37 0 8 3.13 8 7Z"/></svg>
      ),
    },
    {
      name: "Email",
      href: `mailto:?subject=${encodedTitle}&body=${encodeURIComponent(`${title}\n\n${url}`)}`,
      svg: (
        <svg viewBox="0 0 24 24" className={S.icon} aria-hidden><path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z"/></svg>
      ),
    },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // no-op
    }
  };

  const canShare = typeof navigator !== "undefined" && !!(navigator as any).share;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {canShare && (
        <button
          onClick={() => (navigator as any).share?.({ title, url })}
          className={`${S.btn} !w-auto px-3 text-sm`}
          aria-label="Share"
          title="Share"
        >
          Share
        </button>
      )}

      {items.map((it) => (
        <a
          key={it.name}
          href={it.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${it.name}`}
          title={`Share on ${it.name}`}
          className={S.btn}
        >
          {it.svg}
        </a>
      ))}

      <button
        onClick={copy}
        className={S.btn}
        aria-label="Copy link"
        title="Copy link"
      >
        {copied ? (
          // simple checkmark
          <svg viewBox="0 0 24 24" className={S.icon} aria-hidden><path fill="currentColor" d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
        ) : (
          // link icon
          <svg viewBox="0 0 24 24" className={S.icon} aria-hidden><path fill="currentColor" d="M3.9 12a5 5 0 0 1 5-5h3v2h-3a3 3 0 1 0 0 6h3v2h-3a5 5 0 0 1-5-5Zm7-3h2v6h-2V9Zm4.2-2h-3v2h3a3 3 0 1 1 0 6h-3v2h3a5 5 0 1 0 0-10Z"/></svg>
        )}
      </button>
    </div>
  );
}
