import Image from "next/image";
import Link from "next/link";
import type { BlogPostItem } from "@/types/content";

export function BlogPreviewSection({ posts }: { posts: BlogPostItem[] }) {
  const topPosts = posts.slice(0, 3);

  return (
    <section className="section-shell py-16 md:py-24">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="section-title">Latest Articles</h2>
          <p className="section-subtitle">Technical writing on engineering execution, scale, and product delivery.</p>
        </div>
        <Link href="/blog" className="rounded-xl border px-4 py-2 text-sm font-medium">
          View all
        </Link>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {topPosts.map((post) => (
          <article key={post.slug} className="glass rounded-3xl border p-4">
            <div className="relative h-40 overflow-hidden rounded-2xl">
              <Image src={post.coverImage} alt={post.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
            </div>
            <p className="mt-3 text-xs uppercase tracking-[0.12em] text-muted">{post.publishedAt}</p>
            <h3 className="mt-2 text-lg font-semibold">{post.title}</h3>
            <p className="mt-1 text-sm text-muted">{post.excerpt}</p>
            <Link href={`/blog/${post.slug}`} className="mt-4 inline-block text-sm font-semibold text-brand">
              Read more →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
