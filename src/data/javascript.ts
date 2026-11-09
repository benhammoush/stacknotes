/**
 * Defines sourced JavaScript/TypeScript tool comparisons, separated by purpose and UI ecosystem.
 * @packageDocumentation
 */
import { frameworksTopic } from "./frameworks";

/** UI compatibility, not a claim that tools in different roles are interchangeable. */
export type Ecosystem =
  "React" | "Vue" | "Angular" | "Svelte" | "Remix" | "Framework-agnostic";

/** An explicit capability verdict, with package, configuration and runtime requirements. */
export interface FeatureFact {
  included: boolean;
  detail: string;
}

/** A comparable feature category, kept separate from its explanatory wording. */
export interface LabeledFact {
  label: string;
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
  category?: "Utility-first CSS" | "Animation" | "Icons";
  ecosystems: Ecosystem[];
  purpose: string;
  strength: string;
  limitation: string;
  facts: (FeatureFact | LabeledFact)[];
}

/** One comparison with topic-specific dimensions rather than provider-responsibility scores. */
export interface JavaScriptTopic {
  label: string;
  title: string;
  path: string;
  introduction: string;
  note: string;
  overviewPurpose?: { label: string; explanation: string };
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
  facts: [label: string, detail: string][],
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
  skeleton: "js-skeleton.ico",
  tailwind: "js-tailwind.svg",
  motion: "js-motion.png",
  gsap: "js-gsap.png",
  anime: "js-anime.png",
  autoanimate: "js-autoanimate.png",
  lucide: "js-lucide.png",
  heroicons: "js-heroicons.png",
  tabler: "js-tabler.ico",
  phosphor: "js-phosphor.png",
  "tanstack-query": "js-tanstack-start.svg",
  swr: "js-swr.svg",
  "rtk-query": "js-rtk-query.svg",
  apollo: "js-apollo.svg",
  urql: "js-urql.png",
  redux: "js-rtk-query.svg",
  zustand: "js-zustand.png",
  pinia: "js-pinia.png",
  ngrx: "js-ngrx.png",
  nanostores: "js-nanostores.svg",
  "react-hook-form": "js-react-hook-form.png",
  "tanstack-form": "js-tanstack-start.svg",
  "vee-validate": "js-vee-validate.ico",
  superforms: "js-superforms.png",
  jotai: "js-jotai.svg",
  axios: "js-axios.svg",
  formik: "js-formik.png",
  vuelidate: "js-vuelidate.png",
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

/** Styling discovery labels do not imply equivalent capabilities or native adapters. */
const stylingCategories: Record<string, JavaScriptTool["category"]> = {
  tailwind: "Utility-first CSS",
  motion: "Animation",
  gsap: "Animation",
  anime: "Animation",
  autoanimate: "Animation",
  lucide: "Icons",
  heroicons: "Icons",
  tabler: "Icons",
  phosphor: "Icons",
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
    ]): JavaScriptTool => ({
      id,
      name,
      url,
      license,
      logo: stackToolLogos[id],
      category: stylingCategories[id],
      licenseName:
        (
          {
            gsap: "GSAP Standard License",
            lucide: "ISC",
            primeng: "MIT (community); commercial/LTS terms vary",
            prisma: "Apache-2.0",
            drizzle: "Apache-2.0",
            playwright: "Apache-2.0",
            formik: "Apache-2.0",
          } as Record<string, string>
        )[id] ?? "MIT",
      ecosystems,
      purpose,
      strength,
      limitation,
      facts: facts.map(([label, detail]) => ({ label, detail })),
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
      { label: "Svelte", toolIds: ["skeleton"] },
    ],
    introduction:
      "Compare the visual character, UI controls and developer APIs of component suites for React, Vue, Angular and Svelte. These are curated choices, not a popularity ranking.",
    note: "Default look & feel describes the components themselves, not full-page templates. These are editorial impressions, not design-quality scores; themes and versions change their appearance. Compare candidates within your UI ecosystem. Matching feature labels do not promise identical controls or APIs. Companion packages, commercial products and selected-release terms have separate boundaries; check the exact table, date picker or other control you need. Coordinate package and framework upgrades, especially Angular/CDK major versions. Accessibility still requires labels, contrast, keyboard and screen-reader checks in your app. Compact sizing does not guarantee touch accessibility. Client form validation never replaces server validation or authorization.",
    overviewPurpose: {
      label: "Default look & feel",
      explanation:
        "The visual character and finish of the supplied components: spacing, typography, shapes, borders, elevation and interaction states. These are editorial descriptions, not objective quality rankings or full-page template comparisons. Themes and customization can change the result. This Overview row is never difference-highlighted.",
    },
    dimensions: [
      {
        label: "Component coverage",
        explanation:
          "Which practical UI needs the suite covers, including tables, date pickers, trees, uploads and complex inputs. Core components, companion packages and paid editions are not the same scope. Examples are not a complete inventory; check the specific component and feature you need.",
      },
      {
        label: "Design tokens & theming",
        explanation:
          "The shared design language: colors, typography, spacing, shape and light/dark schemes. Tokens may be JavaScript objects, CSS variables, Sass or Less variables. Global and component-level configuration differ; a theme API does not necessarily provide every token or runtime switching.",
      },
      {
        label: "Styling & customization APIs",
        explanation:
          "How you apply one-off styles or component-wide overrides: classes, style props, selectors, pass-through attributes and unstyled modes. This changes presentation; it is distinct from defining shared tokens or replacing component structure. Use documented APIs instead of relying on private DOM details.",
      },
      {
        label: "Component composition",
        explanation:
          "How you assemble or extend components using React children/render props, Vue slots, Angular templates and content projection. Replacement APIs differ per component; passing attributes to an internal element does not necessarily let you replace that element or its behavior.",
      },
      {
        label: "Interaction utilities",
        explanation:
          "Reusable behavior beyond rendered controls: hooks, composables, directives, overlay services and CDK primitives. A standalone helper package can support your own components, whereas a component-specific hook or service has narrower scope. Install the named companion package where needed.",
      },
      {
        label: "Forms & validation integration",
        explanation:
          "How inputs connect to field values, validation and error presentation: controlled props, Vue bindings, Angular forms, an integrated form engine or a companion package. UI validation is not server validation or authorization. Adapters and schemas must match your chosen library versions.",
      },
      {
        label: "Responsive & density options",
        explanation:
          "Which layout breakpoints, responsive props, size variants and density controls help adapt the interface. Component sizes are not the same as a responsive page layout, and compact density is not a guarantee of adequate touch targets. Some layouts still require your CSS or framework utilities.",
      },
      {
        label: "Accessibility support",
        explanation:
          "Concrete supplied behavior such as keyboard navigation, focus trapping/restoration, roles and accessible-name hooks. Support is component-specific, not a certification or a claim that every component behaves identically. Your application still owns labels, contrast, error announcements and assistive-technology testing.",
      },
      {
        label: "TypeScript & developer experience",
        explanation:
          "Typed component props, events, templates and documented examples that help author and discover APIs. Framework template tooling, generic types and custom-component boundaries affect what can be checked. Type definitions and autocomplete do not validate untrusted data or prove accessibility.",
      },
    ],
    tools: tools([
      [
        "mui",
        "MUI Material UI",
        "https://mui.com/material-ui/getting-started/",
        "https://github.com/mui/material-ui/blob/master/LICENSE",
        ["React"],
        "Material-style controls with distinct surfaces, typography and elevation.",
        "A coordinated set of controls and theme APIs.",
        "Distinct MUI X packages and paid editions have separate boundaries.",
        [
          [
            "Core + companion packages",
            "Inputs, dialogs, tables and autocomplete in Material UI; MUI X adds date/grid packages with community and paid features.",
          ],
          [
            "Theme tokens + CSS variables",
            "Palette, typography, spacing and shape through the theme; CSS variables and color schemes support light/dark designs.",
          ],
          [
            "Styles / component overrides",
            "sx, styled, state classes and theme styleOverrides/variants; target documented component slots.",
          ],
          [
            "Children / replaceable slots",
            "Compose React children; slots and slotProps replace or configure supported internals, with per-component typing limits.",
          ],
          [
            "Targeted hooks",
            "useMediaQuery and useAutocomplete support responsive behavior and custom autocomplete UI; not a general-purpose hook collection.",
          ],
          [
            "External form state",
            "Controlled inputs, FormControl and helper/error text; connect a form-state library and validation rules separately.",
          ],
          [
            "Breakpoints + sizing",
            "Responsive layout/style props, theme breakpoints and small control variants; you still design touch-friendly layouts.",
          ],
          [
            "Keyboard / focus support",
            "Dialog focus handling and documented keyboard/ARIA behavior; preserve supplied props and provide accessible names.",
          ],
          [
            "Typed React APIs",
            "Typed component props, theme augmentation and TS examples; custom slots and polymorphic components may need extra typing.",
          ],
        ],
      ],
      [
        "ant-design",
        "Ant Design",
        "https://ant.design/docs/react/introduce",
        "https://github.com/ant-design/ant-design/blob/master/LICENSE",
        ["React"],
        "Restrained, utilitarian business UI with compact controls and understated decoration.",
        "Coordinated forms, tables and application controls.",
        "Opinionated design; related Ant products have separate scope.",
        [
          [
            "Broad suite",
            "Tables, trees, date pickers, uploads and coordinated forms in antd; related Ant products have separate scope.",
          ],
          [
            "Theme tokens + CSS variables",
            "Global/alias and component tokens through ConfigProvider; theme algorithms support dark and compact configurations.",
          ],
          [
            "Styles / component overrides",
            "Tokens plus semantic classNames/styles for supported component internals; APIs vary by component and release.",
          ],
          [
            "Children / render APIs",
            "Compose React children and documented render callbacks/component overrides; not every internal element is replaceable.",
          ],
          [
            "Targeted hooks",
            "Form.useForm/useWatch, Grid.useBreakpoint and context-aware feedback APIs support forms, layouts and notifications.",
          ],
          [
            "Integrated form engine",
            "Form manages field values, rules, dependencies and errors; custom controls must follow its value/event contract.",
          ],
          [
            "Breakpoints + sizing",
            "Responsive Grid, breakpoint hooks, control sizes and compact theme/Space options support dense business layouts.",
          ],
          [
            "Keyboard / focus support",
            "Dialog focus management and control keyboard behavior; verify accessible names and custom table/form composition.",
          ],
          [
            "Typed React APIs",
            "Typed component props, form values and table columns with TS examples; application data and custom renderers still need types.",
          ],
        ],
      ],
      [
        "mantine",
        "Mantine",
        "https://mantine.dev/getting-started/",
        "https://github.com/mantinedev/mantine/blob/master/LICENSE",
        ["React"],
        "Clean, softly rounded controls with restrained surfaces and consistent spacing.",
        "UI components plus reusable interaction hooks for building custom behavior.",
        "Package styles and themes must fit your build and design.",
        [
          [
            "Core + companion packages",
            "Inputs, dialogs, Combobox and basic tables in core; dates, notifications and other extensions use companion packages.",
          ],
          [
            "Theme tokens + CSS variables",
            "Theme colors, spacing, radii and typography map to CSS variables; color-scheme APIs support light/dark UI.",
          ],
          [
            "Styled / unstyled APIs",
            "Styles API selectors, classNames, styles and vars customize internals; unstyled mode removes supplied styling.",
          ],
          [
            "Compound / polymorphic APIs",
            "Compound components and polymorphic component/renderRoot APIs support custom composition; availability varies by control.",
          ],
          [
            "Standalone hook collection",
            "@mantine/hooks provides reusable disclosure, debounce, click-outside, hotkey and media-query hooks, usable without the UI suite.",
          ],
          [
            "Companion form package",
            "@mantine/form supplies field state, nested values and validation; getInputProps connects controls, with schema adapters as needed.",
          ],
          [
            "Breakpoints + sizing",
            "Responsive style/layout props, theme breakpoints and component size variants; JS media-query hooks need SSR care.",
          ],
          [
            "Keyboard / focus support",
            "FocusTrap/FocusReturn and focus hooks support overlays; Combobox keyboard behavior and accessible labels need correct composition.",
          ],
          [
            "Typed React APIs",
            "Typed props, theme extensions and hook/form generics; polymorphic wrappers need appropriate component/ref types.",
          ],
        ],
      ],
      [
        "primevue",
        "PrimeVue",
        "https://primevue.dev/installation/",
        "https://github.com/primefaces/primevue/blob/master/LICENSE.md",
        ["Vue"],
        "Visually detailed controls with rounded surfaces and clearly differentiated interaction states.",
        "A broad control collection with theme options.",
        "Templates, themes and commercial extras need separate evaluation.",
        [
          [
            "Broad suite",
            "DataTable, TreeTable, date pickers, upload and complex inputs; integrations and commercial add-ons have separate boundaries.",
          ],
          [
            "Theme tokens + CSS variables",
            "Primitive, semantic and component tokens feed styled-mode CSS variables, including light/dark schemes.",
          ],
          [
            "Styled / unstyled APIs",
            "Design tokens, Pass Through attributes/classes and unstyled mode customize presentation without private DOM selectors.",
          ],
          [
            "Slots / templates",
            "Vue slots customize cells, items and selected content; Pass Through configures internals rather than universally replacing them.",
          ],
          [
            "Composables / directives",
            "useToast/useConfirm and directives such as focus trapping and ripple support feedback and interaction behavior.",
          ],
          [
            "Companion form package",
            "@primevue/forms adds state, validation triggers and schema resolvers; components also expose Vue value bindings.",
          ],
          [
            "Component sizing + layout CSS",
            "Fluid widths and size variants on supported controls; responsive layouts combine component options with your CSS/utilities.",
          ],
          [
            "Keyboard / focus support",
            "Control-specific screen-reader and keyboard guidance, plus focus-trap support; supply labels and test custom templates.",
          ],
          [
            "Typed Vue APIs",
            "Typed props, events, Pass Through options and form state APIs; use Vue template tooling for application-level checks.",
          ],
        ],
      ],
      [
        "vuetify",
        "Vuetify",
        "https://vuetifyjs.com/en/introduction/why-vuetify/",
        "https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetify/LICENSE.md",
        ["Vue"],
        "Material-style surfaces, prominent controls and coordinated elevation and transitions.",
        "Shared layout, theme and control conventions.",
        "A Material-oriented design can require substantial customization for another visual language.",
        [
          [
            "Broad suite",
            "Data tables, date controls, forms and application layout components; check release/Labs status and commercial service boundaries.",
          ],
          [
            "Theme variables + Sass",
            "Named themes and color variables support light/dark schemes; Sass settings control additional design defaults.",
          ],
          [
            "Styles / component overrides",
            "Component props, defaults, utility classes, CSS and Sass settings customize the supplied Material styling.",
          ],
          [
            "Slots / templates",
            "Named/scoped slots and activator props customize content and behavior; preserve bindings required by overlays.",
          ],
          [
            "Composables / directives",
            "useDisplay/useTheme and directives such as ripple, intersection and resize help implement responsive interactions.",
          ],
          [
            "Integrated form engine",
            "v-form and input rules coordinate validation; supply rules or integrate an external validation library when needed.",
          ],
          [
            "Breakpoints + density",
            "Responsive grid/useDisplay plus size and density props on supported controls; compact density changes control height.",
          ],
          [
            "Keyboard / focus support",
            "Overlay focus behavior and keyboard-capable controls; custom activators/slots must preserve accessibility bindings.",
          ],
          [
            "Typed Vue APIs",
            "Typed component APIs and composables, with API documentation/examples; template and slot checks depend on Vue tooling.",
          ],
        ],
      ],
      [
        "element-plus",
        "Element Plus",
        "https://element-plus.org/en-US/guide/installation.html",
        "https://github.com/element-plus/element-plus/blob/dev/LICENSE",
        ["Vue"],
        "Light, restrained business controls with fine borders and familiar desktop-form proportions.",
        "Broad forms, tables and navigation controls.",
        "Check Vue, browser and Sass compatibility when upgrading.",
        [
          [
            "Broad suite",
            "Tables, virtualized table/tree controls, date pickers, upload and forms; check each control's stability and limitations.",
          ],
          [
            "Theme variables + Sass",
            "CSS custom properties and Sass theme variables customize colors, spacing and dark-mode styles.",
          ],
          [
            "Styles / component overrides",
            "Documented CSS variables, classes, style props and Sass overrides; internal DOM overrides can be version-sensitive.",
          ],
          [
            "Slots / templates",
            "Scoped slots customize table cells, options and content; exposed component methods support controlled interactions.",
          ],
          [
            "Services / directives",
            "Loading directive/service and Message/Notification services provide feedback behavior; not a standalone general hook collection.",
          ],
          [
            "Integrated form engine",
            "Form/FormItem bind a model and async-validator rules, with validation, reset and error-display APIs.",
          ],
          [
            "Breakpoints + sizing",
            "Responsive layout columns and global/component sizes support dense forms; page-level adaptation remains application work.",
          ],
          [
            "Keyboard / focus support",
            "Dialog focus handling and component ARIA/keyboard APIs; grouped form inputs still require individual accessible names.",
          ],
          [
            "Typed Vue APIs",
            "Typed props, component instances and FormRules generics with TS examples; use Vue template tooling to check bindings.",
          ],
        ],
      ],
      [
        "angular-material",
        "Angular Material",
        "https://material.angular.dev/",
        "https://github.com/angular/components/blob/main/LICENSE",
        ["Angular"],
        "Material-style controls with systematic typography, surfaces and interaction states.",
        "First-party ecosystem alignment and reusable behavior utilities.",
        "Component and Angular versions must remain compatible.",
        [
          [
            "Core + CDK",
            "Material tables, date pickers, trees and inputs plus separate CDK building blocks; not an all-in-one advanced data-grid suite.",
          ],
          [
            "Material tokens + Sass",
            "Material color, typography and density through Sass theme APIs and generated system/component tokens; light/dark schemes supported.",
          ],
          [
            "Styles / component overrides",
            "Public theme/override mixins and supported CSS tokens customize controls; avoid private DOM or class overrides.",
          ],
          [
            "Projection / templates",
            "Angular content projection, templates and custom form-field controls extend supported components; CDK builds lower-level behavior.",
          ],
          [
            "CDK primitives",
            "@angular/cdk supplies overlay, portal, drag/drop, scrolling, layout and accessibility primitives beyond Material components.",
          ],
          [
            "Angular forms integration",
            "Integrates with Angular forms, error states and custom form-field controls; application validators enforce the rules.",
          ],
          [
            "Breakpoints + density",
            "CDK BreakpointObserver and theme density support layout decisions and compact controls; page layout remains yours.",
          ],
          [
            "Keyboard / focus support",
            "CDK FocusTrap, FocusMonitor and LiveAnnouncer plus component keyboard behavior; use correct labels and semantic structure.",
          ],
          [
            "Typed Angular APIs",
            "Typed inputs/outputs, Angular template checking and component harnesses; align Material/CDK and Angular versions.",
          ],
        ],
      ],
      [
        "primeng",
        "PrimeNG",
        "https://primeng.org/installation",
        "https://github.com/primefaces/primeng/blob/master/LICENSE.md",
        ["Angular"],
        "Polished, visually detailed controls with rounded shapes and distinct hover, focus and selection states.",
        "Broad ready-made controls with detailed styling and customization APIs.",
        "Version/edition terms differ; current setup documents a license key.",
        [
          [
            "Broad suite",
            "Table, TreeTable, date pickers, upload and complex inputs; editor/chart dependencies and commercial offerings need separate evaluation.",
          ],
          [
            "Theme tokens + CSS variables",
            "Primitive, semantic and component tokens generate CSS variables; color schemes and scoped tokens customize the design system.",
          ],
          [
            "Styled / unstyled APIs",
            "Tokens, documented styles/Pass Through APIs and unstyled integration customize internals; support varies by component/version.",
          ],
          [
            "Projection / templates",
            "Angular templates customize cells, items, headers and icons; Pass Through configures supported internals, not arbitrary replacements.",
          ],
          [
            "Services / directives",
            "MessageService/ConfirmationService and FocusTrap, Ripple and related directives support feedback and interaction behavior.",
          ],
          [
            "Angular forms integration",
            "Inputs integrate with template-driven and reactive forms; Angular validators drive invalid states and application error messages.",
          ],
          [
            "Component sizing + layout CSS",
            "Fluid containers and small/large control variants; responsive page layouts still need your CSS or utility framework.",
          ],
          [
            "Keyboard / focus support",
            "Per-component screen-reader/keyboard guidance and FocusTrap support; preserve accessible names in custom templates.",
          ],
          [
            "Typed Angular APIs",
            "Typed component inputs/outputs and Angular examples; enable template checks and verify APIs against the selected release.",
          ],
        ],
      ],
      [
        "ng-zorro",
        "NG-ZORRO",
        "https://ng.ant.design/docs/introduce/en",
        "https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE",
        ["Angular"],
        "Restrained Ant-style business UI with compact proportions, fine borders and subdued decoration.",
        "Business-app controls, theming and internationalization.",
        "Coordinate its major version with Angular; Ant Design is opinionated.",
        [
          [
            "Broad suite",
            "Tables, trees, date pickers, uploads and business-app form controls; coordinate the selected release with Angular.",
          ],
          [
            "Less theme variables",
            "Less variables define colors, borders and shape; supplied dark/compact styles and dynamic-theme guidance differ from React antd tokens.",
          ],
          [
            "Styles / component overrides",
            "Less variable overrides, global configuration and supported component style APIs; do not assume React antd's APIs are identical.",
          ],
          [
            "Projection / templates",
            "Angular templates/content projection customize cells, options and embedded content; supported extension points vary by control.",
          ],
          [
            "Services / CDK integration",
            "Modal, message and notification services expose feedback workflows; CDK supports underlying overlay/interaction behavior.",
          ],
          [
            "Angular forms integration",
            "Form controls connect to Angular forms and validation states; application validators and error presentation remain explicit.",
          ],
          [
            "Breakpoints + sizing",
            "Responsive Grid, control sizes and a compact theme support dense business UIs; verify touch targets in the finished layout.",
          ],
          [
            "Keyboard / focus support",
            "Component keyboard and dialog-focus behavior require correct labels and custom-template composition; test assistive-technology flows.",
          ],
          [
            "Typed Angular APIs",
            "TypeScript component APIs and Angular template tooling support bindings; check framework-major compatibility.",
          ],
        ],
      ],
      [
        "skeleton",
        "Skeleton",
        "https://www.skeleton.dev/docs/svelte/get-started/introduction",
        "https://github.com/skeletonlabs/skeleton/blob/main/LICENSE",
        ["Svelte"],
        "Theme-led, colorful surfaces with rounded controls and utility-driven spacing; headless controls need explicit styling.",
        "A Tailwind design system with Svelte interaction components powered by Zag.js.",
        "Requires Tailwind and Svelte-specific packages; form logic and advanced data-grid behavior are separate.",
        [
          [
            "Design system + controls",
            "Tailwind buttons, cards, forms and tables plus Svelte dialogs, comboboxes, date pickers, uploads and trees; styled tables are not an advanced data grid.",
          ],
          [
            "CSS variables / tokens",
            "Theme colors, typography, spacing and shape tokens with light/dark styling and theme presets.",
          ],
          [
            "Utility classes + CSS",
            "Tailwind classes and CSS variables customize component parts; headless controls such as Dialog require explicit styles.",
          ],
          [
            "Snippets / compound parts",
            "Svelte snippets and compound component parts customize content and rendered elements.",
          ],
          [
            "Zag.js interactions",
            "Framework components wrap Zag.js state machines; dialog, portal and overlay APIs support explicit interaction composition.",
          ],
          [
            "External form logic",
            "Form/input utility classes require @tailwindcss/forms; wire values, validation and errors with Svelte or a form library.",
          ],
          [
            "Utilities + sizing",
            "Responsive Tailwind utilities and element-size/spacing tokens control layouts and density; check touch targets.",
          ],
          [
            "Keyboard / focus support",
            "Dialog APIs provide focus trapping/restoration and Escape handling; application labels, styling and assistive-technology checks remain required.",
          ],
          [
            "Typed Svelte APIs",
            "@skeletonlabs/skeleton-svelte exposes typed props and snippet composition; coordinate Svelte, Tailwind and Skeleton versions.",
          ],
        ],
      ],
    ]),
    sources: [
      {
        label: "Skeleton Svelte installation and design system",
        url: "https://www.skeleton.dev/docs/svelte/get-started/installation",
      },
      {
        label: "Skeleton tokens and sizing utilities",
        url: "https://www.skeleton.dev/docs/svelte/get-started/core-api",
      },
      {
        label: "Skeleton headless dialog, composition and focus APIs",
        url: "https://www.skeleton.dev/docs/svelte/framework-components/dialog",
      },
      {
        label: "Skeleton form styling and Tailwind forms plugin",
        url: "https://www.skeleton.dev/docs/svelte/tailwind-components/forms",
      },
      {
        label: "MUI theming and CSS variables",
        url: "https://mui.com/material-ui/customization/theming/",
      },
      {
        label: "MUI component structure and slots",
        url: "https://mui.com/material-ui/customization/overriding-component-structure/",
      },
      {
        label: "MUI autocomplete and interaction hook",
        url: "https://mui.com/material-ui/react-autocomplete/",
      },
      {
        label: "MUI X package and license boundaries",
        url: "https://mui.com/x/introduction/",
      },
      {
        label: "Ant Design tokens and theme algorithms",
        url: "https://ant.design/docs/react/customize-theme/",
      },
      {
        label: "Ant Design form APIs and rules",
        url: "https://ant.design/components/form/",
      },
      {
        label: "Ant Design responsive grid and breakpoint hook",
        url: "https://ant.design/components/grid/",
      },
      {
        label: "Mantine Styles API and component variables",
        url: "https://mantine.dev/styles/styles-api/",
      },
      {
        label: "Mantine standalone hooks",
        url: "https://mantine.dev/hooks/package/",
      },
      {
        label: "Mantine form package",
        url: "https://mantine.dev/form/package/",
      },
      {
        label: "Mantine polymorphic composition",
        url: "https://mantine.dev/guides/polymorphic/",
      },
      {
        label: "PrimeVue styled tokens",
        url: "https://primevue.org/theming/styled/",
      },
      {
        label: "PrimeVue Pass Through",
        url: "https://primevue.org/passthrough/",
      },
      {
        label: "PrimeVue companion form package",
        url: "https://primevue.org/forms/",
      },
      {
        label: "Vuetify theme configuration",
        url: "https://vuetifyjs.com/en/features/theme/",
      },
      {
        label: "Vuetify text-field slots, sizes and density",
        url: "https://vuetifyjs.com/en/components/text-fields/",
      },
      {
        label: "Vuetify form validation",
        url: "https://vuetifyjs.com/en/components/forms/",
      },
      {
        label: "Element Plus CSS and Sass theming",
        url: "https://element-plus.org/en-US/guide/theming.html",
      },
      {
        label: "Element Plus form rules, types and sizes",
        url: "https://element-plus.org/en-US/component/form.html",
      },
      {
        label: "Element Plus dialog focus and accessibility",
        url: "https://element-plus.org/en-US/component/dialog.html",
      },
      {
        label: "Angular Material tokens and density",
        url: "https://material.angular.dev/guide/theming",
      },
      {
        label: "Angular Material custom form-field controls",
        url: "https://material.angular.dev/guide/creating-a-custom-form-field-control",
      },
      {
        label: "Angular CDK interaction primitives",
        url: "https://material.angular.dev/cdk/categories",
      },
      {
        label: "PrimeNG styled design tokens",
        url: "https://primeng.org/theming/styled",
      },
      { label: "PrimeNG Pass Through", url: "https://primeng.org/passthrough" },
      {
        label: "PrimeNG form bindings and input sizes",
        url: "https://primeng.org/inputtext",
      },
      {
        label: "NG-ZORRO Less themes and compact styles",
        url: "https://ng.ant.design/docs/customize-theme/en",
      },
      {
        label: "NG-ZORRO Angular form integration",
        url: "https://ng.ant.design/components/form/en",
      },
    ],
  },
  {
    label: "Styling",
    title: "Styling tools",
    path: "/javascript/styling/",
    sources: [
      {
        label: "Tailwind framework build integrations",
        url: "https://tailwindcss.com/docs/installation/using-vite",
      },
      {
        label: "Motion JavaScript quick start",
        url: "https://motion.dev/docs/quick-start",
      },
      {
        label: "GSAP framework integration and cleanup",
        url: "https://gsap.com/resources/frameworks/",
      },
      {
        label: "Anime.js framework lifecycle example",
        url: "https://animejs.com/documentation/getting-started/using-with-react/",
      },
    ],
    introduction:
      "Explore Tailwind CSS, animation tools and icon collections in one table. These tools serve different purposes and can complement each other; no feature ranking is implied.",
    note: "Tailwind produces CSS through a configured build integration. Motion has JavaScript and React APIs; GSAP and Anime.js expose generic JavaScript/DOM APIs, with framework lifecycle integration and cleanup required. AutoAnimate offers React/Vue adapters and a generic DOM API. Icon collections provide SVG assets that can be used across frameworks; Heroicons provides React/Vue packages, while other collections have their own ecosystem packages. Select the maintained package for your framework and release, or use SVG directly; not every framework has a native package and these are not integration-tested pairings. Import only needed icons and inspect bundle output. Respect reduced-motion preferences and clean up effects on navigation. Check responsive behavior, contrast and focus in your design. Decorative icons need empty alternatives or aria-hidden; icon-only controls need accessible names. Core licenses do not cover every paid product or asset notice.",
    dimensions: [],
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
        [],
      ],
      [
        "motion",
        "Motion",
        "https://motion.dev/docs",
        "https://github.com/motiondivision/motion/blob/main/LICENSE.md",
        ["React", "Framework-agnostic"],
        "Animation tools with JavaScript and React APIs.",
        "Declarative animation and interaction APIs for UI work.",
        "Capabilities and paid offerings differ across packages and integrations.",
        [],
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
        [],
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
        [],
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
        [],
      ],
      [
        "lucide",
        "Lucide",
        "https://lucide.dev/guide/",
        "https://github.com/lucide-icons/lucide/blob/main/LICENSE",
        ["Framework-agnostic"],
        "Open icon collection with a consistent stroke style.",
        "SVG assets and framework packages support varied integrations.",
        "The outlined visual style may not match a filled icon language.",
        [],
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
        [],
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
        [],
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
        [],
      ],
    ]),
  },
  {
    label: "State management",
    sources: [
      {
        label: "Nano Stores Svelte store contract and runes integration",
        url: "https://github.com/nanostores/nanostores#svelte",
      },
      {
        label: "Redux asynchronous workflow helpers",
        url: "https://redux-toolkit.js.org/api/createAsyncThunk",
      },
      {
        label: "Zustand persistence middleware",
        url: "https://zustand.docs.pmnd.rs/reference/middlewares/persist",
      },
      {
        label: "Zustand DevTools middleware",
        url: "https://zustand.docs.pmnd.rs/reference/middlewares/devtools",
      },
      {
        label: "Pinia computed getters",
        url: "https://pinia.vuejs.org/core-concepts/getters.html",
      },
      {
        label: "Pinia asynchronous actions",
        url: "https://pinia.vuejs.org/core-concepts/actions.html",
      },
      {
        label: "Pinia plugins and storage integration",
        url: "https://pinia.vuejs.org/core-concepts/plugins.html",
      },
      {
        label: "NgRx separate Effects package",
        url: "https://ngrx.io/guide/effects",
      },
      {
        label: "NgRx separate Store Devtools package",
        url: "https://ngrx.io/guide/store-devtools",
      },
      {
        label: "Nano Stores persistence companion",
        url: "https://github.com/nanostores/persistent",
      },
      {
        label: "Nano Stores logger companion",
        url: "https://github.com/nanostores/logger",
      },
      {
        label: "Jotai asynchronous atoms",
        url: "https://jotai.org/docs/guides/async",
      },
      {
        label: "Jotai bundled storage utilities",
        url: "https://jotai.org/docs/utilities/storage",
      },
      {
        label: "Jotai separate DevTools package",
        url: "https://jotai.org/docs/tools/devtools",
      },
    ],
    title: "State management",
    path: "/javascript/state/",
    introduction:
      "Share application state such as preferences and selections. Framework state may already be enough; API-data caching belongs in Data fetching.",
    note: "Every entry here is an optional library; framework-provided state belongs in Frameworks & libraries, not this comparison. Built-in means supplied behavior, Configurable means enable or define rules, Add-on means a separate package, and Manual means application code. Shared application state is not the same as local component state, URL state or an API-data cache. RTK Query is a separate Redux Toolkit capability compared in Data fetching. Redux and Zustand have framework-independent cores; React needs the appropriate binding. NgRx Store is separately installed, not an Angular default, and is distinct from NgRx SignalStore. Effects and Store Devtools are companion packages. Async actions in Zustand and Pinia are supported, but application code coordinates the work and its pending/error state; they are not complete workflow engines. Jotai provides derived/async atoms, bundled storage utilities and a separate DevTools package; async UI still needs pending/error handling. Persistence needs storage selection, hydration, versioning and cleanup; browser storage is not a database or a safe place for secrets. DevTools integrations may need a browser extension and development build. Persisting state does not enforce authorization. Isolate user-specific stores during server rendering; framework state may already suffice.",
    overviewPurpose: {
      label: "Best fit & scope",
      explanation:
        "How each optional library organizes shared application state. Reducer-based stores, direct-action stores and atoms have different setup and debugging models. These choices are not a requirement for every app; framework-provided capabilities are explained in Frameworks & libraries.",
    },
    columnGroups: [
      {
        label: "Stores & reducers",
        toolIds: ["redux", "zustand", "pinia", "ngrx"],
      },
      { label: "Atomic state", toolIds: ["nanostores", "jotai"] },
    ],
    dimensions: [
      {
        label: "Shared application state",
        explanation:
          "Share values between components without passing them through every parent. The application still chooses store/provider boundaries, subscriptions and lifecycle. Matching atoms or stores must use the intended scope. Sharing does not persist state or provide a remote-data cache. Server-side state must be isolated per user/request.",
      },
      {
        label: "Derived values",
        explanation:
          "Calculate values from existing state, such as filtered items or a total. Some tools track reactive dependencies, while others use explicitly defined selectors and memoization helpers. Built-in APIs still need application-authored calculations. Zustand selectors do not automatically provide a separate memoized computation graph.",
      },
      {
        label: "Async workflows",
        explanation:
          "Coordinate asynchronous work and its effects on state, not automatic API-data caching. Redux Toolkit supplies thunk/listener helpers; NgRx Effects is a separate package. Zustand and Pinia support async actions, but the application writes orchestration and pending/error updates. Nano Stores supplies task helpers; Jotai supports async atoms with application-defined pending/error UI. None replaces request handling or business-specific failure logic.",
      },
      {
        label: "Persistence",
        explanation:
          "Keep selected state after a reload. Zustand supplies persist middleware and Jotai supplies atomWithStorage utilities; other tools may use companion packages/plugins or custom storage code. Add-on is an available integration path, not a mandatory dependency. Choose what to store, handle hydration and schema changes, and clear user data on logout. Browser storage is not a database, does not authorize access and must not expose secrets.",
      },
      {
        label: "Debugging",
        explanation:
          "Inspect state changes with development tools. Bundled integrations may need configuration and a separately installed browser extension; Add-on here means a separate application package. NgRx Store Devtools, Nano Stores logging and jotai-devtools are companions. Different tools expose different snapshots, logs and time-travel behavior; availability depends on the integration and build mode.",
      },
    ],
    tools: tools([
      [
        "redux",
        "Redux Toolkit",
        "https://redux-toolkit.js.org/introduction/getting-started",
        "https://github.com/reduxjs/redux-toolkit/blob/master/LICENSE",
        ["React", "Framework-agnostic"],
        "Structured application state with actions, slices and reducers.",
        "Structured state updates and established debugging conventions.",
        "Store, slice and selector conventions can be more structure than a small app needs.",
        [
          ["Built-in", "Shared Redux store; React uses React Redux bindings."],
          ["Configurable", "Define selectors; memoization helpers supplied."],
          [
            "Configurable",
            "Thunk and listener helpers; implement the async operation.",
          ],
          ["Add-on", "Persistence integration, or write custom storage code."],
          [
            "Configurable",
            "Redux DevTools integration; browser extension needed.",
          ],
        ],
      ],
      [
        "zustand",
        "Zustand",
        "https://zustand.docs.pmnd.rs/learn/getting-started/introduction.html",
        "https://github.com/pmndrs/zustand/blob/main/LICENSE",
        ["React", "Framework-agnostic"],
        "Small stores with direct actions and React or vanilla APIs.",
        "Direct store access and selective subscriptions.",
        "Store boundaries and update conventions are your design decisions.",
        [
          ["Built-in", "Shared stores and selective subscriptions."],
          [
            "Configurable",
            "Read derived values through application-defined selectors.",
          ],
          ["Manual", "Write async actions and their pending/error updates."],
          [
            "Configurable",
            "Bundled persist middleware; plan storage and hydration.",
          ],
          ["Configurable", "DevTools middleware; browser extension needed."],
        ],
      ],
      [
        "pinia",
        "Pinia",
        "https://pinia.vuejs.org/introduction.html",
        "https://github.com/vuejs/pinia/blob/v3/LICENSE",
        ["Vue"],
        "Vue stores with reactive getters and actions.",
        "Vue-oriented stores and development-tool integration.",
        "You still design store scope, side effects and persistence.",
        [
          ["Built-in", "Shared Vue stores; follow Nuxt setup when used there."],
          ["Built-in", "Getters track reactive dependencies."],
          ["Manual", "Write async actions and their pending/error updates."],
          ["Add-on", "Persistence plugin, or write custom storage code."],
          [
            "Configurable",
            "Vue DevTools integration; extension/setup required.",
          ],
        ],
      ],
      [
        "ngrx",
        "NgRx Store",
        "https://ngrx.io/guide/store",
        "https://github.com/ngrx/platform/blob/main/LICENSE",
        ["Angular"],
        "Event-driven Angular stores; optional, not Angular's default.",
        "Explicit event-driven state and Angular ecosystem integrations.",
        "Actions, reducers, selectors and effects introduce architectural concepts.",
        [
          ["Built-in", "Shared observable store with actions and reducers."],
          ["Built-in", "Memoized selector APIs; supply the calculation."],
          ["Add-on", "Install Effects for side-effect workflows."],
          [
            "Manual",
            "Implement storage synchronization or choose an integration.",
          ],
          ["Add-on", "Separate Store Devtools package and browser extension."],
        ],
      ],
      [
        "nanostores",
        "Nano Stores",
        "https://github.com/nanostores/nanostores",
        "https://github.com/nanostores/nanostores/blob/main/LICENSE",
        ["React", "Vue", "Svelte", "Framework-agnostic"],
        "Small stores for components or islands across UI frameworks.",
        "Share state across isolated components or UI islands.",
        "Select integrations and organize stores carefully as the app grows.",
        [
          ["Built-in", "Shared atoms/maps; use the appropriate UI binding."],
          ["Built-in", "Computed stores with tracked dependencies."],
          [
            "Configurable",
            "Task helpers; write the operation and failure handling.",
          ],
          ["Add-on", "Separate persistent-store package."],
          ["Add-on", "Logger/devtools companion integrations."],
        ],
      ],
      [
        "jotai",
        "Jotai",
        "https://jotai.org/docs/introduction",
        "https://github.com/pmndrs/jotai/blob/main/LICENSE",
        ["React"],
        "Atomic React state with derived values and async atoms.",
        "Compose small atoms with tracked dependencies and selective updates.",
        "Design atom/provider scope, async feedback and storage hydration.",
        [
          ["Built-in", "Shared atoms within the chosen store/provider scope."],
          ["Built-in", "Derived atoms track dependencies."],
          [
            "Configurable",
            "Async atoms; supply pending/error UI and operation logic.",
          ],
          ["Configurable", "Bundled atomWithStorage utility; plan hydration."],
          ["Add-on", "Install jotai-devtools for development inspection."],
        ],
      ],
    ]),
  },
  {
    label: "Data fetching",
    sources: [
      {
        label: "TanStack Query Svelte adapter and supported versions",
        url: "https://tanstack.com/query/latest/docs/framework/svelte/installation",
      },
      {
        label: "TanStack Query caching, refreshing and retry defaults",
        url: "https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults",
      },
      {
        label: "TanStack Query updates after mutations",
        url: "https://tanstack.com/query/latest/docs/framework/react/guides/invalidations-from-mutations",
      },
      {
        label: "SWR automatic refreshing",
        url: "https://swr.vercel.app/docs/revalidation",
      },
      {
        label: "SWR cache updates and revalidation",
        url: "https://swr.vercel.app/docs/mutation",
      },
      {
        label: "SWR errors and retry rules",
        url: "https://swr.vercel.app/docs/error-handling",
      },
      {
        label: "RTK Query tag-based invalidation",
        url: "https://redux-toolkit.js.org/rtk-query/usage/automated-refetching",
      },
      {
        label: "RTK Query configurable retry wrapper",
        url: "https://redux-toolkit.js.org/rtk-query/usage/customizing-queries",
      },
      {
        label: "Apollo query states, caching and polling",
        url: "https://www.apollographql.com/docs/react/data/queries",
      },
      {
        label: "Apollo bundled RetryLink",
        url: "https://www.apollographql.com/docs/react/api/link/apollo-link-retry",
      },
      {
        label: "urql document caching and request policies",
        url: "https://nearform.com/open-source/urql/docs/basics/document-caching/",
      },
      {
        label: "urql separate retry exchange",
        url: "https://nearform.com/open-source/urql/docs/advanced/retry-operations/",
      },
      {
        label: "Axios HTTP requests and transport scope",
        url: "https://axios-http.com/docs/intro",
      },
      {
        label: "Axios request/response interceptors",
        url: "https://axios-http.com/docs/interceptors",
      },
      {
        label: "Axios error handling",
        url: "https://axios-http.com/docs/handling_errors",
      },
    ],
    title: "Data fetching",
    path: "/javascript/data-fetching/",
    introduction:
      "Optional tools for caching API data, sharing results and keeping your UI up to date. Your framework may already cover basic loading.",
    note: "Every entry here is an optional library; framework-provided fetching is explained in Frameworks & libraries. Client-side caches are not Redis/Valkey services. General query caches, GraphQL clients and Axios's HTTP request tooling have different scopes, not rankings. Built-in means the tool supplies the behavior, not zero setup; Configurable means enable or define rules; Add-on means a separate package; Manual means application-written logic. Browser HTTP caching is not a shared application-data cache. Framework support depends on the adapter: Apollo covers React and urql covers React/Vue here; RTK Query has a framework-independent core and first-party React hooks, with Redux store/middleware setup required. Axios is a framework-independent request client, not a shared query cache or loading-state engine; it can be used inside a query library's fetcher. It supplies request/response/error handling and interceptors, while cache sharing, refreshing, synchronization and retry policies need application logic or separate integrations. Define cache keys, invalidation, user isolation and error handling. Shared results apply within the same client/provider/store, not across users or server requests. SSR hydration and request isolation require framework-specific setup. Cached data is not an authorization check; keep secrets server-side and enforce authorization on the server. Retry only appropriate failures, and do not blindly retry non-idempotent writes. The application still renders loading/error UI and decides how saved data affects other results. Extra libraries are optional; no library can infer every business-specific update rule.",
    overviewPurpose: {
      label: "Best fit & scope",
      explanation:
        "The kind of application data each optional library manages. Query tools accept your request logic; GraphQL clients expect GraphQL operations; Axios sends HTTP requests without supplying a query cache. These tools can be combined, not just substituted. They are optional choices, not a dependency checklist.",
    },
    columnGroups: [
      {
        label: "General-purpose data management",
        toolIds: ["tanstack-query", "swr", "rtk-query"],
      },
      { label: "GraphQL clients", toolIds: ["apollo", "urql"] },
      { label: "HTTP client", toolIds: ["axios"] },
    ],
    dimensions: [
      {
        label: "API focus",
        explanation:
          "Whether the tool expects GraphQL operations, sends HTTP requests, or runs your asynchronous fetching function. A general-purpose tool can call a GraphQL endpoint too, but does not automatically gain a normalized GraphQL entity cache.",
      },
      {
        label: "Caching",
        explanation:
          "Reuse previously fetched results instead of repeating requests. TanStack Query, SWR and RTK Query keep keyed results; Apollo shares normalized entities; urql caches documents by default and optional Graphcache adds normalized entities. Keys, lifetimes and fetch policies still matter. Axios does not supply a shared query cache; add application logic or a caching integration. Browser HTTP caching is a different layer.",
      },
      {
        label: "Automatic refreshing",
        explanation:
          "Fetch fresh data after an event or on a schedule, for example on focus, reconnect or a polling interval. Defaults differ: some tools refresh on browser events while others require explicit polling or request policies. Configurable does not mean every trigger is built in or enabled by default. The application chooses an appropriate freshness policy.",
      },
      {
        label: "Shared requests & results",
        explanation:
          "Let several components reuse matching requests or cached results within the same client/provider/store. This is not cross-user or cross-tab sharing, nor a promise that all operations are deduplicated. Axios instances share configuration, not an application query-result cache; sharing results requires application logic or another library. Server rendering needs request-isolated caches and compatible hydration setup.",
      },
      {
        label: "Updates after saving",
        explanation:
          "Keep displayed data synchronized after a successful write. Tools supply invalidation, cache updates or mutation APIs, but your application defines which results changed. RTK Query uses configured tags; Apollo can merge known entities but needs rules or refetching for affected lists; urql invalidates documents and optional Graphcache adds entity updates. Optimistic UI needs rollback/error handling. Saving does not automatically reveal every affected query.",
      },
      {
        label: "Loading & error states",
        explanation:
          "Expose whether a request is loading, succeeded or failed so your app can render feedback. Built-in states do not render a spinner or error message for you. Axios returns promises and structured errors, not reactive loading state; the application manages pending flags and feedback. Your fetcher must report failures correctly, including unsuccessful HTTP responses where necessary.",
      },
      {
        label: "Automatic retries",
        explanation:
          "Try again after appropriate request failures, with rules for attempt counts and delays. TanStack Query and SWR provide configurable retry behavior; RTK Query requires its retry wrapper. Apollo RetryLink is a bundled module to configure, while urql's retry exchange is a separately installed package. Axios retry rules require application logic or a separate integration. Not every error is retryable; avoid blindly repeating writes that might already have succeeded.",
      },
    ],
    tools: tools([
      [
        "tanstack-query",
        "TanStack Query",
        "https://tanstack.com/query/latest/docs/framework/react/overview",
        "https://github.com/TanStack/query/blob/main/LICENSE",
        ["React", "Vue", "Angular", "Svelte"],
        "Shared API data with React, Vue, Angular or Svelte adapters.",
        "Query caching, refreshing and mutation helpers in one tool.",
        "Supply fetchers, query keys and update rules; check adapter versions.",
        [
          [
            "Custom fetcher",
            "Promises from your fetcher; not tied to one transport.",
          ],
          ["Built-in", "Keyed query-result cache."],
          ["Configurable", "Staleness, focus, reconnect and polling rules."],
          ["Built-in", "Components share matching query keys."],
          [
            "Configurable",
            "Invalidate or update cached results after mutations.",
          ],
          ["Built-in", "Query loading, fetching and error states."],
          ["Configurable", "Retry count, delay and failure rules."],
        ],
      ],
      [
        "swr",
        "SWR",
        "https://swr.vercel.app/docs/getting-started",
        "https://github.com/vercel/swr/blob/main/LICENSE",
        ["React"],
        "React apps wanting compact data-fetching and cache hooks.",
        "Keyed caching with focus/reconnect refreshing and mutation helpers.",
        "Fetcher, cache keys and write coordination remain application decisions.",
        [
          ["Custom fetcher", "Your asynchronous fetcher."],
          ["Built-in", "Keyed result cache with revalidation."],
          ["Configurable", "Focus, reconnect and polling rules."],
          ["Built-in", "Hooks share matching keys within a cache provider."],
          ["Configurable", "Mutate cached results and trigger revalidation."],
          ["Built-in", "Loading, validating and error states."],
          ["Configurable", "Error retries with backoff and custom rules."],
        ],
      ],
      [
        "rtk-query",
        "RTK Query",
        "https://redux-toolkit.js.org/rtk-query/overview",
        "https://github.com/reduxjs/redux-toolkit/blob/master/LICENSE",
        ["Framework-agnostic", "React"],
        "Apps using Redux Toolkit for shared API data; React hooks available.",
        "Shared query results and tag-based refresh after writes.",
        "Requires Redux store/middleware setup and endpoint definitions.",
        [
          [
            "Custom fetcher",
            "HTTP base query or custom asynchronous requests.",
          ],
          ["Built-in", "Results keyed by endpoint and arguments."],
          [
            "Configurable",
            "Polling and focus/reconnect rules; listeners need setup.",
          ],
          ["Built-in", "Subscribers share matching endpoint/argument results."],
          [
            "Configurable",
            "Configured tags invalidate and refetch active queries.",
          ],
          ["Built-in", "Query loading, fetching and error states."],
          [
            "Configurable",
            "Wrap the base query with the supplied retry utility.",
          ],
        ],
      ],
      [
        "apollo",
        "Apollo Client",
        "https://www.apollographql.com/docs/react",
        "https://github.com/apollographql/apollo-client/blob/main/LICENSE",
        ["React"],
        "GraphQL apps needing a shared entity cache; React integration shown.",
        "GraphQL operations and normalized data can share an entity cache.",
        "Cache identifiers and field policies need design; a GraphQL server is separate.",
        [
          ["GraphQL", "GraphQL queries, mutations and subscriptions."],
          [
            "Built-in",
            "Normalized entity cache; identifiers and policies matter.",
          ],
          ["Configurable", "Polling and refetch rules."],
          ["Built-in", "Shared client cache and query deduplication."],
          [
            "Configurable",
            "Entity updates plus explicit list/cache/refetch rules.",
          ],
          ["Built-in", "Query loading, network status and errors."],
          ["Configurable", "Configure the bundled RetryLink module."],
        ],
      ],
      [
        "urql",
        "urql",
        "https://nearform.com/open-source/urql/docs/",
        "https://github.com/urql-graphql/urql/blob/main/LICENSE",
        ["React", "Vue"],
        "GraphQL apps wanting modular caching; React/Vue bindings shown.",
        "Choose caching and request-processing behavior through exchanges.",
        "Different exchanges produce different cache and offline behavior.",
        [
          ["GraphQL", "GraphQL operations with framework bindings."],
          [
            "Built-in",
            "Document cache; optional Graphcache adds normalized entities.",
          ],
          [
            "Configurable",
            "Request policies; recurring refresh triggers need setup.",
          ],
          ["Built-in", "Matching operations reuse the shared client cache."],
          [
            "Configurable",
            "Document invalidation; extend entity updates with Graphcache.",
          ],
          ["Built-in", "Fetching state and operation errors."],
          ["Add-on", "Install and configure the retry exchange."],
        ],
      ],
      [
        "axios",
        "Axios",
        "https://axios-http.com/docs/intro",
        "https://github.com/axios/axios/blob/v1.x/LICENSE",
        ["Framework-agnostic"],
        "Optional browser/Node HTTP client, not a query cache.",
        "Request/response interceptors, structured errors and cancellation.",
        "Manage caching, sharing, refreshing and loading state yourself.",
        [
          [
            "HTTP requests",
            "Promise-based HTTP methods for browser and Node.js.",
          ],
          [
            "Manual",
            "No shared query cache; browser HTTP caching is separate.",
          ],
          ["Manual", "Schedule or trigger new requests in app code."],
          [
            "Manual",
            "Share promises/results in app code or use a query library.",
          ],
          ["Manual", "Reload or update displayed data after saving."],
          [
            "Manual",
            "Structured errors supplied; track loading and render feedback yourself.",
          ],
          ["Manual", "Implement retry rules or choose a separate integration."],
        ],
      ],
    ]),
  },
  {
    label: "Forms",
    sources: [
      {
        label: "TanStack Form Svelte adapter",
        url: "https://tanstack.com/form/latest/docs/framework/svelte/quick-start",
      },
      {
        label: "React Hook Form field and submission state",
        url: "https://react-hook-form.com/docs/useform/formstate",
      },
      {
        label: "React Hook Form repeated fields",
        url: "https://react-hook-form.com/docs/usefieldarray",
      },
      {
        label: "TanStack Form array fields",
        url: "https://tanstack.com/form/latest/docs/framework/react/guides/arrays",
      },
      {
        label: "TanStack Form submission handling",
        url: "https://tanstack.com/form/latest/docs/framework/react/guides/submission-handling",
      },
      {
        label: "vee-validate v4 form and submission handling",
        url: "https://vee-validate.logaretm.com/v4/guide/composition-api/handling-forms/",
      },
      {
        label: "vee-validate v4 nested objects and arrays",
        url: "https://vee-validate.logaretm.com/v4/guide/composition-api/nested-objects-and-arrays/",
      },
      {
        label: "Superforms client/server setup",
        url: "https://superforms.rocks/get-started",
      },
      {
        label: "Superforms nested and array data",
        url: "https://superforms.rocks/concepts/nested-data",
      },
      {
        label: "Superforms tainted-field tracking",
        url: "https://superforms.rocks/concepts/tainted",
      },
      {
        label: "Superforms submission timers",
        url: "https://superforms.rocks/concepts/timers",
      },
      {
        label: "Formik values, validation and submitting state",
        url: "https://formik.org/docs/api/formik",
      },
      {
        label: "Formik field-array helpers",
        url: "https://formik.org/docs/api/fieldarray",
      },
      {
        label: "Vuelidate validation state and dirty tracking",
        url: "https://vuelidate-next.netlify.app/guide.html",
      },
      {
        label: "Vuelidate application values and collection validation",
        url: "https://vuelidate-next.netlify.app/advanced_usage.html",
      },
    ],
    title: "Forms",
    path: "/javascript/forms/",
    introduction:
      "Manage field values, validation and submission feedback. These tools do not supply your visual component library or replace validation on the server.",
    note: "Every entry here is an optional library; framework-provided and native HTML capabilities belong in Frameworks & libraries. Built-in means supplied behavior, Configurable means enable or define rules, Add-on means a separate package, and Manual means application code. Basic required/email-format checks already work in HTML. Supply application-specific validation rules even when helpers are built in; schemas, validation libraries and resolver packages may require separate installation. This comparison covers Formik 2.x, vee-validate v4 and Vuelidate 2.x. Vuelidate validates application-owned Vue values and supplies dirty/error metadata; it is not a complete form-value or submission-state manager. Its $pending tracks async validation, not an HTTP submission. Configure @vuelidate/core with validators/custom rules and wire the UI yourself. Superforms coordinates SvelteKit actions and enhanced forms, but your server action still validates, authorizes and saves data; live actions need a supported runtime/adapter. Other client-form submit helpers track callbacks, not a supplied backend. Form logic is separate from visual controls: configure field value, blur, error and accessibility wiring for custom components. Error data is not automatically accessible feedback. Server-side validation and authorization are still required. Test labels, error announcements, focus movement and pending/failed submission states. Libraries are optional, not a requirement for every form.",
    overviewPurpose: {
      label: "Best fit & scope",
      explanation:
        "Which UI ecosystem and form responsibilities each optional library targets. Client field state, server submissions, schema validation and visual controls are distinct. Vuelidate focuses on validation over application-owned values; Superforms integrates SvelteKit actions. Simple forms may not need any optional tool.",
    },
    columnGroups: [
      { label: "React", toolIds: ["react-hook-form", "formik"] },
      { label: "Multi-framework", toolIds: ["tanstack-form"] },
      { label: "Vue", toolIds: ["vee-validate", "vuelidate"] },
      { label: "SvelteKit forms", toolIds: ["superforms"] },
    ],
    dimensions: [
      {
        label: "Field values & state",
        explanation:
          "Track current values and metadata such as edited (dirty/tainted) or visited (touched) fields. These concepts are not identical across tools; initialize values correctly. Vuelidate attaches validation dirtiness and errors to application-owned Vue values rather than storing the whole form itself. Superforms tracks tainted fields rather than promising the same touched model as every client library.",
      },
      {
        label: "Validation",
        explanation:
          "You define the rules. Basic required/email-format checks are native HTML; form libraries add rule functions or supported schema integrations. Configurable does not mean every validator is bundled. Schema libraries and resolver/adapter packages may require installation and matching versions. Client validation is user feedback, not security; validate and authorize on the server too.",
      },
      {
        label: "Errors & messages",
        explanation:
          "Keep validation errors associated with fields and provide messages. Error data is separate from accessible rendering: the app still chooses placement, labels, announcements and focus behavior. Vuelidate exposes validation error objects and message helpers, not a finished form UI. Form libraries do not automatically supply your styled controls or complete error UI.",
      },
      {
        label: "Repeated fields",
        explanation:
          "Add or remove repeated rows such as addresses or invoice items. Field-array helpers or schema-based arrays provide data mechanics, not a finished interface. Conditional sections still need explicit rendering, stable identities and validation rules. Superforms nested/array data needs appropriate serialization and schema setup. Vuelidate can validate collections, but the application still owns their values and repeated-control structure.",
      },
      {
        label: "Submission & pending state",
        explanation:
          "A client form helper can track an asynchronous callback without providing a server. Supply the actual request and failure handling. Superforms integrates SvelteKit actions and enhancement after setup; server validation, authorization and persistence remain your code. Vuelidate's $pending tracks asynchronous validation, not a network submission; manage submitting state yourself.",
      },
      {
        label: "UI control integration",
        explanation:
          "Form logic and visual controls are separate. Native inputs work with the appropriate registration or binding. Custom widgets need correct value, blur, error and accessibility wiring: React Hook Form has controlled-input helpers; Formik, TanStack Form and vee-validate connect field APIs; Vuelidate attaches validation to the values and events you bind. The app still supplies accessible controls and layout.",
      },
    ],
    tools: tools([
      [
        "react-hook-form",
        "React Hook Form",
        "https://react-hook-form.com/get-started",
        "https://github.com/react-hook-form/react-hook-form/blob/master/LICENSE",
        ["React"],
        "React form logic, field registration and controlled-input helpers.",
        "Register standard fields and connect controlled custom inputs when needed.",
        "Controlled widgets and schema resolvers need correct integration.",
        [
          ["Built-in", "Values, dirty and touched state."],
          ["Configurable", "Field rules; optional schema resolver package."],
          ["Built-in", "Field errors; render your messages."],
          ["Built-in", "Field-array helpers and nested values."],
          [
            "Built-in",
            "Submit helper and submitting state; supply the request.",
          ],
          ["Configurable", "Register inputs or connect controlled widgets."],
        ],
      ],
      [
        "formik",
        "Formik",
        "https://formik.org/docs/overview",
        "https://github.com/jaredpalmer/formik/blob/main/LICENSE",
        ["React"],
        "React form values, validation and submission state; Formik 2.x.",
        "Field bindings, error helpers and array-field operations.",
        "Supply validation rules, network requests and accessible UI.",
        [
          ["Built-in", "Values, dirty and touched state."],
          [
            "Configurable",
            "Custom validation or a separately installed schema library.",
          ],
          [
            "Built-in",
            "Field errors and message helpers; render accessible feedback.",
          ],
          ["Built-in", "FieldArray helpers and nested values."],
          [
            "Built-in",
            "Submit handler and isSubmitting; supply the actual request.",
          ],
          [
            "Configurable",
            "Connect field props or hooks to your chosen controls.",
          ],
        ],
      ],
      [
        "tanstack-form",
        "TanStack Form",
        "https://tanstack.com/form/latest/docs/overview",
        "https://github.com/TanStack/form/blob/main/LICENSE",
        ["React", "Vue", "Angular", "Svelte"],
        "Typed form-state core with framework adapters.",
        "Form logic is separate from your choice of visual components.",
        "You supply the fields, layout and accessible error presentation.",
        [
          ["Built-in", "Values and field metadata."],
          [
            "Configurable",
            "Custom rules or supported schemas; check library versions.",
          ],
          ["Built-in", "Field errors; render your messages."],
          ["Built-in", "Array-field helpers and nested values."],
          [
            "Built-in",
            "Submit callback and submitting state; supply the request.",
          ],
          ["Configurable", "Connect field APIs to your chosen controls."],
        ],
      ],
      [
        "vee-validate",
        "vee-validate",
        "https://vee-validate.logaretm.com/v4/guide/overview/",
        "https://github.com/logaretm/vee-validate/blob/main/LICENSE",
        ["Vue"],
        "Vue form state and validation; vee-validate v4 APIs shown.",
        "Composition APIs and components integrate with Vue forms.",
        "Custom inputs and chosen schema adapters must match your version.",
        [
          ["Built-in", "Values, dirty and touched state."],
          ["Configurable", "Field rules or supported schema integration."],
          [
            "Built-in",
            "Error state and message helpers; choose accessible UI.",
          ],
          ["Built-in", "Field-array helpers and nested values."],
          [
            "Built-in",
            "Submit helper and submitting state; supply the request.",
          ],
          ["Configurable", "Bind fields to native or custom inputs."],
        ],
      ],
      [
        "vuelidate",
        "Vuelidate",
        "https://vuelidate-next.netlify.app/",
        "https://github.com/vuelidate/vuelidate/blob/next/LICENSE",
        ["Vue"],
        "Validation over application-owned Vue values; Vuelidate 2.x.",
        "Reactive validation rules, dirty tracking and error metadata.",
        "LTS mode; own values, repeated-field UI and submission state.",
        [
          [
            "Configurable",
            "Vue owns values; validation dirty/error metadata supplied.",
          ],
          ["Configurable", "Configure core with validators or custom rules."],
          [
            "Built-in",
            "Validation error objects/messages; render your feedback.",
          ],
          [
            "Configurable",
            "Collection validation; repeated-field UI remains app code.",
          ],
          [
            "Manual",
            "Manage the request and submitting state; $pending is validation.",
          ],
          [
            "Configurable",
            "Bind Vue values and validation/blur events to controls.",
          ],
        ],
      ],
      [
        "superforms",
        "Superforms",
        "https://superforms.rocks/get-started",
        "https://github.com/ciscoheat/sveltekit-superforms/blob/main/LICENSE",
        ["Svelte"],
        "SvelteKit client/server form coordination with schema adapters.",
        "Validation feedback, tainted fields and enhanced action handling.",
        "Configure schemas and server actions; requires SvelteKit integration.",
        [
          ["Built-in", "Form data and tainted-field tracking."],
          [
            "Configurable",
            "Configure a supported schema adapter and validation library.",
          ],
          [
            "Built-in",
            "Validation errors and server feedback; render messages.",
          ],
          [
            "Configurable",
            "Nested/array data with schema and serialization setup.",
          ],
          [
            "Configurable",
            "SvelteKit actions, enhancement and submission timers.",
          ],
          ["Configurable", "Bind Svelte inputs or custom controls."],
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
          ["Code-defined schemas", "Code-defined schemas with parsing APIs."],
          ["Schema inference", "Infer input/output types from schemas."],
          [
            "Parsing / transforms",
            "Structured errors, refinements and transformations.",
          ],
          [
            "Schema adapters",
            "Browser or server; select compatible integrations.",
          ],
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
          [
            "Code-defined schemas",
            "Composable schemas and validation pipelines.",
          ],
          ["Schema inference", "Infer types from schemas."],
          [
            "Parsing / transforms",
            "Issues, parsing and transformation pipelines.",
          ],
          [
            "Schema adapters",
            "Use supported schema adapters for your form/server tools.",
          ],
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
          ["Standard schemas", "JSON Schema or JSON Type Definition."],
          [
            "Typed validators / utilities",
            "Type utilities and typed validators; schema/type correspondence needs care.",
          ],
          [
            "Validation / optional mutation",
            "Validation errors with configurable coercion/default behaviors.",
          ],
          [
            "Schema compilation",
            "Check runtime code-generation restrictions and supported schema dialects.",
          ],
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
          ["Code-defined schemas", "Code-defined schemas with chained rules."],
          [
            "Schema inference",
            "Infer output types and check schema compatibility with types.",
          ],
          [
            "Parsing / transforms",
            "Casting, transforms and validation errors.",
          ],
          [
            "Schema adapters",
            "Use with supported form integrations or standalone validation.",
          ],
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
          [
            "Routes / middleware",
            "Routes and middleware with little enforced project structure.",
          ],
          [
            "External validation",
            "Add validation, API documentation and authentication integrations.",
          ],
          [
            "Node.js",
            "Node.js; check the supported version for your Express release.",
          ],
          [
            "Application-managed",
            "You configure deployment, observability and application error handling.",
          ],
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
          [
            "Plugin encapsulation",
            "Encapsulated plugins, route hooks and schemas.",
          ],
          [
            "Integrated schema validation",
            "JSON Schema validation/serialization; type providers and plugins extend it.",
          ],
          [
            "Node.js",
            "Node.js; deployment adapters and dependencies must match your environment.",
          ],
          [
            "Application-managed",
            "Configure access rules, storage, logging and background processing.",
          ],
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
          [
            "Modules / dependency injection",
            "Modules, controllers and providers with dependency injection.",
          ],
          [
            "Validation integrations",
            "Pipes and integrations for validation and OpenAPI; install/configure dependencies.",
          ],
          [
            "Node.js",
            "Node.js with Express by default or a supported alternative adapter.",
          ],
          [
            "Application-managed",
            "Configure infrastructure, auth policies, monitoring and failure handling.",
          ],
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
          [
            "Routes / middleware",
            "Routes and middleware around a request context.",
          ],
          [
            "Validation integrations",
            "Validation helpers and schema/OpenAPI integrations.",
          ],
          [
            "Multiple runtimes",
            "Supported runtimes through documented adapters; verify your dependencies.",
          ],
          [
            "Application-managed",
            "Configure deployment bindings, secrets, access and observability.",
          ],
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
          ["ORM", "ORM; distinct from separately offered Prisma services."],
          [
            "Schema-driven migrations",
            "Prisma schema and migration tooling for supported connectors.",
          ],
          [
            "Generated model client",
            "Generated typed client; raw queries when needed.",
          ],
          [
            "Connector-dependent",
            "Choose a supported database/adapter and configure connection management.",
          ],
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
          ["ORM", "SQL-oriented ORM/query APIs."],
          [
            "Schema-driven migrations",
            "TypeScript schemas; Drizzle Kit supplies companion migration tooling.",
          ],
          [
            "SQL-oriented queries",
            "SQL-like typed queries and supported relational APIs.",
          ],
          [
            "Connector-dependent",
            "Supported dialects and drivers; verify runtime compatibility per driver.",
          ],
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
          ["Query builder", "SQL query builder."],
          [
            "Authored migrations",
            "Migration utilities; database type definitions are a separate responsibility.",
          ],
          [
            "SQL-oriented queries",
            "Typed SQL construction with raw SQL escape hatches.",
          ],
          [
            "Connector-dependent",
            "Dialect/driver determines supported databases and deployment constraints.",
          ],
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
          ["Query builder", "SQL query builder and schema utilities."],
          [
            "Authored migrations",
            "Migrations and schema builder for supported databases.",
          ],
          ["SQL-oriented queries", "Chainable query construction and raw SQL."],
          [
            "Connector-dependent",
            "Node-oriented database drivers; configure pooling and connection limits.",
          ],
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
          [
            "Unit / integration runner",
            "Runner for unit/integration tests; browser mode is a separate configuration.",
          ],
          [
            "Node / DOM / browser mode",
            "Node or configured DOM/browser environments.",
          ],
          ["Runner + UI helpers", "Use framework test helpers where needed."],
          [
            "Runner reports",
            "Reports, coverage integrations and configured browser-mode diagnostics.",
          ],
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
          [
            "Unit / integration runner",
            "Runner with assertions, mocks and snapshots.",
          ],
          ["Node / DOM", "Node and separately configured DOM environments."],
          [
            "Runner + UI helpers",
            "Transform/build and framework helpers require setup.",
          ],
          [
            "Runner reports",
            "Reporting and coverage; keep snapshots reviewed and meaningful.",
          ],
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
          [
            "UI helpers",
            "UI testing helper family, not a standalone test runner.",
          ],
          [
            "Host-provided DOM",
            "The DOM environment supplied by your runner/browser setup.",
          ],
          [
            "External runner",
            "Choose the framework package and user-event tooling.",
          ],
          [
            "Host-provided reports",
            "Query errors aid debugging; runner owns reports and coverage.",
          ],
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
          [
            "Browser testing",
            "Browser automation with an integrated test runner.",
          ],
          ["Real browsers", "Actual supported browser engines."],
          [
            "App / browser setup",
            "Run the app and provide isolated data/accounts for each test.",
          ],
          [
            "Runner reports",
            "Traces, screenshots and reports; close resources you start.",
          ],
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
          ["Browser testing", "Browser end-to-end and component testing."],
          [
            "Real browsers",
            "Supported real browser environments; check current browser support.",
          ],
          [
            "App / browser setup",
            "Component testing requires a supported framework/build integration.",
          ],
          [
            "Runner reports",
            "Runner diagnostics; Cypress Cloud is a separate offering.",
          ],
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
          [
            "App build workflow",
            "Application/library development and build tooling.",
          ],
          [
            "Integrated dev server",
            "Development server with module update support.",
          ],
          [
            "Config / plugins",
            "Config file and plugins; frameworks may configure them for you.",
          ],
          [
            "Explicit checking step",
            "Transforms TypeScript; use a separate type-checking step.",
          ],
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
          ["Bundler / build engine", "Module bundler."],
          [
            "Dev-server integration",
            "Development-server and update tooling through integrations.",
          ],
          [
            "Config / plugins",
            "Loaders/plugins configure module and asset processing.",
          ],
          [
            "Explicit checking step",
            "Depends on loaders/plugins; configure type checking explicitly.",
          ],
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
          [
            "Bundler / build engine",
            "Module bundler, not an application framework.",
          ],
          [
            "Watch; external app server",
            "Watch mode; app-server workflows require additional tooling.",
          ],
          ["Config / plugins", "Input/output configuration and plugins."],
          [
            "Explicit checking step",
            "Use appropriate TypeScript integration and a checking step.",
          ],
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
          ["Bundler / build engine", "Build engine and bundler."],
          [
            "Watch / serve APIs",
            "Watch/serve APIs; application tooling may wrap them.",
          ],
          ["Config / plugins", "CLI/API options and plugins."],
          [
            "Explicit checking step",
            "Removes TypeScript syntax without type checking.",
          ],
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
