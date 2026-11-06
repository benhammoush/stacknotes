# Stacknotes

A growing knowledge base for ideas, clear explanations, practical notes and useful
comparisons. Current topics cover databases, hosting, authentication, storage,
jobs & queues, and monitoring: what each service provides, its trade-offs and what
you still need to manage.

## Tech stack

| Area     | Tools                                          |
| -------- | ---------------------------------------------- |
| App      | React, React Router, TypeScript, Vite          |
| Tests    | Vitest, Playwright (Chromium, Firefox, WebKit) |
| Quality  | Type-aware ESLint, JSDoc/TSDoc, Prettier       |
| Delivery | GitHub Actions shared workflows, Vercel        |

## Features

- Six eight-provider comparisons with overview and responsibility matrices.
- Monochrome workspace, colored logos and a locally hosted Inter font.
- Blue ≠ cues identify less-common responsibility statuses, not better services.
- Sticky labels, contained scrolling, provider jumps and a compact view.
- Plain-English explanations available by hover, keyboard or tap.
- Official documentation links and visible plan-specific caveats.

## Boundaries and integration

Static editorial content; no backend, accounts, tracking or runtime provider APIs.
One HTML entry and a shared React shell; category routes and navigation come from
`src/data/categories.ts`, with JSON datasets separate from `src/components/`.
Vercel serves the SPA shell for page routes. Unknown pages show the app's not-found
view (HTTP 200); missing asset and API paths remain HTTP 404.
The database comparison preserves a November 2026 PDF baseline, not a live pricing
or feature feed. Other categories summarize official documentation and billing
models reviewed November 4, 2026. Check official sources before operational decisions.

Delivery workflows are prepared locally; remote setup and deployment are not verified.

## Notices

Provider logos belong to their respective owners and do not imply endorsement.
See [third-party notices](THIRD_PARTY_NOTICES.txt).
