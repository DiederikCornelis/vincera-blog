"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  cover: string;
  title: string;
  meta: string; // preformatted: e.g. "Sep 4, 2025 • Entrepreneurs • John • 5 min read"
};

export default function Hero({ cover, title, meta }: Props) {
  const [y, setY] = useState(0);

  useEffect(() => {
    const onScroll = () => setY(window.scrollY || 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Parallax values (very subtle)
  const translate = Math.max(0, Math.min(y * 0.08, 48)); // px
  const scale = 1 + Math.min(y * 0.0004, 0.06); // up to +6%

  return (
    <header className="relative h-[56vh] min-h-[360px] w-full overflow-hidden">
      {/* Cover */}
      <Image
        src={cover}
        alt={title}
        fill
        priority
        sizes="100vw"
        className="object-cover will-change-transform"
        style={{ transform: `translateY(${translate}px) scale(${scale})` }}
      />

      {/* Gradient to surface for legibility */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/10 via-black/20 to-[var(--surface)]/98" />

      {/* Title + meta overlay */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-6">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,.45)]">
            {title}
          </h1>
          <p className="mt-2 text-sm text-white/85 drop-shadow-[0_1px_6px_rgba(0,0,0,.45)]">
            {meta}
          </p>
        </div>
      </div>
    </header>
  );
}
