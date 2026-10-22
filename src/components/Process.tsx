"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight } from "lucide-react";
import { process } from "@/content/process";

export function Process() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const key = event.key;
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(key)) return;
    event.preventDefault();
    const next =
      key === "Home"
        ? 0
        : key === "End"
          ? process.length - 1
          : (index + (key === "ArrowRight" ? 1 : -1) + process.length) %
            process.length;
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <div className="process-panel">
      <div
        className="process-list"
        role="tablist"
        aria-label="Migration process"
      >
        {process.map((step, index) => (
          <button
            key={step.number}
            ref={(element) => {
              tabs.current[index] = element;
            }}
            role="tab"
            tabIndex={active === index ? 0 : -1}
            aria-selected={active === index}
            aria-controls="process-detail"
            id={`process-tab-${index}`}
            className={`process-step ${active === index ? "active" : ""}`}
            onClick={() => setActive(index)}
            onKeyDown={(event) => navigate(event, index)}
          >
            <span>{step.number}</span>
            <strong>{step.title}</strong>
            <ArrowRight size={15} />
          </button>
        ))}
      </div>
      <div
        className="process-detail"
        id="process-detail"
        role="tabpanel"
        aria-labelledby={`process-tab-${active}`}
      >
        <span className="process-ordinal" aria-hidden="true">
          {process[active].number}
        </span>
        <div>
          <span className="eyebrow">The method / {process[active].number}</span>
          <h3>{process[active].title}.</h3>
          <p>{process[active].detail}</p>
        </div>
        <span className="process-aside">
          A defined scope.
          <br />A reviewable result.
          <br />
          At every step.
        </span>
      </div>
    </div>
  );
}
