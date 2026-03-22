import type { MetadataRoute } from "next";
import { defaultProjects } from "@/lib/default-content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://example.com";

  const projectRoutes = defaultProjects.map((project) => ({
    url: `${base}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...projectRoutes,
  ];
}
