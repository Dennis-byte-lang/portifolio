import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/sections/site-footer";
import { getBlogPosts } from "@/lib/content";

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <SiteHeader />
      <main className="section-shell py-16 md:py-20">
        <h1 className="section-title">Insights & Engineering Notes</h1>
        <p className="section-subtitle">Practical write-ups on product architecture, performance, and scaling experiences.</p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <article key={post.slug} className="glass rounded-3xl border p-4">
              <div className="relative h-48 overflow-hidden rounded-2xl">
                <Image src={post.coverImage} alt={post.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <p className="mt-4 text-xs uppercase tracking-[0.14em] text-muted">{post.publishedAt}</p>
              <h2 className="mt-2 text-xl font-semibold">{post.title}</h2>
              <p className="mt-2 text-sm text-muted">{post.excerpt}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full border px-2 py-1 text-xs text-muted">
                    {tag}
                  </span>
                ))}
              </div>
              <Link href={`/blog/${post.slug}`} className="mt-5 inline-block rounded-xl bg-brand px-4 py-2 text-sm font-medium text-white">
                Read Article
              </Link>
            </article>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
