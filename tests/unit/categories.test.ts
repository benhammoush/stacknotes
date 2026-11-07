// @vitest-environment jsdom
/**
 * Guards complete editorial matrices, source links and status-only difference cues.
 * @packageDocumentation
 */
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { categories, categoryGroups } from "../../src/data/categories";
import { differences } from "../../src/utils/comparison";
import { fireEvent } from "@testing-library/react";
import { renderApp } from "./render";

describe("status differences", () => {
  it("handles empty, uniform, minority and tied-maxima rows", () => {
    expect(differences([])).toEqual([]);
    expect(differences(["Auto", "Auto"])).toEqual([false, false]);
    expect(differences(["Auto", "Manual", "Auto"])).toEqual([
      false,
      true,
      false,
    ]);
    expect(differences(["Auto", "Manual"])).toEqual([false, false]);
    expect(
      differences(["Auto", "Auto", "Manual", "Manual", "Excluded"]),
    ).toEqual([false, false, false, false, true]);
  });
});

describe("six category pages", () => {
  it("owns six registry-driven routes, one HTML entry and local font assets", () => {
    expect(categories).toHaveLength(6);
    expect(categoryGroups.map(({ label }) => label)).toEqual([
      "Cloud services",
    ]);
    expect(categoryGroups[0].topics).toEqual(categories);
    expect(new Set(categories.map(({ path }) => path)).size).toBe(6);
    const html = readFileSync(
      resolve(import.meta.dirname, "../../index.html"),
      "utf8",
    );
    expect(html).toContain('<div id="root"></div>');
    expect(html).toContain('src="/src/main.tsx"');
    for (const category of categories.slice(1))
      expect(
        existsSync(
          resolve(import.meta.dirname, "../..", `.${category.path}index.html`),
        ),
      ).toBe(false);
    const font = readFileSync(
      resolve(import.meta.dirname, "../../public/fonts/InterVariable.woff2"),
    );
    expect(font.subarray(0, 4).toString()).toBe("wOF2");
    expect(
      readFileSync(
        resolve(import.meta.dirname, "../../public/fonts/OFL.txt"),
        "utf8",
      ),
    ).toContain("SIL OPEN FONT LICENSE Version 1.1");
  });

  for (const category of categories) {
    it(`${category.label} has complete matrices, sources and semantic disclosure`, () => {
      const { data } = category;
      expect(data.providers).toHaveLength(8);
      expect(data.overview).toHaveLength(4);
      expect(data.overview.map(({ label }) => label)).toEqual([
        "Primary purpose",
        "Strengths",
        "Limitations",
        "How billing works",
      ]);
      expect(data.overview.some(({ label }) => label === "What you get")).toBe(
        false,
      );
      for (const purpose of data.overview[0].values)
        expect(purpose.trim().length).toBeGreaterThan(30);
      for (const row of [...data.overview, ...data.responsibilities]) {
        expect(row.values).toHaveLength(8);
        const visibleCopy = [row.label, ...row.values.flat()].join(" ");
        expect(visibleCopy).not.toMatch(
          /\b(frontend|backend|full-stack|runtime|workload|SDK|RLS|IAM|B2B|egress|ingest|orchestration|telemetry|idempotency)\b| \/ /i,
        );
      }
      for (const row of data.responsibilities) {
        expect(row.explanation.length).toBeGreaterThan(60);
        for (const value of row.values) {
          expect(value).toHaveLength(2);
          expect(["Auto", "Manual", "Excluded"]).toContain(value[0]);
        }
      }
      for (const provider of data.providers) {
        expect(new URL(provider.url).protocol).toBe("https:");
        expect(
          existsSync(
            resolve(import.meta.dirname, "../../public", `.${provider.logo}`),
          ),
        ).toBe(true);
        if (category.path !== "/")
          expect(new URL(provider.pricing!).protocol).toBe("https:");
      }
      const { container: root } = renderApp(category.path);
      expect(
        root.querySelectorAll('nav[aria-label="Cloud services topics"] a'),
      ).toHaveLength(6);
      expect(
        root.querySelectorAll('nav[aria-label="Categories"] a'),
      ).toHaveLength(1);
      expect(
        root.querySelector(
          'nav[aria-label="Categories"] a[aria-current="true"]',
        )?.textContent,
      ).toBe("Cloud services");
      expect(
        root.querySelector('nav a[aria-current="page"]')?.getAttribute("href"),
      ).toBe(category.path);
      expect(root.querySelector("h1")?.textContent).toBe(category.title);
      expect(root.querySelector("tbody th[scope='row']")?.textContent).toBe(
        "Primary purpose",
      );
      const rows =
        root.querySelector<HTMLTableSectionElement>("#technical-rows")!;
      expect(rows.hidden).toBe(true);
      expect(rows.querySelectorAll("tr")).toHaveLength(
        data.responsibilities.length,
      );
      const expected = data.responsibilities
        .flatMap((row) => differences(row.values.map(([status]) => status)))
        .filter(Boolean).length;
      expect(rows.querySelectorAll("td.different")).toHaveLength(expected);
      for (const cell of rows.querySelectorAll("td.different")) {
        expect(
          cell.querySelector('.difference-mark[aria-hidden="true"]')
            ?.textContent,
        ).toContain("≠");
        expect(cell.querySelector(".sr-only")?.textContent).toContain(
          "less-common status in this row",
        );
      }
      expect(root.querySelectorAll(".sources a")).toHaveLength(
        category.path === "/" ? 0 : 8,
      );
      const compact = root.querySelector<HTMLButtonElement>("#compact-toggle")!;
      fireEvent.click(compact);
      expect(compact.getAttribute("aria-pressed")).toBe("true");
      expect(
        root.querySelector(".table-scroll")?.classList.contains("compact"),
      ).toBe(true);
      fireEvent.click(compact);
      expect(
        root.querySelector(".table-scroll")?.classList.contains("compact"),
      ).toBe(false);
    });
  }

  it("uses shared descriptions for shared purposes and explains necessary terms", () => {
    const hosting = categories.find(({ path }) => path === "/hosting/")!.data;
    expect(hosting.overview[0].values[0]).toBe(hosting.overview[0].values[1]);
    expect(hosting.overview[0].values[3]).toBe(hosting.overview[0].values[4]);
    expect(hosting.responsibilities[0].explanation).toContain(
      "A container packages code and its required software",
    );
    const signIn = categories.find(
      ({ path }) => path === "/authentication/",
    )!.data;
    expect(
      signIn.responsibilities.find(
        ({ label }) => label === "Account recovery and extra checks",
      )?.explanation,
    ).toContain("at least two different kinds of proof");
    const { container } = renderApp("/hosting/");
    expect(container.textContent).toContain(
      "A web app is used through a browser",
    );
  });

  it("describes databases as data storage rather than app hosting", () => {
    const databases = categories.find(({ path }) => path === "/")!.data;
    for (const purpose of databases.overview[0].values) {
      expect(purpose).not.toMatch(/\bapps?\b/i);
      expect(purpose).toMatch(/\b(data|database|PostgreSQL|MySQL)\b/);
    }
    expect(databases.overview[0].values[2]).toBe(
      "Store data in an AWS-built database compatible with MySQL or PostgreSQL",
    );
  });

  it("keeps consequential product boundaries visible", () => {
    const hosting = categories.find(({ path }) => path === "/hosting/")!;
    const ecs = hosting.data.providers.findIndex(
      ({ name }) => name === "ECS Express Mode",
    );
    expect(ecs).toBe(6);
    expect(hosting.data.providers[ecs].url).toContain(
      "/AmazonECS/latest/developerguide/express-service-overview.html",
    );
    expect(
      hosting.data.providers.some(({ name }) => name === "App Runner"),
    ).toBe(false);
    expect(JSON.stringify(hosting.data)).not.toMatch(
      /apprunner|existing customers/i,
    );
    expect(hosting.data.overview[3].values[ecs]).toContain("Fargate");
    expect(hosting.data.overview[3].values[ecs]).toContain("traffic routing");
    expect(hosting.data.responsibilities[1].values[ecs]).toEqual([
      "Manual",
      "Build a container image and set AWS permission roles",
    ]);
    const jobs = categories.find(({ path }) => path === "/jobs/")!.data;
    expect(
      jobs.responsibilities.find(({ label }) => label === "Running task code")
        ?.values[7],
    ).toEqual(["Excluded", "Host background workers separately"]);
    expect(jobs.overview[0].values[6]).toContain("fetch them over the web");
    expect(
      categories
        .find(({ path }) => path === "/monitoring/")!
        .data.responsibilities.every((row) =>
          differences(row.values.map(([status]) => status)).every(
            (cue) => !cue,
          ),
        ),
    ).toBe(true);
  });
});
