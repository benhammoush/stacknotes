/**
 * Defines sourced JavaScript/TypeScript tool comparisons, separated by purpose and UI ecosystem.
 * @packageDocumentation
 */
import { frameworksTopic } from "./frameworks";

/** UI compatibility, not a claim that tools in different roles are interchangeable. */
export type Ecosystem =
  "React" | "Vue" | "Angular" | "Remix" | "Framework-agnostic";

/** An explicit capability verdict, with package, configuration and runtime requirements. */
export interface FeatureFact {
  included: boolean;
  detail: string;
}

/** A tool's editorial comparison cells and official documentation/license sources. */
export interface JavaScriptTool {
  id: string;
  name: string;
  url: string;
  license: string;
  licenseName: string;
  logo?: string;
  ecosystems: Ecosystem[];
  purpose: string;
  strength: string;
  limitation: string;
  facts: (string | FeatureFact)[];
}

/** One comparison with topic-specific dimensions rather than provider-responsibility scores. */
export interface JavaScriptTopic {
  label: string;
  title: string;
  path: string;
  introduction: string;
  note: string;
  dimensions: { label: string; explanation: string }[];
  tools: JavaScriptTool[];
  columnGroups?: { label: string; toolIds: string[] }[];
  sources?: { label: string; url: string }[];
}

/** Compact source entries keep each product's name and links in one place. */
type ToolEntry = [
  id: string,
  name: string,
  url: string,
  license: string,
  ecosystems: Ecosystem[],
  purpose: string,
  strength: string,
  limitation: string,
  facts: string[],
];

/** Verified local project marks reused by comparisons and stacks; provenance lives in THIRD_PARTY_NOTICES.txt. */
const stackToolLogos: Record<string, string> = {
  react: "js-react.svg",
  vue: "js-vue.svg",
  angular: "js-angular.svg",
  next: "js-next.svg",
  nuxt: "js-nuxt.svg",
  astro: "js-astro.svg",
  mui: "js-mui.svg",
  "ant-design": "js-ant-design.svg",
  "element-plus": "js-element-plus.svg",
  primeng: "js-primeng.svg",
  "ng-zorro": "js-ng-zorro.svg",
  mantine: "js-mantine.svg",
  radix: "js-radix.svg",
  shadcn: "js-shadcn.svg",
  primevue: "js-primevue.svg",
  vuetify: "js-vuetify.svg",
  "angular-material": "js-angular-material.svg",
  tailwind: "js-tailwind.svg",
  "css-modules": "js-css-modules.png",
  sass: "js-sass.svg",
  fastify: "js-fastify.svg",
  nest: "js-nest.svg",
  express: "js-express.svg",
  prisma: "js-prisma.svg",
  drizzle: "js-drizzle.svg",
  kysely: "js-kysely.ico",
  zod: "js-zod.svg",
  valibot: "js-valibot.png",
  vitest: "js-vitest.svg",
  playwright: "js-playwright.svg",
  vite: "js-vite.svg",
};

/**
 * Expand editorial entries without inventing missing comparison values.
 * @param entries - Complete tool entries for one topic.
 * @returns Named, source-linked tools in editorial order, not ranking order.
 */
function tools(entries: ToolEntry[]): JavaScriptTool[] {
  return entries.map(
    ([
      id,
      name,
      url,
      license,
      ecosystems,
      purpose,
      strength,
      limitation,
      facts,
    ]) => ({
      id,
      name,
      url,
      license,
      logo: stackToolLogos[id],
      licenseName:
        (
          {
            gsap: "GSAP Standard License",
            lucide: "ISC",
            primeng: "MIT (community); commercial/LTS terms vary",
            prisma: "Apache-2.0",
            drizzle: "Apache-2.0",
            playwright: "Apache-2.0",
            "css-modules": "Implementation-dependent; linked css-loader is MIT",
          } as Record<string, string>
        )[id] ?? "MIT",
      ecosystems,
      purpose,
      strength,
      limitation,
      facts,
    }),
  );
}

export const javascriptStacksTopic = {
  label: "Application stacks",
  title: "JavaScript / TypeScript application stacks",
  path: "/javascript/stacks/",
};

