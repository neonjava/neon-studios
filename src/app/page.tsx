import Link from 'next/link';
import { ArrowUpRight, ArrowRight, ShieldCheck, Gauge, Cpu, Waypoints, Link2, PackageCheck, CircleCheck } from 'lucide-react';
import { Pipeline } from '@/components/Pipeline';
import { Process } from '@/components/Process';
import { ServiceCard } from '@/components/ServiceCard';
import { ProjectGrid } from '@/components/ProjectGrid';
import { SectionIntro } from '@/components/SectionIntro';
import { services } from '@/content/services';
const benefits = [
  { Icon: ShieldCheck, title: 'Memory safety', detail: 'Ownership and types prevent broad classes of memory errors in safe Rust.' },
  { Icon: Gauge, title: 'Predictable resources', detail: 'Explicit ownership makes resource lifetimes easier to reason about.' },
  { Icon: Cpu, title: 'Native execution', detail: 'Compiled binaries can suit performance-sensitive and deployment-constrained workloads.' },
  { Icon: Waypoints, title: 'Concurrency', detail: 'Type-checked sharing helps make concurrent designs more deliberate.' },
  { Icon: PackageCheck, title: 'Fewer runtime dependencies', detail: 'Some applications can ship without a language runtime on the target host.' },
  { Icon: Link2, title: 'Interoperability', detail: 'FFI and service boundaries support staged migrations when a full rewrite is unwise.' },
];
export default function Home() { return <>
  <section className="hero"><div className="container hero-grid"><div><span className="eyebrow"><span className="eyebrow-dot"/> Rust-first engineering studio</span><h1>Existing software.<br/><span className="gradient-text">Reimagined in Rust.</span></h1><p className="hero-copy">Neon Studios helps migrate applications, services, and developer tools to Rust — with compatibility, correctness, and maintainability at the center.</p><div className="hero-actions"><Link href="/services" className="button button-primary">Explore services <ArrowUpRight size={18}/></Link><Link href="/contact" className="button button-secondary">Start a project <ArrowRight size={18}/></Link></div><div className="hero-note"><CircleCheck size={15}/> Founder-operated · Evidence-driven · Scoped to your codebase</div></div><Pipeline/></div></section>
  <section className="section section-soft"><div className="container"><SectionIntro eyebrow="What we migrate" title="A focused path from existing code to Rust.">From whole services to carefully chosen components, each migration starts with the behavior your users depend on.</SectionIntro><div className="services-grid">{services.map(service => <ServiceCard key={service.slug} service={service}/>)}</div></div></section>
  <section className="section"><div className="container benefits-grid"><div><SectionIntro eyebrow="Why Rust" title="Strong reasons. Clear tradeoffs.">Rust can improve safety and control when the workload and migration cost justify it. The first step is finding out whether it fits your system.</SectionIntro><div className="tradeoff"><h3>A migration is an engineering decision.</h3><p>Rewrites carry cost and compatibility risk. We inspect constraints, preserve behavior, and benchmark before making performance claims.</p></div></div><div className="benefit-list">{benefits.map(({Icon,title,detail}) => <div className="benefit" key={title}><Icon size={21}/><h3>{title}</h3><p>{detail}</p></div>)}</div></div></section>
  <section className="section section-soft"><div className="container"><SectionIntro eyebrow="Our process" title="Every step has a purpose.">A migration succeeds when the replacement works in the system you actually run.</SectionIntro><Process/></div></section>
  <section className="section"><div className="container"><SectionIntro eyebrow="Engineering work" title="Built in public, described precisely.">These are founder open-source projects. They are not presented as studio client migrations.</SectionIntro><ProjectGrid limit={3}/><div style={{marginTop:27}}><Link className="service-link" href="/work">Explore engineering work <ArrowUpRight size={16}/></Link></div></div></section>
  <section className="section"><div className="container"><div className="cta-band"><div><span className="eyebrow"><span className="eyebrow-dot"/> Start with your codebase</span><h2>Have software that deserves a careful next chapter?</h2><p>Tell us what exists, what must stay compatible, and why you’re considering Rust.</p></div><Link href="/contact" className="button button-primary">Discuss a migration <ArrowUpRight size={17}/></Link></div></div></section>
</>; }
