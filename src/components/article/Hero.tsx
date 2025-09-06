"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  cover: string;
  title: string;
  meta: string;
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

  const translate = Math.max(0, Math.min(y * 0.08, 48));
  const scale = 1 + Math.min(y * 0.0004, 0.06);

  return (
    <header className="relative w-full">
      <div
        className="
          relative w-full overflow-hidden
          h-[56vh] min-h-[360px]   /* desktop: blijft zoals je had */
          sm:h-[56vh] sm:min-h-[360px]
          max-sm:h-[200px] max-sm:min-h-[200px]  /* mobiel: breedbeeld */
        "
      >
        <Image
          src={cover}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover will-change-transform"
          style={{
            transform: `translateY(${translate}px) scale(${scale})`,
            objectPosition: "center",
          }}
        />

        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/10 via-black/20 to-[var(--surface)]/98" />

        <div className="absolute inset-x-0 bottom-0 z-10">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-4">
            <h1
              className="
                text-3xl sm:text-4xl font-semibold tracking-tight text-white
                drop-shadow-[0_2px_10px_rgba(0,0,0,.45)]
                max-sm:text-lg max-sm:leading-snug
              "
            >
              {title}
            </h1>
            <p className="mt-1 text-sm text-white/85 drop-shadow-[0_1px_6px_rgba(0,0,0,.45)] max-sm:text-xs">
              {meta}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
