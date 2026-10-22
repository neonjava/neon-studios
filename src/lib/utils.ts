export function formatDate(value: string | null): string {
  if (!value) return "Unknown";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Unknown"
    : new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(
        date,
      );
}
export function classNames(...values: (string | false | undefined)[]) {
  return values.filter(Boolean).join(" ");
}
