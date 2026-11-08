# JavaScript / TypeScript content boundaries

The catalog registry in `src/data/javascript.ts` owns topic registration and the
canonical tool lookup. `src/data/frameworks.ts` owns the merged framework content;
the remaining topic content lives in the registry. The stack data reuses
those names and links. Topic-specific dimensions compare capabilities, not managed
service responsibilities. No performance or quality scores are used; equal
alternatives within a cell are not ranked.

All JavaScript comparisons except Application stacks follow the Cloud/Self-hosted
table structure: an always-visible Overview with Primary purpose, Strengths,
Limitations and License & operating costs, followed by a collapsed Features
section. License cells show core terms; the explanation and shared note make clear
that infrastructure, operation, add-on and external-service costs depend on setup
and are not priced here. Topic-specific facts remain descriptive or use explicit
Included/— verdicts, not cloud-provider Auto/Manual responsibility claims.
Every comparison row retains an activation-only ⓘ explanation. All tools are
always shown in compact tables, with no ecosystem selector, jump menu, view
toggle, visible page heading/count or instructional banner. The semantic heading
and table introduction remain screen-reader accessible. Both section colspans
cover the complete table, and navigating to another topic resets Features.
Supporting caveats, cost boundaries, provenance and references remain available
inside the collapsed Notes & sources disclosure rather than visible paragraphs.
The same cleanup applies to Application stacks and Cloud/Self-hosted tables:
permanent compact mode, no visible page banner or jump/view selectors, and
collapsed notes. Responsibility status and difference-mark meanings remain in
accessible table descriptions and notes; existing data and row explanations stay intact.

## Sources and scope

Official documentation was consulted in November 2026. Linked repository license
files were read through the projects' raw GitHub endpoints when the GitHub HTML
frontend returned gateway errors. Documentation paths for PrimeVue and Zustand
were updated after checking their current official sites. CSS Modules is a
convention, not one licensed runtime; its implementation-dependent license cell
links to the css-loader implementation. GSAP's own Standard License is not labeled
as an MIT license. Core licenses do not establish the terms of every add-on.

Comparison entries are intentionally scoped: Apollo covers its React integration,
Emotion its React styling APIs, and Angular forms
the documented reactive-forms APIs. Framework-agnostic means the core approach can
be used without a UI-framework binding, not that every adapter exists. The
ecosystem labels describe compatibility; they do not filter the visible tools or
promise an integration with every framework.

## Component libraries

The comparison groups columns under React-based, Vue-based and Angular, with three
suites per group, using the same sticky two-level header as Frameworks & libraries.
The comparison and stack candidates use the same three general-purpose suites per
ecosystem, in editorial order rather than a measured popularity ranking:

- React: MUI Material UI, Ant Design, Mantine.
- Vue: PrimeVue, Vuetify, Element Plus.
- Angular: Angular Material, PrimeNG, NG-ZORRO.

These are installed component suites, not a headless/copied-source comparison.
Core license links do not establish the terms of commercial add-ons or editions.
PrimeNG's upstream license distinguishes MIT community releases from commercial
LTS terms, while its current installation guide documents a license key; verify
the selected version and edition rather than assuming every release is MIT.
All nine component suites use verified locally hosted marks, shared with the
stack table. Asset sources and rights are recorded in `THIRD_PARTY_NOTICES.txt`.

## Frameworks & libraries

`/javascript/ui/` is the canonical merged comparison; the former
`/javascript/app-frameworks/` route redirects there. Columns are ordered and
grouped as React-based (React, Next.js, React Router v7 Framework Mode), Vue-based
(Vue, Nuxt), Angular, and Other foundations (Astro, Remix v3). Grouping describes
relationships, not feature tiers or a promise of equivalent capabilities. Astro
can integrate multiple UI libraries. Remix v3 has its own component model; the
React-based Remix v2 lineage continues in React Router v7 Framework Mode.

