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

- Cloud services groups eight comparisons and Services offered in a second navigation row, with no
  category landing page or breadcrumbs.
- Eight cloud comparisons covering focused product choices and who handles what.
- Self-hosted services offers eight software comparisons, opening at Databases.
  The provider inventory belongs only to Cloud services. License and operating costs replace
  provider billing; operator responsibilities stay explicit. Every product has a
  locally hosted logo or official favicon, with sources in the third-party notices.
- Caching compares shared application data caches, including Redis and Valkey,
  separately from databases. Sessions and rate limiting are use cases, not automatic
  sign-in features. Search explains indexing, data synchronization and private results;
  small apps may only need their database's built-in search.
- Services offered is the Cloud entry topic: nineteen provider/platform rows with
  local icons and individually linked first-party offerings across eight service
  categories. Vercel and Supabase have separate rows; external integrations are not
  attributed to their hosting platform. Rows sort by listed category coverage,
  most to fewest, with alphabetical ties—not overall provider quality.
  A dash means no offering listed in this scoped inventory, not verified absence.
  Services may require separate payment and configuration; a common column does
  not imply equal capabilities. [Inventory scope](docs/cloud-services.md).
- Monochrome design, colored logos and a locally hosted Inter font.
- JavaScript / TypeScript has thirteen focused comparisons: frameworks and
  libraries, components, styling, animation, icons, state, data fetching, forms,
  validation, backend frameworks, database tools, testing and build tools.
  Comparisons always show all tools in compact tables, without page banners,
  ecosystem selectors or jump controls. Comparisons follow the Cloud/Self-hosted layout: Overview shows Primary
  purpose, Strengths, Limitations and License & operating costs, followed by a
  collapsed Features section with topic-specific content. Costs depend on setup
  and are not priced in license cells. ⓘ explains every row; cloud-provider
  responsibility scores are not applied to libraries. Supporting caveats and
  references stay in a collapsed Notes & sources disclosure.
- Component libraries compares three suites each for React, Vue and Angular,
  with the same candidates in Application stacks; core and commercial license
  boundaries remain explicit.
- Frameworks & libraries groups eight columns by ecosystem: React/Next.js/React
  Router v7 Framework Mode, Vue/Nuxt, Angular, and Astro/Remix v3. Included and —
  distinguish first-party capabilities from missing features, with package and
  runtime requirements kept visible. UI authoring, build defaults, alternative
  tooling and deployment sit beside routing, SSR and API endpoints. Every row has
  an ⓘ explanation. The former application-framework URL redirects to this page.
- Application stacks is the JavaScript / TypeScript entry topic. Three rows—React,
  Angular and Vue—group framework and library alternatives and distinguish integrated server capabilities from separately deployed
  JavaScript backends. Choices are curated candidates, not exclusive pairings
  or an exhaustive compatibility matrix. Every named tool links to documentation;
  stack rows have no explanation buttons. Alternatives are not a ranking,
  and the table covers application frameworks, components, styling, state, data
  fetching and forms, in that order. The Frameworks & libraries comparison
  explains build tooling by project setup rather than presenting it as an independent stack choice.
  Backend, validation, database-tool,
  testing, animation and icon choices stay in their dedicated comparisons.
  Columns link to detailed comparisons; choices are optional candidates,
  not required dependencies. These are guides,
  not tested deployment recipes. Python is outside this section.
  Stack rows use editorial order, not measured usage of exact stacks.
  Stack choices and their matching tool headers use locally hosted project icons where available;
  equal alternatives stay equally styled and independently linked.
- Blue ≠ marks identify less-common responsibility labels, not better products.
- All tables stay compact, with sticky labels and horizontal scrolling. Visible
  page banners, view/jump selectors and instructional paragraphs are omitted;
  caveats, status definitions and sources remain in collapsed Notes & sources.
- Plain-English explanations available by hover, keyboard or tap.
- Official documentation links and notes about plan-specific limits.

## Boundaries and integration

Comparison content is written in advance, not fetched live from providers.
Stacknotes has no server code, user accounts or tracking.
One React app serves all pages. Navigation is defined in `src/data/categories.ts`;
cloud comparison content lives in JSON files, while self-hosted comparisons and
the cloud inventory (`src/data/cloudServices.ts`) live in typed data modules, separate from display code.
JavaScript tool comparisons and application stacks live in `src/data/javascript.ts`
and `src/data/javascriptStacks.ts`. Core license links do not cover every paid
add-on, hosted service or third-party asset; check the selected release's terms.
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
