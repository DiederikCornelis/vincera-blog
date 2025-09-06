// src/app/page.tsx
import PostCard from "@/components/PostCard";
import Chips from "@/components/ui/Chips";
import Link from "next/link";
import ReadingProgress from "@/components/article/ReadingProgress";
import { fetchPosts } from "@/lib/posts";

// 🚀 Force dynamic runtime
export const dynamic = "force-dynamic";
export const revalidate = 0;

// helper: accepteert object of Promise
async function resolveMaybePromise<T>(v: T | Promise<T> | undefined) {
  const anyV = v as any;
  if (anyV && typeof anyV.then === "function") return (await v) as T;
  return v as T;
}

type SP = Record<string, string | string[] | undefined>;

export default async function Home({
  searchParams,
}: {
  searchParams?: SP | Promise<SP>;
}) {
  const sp = (await resolveMaybePromise<SP>(searchParams)) ?? {};

  const q = (sp.q as string) || undefined;
  const category = (sp.category as string) || undefined;
  const page = Number((sp.page as string) || "1");

  const { items, hasMore } = await fetchPosts({
    q,
    category,
    page,
    pageSize: 6,
  });

  const nextHref = (() => {
    const qs = new URLSearchParams();
    if (q) qs.set("q", q);
    if (category) qs.set("category", category);
    qs.set("page", String(page + 1));
    return `/?${qs.toString()}`;
  })();

  return (
    <>
      <ReadingProgress targetId="home-root" />
      <div id="home-root" className="space-y-6">
        <Chips />
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </section>
        <div className="flex justify-center pt-2">
          {hasMore ? (
            <Link
              href={nextHref}
              className="h-10 px-5 rounded border border-black/15 hover:bg-black/5 text-sm inline-flex items-center"
            >
              Load more
            </Link>
          ) : (
            <span className="text-sm text-black/50">All posts loaded</span>
          )}
        </div>
      </div>
    </>
  );
}
