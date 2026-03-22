"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { TestimonialItem } from "@/types/content";

export function TestimonialsSection({ testimonials }: { testimonials: TestimonialItem[] }) {
  const looped = testimonials.concat(testimonials);

  return (
    <section id="testimonials" className="section-shell py-16 md:py-24">
      <h2 className="section-title">Testimonials</h2>
      <p className="section-subtitle">Feedback from product and engineering leaders I have worked with.</p>

      <div className="mt-8 overflow-hidden">
        <motion.div
          className="flex gap-5"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 48, ease: "linear", repeat: Infinity }}
        >
          {looped.map((item, i) => (
            <article key={`${item.name}-${i}`} className="glass min-w-[320px] max-w-[360px] rounded-3xl border p-5 md:min-w-[420px]">
              <div className="flex items-center gap-3">
                <Image src={item.avatar} alt={item.name} width={44} height={44} className="rounded-full border" />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-muted">
                    {item.role}, {item.company}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-muted">“{item.quote}”</p>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
