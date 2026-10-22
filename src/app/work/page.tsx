import { pageMetadata } from "@/config/seo";
import { ProjectGrid } from "@/components/ProjectGrid";
import { SectionIntro } from "@/components/SectionIntro";
import { PageIntro } from "@/components/PageIntro";
import { CallToAction } from "@/components/CallToAction";
import { caseStudies } from "@/content/projects";

export const metadata = pageMetadata("/work");

export default function WorkPage() {
  return (
    <>
      <PageIntro label="Engineering work" title="Evidence in the open.">
        Source code, documented decisions, and honest limits. These founder
        projects show the engineering behind the studio.
      </PageIntro>
      <section className="container page-content">
        <SectionIntro
          eyebrow="01 / Founder projects"
          title="Systems and tools, built in Rust."
        >
          Open-source work by NeonJava, with repository metadata from GitHub.
          These are independent projects, not studio client engagements.
        </SectionIntro>
        <ProjectGrid />
      </section>
      <section className="section container">
        <SectionIntro
          eyebrow="02 / Migration case studies"
          title="The record grows with the work."
        >
          Published migrations will include their scope, verification,
          methodology, and limitations.
        </SectionIntro>
        {caseStudies.length === 0 && (
          <div className="empty-state">
            <h3>No published migration case studies yet.</h3>
            <p>
              Neon Studios is new. Completed work will appear here when it can
              be shared and verified.
            </p>
          </div>
        )}
      </section>
      <CallToAction />
    </>
  );
}
