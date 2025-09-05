"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CATEGORIES } from "@/lib/data";
import { useState, useRef, useEffect } from "react";

export default function CategoryDropdown() {
  const router = useRouter();
  const params = useSearchParams();
  const current = params.get("category") || "";
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const apply = (val: string) => {
    const q = new URLSearchParams(params.toString());
    if (val) q.set("category", val); else q.delete("category");
    q.delete("page");
    router.push(`/?${q.toString()}`);
    setOpen(false);
  };

  const label = current || "All categories";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="h-9 rounded border border-black/15 bg-white text-black px-3 text-sm inline-flex items-center gap-2"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select category"
      >
        {label}
        <span className={`transition-transform ${open ? "rotate-180" : ""}`}>▼</span>
      </button>

      {open && (
        <div
          className="absolute left-0 top-full z-30 mt-1 w-56 rounded-lg border border-black/10 bg-white shadow-xl overflow-hidden menu-anim"
          data-open="true"
          role="listbox"
          aria-label="Categories"
        >
          <button
            onClick={() => apply("")}
            className={`w-full text-left px-3 py-2 text-sm text-black hover:bg-black/5 ${current === "" ? "bg-black/5" : ""}`}
            role="option"
            aria-selected={current === ""}
          >
            All categories
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => apply(c)}
              className={`w-full text-left px-3 py-2 text-sm text-black hover:bg-black/5 ${current === c ? "bg-black/5" : ""}`}
              role="option"
              aria-selected={current === c}
            >
              {c}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
