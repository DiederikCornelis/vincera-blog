console.log("SUPABASE_URL =", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log("SUPABASE_KEY length =", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length);
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