export const javascriptTopics: JavaScriptTopic[] = [
  frameworksTopic,
  {
    label: "Component libraries",
    title: "Component libraries",
    path: "/javascript/components/",
    columnGroups: [
      { label: "React-based", toolIds: ["mui", "ant-design", "mantine"] },
      { label: "Vue-based", toolIds: ["primevue", "vuetify", "element-plus"] },
      {
        label: "Angular",
        toolIds: ["angular-material", "primeng", "ng-zorro"],
      },
    ],
    introduction:
      "Compare three general-purpose component suites for each UI ecosystem. These are curated choices, not a popularity ranking.",
    note: "Accessibility requires correct composition, content and application testing. Check the actual date picker, data grid or other control you need; packages and paid editions differ.",
    dimensions: [
      {
        label: "Library type",
        explanation:
          "The design system and scope of the component suite; separate CDK utilities or commercial extensions may have different boundaries.",
      },
      {
        label: "Styling & customization",
        explanation:
          "How much design comes supplied and what you change to match your product.",
      },
      {
        label: "Accessibility work",
        explanation:
          "Provided interaction behavior does not replace labels, content, contrast and application tests.",
      },
      {
        label: "Updates & boundaries",
        explanation:
          "Who maintains component source and whether additional products or licenses are involved.",
      },
    ],
    tools: tools([
      [
        "mui",
        "MUI Material UI",
        "https://mui.com/material-ui/getting-started/",
        "https://github.com/mui/material-ui/blob/master/LICENSE",
        ["React"],
        "Styled React components following Material Design.",
        "A coordinated set of controls and theme APIs.",
        "Distinct MUI X packages and paid editions have separate boundaries.",
        [
          "Styled component suite.",
          "Theme tokens, component overrides and styling APIs.",
          "Built-in behavior still needs labels, contrast and integration checks.",
          "Update packages; check MUI X features and licenses separately.",
        ],
      ],
      [
        "ant-design",
        "Ant Design",
        "https://ant.design/docs/react/introduce",
        "https://github.com/ant-design/ant-design/blob/master/LICENSE",
        ["React"],
        "Ant Design components for React business applications.",
        "Coordinated forms, tables and application controls.",
        "Opinionated design; related Ant products have separate scope.",
        [
          "Styled suite following Ant Design.",
          "Design tokens and theme configuration.",
          "Check labels, keyboard use and custom control composition.",
          "Update antd; evaluate companion products separately.",
        ],
      ],
      [
        "mantine",
        "Mantine",
        "https://mantine.dev/getting-started/",
        "https://github.com/mantinedev/mantine/blob/master/LICENSE",
        ["React"],
        "React component and hook collection.",
        "Components and supporting hooks share styling conventions.",
        "Package styles and themes must fit your build and design.",
        [
          "Styled component suite with companion packages.",
          "CSS variables, styles APIs and theme configuration.",
          "Supply labels and test real keyboard/screen-reader flows.",
          "Update packages; review style and component changes.",
        ],
      ],
      [
        "primevue",
        "PrimeVue",
        "https://primevue.dev/installation/",
        "https://github.com/primefaces/primevue/blob/master/LICENSE.md",
        ["Vue"],
        "Vue component suite with styled and unstyled approaches.",
        "A broad control collection with theme options.",
        "Templates, themes and commercial extras need separate evaluation.",
        [
          "Component suite.",
          "Styled theming or unstyled mode with your CSS.",
          "Use component accessibility guidance and verify application composition.",
          "Update packages; check commercial offerings independently.",
        ],
      ],
      [
        "vuetify",
        "Vuetify",
        "https://vuetifyjs.com/en/introduction/why-vuetify/",
        "https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetify/LICENSE.md",
        ["Vue"],
        "Material Design component framework for Vue.",
        "Shared layout, theme and control conventions.",
        "A Material-oriented design can require substantial customization for another visual language.",
        [
          "Styled component framework.",
          "Theme configuration, styles and component props.",
          "Apply semantic labels and verify keyboard and screen-reader flows.",
          "Update framework packages; distinguish core from commercial services.",
        ],
      ],
      [
        "element-plus",
        "Element Plus",
        "https://element-plus.org/en-US/guide/installation.html",
        "https://github.com/element-plus/element-plus/blob/dev/LICENSE",
        ["Vue"],
        "Vue 3 component suite for business interfaces.",
        "Broad forms, tables and navigation controls.",
        "Check Vue, browser and Sass compatibility when upgrading.",
        [
          "Styled Vue 3 component suite.",
          "Theme variables, Sass customization and dark mode.",
          "Verify labels, keyboard behavior and custom composition.",
          "Update packages and check documented compatibility requirements.",
        ],
      ],
      [
        "angular-material",
        "Angular Material",
        "https://material.angular.dev/",
        "https://github.com/angular/components/blob/main/LICENSE",
        ["Angular"],
        "Material Design components and CDK tooling for Angular.",
        "First-party ecosystem alignment and reusable behavior utilities.",
        "Component and Angular versions must remain compatible.",
        [
          "Styled suite plus separate CDK behavior building blocks.",
          "Material theme and component customization APIs.",
          "CDK helpers do not replace accessible application design.",
          "Coordinate component/CDK upgrades with Angular.",
        ],
      ],
      [
        "primeng",
        "PrimeNG",
        "https://primeng.org/installation",
        "https://github.com/primefaces/primeng/blob/master/LICENSE.md",
        ["Angular"],
        "Broad Angular component suite for application interfaces.",
        "Rich controls with configurable themes.",
        "Version/edition terms differ; current setup documents a license key.",
        [
          "Angular component suite; distinguish community and commercial offerings.",
          "Styled themes or unstyled integration with your CSS.",
          "Follow component guidance; test labels and application flows.",
          "Check Angular compatibility, selected-release licensing and LTS terms.",
        ],
      ],
      [
        "ng-zorro",
        "NG-ZORRO",
        "https://ng.ant.design/docs/introduce/en",
        "https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE",
        ["Angular"],
        "Ant Design component suite for Angular.",
        "Business-app controls, theming and internationalization.",
        "Coordinate its major version with Angular; Ant Design is opinionated.",
        [
          "Styled Angular suite following Ant Design.",
          "Theme customization and global component configuration.",
          "Verify focus, accessible names and keyboard flows in your app.",
          "Update ng-zorro-antd alongside a compatible Angular release.",
        ],
      ],
    ]),
  },
  {
    label: "Styling",
    title: "Styling tools",
    path: "/javascript/styling/",
    introduction:
      "Compare approaches to writing and organizing styles. These tools can complement each other rather than replace each other.",
    note: "Styling support is not a complete accessibility guarantee. Check responsive behavior, contrast, focus and reduced-motion preferences in your own design.",
    dimensions: [
      {
        label: "Approach",
        explanation:
          "Utilities, ready-made styles, scoped CSS, preprocessing and CSS-in-JS solve different problems.",
      },
      {
        label: "Design defaults",
        explanation:
          "Whether visual components are supplied or the design is entirely yours.",
      },
      {
        label: "Build & runtime",
        explanation:
          "What tooling processes the styles and whether JavaScript runs to generate them.",
      },
      {
        label: "Customization",
        explanation:
          "How you express shared tokens, themes and local exceptions.",
      },
    ],
    tools: tools([
      [
        "tailwind",
        "Tailwind CSS",
        "https://tailwindcss.com/docs",
        "https://github.com/tailwindlabs/tailwindcss/blob/main/LICENSE",
        ["Framework-agnostic"],
        "Utility-first CSS framework.",
        "Compose styles in markup with a shared design vocabulary.",
        "Long class lists and shared component boundaries need discipline.",
        [
          "Utility classes generated by a build step.",
          "Utilities and theme primitives, not a ready-made control suite.",
          "Build integration generates CSS; no styling runtime required.",
          "Theme variables, utilities and reusable components.",
        ],
      ],
      [
        "bootstrap",
        "Bootstrap",
        "https://getbootstrap.com/docs/5.3/getting-started/introduction/",
        "https://github.com/twbs/bootstrap/blob/main/LICENSE",
        ["Framework-agnostic"],
        "CSS framework with layout utilities and styled components.",
        "Established visual conventions and ready-made component styles.",
        "Interactive JavaScript plugins must be integrated carefully with reactive UI frameworks.",
        [
          "Styled CSS components and utilities with JavaScript plugins.",
          "A supplied visual language and layouts.",
          "CSS works directly; some interactive components need JavaScript.",
          "CSS variables and Sass customization.",
        ],
      ],
      [
        "css-modules",
        "CSS Modules",
        "https://github.com/css-modules/css-modules",
        "https://github.com/webpack-contrib/css-loader/blob/master/LICENSE",
        ["Framework-agnostic"],
        "Build-tool convention for locally scoped CSS names.",
        "Keep ordinary CSS while reducing accidental class collisions.",
        "A convention rather than one package: check your build implementation's license. Themes and component design remain yours.",
        [
          "Local class-name scoping, not a design framework.",
          "None; write your own CSS.",
          "Requires CSS Modules support in your toolchain.",
          "Compose classes and use standard CSS variables.",
        ],
      ],
      [
        "sass",
        "Sass",
        "https://sass-lang.com/documentation/",
        "https://github.com/sass/dart-sass/blob/main/LICENSE",
        ["Framework-agnostic"],
        "Stylesheet language compiled into CSS.",
        "Modules, functions and mixins help organize styles.",
        "Adds a compilation layer and does not isolate classes by itself.",
        [
          "CSS preprocessor.",
          "None; it can customize another CSS framework.",
          "Compile Sass before serving CSS.",
          "Modules, variables, mixins and generated CSS.",
        ],
      ],
      [
        "emotion",
        "Emotion",
        "https://emotion.sh/docs/introduction",
        "https://github.com/emotion-js/emotion/blob/main/LICENSE",
        ["React"],
        "CSS-in-JS library with React integrations.",
        "Co-locate component styling and theme-driven variants.",
        "Server rendering and runtime style insertion need the documented setup.",
        [
          "CSS-in-JS; this entry covers React styling APIs.",
          "No full control suite.",
          "Runtime style generation with build-time optimizations available.",
          "Theme context, styled components and CSS composition.",
        ],
      ],
    ]),
  },
  {
    label: "Animation",
    title: "Animation libraries",
    path: "/javascript/animation/",
    introduction:
      "Choose by the interaction you need: transitions, layout changes, gestures or timelines. Native CSS may be enough.",
    note: "Respect reduced motion and clean up animations on navigation. No speed ranking is implied; measure your actual screens and devices.",
    dimensions: [
      {
        label: "Integration",
        explanation:
          "Direct DOM APIs and framework-specific bindings have different lifecycle requirements.",
      },
      {
        label: "Motion model",
        explanation:
          "What kinds of changes the library is designed to coordinate.",
      },
      {
        label: "Control",
        explanation: "How much timeline or interaction logic you write.",
      },
      {
        label: "Your responsibilities",
        explanation:
          "Motion preferences, cleanup and interaction safety still require application work.",
      },
    ],
    tools: tools([
      [
        "motion",
        "Motion",
        "https://motion.dev/docs",
        "https://github.com/motiondivision/motion/blob/main/LICENSE.md",
        ["React", "Framework-agnostic"],
        "Animation tools with JavaScript and React APIs.",
        "Declarative animation and interaction APIs for UI work.",
        "Capabilities and paid offerings differ across packages and integrations.",
        [
          "React components/hooks or JavaScript animation APIs.",
          "Transitions, layout animations and gestures through appropriate APIs.",
          "Use animation values, transitions and sequencing APIs.",
          "Follow reduced-motion guidance and clean up manual animations.",
        ],
      ],
      [
        "gsap",
        "GSAP",
        "https://gsap.com/docs/v3/",
        "https://gsap.com/community/standard-license/",
        ["Framework-agnostic"],
        "JavaScript animation engine and plugin ecosystem.",
        "Explicit timelines coordinate complex sequences.",
        "DOM targeting and lifecycle cleanup require care; review current license terms.",
        [
          "DOM-oriented JavaScript; integrations for component lifecycles.",
          "Tweens, timelines, SVG and plugin-driven effects.",
          "Detailed sequencing and playback control.",
          "Use cleanup/context mechanisms and implement reduced-motion behavior.",
        ],
      ],
      [
        "anime",
        "Anime.js",
        "https://animejs.com/documentation/",
        "https://github.com/juliangarnier/anime/blob/master/LICENSE.md",
        ["Framework-agnostic"],
        "JavaScript toolkit for animation and timelines.",
        "Animate DOM properties and coordinate sequences.",
        "You connect lifecycle cleanup and interaction logic to your app.",
        [
          "JavaScript APIs for DOM and other values.",
          "Animations, timelines and layout/scroll tools as documented.",
          "Explicit targets, timing and sequencing.",
          "Revert effects and respect motion preferences.",
        ],
      ],
      [
        "autoanimate",
        "AutoAnimate",
        "https://auto-animate.formkit.com/",
        "https://github.com/formkit/auto-animate/blob/master/LICENSE",
        ["React", "Vue", "Framework-agnostic"],
        "Automatic transitions for changes to a container's children.",
        "Small integration for adding, removing and moving list items.",
        "Less suitable when you need precise multi-step choreography.",
        [
          "Parent-element API and framework adapters.",
          "Changes to immediate children of a container.",
          "Defaults with customization rather than a general timeline editor.",
          "Check reduced-motion behavior and unusual layout cases.",
        ],
      ],
    ]),
  },
  {
    label: "Icons",
    title: "Icon collections",
    path: "/javascript/icons/",
    introduction:
      "Compare visual languages and delivery formats, not backend or application features.",
    note: "Decorative icons should be hidden from assistive technology. Icon-only controls need an accessible name. Loading a collection does not supply those decisions.",
    dimensions: [
      {
        label: "Visual style",
        explanation:
          "Weight, shape and variants should match the rest of the interface.",
      },
      {
        label: "Integration",
        explanation:
          "Check the maintained package for your UI framework, or use SVG assets.",
      },
      {
        label: "Loading",
        explanation:
          "Import only the assets you use; check what your bundler actually includes.",
      },
      {
        label: "Customization",
        explanation:
          "Color, stroke and size controls differ by format and icon design.",
      },
    ],
    tools: tools([
      [
        "lucide",
        "Lucide",
        "https://lucide.dev/guide/",
        "https://github.com/lucide-icons/lucide/blob/main/LICENSE",
        ["Framework-agnostic"],
        "Open icon collection with a consistent stroke style.",
        "SVG assets and framework packages support varied integrations.",
        "The outlined visual style may not match a filled icon language.",
        [
          "Stroke-based icons.",
          "SVG plus framework-specific packages.",
          "Use individual imports and inspect bundle output.",
          "Size, color and stroke options through SVG/package APIs.",
        ],
      ],
      [
        "heroicons",
        "Heroicons",
        "https://heroicons.com/",
        "https://github.com/tailwindlabs/heroicons/blob/master/LICENSE",
        ["Framework-agnostic"],
        "SVG icon collection with outline and solid variants.",
        "Related icon sizes and styles support consistent interfaces.",
        "Check available sizes and framework integrations for the icons you need.",
        [
          "Outline and solid sets at defined design sizes.",
          "SVG assets and React/Vue packages.",
          "Import individual icons or embed selected SVG assets.",
          "Use SVG color and size; preserve intended style.",
        ],
      ],
      [
        "tabler",
        "Tabler Icons",
        "https://tabler.io/icons",
        "https://github.com/tabler/tabler-icons/blob/main/LICENSE",
        ["Framework-agnostic"],
        "SVG icon collection with framework integrations.",
        "A broad set of consistently drawn interface symbols.",
        "Similar-looking variants still need a product-wide selection rule.",
        [
          "Outline collection with filled icons also available.",
          "SVG and framework-specific packages.",
          "Select icons instead of shipping the complete collection.",
          "SVG sizing, colors and outline stroke settings.",
        ],
      ],
      [
        "phosphor",
        "Phosphor",
        "https://phosphoricons.com/",
        "https://github.com/phosphor-icons/homepage/blob/master/LICENSE",
        ["Framework-agnostic"],
        "Icon family with multiple visual weights.",
        "Weight choices help fit icons to different interface densities.",
        "Mixing weights casually can make the design inconsistent.",
        [
          "Multiple weights including regular, bold and duotone.",
          "SVG assets and ecosystem packages.",
          "Choose an integration and import only needed icons.",
          "Size, color and weight via assets or package APIs.",
        ],
      ],
    ]),
  },
  {
    label: "State management",
    title: "Application state management",
    path: "/javascript/state/",
    introduction:
      "Compare shared application state. Local component state, URL state and remote-data caches have different jobs.",
    note: "Persisting state does not enforce authorization. Isolate user-specific stores during server rendering; not every app needs a global state library.",
    dimensions: [
      {
        label: "State model",
        explanation: "How data is represented and changed.",
      },
      {
        label: "Integration",
        explanation:
          "Which UI ecosystem consumes the state and what setup it needs.",
      },
      {
        label: "Debugging",
        explanation:
          "How state changes can be inspected; integrations may need configuration.",
      },
      {
        label: "Persistence & SSR",
        explanation:
          "Storage and server rendering need explicit lifecycle and per-request boundaries.",
      },
    ],
    tools: tools([
      [
        "redux",
        "Redux Toolkit",
        "https://redux-toolkit.js.org/introduction/getting-started",
        "https://github.com/reduxjs/redux-toolkit/blob/master/LICENSE",
        ["React", "Framework-agnostic"],
        "Tools for writing Redux application state.",
        "Structured state updates and established debugging conventions.",
        "Store, slice and selector conventions can be more structure than a small app needs.",
        [
          "Slices, reducers and actions; RTK Query is a separate data-fetching capability.",
          "Core is UI-independent; React commonly uses React Redux.",
          "Redux DevTools integration.",
          "Persistence is separate; create isolated stores for server requests.",
        ],
      ],
      [
        "zustand",
        "Zustand",
        "https://zustand.docs.pmnd.rs/learn/getting-started/introduction.html",
        "https://github.com/pmndrs/zustand/blob/main/LICENSE",
        ["React", "Framework-agnostic"],
        "Store-based state library with React and vanilla APIs.",
        "Direct store access and selective subscriptions.",
        "Store boundaries and update conventions are your design decisions.",
        [
          "Stores, actions and selectors.",
          "React hooks or vanilla stores.",
          "Devtools middleware can expose changes.",
          "Persist middleware needs hydration planning; avoid shared user state on servers.",
        ],
      ],
      [
        "pinia",
        "Pinia",
        "https://pinia.vuejs.org/introduction.html",
        "https://github.com/vuejs/pinia/blob/v3/LICENSE",
        ["Vue"],
        "Store library for Vue applications.",
        "Vue-oriented stores and development-tool integration.",
        "You still design store scope, side effects and persistence.",
        [
          "State, getters and actions in stores.",
          "Vue integration; follow Nuxt guidance when used there.",
          "Vue DevTools support.",
          "Use documented SSR setup; persistence is not an automatic database.",
        ],
      ],
      [
        "ngrx",
        "NgRx Store",
        "https://ngrx.io/guide/store",
        "https://github.com/ngrx/platform/blob/main/LICENSE",
        ["Angular"],
        "Reactive state management for Angular.",
        "Explicit event-driven state and Angular ecosystem integrations.",
        "Actions, reducers, selectors and effects introduce architectural concepts.",
        [
          "Observable state with actions, reducers and selectors.",
          "Angular providers and companion packages.",
          "Store Devtools through a dedicated integration.",
          "Persistence is application work; scope server-side state correctly.",
        ],
      ],
      [
        "nanostores",
        "Nano Stores",
        "https://github.com/nanostores/nanostores",
        "https://github.com/nanostores/nanostores/blob/main/LICENSE",
        ["React", "Vue", "Framework-agnostic"],
        "Small reactive stores with multiple UI integrations.",
        "Share state across isolated components or UI islands.",
        "Select integrations and organize stores carefully as the app grows.",
        [
          "Atoms, maps and computed stores.",
          "Framework adapters around a UI-independent core.",
          "Use the project's logging/devtools integrations as needed.",
          "Persistence and SSR require the appropriate integrations and isolation.",
        ],
      ],
    ]),
  },
  {
    label: "Data fetching",
    title: "Data fetching & server state",
    path: "/javascript/data-fetching/",
    introduction:
      "Compare remote-data lifecycle tools. General query caches and GraphQL clients are not the same scope.",
    note: "Client-side caches are not Redis/Valkey services. Define cache keys, invalidation, user isolation and error handling; cached data is not an authorization check.",
    dimensions: [
      {
        label: "API focus",
        explanation:
          "Whether the tool expects GraphQL or calls your own asynchronous fetching function.",
      },
      {
        label: "Cache model",
        explanation:
          "Query-result caches and normalized entity caches have different update rules.",
      },
      {
        label: "Updates",
        explanation:
          "How writes, invalidation and optimistic UI fit the data model.",
      },
      {
        label: "Server rendering",
        explanation:
          "Hydration and request isolation depend on the framework and chosen integration.",
      },
    ],
    tools: tools([
      [
        "tanstack-query",
        "TanStack Query",
        "https://tanstack.com/query/latest/docs/framework/react/overview",
        "https://github.com/TanStack/query/blob/main/LICENSE",
        ["React", "Vue", "Angular"],
        "Async state and query-cache tooling with framework adapters.",
        "Centralize fetching status, refetching and invalidation.",
        "You supply fetching functions and meaningful cache/invalidation rules.",
        [
          "Promises from your fetcher; not tied to one transport.",
          "Query-key-based result cache.",
          "Mutations, invalidation and optimistic updates through explicit APIs.",
          "Follow the adapter/framework hydration and per-request cache guidance.",
        ],
      ],
      [
        "swr",
        "SWR",
        "https://swr.vercel.app/docs/getting-started",
        "https://github.com/vercel/swr/blob/main/LICENSE",
        ["React"],
        "React hooks for fetching and revalidating data.",
        "A compact hook-based approach to remote-data state.",
        "Fetcher, cache keys and write coordination remain application decisions.",
        [
          "Your asynchronous fetcher.",
          "Keyed cache with revalidation.",
          "Mutation APIs and cache updates.",
          "Use documented fallback/server-rendering integration.",
        ],
      ],
      [
        "apollo",
        "Apollo Client",
        "https://www.apollographql.com/docs/react",
        "https://github.com/apollographql/apollo-client/blob/main/LICENSE",
        ["React"],
        "GraphQL client; this comparison covers its React integration.",
        "GraphQL operations and normalized data can share an entity cache.",
        "Cache identifiers and field policies need design; a GraphQL server is separate.",
        [
          "GraphQL queries, mutations and subscriptions.",
          "Normalized in-memory entity cache.",
          "Mutation results, cache writes and optimistic responses.",
          "Follow React/framework-specific cache hydration guidance.",
        ],
      ],
      [
        "urql",
        "urql",
        "https://nearform.com/open-source/urql/docs/",
        "https://github.com/urql-graphql/urql/blob/main/LICENSE",
        ["React", "Vue"],
        "GraphQL client with an exchange-based architecture.",
        "Choose caching and request-processing behavior through exchanges.",
        "Different exchanges produce different cache and offline behavior.",
        [
          "GraphQL operations with framework bindings.",
          "Document cache by default; Graphcache adds normalized caching.",
          "Mutation handling and exchange-specific cache updates.",
          "SSR exchanges and framework integration require setup.",
        ],
      ],
    ]),
  },
  {
    label: "Forms",
    title: "Form libraries",
    path: "/javascript/forms/",
    introduction:
      "Choose within your UI ecosystem. Form state, schema validation and accessible controls are separate responsibilities.",
    note: "Server-side validation and authorization are still required. Test labels, error announcements, focus movement and pending/failed submission states.",
    dimensions: [
      {
        label: "Form model",
        explanation: "How fields connect to form state and trigger updates.",
      },
      {
        label: "Validation",
        explanation:
          "Built-in rules and schema adapters have different setup and compatibility requirements.",
      },
      {
        label: "Dynamic forms",
        explanation:
          "Nested values, repeated fields and conditional inputs need explicit modeling.",
      },
      {
        label: "Submission",
        explanation:
          "The library coordinates state; your code performs and authorizes the actual request.",
      },
    ],
    tools: tools([
      [
        "react-hook-form",
        "React Hook Form",
        "https://react-hook-form.com/get-started",
        "https://github.com/react-hook-form/react-hook-form/blob/master/LICENSE",
        ["React"],
        "Hook-based form state for React.",
        "Register standard fields and connect controlled custom inputs when needed.",
        "Controlled widgets and schema resolvers need correct integration.",
        [
          "Registered fields, subscriptions and Controller for controlled widgets.",
          "Rules or separate schema resolvers.",
          "Field arrays and nested values.",
          "Submission handler with validation and pending/error state to wire.",
        ],
      ],
      [
        "tanstack-form",
        "TanStack Form",
        "https://tanstack.com/form/latest/docs/overview",
        "https://github.com/TanStack/form/blob/main/LICENSE",
        ["React", "Vue", "Angular"],
        "Typed form-state core with framework adapters.",
        "Form logic is separate from your choice of visual components.",
        "You supply the fields, layout and accessible error presentation.",
        [
          "Typed form/field APIs and subscriptions.",
          "Field/form validation with supported schema integrations.",
          "Nested fields and array-oriented APIs.",
          "Explicit submission callbacks and async validation workflows.",
        ],
      ],
      [
        "vee-validate",
        "vee-validate",
        "https://vee-validate.logaretm.com/v4/guide/overview/",
        "https://github.com/logaretm/vee-validate/blob/main/LICENSE",
        ["Vue"],
        "Form validation and state tools for Vue.",
        "Composition APIs and components integrate with Vue forms.",
        "Custom inputs and chosen schema adapters must match your version.",
        [
          "Composition APIs or form/field components.",
          "Field rules and supported schema integrations.",
          "Nested values and field arrays.",
          "Submission helpers; implement request failures and accessible feedback.",
        ],
      ],
      [
        "angular-forms",
        "Angular reactive forms",
        "https://angular.dev/guide/forms/reactive-forms",
        "https://github.com/angular/angular/blob/main/LICENSE",
        ["Angular"],
        "First-party model-driven form APIs in Angular.",
        "Explicit control groups and validation fit Angular applications.",
        "Choose the supported form APIs for your Angular version; do not mix models casually.",
        [
          "FormControl, FormGroup and related reactive APIs.",
          "Built-in and custom synchronous/asynchronous validators.",
          "Nested groups and FormArray.",
          "Your component handles the validated request and response states.",
        ],
      ],
    ]),
  },
  {
    label: "Validation",
    title: "Schema validation",
    path: "/javascript/validation/",
    introduction:
      "Compare validation models and integration needs. TypeScript types alone do not validate incoming runtime data.",
    note: "Validate untrusted data on the server. Parsing or transforming a value does not authorize access to it; review defaults, coercion and unknown-key handling.",
    dimensions: [
      {
        label: "Schema model",
        explanation:
          "How rules are declared and whether an interoperable schema standard is central.",
      },
      {
        label: "TypeScript",
        explanation:
          "Type inference and type guards do not replace executing validation.",
      },
      {
        label: "Parsing & errors",
        explanation:
          "Transforms, error structures and defaults must match the application's contract.",
      },
      {
        label: "Integration",
        explanation:
          "Match schema and adapter versions to the form, server or build environment.",
      },
    ],
    tools: tools([
      [
        "zod",
        "Zod",
        "https://zod.dev/",
        "https://github.com/colinhacks/zod/blob/main/LICENSE",
        ["Framework-agnostic"],
        "TypeScript-oriented runtime schemas.",
        "Infer application types from declared validation schemas.",
        "Transforms, defaults and schema evolution can change input/output contracts.",
        [
          "Code-defined schemas with parsing APIs.",
          "Infer input/output types from schemas.",
          "Structured errors, refinements and transformations.",
          "Browser or server; select compatible integrations.",
        ],
      ],
      [
        "valibot",
        "Valibot",
        "https://valibot.dev/guides/introduction/",
        "https://github.com/fabian-hiller/valibot/blob/main/LICENSE.md",
        ["Framework-agnostic"],
        "Modular schema library for validating data.",
        "Function composition makes individual validation operations explicit.",
        "Its pipeline model and integrations differ from object-method schema APIs.",
        [
          "Composable schemas and validation pipelines.",
          "Infer types from schemas.",
          "Issues, parsing and transformation pipelines.",
          "Use supported schema adapters for your form/server tools.",
        ],
      ],
      [
        "ajv",
        "Ajv",
        "https://ajv.js.org/guide/getting-started.html",
        "https://github.com/ajv-validator/ajv/blob/master/LICENSE",
        ["Framework-agnostic"],
        "Validator centered on JSON Schema and JSON Type Definition.",
        "Standard schemas can be shared across tools and language boundaries.",
        "Schema dialects, compilation and code-generation constraints need attention.",
        [
          "JSON Schema or JSON Type Definition.",
          "Type utilities and typed validators; schema/type correspondence needs care.",
          "Validation errors with configurable coercion/default behaviors.",
          "Check runtime code-generation restrictions and supported schema dialects.",
        ],
      ],
      [
        "yup",
        "Yup",
        "https://github.com/jquense/yup",
        "https://github.com/jquense/yup/blob/master/LICENSE.md",
        ["Framework-agnostic"],
        "Schema builder for parsing and validating values.",
        "Transforms and conditional rules support form-oriented data shaping.",
        "Casting and defaults can alter values; review the output contract.",
        [
          "Code-defined schemas with chained rules.",
          "Infer output types and check schema compatibility with types.",
          "Casting, transforms and validation errors.",
          "Use with supported form integrations or standalone validation.",
        ],
      ],
    ]),
  },
  {
    label: "Backend frameworks",
    title: "JavaScript / TypeScript backend frameworks",
    path: "/javascript/backend/",
    introduction:
      "Compare API and server architecture. A backend framework does not supply a database, identity provider or production operations team.",
    note: "Validate requests, enforce authorization and manage secrets server-side. Verify runtime/adapter support for the actual deployment target and dependencies.",
    dimensions: [
      {
        label: "Architecture",
        explanation:
          "How much structure and dependency organization the framework prescribes.",
      },
      {
        label: "Validation & APIs",
        explanation:
          "Distinguish core capabilities from plugins, integrations and application code.",
      },
      {
        label: "Runtime",
        explanation:
          "Runtime compatibility can differ from the compatibility of your database driver and other packages.",
      },
      {
        label: "Operations",
        explanation:
          "Hosting, monitoring, authentication and background work still require decisions.",
      },
    ],
    tools: tools([
      [
        "express",
        "Express",
        "https://expressjs.com/en/starter/hello-world.html",
        "https://github.com/expressjs/express/blob/master/LICENSE",
        ["Framework-agnostic"],
        "Minimal Node.js web framework based on routes and middleware.",
        "Flexible composition with a wide middleware ecosystem.",
        "Validation, dependency organization and many conventions are your choices.",
        [
          "Routes and middleware with little enforced project structure.",
          "Add validation, API documentation and authentication integrations.",
          "Node.js; check the supported version for your Express release.",
          "You configure deployment, observability and application error handling.",
        ],
      ],
      [
        "fastify",
        "Fastify",
        "https://fastify.dev/docs/latest/Guides/Getting-Started/",
        "https://github.com/fastify/fastify/blob/main/LICENSE",
        ["Framework-agnostic"],
        "Node.js web framework built around routes, plugins and hooks.",
        "Schema-driven validation and serialization plus encapsulated plugins.",
        "Plugin scopes and schema behavior require deliberate design.",
        [
          "Encapsulated plugins, route hooks and schemas.",
          "JSON Schema validation/serialization; type providers and plugins extend it.",
          "Node.js; deployment adapters and dependencies must match your environment.",
          "Configure access rules, storage, logging and background processing.",
        ],
      ],
      [
        "nest",
        "NestJS",
        "https://docs.nestjs.com/",
        "https://github.com/nestjs/nest/blob/master/LICENSE",
        ["Framework-agnostic"],
        "Structured server framework with modules and dependency injection.",
        "Conventions organize larger applications and teams.",
        "Decorators, dependency injection and adapters add concepts and configuration.",
        [
          "Modules, controllers and providers with dependency injection.",
          "Pipes and integrations for validation and OpenAPI; install/configure dependencies.",
          "Node.js with Express by default or a supported alternative adapter.",
          "Configure infrastructure, auth policies, monitoring and failure handling.",
        ],
      ],
      [
        "hono",
        "Hono",
        "https://hono.dev/docs/",
        "https://github.com/honojs/hono/blob/main/LICENSE",
        ["Framework-agnostic"],
        "Web framework built around web-standard request/response APIs.",
        "Adapters connect a similar route model to different runtimes.",
        "Runtime portability does not make every dependency portable.",
        [
          "Routes and middleware around a request context.",
          "Validation helpers and schema/OpenAPI integrations.",
          "Supported runtimes through documented adapters; verify your dependencies.",
          "Configure deployment bindings, secrets, access and observability.",
        ],
      ],
    ]),
  },
  {
    label: "Database tools",
    title: "ORMs & query builders",
    path: "/javascript/database-tools/",
    introduction:
      "Compare tools that access databases, not database services. Select an actual database and compatible driver separately.",
    note: "No tool automatically provides hosting, backups or recovery. Migration safety, transactions, connection limits and authorization remain application responsibilities.",
    dimensions: [
      {
        label: "Tool type",
        explanation:
          "An ORM models persistence at a different level from a SQL query builder.",
      },
      {
        label: "Schema & migrations",
        explanation:
          "How schema changes are described and applied; generation is not a safety guarantee.",
      },
      {
        label: "Query model",
        explanation:
          "How types, SQL and relationships appear in application code.",
      },
      {
        label: "Runtime & drivers",
        explanation:
          "Use a documented database connector; serverless/edge environments may restrict connections.",
      },
    ],
    tools: tools([
      [
        "prisma",
        "Prisma ORM",
        "https://www.prisma.io/docs/orm",
        "https://github.com/prisma/prisma/blob/main/LICENSE",
        ["Framework-agnostic"],
        "Schema-oriented ORM with a generated client.",
        "Database models and typed queries share a defined workflow.",
        "Connector features, migrations and runtime setup differ by database and version.",
        [
          "ORM; distinct from separately offered Prisma services.",
          "Prisma schema and migration tooling for supported connectors.",
          "Generated typed client; raw queries when needed.",
          "Choose a supported database/adapter and configure connection management.",
        ],
      ],
      [
        "drizzle",
        "Drizzle ORM",
        "https://orm.drizzle.team/docs/overview",
        "https://github.com/drizzle-team/drizzle-orm/blob/main/LICENSE",
        ["Framework-agnostic"],
        "TypeScript-oriented SQL ORM and query tools.",
        "Keep SQL concepts visible while defining typed schemas.",
        "Driver choice and migration generation need review for your database.",
        [
          "SQL-oriented ORM/query APIs.",
          "TypeScript schemas; Drizzle Kit supplies companion migration tooling.",
          "SQL-like typed queries and supported relational APIs.",
          "Supported dialects and drivers; verify runtime compatibility per driver.",
        ],
      ],
      [
        "kysely",
        "Kysely",
        "https://kysely.dev/",
        "https://github.com/kysely-org/kysely/blob/master/LICENSE",
        ["Framework-agnostic"],
        "Type-safe SQL query builder.",
        "Compose SQL queries with TypeScript checks.",
        "It is not an entity ORM; database types must stay aligned with reality.",
        [
          "SQL query builder.",
          "Migration utilities; database type definitions are a separate responsibility.",
          "Typed SQL construction with raw SQL escape hatches.",
          "Dialect/driver determines supported databases and deployment constraints.",
        ],
      ],
      [
        "knex",
        "Knex",
        "https://knexjs.org/guide/",
        "https://github.com/knex/knex/blob/master/LICENSE",
        ["Framework-agnostic"],
        "SQL query builder with migration and schema utilities.",
        "Build queries and migrations without adopting an entity model.",
        "Type declarations do not provide the same guarantees as a fully modeled schema.",
        [
          "SQL query builder and schema utilities.",
          "Migrations and schema builder for supported databases.",
          "Chainable query construction and raw SQL.",
          "Node-oriented database drivers; configure pooling and connection limits.",
        ],
      ],
    ]),
  },
  {
    label: "Testing",
    title: "JavaScript / TypeScript testing",
    path: "/javascript/testing/",
    introduction:
      "Separate runners, UI helpers and browser automation. Several tools may belong in the same testing stack.",
    note: "A simulated DOM is not a real browser. Browser automation is not real-device certification, and no tool replaces meaningful assertions or backend integration tests.",
    dimensions: [
      {
        label: "Role",
        explanation:
          "A test runner, DOM helper and browser automation tool are complementary roles, not interchangeable products.",
      },
      {
        label: "Execution environment",
        explanation:
          "Node, simulated DOMs and actual browser engines reveal different failures.",
      },
      {
        label: "Integration",
        explanation:
          "What a project must configure around the tool and UI ecosystem.",
      },
      {
        label: "Diagnostics & CI",
        explanation:
          "Reports and traces help investigation, but tests still need stable setup and cleanup.",
      },
    ],
    tools: tools([
      [
        "vitest",
        "Vitest",
        "https://vitest.dev/guide/",
        "https://github.com/vitest-dev/vitest/blob/main/LICENSE",
        ["Framework-agnostic"],
        "Test runner integrated with Vite's tooling model.",
        "Unit tests, assertions and mocks with shared build configuration.",
        "DOM environments and browser-mode dependencies need explicit selection.",
        [
          "Runner for unit/integration tests; browser mode is a separate configuration.",
          "Node or configured DOM/browser environments.",
          "Use framework test helpers where needed.",
          "Reports, coverage integrations and configured browser-mode diagnostics.",
        ],
      ],
      [
        "jest",
        "Jest",
        "https://jestjs.io/docs/getting-started",
        "https://github.com/jestjs/jest/blob/main/LICENSE",
        ["Framework-agnostic"],
        "JavaScript test runner with assertions and mocking.",
        "An established testing model for application and library code.",
        "TypeScript transforms, ESM and DOM environments need compatible configuration.",
        [
          "Runner with assertions, mocks and snapshots.",
          "Node and separately configured DOM environments.",
          "Transform/build and framework helpers require setup.",
          "Reporting and coverage; keep snapshots reviewed and meaningful.",
        ],
      ],
      [
        "testing-library",
        "Testing Library",
        "https://testing-library.com/docs/",
        "https://github.com/testing-library/dom-testing-library/blob/main/LICENSE",
        ["React", "Vue", "Angular", "Framework-agnostic"],
        "Helpers for testing UI through user-facing DOM behavior.",
        "Semantic queries encourage tests based on accessible names and roles.",
        "It is not a runner or a guarantee that the UI is accessible.",
        [
          "UI testing helper family, not a standalone test runner.",
          "The DOM environment supplied by your runner/browser setup.",
          "Choose the framework package and user-event tooling.",
          "Query errors aid debugging; runner owns reports and coverage.",
        ],
      ],
      [
        "playwright",
        "Playwright",
        "https://playwright.dev/docs/intro",
        "https://github.com/microsoft/playwright/blob/main/LICENSE",
        ["Framework-agnostic"],
        "Browser automation and end-to-end test tooling.",
        "Exercise real user flows across Chromium, Firefox and WebKit.",
        "Browser binaries, runtime dependencies and test data require maintenance.",
        [
          "Browser automation with an integrated test runner.",
          "Actual supported browser engines.",
          "Run the app and provide isolated data/accounts for each test.",
          "Traces, screenshots and reports; close resources you start.",
        ],
      ],
      [
        "cypress",
        "Cypress",
        "https://docs.cypress.io/app/get-started/why-cypress",
        "https://github.com/cypress-io/cypress/blob/develop/LICENSE",
        ["Framework-agnostic"],
        "Browser-based component and end-to-end testing tools.",
        "Interactive runner helps develop and inspect application tests.",
        "Check supported browsers, component integrations and paid-service boundaries.",
        [
          "Browser end-to-end and component testing.",
          "Supported real browser environments; check current browser support.",
          "Component testing requires a supported framework/build integration.",
          "Runner diagnostics; Cypress Cloud is a separate offering.",
        ],
      ],
    ]),
  },
  {
    label: "Build tools",
    title: "Build tools",
    path: "/javascript/build/",
    introduction:
      "Compare development servers, bundlers and build engines by role. An application framework may already choose the toolchain.",
    note: "Transpiling TypeScript is not necessarily type-checking it. Run the compiler or another supported checking step; inspect production output rather than assuming unused code disappears.",
    dimensions: [
      {
        label: "Role",
        explanation:
          "Some tools provide an app workflow; others are engines used inside that workflow.",
      },
      {
        label: "Development",
        explanation:
          "What supplies the server, module updates and developer feedback.",
      },
      {
        label: "Configuration",
        explanation:
          "Plugin and framework integration can matter more than isolated build-engine features.",
      },
      {
        label: "Type checking",
        explanation:
          "Removing type syntax does not prove that the program satisfies its types.",
      },
    ],
    tools: tools([
      [
        "vite",
        "Vite",
        "https://vite.dev/guide/",
        "https://github.com/vitejs/vite/blob/main/LICENSE",
        ["Framework-agnostic"],
        "Frontend development server and production-build workflow.",
        "Framework plugins connect application development and builds.",
        "Framework support and build behavior depend on versions and plugins.",
        [
          "Application/library development and build tooling.",
          "Development server with module update support.",
          "Config file and plugins; frameworks may configure them for you.",
          "Transforms TypeScript; use a separate type-checking step.",
        ],
      ],
      [
        "webpack",
        "webpack",
        "https://webpack.js.org/concepts/",
        "https://github.com/webpack/webpack/blob/main/LICENSE",
        ["Framework-agnostic"],
        "Configurable module bundler with loaders and plugins.",
        "An extensible pipeline for complex module and asset requirements.",
        "Custom configurations can become an ongoing maintenance responsibility.",
        [
          "Module bundler.",
          "Development-server and update tooling through integrations.",
          "Loaders/plugins configure module and asset processing.",
          "Depends on loaders/plugins; configure type checking explicitly.",
        ],
      ],
      [
        "rollup",
        "Rollup",
        "https://rollupjs.org/introduction/",
        "https://github.com/rollup/rollup/blob/master/LICENSE.md",
        ["Framework-agnostic"],
        "JavaScript module bundler often used for libraries.",
        "Explicit output formats and plugin-based module processing.",
        "A full app development workflow needs surrounding tools.",
        [
          "Module bundler, not an application framework.",
          "Watch mode; app-server workflows require additional tooling.",
          "Input/output configuration and plugins.",
          "Use appropriate TypeScript integration and a checking step.",
        ],
      ],
      [
        "esbuild",
        "esbuild",
        "https://esbuild.github.io/",
        "https://github.com/evanw/esbuild/blob/main/LICENSE.md",
        ["Framework-agnostic"],
        "JavaScript/TypeScript transformation and bundling engine.",
        "CLI and APIs fit custom build pipelines.",
        "Does not supply all the application conventions of a higher-level toolchain.",
        [
          "Build engine and bundler.",
          "Watch/serve APIs; application tooling may wrap them.",
          "CLI/API options and plugins.",
          "Removes TypeScript syntax without type checking.",
        ],
      ],
    ]),
  },
];

export const javascriptTools = Object.fromEntries(
  javascriptTopics.flatMap((topic) =>
    topic.tools.map((tool) => [tool.id, tool]),
  ),
);
