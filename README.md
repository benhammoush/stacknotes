# Stacknotes

A growing knowledge base for ideas, clear explanations, practical notes and useful
comparisons. Current topics cover databases, hosting, sign-in and accounts,
storage, caching, search, background tasks and queues, and monitoring for cloud and self-hosted services: what each product is for,
its strengths and limitations, and what you still need to manage.

## Tech stack

| Area     | Tools                                          |
| -------- | ---------------------------------------------- |
| App      | React, React Router, TypeScript, Vite          |
| Tests    | Vitest, Playwright (Chromium, Firefox, WebKit) |
| Quality  | Type-aware ESLint, JSDoc/TSDoc, Prettier       |
| Delivery | GitHub Actions shared workflows, Vercel        |

## Features

- Cloud services groups eight comparisons and Common combinations in a second navigation row, with no
  category landing page or breadcrumbs.
- Eight cloud comparisons covering focused product choices and who handles what.
- Self-hosted services mirrors the nine cloud topics with eight software
  comparisons and ten example-backed associations. License and operating costs replace
  provider billing; operator responsibilities stay explicit. Every product has a
  locally hosted logo or official favicon, with sources in the third-party notices.
- Caching compares shared application data caches, including Redis and Valkey,
  separately from databases. Sessions and rate limiting are use cases, not automatic
  sign-in features. Search explains indexing, data synchronization and private results;
  small apps may only need their database's built-in search.
- Ten suggested cloud service combinations show how hosting, data, accounts, files, background
  tasks, monitoring, caching and search fit together, with official source links and setup caveats.
  Cloud combinations suggest dedicated caching and search services; self-hosted
  associations also identify app-managed or database search. A dash means no
  separate service is suggested. Pick only the services your app needs.
  Comparable choices share a cell with equal styling, not a ranking or a list of
  services to install together. Features, costs and integration work still differ.
  All cloud supporting-service choices show their platform context; hosting itself
  and self-hosted rows do not need relationship labels.
  “Within Azure” means the same hosting platform; “External · Upstash” means another
  provider. Neither implies free service, bundled pricing or automatic connections.
  Common combinations is the entry topic when switching between Cloud services
  and Self-hosted services. Each row has an ⓘ button that opens a centered dialog
  combining plain-English benefits and trade-offs. Names and hover do not open it;
  keyboard activation, tap, Escape and backdrop dismissal are supported. Rows stay
  compact, without separate “What to know” disclosures. Cloud product examples stay in the editorial
  data, not the page. Self-hosted examples link documented core associations,
  without implying complete deployments or company adoption; built-in and separate
  roles are explicit rather than filled with arbitrary products.
- Monochrome design, colored logos and a locally hosted Inter font.
- Blue ≠ marks identify less-common responsibility labels, not better products.
- Labels stay visible while scrolling; jump to a provider or use a compact view.
- Plain-English explanations available by hover, keyboard or tap.
- Official documentation links and notes about plan-specific limits.

## Boundaries and integration

Comparison content is written in advance, not fetched live from providers.
Stacknotes has no server code, user accounts or tracking.
One React app serves all pages. Navigation is defined in `src/data/categories.ts`;
cloud comparison content lives in JSON files, while self-hosted comparisons and
combination suggestions live in typed data modules, separate from display code.
Vercel serves the app for page addresses. Unknown pages show a not-found message;
missing files and server-request paths return a 404 response.
The database comparison preserves the original eight products from a November 2026
PDF and adds DynamoDB and Firestore from official documentation. The original
wording has been simplified, but those technical claims have not been independently revalidated.
Other comparisons summarize official documentation and billing information reviewed
in November 2026. Check official sources before choosing or configuring a product.

## Notices

Provider logos belong to their respective owners and do not imply endorsement.
See [third-party notices](THIRD_PARTY_NOTICES.txt).
