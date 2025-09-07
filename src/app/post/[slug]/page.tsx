import Link from "next/link";
import { fetchPostBySlug, fetchRelated } from "@/lib/posts";
import ReadingProgress from "@/components/article/ReadingProgress";
import { readingTime } from "@/lib/readingTime";
import Hero from "@/components/article/Hero";
import ShareButtons from "@/components/article/ShareButtons";
import BackHomeCTA from "@/components/ui/BackHomeCTA";
import type { Metadata } from "next";

// 🚀 Force dynamic runtime
export const dynamic = "force-dynamic";
export const revalidate = 0;

// helper: accepteert object of Promise (compat voor localhost + Next 15)
async function resolveMaybePromise<T>(v: T | Promise<T> | undefined) {
  const anyV = v as any;
  if (anyV && typeof anyV.then === "function") return (await v) as T;
  return v as T;
}

type Params = { slug: string };

// 🎯 Dynamic metadata per artikel
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await resolveMaybePromise<Params>(params);
  const post = await fetchPostBySlug(slug);

  if (!post) return { title: "Post not found" };

  const url = `https://blog.vncra.com/post/${post.slug}`;
  const image = post.cover || "https://blog.vncra.com/og-default.jpg";

  return {
    title: post.title,
    description: post.excerpt || "Read this article on VINCERA Blog.",
    openGraph: {
      title: post.title,
      description: post.excerpt || "",
      url,
      siteName: "VINCERA Blog",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || "",
      images: [image],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Params | Promise<Params>;
}) {
  const { slug } = (await resolveMaybePromise<Params>(params)) ?? { slug: "" };

  const post = await fetchPostBySlug(slug);
  if (!post)
    return <div className="mx-auto max-w-3xl px-4 py-10">Not found</div>;

  const related = await fetchRelated(post);

  return (
    <>
      <ReadingProgress targetId="article-root" />

      <Hero
        cover={post.cover ?? ""}
        title={post.title}
        meta={`${new Date(post.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })} • ${post.category} • ${post.author ?? ""} • ${readingTime(
          post.content || ""
        )}`}
      />

      <article id="article-root" className="relative z-10">
        {/* Breadcrumbs */}
        <nav className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-4 text-sm text-black/60">
          <Link
            href={process.env.NEXT_PUBLIC_MAIN_SITE_URL || "https://www.vncra.com"}
            className="hover:underline"
          >
            VINCERA Home
          </Link>{" "}
          › <Link href="/" className="hover:underline">Blog</Link>{" "}
          ›{" "}
          <Link
            href={`/?category=${post.category}`}
            className="hover:underline"
          >
            {post.category}
          </Link>{" "}
          › <span className="text-black">{post.title}</span>
        </nav>

        {/* Article body */}
        <div className="mx-auto max-w-3xl -mt-6 px-4 sm:px-6 lg:px-8">
          <div className="prose lg:prose-lg">
            <div dangerouslySetInnerHTML={{ __html: post.content || "" }} />
          </div>

          <div className="mt-10">
            <ShareButtons title={post.title} path={`/post/${post.slug}`} />
          </div>

          {/* Related posts */}
          {related.length > 0 && (
            <section className="mt-16">
              <h2 className="text-xl font-semibold mb-6">More like this</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((p, i) => (
                  <Link
                    key={p.slug}
                    href={`/post/${p.slug}`}
                    className="group block rounded-lg border border-black/10 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    style={{
                      animation: `fadeInUp .4s ease ${i * 0.1 + 0.1}s both`,
                    }}
                  >
                    <h3 className="font-medium text-base text-black group-hover:text-blue-600 transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-sm text-black/60 mt-1">{p.category}</p>
                    <span className="mt-2 inline-block text-xs text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      Read more →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* CTA */}
          <div className="mt-12">
            <BackHomeCTA />
          </div>
        </div>
      </article>
    </>
  );
}
