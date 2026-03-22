"use client";

import { useState } from "react";
import { Github, Mail, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/constants";

export function ContactSection() {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setState("loading");

    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      company: String(data.get("company") || ""),
      message: String(data.get("message") || ""),
      honeypot: String(data.get("honeypot") || ""),
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setState("success");
      form.reset();
      return;
    }

    setState("error");
  }

  return (
    <section id="contact" className="section-shell py-16 md:py-24">
      <h2 className="section-title">Contact</h2>
      <p className="section-subtitle">Available for freelance, product engineering, and consulting engagements.</p>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr,1.2fr]">
        <aside className="glass rounded-3xl border p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-muted">Direct</p>
          <div className="mt-4 grid gap-3 text-sm">
            <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-2">
              <Mail className="size-4" /> {siteConfig.email}
            </a>
            <a href={siteConfig.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
              <MessageCircle className="size-4" /> WhatsApp 0716135136
            </a>
            <a href={siteConfig.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
              <Github className="size-4" /> Dennis-byte-lang
            </a>
          </div>
        </aside>

        <form onSubmit={onSubmit} className="glass rounded-3xl border p-6" noValidate>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm">
              Name
              <input required name="name" className="rounded-xl border bg-surface px-3 py-2" />
            </label>
            <label className="grid gap-2 text-sm">
              Email
              <input required type="email" name="email" className="rounded-xl border bg-surface px-3 py-2" />
            </label>
          </div>

          <label className="mt-4 grid gap-2 text-sm">
            Company
            <input name="company" className="rounded-xl border bg-surface px-3 py-2" />
          </label>

          <label className="mt-4 grid gap-2 text-sm">
            Message
            <textarea required name="message" rows={5} className="rounded-xl border bg-surface px-3 py-2" />
          </label>

          <input type="text" name="honeypot" tabIndex={-1} autoComplete="off" className="hidden" />

          <button
            type="submit"
            disabled={state === "loading"}
            className="mt-5 rounded-2xl bg-brand px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
          >
            {state === "loading" ? "Sending..." : "Send Message"}
          </button>

          {state === "success" && <p className="mt-3 text-sm text-emerald-400">Message sent successfully.</p>}
          {state === "error" && <p className="mt-3 text-sm text-rose-400">Message failed. Try again in a moment.</p>}
        </form>
      </div>
    </section>
  );
}
