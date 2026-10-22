export const site = {
  name: "Neon Studios",
  title: "Neon Studios — Rust Migration & Software Modernization",
  description:
    "Neon Studios is a founder-operated Rust migration and software modernization studio. We preserve behavior, verify compatibility, and measure performance.",
  url: "https://studio.neonjava.in",
  founder: "NeonJava",
  github: "https://github.com/neonjava",
  personalSite: "https://neonjava.in",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "neonjava.in@gmail.com",
} as const;
