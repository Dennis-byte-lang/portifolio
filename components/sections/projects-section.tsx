"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import type { ProjectItem, ProjectCategory } from "@/types/content";

const categories: Array<{ label: string; value: "all" | ProjectCategory }> = [
  { label: "All", value: "all" },
  { label: "Web", value: "web" },
  { label: "Mobile", value: "mobile" },
  { label: "Backend", value: "backend" },
  { label: "Fullstack", value: "fullstack" },
];

export function ProjectsSection({ projects }: { projects: ProjectItem[] }) {
  const [active, setActive] = useState<(typeof categories)[number]["value"]>("all");

  const filtered = useMemo(() => {
    if (active === "all") return projects;
    return projects.filter((project) => project.category === active);
  }, [active, projects]);

  return (
    <section id="projects" className="section-shell py-16 md:py-24">
      <h2 className="section-title">Projects</h2>
      <p className="section-subtitle">Case-study depth with product context, architecture decisions, and delivery outcomes.</p>

      <div className="mt-8 flex flex-wrap gap-3">
        {categories.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => setActive(item.value)}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              active === item.value ? "bg-brand text-white" : "glass text-text"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-8 columns-1 gap-6 md:columns-2 xl:columns-3">
        {filtered.map((project, index) => (
          <motion.article
            key={project.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.16 }}
            transition={{ duration: 0.45, delay: index * 0.05 }}
            className="glass mb-6 break-inside-avoid rounded-3xl border p-4"
          >
            <div className="relative h-52 overflow-hidden rounded-2xl">
              <Image src={project.coverImage} alt={project.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
            </div>
            <h3 className="mt-4 text-xl font-semibold">{project.title}</h3>
            <p className="mt-2 text-sm text-muted">{project.summary}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.techStack.slice(0, 4).map((tag) => (
                <span key={tag} className="rounded-full border px-2 py-1 text-xs text-muted">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-3 text-sm">
              <Link href={`/projects/${project.slug}`} className="rounded-xl bg-brand px-3 py-2 font-medium text-white">
                View case study
              </Link>
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-xl border px-3 py-2">
                  <ExternalLink className="size-4" /> Live
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-xl border px-3 py-2">
                  <Github className="size-4" /> GitHub
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
