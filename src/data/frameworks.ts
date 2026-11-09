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
  note: "Included does not mean enabled by default or supplied in the same package. React and Vue provide SSR APIs, not an assembled server application. Angular Router is included by the current CLI; Vue Router is a separate official package. TanStack Start's React integration adds server features around TanStack Router; it is not the router alone. SvelteKit builds applications with Svelte components. Astro supports React or Vue through official integrations; install the matching integration and explicitly hydrate interactive islands. These are not its only supported UI libraries. Request-time rendering and endpoints need a server runtime; static output cannot run them. Remix v3 has its own component model and belongs outside the React group. You still own application authorization, input validation, persistence and deployment. Choices are not rankings or tested integration recipes. SEO & discoverability describes technical integration, not a ranking guarantee. Configure unique metadata, canonicals, social previews, sitemap/robots files and safe structured data for public pages; verify the initial HTML, HTTP redirects/404 responses and deployment behavior with your target crawlers. React's native head-element support targets React 19+, not every React release. TanStack Start sitemap generation needs configuration and prerendered/crawled routes; dynamic routes may need explicit entries or a server sitemap. Astro's sitemap integration covers generated static routes, not automatic discovery of dynamic SSR routes. Nuxt SEO modules are separate from core head APIs. SvelteKit sitemaps are application-authored. Remix v3 uses explicit document head markup, not Remix v2 meta/links exports. SSR/prerendering does not guarantee indexing or rankings; content, links and performance remain essential.",
  columnGroups: [
    { label: "React-based", toolIds: ["react", "next", "tanstack-start"] },
    { label: "Vue-based", toolIds: ["vue", "nuxt"] },
    { label: "Angular", toolIds: ["angular"] },
    { label: "Svelte-based", toolIds: ["sveltekit"] },
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
    {
      label: "SEO & discoverability",
      explanation:
        "Technical tools for making public pages understandable to search crawlers and link-preview bots: rendered HTML, page titles/descriptions, canonical URLs, social metadata, sitemap/robots files and structured data (JSON-LD). Labels describe integration approaches, not SEO quality scores. SSR or prerendering can expose content without browser JavaScript, but neither guarantees indexing or rankings. Content, internal links, performance and correct HTTP redirects/404 status codes still matter. A client-side route change is not an HTTP redirect. Configure the actual rendered output, metadata and deployment for your public routes; private dashboards may not need indexing.",
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
        {
          label: "React components",
          detail: "JSX/TSX · components, state and hooks.",
        },
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
        {
          label: "Choose your tooling",
          detail: "No default · Vite common for standalone apps.",
        },
        {
          label: "Custom toolchain",
          detail: "Parcel · Rsbuild · custom webpack.",
        },
        {
          label: "Static / custom server",
          detail: "Static for client apps; custom server for SSR.",
        },
        {
          label: "App-managed integration",
          detail:
            "React 19+ title/meta/link; SSR and sitemap/robots setup belong to your app/framework.",
        },
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
        {
          label: "React components",
          detail: "React JSX/TSX · Server and Client Components.",
        },
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
        {
          label: "Turbopack",
          detail: "Next.js 16+: Turbopack for dev and production.",
        },
        {
          label: "Alternative builder",
          detail: "webpack via --webpack; check plugin compatibility.",
        },
        {
          label: "Server / static output",
          detail:
            "Supported server runtime; static export for compatible routes only.",
        },
        {
          label: "Integrated head APIs",
          detail:
            "Metadata API, SSR/prerendering and sitemap/robots conventions; configure canonicals and JSON-LD.",
        },
      ],
    },
    {
      id: "tanstack-start",
      name: "TanStack Start",
      logo: "js-tanstack-start.svg",
      url: "https://tanstack.com/start/latest/docs/framework/react/overview",
      license: "https://github.com/TanStack/router/blob/main/LICENSE",
      licenseName: "MIT",
      ecosystems: ["React"],
      purpose: "Full-stack app framework · React integration.",
      strength: "Type-safe routing, SSR and server functions.",
      limitation: "Server boundaries and hosting setup need care.",
      facts: [
        {
          label: "React components",
          detail: "React JSX/TSX · powered by TanStack Router.",
        },
        {
          included: true,
          detail: "TanStack Router · typed routes, params and search state.",
        },
        {
          included: true,
          detail: "Full-document SSR and streaming; configurable per route.",
        },
        {
          included: true,
          detail: "Server routes for HTTP endpoints; typed server functions.",
        },
        { label: "Vite", detail: "Vite · TanStack Start and React plugins." },
        {
          label: "Alternative builder",
          detail:
            "Official Rsbuild integration; deployment setup differs by build tool.",
        },
        {
          label: "Server / static output",
          detail:
            "Server integration for live SSR/functions; prerendered static output without live server features.",
        },
        {
          label: "Integrated head APIs",
          detail:
            "Route head, SSR/prerendering; configured sitemap generation; author robots and JSON-LD.",
        },
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
        {
          label: "Vue components",
          detail: "Templates · reactive state · TypeScript SFCs.",
        },
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
        {
          label: "Vite",
          detail:
            "Vite · official create-vue starter, not a Vue-core requirement.",
        },
        {
          label: "Custom toolchain",
          detail: "Custom toolchain with Vue compilation integration.",
        },
        {
          label: "Static / custom server",
          detail: "Static for client apps; custom server for SSR.",
        },
        {
          label: "App-managed integration",
          detail:
            "Assemble SSR and head management; canonicals, sitemap/robots and JSON-LD are app work.",
        },
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
        {
          label: "Vue components",
          detail: "Vue SFCs · pages, layouts and composables.",
        },
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
        {
          label: "Vite",
          detail: "Vite for the app · Nitro for server output.",
        },
        {
          label: "Alternative builder",
          detail:
            "webpack · Rspack · custom Nuxt builder; install/configure separately.",
        },
        {
          label: "Server / static output",
          detail:
            "Nitro preset for server features; static generation without live endpoints.",
        },
        {
          label: "Integrated head APIs",
          detail:
            "useHead/useSeoMeta with SSR; sitemap/robots via files, routes or modules; author JSON-LD.",
        },
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
        {
          label: "Angular components",
          detail:
            "TypeScript · templates, signals and DI; RxJS for observables.",
        },
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
        {
          label: "esbuild",
          detail: "esbuild · default Angular CLI application builder.",
        },
        {
          label: "Alternative builder",
          detail:
            "Other CLI builders: browser-esbuild, webpack-based browser or custom; check compatibility.",
        },
        {
          label: "Server / static output",
          detail:
            "Static for client/prerendered apps; supported server for SSR.",
        },
        {
          label: "Metadata services",
          detail:
            "Title/Meta services; configure @angular/ssr; canonicals, sitemap/robots and JSON-LD are app work.",
        },
      ],
    },
    {
      id: "sveltekit",
      name: "SvelteKit",
      logo: "js-sveltekit.png",
      url: "https://svelte.dev/docs/kit/introduction",
      license: "https://github.com/sveltejs/kit/blob/main/LICENSE",
      licenseName: "MIT",
      ecosystems: ["Svelte"],
      purpose: "Svelte app framework · integrated pages and server routes.",
      strength: "Compiled components, data loading and form actions.",
      limitation: "Learn Svelte conventions and choose a deployment adapter.",
      facts: [
        {
          label: "Svelte components",
          detail:
            "Svelte components · HTML templates, CSS and JavaScript/TypeScript.",
        },
        {
          included: true,
          detail: "File-based pages, nested layouts and route parameters.",
        },
        {
          included: true,
          detail:
            "SSR by default; per-route client rendering and prerendering options.",
        },
        {
          included: true,
          detail:
            "+server handlers for endpoints; server form actions for mutations.",
        },
        {
          label: "Vite",
          detail: "Vite · SvelteKit plugin builds client and server output.",
        },
        {
          label: "Framework configuration",
          detail:
            "Configure Vite and the deployment adapter; no independent bundler switch.",
        },
        {
          label: "Server / static output",
          detail:
            "Target adapter for server features; static adapter for compatible output.",
        },
        {
          label: "Document head markup",
          detail:
            "<svelte:head> with SSR/prerendering; author canonicals/JSON-LD and sitemap/robots routes or files.",
        },
      ],
    },
    {
      id: "astro",
      name: "Astro",
      url: "https://docs.astro.build/en/concepts/why-astro/",
      license: "https://github.com/withastro/astro/blob/main/LICENSE",
      licenseName: "MIT",
      logo: "js-astro.svg",
      ecosystems: ["React", "Vue"],
      purpose: "Content-oriented framework · React or Vue capable.",
      strength: "HTML-first pages; selective interactive islands.",
      limitation: "Whole-page app interactivity needs extra design.",
      facts: [
        {
          label: "Astro + UI integrations",
          detail:
            "Astro components + React or Vue integrations; explicit island hydration.",
        },
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
        {
          label: "Framework-managed",
          detail: "Astro-managed development and production build.",
        },
        {
          label: "Framework configuration",
          detail:
            "Configure through Astro integrations; not an independent bundler choice.",
        },
        {
          label: "Server / static output",
          detail:
            "Static by default; runtime adapter for live pages and endpoints.",
        },
        {
          label: "Document head markup",
          detail:
            "<head> in HTML-first pages; add @astrojs/sitemap for static routes; author robots and JSON-LD.",
        },
      ],
    },
    {
      id: "remix",
      name: "Remix v3",
      logo: "js-remix.svg",
      url: "https://remix.run/docs/",
      license: "https://github.com/remix-run/remix/blob/main/LICENSE",
      licenseName: "MIT",
      ecosystems: ["Remix"],
      purpose: "Full-stack TypeScript framework · own UI model.",
      strength: "Composable server, UI, data and asset modules.",
      limitation: "Not React; differs from the Remix v2 model.",
      facts: [
        {
          label: "Remix components",
          detail:
            "Own JSX model · ordinary state, explicit updates; not React hooks.",
        },
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
        {
          label: "On-demand compilation",
          detail:
            "No application build step: on-demand TS/JSX/CSS compilation.",
        },
        {
          label: "Framework configuration",
          detail: "Remix asset pipeline; no Vite/webpack switch listed.",
        },
        {
          label: "Server runtime",
          detail:
            "Server runtime for requests, UI rendering and asset compilation.",
        },
        {
          label: "Document head markup",
          detail:
            "Server-rendered JSX document; author head tags, canonicals, sitemap/robots responses and JSON-LD.",
        },
      ],
    },
  ],
  sources: [
    {
      label: "React 19+ document title and metadata",
      url: "https://react.dev/reference/react-dom/components/title",
    },
    {
      label: "React metadata elements",
      url: "https://react.dev/reference/react-dom/components/meta",
    },
    {
      label: "Next.js metadata, social previews and sitemap/robots conventions",
      url: "https://nextjs.org/docs/app/getting-started/metadata-and-og-images",
    },
    {
      label: "TanStack Start SEO, route head and configured sitemap generation",
      url: "https://tanstack.com/start/latest/docs/framework/react/guide/seo",
    },
    {
      label: "Nuxt head management and SEO metadata",
      url: "https://nuxt.com/docs/4.x/getting-started/seo-meta",
    },
    {
      label: "Angular document Title service",
      url: "https://angular.dev/api/platform-browser/Title",
    },
    {
      label: "SvelteKit SEO, head markup and manual sitemaps",
      url: "https://svelte.dev/docs/kit/seo",
    },
    {
      label: "Astro page layouts and document head",
      url: "https://docs.astro.build/en/basics/layouts/",
    },
    {
      label: "Astro official sitemap integration and SSR route limits",
      url: "https://docs.astro.build/en/guides/integrations-guide/sitemap/",
    },
    {
      label: "Remix v3 document shells and explicit head content",
      url: "https://github.com/remix-run/remix/blob/main/packages/remix/guides/04-rendering-ui.md",
    },
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
    {
      label: "TanStack Start routing, rendering and server features",
      url: "https://tanstack.com/start/latest/docs/framework/react/overview",
    },
    {
      label: "TanStack Start build and hosting integrations",
      url: "https://tanstack.com/start/latest/docs/framework/react/guide/hosting",
    },
    {
      label: "TanStack Start static prerendering",
      url: "https://tanstack.com/start/latest/docs/framework/react/guide/static-prerendering",
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
      label: "SvelteKit routing, endpoints and form actions",
      url: "https://svelte.dev/docs/kit/routing",
    },
    {
      label: "SvelteKit builds and adapters",
      url: "https://svelte.dev/docs/kit/building-your-app",
    },
    {
      label: "Astro React, Vue and other UI integrations",
      url: "https://docs.astro.build/en/guides/framework-components/",
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
