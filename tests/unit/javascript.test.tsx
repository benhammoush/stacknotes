// @vitest-environment jsdom
/**
 * Guards compact tool comparisons, ecosystem grouping and JavaScript-only stack boundaries.
 * @packageDocumentation
 */
import { fireEvent, waitFor, within } from "@testing-library/react";
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
    expect(tools).toHaveLength(64);
    expect(javascriptTools.solid).toBeUndefined();
    expect(tools.flatMap(({ ecosystems }) => ecosystems)).not.toContain(
      "Solid",
    );
    expect(JSON.stringify([tools, javascriptStacks])).not.toMatch(
      /svelte|skeleton/i,
    );
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
      expect(topic.dimensions).toHaveLength(topic === frameworksTopic ? 7 : 4);
      for (const tool of topic.tools) {
        expect(tool.facts).toHaveLength(topic.dimensions.length);
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
        "Primary purpose",
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

  it("shows all nine component suites in compact groups without selectors", () => {
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
    ]);
    expect(getByRole("table").querySelectorAll("thead th")).toHaveLength(13);
    expect(container.querySelectorAll("tbody td")).toHaveLength(72);
    expect(container.querySelectorAll(".sources a")).toHaveLength(18);
    expect(container.querySelectorAll("select")).toHaveLength(0);
    expect(getByRole("link", { name: "Angular Material" })).toBeTruthy();
  });

  it("preserves role distinctions and runtime/security caveats", () => {
    expect(javascriptTools.primeng.licenseName).toContain("commercial/LTS");
    expect(javascriptTools["testing-library"].facts[0]).toContain(
      "not a standalone test runner",
    );
    expect(javascriptTools.esbuild.facts[3]).toContain("without type checking");
    expect(
      javascriptTopics.find(({ path }) => path.endsWith("data-fetching/"))!
        .note,
    ).toContain("not Redis/Valkey");
  });

  it("uses the same three component suites per ecosystem in comparisons and stacks", () => {
    const components = javascriptTopics.find(
      ({ path }) => path === "/javascript/components/",
    )!;
    expect(components.tools).toHaveLength(9);
    for (const [ecosystem, ids] of [
      ["React", ["mui", "ant-design", "mantine"]],
      ["Vue", ["primevue", "vuetify", "element-plus"]],
      ["Angular", ["angular-material", "primeng", "ng-zorro"]],
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
      9,
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

  it("keeps three complete JavaScript stacks with canonical tool names and explicit integration work", () => {
    expect(javascriptStacks).toHaveLength(3);
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
    expect(getByRole("table").querySelectorAll("tbody td")).toHaveLength(18);
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

  it("groups all eight frameworks and explains every row without ambiguous feature statuses", () => {
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
      ["Other foundations", "2"],
    ]);
    expect(
      [...container.querySelectorAll(".tool-column-headers th")].map(
        (header) => header.id,
      ),
    ).toEqual([
      "tool-react",
      "tool-next",
      "tool-react-router",
      "tool-vue",
      "tool-nuxt",
      "tool-angular",
      "tool-astro",
      "tool-remix",
    ]);
    const statuses = [
      ...container.querySelectorAll(".tool-feature-status"),
    ].map((status) => status.textContent);
    expect(statuses).toHaveLength(24);
    expect(statuses.filter((status) => status === "Included")).toHaveLength(20);
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
    expect(container.querySelectorAll("tbody td")).toHaveLength(88);
    expect(
      container.querySelector(".section-row th")?.getAttribute("colspan"),
    ).toBe("9");
    expect(
      getByRole("button", { name: "Features" }).getAttribute("aria-expanded"),
    ).toBe("true");
    expect(container.querySelectorAll('th[scope="colgroup"]')).toHaveLength(4);
    expect(container.querySelector("#tool-astro")).toBeTruthy();
    expect(container.querySelectorAll(".sources a")).toHaveLength(
      16 + (frameworksTopic.sources?.length ?? 0),
    );
    expect(container.querySelector("#tool-remix")).toBeTruthy();
    expect(container.querySelector("#tool-react-router")).toBeTruthy();
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

  it("uses one row per ecosystem in React, Angular, Vue order with framework alternatives", () => {
    expect(javascriptStacks.map(({ id }) => id)).toEqual([
      "js-react-api",
      "js-angular-api",
      "js-vue-api",
    ]);
    expect(javascriptStacks.map(({ name }) => name)).toEqual([
      "React",
      "Angular",
      "Vue",
    ]);
    const react = javascriptStacks[0];
    expect(react.services[0][0]).toBe("Next.js");
    expect(react.services[0][3]?.map(([name]) => name)).toEqual(["Astro"]);
    expect(react.services[1][3]?.map(([name]) => name)).toEqual([
      "Ant Design",
      "Mantine",
    ]);
    expect(react.note).toContain("can replace a separate API");
    const vue = javascriptStacks[2];
    expect(vue.services[0][0]).toBe("Nuxt");
    expect(vue.services[0][3]).toEqual([]);
    expect(vue.note).toContain("can replace a separate API");
    const { getByRole, container } = renderApp(javascriptStacksTopic.path);
    expect(
      within(getByRole("table"))
        .getAllByRole("rowheader")
        .map((row) => row.querySelector(".combination-name")?.textContent),
    ).toEqual(["React", "Angular", "Vue"]);
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
    ).toHaveLength(3);
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
