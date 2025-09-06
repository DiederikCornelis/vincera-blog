"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function SearchInput() {
  const router = useRouter();
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") || "");

  useEffect(() => setQ(params.get("q") || ""), [params]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const s = new URLSearchParams(params.toString());
        if (q) s.set("q", q);
        else s.delete("q");
        s.delete("page");
        router.push(`/?${s.toString()}`);
      }}
      className="relative min-w-0 w-28 sm:w-64"  /* mobiel smal, desktop jouw oude breedte */
      aria-label="Search posts"
    >
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search…"
        aria-label="Search"
        className="
          w-full h-9 rounded-md border border-black/15 bg-white
          pl-8 pr-3 text-[13px] placeholder:text-black/40
          focus:outline-none focus:ring-2 focus:ring-blue-400
          sm:h-10 sm:text-sm sm:pl-9
        "
      />
      <span
        aria-hidden
        className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-black/40 text-sm sm:text-base"
      >
        🔎
      </span>
    </form>
  );
}
