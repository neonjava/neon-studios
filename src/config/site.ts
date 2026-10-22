export const site = {
  name: 'Neon Studios',
  title: 'Neon Studios — Software, reimagined in Rust',
  description: 'Founder-operated Rust migration and modernization. We preserve behavior, verify compatibility, and measure what changes.',
  url: 'https://studio.neonjava.in',
  founder: 'NeonJava',
  github: 'https://github.com/neonjava',
  personalSite: 'https://neonjava.in',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'neonjava.in@gmail.com',
} as const;
