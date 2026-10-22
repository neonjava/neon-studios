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

The visual system defaults to matte black with restrained macOS-inspired workspace chrome. The appearance button switches directly between dark and light and persists the selection. Dark is the default, including for previously saved System preferences. Code highlighting follows the active theme. Shared `Brand`, `PageIntro`, `WindowFrame`, and `CallToAction` components keep routes consistent.

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

The matte redesign was checked with ESLint, strict TypeScript, the production build, ten unit/integration tests, and five Chromium browser flows. Browser coverage includes persistent light/dark preferences, navigation, mobile dock behavior, form validation, code copying, migration selection, workspace interactions, keyboard process tabs, and axe scans on all six routes in both themes. Migration fixtures are compiled/executed using Python, Node.js, Java, and Rust; these toolchains must be installed to run the full unit suite.

## Cloudflare DNS for studio.neonjava.in

1. In Vercel, import `neonjava/neon-studios`. Use the Next.js preset, repository root, `npm run build`, and default output settings. Set the public enquiry recipient if needed, then deploy and check the generated preview URL.
2. In the Vercel project, open **Settings → Domains** and add `studio.neonjava.in` to production. Copy the exact CNAME target Vercel displays; it can be specific to the project.
3. In Cloudflare, select the existing `neonjava.in` zone, then **DNS → Records → Add record**:

   | Field | Value |
   | --- | --- |
   | Type | CNAME |
   | Name | studio |
   | Target | Exact CNAME target from Vercel |
   | Proxy status | DNS only (gray cloud) |
   | TTL | Auto |

4. If Vercel requests ownership verification, add the exact TXT name and value it provides in Cloudflare too.
5. Wait for Vercel to show valid configuration and provision HTTPS, then open `https://studio.neonjava.in` and check the routes and enquiry draft.

Keep existing apex, www, email records, and Cloudflare nameservers. If a `studio` record already exists, inspect its destination before replacing it. This website promotes paid services: use a Vercel plan that permits commercial use; Hobby is restricted to personal, non-commercial usage.

References: [Vercel custom domains](https://vercel.com/docs/domains/set-up-custom-domain), [Cloudflare DNS records](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/), [Vercel usage guidelines](https://vercel.com/docs/limits/fair-use-guidelines).

## Search visibility and Google Search Console

Titles, descriptions, canonical URLs, and social metadata are managed in `src/config/seo.ts`. The six canonical production URLs feed the sitemap. JSON-LD identifies the studio, founder, website, and the services actually described on the page. No fake ratings, locations, client results, or performance claims are added. Vercel preview builds emit `noindex` metadata.

After deploying to `https://studio.neonjava.in`:

1. Add the HTTPS URL-prefix property in Google Search Console.
2. Choose HTML tag verification. Set `GOOGLE_SITE_VERIFICATION` in Vercel to the tag's **content value only**, then redeploy. Keep local configuration in ignored `.env.local`; don't commit it. The token will be public in the generated HTML, as required by Google.
3. Confirm the live homepage contains the verification meta tag, then click **Verify**. Keep the value configured after verification.
4. Submit `https://studio.neonjava.in/sitemap.xml` in Search Console's Sitemaps screen.
5. Inspect the homepage and services URL using URL Inspection, test the live URL, and request indexing. Review indexing reports after Google crawls the site.
6. Publish useful, original technical explanations and verified migration case studies as real work becomes available. Link to the studio from your own relevant profiles.

Metadata and sitemaps help Google understand and discover the site; they do not guarantee indexing, rankings, or a specific search result appearance. See [Google site names](https://developers.google.com/search/docs/appearance/site-names) and [sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

See `SECURITY.md` for public repository precautions. Never put API tokens or private client information into site content, metadata, or browser environment variables.