The Overview retains purpose, strengths, limitations and core license terms.
The collapsed Features section compares UI authoring, routing, SSR, API endpoints,
default build setup, other build options and deployment. All eleven row labels have activation-only ⓘ
dialogs explaining purpose and boundaries. Group headings and all tool columns
remain visible together; source links and additional official references are
available in the collapsed Notes & sources disclosure.

Visible framework cells use short scan-friendly phrases (at most 110 characters
per description), retaining per-tool requirements such as separate packages,
SSR API assembly and runtime adapters. Longer explanations and shared security,
version and deployment caveats live in the row dialogs and collapsed notes.

Capability facts carry a typed boolean verdict and separate detail, not parsed
prose. Included means a core or official first-party capability, even when a
separate package, adapter or configuration is required. — means not supplied in
that product's scope, not impossible with external tools. In particular, Angular
Router is included by the current CLI and Vue Router is an official separate
package. React and Vue supply SSR APIs, not a fully assembled server app. Angular
SSR is not a general-purpose API layer. Request-time operations require a server;
prerendered output cannot execute them. Build/default and deployment cells are
descriptive rather than forced into binary statuses.

The source list links official feature, mode, rendering and build references.
Next.js build claims target 16+, Nuxt claims target 4.x, and React Router claims
target v7 Framework Mode. React Router and Remix core license links were checked
against their upstream MIT files; text headers are used without new logo assets.

## Application stacks

There is one row per UI ecosystem, in editorial order: React, Angular, Vue.
Application-framework choices are Next.js or Astro for React, Angular for Angular,
and Nuxt for Vue. The merged Frameworks & libraries comparison's build rows explain
setup-dependent tooling:
standalone React/Vue clients commonly use Vite, Vue's official starter defaults to
Vite, Next.js 16+ defaults to Turbopack with webpack opt-in, and Angular keeps its
CLI-managed build. Nuxt and Astro manage their own toolchains. This order
does not claim measured adoption. Integrated server features can replace a
separate API; UI choice does not require a particular backend.

Stacks are illustrative associations, not live integration tests or installation
instructions. Integrated Next.js, Nuxt and Astro server features require
an appropriate deployment mode/adapter; static output has no request-time server.
Unlisted pairings can also work. Applications with separate APIs need explicit API contracts,
authentication/session decisions, authorization, CORS or a same-origin proxy,
failure handling and coordinated deployment. Input validation and authorization
must run on the server. Angular client-form checks are not server enforcement;
Angular CLI is application tooling, and Angular/Material versions must be compatible.
The stack table has six role columns, in order: application framework,
component-library candidates, styling, state management,
data fetching and forms. Backend, validation, database-tool, testing, animation
and icon choices remain in their dedicated topic comparisons instead of
being repeated in each UI row. Each displayed role links to its dedicated comparison. Entries are optional
candidates, not a dependency checklist. Database tools run in trusted server code;
client validation does not replace server enforcement. Use compatible ecosystem
adapters and versions, and clean up framework-agnostic integrations with the UI lifecycle.
Vite/webpack choices apply to separately configured client toolchains, not every
integrated-framework setup. Angular keeps its CLI-managed build. The Testing
comparison distinguishes runners, UI helpers and browser automation tools.
Guides retain consequential integration caveats:
asynchronous React Server Components need suitable integration or end-to-end
coverage rather than assuming every component can be unit-tested.

Python is not part of these comparisons. Existing cloud service comparisons own
hosting and database-provider choices. Stack choices use verified local marks where available,
and remain linked text when no verified mark is present;
catalog headers reuse available marks, including those for tools whose stack columns
were removed. Framework-feature/tooling cells use the
parent project's mark, not an invented sub-product logo. CSS Modules uses its own
project mark from its documented logo repository, not css-loader's or GitHub's
brand. Catalog entries without a verified mark remain text-linked. Asset origins and licenses live
in `THIRD_PARTY_NOTICES.txt`; images are decorative beside visible linked names.
