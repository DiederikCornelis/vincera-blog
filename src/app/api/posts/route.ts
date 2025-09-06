import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET /api/posts?limit=6&category=Traders
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get("limit") ?? "6");
  const category = searchParams.get("category") ?? undefined;

  // 1) Eerst featured (op featured_rank ASC, dan date DESC)
  let featuredQ = supabase
    .from("posts")
    .select("id,slug,title,excerpt,category,tags,date,cover,author,featured,featured_rank")
    .eq("featured", true)
    .order("featured_rank", { ascending: true, nullsFirst: false })
    .order("date", { ascending: false })
    .limit(limit);

  if (category) featuredQ = featuredQ.eq("category", category);

  const { data: featured, error: fErr } = await featuredQ;
  if (fErr) return NextResponse.json({ error: fErr.message }, { status: 500 });

  // 2) Daarna nieuwste niet-featured zodat we tot 'limit' totaal komen
  const remaining = Math.max(0, limit - (featured?.length ?? 0));

  let rest: any[] = [];
  if (remaining > 0) {
    let restQ = supabase
      .from("posts")
      .select("id,slug,title,excerpt,category,tags,date,cover,author,featured,featured_rank")
      .eq("featured", false)
      .order("date", { ascending: false })
      .limit(remaining);

    if (category) restQ = restQ.eq("category", category);

    const { data: restData, error: rErr } = await restQ;
    if (rErr) return NextResponse.json({ error: rErr.message }, { status: 500 });
    rest = restData ?? [];
  }

  const items = [...(featured ?? []), ...rest];

  // CORS: zodat je hoofdsite (ander domein) veilig kan fetchen
  const res = NextResponse.json({ items });
  res.headers.set("Access-Control-Allow-Origin", "*"); // kun je later strakker maken naar https://www.vncra.com
  res.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return res;
}

// Preflight
export function OPTIONS() {
  const res = new NextResponse(null, { status: 204 });
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return res;
}
