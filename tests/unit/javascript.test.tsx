// @vitest-environment jsdom
/**
 * Guards compact tool comparisons, ecosystem grouping and JavaScript-only stack boundaries.
 * @packageDocumentation
 */
import { fireEvent, render, waitFor, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  javascriptTopics,
  javascriptTools,
  javascriptStacksTopic,
} from "../../src/data/javascript";
import {
  javascriptStacks,
  javascriptStackRoles,
} from "../../src/data/javascriptStacks";
import { categoryGroups } from "../../src/data/categories";
import { renderApp } from "./render";
import { frameworksTopic } from "../../src/data/frameworks";
import ToolComparisonPage from "../../src/components/ToolComparisonPage";
import type { JavaScriptTopic } from "../../src/data/javascript";

describe("JavaScript / TypeScript", () => {
  it("registers thirteen distinct comparisons and a separate application-stacks entry", () => {
    expect(javascriptTopics).toHaveLength(13);
    const group = categoryGroups.find(
      ({ label }) => label === "JavaScript / TypeScript",
    )!;
    expect(group.path).toBe(javascriptStacksTopic.path);
    expect(group.topics).toHaveLength(14);
    const paths = categoryGroups.flatMap(({ topics }) =>
      topics.map(({ path }) => path),
    );
    expect(new Set(paths).size).toBe(paths.length);
    expect(JSON.stringify(group)).not.toMatch(/python|django|flask|fastapi/i);
    const tools = javascriptTopics.flatMap((topic) => topic.tools);
    expect(tools).toHaveLength(66);
    expect(javascriptTools.solid).toBeUndefined();
    expect(tools.flatMap(({ ecosystems }) => ecosystems)).not.toContain(
      "Solid",
    );
    expect(javascriptTools.sveltekit.ecosystems).toEqual(["Svelte"]);
    expect(javascriptTools.skeleton.ecosystems).toEqual(["Svelte"]);
    for (const id of [
      "autoanimate",
      "nanostores",
      "tanstack-query",
      "tanstack-form",
      "urql",
      "testing-library",
    ]) {
      expect(javascriptTools[id]).toBeDefined();
    }
    expect(new Set(tools.map(({ id }) => id)).size).toBe(tools.length);
  });

  for (const topic of javascriptTopics) {
    it(`${topic.label} has complete, sourced cells without provider-operation claims`, () => {
      expect(topic.tools.length).toBeGreaterThanOrEqual(3);
      expect(topic.note.length).toBeGreaterThan(60);
      expect(topic.dimensions).toHaveLength(
        topic === frameworksTopic
          ? 7
          : topic.path === "/javascript/components/"
            ? 9
            : 4,
      );
      for (const tool of topic.tools) {
        expect(tool.facts).toHaveLength(topic.dimensions.length);
        for (const fact of tool.facts) {
          if ("label" in fact) {
            expect(fact.label.trim()).toBe(fact.label);
            expect(fact.label.length).toBeGreaterThan(0);
            expect(fact.label.length).toBeLessThanOrEqual(40);
          } else {
            expect(typeof fact.included).toBe("boolean");
          }
        }
        for (const cell of [
          tool.purpose,
          tool.strength,
          tool.limitation,
          ...tool.facts,
        ])
          expect(
            (typeof cell === "string" ? cell : cell.detail).trim().length,
          ).toBeGreaterThan(0);
        expect(new URL(tool.url).protocol).toBe("https:");
        expect(new URL(tool.license).protocol).toBe("https:");
        expect(tool.ecosystems.length).toBeGreaterThan(0);
      }
      const { getByRole, container, queryByRole } = renderApp(topic.path);
      expect(document.title).toBe(`${topic.title} · Stacknotes`);
      expect(getByRole("heading", { level: 1 }).textContent).toBe(topic.title);
      expect(container.querySelector("h1")?.className).toBe("sr-only");
      expect(container.querySelector(".page-heading")).toBeNull();
      expect(container.querySelector(".view-controls")).toBeNull();
      expect(queryByRole("combobox")).toBeNull();
      expect(queryByRole("button", { name: "Compact view" })).toBeNull();
      expect(
        container.querySelector("#comparison")?.classList.contains("compact"),
      ).toBe(true);
      expect(container.querySelector("#tool-help")?.className).toBe("sr-only");
      expect(container.querySelector(".sources")?.hasAttribute("open")).toBe(
        false,
      );
      expect(container.querySelector(".reading-notes > p")).toBeNull();
      expect(
        [
          ...container.querySelectorAll("tbody:first-of-type th[scope='row']"),
        ].map((row) => row.childNodes[0].textContent),
      ).toEqual([
        topic.overviewPurpose?.label ?? "Primary purpose",
        "Strengths",
        "Limitations",
        "License & operating costs",
      ]);
      const features = getByRole("button", { name: "Features" });
      expect(features.getAttribute("aria-expanded")).toBe("false");
      expect(
        container.querySelector("#technical-rows")?.hasAttribute("hidden"),
      ).toBe(true);
      expect(
        getByRole("table").querySelectorAll(".section-row th"),
      ).toHaveLength(2);
      fireEvent.click(features);
      expect(features.getAttribute("aria-expanded")).toBe("true");
      expect(getByRole("table").querySelectorAll("thead th")).toHaveLength(
        topic.tools.length + 1 + (topic.columnGroups?.length ?? 0),
      );
      expect(getByRole("table").querySelectorAll("tbody td")).toHaveLength(
        topic.tools.length * (topic.dimensions.length + 4),
      );
      expect(
        container.querySelectorAll("#technical-rows .tool-feature-label"),
      ).toHaveLength(topic.tools.length * topic.dimensions.length);
      expect(
        container.querySelectorAll("tbody:first-of-type .different"),
      ).toHaveLength(0);
      expect(container.querySelector("#tool-help")?.textContent).toContain(
        "not better or worse",
      );
      for (const cell of container.querySelectorAll("td.different")) {
        expect(cell.closest("tbody")?.id).toBe("technical-rows");
        expect(
          cell.querySelector('.difference-mark[aria-hidden="true"]')
            ?.textContent,
        ).toContain("≠");
        expect(cell.querySelector(".sr-only")?.textContent).toContain(
          "less-common feature label",
        );
      }
      expect(queryByRole("button", { name: "Who handles what" })).toBeNull();
      expect(container.querySelector('option[value="Svelte"]')).toBeNull();
      expect(container.querySelector('option[value="Solid"]')).toBeNull();
      expect(container.querySelector(".legend")).toBeNull();
      expect(container.querySelectorAll(".sources a")).toHaveLength(
        topic.tools.length * 2 + (topic.sources?.length ?? 0),
      );
      const nav = within(
        getByRole("navigation", { name: "JavaScript / TypeScript topics" }),
      );
      expect(nav.getAllByRole("link")).toHaveLength(14);
      expect(
        nav
          .getByRole("link", { name: topic.label })
          .getAttribute("aria-current"),
      ).toBe("page");
    });
  }

  it("shows all ten component suites in compact groups without selectors", () => {
    const { getByRole, container } = renderApp("/javascript/components/");
    expect(
      [...container.querySelectorAll('th[scope="colgroup"]')].map((group) => [
        group.textContent,
        group.getAttribute("colspan"),
      ]),
    ).toEqual([
      ["React-based", "3"],
      ["Vue-based", "3"],
      ["Angular", "3"],
      ["Svelte", "1"],
    ]);
    expect(getByRole("table").querySelectorAll("thead th")).toHaveLength(15);
    expect(container.querySelectorAll("tbody td")).toHaveLength(130);
    const topic = javascriptTopics.find(
      ({ path }) => path === "/javascript/components/",
    )!;
    expect(container.querySelectorAll(".sources a")).toHaveLength(
      20 + topic.sources!.length,
    );
    expect(container.querySelectorAll("select")).toHaveLength(0);
    expect(getByRole("link", { name: "Angular Material" })).toBeTruthy();
  });

  it("preserves role distinctions and runtime/security caveats", () => {
    expect(javascriptTools.primeng.licenseName).toContain("commercial/LTS");
    expect(javascriptTools["testing-library"].facts[0].detail).toContain(
      "not a standalone test runner",
    );
    expect(javascriptTools.esbuild.facts[3].detail).toContain(
      "without type checking",
    );
    expect(
      javascriptTopics.find(({ path }) => path.endsWith("data-fetching/"))!
        .note,
    ).toContain("not Redis/Valkey");
  });

  it.each([
    { labels: ["A", "A", "B"], marked: [2] },
    { labels: ["A", "A", "A"], marked: [] },
    { labels: ["A", "A", "B", "B"], marked: [] },
    { labels: ["A", "B", "C"], marked: [] },
    { labels: ["A", "A", "B", "B", "C"], marked: [4] },
  ])(
    "marks only less-common feature labels in $labels",
    ({ labels, marked }) => {
      const topic: JavaScriptTopic = {
        ...frameworksTopic,
        columnGroups: undefined,
        dimensions: [
          { label: "Category", explanation: "Compare labels, not notes." },
        ],
        tools: frameworksTopic.tools
          .slice(0, labels.length)
          .map((tool, index) => ({
            ...tool,
            purpose: index === 0 ? "Different overview" : "Same overview",
            facts: [
              { label: labels[index], detail: `Unique explanation ${index}` },
            ],
          })),
      };
      const { container, rerender } = render(
        <ToolComparisonPage topic={topic} />,
      );
      const cells = [...container.querySelectorAll("#technical-rows td")];
      expect(
        cells.flatMap((cell, index) =>
          cell.classList.contains("different") ? [index] : [],
        ),
      ).toEqual(marked);
      expect(container.querySelectorAll(".difference-mark")).toHaveLength(
        marked.length,
      );
      expect(
        container.querySelectorAll("tbody:first-of-type td.different"),
      ).toHaveLength(0);
      rerender(
        <ToolComparisonPage
          topic={{
            ...topic,
            tools: topic.tools.map((tool) => ({
              ...tool,
              facts: tool.facts.map((fact) => ({
                ...fact,
                detail: "Identical explanation",
              })),
            })),
          }}
        />,
      );
      expect(
        [...container.querySelectorAll("#technical-rows td")].flatMap(
          (cell, index) =>
            cell.classList.contains("different") ? [index] : [],
        ),
      ).toEqual(marked);
    },
  );

  it("keeps visual character in Overview and compares nine UI/developer feature rows", () => {
    const { getByRole, container } = renderApp("/javascript/components/");
    const visual = getByRole("row", { name: /^Default look & feel/ });
    expect(visual.closest("tbody")).toBe(container.querySelector("tbody"));
    expect(visual.querySelectorAll("td")).toHaveLength(10);
    expect(
      visual.querySelectorAll(".different, .difference-mark"),
    ).toHaveLength(0);
    expect(visual.textContent).toContain("Restrained, utilitarian");
    expect(visual.textContent).toContain(
      "Polished, visually detailed controls",
    );
    expect(
      container.querySelector('button[aria-label="About Primary purpose"]'),
    ).toBeNull();
    const info = getByRole("button", { name: "About Default look & feel" });
    const dialog = container.querySelector<HTMLDialogElement>(
      `#${info.getAttribute("aria-controls")}`,
    )!;
    const showModal = vi.fn();
    dialog.showModal = showModal;
    fireEvent.click(info);
    expect(showModal).toHaveBeenCalledOnce();
    expect(dialog.textContent).toContain("not objective quality rankings");
    fireEvent.click(getByRole("button", { name: "Features" }));
    expect(
      [...container.querySelectorAll('#technical-rows th[scope="row"]')].map(
        (row) => row.childNodes[0].textContent,
      ),
    ).toEqual([
      "Component coverage",
      "Design tokens & theming",
      "Styling & customization APIs",
      "Component composition",
      "Interaction utilities",
      "Forms & validation integration",
      "Responsive & density options",
      "Accessibility support",
      "TypeScript & developer experience",
    ]);
    const styling = getByRole("row", { name: /^Styling & customization APIs/ });
    expect(
      [...styling.querySelectorAll(".tool-feature-label")].map(
        (label) => label.textContent,
      ),
    ).toEqual([
      "Styles / component overrides",
      "Styles / component overrides",
      "Styled / unstyled APIs",
      "Styled / unstyled APIs",
      "Styles / component overrides",
      "Styles / component overrides",
      "Styles / component overrides",
      "Styled / unstyled APIs",
      "Styles / component overrides",
      "Utility classes + CSS",
    ]);
    expect(
      [...styling.querySelectorAll("td")].flatMap((cell, index) =>
        cell.classList.contains("different") ? [index] : [],
      ),
    ).toEqual([2, 3, 7, 9]);
    expect(
      getByRole("row", { name: /^Accessibility support/ }).querySelectorAll(
        "td.different",
      ),
    ).toHaveLength(0);
    expect(
      container.querySelectorAll("tbody:first-of-type .difference-mark"),
    ).toHaveLength(0);
  });

  it("documents component helpers, form packages and edition boundaries concretely", () => {
    expect(javascriptTools.mantine.strength).toContain(
      "reusable interaction hooks",
    );
    expect(javascriptTools.mantine.facts[4]).toHaveProperty(
      "label",
      "Standalone hook collection",
    );
    expect(javascriptTools.mantine.facts[4].detail).toContain("@mantine/hooks");
    expect(javascriptTools.mantine.facts[5].detail).toContain("@mantine/form");
    expect(javascriptTools.primevue.facts[5].detail).toContain(
      "@primevue/forms",
    );
    expect(javascriptTools.mui.facts[0].detail).toContain(
      "community and paid features",
    );
    expect(javascriptTools["angular-material"].facts[4].detail).toContain(
      "@angular/cdk",
    );
    expect(javascriptTools["ng-zorro"].facts[1]).toHaveProperty(
      "label",
      "Less theme variables",
    );
    expect(javascriptTools["ng-zorro"].facts[1].detail).toContain(
      "differ from React antd tokens",
    );
    const topic = javascriptTopics.find(
      ({ path }) => path === "/javascript/components/",
    )!;
    expect(topic.note).toContain("not design-quality scores");
    expect(topic.note).toContain("server validation or authorization");
    expect(topic.sources!.length).toBeGreaterThanOrEqual(9);
    for (const source of topic.sources!)
      expect(new URL(source.url).protocol).toBe("https:");
  });

  it("preserves cache-model differences while leaving tied API categories neutral", () => {
    const { getByRole } = renderApp("/javascript/data-fetching/");
    fireEvent.click(getByRole("button", { name: "Features" }));
    const cache = getByRole("row", { name: /^Cache model/ });
    expect(
      [...cache.querySelectorAll(".tool-feature-label")].map(
        (label) => label.textContent,
      ),
    ).toEqual([
      "Keyed results",
      "Keyed results",
      "Normalized entities",
      "Documents / optional entities",
    ]);
    expect(
      [...cache.querySelectorAll("td")].flatMap((cell, index) =>
        cell.classList.contains("different") ? [index] : [],
      ),
    ).toEqual([2, 3]);
    expect(
      getByRole("row", { name: /^API focus/ }).querySelectorAll("td.different"),
    ).toHaveLength(0);
    expect(cache.textContent).toContain("Graphcache adds normalized caching");
  });

  it("keeps application-stack candidates outside feature highlighting", () => {
    const { container } = renderApp(javascriptStacksTopic.path);
    expect(
      container.querySelectorAll("td.different, .difference-mark"),
    ).toHaveLength(0);
  });

  it("uses the same component candidates per ecosystem in comparisons and stacks", () => {
    const components = javascriptTopics.find(
      ({ path }) => path === "/javascript/components/",
    )!;
    expect(components.tools).toHaveLength(10);
    for (const [ecosystem, ids] of [
      ["React", ["mui", "ant-design", "mantine"]],
      ["Vue", ["primevue", "vuetify", "element-plus"]],
      ["Angular", ["angular-material", "primeng", "ng-zorro"]],
      ["Svelte", ["skeleton"]],
    ] as const) {
      expect(
        components.tools
          .filter(({ ecosystems }) => ecosystems.includes(ecosystem))
          .map(({ id }) => id),
      ).toEqual(ids);
      const componentCell = javascriptStacks.find(
        ({ name }) => name === ecosystem,
      )!.services[1];
      expect([
        componentCell[0],
        ...(componentCell[3] ?? []).map(([name]) => name),
      ]).toEqual(ids.map((id) => javascriptTools[id].name));
    }
    expect(javascriptTools.shadcn).toBeUndefined();
    expect(javascriptTools.radix).toBeUndefined();
  });

  it("shows a documented local icon for every component suite", () => {
    const components = javascriptTopics.find(
      ({ path }) => path === "/javascript/components/",
    )!;
    for (const tool of components.tools) expect(tool.logo).toBeTruthy();
    const { container } = renderApp(components.path);
    expect(container.querySelectorAll("thead img.provider-logo")).toHaveLength(
      10,
    );
    for (const [id, filename] of [
      ["ant-design", "js-ant-design.svg"],
      ["element-plus", "js-element-plus.svg"],
      ["primeng", "js-primeng.svg"],
      ["ng-zorro", "js-ng-zorro.svg"],
    ]) {
      expect(javascriptTools[id].logo).toBe(filename);
      const svg = readFileSync(
        resolve(import.meta.dirname, "../../public/providers", filename),
        "utf8",
      );
      expect(svg).toContain("<svg");
      expect(svg).not.toMatch(
        /<script|<foreignObject|<!DOCTYPE|<!ENTITY|\bon[a-z]+\s*=|@import|(?:href|src)\s*=\s*["'](?!#)|url\(\s*["']?(?!#)/i,
      );
      expect(
        container.querySelector(`#tool-${id} img`)?.getAttribute("alt"),
      ).toBe("");
    }
  });

  it("documents Skeleton assets and Svelte integration boundaries in visible stack notes", () => {
    expect(javascriptTools.skeleton.logo).toBe("js-skeleton.ico");
    const bytes = readFileSync(
      resolve(import.meta.dirname, "../../public/providers/js-skeleton.ico"),
    );
    expect([...bytes.subarray(0, 4)]).toEqual([0, 0, 1, 0]);
    const { container } = renderApp(javascriptStacksTopic.path);
    for (const text of [
      "@skeletonlabs/skeleton-svelte",
      "@tailwindcss/forms",
      "@tanstack/svelte-query",
      "@tanstack/svelte-form",
      "per-request",
      "static output cannot execute",
    ])
      expect(container.textContent).toContain(text);
    expect(container.textContent).not.toContain("Click ⓘ");
    for (const id of ["nanostores", "tanstack-query", "tanstack-form"])
      expect(javascriptTools[id].ecosystems).toContain("Svelte");
  });

  it("keeps four complete JavaScript stacks with canonical tool names and explicit integration work", () => {
    expect(javascriptStacks).toHaveLength(4);
    expect(javascriptStackRoles.map(({ label }) => label)).toEqual([
      "Application framework",
      "Component-library candidates",
      "Styling",
      "State management",
      "Data fetching",
      "Forms",
    ]);
    for (const stack of javascriptStacks) {
      expect(stack.services).toHaveLength(javascriptStackRoles.length);
      expect(stack.note.length).toBeGreaterThan(150);
      expect(stack.whenToChoose.length).toBeGreaterThan(60);
      for (const [name, , url, alternatives] of stack.services) {
        expect(name.length).toBeGreaterThan(0);
        expect(new URL(url!).protocol).toBe("https:");
        for (const [otherName, , otherUrl] of alternatives ?? []) {
          expect(
            Object.values(javascriptTools).some(
              (tool) => tool.name === otherName && tool.url === otherUrl,
            ),
          ).toBe(true);
        }
      }
    }
    expect(JSON.stringify(javascriptStacks)).not.toMatch(
      /python|django|flask|fastapi/i,
    );
    const { getByRole, container } = renderApp(javascriptStacksTopic.path);
    expect(getByRole("table").querySelectorAll("tbody td")).toHaveLength(24);
    expect(
      within(getByRole("table"))
        .getAllByRole("columnheader")
        .map((header) => header.textContent),
    ).toEqual([
      "Application stack",
      ...javascriptStackRoles.map(({ label }) => label),
    ]);
    expect(
      container.querySelectorAll("dialog, .combination-info, .info-button"),
    ).toHaveLength(0);
    expect(container.querySelector("h1")?.className).toBe("sr-only");
    expect(
      container.querySelector(".page-heading, .provider-count, select"),
    ).toBeNull();
    expect(container.querySelector(".sources")?.hasAttribute("open")).toBe(
      false,
    );
    expect(
      container.querySelector(".combinations-page > .combinations-footer"),
    ).toBeNull();
    expect(container.textContent).not.toContain("Within means");
    expect(container.textContent).not.toContain("queue and session stores");
    expect(container.textContent).toContain("not installation recipes");
    expect(container.textContent).not.toContain("Hosting documentation");
  });

  it("keeps shared categories out of the table while preserving their navigation and server caveats", () => {
    for (const id of ["js-react-api", "js-vue-api", "js-angular-api"]) {
      const stack = javascriptStacks.find((item) => item.id === id)!;
      expect(stack.services).toHaveLength(6);
      expect(stack.note).toMatch(/validat/i);
      expect(stack.note).toContain("server");
      expect(stack.note).toMatch(/authorization/);
      expect(stack.note).toMatch(/contracts/);
    }
    const angular = javascriptStacks.find(({ id }) => id === "js-angular-api")!;
    expect(angular.sourceUrl).toBe(javascriptTools.angular.url);
    expect(angular.services[0][2]).toBe(javascriptTools.angular.url);
    expect(angular.services[1][0]).toBe("Angular Material");
    expect(angular.note).toContain("Angular does not require NestJS");
    expect(angular.note).toContain(
      "client-form checks do not enforce server validation",
    );
    const { container } = renderApp(javascriptStacksTopic.path);
    expect(container.textContent).toContain("unlisted pairings can also work");
    expect(container.textContent).toContain("not a ranking");
    expect(container.textContent).toContain(
      "not fixed pairings or an exhaustive compatibility matrix",
    );
    const table = within(container.querySelector("table")!);
    for (const label of [
      "Backend candidates",
      "Build tools",
      "Animation",
      "Icons",
      "Database tools",
      "Validation",
      "Testing",
    ])
      expect(table.queryByRole("columnheader", { name: label })).toBeNull();
    expect(table.getByRole("columnheader", { name: "Styling" })).toBeTruthy();
    expect(container.textContent).not.toContain(
      "Build tooling follows your setup:",
    );
    expect(container.textContent).not.toContain("Turbopack");
    const topics = within(
      container.querySelector<HTMLElement>(
        'nav[aria-label="JavaScript / TypeScript topics"]',
      )!,
    );
    for (const label of [
      "Backend frameworks",
      "Build tools",
      "Animation",
      "Icons",
      "Database tools",
      "Validation",
      "Testing",
    ])
      expect(topics.getByRole("link", { name: label })).toBeTruthy();
    expect(container.textContent).toContain("not a dependency checklist");
    expect(angular.note).toContain(
      "Coordinate Angular Material and Angular versions",
    );
  });

  it("groups all nine frameworks and explains every row without ambiguous feature statuses", () => {
    const { getByRole, container } = renderApp("/javascript/ui/");
    const table = within(getByRole("table"));
    fireEvent.click(getByRole("button", { name: "Features" }));
    expect(
      [...container.querySelectorAll('th[scope="colgroup"]')].map((header) => [
        header.textContent,
        header.getAttribute("colspan"),
      ]),
    ).toEqual([
      ["React-based", "3"],
      ["Vue-based", "2"],
      ["Angular", "1"],
      ["Svelte-based", "1"],
      ["Other foundations", "2"],
    ]);
    expect(
      [...container.querySelectorAll(".tool-column-headers th")].map(
        (header) => header.id,
      ),
    ).toEqual([
      "tool-react",
      "tool-next",
      "tool-tanstack-start",
      "tool-vue",
      "tool-nuxt",
      "tool-angular",
      "tool-sveltekit",
      "tool-astro",
      "tool-remix",
    ]);
    const statuses = [
      ...container.querySelectorAll(
        ".tool-capability-status .tool-feature-label",
      ),
    ].map((status) => status.textContent);
    expect(statuses).toHaveLength(27);
    expect(statuses.filter((status) => status === "Included")).toHaveLength(23);
    expect(statuses.filter((status) => status === "—")).toHaveLength(4);
    const routing = table.getByRole("row", { name: /^Routing/ });
    expect(within(routing).getAllByRole("cell")[5].textContent).toContain(
      "Included",
    );
    expect(within(routing).getAllByRole("cell")[5].textContent).toContain(
      "included by default",
    );
    for (const row of container.querySelectorAll<HTMLElement>(
      'tbody th[scope="row"]',
    )) {
      const button = within(row).getByRole("button");
      const dialog = container.querySelector<HTMLDialogElement>(
        `#${button.getAttribute("aria-controls")}`,
      )!;
      const showModal = vi.fn();
      dialog.showModal = showModal;
      fireEvent.click(button);
      expect(showModal).toHaveBeenCalledOnce();
      expect(
        dialog.querySelector(".combination-dialog-body")!.textContent.length,
      ).toBeGreaterThan(60);
    }
    expect(
      table.getByText(/Next.js 16\+: Turbopack for dev and production/),
    ).toBeTruthy();
    expect(table.getByText(/Vite · official create-vue starter/)).toBeTruthy();
    expect(
      table.getByText(/webpack · Rspack · custom Nuxt builder/),
    ).toBeTruthy();
    expect(table.getByText(/No application build step:/)).toBeTruthy();
    expect(table.getByText(/Official Rsbuild integration/)).toBeTruthy();
    expect(table.getByText(/Vite · SvelteKit plugin/)).toBeTruthy();
    expect(container.querySelector("#tool-react-router")).toBeNull();
    expect(container.querySelector("#tool-astro .company")?.textContent).toBe(
      "React · Vue",
    );
    expect(javascriptTools.astro.ecosystems).toEqual(["React", "Vue"]);
    expect(container.textContent).toContain(
      "Remix v3 has its own component model",
    );
    for (const source of frameworksTopic.sources ?? [])
      expect(new URL(source.url).protocol).toBe("https:");
  });

  it("keeps framework cells short while retaining detailed row explanations", () => {
    for (const tool of frameworksTopic.tools) {
      for (const cell of [
        tool.purpose,
        tool.strength,
        tool.limitation,
        ...tool.facts,
      ]) {
        const text = typeof cell === "string" ? cell : cell.detail;
        expect(text.length).toBeLessThanOrEqual(110);
      }
    }
    for (const dimension of frameworksTopic.dimensions)
      expect(dimension.explanation.length).toBeGreaterThan(100);
  });

  it("keeps every framework and its notes available without filtering controls", () => {
    const { getByRole, container } = renderApp("/javascript/ui/");
    fireEvent.click(getByRole("button", { name: "Features" }));
    expect(container.querySelectorAll("tbody td")).toHaveLength(99);
    expect(
      container.querySelector(".section-row th")?.getAttribute("colspan"),
    ).toBe("10");
    expect(
      getByRole("button", { name: "Features" }).getAttribute("aria-expanded"),
    ).toBe("true");
    expect(container.querySelectorAll('th[scope="colgroup"]')).toHaveLength(5);
    expect(container.querySelector("#tool-astro")).toBeTruthy();
    expect(container.querySelectorAll(".sources a")).toHaveLength(
      18 + (frameworksTopic.sources?.length ?? 0),
    );
    expect(container.querySelector("#tool-remix")).toBeTruthy();
    expect(container.querySelector("#tool-tanstack-start")).toBeTruthy();
    expect(container.querySelector("#tool-sveltekit")).toBeTruthy();
    const notes = container.querySelector(".sources")!;
    expect(notes.hasAttribute("open")).toBe(false);
    expect(notes.textContent).toContain(frameworksTopic.note);
    expect(notes.textContent).toContain("Infrastructure, operations, paid");
  });

  it("redirects old application-framework links to the merged comparison", async () => {
    const scroll = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    try {
      const { getByRole, container } = renderApp("/javascript/app-frameworks/");
      await waitFor(() =>
        expect(document.title).toBe("Frameworks & libraries · Stacknotes"),
      );
      expect(getByRole("heading", { level: 1 }).textContent).toBe(
        "Frameworks & libraries",
      );
      expect(
        container
          .querySelector('nav a[aria-current="page"]')
          ?.getAttribute("href"),
      ).toBe("/javascript/ui/");
    } finally {
      scroll.mockRestore();
    }
  });

  it("uses one row per ecosystem in React, Angular, Vue, Svelte order with framework alternatives", () => {
    expect(javascriptStacks.map(({ id }) => id)).toEqual([
      "js-react-api",
      "js-angular-api",
      "js-vue-api",
      "js-svelte-api",
    ]);
    expect(javascriptStacks.map(({ name }) => name)).toEqual([
      "React",
      "Angular",
      "Vue",
      "Svelte",
    ]);
    const react = javascriptStacks[0];
    expect(react.services[0][0]).toBe("Next.js");
    expect(react.services[0][3]?.map(([name]) => name)).toEqual([
      "TanStack Start",
      "Astro",
    ]);
    expect(react.services[1][3]?.map(([name]) => name)).toEqual([
      "Ant Design",
      "Mantine",
    ]);
    expect(react.note).toContain("can replace a separate API");
    const vue = javascriptStacks[2];
    expect(vue.services[0][0]).toBe("Nuxt");
    expect(vue.services[0][3]?.map(([name]) => name)).toEqual(["Astro"]);
    expect(vue.note).toContain("can replace a separate API");
    const { getByRole, container } = renderApp(javascriptStacksTopic.path);
    expect(
      within(getByRole("table"))
        .getAllByRole("rowheader")
        .map((row) => row.querySelector(".combination-name")?.textContent),
    ).toEqual(["React", "Angular", "Vue", "Svelte"]);
    expect(container.textContent).toContain("in editorial order");
    expect(container.textContent).not.toContain("Ordering source:");
  });

  it("keeps added choices in their category and supported UI ecosystem", () => {
    for (const stack of javascriptStacks) {
      for (let index = 1; index < javascriptStackRoles.length; index++) {
        const topic = javascriptTopics.find(
          ({ path }) => path === javascriptStackRoles[index].path,
        )!;
        const [name, , url, alternatives] = stack.services[index];
        for (const [choiceName, choiceUrl] of [
          [name, url],
          ...(alternatives ?? []).map(([otherName, , otherUrl]) => [
            otherName,
            otherUrl,
          ]),
        ]) {
          const tool = topic.tools.find((item) => item.name === choiceName)!;
          expect(tool).toBeDefined();
          expect(choiceUrl).toBe(tool.url);
          expect(
            tool.ecosystems.some(
              (ecosystem) =>
                ecosystem === stack.name || ecosystem === "Framework-agnostic",
            ),
          ).toBe(true);
        }
      }
    }
  });

  it("shows a safe documented local icon for every framework header", () => {
    const expected = [
      ["react", "js-react.svg"],
      ["next", "js-next.svg"],
      ["tanstack-start", "js-tanstack-start.svg"],
      ["vue", "js-vue.svg"],
      ["nuxt", "js-nuxt.svg"],
      ["angular", "js-angular.svg"],
      ["sveltekit", "js-sveltekit.png"],
      ["astro", "js-astro.svg"],
      ["remix", "js-remix.svg"],
    ];
    const notices = readFileSync(
      resolve(import.meta.dirname, "../../THIRD_PARTY_NOTICES.txt"),
      "utf8",
    );
    const { container } = renderApp(frameworksTopic.path);
    expect(container.querySelectorAll("thead img.provider-logo")).toHaveLength(
      9,
    );
    for (const [id, filename] of expected) {
      expect(javascriptTools[id].logo).toBe(filename);
      const image = container.querySelector(`#tool-${id} img.provider-logo`)!;
      expect(image.getAttribute("src")).toBe(`/providers/${filename}`);
      expect(image.getAttribute("alt")).toBe("");
      const bytes = readFileSync(
        resolve(import.meta.dirname, "../../public/providers", filename),
      );
      expect(bytes.length).toBeGreaterThan(100);
      expect(notices).toContain(filename);
      if (filename.endsWith(".svg")) {
        expect(bytes.toString()).toContain("<svg");
        expect(bytes.toString()).not.toMatch(
          /<script|<foreignObject|<!DOCTYPE|<!ENTITY|\bon[a-z]+\s*=|@import|(?:href|src)\s*=\s*["'](?!#)|url\(\s*["']?(?!#)/i,
        );
      } else {
        expect([...bytes.subarray(0, 8)]).toEqual([
          137, 80, 78, 71, 13, 10, 26, 10,
        ]);
      }
    }
  });

  it("uses safe documented local marks where available and linked text otherwise", () => {
    const notices = readFileSync(
      resolve(import.meta.dirname, "../../THIRD_PARTY_NOTICES.txt"),
      "utf8",
    );
    for (const stack of javascriptStacks) {
      for (const [name, logo, url, alternatives] of stack.services) {
        for (const [choiceName, choiceLogo] of [
          [name, logo, url],
          ...(alternatives ?? []),
        ]) {
          expect(choiceName).toBeTruthy();
          if (!choiceLogo) continue;
          expect(choiceLogo).toMatch(/^js-[a-z-]+\.(svg|png|ico)$/);
          const bytes = readFileSync(
            resolve(import.meta.dirname, "../../public/providers", choiceLogo),
          );
          expect(bytes.length).toBeGreaterThan(100);
          expect(notices).toContain(choiceLogo);
          if (choiceLogo.endsWith(".svg")) {
            expect(bytes.toString()).toContain("<svg");
            expect(bytes.toString()).not.toMatch(
              /<script|<foreignObject|href\s*=\s*["']https?:/i,
            );
          }
        }
      }
    }
    expect(javascriptTools["css-modules"].logo).toBe("js-css-modules.png");
    const { container } = renderApp(javascriptStacksTopic.path);
    const expectedLogos = javascriptStacks
      .flatMap(({ services }) =>
        services.flatMap(([, logo, , alternatives]) => [
          logo,
          ...(alternatives ?? []).map(([, otherLogo]) => otherLogo),
        ]),
      )
      .filter(Boolean).length;
    expect(container.querySelectorAll("tbody .provider-logo")).toHaveLength(
      expectedLogos,
    );
    expect(
      within(container.querySelector("table")!).getAllByRole("link", {
        name: "TanStack Query",
      }),
    ).toHaveLength(4);
    for (const image of container.querySelectorAll(".provider-logo"))
      expect(image.getAttribute("alt")).toBe("");
  });

  it("switches groups without changing service entry paths and resets feature disclosure by route", () => {
    const scroll = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    try {
      const { getByRole } = renderApp("/hosting/");
      fireEvent.click(getByRole("link", { name: "JavaScript / TypeScript" }));
      expect(getByRole("heading", { level: 1 }).textContent).toBe(
        javascriptStacksTopic.title,
      );
      expect(getByRole("main")).toBe(document.activeElement);
      fireEvent.click(
        getByRole("link", { name: "Component-library candidates" }),
      );
      fireEvent.click(getByRole("button", { name: "Features" }));
      expect(
        getByRole("button", { name: "Features" }).getAttribute("aria-expanded"),
      ).toBe("true");
      fireEvent.click(getByRole("link", { name: "Frameworks & libraries" }));
      expect(
        getByRole("button", { name: "Features" }).getAttribute("aria-expanded"),
      ).toBe("false");
      fireEvent.click(getByRole("link", { name: "Cloud services" }));
      expect(getByRole("heading", { level: 1 }).textContent).toBe(
        "Services offered",
      );
      fireEvent.click(getByRole("link", { name: "Self-hosted services" }));
      expect(getByRole("heading", { level: 1 }).textContent).toBe(
        "Self-hosted databases",
      );
    } finally {
      scroll.mockRestore();
    }
  });
});
