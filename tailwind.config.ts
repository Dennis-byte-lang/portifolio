import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Satoshi", "Inter", "sans-serif"],
      },
      colors: {
        surface: "hsl(var(--surface))",
        bg: "hsl(var(--bg))",
        text: "hsl(var(--text))",
        muted: "hsl(var(--muted))",
        brand: "hsl(var(--brand))",
        card: "hsl(var(--card))",
        border: "hsl(var(--border))",
      },
      boxShadow: {
        premium: "0 20px 60px -30px rgba(0,0,0,.45)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      backgroundImage: {
        mesh: "radial-gradient(circle at 0% 0%, rgba(55, 126, 255, .24), transparent 40%), radial-gradient(circle at 80% 20%, rgba(20, 184, 166, .22), transparent 30%), radial-gradient(circle at 50% 100%, rgba(236, 72, 153, .17), transparent 45%)",
      },
    },
  },
  plugins: [],
};

export default config;
