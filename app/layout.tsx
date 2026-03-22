import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/lib/constants";
import { ChatAssistant } from "@/components/ui/chat-assistant";
import { ThemeScript } from "@/components/ui/theme-script";

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: `${siteConfig.name} | ${siteConfig.role}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.tagline,
  applicationName: `${siteConfig.name} Portfolio`,
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.role}`,
    description: siteConfig.tagline,
    type: "website",
    siteName: `${siteConfig.name} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.role}`,
    description: siteConfig.tagline,
  },
  keywords: ["Dennis Kamury", "portfolio", "full-stack engineer", "Kenya", "Next.js"],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#030712",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="bg-bg text-text antialiased">
        <ThemeScript />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] rounded-md bg-brand px-3 py-2 text-sm font-medium text-white"
        >
          Skip to content
        </a>
        {children}
        <ChatAssistant />
      </body>
    </html>
  );
}
