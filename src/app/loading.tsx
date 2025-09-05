export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-8 w-24 rounded-full bg-black/[0.06] animate-pulse" />
        ))}
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-black/10 overflow-hidden">
            <div className="aspect-[16/9] bg-black/[0.06] animate-pulse" />
            <div className="p-4 space-y-2">
              <div className="h-3 w-28 bg-black/[0.06] animate-pulse rounded" />
              <div className="h-5 w-3/4 bg-black/[0.08] animate-pulse rounded" />
              <div className="h-4 w-full bg-black/[0.06] animate-pulse rounded" />
              <div className="h-4 w-5/6 bg-black/[0.06] animate-pulse rounded" />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
