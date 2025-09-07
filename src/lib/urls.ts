// src/lib/urls.ts
export const siteUrl =
  process.env.NEXT_PUBLIC_BLOG_URL || "https://blog.vncra.com";

export function absoluteUrl(path: string) {
  const base = siteUrl.replace(/\/$/, "");
  if (!path) return base;
  return path.startsWith("http") ? path : `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
