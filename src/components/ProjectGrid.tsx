import { ArrowUpRight, FolderCode, Star } from "lucide-react";
import { getFounderProjects } from "@/lib/github";
import { formatDate } from "@/lib/utils";

export async function ProjectGrid({ limit }: { limit?: number }) {
  const projects = await getFounderProjects();
  return (
    <div className="project-grid">
      {projects.slice(0, limit).map(({ curated, repo }, index) => (
        <article className="project-card" key={curated.repo}>
          <div className="project-top">
            <span className="project-icon">
              <FolderCode size={23} strokeWidth={1.4} />
            </span>
            <span className="row-index">PROJECT / 0{index + 1}</span>
          </div>
          <div className="project-description">
            <h3>{repo?.name || curated.repo}</h3>
            <p>{curated.note}</p>
          </div>
          <p className="project-status">{curated.status}</p>
          <div className="project-meta">
            {repo ? (
              <>
                <span className="language-label">
                  <i />
                  {repo.language || "Language unlisted"}
                </span>
                <span>
                  <Star size={12} />
                  {repo.stargazers_count}
                </span>
                <span>Updated {formatDate(repo.pushed_at)}</span>
              </>
            ) : (
              <span>GitHub metadata currently unavailable</span>
            )}
          </div>
          <a
            href={
              repo?.html_url || `https://github.com/neonjava/${curated.repo}`
            }
            target="_blank"
            rel="noreferrer"
          >
            View source <ArrowUpRight size={15} />
          </a>
        </article>
      ))}
    </div>
  );
}
