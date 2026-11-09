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
    ],
    introduction:
      "Compare the visual character, UI controls and developer APIs of three component suites for each UI ecosystem. These are curated choices, not a popularity ranking.",
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
    ]),
    sources: [
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
          ["Utility CSS", "Utility classes generated by a build step."],
          [
            "No component suite",
            "Utilities and theme primitives, not a ready-made control suite.",
          ],
          [
            "Build-time CSS",
            "Build integration generates CSS; no styling runtime required.",
          ],
          [
            "CSS variables / composition",
            "Theme variables, utilities and reusable components.",
          ],
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
          [
            "Component CSS",
            "Styled CSS components and utilities with JavaScript plugins.",
          ],
          ["Styled components", "A supplied visual language and layouts."],
          [
            "CSS + optional JS plugins",
            "CSS works directly; some interactive components need JavaScript.",
          ],
          ["CSS variables / Sass", "CSS variables and Sass customization."],
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
          ["Scoped CSS", "Local class-name scoping, not a design framework."],
          ["No component suite", "None; write your own CSS."],
          ["Build-time CSS", "Requires CSS Modules support in your toolchain."],
          [
            "CSS variables / composition",
            "Compose classes and use standard CSS variables.",
          ],
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
          ["CSS preprocessor", "CSS preprocessor."],
          [
            "No component suite",
            "None; it can customize another CSS framework.",
          ],
          ["Build-time CSS", "Compile Sass before serving CSS."],
          [
            "Sass modules / mixins",
            "Modules, variables, mixins and generated CSS.",
          ],
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
          ["CSS-in-JS", "CSS-in-JS; this entry covers React styling APIs."],
          ["No component suite", "No full control suite."],
          [
            "JS styling runtime",
            "Runtime style generation with build-time optimizations available.",
          ],
          [
            "JS theme / composition",
            "Theme context, styled components and CSS composition.",
          ],
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
          [
            "JS + UI bindings",
            "React components/hooks or JavaScript animation APIs.",
          ],
          [
            "General animation",
            "Transitions, layout animations and gestures through appropriate APIs.",
          ],
          [
            "Explicit animation APIs",
            "Use animation values, transitions and sequencing APIs.",
          ],
          [
            "Motion / lifecycle checks",
            "Follow reduced-motion guidance and clean up manual animations.",
          ],
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
          [
            "JS + UI bindings",
            "DOM-oriented JavaScript; integrations for component lifecycles.",
          ],
          [
            "General animation",
            "Tweens, timelines, SVG and plugin-driven effects.",
          ],
          [
            "Explicit animation APIs",
            "Detailed sequencing and playback control.",
          ],
          [
            "Motion / lifecycle checks",
            "Use cleanup/context mechanisms and implement reduced-motion behavior.",
          ],
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
          ["JavaScript API", "JavaScript APIs for DOM and other values."],
          [
            "General animation",
            "Animations, timelines and layout/scroll tools as documented.",
          ],
          [
            "Explicit animation APIs",
            "Explicit targets, timing and sequencing.",
          ],
          [
            "Motion / lifecycle checks",
            "Revert effects and respect motion preferences.",
          ],
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
          ["JS + UI bindings", "Parent-element API and framework adapters."],
          [
            "Container transitions",
            "Changes to immediate children of a container.",
          ],
          [
            "Automatic defaults",
            "Defaults with customization rather than a general timeline editor.",
          ],
          [
            "Motion / lifecycle checks",
            "Check reduced-motion behavior and unusual layout cases.",
          ],
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
          ["Outline", "Stroke-based icons."],
          ["SVG + UI packages", "SVG plus framework-specific packages."],
          [
            "Selected icons",
            "Use individual imports and inspect bundle output.",
          ],
          [
            "Size / color / stroke",
            "Size, color and stroke options through SVG/package APIs.",
          ],
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
          [
            "Outline + filled",
            "Outline and solid sets at defined design sizes.",
          ],
          ["SVG + UI packages", "SVG assets and React/Vue packages."],
          [
            "Selected icons",
            "Import individual icons or embed selected SVG assets.",
          ],
          ["Size / color", "Use SVG color and size; preserve intended style."],
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
          [
            "Outline + filled",
            "Outline collection with filled icons also available.",
          ],
          ["SVG + UI packages", "SVG and framework-specific packages."],
          [
            "Selected icons",
            "Select icons instead of shipping the complete collection.",
          ],
          [
            "Size / color / stroke",
            "SVG sizing, colors and outline stroke settings.",
          ],
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
          [
            "Multiple weights",
            "Multiple weights including regular, bold and duotone.",
          ],
          ["SVG + UI packages", "SVG assets and ecosystem packages."],
          [
            "Selected icons",
            "Choose an integration and import only needed icons.",
          ],
          [
            "Size / color / weight",
            "Size, color and weight via assets or package APIs.",
          ],
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
          [
            "Actions / reducers",
            "Slices, reducers and actions; RTK Query is a separate data-fetching capability.",
          ],
          [
            "UI-independent core",
            "Core is UI-independent; React commonly uses React Redux.",
          ],
          ["Devtools integration", "Redux DevTools integration."],
          [
            "External persistence",
            "Persistence is separate; create isolated stores for server requests.",
          ],
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
          ["Store / actions", "Stores, actions and selectors."],
          ["UI-independent core", "React hooks or vanilla stores."],
          ["Devtools integration", "Devtools middleware can expose changes."],
          [
            "First-party middleware",
            "Persist middleware needs hydration planning; avoid shared user state on servers.",
          ],
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
          ["Store / actions", "State, getters and actions in stores."],
          [
            "Framework-specific",
            "Vue integration; follow Nuxt guidance when used there.",
          ],
          ["Devtools integration", "Vue DevTools support."],
          [
            "External persistence",
            "Use documented SSR setup; persistence is not an automatic database.",
          ],
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
          [
            "Actions / reducers",
            "Observable state with actions, reducers and selectors.",
          ],
          ["Framework-specific", "Angular providers and companion packages."],
          [
            "Devtools integration",
            "Store Devtools through a dedicated integration.",
          ],
          [
            "External persistence",
            "Persistence is application work; scope server-side state correctly.",
          ],
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
          ["Atomic stores", "Atoms, maps and computed stores."],
          [
            "UI-independent core",
            "Framework adapters around a UI-independent core.",
          ],
          [
            "Devtools integration",
            "Use the project's logging/devtools integrations as needed.",
          ],
          [
            "Companion integration",
            "Persistence and SSR require the appropriate integrations and isolation.",
          ],
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
          [
            "Custom fetcher",
            "Promises from your fetcher; not tied to one transport.",
          ],
          ["Keyed results", "Query-key-based result cache."],
          [
            "Mutation / cache APIs",
            "Mutations, invalidation and optimistic updates through explicit APIs.",
          ],
          [
            "Explicit SSR integration",
            "Follow the adapter/framework hydration and per-request cache guidance.",
          ],
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
          ["Custom fetcher", "Your asynchronous fetcher."],
          ["Keyed results", "Keyed cache with revalidation."],
          ["Mutation / cache APIs", "Mutation APIs and cache updates."],
          [
            "Explicit SSR integration",
            "Use documented fallback/server-rendering integration.",
          ],
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
          ["GraphQL", "GraphQL queries, mutations and subscriptions."],
          ["Normalized entities", "Normalized in-memory entity cache."],
          [
            "Mutation / cache APIs",
            "Mutation results, cache writes and optimistic responses.",
          ],
          [
            "Explicit SSR integration",
            "Follow React/framework-specific cache hydration guidance.",
          ],
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
          ["GraphQL", "GraphQL operations with framework bindings."],
          [
            "Documents / optional entities",
            "Document cache by default; Graphcache adds normalized caching.",
          ],
          [
            "Mutation / cache APIs",
            "Mutation handling and exchange-specific cache updates.",
          ],
          [
            "Explicit SSR integration",
            "SSR exchanges and framework integration require setup.",
          ],
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
          [
            "Registered fields",
            "Registered fields, subscriptions and Controller for controlled widgets.",
          ],
          ["Rules + schema integration", "Rules or separate schema resolvers."],
          ["Nested values / arrays", "Field arrays and nested values."],
          [
            "Application callback",
            "Submission handler with validation and pending/error state to wire.",
          ],
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
          ["Subscribed fields", "Typed form/field APIs and subscriptions."],
          [
            "Rules + schema integration",
            "Field/form validation with supported schema integrations.",
          ],
          ["Nested values / arrays", "Nested fields and array-oriented APIs."],
          [
            "Application callback",
            "Explicit submission callbacks and async validation workflows.",
          ],
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
          [
            "Composition / components",
            "Composition APIs or form/field components.",
          ],
          [
            "Rules + schema integration",
            "Field rules and supported schema integrations.",
          ],
          ["Nested values / arrays", "Nested values and field arrays."],
          [
            "Application callback",
            "Submission helpers; implement request failures and accessible feedback.",
          ],
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
          ["Control tree", "FormControl, FormGroup and related reactive APIs."],
          [
            "Built-in / custom validators",
            "Built-in and custom synchronous/asynchronous validators.",
          ],
          ["Nested values / arrays", "Nested groups and FormArray."],
          [
            "Application callback",
            "Your component handles the validated request and response states.",
          ],
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
