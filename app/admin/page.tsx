import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { authOptions } from "@/lib/auth";
import { getExperiences, getProjects, getSkills, getTestimonials } from "@/lib/content";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as { role?: string }).role !== "admin") {
    redirect("/admin/login?callbackUrl=/admin");
  }

  const [projects, skills, experiences, testimonials] = await Promise.all([
    getProjects(),
    getSkills(),
    getExperiences(),
    getTestimonials(),
  ]);

  return (
    <main className="min-h-screen bg-bg px-5 py-12">
      <div className="section-shell">
        <AdminDashboard
          initialProjects={projects}
          initialSkills={skills}
          initialExperiences={experiences}
          initialTestimonials={testimonials}
        />
      </div>
    </main>
  );
}
