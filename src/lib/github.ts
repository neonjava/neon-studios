import { founderProjects } from "@/content/projects";
export interface GithubRepo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  pushed_at: string | null;
  archived: boolean;
}
export interface ResolvedProject {
  curated: (typeof founderProjects)[number];
  repo: GithubRepo | null;
}
const owner = "neonjava";
export async function getFounderProjects(
  fetcher: typeof fetch = fetch,
): Promise<ResolvedProject[]> {
  return Promise.all(
    founderProjects.map(async (curated) => {
      try {
        const response = await fetcher(
          `https://api.github.com/repos/${owner}/${encodeURIComponent(curated.repo)}`,
          {
            headers: {
              Accept: "application/vnd.github+json",
              "User-Agent": "neon-studios-site",
              ...(process.env.GITHUB_TOKEN
                ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
                : {}),
            },
            next: { revalidate: 3600 },
          },
        );
        if (!response.ok) return { curated, repo: null };
        const data: unknown = await response.json();
        if (!isRepo(data)) return { curated, repo: null };
        return { curated, repo: data };
      } catch {
        return { curated, repo: null };
      }
    }),
  );
}
function isRepo(data: unknown): data is GithubRepo {
  if (!data || typeof data !== "object") return false;
  const r = data as Record<string, unknown>;
  return (
    typeof r.name === "string" &&
    typeof r.html_url === "string" &&
    r.html_url.startsWith(`https://github.com/${owner}/`) &&
    typeof r.stargazers_count === "number" &&
    typeof r.archived === "boolean" &&
    (r.description === null || typeof r.description === "string") &&
    (r.language === null || typeof r.language === "string") &&
    (r.pushed_at === null || typeof r.pushed_at === "string")
  );
}
