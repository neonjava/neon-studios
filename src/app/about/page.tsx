import { pageMetadata } from "@/config/seo";
import { ArrowUpRight } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { CallToAction } from "@/components/CallToAction";
import { principles } from "@/content/studio";
import { site } from "@/config/site";

export const metadata = pageMetadata("/about");

export default function AboutPage() {
  return (
    <>
      <PageIntro
        label="About the studio"
        title="Independent by choice. Deliberate by default."
      >
        Neon Studios is an engineering studio founded and operated by NeonJava.
        The work centers on Rust, backend systems, and careful modernization of
        existing software.
      </PageIntro>
      <div className="container about-layout page-content">
        <aside className="founder-card">
          <span className="founder-monogram" aria-hidden="true">
            N.
          </span>
          <span className="eyebrow">Founder / Engineer</span>
          <h2>NeonJava</h2>
          <p>
            Hands-on work with Rust, Java, backend software, developer tools,
            and infrastructure.
          </p>
          <div className="founder-links">
            <a
              className="text-link"
              href={site.github}
              target="_blank"
              rel="noreferrer"
            >
              GitHub <ArrowUpRight size={13} />
            </a>
            <a
              className="text-link"
              href={site.personalSite}
              target="_blank"
              rel="noreferrer"
            >
              Personal site <ArrowUpRight size={13} />
            </a>
          </div>
        </aside>
        <div className="principles">
          {principles.map((principle, index) => (
            <article className="principle" key={principle.title}>
              <span className="row-index">PRINCIPLE / 0{index + 1}</span>
              <h3>{principle.title}</h3>
              <p>{principle.detail}</p>
            </article>
          ))}
        </div>
      </div>
      <CallToAction />
    </>
  );
}
