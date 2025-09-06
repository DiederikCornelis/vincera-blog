// src/app/not-found.tsx
"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="text-3xl font-bold mb-4">404 — Page Not Found</h1>
      <p className="text-black/60 mb-8">
        Oeps, deze pagina bestaat niet of is verplaatst.
      </p>
      <Link
        href="/"
        className="inline-flex h-10 items-center rounded border border-black/15 px-4 text-sm hover:bg-black/5"
      >
        Terug naar Home
      </Link>
    </div>
  );
}
