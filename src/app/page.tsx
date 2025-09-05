// src/app/page.tsx
import PostCard from "@/components/PostCard";
import Chips from "@/components/ui/Chips";
import Link from "next/link";
import ReadingProgress from "@/components/article/ReadingProgress";
import { fetchPosts } from "@/lib/posts";

export const revalidate = 120;

export default async function Home({
  searchParams,
}: {
  searchParams: {
    q?: string;
    category?: string;
    page?: string;
  };
}) {
  const page = Number(searchParams.page ?? "1");

  const { items, hasMore } = await fetchPosts({
    q: searchParams.q,
    category: searchParams.category,
    page,
    pageSize: 6,
  });

  const nextHref = (() => {
    const q = new URLSearchParams();
    if (searchParams.q) q.set("q", searchParams.q);
    if (searchParams.category) q.set("category", searchParams.category);
    q.set("page", String(page + 1));
    return `/?${q.toString()}`;
  })();

  return (
    <>
      {/* Reading progress bar */}
      <ReadingProgress targetId="home-root" />

      <div id="home-root" className="space-y-6">
        {/* Filters (category/search) */}
        <Chips />

        {/* List */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </section>

        {/* Pagination */}
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
