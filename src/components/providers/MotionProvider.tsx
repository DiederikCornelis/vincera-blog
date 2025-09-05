"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // smooth scroll naar top bij routewissel
    window.scrollTo({ top: 0, behavior: "smooth" });

    // CSS fade/slide in
    const el = ref.current;
    if (!el) return;
    el.classList.remove("route-enter-active");
    el.classList.add("route-enter");
    // force reflow
    void el.offsetWidth;
    el.classList.add("route-enter-active");

    const t = setTimeout(() => el.classList.remove("route-enter", "route-enter-active"), 250);
    return () => clearTimeout(t);
  }, [path]);

  return <div ref={ref}>{children}</div>;
}
