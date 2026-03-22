import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/sections/site-footer";
import { getBlogPosts } from "@/lib/content";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const posts = await getBlogPosts();
  const post = posts.find((item) => item.slug === slug);
  if (!post) return { title: "Article Not Found" };

  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = await getBlogPosts();
  const post = posts.find((item) => item.slug === slug);

  if (!post) notFound();

  return (
    <>
      <SiteHeader />
      <main className="section-shell py-12 md:py-16">
        <Link href="/blog" className="text-sm text-muted hover:text-text">
          ← Back to blog
        </Link>

        <article className="glass mt-6 rounded-3xl border p-6 md:p-10">
          <p className="text-xs uppercase tracking-[0.14em] text-muted">{post.publishedAt}</p>
          <h1 className="mt-3 text-3xl font-semibold md:text-4xl">{post.title}</h1>
          <p className="mt-4 text-muted">{post.excerpt}</p>

          <div className="relative mt-8 h-72 overflow-hidden rounded-2xl border md:h-[24rem]">
            <Image src={post.coverImage} alt={post.title} fill className="object-cover" sizes="100vw" />
          </div>

          <div className="prose prose-invert mt-8 max-w-none text-base leading-8 text-muted">
            <p>{post.content}</p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full border px-2 py-1 text-xs text-muted">
                {tag}
              </span>
            ))}
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
