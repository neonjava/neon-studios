"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Check, Monitor, Moon, Sun } from "lucide-react";

type Theme = "light" | "dark" | "system";
const options = [
  { value: "dark", label: "Matte black", Icon: Moon },
  { value: "light", label: "Light", Icon: Sun },
  { value: "system", label: "System", Icon: Monitor },
] as const;

function getTheme(): Theme {
  try {
    const value = localStorage.getItem("neon-theme");
    return value === "light" || value === "system" ? value : "dark";
  } catch {
    const value = document.documentElement.dataset.preference;
    return value === "light" || value === "system" ? value : "dark";
  }
}

function applyTheme(theme: Theme) {
  const dark =
    theme === "dark" ||
    (theme === "system" && matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.dataset.theme = dark ? "dark" : "light";
}

function subscribe(callback: () => void) {
  const media = matchMedia("(prefers-color-scheme: dark)");
  const sync = () => {
    applyTheme(getTheme());
    callback();
  };
  window.addEventListener("storage", sync);
  window.addEventListener("neon-theme-change", sync);
  media.addEventListener("change", sync);
  return () => {
    window.removeEventListener("storage", sync);
    window.removeEventListener("neon-theme-change", sync);
    media.removeEventListener("change", sync);
  };
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribe,
    getTheme,
    () => "dark" as Theme,
  );
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const Icon = theme === "dark" ? Moon : theme === "light" ? Sun : Monitor;

  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);

  function select(value: Theme) {
    document.documentElement.setAttribute("data-preference", value);
    try {
      localStorage.setItem("neon-theme", value);
    } catch {
      /* Theme still applies when storage is unavailable. */
    }
    applyTheme(value);
    window.dispatchEvent(new Event("neon-theme-change"));
    setOpen(false);
    trigger.current?.focus();
  }

  return (
    <div className="theme-control" ref={root}>
      <button
        ref={trigger}
        className="icon-button"
        onClick={() => setOpen(!open)}
        aria-label={`Theme: ${theme}. Choose appearance`}
        aria-expanded={open}
        aria-controls="appearance-panel"
      >
        <Icon size={16} aria-hidden="true" />
      </button>
      {open && (
        <div
          className="appearance-panel"
          id="appearance-panel"
          aria-label="Appearance"
        >
          <span className="menu-caption">Appearance</span>
          {options.map(({ value, label, Icon: OptionIcon }) => (
            <button
              key={value}
              onClick={() => select(value)}
              aria-pressed={theme === value}
            >
              <OptionIcon size={15} />
              <span>{label}</span>
              {theme === value && <Check size={14} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
