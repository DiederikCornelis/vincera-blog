"use client";

import Link from "next/link";
import Image from "next/image";

const MAIN = process.env.NEXT_PUBLIC_MAIN_SITE_URL || "https://www.vncra.com";

export default function BackHomeCTA() {
  return (
    <Link
      href={MAIN}
      aria-label="Back to VINCERA Home"
      className="
        group inline-flex items-center gap-3
        rounded-full border border-black/15 bg-white/90 px-4 h-11
        shadow-sm hover:shadow-md hover:bg-white
        transition-all
        focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30
      "
    >
      <span className="text-sm text-black/60">Back to</span>

      {/* Logo (zet /public/logo.png neer) */}
      <span className="relative h-6 w-24">
        <Image
          src="/logo.png"
          alt="VINCERA"
          fill
          className="object-contain opacity-90 transition-opacity group-hover:opacity-100"
          sizes="96px"
          priority={false}
        />
      </span>

      {/* Animated separator */}
      <span
        aria-hidden
        className="
          block h-5 w-px bg-black/15
          origin-center transition-transform duration-300
          group-hover:scale-y-125 group-hover:bg-black/30
        "
      />

      {/* Home label met underline-animatie */}
      <span
        className="
          relative text-sm font-medium text-black/80
          transition-colors group-hover:text-blue-600
          after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0
          after:bg-blue-600 after:transition-all group-hover:after:w-full
        "
      >
        Home
      </span>

      {/* Klein blauw pijltje dat subtiel inschuift */}
      <span
        aria-hidden
        className="text-blue-600 opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
      >
        →
      </span>
    </Link>
  );
}
