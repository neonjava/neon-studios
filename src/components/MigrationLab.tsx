'use client';
import { useMemo, useState } from 'react';
import { createTwoFilesPatch } from 'diff';
import { Check, Copy } from 'lucide-react';
import type { MigrationExample, SourceLanguage, Workload } from '@/content/migrations';
type HighlightedExample = MigrationExample & { sourceHtml: string; rustHtml: string };
export function MigrationLab({ examples }: { examples: HighlightedExample[] }) {
  const [language, setLanguage] = useState<SourceLanguage>('Python');
  const [workload, setWorkload] = useState<Workload>('Data transformation');
  const [view, setView] = useState<'split'|'diff'>('split');
  const [mobileTab, setMobileTab] = useState<'source'|'rust'>('source');
  const [copied, setCopied] = useState<string | null>(null);
  const example = examples.find(item => item.language === language && item.workload === workload) || examples[0];
  const diff = useMemo(() => createTwoFilesPatch(example.sourceFile, 'main.rs', example.sourceCode, example.rustCode, 'source', 'Rust', { context: 3 }), [example]);
  async function copy(text: string, key: string) { try { await navigator.clipboard.writeText(text); setCopied(key); window.setTimeout(() => setCopied(null), 1800); } catch { setCopied(null); } }
  const pane = (name: string, code: string, html: string, key: 'source'|'rust') => <div className={`code-pane ${mobileTab !== key ? 'mobile-hidden' : ''}`}><div className="code-head"><span>{name}</span><button className="copy-button" onClick={() => copy(code,key)} aria-label={`Copy ${name} code`}>{copied === key ? <Check size={14}/> : <Copy size={14}/>} {copied === key ? 'Copied' : 'Copy'}</button></div><div className="code-scroll" dangerouslySetInnerHTML={{__html:html}}/></div>;
  return <>
    <div className="lab-controls"><div className="control-group"><label htmlFor="language">Source language</label><select className="select" id="language" value={language} onChange={e => setLanguage(e.target.value as SourceLanguage)}>{['Python','Node.js','Java'].map(item => <option key={item}>{item}</option>)}</select></div><div className="control-group"><label htmlFor="workload">Workload</label><select className="select" id="workload" value={workload} onChange={e => setWorkload(e.target.value as Workload)}>{['Data transformation','File processing','CLI utility','Background task'].map(item => <option key={item}>{item}</option>)}</select></div></div>
    <div className="lab-shell"><div className="lab-toolbar"><strong>{example.title}</strong><div className="segmented" aria-label="Comparison view"><button className={view === 'split' ? 'active' : ''} onClick={() => setView('split')} aria-pressed={view === 'split'}>Side by side</button><button className={view === 'diff' ? 'active' : ''} onClick={() => setView('diff')} aria-pressed={view === 'diff'}>Unified diff</button></div></div>{view === 'split' ? <><div className="mobile-code-tabs segmented" aria-label="Mobile code view"><button className={mobileTab === 'source' ? 'active' : ''} onClick={() => setMobileTab('source')}>{language}</button><button className={mobileTab === 'rust' ? 'active' : ''} onClick={() => setMobileTab('rust')}>Rust</button></div><div className="code-grid">{pane(example.sourceFile, example.sourceCode, example.sourceHtml, 'source')}{pane('main.rs', example.rustCode, example.rustHtml, 'rust')}</div></> : <div className="diff-view" aria-label="Unified textual diff">{diff.split('\n').map((line,i) => <div key={i} className={`diff-line ${line.startsWith('+') && !line.startsWith('+++') ? 'diff-add' : line.startsWith('-') && !line.startsWith('---') ? 'diff-remove' : ''}`}>{line || ' '}</div>)}</div>}</div>
    <div className="lab-info"><article className="info-card"><h3>Compatibility contract</h3><p>{example.behavior}</p><h3>Test cases</h3>{example.tests.map((test,i) => <div className="test-case" key={i}>Input: <code>{JSON.stringify(test.input)}</code><br/>Expected: <code>{JSON.stringify(test.expected)}</code></div>)}</article><article className="info-card"><h3>Migration considerations</h3><ul>{example.considerations.map(item => <li key={item}>{item}</li>)}</ul><h3>Limits of this example</h3><p>{example.limitations}</p><h3>Benchmark</h3><p>Not benchmarked. These are educational equivalents, not a measured performance comparison.</p></article></div>
  </>;
}
