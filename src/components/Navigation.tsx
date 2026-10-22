'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { House, Blocks, FolderOpen, FlaskConical, UserRound, ArrowUpRight, Menu, X, Mail } from 'lucide-react';
import { navigation } from '@/config/navigation';
import { ThemeToggle } from './ThemeToggle';
const icons = { house: House, blocks: Blocks, folder: FolderOpen, flask: FlaskConical, user: UserRound };
export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return <>
    <header className="site-header"><div className="header-inner container">
      <Link className="brand" href="/" aria-label="Neon Studios home" onClick={() => setOpen(false)}><span className="brand-mark">N<span>.</span></span><span>neon<span className="brand-light">studios</span></span></Link>
      <nav className="desktop-nav" aria-label="Primary navigation">{navigation.map(item => <Link key={item.href} href={item.href} className={pathname === item.href ? 'nav-link active' : 'nav-link'} aria-current={pathname === item.href ? 'page' : undefined}>{item.label}</Link>)}</nav>
      <div className="header-actions"><ThemeToggle /><Link className="button button-small button-primary desktop-cta" href="/contact">Start a project <ArrowUpRight size={16}/></Link><button className="icon-button mobile-menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X size={20}/> : <Menu size={20}/>}</button></div>
    </div></header>
    <div id="mobile-menu" className={`mobile-menu ${open ? 'is-open' : ''}`} hidden={!open}><nav aria-label="Mobile secondary navigation"><Link href="/about" onClick={() => setOpen(false)}><UserRound size={18}/> About</Link><Link href="/contact" onClick={() => setOpen(false)}><Mail size={18}/> Contact</Link></nav><ThemeToggle /></div>
    <nav className="mobile-dock" aria-label="Mobile primary navigation"><div className="dock-pill">{navigation.slice(0,4).map(item => { const Icon = icons[item.icon]; return <Link key={item.href} href={item.href} className={pathname === item.href ? 'dock-item active' : 'dock-item'} aria-label={item.label} aria-current={pathname === item.href ? 'page' : undefined}><Icon size={20} strokeWidth={pathname === item.href ? 2.4 : 1.9}/><span>{item.label === 'Migration Lab' ? 'Lab' : item.label}</span></Link>; })}</div><Link href="/contact" className="dock-action" aria-label="Start a project"><ArrowUpRight size={23}/></Link></nav>
  </>;
}
