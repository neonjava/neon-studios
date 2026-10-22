export const process = [
  { number: '01', title: 'Inspect', detail: 'Read the codebase, dependencies, deployment model, and current tests. Establish what the system actually does.' },
  { number: '02', title: 'Analyze', detail: 'Identify observable behavior, compatibility boundaries, bottlenecks, and migration risks.' },
  { number: '03', title: 'Plan', detail: 'Agree on scope, acceptance tests, phased delivery, and where a rewrite is justified.' },
  { number: '04', title: 'Migrate', detail: 'Implement Rust modules behind stable interfaces, keeping changes reviewable and reversible.' },
  { number: '05', title: 'Verify', detail: 'Compare outputs, exercise failure paths, and measure performance under a documented method.' },
  { number: '06', title: 'Deliver', detail: 'Provide source, tests, operational notes, and a clear record of known limitations.' },
] as const;
