// @vitest-environment jsdom
/**
 * Guards complete editorial matrices, source links and status-only difference cues.
 * @packageDocumentation
 */
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { categories } from "../../src/data/categories";
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
      for (const row of [...data.overview, ...data.responsibilities])
        expect(row.values).toHaveLength(8);
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
        root.querySelectorAll('nav[aria-label="Categories"] a'),
      ).toHaveLength(6);
      expect(
        root.querySelector('nav a[aria-current="page"]')?.getAttribute("href"),
      ).toBe(category.path);
      expect(root.querySelector("h1")?.textContent).toBe(category.title);
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

  it("keeps consequential product boundaries visible", () => {
    const hosting = categories.find(({ path }) => path === "/hosting/")!;
    expect(
      hosting.data.providers.find(({ name }) => name === "App Runner")?.caveat,
    ).toBe("Existing customers only");
    const jobs = categories.find(({ path }) => path === "/jobs/")!.data;
    expect(
      jobs.responsibilities.find(({ label }) => label === "Application runtime")
        ?.values[7],
    ).toEqual(["Excluded", "Host application workers"]);
    expect(jobs.overview[0].values[6]).toContain("HTTP pull");
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
