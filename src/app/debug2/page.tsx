export const dynamic = "force-dynamic";

import { supabase } from "@/lib/supabase";

export default async function Debug2() {
  const { data, error } = await supabase.from("posts").select("*").limit(5);
  return (
    <div style={{ padding: 16 }}>
      <h1 style={{ fontSize: 18, marginBottom: 12 }}>Debug: raw supabase</h1>
      <pre style={{ fontSize: 12 }}>{JSON.stringify({ data, error }, null, 2)}</pre>
    </div>
  );
}
