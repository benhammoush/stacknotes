/**
 * Defines JavaScript-only application associations with explicit integration boundaries.
 * @packageDocumentation
 */
import type { Combination, CombinationService } from "./combinations";
import {
  javascriptTools,
  javascriptStacksTopic,
  javascriptTopics,
} from "./javascript";

/**
 * Link a stack choice to the canonical tool entry without duplicating its name or documentation.
 * @param id - Catalog identifier for a tool used in this role.
 * @param alternatives - Equally presented alternatives, not additional dependencies.
 * @returns One compact linked choice with documented alternatives.
 */
function choice(id: string, alternatives: string[] = []): CombinationService {
  const tool = javascriptTools[id];
  return [
    tool.name,
    tool.logo ?? null,
    tool.url,
    alternatives.map((alternative) => {
      const other = javascriptTools[alternative];
      return [other.name, other.logo ?? "", other.url];
    }),
  ];
}

export const javascriptStackRoles = [
  {
    label: "Application framework",
    path: "/javascript/ui/",
  },
  { label: "Component-library candidates", path: "/javascript/components/" },
  ...javascriptTopics
    .filter(({ path }) =>
      ["styling", "state", "data-fetching", "forms"].some(
        (slug) => path === `/javascript/${slug}/`,
      ),
    )
    .map(({ label, path }) => ({ label, path })),
];

export const javascriptStacks: Combination[] = [
  {
    id: "js-react-api",
    name: "React",
    sourceUrl: javascriptTools.react.url,
    whenToChoose:
      "Choose Next.js or TanStack Start for a React application with server features, or Astro for a content-led site with React islands. Choose the component, styling and client-state tools that suit your interface.",
    note: "These are alternative architectures, not a dependency checklist. Next.js Route Handlers or Astro endpoints can replace a separate API; they require a supported server runtime or adapter, and static output cannot run them. Astro needs its React integration and explicit island hydration. Vite is build tooling, not a backend. Keep secrets and database access server-only; enforce validation and authorization on the server. A separate API needs explicit contracts, errors, authentication, CORS/session boundaries and separate deployments. Async Server Components need suitable integration or browser-test coverage.",
    services: [
      choice("next", ["tanstack-start", "astro"]),
      choice("mui", ["ant-design", "mantine"]),
      choice("tailwind", ["css-modules", "emotion"]),
      choice("zustand", ["redux", "nanostores"]),
      choice("tanstack-query", ["swr", "apollo", "urql"]),
      choice("react-hook-form", ["tanstack-form"]),
    ],
  },
  {
    id: "js-angular-api",
    name: "Angular",
    sourceUrl: javascriptTools.angular.url,
    whenToChoose:
      "Fits an Angular client with first-party routing, forms and application conventions. Choose compatible component, styling and state-management tools while keeping the build managed by Angular CLI.",
    note: "Angular does not require NestJS. Angular CLI is tooling for the Angular application, not a second framework or backend. Coordinate Angular Material and Angular versions. Angular client-form checks do not enforce server validation or authorization: validate inputs and access on the server. Define API/error contracts, authentication, CORS/session boundaries and separate deployments.",
    services: [
      choice("angular"),
      choice("angular-material", ["primeng", "ng-zorro"]),
      choice("tailwind", ["sass"]),
      choice("ngrx"),
      choice("tanstack-query"),
      choice("angular-forms", ["tanstack-form"]),
    ],
  },
  {
    id: "js-vue-api",
    name: "Vue",
    sourceUrl: javascriptTools.vue.url,
    whenToChoose:
      "Choose Nuxt for integrated pages and server routes, or Astro for a content-led site with Vue islands. Choose Vue-compatible component, styling, state-management and form tools to suit your interface.",
    note: "Nuxt and Vite are alternative approaches; Vite is build tooling, not a backend. Nuxt's Nitro server routes can replace a separate API and need a deployment preset that runs server code; prerendered files do not supply a live API. Configure component integration and database drivers for that target. Vue does not require one of the separate backend candidates. Define API contracts and errors, authentication and CORS/session boundaries; enforce validation and authorization on the server. A separate API has its own deployment lifecycle.",
    services: [
      choice("nuxt", ["astro"]),
      choice("primevue", ["vuetify", "element-plus"]),
      choice("tailwind", ["css-modules", "sass"]),
      choice("pinia", ["nanostores"]),
      choice("tanstack-query", ["urql"]),
      choice("vee-validate", ["tanstack-form"]),
    ],
  },
  {
    id: "js-svelte-api",
    name: "Svelte",
    sourceUrl: javascriptTools.sveltekit.url,
    whenToChoose:
      "Choose SvelteKit for a Svelte application with route-level rendering and server features. Skeleton supplies Svelte controls and a Tailwind design system; add state, fetching and forms only as needed.",
    note: "SvelteKit server routes and actions require a deployment adapter that runs server code; static output cannot execute them. Use Skeleton's Svelte package with compatible Svelte and Tailwind versions. Nano Stores supports the Svelte store contract; use the Svelte-specific TanStack Query and Form packages. Scope stores and query caches per request during SSR. Keep secrets and database access server-only, and validate and authorize every server operation.",
    services: [
      choice("sveltekit"),
      choice("skeleton"),
      choice("tailwind"),
      choice("nanostores"),
      choice("tanstack-query"),
      choice("tanstack-form"),
    ],
  },
];

export const javascriptStackContent = {
  title: javascriptStacksTopic.title,
  roles: javascriptStackRoles,
  combinations: javascriptStacks,
  introduction:
    "Curated candidates that fit together, not fixed pairings or an exhaustive compatibility matrix. One row per UI ecosystem: React, Angular, Vue and Svelte, in editorial order. Choices within a cell remain equal alternatives, not a ranking. Architecture and integration boundaries are explained below the table.",
  notes: [
    "React framework alternatives are Next.js, TanStack Start and Astro; Vue alternatives are Nuxt and Astro. Astro needs the matching React/Vue integration and explicit hydration for interactive islands. TanStack Start hosting depends on its build tool and target. Next.js handlers, Nuxt/Nitro routes, Astro endpoints and SvelteKit routes/actions need a supported server runtime or deployment adapter; static output cannot execute them. Vite is build tooling, not a backend.",
    "For Svelte, use @skeletonlabs/skeleton-svelte with compatible Svelte/Tailwind versions; some controls are headless and need styling. Skeleton form utility classes require @tailwindcss/forms, not a form-state engine. Nano Stores implements the Svelte store contract; runes integration is separate. Choose @tanstack/svelte-query (currently Svelte 5.25+) and @tanstack/svelte-form, and follow their SSR guidance with per-request stores and caches. SvelteKit load functions and form actions can make extra client libraries unnecessary.",
    "These are good starting candidates; unlisted pairings can also work. These guides are not installation recipes or claims that every pairing has been integration-tested. Integrated server features need a suitable runtime; separate backends need explicit API, authentication and deployment boundaries.",
    "This is a candidate map, not a dependency checklist. Each category links to its detailed comparison. Choose ecosystem-specific adapters and check supported versions; framework-agnostic tools still require integration and lifecycle cleanup. State and fetching libraries are optional; use framework features when sufficient. Database tools belong in trusted server code, not browser bundles. Client validation never replaces server validation or authorization.",
    "Backend, validation, database-tool, testing, animation and icon choices remain in their dedicated comparisons in the topic navigation rather than in this table. Hosting and database-provider comparisons remain in Cloud services; Python is outside this section.",
  ],
  sourceLabel: "UI documentation",
};
