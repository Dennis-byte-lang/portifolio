import { AnimatedReveal } from "@/components/ui/animated-reveal";

const services = [
  {
    title: "Product Engineering",
    text: "From concept to launch for web and mobile products with clean architecture.",
    cta: "Starting at project-based pricing",
  },
  {
    title: "Performance Optimization",
    text: "Lighthouse-focused audit, rendering optimization, and Core Web Vitals improvement.",
    cta: "Best for growth-stage products",
  },
  {
    title: "Architecture Advisory",
    text: "Scalable frontend/backend structures, API strategy, and release workflows.",
    cta: "Available for retained consulting",
  },
];

export function ServicesSection() {
  return (
    <section className="section-shell py-16 md:py-24">
      <AnimatedReveal>
        <h2 className="section-title">Services</h2>
      </AnimatedReveal>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {services.map((service, index) => (
          <AnimatedReveal key={service.title} delay={index * 0.07}>
            <article className="glass h-full rounded-3xl border p-6">
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="mt-3 text-muted">{service.text}</p>
              <p className="mt-4 text-sm text-brand">{service.cta}</p>
            </article>
          </AnimatedReveal>
        ))}
      </div>
    </section>
  );
}
