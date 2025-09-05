// src/app/debug/page.tsx
export const dynamic = "force-dynamic"; // avoid ISR cache for debugging

import { fetchPosts } from "@/lib/posts";

export default async function DebugPage() {
  const res = await fetchPosts({ page: 1, pageSize: 20 });

  return (
    <div style={{ padding: 16 }}>
      <h1 style={{ fontSize: 18, marginBottom: 12 }}>Debug: fetchPosts()</h1>
      <pre style={{ fontSize: 12, lineHeight: 1.4 }}>
        {JSON.stringify(res, null, 2)}
      </pre>
    </div>
  );
}
