# Stacknotes

A growing knowledge base for ideas, clear explanations, practical notes and useful
comparisons. Current topics cover databases, hosting, sign-in and accounts,
storage, background tasks and queues, and monitoring: what each product is for,
its strengths and limitations, and what you still need to manage.

## Tech stack

| Area     | Tools                                          |
| -------- | ---------------------------------------------- |
| App      | React, React Router, TypeScript, Vite          |
| Tests    | Vitest, Playwright (Chromium, Firefox, WebKit) |
| Quality  | Type-aware ESLint, JSDoc/TSDoc, Prettier       |
| Delivery | GitHub Actions shared workflows, Vercel        |

## Features

- Cloud services groups six comparisons and Common combinations in a second navigation row, with no
  category landing page or breadcrumbs.
- Six comparisons, each covering ten products and who handles what.
- Ten suggested service combinations show how hosting, data, accounts, files, background
  tasks and monitoring fit together, with official source links and setup caveats.
  Common combinations is the first topic; its compact table has combinations
  as rows and service types as columns, with extra details collapsed by default.
  “What to know” includes a product example and its source, marked as a partial
  match rather than proof of the entire suggested combination.
- Monochrome design, colored logos and a locally hosted Inter font.
- Blue ≠ marks identify less-common responsibility labels, not better products.
- Labels stay visible while scrolling; jump to a provider or use a compact view.
- Plain-English explanations available by hover, keyboard or tap.
- Official documentation links and notes about plan-specific limits.

## Boundaries and integration

Comparison content is written in advance, not fetched live from providers.
Stacknotes has no server code, user accounts or tracking.
One React app serves all pages. Navigation is defined in `src/data/categories.ts`;
comparison content lives in JSON files, separate from display code.
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
