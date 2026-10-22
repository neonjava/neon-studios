"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";
function getTheme(): Theme {
  try {
    const value = localStorage.getItem("neon-theme");
    return value === "light" ? "light" : "dark";
  } catch {
    const value = document.documentElement.dataset.preference;
    return value === "light" ? "light" : "dark";
  }
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
}

function subscribe(callback: () => void) {
  const sync = () => {
    applyTheme(getTheme());
    callback();
  };
  window.addEventListener("storage", sync);
  window.addEventListener("neon-theme-change", sync);
  return () => {
    window.removeEventListener("storage", sync);
    window.removeEventListener("neon-theme-change", sync);
  };
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribe,
    getTheme,
    () => "dark" as Theme,
  );
  function select(value: Theme) {
    document.documentElement.setAttribute("data-preference", value);
    try {
      localStorage.setItem("neon-theme", value);
    } catch {
      /* Theme still applies when storage is unavailable. */
    }
    applyTheme(value);
    window.dispatchEvent(new Event("neon-theme-change"));
  }

  const nextTheme = theme === "dark" ? "light" : "dark";
  const Icon = theme === "dark" ? Sun : Moon;
  return (
    <button
      type="button"
      className="icon-button"
      onClick={() => select(nextTheme)}
      aria-label={`Switch to ${nextTheme} mode`}
      title={`Switch to ${nextTheme} mode`}
    >
      <Icon size={16} aria-hidden="true" />
    </button>
  );
}
