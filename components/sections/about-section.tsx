import { AnimatedReveal } from "@/components/ui/animated-reveal";
import type { SkillItem } from "@/types/content";

export function AboutSection({ skills }: { skills: SkillItem[] }) {
  return (
    <section id="about" className="section-shell py-16 md:py-24">
      <AnimatedReveal>
        <h2 className="section-title">About Me</h2>
        <p className="section-subtitle">
          I build production-grade products end-to-end. My work combines UX clarity, robust backend design, and performance optimization so teams can scale without rewriting foundations.
        </p>
      </AnimatedReveal>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <AnimatedReveal>
          <article className="glass h-full rounded-3xl border p-7">
            <h3 className="text-xl font-semibold">Approach</h3>
            <p className="mt-3 text-muted">
              Start from business outcomes, design clear architecture, ship in measured iterations, and use telemetry to improve continuously. I focus on reliability, maintainability, and measurable impact.
            </p>
            <ul className="mt-6 grid gap-3 text-sm text-muted">
              <li>Clean architecture and modular code organization</li>
              <li>Responsive UI patterns and accessibility standards</li>
              <li>Performance budgets and instrumentation-first development</li>
            </ul>
          </article>
        </AnimatedReveal>

        <AnimatedReveal delay={0.1}>
          <article id="skills" className="glass rounded-3xl border p-7">
            <h3 className="text-xl font-semibold">Top Skills</h3>
            <div className="mt-6 grid gap-4">
              {skills.slice(0, 10).map((skill) => (
                <div key={skill.name}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>{skill.name}</span>
                    <span className="text-muted">{skill.level}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-card">
                    <div className="h-full rounded-full bg-gradient-to-r from-brand to-cyan-400" style={{ width: `${skill.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </article>
        </AnimatedReveal>
      </div>
    </section>
  );
}
