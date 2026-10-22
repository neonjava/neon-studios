import type { ReactNode } from 'react';
export function SectionIntro({ eyebrow, title, children, center = false }: { eyebrow: string; title: string; children?: ReactNode; center?: boolean }) { return <div className={`section-intro ${center ? 'center' : ''}`}><span className="eyebrow"><span className="eyebrow-dot"/>{eyebrow}</span><h2>{title}</h2>{children && <p>{children}</p>}</div>; }
