import type { ReactNode } from "react";

export function PageIntro({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="container page-intro">
      <span className="eyebrow">
        <span className="eyebrow-dot" />
        {label}
      </span>
      <h1>{title}</h1>
      <p>{children}</p>
    </div>
  );
}
