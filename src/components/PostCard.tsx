"use client";

import Image from "next/image";
import Link from "next/link";
import { Post } from "@/lib/posts";

export default function PostCard({ post }: { post: Post }) {
  const href = `/post/${post.slug}`;
  const date = post.date
    ? new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <article
      className={`
        group rounded-xl border border-black/10 bg-white overflow-hidden shadow-sm
        transition-all duration-300
        hover:border-blue-400 hover:shadow-lg
        active:border-blue-400 active:shadow-md
      `}
    >
      {/* Thumb */}
      <Link
        href={href}
        className={`
          block relative overflow-hidden
          h-40 sm:h-auto sm:aspect-[16/9]
        `}
      >
        <Image
          src={post.cover || "/placeholder.png"}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className={`
            object-cover transition-transform duration-300
            group-hover:scale-105 group-active:scale-105
          `}
          priority={false}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMB/Ur0YcAAAAAASUVORK5CYII="
        />
        <div
          className={`
            pointer-events-none absolute inset-0 bg-blue-500/0
            transition-colors duration-300
            group-hover:bg-blue-500/15 group-active:bg-blue-500/15
          `}
        />
      </Link>

      {/* Body */}
      <div className="p-3 sm:p-4 space-y-1.5 sm:space-y-2">
        {/* Meta */}
        <div className="text-[11px] sm:text-xs uppercase tracking-wide text-black/60">
          {post.category}
          {date ? (
            <>
              {" "}
              •{" "}
              <span className="hidden sm:inline">{date}</span>
              <span className="inline sm:hidden">
                {new Date(post.date!).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </>
          ) : null}
        </div>

        {/* Title */}
        <h3
          className={`
            font-semibold
            text-[15px] leading-snug
            sm:text-lg sm:leading-tight
            flex items-center gap-1
          `}
        >
          <Link
            href={href}
            className={`
              flex items-center gap-1 rounded transition-colors
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400
              hover:text-blue-600 hover:underline
              active:text-blue-600
            `}
          >
            {post.title}
            <span
              className={`
                text-blue-600 transition-all duration-300
                opacity-0 -translate-x-1
                group-hover:opacity-100 group-hover:translate-x-0
                group-active:opacity-100 group-active:translate-x-0
              `}
            >
              →
            </span>
          </Link>
        </h3>

        {/* Excerpt */}
        {post.excerpt && (
          <p
            className={`
              text-[13px] leading-5 text-black/70
              line-clamp-3
              sm:text-sm sm:leading-6 sm:line-clamp-none
            `}
          >
            {post.excerpt}
          </p>
        )}
      </div>
    </article>
  );
}
