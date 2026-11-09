# JavaScript / TypeScript content boundaries

The catalog registry in `src/data/javascript.ts` owns topic registration and the
canonical tool lookup. `src/data/frameworks.ts` owns the merged framework content;
the remaining topic content lives in the registry. The stack data reuses
those names and links. Topic-specific dimensions compare capabilities, not managed
service responsibilities. No performance or quality scores are used; equal
alternatives within a cell are not ranked.

All JavaScript comparisons except Application stacks and Styling follow the Cloud/Self-hosted
table structure: an always-visible Overview with Primary purpose, Strengths,
Limitations and License & operating costs, followed by a collapsed Features
section. Component libraries replaces Primary purpose with Default look & feel
using the topic's optional `overviewPurpose` label/explanation; other topics keep
their existing first row. License cells show core terms; the explanation and shared note make clear
that infrastructure, operation, add-on and external-service costs depend on setup
and are not priced here. Topic-specific facts use short comparable category labels
or explicit Included/— verdicts, with descriptive notes underneath—not cloud-provider
Auto/Manual responsibility claims. Labels summarize the named dimension, not the
tool's overall capability or quality; matching labels do not imply identical APIs.
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
accessible table descriptions and notes; detailed descriptions and row explanations stay intact.

### Feature differences

Every Features cell has either a categorical label plus detail, or a typed boolean
capability plus detail. Non-framework catalog entries keep each label and its note
together as a tuple, expanded into named fields by the catalog helper. Framework
capabilities retain explicit boolean verdicts; their other dimensions use labels.
Overview remains ordinary prose and is never compared for highlighting.

The shared `differences` helper compares only displayed feature labels, not notes.
Blue cells and a ≠ mark identify labels occurring less often than the most-common
label across the entire row, including across ecosystem column groups. Uniform
rows, all-unique rows and labels tied for the maximum frequency remain neutral;
a rarer third label can still be marked when two leading labels tie. This is a
within-table distinction, not an adoption statistic or a recommendation. The mark
has a screen-reader explanation; its meaning is in accessible help and collapsed
notes, with no new banner or legend. Application stacks stays unmarked because its
candidate lists compare different roles rather than one shared feature axis.

Categories are editorial summaries of the detailed notes, not automatically
inferred from wording. Component accessibility labels describe supplied behavior,
not a compliance score; all suites still require application checks. Data-fetching labels retain the
distinction between keyed results, normalized entities and urql's document cache
with optional Graphcache. Database tools retain ORM versus query-builder scope.

## Sources and scope

Official documentation was consulted in November 2026. Linked repository license
files were read through the projects' raw GitHub endpoints when the GitHub HTML
frontend returned gateway errors. Documentation paths for PrimeVue and Zustand
were updated after checking their current official sites. GSAP's own Standard License is not labeled
as an MIT license. Core licenses do not establish the terms of every add-on.

Comparison entries are intentionally scoped: Apollo covers its React integration, and Angular forms
the documented reactive-forms APIs. Framework-agnostic means the core approach can
be used without a UI-framework binding, not that every adapter exists. The
ecosystem labels describe compatibility; they do not filter the visible tools or
promise an integration with every framework.

## Styling

Styling combines styling, animation and icon discovery in one ungrouped table,
in this order: Tailwind CSS, Motion, GSAP, Anime.js, AutoAnimate, Lucide, Heroicons,
Tabler Icons and Phosphor. Bootstrap, CSS Modules, Sass and Emotion are not catalog
entries or stack choices; mentions of Sass or other implementation details inside
component-library explanations are not independent recommendations.

Its four always-visible Overview rows are Primary purpose, Strengths, Limitations,
and License & operating costs. No framework-compatibility row, Features toggle, feature
rows, difference highlighting/help or horizontal-scroll instruction is rendered.
Keep the existing compact table, sticky headers/labels, row explanation dialogs
and collapsed Notes & sources. Each column has a documented local project mark
and a category subtitle (Utility-first CSS, Animation or Icons), not a section group.

Shared notes explain build integration, package selection, lifecycle cleanup
and generic SVG support without implying that every framework has a native
package or that every pairing is integration-tested. Retain reduced-motion,
accessible icon names, individual imports, license and paid-product boundaries.
Other tool comparisons retain their existing feature sections and explanations.

