"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchInput() {
  const router = useRouter();
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") || "");
  const [open, setOpen] = useState(false);        // drawer visible
  const [showUI, setShowUI] = useState(false);    // for enter/exit animation

  // keep q synced with URL
  useEffect(() => setQ(params.get("q") || ""), [params]);

  // lock body scroll + drive enter/exit transitions
  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
      // small delay so CSS transitions see the state change
      const t = setTimeout(() => setShowUI(true), 15);
      return () => { clearTimeout(t); };
    } else {
      setShowUI(false);
      document.body.classList.remove("overflow-hidden");
    }
  }, [open]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const s = new URLSearchParams(params.toString());
    if (q) s.set("q", q); else s.delete("q");
    s.delete("page");
    router.push(`/?${s.toString()}`);
    setOpen(false);
  };

  return (
    <>
      {/* 🔍 Mobile icon only */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="sm:hidden text-lg text-black/70 hover:text-black"
        aria-label="Open search"
      >
        🔍
      </button>

      {/* 🖥️ Desktop search stays inline */}
      <form
        onSubmit={submit}
        className="relative min-w-0 w-28 sm:w-64 hidden sm:block"
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

      {/* 📱 Mobile overlay + drawer */}
      {open && (
        <div className="fixed inset-0 z-[70] sm:hidden">
          {/* Overlay with fade + blur */}
          <div
            className={`
              absolute inset-0 transition-opacity duration-200
              ${showUI ? "opacity-100" : "opacity-0"}
              bg-black/50 backdrop-blur-sm
            `}
            onClick={() => setOpen(false)}
            aria-hidden
          />

          {/* Sliding panel from the top */}
          <div
            className={`
              absolute inset-x-0 top-0 bg-white shadow-xl
              transition-transform duration-250 ease-out
              ${showUI ? "translate-y-0" : "-translate-y-full"}
              p-4 pt-5
              rounded-b-2xl
            `}
            role="dialog"
            aria-modal="true"
            aria-label="Search"
          >
            <form onSubmit={submit} className="flex items-center gap-2">
              <span aria-hidden className="text-black/60">🔎</span>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search…"
                autoFocus
                className="
                  flex-1 h-10 rounded-md border border-black/15 px-3
                  text-sm placeholder:text-black/40
                  focus:outline-none focus:ring-2 focus:ring-blue-400
                "
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-sm px-3 py-1 rounded border border-black/20 hover:bg-black/5"
                aria-label="Close search"
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
