import Link from 'next/link';
import { ArrowUpRight, MoveRight } from 'lucide-react';
import type { Service } from '@/content/services';
export function ServiceCard({ service }: { service: Service }) { return <Link href={`/services#${service.slug}`} className="service-card"><div className="service-card-top"><span className="service-glyph"><MoveRight size={22}/></span><ArrowUpRight size={17}/></div><h3>{service.title}</h3><p>{service.summary}</p><div className="service-card-bottom"><span>{service.workloads.slice(0,2).join(' · ')}</span><span>Explore</span></div></Link>; }