The navigation has eleven comparisons plus Application stacks. The former
`/javascript/animation/` and `/javascript/icons/` URLs redirect with replacement to
`/javascript/styling/`, preserving deep links without retaining duplicate topics.
Each stack offers Tailwind CSS as its styling candidate; animation/icon tools
remain optional discoveries in Styling rather than added stack dependencies.

## Component libraries

The comparison groups columns under React-based, Vue-based and Angular, with three
suites per group, plus one Svelte candidate, using the same sticky two-level header as Frameworks & libraries.
The comparison and stack candidates use the same suites per
ecosystem, in editorial order rather than a measured popularity ranking:

- React: MUI Material UI, Ant Design, Mantine.
- Vue: PrimeVue, Vuetify, Element Plus.
- Angular: Angular Material, PrimeNG, NG-ZORRO.
- Svelte: Skeleton (Svelte-specific package, Tailwind design system and Zag.js interactions).

Overview starts with **Default look & feel**, replacing—not adding to—Primary
purpose for this comparison only. It describes the visual character of the
components, including proportions, surfaces and interaction states, not full-page
templates. Descriptions such as restrained or polished are editorial impressions,
not objective design scores. Like all Overview cells, they have no blue ≠ marks.
Strengths still describe practical benefits, including Mantine's reusable hooks.

The collapsed Features section has nine dimensions, in this order:

1. Component coverage
2. Design tokens & theming
3. Styling & customization APIs
4. Component composition
5. Interaction utilities
6. Forms & validation integration
7. Responsive & density options
8. Accessibility support
9. TypeScript & developer experience

Tokens define the shared design language; styling APIs apply presentation changes;
composition APIs extend structure or behavior. Examples name documented hooks,
slots, templates, directives and services, distinguishing a standalone collection
such as `@mantine/hooks` from targeted component helpers. Form packages such as
`@mantine/form` and `@primevue/forms`, MUI X controls and Angular CDK primitives
retain their package boundaries. NG-ZORRO's Less theming is not presented as the
same API as React Ant Design's tokens. Responsive sizing does not guarantee touch
accessibility; typed APIs do not perform runtime validation. Client form validation
does not replace server validation or authorization.

Features keep the shared comparable-label/highlighting behavior across the full
row, with concrete descriptions and first-party references in Notes & sources.
Maintenance and compatibility caveats remain in Overview limitations/shared notes,
not as feature rows. Accessibility entries describe keyboard/focus support while
retaining application testing responsibilities, not identical generic warnings.

These are installed component suites, not a headless/copied-source comparison.
Core license links do not establish the terms of commercial add-ons or editions.
PrimeNG's upstream license distinguishes MIT community releases from commercial
LTS terms, while its current installation guide documents a license key; verify
the selected version and edition rather than assuming every release is MIT.
All ten component suites use verified locally hosted marks, shared with the
stack table. Asset sources and rights are recorded in `THIRD_PARTY_NOTICES.txt`.

## Frameworks & libraries

