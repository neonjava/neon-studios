export const benefits = [
  {
    title: "Safety, by construction.",
    detail:
      "Ownership and types rule out broad classes of memory errors in safe Rust.",
    icon: "shield",
  },
  {
    title: "Control over resources.",
    detail:
      "Explicit lifetimes make memory, runtime dependencies, and deployment easier to reason about.",
    icon: "cpu",
  },
  {
    title: "Room to migrate gradually.",
    detail:
      "Service boundaries and FFI let you replace a well-defined component before a whole system.",
    icon: "layers",
  },
] as const;

export const workspaceStages = [
  {
    title: "Inspect",
    subtitle: "Read the original",
    description:
      "Start with the behavior people already depend on. Here, the source normalizes a list of ASCII names.",
    artifact: "Original implementation",
  },
  {
    title: "Analyze",
    subtitle: "Define the boundaries",
    description:
      "Agree on text encoding, case folding, whitespace, and sort order before translating the implementation.",
    artifact: "Compatibility contract",
  },
  {
    title: "Implement",
    subtitle: "Translate deliberately",
    description:
      "Express the same behavior with Rust’s standard library. This bounded example needs no external dependencies.",
    artifact: "Rust implementation",
  },
  {
    title: "Verify",
    subtitle: "Compare the outcomes",
    description:
      "Use shared fixtures to compare both implementations. This is a documented test case, not live terminal output.",
    artifact: "Shared fixture",
  },
] as const;

export const principles = [
  {
    title: "Read before rewriting.",
    detail:
      "Understand the original system, its dependencies, and the constraints of operating it.",
  },
  {
    title: "Make behavior explicit.",
    detail:
      "Treat interfaces, error handling, data formats, and failure modes as part of the contract.",
  },
  {
    title: "Leave maintainable software.",
    detail:
      "Favor clear Rust interfaces, useful tests, and operational documentation.",
  },
  {
    title: "Let evidence make the case.",
    detail:
      "Performance claims need baselines, reproducible methods, and stated limitations.",
  },
] as const;
