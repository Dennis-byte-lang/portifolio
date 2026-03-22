import { siteConfig } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 py-10">
      <div className="section-shell flex flex-col gap-3 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        <div className="flex gap-4">
          <a href={siteConfig.github} target="_blank" rel="noreferrer" className="hover:text-text">
            GitHub
          </a>
          <a href={`mailto:${siteConfig.email}`} className="hover:text-text">
            Email
          </a>
          <a href={siteConfig.whatsapp} target="_blank" rel="noreferrer" className="hover:text-text">
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
