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
        if (q) s.set("q", q); else s.delete("q");
        s.delete("page");
        router.push(`/?${s.toString()}`);
      }}
      className="flex items-center"
      aria-label="Search posts"
    >
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search…"
        className="h-9 w-44 sm:w-64 rounded border border-black/15 bg-white px-3 text-sm"
        aria-label="Search"
      />
    </form>
  );
}
