"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Github, MessageCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { siteConfig } from "@/lib/constants";

const roles = ["Software Engineer", "Full-Stack Builder", "Product-focused Architect"];

export function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const activeRole = useMemo(() => roles[roleIndex], [roleIndex]);

  useEffect(() => {
    let frame = 0;
    let deleting = false;
    const typeSpeed = 65;
    const eraseSpeed = 35;
    const holdMs = 1200;

    const tick = () => {
      frame += 1;
      const current = roles[roleIndex];
      const currentLength = deleting ? current.length - frame : frame;
      const nextValue = current.slice(0, Math.max(0, Math.min(current.length, currentLength)));
      setTyped(nextValue);

      if (!deleting && nextValue.length === current.length) {
        setTimeout(() => {
          deleting = true;
          frame = 0;
          tick();
        }, holdMs);
        return;
      }

      if (deleting && nextValue.length === 0) {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        return;
      }

      const delay = deleting ? eraseSpeed : typeSpeed;
      setTimeout(tick, delay);
    };

    const timer = setTimeout(tick, typeSpeed);
    return () => clearTimeout(timer);
  }, [roleIndex]);

  return (
    <section className="relative overflow-hidden pt-14">
      <div className="mesh-overlay" />
      <div className="section-shell relative grid min-h-[72vh] items-center gap-10 pb-20 pt-10 lg:grid-cols-[1.25fr,0.75fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand">
            {typed}
            <span className="ml-1 inline-block h-4 w-[2px] animate-pulse bg-brand align-middle" />
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
            Building reliable products with clean architecture and measurable impact.
          </h1>
          <p className="section-subtitle">
            I design and develop web and mobile experiences that prioritize performance, maintainability, and clear business outcomes.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#contact" className="rounded-2xl bg-brand px-6 py-3 font-semibold text-white shadow-premium transition hover:translate-y-[-2px]">
              Hire Me
            </a>
            <a href="#projects" className="glass rounded-2xl border px-6 py-3 font-semibold transition hover:translate-y-[-2px]">
              View Projects
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-muted">
            <a href={siteConfig.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition hover:text-text">
              <Github className="size-4" /> Dennis-byte-lang
            </a>
            <a href={siteConfig.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition hover:text-text">
              <MessageCircle className="size-4" /> 0716135136
            </a>
          </div>
        </motion.div>

        <motion.div
          className="glass relative mx-auto w-full max-w-md rounded-[2rem] border p-6 shadow-premium"
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
        >
          <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-brand/80 to-transparent" />
          <div className="flex items-center gap-4">
            <Image src="/images/nyukiman.png" alt="Dennis Kamury" width={72} height={72} className="rounded-2xl border object-cover" />
            <div>
              <p className="text-xl font-semibold">Dennis Kamury</p>
              <p className="text-sm text-muted">Developer & Admin, viral Hypermarket App (Kenya)</p>
            </div>
          </div>
          <div className="mt-6 grid gap-3">
            {roles.map((role, index) => (
              <motion.div
                key={role}
                className="rounded-xl border border-border/80 bg-surface/60 px-4 py-3 text-sm"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: 0.4 + index * 0.12 }}
                whileHover={{ x: 8, borderColor: "hsl(var(--brand))" }}
              >
                {role} {activeRole === role ? "• Active" : ""}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
