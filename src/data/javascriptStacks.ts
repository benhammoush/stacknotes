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
      "Choose Next.js for an integrated React application, Vite for a client build, or Astro for a content-led site with React islands. Choose the component, styling and client-state tools that suit your interface.",
    note: "These are alternative architectures, not a dependency checklist. Next.js Route Handlers or Astro endpoints can replace a separate API; they require a supported server runtime or adapter, and static output cannot run them. Astro needs its React integration and explicit island hydration. Vite is build tooling, not a backend. Keep secrets and database access server-only; enforce validation and authorization on the server. A separate API needs explicit contracts, errors, authentication, CORS/session boundaries and separate deployments. Async Server Components need suitable integration or browser-test coverage.",
    services: [
      choice("next", ["astro"]),
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
      "Choose Nuxt for integrated pages and server routes, or Vite for a Vue client build. Choose Vue-compatible component, styling, state-management and form tools to suit your interface.",
    note: "Nuxt and Vite are alternative approaches; Vite is build tooling, not a backend. Nuxt's Nitro server routes can replace a separate API and need a deployment preset that runs server code; prerendered files do not supply a live API. Configure component integration and database drivers for that target. Vue does not require one of the separate backend candidates. Define API contracts and errors, authentication and CORS/session boundaries; enforce validation and authorization on the server. A separate API has its own deployment lifecycle.",
    services: [
      choice("nuxt"),
      choice("primevue", ["vuetify", "element-plus"]),
      choice("tailwind", ["css-modules", "sass"]),
      choice("pinia", ["nanostores"]),
      choice("tanstack-query", ["urql"]),
      choice("vee-validate", ["tanstack-form"]),
    ],
  },
];

export const javascriptStackContent = {
  title: javascriptStacksTopic.title,
  roles: javascriptStackRoles,
  combinations: javascriptStacks,
  introduction:
    "Curated candidates that fit together, not fixed pairings or an exhaustive compatibility matrix. One row per UI ecosystem: React, Angular and Vue, in editorial order. Click ⓘ for architecture choices and what you connect yourself. Choices within a cell remain equal alternatives, not a ranking.",
  notes: [
    "These are good starting candidates; unlisted pairings can also work. These guides are not installation recipes or claims that every pairing has been integration-tested. Integrated server features need a suitable runtime; separate backends need explicit API, authentication and deployment boundaries.",
    "This is a candidate map, not a dependency checklist. Each category links to its detailed comparison. Choose ecosystem-specific adapters and check supported versions; framework-agnostic tools still require integration and lifecycle cleanup. State and fetching libraries are optional; use framework features when sufficient. Database tools belong in trusted server code, not browser bundles. Client validation never replaces server validation or authorization.",
    "Backend, validation, database-tool, testing, animation and icon choices remain in their dedicated comparisons in the topic navigation rather than in this table. Hosting and database-provider comparisons remain in Cloud services; Python is outside this section.",
  ],
  sourceLabel: "UI documentation",
};
