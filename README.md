# Neon Studios

Founder-operated Rust migration and modernization studio website. Built with Next.js App Router, strict TypeScript, Tailwind CSS, and Lucide icons. Interaction transitions use CSS and respect reduced-motion preferences.

## Local development

Requires Node.js 22 or newer.

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. The site uses `neonjava.in@gmail.com` as the default public enquiry recipient. Set `NEXT_PUBLIC_CONTACT_EMAIL` to change it. A mailto recipient is visible to visitors by design.

## Content and architecture

- `src/config`: identity and navigation.
- `src/content`: services, process, curated founder projects, and educational migration examples.
- `src/components`: reusable navigation, theme, process, project, lab, and form components.
- `src/lib`: GitHub integration, validation, and utilities.
- `src/app`: App Router pages, metadata endpoints, loading/error states.
- `src/styles`: separate tokens, base, layout, sections, workspace, forms, and responsive styles, composed by `globals.css`.

The visual system defaults to matte black with restrained macOS-inspired workspace chrome. The appearance menu offers Light and System modes and persists the selection. Code highlighting follows the active theme. Shared `Brand`, `PageIntro`, `WindowFrame`, and `CallToAction` components keep routes consistent.

The Migration Lab contains static, explicitly educational examples. It does not execute visitor code or convert arbitrary source. No benchmarks or client case studies are published without evidence. The work page fetches live public repository metadata on the server and revalidates it hourly. If GitHub fails, the curated project remains visible without fabricated metadata.

The contact form validates input and opens a structured email draft. The visitor must send that draft in their mail app; this site cannot verify delivery. Copying the enquiry is a separate, confirmed clipboard action. There is no server-side form storage or transactional email provider.

## Checks

```bash
npm run lint
npm run typecheck
npm test
npx playwright install chromium
npm run test:e2e
npm run build
```

On systems with a custom Chromium binary, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE` for browser tests.

## Vercel deployment

1. Import the public `neonjava/neon-studios` repository into Vercel as a Next.js project.
2. Set `NEXT_PUBLIC_CONTACT_EMAIL` to the desired public recipient. Optionally set `GITHUB_TOKEN` as a server-only secret to increase GitHub API rate limits. No token is required for public repository metadata.
3. Deploy a preview, test the email draft and all six routes, then promote it when ready.
4. Add `studio.neonjava.in` as a domain in the Vercel project. Vercel will show the required DNS record; normally this is a CNAME for `studio` pointing to Vercel's provided target. Set that record with the DNS host for `neonjava.in` and verify it in Vercel.
5. Leave the apex `neonjava.in` and its existing site untouched.

This repository does not deploy or change DNS automatically.

## Refactor verification

The matte redesign was checked with ESLint, strict TypeScript, the production build, seven unit/integration tests, and four Chromium browser flows. Browser coverage includes persistent light/dark/system preferences, navigation, mobile dock behavior, form validation, code copying, migration selection, workspace interactions, keyboard process tabs, and axe scans on all six routes in both themes. Migration fixtures are compiled/executed using Python, Node.js, Java, and Rust; these toolchains must be installed to run the full unit suite.
