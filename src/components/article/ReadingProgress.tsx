"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress({ targetId }: { targetId: string }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;

    const getStartTop = () => {
      const rect = el.getBoundingClientRect();
      return rect.top + window.scrollY; // absolute top
    };

    const onScroll = () => {
      const startTop = getStartTop();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(window.scrollY - startTop, 0), Math.max(total, 0));
      const value = total > 0 ? (scrolled / total) * 100 : 0;
      setPct(value);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [targetId]);

  return (
    <div className="fixed left-0 right-0 top-0 z-50 h-[3px] bg-black/10">
      <div
        className="h-full bg-black transition-[width] duration-150 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
