"use client";

import { signOut } from "next-auth/react";
import { useMemo, useState } from "react";
import type { ExperienceItem, ProjectItem, SkillItem, TestimonialItem } from "@/types/content";
import { splitCsv } from "@/lib/utils";

type TabKey = "projects" | "skills" | "experiences" | "testimonials";

export function AdminDashboard({
  initialProjects,
  initialSkills,
  initialExperiences,
  initialTestimonials,
}: {
  initialProjects: ProjectItem[];
  initialSkills: SkillItem[];
  initialExperiences: ExperienceItem[];
  initialTestimonials: TestimonialItem[];
}) {
  const [tab, setTab] = useState<TabKey>("projects");
  const [projects, setProjects] = useState(initialProjects);
  const [skills, setSkills] = useState(initialSkills);
  const [experiences, setExperiences] = useState(initialExperiences);
  const [testimonials, setTestimonials] = useState(initialTestimonials);

  const tabs: Array<{ key: TabKey; label: string }> = useMemo(
    () => [
      { key: "projects", label: "Projects" },
      { key: "skills", label: "Skills" },
      { key: "experiences", label: "Experience" },
      { key: "testimonials", label: "Testimonials" },
    ],
    []
  );

  async function removeItem(resource: string, id?: string) {
    if (!id) return;
    const res = await fetch(`/api/${resource}/${id}`, { method: "DELETE" });
    if (!res.ok) return;

    if (resource === "projects") setProjects((items) => items.filter((item) => item._id !== id));
    if (resource === "skills") setSkills((items) => items.filter((item) => item._id !== id));
    if (resource === "experiences") setExperiences((items) => items.filter((item) => item._id !== id));
    if (resource === "testimonials") setTestimonials((items) => items.filter((item) => item._id !== id));
  }

  async function patchItem(resource: string, id: string, payload: unknown) {
    const res = await fetch(`/api/${resource}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) return null;
    const json = (await res.json()) as { data: ProjectItem | SkillItem | ExperienceItem | TestimonialItem };
    return json.data;
  }

  async function createItem(resource: string, payload: unknown) {
    const res = await fetch(`/api/${resource}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const message = await res.text();
      alert(`Request failed: ${message}`);
      return null;
    }

    const json = (await res.json()) as { data: ProjectItem | SkillItem | ExperienceItem | TestimonialItem };
    return json.data;
  }

  return (
    <section className="space-y-6">
      <header className="glass flex flex-wrap items-center justify-between gap-4 rounded-3xl border p-6">
        <div>
          <h1 className="text-3xl font-semibold">Portfolio Admin</h1>
          <p className="mt-1 text-sm text-muted">Manage live content for projects, skills, testimonials, and timeline.</p>
        </div>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/" })}
          className="rounded-xl border px-4 py-2 text-sm font-medium"
        >
          Sign out
        </button>
      </header>

      <div className="flex flex-wrap gap-2">
        {tabs.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setTab(item.key)}
            className={`rounded-xl border px-4 py-2 text-sm ${tab === item.key ? "bg-brand text-white" : "glass"}`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {tab === "projects" && (
        <ProjectsPanel
          items={projects}
          onCreate={async (payload) => {
            const created = await createItem("projects", payload);
            if (created) setProjects((prev) => [created as ProjectItem, ...prev]);
          }}
          onDelete={(id) => removeItem("projects", id)}
          onEdit={async (id, payload) => {
            const updated = await patchItem("projects", id, payload);
            if (updated) setProjects((prev) => prev.map((item) => (item._id === id ? (updated as ProjectItem) : item)));
          }}
        />
      )}

      {tab === "skills" && (
        <SkillsPanel
          items={skills}
          onCreate={async (payload) => {
            const created = await createItem("skills", payload);
            if (created) setSkills((prev) => [created as SkillItem, ...prev]);
          }}
          onDelete={(id) => removeItem("skills", id)}
          onEdit={async (id, payload) => {
            const updated = await patchItem("skills", id, payload);
            if (updated) setSkills((prev) => prev.map((item) => (item._id === id ? (updated as SkillItem) : item)));
          }}
        />
      )}

      {tab === "experiences" && (
        <ExperiencePanel
          items={experiences}
          onCreate={async (payload) => {
            const created = await createItem("experiences", payload);
            if (created) setExperiences((prev) => [created as ExperienceItem, ...prev]);
          }}
          onDelete={(id) => removeItem("experiences", id)}
          onEdit={async (id, payload) => {
            const updated = await patchItem("experiences", id, payload);
            if (updated) setExperiences((prev) => prev.map((item) => (item._id === id ? (updated as ExperienceItem) : item)));
          }}
        />
      )}

      {tab === "testimonials" && (
        <TestimonialsPanel
          items={testimonials}
          onCreate={async (payload) => {
            const created = await createItem("testimonials", payload);
            if (created) setTestimonials((prev) => [created as TestimonialItem, ...prev]);
          }}
          onDelete={(id) => removeItem("testimonials", id)}
          onEdit={async (id, payload) => {
            const updated = await patchItem("testimonials", id, payload);
            if (updated) setTestimonials((prev) => prev.map((item) => (item._id === id ? (updated as TestimonialItem) : item)));
          }}
        />
      )}
    </section>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="glass rounded-3xl border p-5">{children}</div>;
}

function ProjectsPanel({
  items,
  onCreate,
  onDelete,
  onEdit,
}: {
  items: ProjectItem[];
  onCreate: (payload: ProjectItem) => Promise<void>;
  onDelete: (id?: string) => void;
  onEdit: (id: string, payload: Partial<ProjectItem>) => Promise<void>;
}) {
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const payload: ProjectItem = {
      title: String(form.get("title") || ""),
      slug: String(form.get("slug") || ""),
      summary: String(form.get("summary") || ""),
      description: String(form.get("description") || ""),
      category: String(form.get("category") || "web") as ProjectItem["category"],
      coverImage: String(form.get("coverImage") || ""),
      gallery: splitCsv(String(form.get("gallery") || "")),
      techStack: splitCsv(String(form.get("techStack") || "")),
      features: splitCsv(String(form.get("features") || "")),
      challenges: splitCsv(String(form.get("challenges") || "")),
      liveUrl: String(form.get("liveUrl") || ""),
      githubUrl: String(form.get("githubUrl") || ""),
      featured: Boolean(form.get("featured")),
    };

    await onCreate(payload);
    event.currentTarget.reset();
  }

  return (
    <div className="grid gap-5">
      <Card>
        <h2 className="text-xl font-semibold">Add Project</h2>
        <form onSubmit={handleSubmit} className="mt-4 grid gap-3 md:grid-cols-2">
          <input required name="title" placeholder="Title" className="rounded-xl border bg-surface px-3 py-2" />
          <input required name="slug" placeholder="Slug" className="rounded-xl border bg-surface px-3 py-2" />
          <input required name="summary" placeholder="Summary" className="rounded-xl border bg-surface px-3 py-2" />
          <input required name="coverImage" placeholder="Cover image URL" className="rounded-xl border bg-surface px-3 py-2" />
          <input required name="category" placeholder="Category: web/mobile/backend/fullstack" className="rounded-xl border bg-surface px-3 py-2" />
          <input name="liveUrl" placeholder="Live URL" className="rounded-xl border bg-surface px-3 py-2" />
          <input name="githubUrl" placeholder="GitHub URL" className="rounded-xl border bg-surface px-3 py-2" />
          <input name="techStack" placeholder="Tech stack (comma separated)" className="rounded-xl border bg-surface px-3 py-2" />
          <input name="gallery" placeholder="Gallery URLs (comma separated)" className="rounded-xl border bg-surface px-3 py-2" />
          <input name="features" placeholder="Features (comma separated)" className="rounded-xl border bg-surface px-3 py-2" />
          <input name="challenges" placeholder="Challenges (comma separated)" className="rounded-xl border bg-surface px-3 py-2" />
          <label className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" name="featured" /> Featured
          </label>
          <textarea required name="description" rows={4} placeholder="Description" className="rounded-xl border bg-surface px-3 py-2 md:col-span-2" />
          <button type="submit" className="rounded-xl bg-brand px-4 py-2 font-medium text-white md:col-span-2">
            Save Project
          </button>
        </form>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold">Existing Projects</h2>
        <div className="mt-4 grid gap-3">
          {items.map((item) => (
            <article key={item._id || item.slug} className="rounded-2xl border p-4">
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm text-muted">{item.summary}</p>
              <div className="mt-3 flex gap-2 text-sm">
                <button
                  type="button"
                  className="rounded-lg border px-3 py-1"
                  onClick={async () => {
                    if (!item._id) return;
                    const summary = prompt("New summary", item.summary);
                    if (!summary) return;
                    await onEdit(item._id, { summary });
                  }}
                >
                  Edit
                </button>
                <button type="button" className="rounded-lg border px-3 py-1" onClick={() => onDelete(item._id)}>
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      </Card>
    </div>
  );
}

function SkillsPanel({
  items,
  onCreate,
  onDelete,
  onEdit,
}: {
  items: SkillItem[];
  onCreate: (payload: SkillItem) => Promise<void>;
  onDelete: (id?: string) => void;
  onEdit: (id: string, payload: Partial<SkillItem>) => Promise<void>;
}) {
  return (
    <div className="grid gap-5">
      <Card>
        <h2 className="text-xl font-semibold">Add Skill</h2>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const form = new FormData(event.currentTarget);
            await onCreate({
              name: String(form.get("name") || ""),
              level: Number(form.get("level") || 0),
              group: String(form.get("group") || ""),
              icon: String(form.get("icon") || ""),
            });
            event.currentTarget.reset();
          }}
          className="mt-4 grid gap-3 md:grid-cols-2"
        >
          <input required name="name" placeholder="Skill" className="rounded-xl border bg-surface px-3 py-2" />
          <input required type="number" name="level" placeholder="Level 1-100" className="rounded-xl border bg-surface px-3 py-2" />
          <input required name="group" placeholder="Group" className="rounded-xl border bg-surface px-3 py-2" />
          <input name="icon" placeholder="Icon URL" className="rounded-xl border bg-surface px-3 py-2" />
          <button type="submit" className="rounded-xl bg-brand px-4 py-2 font-medium text-white md:col-span-2">
            Save Skill
          </button>
        </form>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold">Existing Skills</h2>
        <div className="mt-4 grid gap-3">
          {items.map((item) => (
            <article key={item._id || item.name} className="rounded-2xl border p-4">
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-muted">
                {item.group} • {item.level}%
              </p>
              <div className="mt-3 flex gap-2 text-sm">
                <button
                  type="button"
                  className="rounded-lg border px-3 py-1"
                  onClick={async () => {
                    if (!item._id) return;
                    const level = prompt("New level", String(item.level));
                    if (!level) return;
                    await onEdit(item._id, { level: Number(level) });
                  }}
                >
                  Edit
                </button>
                <button type="button" className="rounded-lg border px-3 py-1" onClick={() => onDelete(item._id)}>
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      </Card>
    </div>
  );
}

function ExperiencePanel({
  items,
  onCreate,
  onDelete,
  onEdit,
}: {
  items: ExperienceItem[];
  onCreate: (payload: ExperienceItem) => Promise<void>;
  onDelete: (id?: string) => void;
  onEdit: (id: string, payload: Partial<ExperienceItem>) => Promise<void>;
}) {
  return (
    <div className="grid gap-5">
      <Card>
        <h2 className="text-xl font-semibold">Add Experience</h2>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const form = new FormData(event.currentTarget);
            await onCreate({
              title: String(form.get("title") || ""),
              organization: String(form.get("organization") || ""),
              startDate: String(form.get("startDate") || ""),
              endDate: String(form.get("endDate") || ""),
              location: String(form.get("location") || ""),
              type: String(form.get("type") || "work") as ExperienceItem["type"],
              highlights: splitCsv(String(form.get("highlights") || "")),
            });
            event.currentTarget.reset();
          }}
          className="mt-4 grid gap-3 md:grid-cols-2"
        >
          <input required name="title" placeholder="Title" className="rounded-xl border bg-surface px-3 py-2" />
          <input required name="organization" placeholder="Organization" className="rounded-xl border bg-surface px-3 py-2" />
          <input required name="startDate" placeholder="Start date (YYYY-MM)" className="rounded-xl border bg-surface px-3 py-2" />
          <input name="endDate" placeholder="End date" className="rounded-xl border bg-surface px-3 py-2" />
          <input required name="location" placeholder="Location" className="rounded-xl border bg-surface px-3 py-2" />
          <input required name="type" placeholder="work/education/certification" className="rounded-xl border bg-surface px-3 py-2" />
          <input name="highlights" placeholder="Highlights (comma separated)" className="rounded-xl border bg-surface px-3 py-2 md:col-span-2" />
          <button type="submit" className="rounded-xl bg-brand px-4 py-2 font-medium text-white md:col-span-2">
            Save Experience
          </button>
        </form>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold">Existing Experience</h2>
        <div className="mt-4 grid gap-3">
          {items.map((item, index) => (
            <article key={item._id || `${item.title}-${index}`} className="rounded-2xl border p-4">
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm text-muted">{item.organization}</p>
              <div className="mt-3 flex gap-2 text-sm">
                <button
                  type="button"
                  className="rounded-lg border px-3 py-1"
                  onClick={async () => {
                    if (!item._id) return;
                    const title = prompt("New title", item.title);
                    if (!title) return;
                    await onEdit(item._id, { title });
                  }}
                >
                  Edit
                </button>
                <button type="button" className="rounded-lg border px-3 py-1" onClick={() => onDelete(item._id)}>
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      </Card>
    </div>
  );
}

function TestimonialsPanel({
  items,
  onCreate,
  onDelete,
  onEdit,
}: {
  items: TestimonialItem[];
  onCreate: (payload: TestimonialItem) => Promise<void>;
  onDelete: (id?: string) => void;
  onEdit: (id: string, payload: Partial<TestimonialItem>) => Promise<void>;
}) {
  return (
    <div className="grid gap-5">
      <Card>
        <h2 className="text-xl font-semibold">Add Testimonial</h2>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const form = new FormData(event.currentTarget);
            await onCreate({
              name: String(form.get("name") || ""),
              role: String(form.get("role") || ""),
              company: String(form.get("company") || ""),
              avatar: String(form.get("avatar") || ""),
              quote: String(form.get("quote") || ""),
            });
            event.currentTarget.reset();
          }}
          className="mt-4 grid gap-3 md:grid-cols-2"
        >
          <input required name="name" placeholder="Name" className="rounded-xl border bg-surface px-3 py-2" />
          <input required name="role" placeholder="Role" className="rounded-xl border bg-surface px-3 py-2" />
          <input required name="company" placeholder="Company" className="rounded-xl border bg-surface px-3 py-2" />
          <input required name="avatar" placeholder="Avatar URL" className="rounded-xl border bg-surface px-3 py-2" />
          <textarea required rows={3} name="quote" placeholder="Quote" className="rounded-xl border bg-surface px-3 py-2 md:col-span-2" />
          <button type="submit" className="rounded-xl bg-brand px-4 py-2 font-medium text-white md:col-span-2">
            Save Testimonial
          </button>
        </form>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold">Existing Testimonials</h2>
        <div className="mt-4 grid gap-3">
          {items.map((item, index) => (
            <article key={item._id || `${item.name}-${index}`} className="rounded-2xl border p-4">
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-muted">{item.role}</p>
              <p className="mt-1 text-sm text-muted">{item.quote}</p>
              <div className="mt-3 flex gap-2 text-sm">
                <button
                  type="button"
                  className="rounded-lg border px-3 py-1"
                  onClick={async () => {
                    if (!item._id) return;
                    const quote = prompt("New quote", item.quote);
                    if (!quote) return;
                    await onEdit(item._id, { quote });
                  }}
                >
                  Edit
                </button>
                <button type="button" className="rounded-lg border px-3 py-1" onClick={() => onDelete(item._id)}>
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      </Card>
    </div>
  );
}
