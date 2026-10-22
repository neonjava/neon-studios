import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Layers3,
} from "lucide-react";
import { Pipeline } from "@/components/Pipeline";
import { Process } from "@/components/Process";
import { ServiceCard } from "@/components/ServiceCard";
import { ProjectGrid } from "@/components/ProjectGrid";
import { SectionIntro } from "@/components/SectionIntro";
import { CallToAction } from "@/components/CallToAction";
import { services } from "@/content/services";
import { benefits } from "@/content/studio";
import { migrationExamples } from "@/content/migrations";
import { highlightExamples } from "@/lib/highlight";

const icons = { shield: ShieldCheck, cpu: Cpu, layers: Layers3 };

export default async function Home() {
  const [example] = await highlightExamples([migrationExamples[0]]);
  return (
    <>
      <section className="hero container">
        <div className="hero-heading">
          <span className="studio-badge">
            <span /> Independent engineering. Rust first.
          </span>
          <h1>
            Existing software.
            <br />
            <span>
              Reimagined in <em>Rust.</em>
            </span>
          </h1>
          <p className="hero-copy">
            We migrate applications, services, and developer tools to Rust.
            <br className="desktop-break" /> Preserve what works. Verify what
            changes.
          </p>
          <div className="hero-actions">
            <Link href="/contact" className="button button-primary">
              Start a conversation <ArrowUpRight size={16} />
            </Link>
            <Link href="/services" className="button button-secondary">
              Explore services <ArrowRight size={16} />
            </Link>
          </div>
          <span className="hero-signature">Founder-operated by NeonJava</span>
        </div>
        <Pipeline example={example} />
        <div className="scope-strip">
          <span>Built around your existing stack</span>
          <span>Python</span>
          <span>Node.js</span>
          <span>Java</span>
          <span>C / C++</span>
          <span className="scope-destination">→ Rust</span>
        </div>
      </section>

      <section className="section container">
        <div className="section-heading-row">
          <SectionIntro
            eyebrow="01 / Migration services"
            title="A better foundation. The same essential behavior."
          >
            From a single library to a backend service, the scope starts with
            what your software needs to do.
          </SectionIntro>
          <Link className="text-link" href="/services">
            View services <ArrowUpRight size={15} />
          </Link>
        </div>
        <div className="service-list">
          {services.map((service, index) => (
            <ServiceCard key={service.slug} service={service} index={index} />
          ))}
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <SectionIntro
            eyebrow="02 / Engineering judgment"
            title="Rust has strengths. Context decides."
          >
            Safety, native execution, and explicit resource ownership can matter
            enormously. The right decision still depends on your system.
          </SectionIntro>
          <div className="benefit-list">
            {benefits.map(({ icon, title, detail }) => {
              const Icon = icons[icon];
              return (
                <article className="benefit" key={title}>
                  <Icon size={21} strokeWidth={1.5} />
                  <h3>{title}</h3>
                  <p>{detail}</p>
                </article>
              );
            })}
          </div>
          <div className="tradeoff">
            <span className="eyebrow">Before a rewrite</span>
            <p>
              Migration has a cost. We inspect compatibility risk and deployment
              constraints, and establish a baseline before making any
              performance claim.
            </p>
          </div>
        </div>
      </section>

      <section className="section container">
        <SectionIntro
          eyebrow="03 / The method"
          title="Understand. Build. Prove."
        >
          A deliberate sequence from the first code review to a maintainable
          implementation.
        </SectionIntro>
        <Process />
      </section>

      <section className="section container work-section">
        <div className="section-heading-row">
          <SectionIntro
            eyebrow="04 / Selected engineering"
            title="The work is open to inspection."
          >
            Founder projects in systems, tooling, and Rust. Each comes with its
            source and its current limitations.
          </SectionIntro>
          <Link href="/work" className="text-link">
            All engineering work <ArrowUpRight size={15} />
          </Link>
        </div>
        <ProjectGrid limit={3} />
      </section>
      <CallToAction />
    </>
  );
}
