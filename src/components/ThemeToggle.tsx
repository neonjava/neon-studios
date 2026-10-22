'use client';
import { useEffect, useState } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
type Theme = 'light' | 'dark' | 'system';
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('system');
  useEffect(() => { const frame = requestAnimationFrame(() => setTheme((localStorage.getItem('neon-theme') as Theme) || 'system')); const media = matchMedia('(prefers-color-scheme: dark)'); const syncSystem = () => { if ((localStorage.getItem('neon-theme') || 'system') === 'system') document.documentElement.dataset.theme = media.matches ? 'dark' : 'light'; }; media.addEventListener('change', syncSystem); return () => { cancelAnimationFrame(frame); media.removeEventListener('change', syncSystem); }; }, []);
  function cycle() {
    const next: Theme = theme === 'system' ? (document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark') : theme === 'dark' ? 'light' : 'system';
    localStorage.setItem('neon-theme', next);
    setTheme(next);
    const dark = next === 'dark' || (next === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  }
  const Icon = theme === 'dark' ? Moon : theme === 'light' ? Sun : Monitor;
  return <button className="icon-button" onClick={cycle} aria-label={`Theme: ${theme}. Switch theme`} title={`Theme: ${theme}`}><Icon size={18} aria-hidden="true" /></button>;
}
