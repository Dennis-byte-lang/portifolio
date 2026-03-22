"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const isLight = document.documentElement.classList.contains("light");
    setTheme(isLight ? "light" : "dark");
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("light", next === "light");
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="glass inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium text-text"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Moon className="size-4" /> : <Sun className="size-4" />} {theme === "dark" ? "Dark" : "Light"}
    </button>
  );
}
