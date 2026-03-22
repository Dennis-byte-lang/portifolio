import { AboutSection } from "@/components/sections/about-section";
import { BlogPreviewSection } from "@/components/sections/blog-preview-section";
import { ContactSection } from "@/components/sections/contact-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ServicesSection } from "@/components/sections/services-section";
import { SiteFooter } from "@/components/sections/site-footer";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { SiteHeader } from "@/components/ui/site-header";
import { getBlogPosts, getExperiences, getProjects, getSkills, getTestimonials } from "@/lib/content";

export default async function HomePage() {
  const [projects, skills, experiences, testimonials, blogPosts] = await Promise.all([
    getProjects(),
    getSkills(),
    getExperiences(),
    getTestimonials(),
    getBlogPosts(),
  ]);

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="relative">
        <HeroSection />
        <AboutSection skills={skills} />
        <ProjectsSection projects={projects} />
        <ExperienceSection items={experiences} />
        <ServicesSection />
        <BlogPreviewSection posts={blogPosts} />
        <TestimonialsSection testimonials={testimonials} />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
