export type SourceLanguage = 'Python' | 'Node.js' | 'Java';
export type Workload = 'Data transformation' | 'File processing' | 'CLI utility' | 'Background task';
export interface MigrationExample {
  id: string;
  language: SourceLanguage;
  workload: Workload;
  title: string;
  behavior: string;
  sourceCode: string;
  rustCode: string;
  tests: { input: string; expected: string }[];
  considerations: string[];
  limitations: string;
  sourceFile: string;
}
const rust = {
  data: `use std::io::{self, Read};
fn main() {
    let mut input = String::new();
    io::stdin().read_to_string(&mut input).unwrap();
    let mut names: Vec<String> = input.lines()
        .map(|s| s.trim().to_ascii_lowercase())
        .filter(|s| !s.is_empty())
        .map(String::from).collect();
    names.sort();
    names.dedup();
    println!("{}", names.join("\\n"));
}`,
  file: `use std::{env, fs};
fn main() {
    let path = env::args().nth(1).expect("file path required");
    let text = fs::read_to_string(path).expect("read failed");
    let count = text.lines().filter(|line| line.contains("ERROR")).count();
    println!("{count}");
}`,
  cli: `use std::env;
fn main() {
    let total: i64 = env::args().skip(1)
        .map(|arg| arg.parse::<i64>().expect("integer required"))
        .sum();
    println!("{total}");
}`,
  task: `use std::io::{self, Read};
fn main() {
    let mut input = String::new();
    io::stdin().read_to_string(&mut input).unwrap();
    for line in input.lines().filter(|s| !s.trim().is_empty()) {
        let (id, failures) = line.split_once(',').expect("id,failures required");
        let failures: u32 = failures.trim().parse().expect("count required");
        let outcome = if failures < 3 { format!("ok:{}", failures + 1) }
            else { "failed:3".to_string() };
        println!("{}:{}", id.trim(), outcome);
    }
}`,
};
const source: Record<SourceLanguage, Record<'data'|'file'|'cli'|'task', string>> = {
  Python: {
    data: `import sys
names = sorted({line.strip().lower() for line in sys.stdin if line.strip()})
print("\\n".join(names))`,
    file: `import sys
with open(sys.argv[1], encoding="utf-8") as file:
    print(sum("ERROR" in line for line in file))`,
    cli: `import sys
print(sum(int(arg) for arg in sys.argv[1:]))`,
    task: `import sys
for line in sys.stdin:
    if not line.strip():
        continue
    task_id, failures = line.strip().split(",", 1)
    failures = int(failures)
    outcome = f"ok:{failures + 1}" if failures < 3 else "failed:3"
    print(f"{task_id.strip()}:{outcome}")`,
  },
  'Node.js': {
    data: `const chunks = [];
for await (const chunk of process.stdin) chunks.push(chunk);
const names = [...new Set(Buffer.concat(chunks).toString('utf8')
  .split(/\\r?\\n/).map(s => s.trim().toLowerCase()).filter(Boolean))].sort();
console.log(names.join('\\n'));`,
    file: `import { readFileSync } from 'node:fs';
const text = readFileSync(process.argv[2], 'utf8');
const lines = text.split(/\\r?\\n/);
console.log(lines.filter(line => line.includes('ERROR')).length);`,
    cli: `const values = process.argv.slice(2).map(arg => {
  if (!/^-?\\d+$/.test(arg)) throw new Error('integer required');
  return BigInt(arg);
});
console.log(values.reduce((sum, value) => sum + value, 0n).toString());`,
    task: `const chunks = [];
for await (const chunk of process.stdin) chunks.push(chunk);
const lines = Buffer.concat(chunks).toString('utf8').split(/\\r?\\n/);
for (const line of lines.filter(s => s.trim())) {
  const [id, raw] = line.split(',', 2);
  const failures = Number(raw.trim());
  const outcome = failures < 3 ? 'ok:' + (failures + 1) : 'failed:3';
  console.log(id.trim() + ':' + outcome);
}`,
  },
  Java: {
    data: `import java.io.*;
import java.util.*;
public class Main {
  public static void main(String[] args) throws Exception {
    TreeSet<String> names = new TreeSet<>();
    BufferedReader in = new BufferedReader(new InputStreamReader(System.in));
    for (String line; (line = in.readLine()) != null;) {
      String name = line.trim().toLowerCase(Locale.ROOT);
      if (!name.isEmpty()) names.add(name);
    }
    System.out.println(String.join("\\n", names));
  }
}`,
    file: `import java.nio.file.*;
public class Main {
  public static void main(String[] args) throws Exception {
    try (var lines = Files.lines(Path.of(args[0]))) {
      System.out.println(lines.filter(s -> s.contains("ERROR")).count());
    }
  }
}`,
    cli: `public class Main {
  public static void main(String[] args) {
    long total = 0;
    for (String arg : args) total = Math.addExact(total, Long.parseLong(arg));
    System.out.println(total);
  }
}`,
    task: `import java.io.*;
public class Main {
  public static void main(String[] args) throws Exception {
    BufferedReader in = new BufferedReader(new InputStreamReader(System.in));
    for (String line; (line = in.readLine()) != null;) {
      if (line.trim().isEmpty()) continue;
      String[] parts = line.split(",", 2);
      int failures = Integer.parseInt(parts[1].trim());
      String outcome = failures < 3 ? "ok:" + (failures + 1) : "failed:3";
      System.out.println(parts[0].trim() + ":" + outcome);
    }
  }
}`,
  },
};
const workloads = [
  { key: 'data', label: 'Data transformation', title: 'Normalize a name list', behavior: 'Read UTF-8 lines from stdin, trim ASCII whitespace, lowercase ASCII letters, remove empty and duplicate names, sort ascending, and print one name per line.', tests: [{ input: ' Ada\nBOB\nada\n', expected: 'ada\nbob\n' }, { input: '\n', expected: '\n' }], considerations: ['Define case folding and sort order before replacing production text handling.', 'Compare output fixtures across both implementations.'], limitations: 'The example contract is limited to ASCII names and whitespace.' },
  { key: 'file', label: 'File processing', title: 'Count error lines', behavior: 'Read a UTF-8 file path from the first argument and print the count of lines containing the case-sensitive text ERROR.', tests: [{ input: 'INFO ready\nERROR failed\nERROR retry\n', expected: '2\n' }, { input: '', expected: '0\n' }], considerations: ['File encodings and read errors need an explicit production policy.', 'Test CRLF, missing files, and large files against the original.'], limitations: 'Reads the full file in Node.js and Rust; this compact example is unsuitable for very large files.' },
  { key: 'cli', label: 'CLI utility', title: 'Sum integer arguments', behavior: 'Parse signed decimal command-line arguments, sum them, and print the total.', tests: [{ input: '4 -2 9', expected: '11\n' }, { input: '', expected: '0\n' }], considerations: ['Specify numeric range, overflow, and invalid-input exit behavior.', 'CLI flags and shell integration need separate compatibility tests.'], limitations: 'Examples assume the total fits in signed 64-bit range; invalid-input error text differs.' },
  { key: 'task', label: 'Background task', title: 'Model a bounded retry', behavior: 'Read id,failures rows from stdin and report the attempt of success, or failed:3 after three attempts.', tests: [{ input: 'alpha,0\nbeta,2\ngamma,3\n', expected: 'alpha:ok:1\nbeta:ok:3\ngamma:failed:3\n' }], considerations: ['Real retries need idempotency, deadlines, backoff, and durable state.', 'Verify failure ordering and duplicate delivery with an actual queue.'], limitations: 'This deterministic model performs no network call, queue operation, delay, or concurrent work.' },
] as const;
export const migrationExamples: MigrationExample[] = (Object.keys(source) as SourceLanguage[]).flatMap(language => workloads.map(workload => ({
  id: `${language.toLowerCase().replace('.', '')}-${workload.key}`,
  language,
  workload: workload.label,
  title: workload.title,
  behavior: workload.behavior,
  sourceCode: source[language][workload.key],
  rustCode: rust[workload.key],
  tests: [...workload.tests],
  considerations: [...workload.considerations],
  limitations: workload.limitations,
  sourceFile: language === 'Python' ? 'main.py' : language === 'Java' ? 'Main.java' : 'main.mjs',
})));
