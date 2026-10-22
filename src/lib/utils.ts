export function formatDate(value: string | null): string { return value ? new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' }).format(new Date(value)) : 'Unknown'; }
export function classNames(...values: (string | false | undefined)[]) { return values.filter(Boolean).join(' '); }
