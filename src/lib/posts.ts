// src/lib/posts.ts
import { supabase } from "./supabase";

export type Post = {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  category: string;
  tags: string | null;    // bij jou staat 'tags' als text, dus geen array
  date: string;           // ISO string
  cover: string | null;
  author: string | null;
};

export async function fetchPosts(opts: {
  q?: string;
  category?: string;
  chip?: string;               // 👈 nieuw
  page?: number;
  pageSize?: number;
}) {
  const { q, category, chip, page = 1, pageSize = 6 } = opts;

  try {
    let query = supabase
      .from("posts")
      .select("id, slug, title, excerpt, category, tags, date, cover, author", { count: "exact" })
      .order("date", { ascending: false });

    if (category) {
      query = query.eq("category", category);
    }

    if (q && q.trim()) {
      query = query.or(
        `title.ilike.%${q}%,excerpt.ilike.%${q}%,tags.ilike.%${q}%`
      );
    }

    // 👇 CHIP-filter toevoegen
    if (chip && chip.trim()) {
      const term = chip.trim();
      // Als er geen category actief is, laat chip ook category matchen
      const chipOr = category
        ? `title.ilike.%${term}%,excerpt.ilike.%${term}%,tags.ilike.%${term}%`
        : `category.eq.${term},title.ilike.%${term}%,excerpt.ilike.%${term}%,tags.ilike.%${term}%`;

      query = query.or(chipOr);
    }

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, count, error } = await query.range(from, to);
    if (error) throw error;

    return {
      items: (data ?? []) as Post[],
      total: count ?? 0,
      hasMore: count ? to + 1 < count : false,
    };
  } catch (err) {
    console.error("fetchPosts error:", err);
    return { items: [], total: 0, hasMore: false };
  }
}

export async function fetchPostBySlug(slug: string) {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) return null;
    return data as Post;
  } catch (err) {
    console.error("fetchPostBySlug error:", err);
    return null;
  }
}

export async function fetchRelated(post: Post, n = 3) {
  try {
    const { data } = await supabase
      .from("posts")
      .select("slug, title, category")
      .neq("slug", post.slug)
      .eq("category", post.category)
      .order("date", { ascending: false })
      .limit(n);

    return (data ?? []) as Pick<Post, "slug" | "title" | "category">[];
  } catch (err) {
    console.error("fetchRelated error:", err);
    return [];
  }
}
