"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  FileCode2,
  ScanSearch,
  Braces,
  ListChecks,
  ChevronRight,
} from "lucide-react";
import { WindowFrame } from "./ui/WindowFrame";
import { workspaceStages } from "@/content/studio";
import type { HighlightedExample } from "@/lib/highlight";

const icons = [FileCode2, ScanSearch, Braces, ListChecks];

export function Pipeline({ example }: { example: HighlightedExample }) {
  const [active, setActive] = useState(2);
  const [view, setView] = useState<"source" | "rust">("rust");
  const stage = workspaceStages[active];

  function chooseStage(index: number) {
    setActive(index);
    if (index === 0) setView("source");
    if (index === 2) setView("rust");
  }

  return (
    <WindowFrame
      title="Migration workspace"
      label="Educational example"
      className="hero-workspace"
    >
      <div className="workspace-body">
        <div className="workspace-sidebar">
          <span className="sidebar-caption">The migration path</span>
          {workspaceStages.map((item, index) => {
            const Icon = icons[index];
            return (
              <button
                key={item.title}
                onClick={() => chooseStage(index)}
                className={`workspace-stage ${active === index ? "active" : ""}`}
                aria-pressed={active === index}
              >
                <Icon size={16} />
                <span>{item.title}</span>
                <span className="stage-number">0{index + 1}</span>
              </button>
            );
          })}
          <div className="workspace-project">
            <span className="sidebar-caption">Example project</span>
            <span>
              <FileCode2 size={14} /> name-normalizer
            </span>
            <small>Python → Rust</small>
          </div>
        </div>
        <div className="workspace-editor">
          <div className="editor-tabs" aria-label="Example implementation">
            <button
              aria-pressed={view === "source"}
              className={view === "source" ? "active" : ""}
              onClick={() => setView("source")}
            >
              <FileCode2 size={13} />
              main.py
            </button>
            <button
              aria-pressed={view === "rust"}
              className={view === "rust" ? "active" : ""}
              onClick={() => setView("rust")}
            >
              <Braces size={13} />
              main.rs
            </button>
          </div>
          <div
            className="workspace-code syntax-code"
            tabIndex={0}
            role="region"
            aria-label="Example code"
            dangerouslySetInnerHTML={{
              __html: view === "rust" ? example.rustHtml : example.sourceHtml,
            }}
          />
          <div className="editor-status">
            <span>
              {view === "rust"
                ? "Rust · Standard library"
                : "Python · Standard library"}
            </span>
            <span>UTF-8</span>
          </div>
        </div>
        <aside className="workspace-inspector" aria-live="polite">
          <span className="sidebar-caption">
            0{active + 1} / {stage.artifact}
          </span>
          <h3>{stage.subtitle}</h3>
          <p>{stage.description}</p>
          {active === 3 ? (
            <div className="fixture-preview">
              <span>INPUT</span>
              <pre>{example.tests[0].input}</pre>
              <span>EXPECTED OUTPUT</span>
              <pre>{example.tests[0].expected}</pre>
            </div>
          ) : (
            <div className="contract-note">
              <span className="sidebar-caption">Compatibility boundary</span>
              <p>{example.limitations}</p>
            </div>
          )}
        </aside>
      </div>
      <div className="workspace-bottom">
        <span>
          <ChevronRight size={13} /> Small example. Explicit behavior.
        </span>
        <Link href="/lab">
          Explore the Migration Lab <ArrowUpRight size={14} />
        </Link>
      </div>
    </WindowFrame>
  );
}
