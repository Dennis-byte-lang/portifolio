"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const navItems = [
  ["About", "#about"],
  ["Projects", "#projects"],
  ["Experience", "#experience"],
  ["Skills", "#skills"],
  ["Testimonials", "#testimonials"],
  ["Contact", "#contact"],
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-bg/70 backdrop-blur-xl">
      <div className="section-shell flex h-20 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/images/nyukiman.png" alt="Dennis Kamury" width={38} height={38} className="rounded-full border" />
          <span className="text-sm font-semibold tracking-[0.18em]">DENNIS KAMURY</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
          {navItems.map(([label, href]) => (
            <a key={href} href={href} className="transition hover:text-text">
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <ThemeToggle />
        </div>

        <button
          type="button"
          className="rounded-xl border p-2 md:hidden"
          aria-label="Open navigation"
          onClick={() => setOpen((v) => !v)}
        >
          <Menu className="size-5" />
        </button>
      </div>

      {open && (
        <div className="section-shell pb-5 md:hidden">
          <div className="glass rounded-2xl border p-4">
            <div className="grid gap-3 text-sm">
              {navItems.map(([label, href]) => (
                <a key={href} href={href} onClick={() => setOpen(false)}>
                  {label}
                </a>
              ))}
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