`/javascript/ui/` is the canonical merged comparison; the former
`/javascript/app-frameworks/` route redirects there. Columns are ordered and
grouped as React-based (React, Next.js, TanStack Start's React integration), Vue-based
(Vue, Nuxt), Angular, Svelte-based (SvelteKit), and Other foundations (Astro, Remix v3).
Grouping describes relationships, not feature tiers or a promise of equivalent
capabilities. Astro is labeled React- and Vue-capable through official integrations;
install the selected integration and explicitly hydrate interactive islands. Other
UI integrations also exist. Remix v3 has its own component model and is not React.
TanStack Start adds server features around TanStack Router, rather than representing
the routing library alone. Stacknotes itself still uses React Router for navigation.

The Overview retains purpose, strengths, limitations and core license terms.
The collapsed Features section compares UI authoring, routing, SSR, API endpoints,
default build setup, other build options, deployment and SEO & discoverability.
All twelve row labels have activation-only ⓘ
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
prerendered output cannot execute them. UI authoring, build and deployment use
category labels with descriptive notes rather than forced binary verdicts.

SEO & discoverability is the eighth feature row, with factual integration labels
rather than Included/— or quality scores. It covers rendered HTML, titles and meta
descriptions, canonical URLs, social previews, sitemap/robots files and structured
data (JSON-LD). The explanation distinguishes HTTP redirects/status codes from
client navigation, and explicitly gives no indexing or ranking guarantee. Content,
internal links, performance and the chosen rendering/deployment mode still matter.
React 19+ head-element support is distinct from an assembled SSR app; Vue requires
head/server integration. Next.js supplies metadata and sitemap/robots conventions;
TanStack Start supplies route head APIs and configured prerender sitemap generation.
Nuxt's useHead/useSeoMeta does not bundle every SEO module. Angular Title/Meta and
optional SSR are distinct responsibilities. SvelteKit uses svelte:head with manual
sitemap endpoints/files. Astro uses document head markup and a separate official
sitemap integration for generated static routes, not automatic dynamic SSR discovery.
Remix v3 renders an explicit JSX document head; do not assume Remix v2 meta/links
exports. Every product still needs correctly authored metadata and structured data.

The source list links official feature, mode, rendering and build references.
Next.js build claims target 16+ and Nuxt claims target 4.x. TanStack Start's current
React documentation describes Vite and Rsbuild builds; hosting integration depends
on the build tool and target. SvelteKit uses Vite and deployment adapters, with
SSR, prerendering and client rendering controlled by route options. Their core
license references link upstream MIT files. All nine framework headers use local
project marks. TanStack Start uses its site's TanStack parent-project favicon,
SvelteKit uses the Svelte site's favicon, and Remix uses the current Remix v3
site's favicon rather than an older collection mark. Provenance is recorded in
`THIRD_PARTY_NOTICES.txt`.

## Application stacks

There is one row per UI ecosystem, in editorial order: React, Angular, Vue, Svelte.
Application-framework choices are Next.js, TanStack Start or Astro for React, Angular for Angular,
Nuxt or Astro for Vue, and SvelteKit for Svelte. The merged Frameworks & libraries comparison's build rows explain
setup-dependent tooling:
standalone React/Vue clients commonly use Vite, Vue's official starter defaults to
Vite, Next.js 16+ defaults to Turbopack with webpack opt-in, and Angular keeps its
CLI-managed build. Nuxt and Astro manage their own toolchains. This order
does not claim measured adoption. Integrated server features can replace a
separate API; UI choice does not require a particular backend.

Stacks are illustrative associations, not live integration tests or installation
instructions. Integrated Next.js, TanStack Start, Nuxt, Astro and SvelteKit server features require
an appropriate deployment mode/adapter; static output has no request-time server.
Unlisted pairings can also work. Applications with separate APIs need explicit API contracts,
authentication/session decisions, authorization, CORS or a same-origin proxy,
failure handling and coordinated deployment. Input validation and authorization
must run on the server. Angular client-form checks are not server enforcement;
Angular CLI is application tooling, and Angular/Material versions must be compatible.
The stack table has six role columns, in order: application framework,
component-library candidates, styling, state management,
data fetching and forms. Backend, validation, database-tool and testing
choices remain in their dedicated topic comparisons; animation and icons are in Styling instead of
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
Shared notes below the table explain architecture boundaries; there are no row-info controls.
Astro requires the matching React/Vue integration and explicit island hydration.
TanStack Start hosting depends on build tool and target; SvelteKit requires a suitable adapter.
The Svelte row uses Skeleton, Tailwind CSS, Nano Stores, TanStack Query and TanStack Form.
Skeleton v5 combines styled utilities with framework components, some headless;
its form utility classes require `@tailwindcss/forms`, while form state and validation stay separate.
Use `@skeletonlabs/skeleton-svelte`, `@tanstack/svelte-query` (currently Svelte 5.25+)
and `@tanstack/svelte-form`. Nano Stores implements the Svelte store contract;
its runes integration is separate. SSR stores and caches must be scoped per request.
SvelteKit load functions/actions can avoid extra client libraries.

Python is not part of these comparisons. Existing cloud service comparisons own
hosting and database-provider choices. Stack choices use verified local marks where available,
and remain linked text when no verified mark is present;
catalog headers reuse available marks, including those for tools whose stack columns
were removed. Framework-feature/tooling cells use the
parent project's mark, not an invented sub-product logo. Catalog entries without a verified mark remain text-linked. Asset origins and licenses live
in `THIRD_PARTY_NOTICES.txt`; images are decorative beside visible linked names.
