/**
 * Compares framework capabilities using explicit inclusion and ecosystem relationships.
 * @packageDocumentation
 */
import type { JavaScriptTopic } from "./javascript";

/** Unified UI and application-framework comparison; groups describe lineage, not feature tiers. */
export const frameworksTopic: JavaScriptTopic = {
  label: "Frameworks & libraries",
  title: "Frameworks & libraries",
  path: "/javascript/ui/",
  introduction:
    "Compare by ecosystem. Included = core or an official first-party feature; — = an external solution is needed. Click ⓘ for explanations and requirements.",
  note: "Included does not mean enabled by default or supplied in the same package. React and Vue provide SSR APIs, not an assembled server application. Angular Router is included by the current CLI; Vue Router is a separate official package. Request-time rendering and endpoints need a server runtime; static output cannot run them. React Router v7 Framework Mode continues the React-based Remix v2 line. Remix v3 has its own component model and belongs outside the React group. You still own application authorization, input validation, persistence and deployment. Choices are not rankings or tested integration recipes.",
  columnGroups: [
    { label: "React-based", toolIds: ["react", "next", "react-router"] },
    { label: "Vue-based", toolIds: ["vue", "nuxt"] },
    { label: "Angular", toolIds: ["angular"] },
    { label: "Other foundations", toolIds: ["astro", "remix"] },
  ],
  dimensions: [
    {
      label: "UI authoring",
      explanation:
        "How you write components and interactive UI: JSX, templates or framework-specific components. A similar syntax does not imply the same component model; Remix v3 JSX is not React. Learn the underlying UI model as well as any application framework built around it.",
    },
    {
      label: "Routing",
      explanation:
        "Maps a URL to a page or view and organizes navigation, nested pages and route parameters. Included covers core and official first-party routing packages, even when installed separately. React alone does not supply a router. Configure your routes and access rules yourself; client navigation guards do not enforce server authorization.",
    },
    {
      label: "Server-side rendering",
      explanation:
        "Generates page HTML on the server instead of relying entirely on browser JavaScript. It can improve initial content delivery, but needs a server deployment and server-compatible code. Included may mean rendering APIs you assemble yourself, an official optional package, or an integrated framework. Those differences are stated in each cell; static generation is not request-time SSR.",
    },
    {
      label: "API endpoints",
      explanation:
        "Server-side URL handlers that receive requests and return data or other responses, for example an authenticated form submission or JSON API. Included means the product supplies an endpoint/handler convention; — means bring your own server or application framework. SSR support alone does not provide an API framework. Enforce validation and authorization on every server operation; static exports cannot run live endpoints.",
    },
    {
      label: "Default build setup",
      explanation:
        "The tooling that compiles source and prepares deployable assets in the normal project setup. A UI library does not necessarily choose a bundler. A starter may configure Vite, while a framework owns its build pipeline. Remix v3 compiles assets on demand rather than requiring an application build step. Defaults are version-specific, not an instruction to replace a working project setup.",
    },
    {
      label: "Other build options",
      explanation:
        "Alternatives to the normal build setup and the boundary of that choice. Next.js offers webpack opt-in; Nuxt supports additional builders. A custom standalone React/Vue toolchain is different from replacing an integrated framework's bundler. Alternatives need suitable plugins, configuration and deployment support; they are not all drop-in switches.",
    },
    {
      label: "Deployment",
      explanation:
        "What has to run after you publish the application. Static files can be hosted without an application server, while request-time HTML rendering and API handlers need a supported server runtime or adapter. Choose the output mode for the features you use; a development server is not a production deployment and a static export cannot keep server-only features alive.",
    },
  ],
  tools: [
    {
      id: "react",
      name: "React",
      url: "https://react.dev/learn",
      license: "https://github.com/facebook/react/blob/main/LICENSE",
      licenseName: "MIT",
      logo: "js-react.svg",
      ecosystems: ["React"],
      purpose: "UI library, not an application framework.",
      strength: "Flexible architecture; broad ecosystem.",
      limitation: "Assemble routing, builds and server integration.",
      facts: [
        "JSX/TSX · components, state and hooks.",
        {
          included: false,
          detail: "External router, e.g. React Router.",
        },
        {
          included: true,
          detail: "Rendering APIs only; assemble server and hydration.",
        },
        {
          included: false,
          detail: "External server or application framework.",
        },
        "No default · Vite common for standalone apps.",
        "Parcel · Rsbuild · custom webpack.",
        "Static for client apps; custom server for SSR.",
      ],
    },
    {
      id: "next",
      name: "Next.js",
      url: "https://nextjs.org/docs/app",
      license: "https://github.com/vercel/next.js/blob/canary/license.md",
      licenseName: "MIT",
      logo: "js-next.svg",
      ecosystems: ["React"],
      purpose: "React app framework · App Router.",
      strength: "Integrated rendering, routing and server features.",
      limitation: "Server/client boundaries and caching need care.",
      facts: [
        "React JSX/TSX · Server and Client Components.",
        {
          included: true,
          detail: "File-based pages and nested layouts.",
        },
        {
          included: true,
          detail: "Integrated SSR and prerendering; server for live SSR.",
        },
        {
          included: true,
          detail: "Route Handlers; Server Functions for mutations.",
        },
        "Next.js 16+: Turbopack for dev and production.",
        "webpack via --webpack; check plugin compatibility.",
        "Supported server runtime; static export for compatible routes only.",
      ],
    },
    {
      id: "react-router",
      name: "React Router v7",
      url: "https://reactrouter.com/start/framework/installation",
      license: "https://github.com/remix-run/react-router/blob/main/LICENSE.md",
      licenseName: "MIT",
      ecosystems: ["React"],
      purpose: "React app framework · Framework Mode, Remix v2 successor.",
      strength: "Route loaders, actions and pending states.",
      limitation: "Framework Mode owns build and server conventions.",
      facts: [
        "React JSX/TSX · typed route modules.",
        {
          included: true,
          detail: "Nested route modules and code splitting.",
        },
        {
          included: true,
          detail: "Configure SSR, SPA or static prerendering.",
        },
        {
          included: true,
          detail: "Resource routes and server loaders/actions.",
        },
        "Vite · Framework Mode plugin.",
        "Data/Declarative modes: own your tooling, fewer framework features.",
        "Server for runtime SSR/actions; static for SPA or prerendered output.",
      ],
    },
    {
      id: "vue",
      name: "Vue",
      url: "https://vuejs.org/guide/introduction.html",
      license: "https://github.com/vuejs/core/blob/main/LICENSE",
      licenseName: "MIT",
      logo: "js-vue.svg",
      ecosystems: ["Vue"],
      purpose: "Progressive UI framework.",
      strength: "Single-file components; progressive adoption.",
      limitation: "Choose app architecture and production SSR setup.",
      facts: [
        "Templates · reactive state · TypeScript SFCs.",
        {
          included: true,
          detail: "Official Vue Router; separate package.",
        },
        {
          included: true,
          detail: "SSR APIs only; assemble server/client integration.",
        },
        {
          included: false,
          detail: "External server or app framework, e.g. Nuxt.",
        },
        "Vite · official create-vue starter, not a Vue-core requirement.",
        "Custom toolchain with Vue compilation integration.",
        "Static for client apps; custom server for SSR.",
      ],
    },
    {
      id: "nuxt",
      name: "Nuxt",
      url: "https://nuxt.com/docs/4.x/getting-started/introduction",
      license: "https://github.com/nuxt/nuxt/blob/main/LICENSE",
      licenseName: "MIT",
      logo: "js-nuxt.svg",
      ecosystems: ["Vue"],
      purpose: "Vue app framework · Nuxt 4.",
      strength: "Integrated data fetching and server conventions.",
      limitation: "Auto-imports, modules and deployment presets to learn.",
      facts: [
        "Vue SFCs · pages, layouts and composables.",
        {
          included: true,
          detail: "File-based pages via Vue Router.",
        },
        {
          included: true,
          detail: "SSR by default; client and hybrid modes available.",
        },
        {
          included: true,
          detail: "Nitro server routes and middleware.",
        },
        "Vite for the app · Nitro for server output.",
        "webpack · Rspack · custom Nuxt builder; install/configure separately.",
        "Nitro preset for server features; static generation without live endpoints.",
      ],
    },
    {
      id: "angular",
      name: "Angular",
      url: "https://angular.dev/overview",
      license: "https://github.com/angular/angular/blob/main/LICENSE",
      licenseName: "MIT",
      logo: "js-angular.svg",
      ecosystems: ["Angular"],
      purpose: "Integrated UI and app framework.",
      strength: "First-party routing, forms, DI and tooling.",
      limitation: "More framework conventions; no built-in API layer.",
      facts: [
        "TypeScript · templates, signals and DI; RxJS for observables.",
        {
          included: true,
          detail:
            "Angular Router · included by default in current CLI projects.",
        },
        {
          included: true,
          detail: "Official @angular/ssr package; enable and configure routes.",
        },
        {
          included: false,
          detail: "External server handlers; SSR is not an API layer.",
        },
        "esbuild · default Angular CLI application builder.",
        "Other CLI builders: browser-esbuild, webpack-based browser or custom; check compatibility.",
        "Static for client/prerendered apps; supported server for SSR.",
      ],
    },
    {
      id: "astro",
      name: "Astro",
      url: "https://docs.astro.build/en/concepts/why-astro/",
      license: "https://github.com/withastro/astro/blob/main/LICENSE",
      licenseName: "MIT",
      logo: "js-astro.svg",
      ecosystems: ["Framework-agnostic"],
      purpose: "Content-oriented framework · multiple UI integrations.",
      strength: "HTML-first pages; selective interactive islands.",
      limitation: "Whole-page app interactivity needs extra design.",
      facts: [
        "Astro components + UI integrations; explicit island hydration.",
        {
          included: true,
          detail: "File-based pages and endpoints.",
        },
        {
          included: true,
          detail:
            "Requires a runtime adapter; static prerendering is the default.",
        },
        {
          included: true,
          detail: "Endpoints and actions; runtime adapter for live requests.",
        },
        "Astro-managed development and production build.",
        "Configure through Astro integrations; not an independent bundler choice.",
        "Static by default; runtime adapter for live pages and endpoints.",
      ],
    },
    {
      id: "remix",
      name: "Remix v3",
      url: "https://remix.run/docs/",
      license: "https://github.com/remix-run/remix/blob/main/LICENSE",
      licenseName: "MIT",
      ecosystems: ["Remix"],
      purpose: "Full-stack TypeScript framework · own UI model.",
      strength: "Composable server, UI, data and asset modules.",
      limitation: "Not React; differs from the Remix v2 model.",
      facts: [
        "Own JSX model · ordinary state, explicit updates; not React hooks.",
        {
          included: true,
          detail: "Typed routes, controllers and middleware.",
        },
        {
          included: true,
          detail: "Server JSX, selective hydration and streaming Frames.",
        },
        {
          included: true,
          detail: "Controllers and Web Request/Response handlers.",
        },
        "No application build step: on-demand TS/JSX/CSS compilation.",
        "Remix asset pipeline; no Vite/webpack switch listed.",
        "Server runtime for requests, UI rendering and asset compilation.",
      ],
    },
  ],
  sources: [
    {
      label: "React standalone build choices",
      url: "https://react.dev/learn/build-a-react-app-from-scratch",
    },
    {
      label: "React server rendering APIs",
      url: "https://react.dev/reference/react-dom/server",
    },
    {
      label: "Next.js Turbopack and webpack",
      url: "https://nextjs.org/docs/app/api-reference/turbopack",
    },
    {
      label: "Next.js Route Handlers",
      url: "https://nextjs.org/docs/app/getting-started/route-handlers",
    },
    { label: "React Router modes", url: "https://reactrouter.com/start/modes" },
    {
      label: "React Router rendering strategies",
      url: "https://reactrouter.com/start/framework/rendering",
    },
    {
      label: "React Router resource routes",
      url: "https://reactrouter.com/how-to/resource-routes",
    },
    {
      label: "Remix v2 to React Router lineage",
      url: "https://v2.remix.run/docs",
    },
    {
      label: "Vue official starter",
      url: "https://vuejs.org/guide/quick-start.html",
    },
    {
      label: "Vue official router",
      url: "https://vuejs.org/guide/scaling-up/routing.html",
    },
    {
      label: "Vue SSR integration",
      url: "https://vuejs.org/guide/scaling-up/ssr.html",
    },
    {
      label: "Nuxt builders and server configuration",
      url: "https://nuxt.com/docs/4.x/api/nuxt-config",
    },
    {
      label: "Nuxt rendering modes",
      url: "https://nuxt.com/docs/4.x/guide/concepts/rendering",
    },
    {
      label: "Angular Router inclusion",
      url: "https://angular.dev/guide/routing",
    },
    {
      label: "Angular server and hybrid rendering",
      url: "https://angular.dev/guide/ssr",
    },
    {
      label: "Angular CLI builders",
      url: "https://angular.dev/tools/cli/build",
    },
    {
      label: "Astro on-demand rendering and endpoints",
      url: "https://docs.astro.build/en/guides/on-demand-rendering/",
    },
    {
      label: "Astro development and build commands",
      url: "https://docs.astro.build/en/develop-and-build/",
    },
    {
      label: "Remix v3 components, routing and assets",
      url: "https://remix.run/docs/",
    },
  ],
};
