export interface BenchmarkResult {
  metric: string;
  baseline: number;
  migrated: number;
  unit: string;
  environment: string;
  commands: string[];
  methodology: string;
  samples: number;
}
export interface CaseStudy {
  title: string;
  sourceLanguage: string;
  targetLanguage: "Rust";
  problem: string;
  scope: string;
  architecture: string;
  verification: string;
  testResults: string;
  benchmarks: BenchmarkResult[];
  limitations: string;
  repository: string;
  completedAt: string;
}
export interface FounderProject {
  repo: string;
  note: string;
  status: string;
}
export const founderProjects: FounderProject[] = [
  {
    repo: "logshield",
    note: "Security event correlation engine and reusable Rust ingestion SDK.",
    status:
      "Integration-tested local source; production validation remains open.",
  },
  {
    repo: "JVMDelta",
    note: "Rust CLI for inspecting a documented subset of G1 GC pause summaries.",
    status: "Comparison and JFR support are planned, not shipped.",
  },
  {
    repo: "rustbin",
    note: "Account-free paste service with a Rust/Axum API.",
    status: "Source v0.1.0; live Firestore deployment remains unverified.",
  },
];
export const caseStudies: CaseStudy[] = [];
