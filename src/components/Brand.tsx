import Link from "next/link";

export function Brand({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link className="brand" href="/" onClick={onNavigate}>
      <svg
        className="brand-symbol"
        viewBox="0 0 28 28"
        fill="none"
        aria-hidden="true"
      >
        <path d="M5 23V5h4l10 14V5h4v18h-4L9 9v14H5Z" fill="currentColor" />
        <circle cx="25" cy="3" r="2.5" fill="var(--accent)" />
      </svg>
      <span>
        neon<span className="brand-light">studios</span>
      </span>
    </Link>
  );
}
