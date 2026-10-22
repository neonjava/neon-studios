"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  House,
  Blocks,
  FolderOpen,
  FlaskConical,
  ArrowUpRight,
  Menu,
  X,
} from "lucide-react";
import { navigation } from "@/config/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { Brand } from "./Brand";

const dockIcons = [House, Blocks, FolderOpen, FlaskConical];

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);

  return (
    <>
      <header className="site-header">
        <div className="header-inner container">
          <Brand onNavigate={() => setOpen(false)} />
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link ${pathname === item.href ? "active" : ""}`}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <ThemeToggle />
            <Link
              className="button button-small button-primary desktop-cta"
              href="/contact"
            >
              Let’s talk <ArrowUpRight size={14} />
            </Link>
            <button
              ref={toggle}
              className="icon-button mobile-menu-button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>
        {open && (
          <div id="mobile-menu" className="mobile-menu">
            <nav aria-label="Mobile secondary navigation">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                  <ArrowUpRight size={15} />
                </Link>
              ))}
              <Link href="/contact" onClick={() => setOpen(false)}>
                Contact
                <ArrowUpRight size={15} />
              </Link>
            </nav>
          </div>
        )}
      </header>
      <nav className="mobile-dock" aria-label="Mobile primary navigation">
        <div className="dock-pill">
          {navigation.slice(0, 4).map((item, index) => {
            const Icon = dockIcons[index];
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`dock-item ${pathname === item.href ? "active" : ""}`}
                aria-label={item.label}
                aria-current={pathname === item.href ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                <Icon size={19} strokeWidth={1.7} />
                <span>{item.href === "/lab" ? "Lab" : item.label}</span>
              </Link>
            );
          })}
        </div>
        <Link
          href="/contact"
          className="dock-action"
          aria-label="Start a project"
        >
          <ArrowUpRight size={21} />
        </Link>
      </nav>
    </>
  );
}
