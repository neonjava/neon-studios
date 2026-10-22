"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createTwoFilesPatch } from "diff";
import { Check, Copy } from "lucide-react";
import type { SourceLanguage, Workload } from "@/content/migrations";
import type { HighlightedExample } from "@/lib/highlight";
import { WindowFrame } from "./ui/WindowFrame";

function CodePane({
  name,
  html,
  mobileHidden,
  copied,
  onCopy,
}: {
  name: string;
  html: string;
  mobileHidden: boolean;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div className={`code-pane ${mobileHidden ? "mobile-hidden" : ""}`}>
      <div className="code-head">
        <span>{name}</span>
        <button
          className="copy-button"
          onClick={onCopy}
          aria-label={`Copy ${name} code`}
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div
        className="code-scroll syntax-code"
        tabIndex={0}
        role="region"
        aria-label={`${name} implementation`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

export function MigrationLab({ examples }: { examples: HighlightedExample[] }) {
  const [language, setLanguage] = useState<SourceLanguage>("Python");
  const [workload, setWorkload] = useState<Workload>("Data transformation");
  const [view, setView] = useState<"split" | "diff">("split");
  const [mobileTab, setMobileTab] = useState<"source" | "rust">("source");
  const [copied, setCopied] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const example =
    examples.find(
      (item) => item.language === language && item.workload === workload,
    ) || examples[0];
  const diff = useMemo(
    () =>
      createTwoFilesPatch(
        example.sourceFile,
        "main.rs",
        example.sourceCode,
        example.rustCode,
        "source",
        "Rust",
        { context: 3 },
      ),
    [example],
  );

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy(text: string, key: string) {
    clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setFeedback("Code copied to your clipboard.");
      timer.current = setTimeout(() => {
        setCopied(null);
        setFeedback("");
      }, 2000);
    } catch {
      setFeedback(
        "Clipboard access is unavailable. Select and copy the code directly.",
      );
    }
  }

  return (
    <>
      <div className="lab-controls">
        <div className="control-group">
          <label htmlFor="language">Source language</label>
          <select
            className="select"
            id="language"
            value={language}
            onChange={(event) =>
              setLanguage(event.target.value as SourceLanguage)
            }
          >
            {["Python", "Node.js", "Java"].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
        <div className="control-group">
          <label htmlFor="workload">Workload</label>
          <select
            className="select"
            id="workload"
            value={workload}
            onChange={(event) => setWorkload(event.target.value as Workload)}
          >
            {[
              "Data transformation",
              "File processing",
              "CLI utility",
              "Background task",
            ].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
        <p className="lab-annotation">
          Documented examples · No live execution
        </p>
      </div>
      <WindowFrame title="Migration Lab" label={`${language} → Rust`}>
        <div className="lab-toolbar">
          <strong>{example.title}</strong>
          <div className="segmented" aria-label="Comparison view">
            <button
              className={view === "split" ? "active" : ""}
              onClick={() => setView("split")}
              aria-pressed={view === "split"}
            >
              Side by side
            </button>
            <button
              className={view === "diff" ? "active" : ""}
              onClick={() => setView("diff")}
              aria-pressed={view === "diff"}
            >
              Unified diff
            </button>
          </div>
        </div>
        {view === "split" ? (
          <>
            <div
              className="mobile-code-tabs segmented"
              aria-label="Mobile code view"
            >
              <button
                className={mobileTab === "source" ? "active" : ""}
                aria-pressed={mobileTab === "source"}
                onClick={() => setMobileTab("source")}
              >
                {language}
              </button>
              <button
                className={mobileTab === "rust" ? "active" : ""}
                aria-pressed={mobileTab === "rust"}
                onClick={() => setMobileTab("rust")}
              >
                Rust
              </button>
            </div>
            <div className="code-grid">
              <CodePane
                name={example.sourceFile}
                html={example.sourceHtml}
                mobileHidden={mobileTab !== "source"}
                copied={copied === `${example.id}-source`}
                onCopy={() => copy(example.sourceCode, `${example.id}-source`)}
              />
              <CodePane
                name="main.rs"
                html={example.rustHtml}
                mobileHidden={mobileTab !== "rust"}
                copied={copied === `${example.id}-rust`}
                onCopy={() => copy(example.rustCode, `${example.id}-rust`)}
              />
            </div>
          </>
        ) : (
          <div
            className="diff-view"
            tabIndex={0}
            role="region"
            aria-label="Unified textual diff"
          >
            {diff.split("\n").map((line, index) => (
              <div
                key={index}
                className={`diff-line ${line.startsWith("+") && !line.startsWith("+++") ? "diff-add" : line.startsWith("-") && !line.startsWith("---") ? "diff-remove" : ""}`}
              >
                {line || " "}
              </div>
            ))}
          </div>
        )}
        <div className="workspace-bottom">
          <span>UTF-8 · Educational comparison</span>
          <span>Performance: not benchmarked</span>
        </div>
      </WindowFrame>
      <p className="copy-feedback" role="status">
        {feedback}
      </p>
      <div className="lab-info">
        <article className="info-card">
          <h3>Compatibility contract</h3>
          <p>{example.behavior}</p>
          <h3>Shared test fixtures</h3>
          {example.tests.map((test, index) => (
            <div className="test-case" key={index}>
              <div>
                <span>Input</span>
                <code>{JSON.stringify(test.input)}</code>
              </div>
              <div>
                <span>Expected output</span>
                <code>{JSON.stringify(test.expected)}</code>
              </div>
            </div>
          ))}
        </article>
        <article className="info-card">
          <h3>Migration considerations</h3>
          <ul>
            {example.considerations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h3>Known limitations</h3>
          <p>{example.limitations}</p>
          <p>
            No benchmark measurements exist for these examples. A production
            migration needs its own contracts, tests, and baseline.
          </p>
        </article>
      </div>
    </>
  );
}
