"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CHIPS } from "@/lib/data";

const MOBILE_CHIPS = ["Entrepreneurs", "Creators", "Athletes", "Professionals"];

export default function Chips() {
  const router = useRouter();
  const params = useSearchParams();
  const active = params.get("chip") || "";

  const push = (v: string) => {
    const q = new URLSearchParams(params.toString());
    if (active === v) q.delete("chip");
    else q.set("chip", v);
    q.delete("page");
    router.push(`/?${q.toString()}`);
  };

  return (
    <>
      {/* Mobiel: alleen de 4 gekozen */}
      <div className="flex flex-wrap gap-2 sm:hidden">
        {MOBILE_CHIPS.map((c) => {
          const isActive = active === c;
          return (
            <button
              key={c}
              onClick={() => push(c)}
              type="button"
              className={`relative h-8 px-3 rounded-full border text-sm transition-all
                ${
                  isActive
                    ? "border-black bg-black text-white shadow-[0_2px_10px_rgba(0,0,0,.15)]"
                    : "border-black/20 bg-white text-black hover:-translate-y-0.5 hover:shadow-sm"
                }`}
              aria-pressed={isActive}
            >
              {c}
            </button>
          );
        })}
      </div>

      {/* Desktop: alle categorieën */}
      <div className="hidden sm:flex flex-wrap gap-2">
        {CHIPS.map((c) => {
          const isActive = active === c;
          return (
            <button
              key={c}
              onClick={() => push(c)}
              type="button"
              className={`relative h-8 px-3 rounded-full border text-sm transition-all
                ${
                  isActive
                    ? "border-black bg-black text-white shadow-[0_2px_10px_rgba(0,0,0,.15)]"
                    : "border-black/20 bg-white text-black hover:-translate-y-0.5 hover:shadow-sm"
                }`}
              aria-pressed={isActive}
            >
              {c}
            </button>
          );
        })}
      </div>
    </>
  );
}
