# Public repository security

This repository is intentionally public. Never commit credentials, private keys, client code, private enquiries, or environment files. `.env.example` contains documented public defaults and empty secret fields only.

- Keep local values in ignored `.env.local`; configure production secrets in Vercel's environment settings.
- `GITHUB_TOKEN` is server-only. Never rename it with a `NEXT_PUBLIC_` prefix or add it to client components.
- The enquiry recipient and Google site verification tag are public website data. The Google token proves ownership by being served in HTML; it is not an API credential. Its configured value is still kept out of Git.
- GitHub secret scanning and push protection are enabled. They reduce risk but cannot detect every secret format.
- Before publishing changes, inspect the staged diff and run Gitleaks against all Git history: `gitleaks git . --redact --log-opts=--all`.
- If a secret is exposed, revoke or rotate it immediately. Deleting the current file does not remove it from commit history or clones.

For a suspected vulnerability, contact the public studio enquiry address listed on the website. Send a description and reproduction steps without live credentials or private client data. Do not post secrets in public issues.
