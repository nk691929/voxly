"use client";

import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  function toggle() {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("voxly-theme", next);
    } catch {
      // Storage can be blocked; the theme still changes for this visit.
    }
  }

  return (
    <button type="button" onClick={toggle} className="btn-icon" aria-label="Toggle dark mode">
      <Moon className="theme-moon h-4 w-4" aria-hidden="true" />
      <Sun className="theme-sun h-4 w-4" aria-hidden="true" />
    </button>
  );
}
