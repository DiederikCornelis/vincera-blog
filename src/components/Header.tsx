"use client";

import Link from "next/link";
import Image from "next/image";
import CategoryDropdown from "./ui/CategoryDropdown";
import SearchInput from "./ui/SearchInput";
import { useEffect, useRef, useState, Suspense } from "react";

const MAIN = process.env.NEXT_PUBLIC_MAIN_SITE_URL || "https://www.vncra.com";

export default function Header() {
  const lastY = useRef(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const diff = y - lastY.current;
      if (y > 64 && diff > 0) setHidden(true);
      else setHidden(false);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b border-black/10 bg-white/90 backdrop-blur transition-transform duration-200 ${
        hidden ? "-translate-y-16" : "translate-y-0"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: logo + divider + Blog */}
        <div className="flex items-center gap-3">
          <Link
            href={MAIN}
            className="flex items-center group"
            aria-label="Back to VINCERA Home"
          >
            <Image
              src="/logo.png"
              alt="VINCERA Logo"
              width={160}
              height={36}
              priority
              className="h-7 w-auto sm:h-8 transition duration-300 group-hover:brightness-150 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
            />
          </Link>

          <span className="hidden sm:inline-block h-5 w-px bg-black/10 mx-1" />

          <Link
            href="/"
            className="text-sm font-medium text-black/70 hover:text-black transition-colors"
          >
            Blog
          </Link>
        </div>

        {/* Right: wrap CSR hooks in Suspense to satisfy Next 15 */}
        <div className="flex items-center gap-3">
          <Suspense fallback={null}>
            <CategoryDropdown />
          </Suspense>
          <Suspense fallback={null}>
            <SearchInput />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
