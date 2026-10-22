import type { Metadata } from "next";
import { site } from "./site";

export const seoPages = {
  "/": {
    title: "Rust Migration & Software Modernization",
    description:
      "Neon Studios migrates Python, Node.js, Java, and C/C++ software to Rust with compatibility testing and measured performance. Founded by NeonJava.",
  },
  "/services": {
    title: "Rust Migration Services & SDK Development",
    description:
      "Explore Python to Rust, Node.js to Rust, Java to Rust, C/C++ modernization, and Rust SDK development with explicit compatibility and verification plans.",
  },
  "/work": {
    title: "Rust & Backend Engineering Projects",
    description:
      "Explore NeonJava's open-source engineering projects at Neon Studios, with public repositories, documented limitations, and genuine GitHub metadata.",
  },
  "/lab": {
    title: "Python, Node.js & Java to Rust Examples",
    description:
      "Compare documented Python, Node.js, and Java implementations with Rust. Explore code, compatibility requirements, and shared test cases in the Migration Lab.",
  },
  "/about": {
    title: "About Neon Studios & NeonJava",
    description:
      "Meet Neon Studios, the independent Rust-first software engineering studio founded by NeonJava. Focused on backend systems, migration, and modernization.",
  },
  "/contact": {
    title: "Discuss Your Rust Migration Project",
    description:
      "Contact Neon Studios about migrating an application, backend service, CLI, or library to Rust. Share your codebase, compatibility needs, and project scope.",
  },
} as const;

export type SiteRoute = keyof typeof seoPages;
export const siteRoutes = Object.keys(seoPages) as SiteRoute[];
export const isPreview = process.env.VERCEL_ENV === "preview";

export function pageMetadata(route: SiteRoute): Metadata {
  const { title, description } = seoPages[route];
  const fullTitle = `${site.name} — ${title}`;
  const url = new URL(route, site.url).href;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Neon Studios — Existing software. Reimagined in Rust.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/opengraph-image"],
    },
  };
}
