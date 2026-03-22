import type { MetadataRoute } from "next";
import { defaultBlogPosts, defaultProjects } from "@/lib/default-content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://example.com";

  const projectRoutes = defaultProjects.map((project) => ({
    url: `${base}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogRoutes = defaultBlogPosts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...projectRoutes,
    ...blogRoutes,
  ];
}
