import type { ReactNode } from "react";

export function WindowFrame({
  title,
  label,
  children,
  className = "",
}: {
  title: string;
  label?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`app-window ${className}`}>
      <div className="window-titlebar">
        <span className="window-lights" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="window-title">{title}</span>
        {label && <span className="window-label">{label}</span>}
      </div>
      {children}
    </div>
  );
}
