import { AnimatedReveal } from "@/components/ui/animated-reveal";
import type { ExperienceItem } from "@/types/content";

export function ExperienceSection({ items }: { items: ExperienceItem[] }) {
  return (
    <section id="experience" className="section-shell py-16 md:py-24">
      <AnimatedReveal>
        <h2 className="section-title">Experience Timeline</h2>
      </AnimatedReveal>

      <div className="mt-10 relative space-y-7 border-l border-border/80 pl-8">
        {items.map((item, idx) => (
          <AnimatedReveal key={`${item.title}-${idx}`} delay={idx * 0.06}>
            <article className="glass relative rounded-2xl border p-6">
              <span className="absolute -left-[2.34rem] top-8 h-4 w-4 rounded-full bg-brand" />
              <p className="text-xs uppercase tracking-[0.2em] text-muted">{item.type}</p>
              <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>
              <p className="text-sm text-muted">
                {item.organization} • {item.location}
              </p>
              <p className="mt-1 text-sm text-muted">
                {item.startDate} - {item.endDate || "Present"}
              </p>
              <ul className="mt-4 grid gap-2 text-sm text-muted">
                {item.highlights.map((highlight) => (
                  <li key={highlight}>• {highlight}</li>
                ))}
              </ul>
            </article>
          </AnimatedReveal>
        ))}
      </div>
    </section>
  );
}
