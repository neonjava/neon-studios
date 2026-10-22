import type { Metadata } from 'next';
import { createHighlighter } from 'shiki';
import { MigrationLab } from '@/components/MigrationLab';
import { migrationExamples } from '@/content/migrations';
export const metadata: Metadata = { title: 'Migration Lab', description: 'Compare educational Python, Node.js, and Java examples with equivalent Rust implementations.' };
export default async function LabPage() {
  const highlighter = await createHighlighter({ themes: ['github-dark'], langs: ['python','javascript','java','rust'] });
  const examples = migrationExamples.map(example => ({ ...example,
    sourceHtml: highlighter.codeToHtml(example.sourceCode, { lang: example.language === 'Python' ? 'python' : example.language === 'Java' ? 'java' : 'javascript', theme: 'github-dark' }),
    rustHtml: highlighter.codeToHtml(example.rustCode, { lang: 'rust', theme: 'github-dark' }),
  }));
  highlighter.dispose();
  return <><div className="container page-intro"><span className="eyebrow"><span className="eyebrow-dot"/> Migration Lab</span><h1>Explore the translation, not a magic converter.</h1><p>Choose a source language and workload to compare small, executable examples with Rust. The code is static educational content with stated contracts and limits. Your application needs its own analysis and tests.</p></div><section className="section" style={{paddingTop:12}}><div className="container"><MigrationLab examples={examples}/></div></section></>;
}
