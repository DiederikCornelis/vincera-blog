// src/lib/data.ts

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;      // markdown/html later
  category: Category;
  tags: string[];
  date: string;         // ISO
  cover: string;        // Next/Image (can point to Supabase CDN)
  author: string;
};

export const CATEGORIES = [
  "Entrepreneurs",
  "Scientists",
  "Explorers",
  "Creators",
  "Artists",
  "Athletes",
  "Traders",
  "Professionals",
  "Leaders",
] as const;

export type Category = typeof CATEGORIES[number];

// Chips = same set as categories
export const CHIPS = [
  "Entrepreneurs",
  "Scientists",
  "Explorers",
  "Creators",
  "Artists",
  "Athletes",
  "Traders",
  "Professionals",
  "Leaders",
] as const;

const demo = (p: Partial<Post> & Pick<Post, "slug">): Post => ({
  title: "Ambition in Action",
  excerpt: "A short introduction about the conversation and key insights.",
  content: `
    <h2>Introduction</h2>
    <p>Body text with <strong>insight</strong> and <em>story</em>.</p>
    <h3>Paragraph</h3>
    <p>More text goes here.</p>
  `,
  category: "Professionals",
  tags: ["interview", "ambition"],
  date: "2025-08-01",
  cover: "/covers/demo.jpg",
  author: "Editorial",
  ...p,
});

export const POSTS: Post[] = [
  demo({ slug: "ambition-1", category: "Entrepreneurs" }),
  demo({ slug: "ambition-2", category: "Scientists" }),
  demo({ slug: "ambition-3", category: "Explorers" }),
  demo({ slug: "ambition-4", category: "Creators" }),
  demo({ slug: "ambition-5", category: "Artists" }),
  demo({ slug: "ambition-6", category: "Athletes" }),
  demo({ slug: "ambition-7", category: "Traders" }),
  demo({ slug: "ambition-8", category: "Professionals" }),
  demo({ slug: "ambition-9", category: "Leaders" }),
];

export function queryPosts(params: {
  q?: string;
  category?: string;
  chip?: string;
  page?: number;
  pageSize?: number;
}) {
  const { q, category, chip, page = 1, pageSize = 6 } = params;
  let list = POSTS.slice().sort((a, b) => (a.date < b.date ? 1 : -1));

  // filter by category or chip (chip = alias for category)
  const catFilter = chip || category;
  if (catFilter) list = list.filter(p => p.category === catFilter);

  if (q) {
    const s = q.toLowerCase();
    list = list.filter(p =>
      p.title.toLowerCase().includes(s) ||
      p.excerpt.toLowerCase().includes(s) ||
      p.tags.some(t => t.toLowerCase().includes(s))
    );
  }

  const start = (page - 1) * pageSize;
  const end   = start + pageSize;
  const pageItems = list.slice(start, end);
  const hasMore = end < list.length;

  return { items: pageItems, hasMore, total: list.length };
}

export function findPost(slug: string) {
  return POSTS.find(p => p.slug === slug) || null;
}

export function relatedPosts(post: Post, n = 3) {
  const byTagOrCat = POSTS.filter(p =>
    p.slug !== post.slug &&
    (p.category === post.category || p.tags.some(t => post.tags.includes(t)))
  );
  return byTagOrCat.slice(0, n);
}
