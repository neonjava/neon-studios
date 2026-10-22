import { describe, expect, it } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { migrationExamples } from '../src/content/migrations';
function command(binary:string,args:string[],cwd:string,input='') { return spawnSync(binary,args,{cwd,input,encoding:'utf8',timeout:15000}); }
describe('migration examples', () => {
  it('has twelve explicit comparisons with contracts and limitations', () => { expect(migrationExamples).toHaveLength(12); for(const example of migrationExamples) { expect(example.behavior.length).toBeGreaterThan(30); expect(example.tests.length).toBeGreaterThan(0); expect(example.limitations.length).toBeGreaterThan(20); } });
  it('compiles and produces matching output for stated fixtures', () => {
    const root = mkdtempSync(join(tmpdir(),'neon-migrations-'));
    try {
      for (const example of migrationExamples) {
        const dir = join(root, example.id); mkdirSync(dir);
        writeFileSync(join(dir,example.sourceFile),example.sourceCode);
        writeFileSync(join(dir,'main.rs'),example.rustCode);
        const rustBuild = command('rustc',['main.rs','-o','rust-bin'],dir); expect(rustBuild.status, `${example.id} Rust: ${rustBuild.stderr}`).toBe(0);
        if(example.language==='Java') { const build=command('javac',['Main.java'],dir); expect(build.status,`${example.id} Java: ${build.stderr}`).toBe(0); }
        if(example.language==='Node.js') { const check=command('node',['--check','main.mjs'],dir); expect(check.status,`${example.id} Node: ${check.stderr}`).toBe(0); }
        if(example.language==='Python') { const check=command('python3',['-m','py_compile','main.py'],dir); expect(check.status,`${example.id} Python: ${check.stderr}`).toBe(0); }
        for(const fixture of example.tests) {
          const isFile=example.workload==='File processing'; const isCli=example.workload==='CLI utility';
          if(isFile) writeFileSync(join(dir,'input.txt'),fixture.input);
          const args=isFile?['input.txt']:isCli?fixture.input.split(' ').filter(Boolean):[];
          const input=isFile||isCli?'':fixture.input;
          const rust=command(join(dir,'rust-bin'),args,dir,input);
          const source=example.language==='Python'?command('python3',['main.py',...args],dir,input):example.language==='Java'?command('java',['Main',...args],dir,input):command('node',['main.mjs',...args],dir,input);
          expect(source.status,`${example.id} source: ${source.stderr}`).toBe(0);
          expect(rust.status,`${example.id} Rust: ${rust.stderr}`).toBe(0);
          expect(source.stdout,`${example.id} source`).toBe(fixture.expected);
          expect(rust.stdout,`${example.id} Rust`).toBe(fixture.expected);
        }
      }
    } finally { rmSync(root,{recursive:true,force:true}); }
  },120000);
});
