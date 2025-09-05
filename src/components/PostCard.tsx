"use client";

import Image from "next/image";
import Link from "next/link";
import { Post } from "@/lib/posts";

export default function PostCard({ post }: { post: Post }) {
  return (
    <article
      className="group card rounded-xl border border-black/10 bg-white overflow-hidden shadow-sm transition-all duration-300 hover:border-blue-400 hover:shadow-lg"
    >
      <Link
        href={`/post/${post.slug}`}
        className="block relative aspect-[16/9] overflow-hidden"
      >
        <Image
          src={post.cover || "/placeholder.png"}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover card-img"
          priority={false}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMB/Ur0YcAAAAAASUVORK5CYII="
        />
        {/* Overlay on hover */}
        <div className="pointer-events-none absolute inset-0 bg-blue-500/0 transition-colors duration-300 group-hover:bg-blue-500/15" />
      </Link>

      <div className="p-4 space-y-2">
        <div className="text-xs uppercase tracking-wide text-black/60">
          {post.category} •{" "}
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>

        <h3 className="text-lg font-semibold leading-tight flex items-center gap-1">
          <Link
            href={`/post/${post.slug}`}
            className="hover:text-blue-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded transition-colors flex items-center gap-1"
          >
            {post.title}
            <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-blue-600">
              →
            </span>
          </Link>
        </h3>

        {post.excerpt && (
          <p className="text-sm text-black/70 line-clamp-3">{post.excerpt}</p>
        )}
      </div>
    </article>
  );
}
