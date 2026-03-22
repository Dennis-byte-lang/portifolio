import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ExternalLink, Github } from "lucide-react";
import { getProjects } from "@/lib/content";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const projects = await getProjects();
  const project = projects.find((item) => item.slug === slug);

  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const projects = await getProjects();
  const project = projects.find((item) => item.slug === slug);

  if (!project) notFound();

  return (
    <main className="section-shell py-12 md:py-16">
      <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-muted hover:text-text">
        <ChevronLeft className="size-4" /> Back to projects
      </Link>

      <section className="mt-5 grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
        <article className="glass rounded-3xl border p-6 md:p-8">
          <h1 className="text-3xl font-semibold md:text-4xl">{project.title}</h1>
          <p className="mt-3 text-muted">{project.description}</p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {project.gallery.map((image, index) => (
              <div key={`${image}-${index}`} className="relative h-56 overflow-hidden rounded-2xl border">
                <Image src={image} alt={`${project.title} screenshot ${index + 1}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
            ))}
          </div>
        </article>

        <aside className="glass rounded-3xl border p-6">
          <h2 className="text-xl font-semibold">Stack</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span key={tech} className="rounded-full border px-3 py-1 text-sm text-muted">
                {tech}
              </span>
            ))}
          </div>

          <h3 className="mt-7 text-lg font-semibold">Features</h3>
          <ul className="mt-3 grid gap-2 text-sm text-muted">
            {project.features.map((feature) => (
              <li key={feature}>• {feature}</li>
            ))}
          </ul>

          <h3 className="mt-7 text-lg font-semibold">Challenges & Solutions</h3>
          <ul className="mt-3 grid gap-2 text-sm text-muted">
            {project.challenges.map((challenge) => (
              <li key={challenge}>• {challenge}</li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2 font-medium text-white">
                <ExternalLink className="size-4" /> Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 font-medium">
                <Github className="size-4" /> GitHub
              </a>
            )}
          </div>
        </aside>
      </section>
    </main>
  );
}
