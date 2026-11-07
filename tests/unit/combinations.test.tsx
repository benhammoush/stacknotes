// @vitest-environment jsdom
/**
 * Guards combination order, complete service roles, source assets and routed navigation.
 * @packageDocumentation
 */
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { fireEvent, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { combinationRoles, combinations } from "../../src/data/combinations";
import { renderApp } from "./render";

describe("common combinations", () => {
  it("preserves the accepted order and six sourced services per combination", () => {
    expect(combinations.map(({ name }) => name)).toEqual([
      "AWS",
      "Azure",
      "Google Cloud",
      "Firebase + Google Cloud",
      "Vercel + Supabase",
      "Vercel + Neon + Clerk",
      "Cloudflare + Clerk",
      "DigitalOcean + Clerk",
      "Render + Clerk",
      "Railway + Clerk",
    ]);
    expect(new Set(combinations.map(({ id }) => id)).size).toBe(10);
    expect(combinationRoles).toHaveLength(6);
    for (const combination of combinations) {
      expect(combination.services).toHaveLength(combinationRoles.length);
      expect(combination.note.length).toBeGreaterThan(40);
      expect(new URL(combination.example.url).protocol).toBe("https:");
      expect(combination.example.company.trim()).not.toBe("");
      expect(combination.example.product.trim()).not.toBe("");
      if (combination.example.productUrl)
        expect(new URL(combination.example.productUrl).protocol).toBe("https:");
      expect(combination.example.publisher.trim()).not.toBe("");
      expect(combination.example.confirmed.length).toBeGreaterThan(40);
      expect(combination.example.limitation.length).toBeGreaterThan(40);
      if (combination.example.published) {
        expect(combination.example.published).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(Date.parse(combination.example.published)).not.toBeNaN();
      }
      for (const [name, logo, url] of combination.services) {
        expect(name.trim()).not.toBe("");
        expect(new URL(url).protocol).toBe("https:");
        expect(
          existsSync(
            resolve(import.meta.dirname, "../../public/providers", logo),
          ),
        ).toBe(true);
      }
    }
  });

  it("keeps company examples scoped to documented usage and corrects Firebase hosting", () => {
    expect(combinations.map(({ example }) => example.company)).toEqual([
      "Duolingo",
      "Alaska Airlines",
      "Replit",
      "Le Figaro",
      "Resend",
      "Neptune",
      "New Harbor",
      "Picap",
      "Hamilton AI",
      "Bilt Rewards",
    ]);
    const firebase = combinations.find(({ id }) => id === "firebase")!;
    expect(firebase.services[0][0]).toBe("Firebase Hosting + Cloud Run");
    expect(firebase.example.limitation).toContain("Only Firestore overlaps");
    expect(
      combinations.find(({ id }) => id === "azure")!.example.published,
    ).toBe("2015-09-29");
    expect(
      combinations.find(({ id }) => id === "vercel-neon-clerk")!.example
        .limitation,
    ).toContain("Does not establish Clerk");
    expect(
      combinations.find(({ id }) => id === "cloudflare-clerk")!.example
        .limitation,
    ).toContain("Does not establish Clerk");
    const railway = combinations.find(({ id }) => id === "railway")!;
    expect(railway.example.limitation).toContain("Hosting-only example");
    expect(railway.note).toContain("Configure backups");
  });

  it.each(["/combinations/", "/combinations", "/Combinations/"])(
    "renders the first topic at %s with accessible table headers and sources",
    (path) => {
      const { getByRole, container } = renderApp(path);
      expect(document.title).toBe("Common combinations · Stacknotes");
      expect(getByRole("heading", { level: 1 }).textContent).toBe(
        "Common combinations",
      );
      expect(
        getByRole("link", { name: "Cloud services" }).getAttribute(
          "aria-current",
        ),
      ).toBe("true");
      expect(
        getByRole("link", { name: "Common combinations" }).getAttribute(
          "aria-current",
        ),
      ).toBe("page");
      const table = getByRole("table", { name: "Services by combination" });
      expect(
        within(
          getByRole("navigation", { name: "Cloud services topics" }),
        ).getAllByRole("link")[0].textContent,
      ).toBe("Common combinations");
      expect(container.querySelectorAll("details[open]")).toHaveLength(0);
      expect(
        within(table)
          .getAllByRole("columnheader")
          .map((header) => header.textContent),
      ).toEqual(["Combination", ...combinationRoles.map(({ label }) => label)]);
      const rows = table.querySelectorAll("tbody tr");
      expect(rows).toHaveLength(10);
      rows.forEach((row, index) => {
        expect(
          row.querySelector('th[scope="row"] .combination-name')?.textContent,
        ).toBe(combinations[index].name);
        const cells = within(row as HTMLElement).getAllByRole("cell");
        expect(cells).toHaveLength(6);
        cells.forEach((cell, serviceIndex) => {
          const [name, , url] = combinations[index].services[serviceIndex];
          const link = within(cell).getByRole("link", { name });
          expect(link.getAttribute("href")).toBe(url);
        });
        const example = combinations[index].example;
        const product = row.querySelector(
          "th details .combination-product-example",
        ) as HTMLElement;
        expect(product.textContent).toContain(example.product);
        expect(product.textContent).toContain("partial match");
        expect(
          within(product)
            .getByRole("link", {
              name: `Source for ${example.product}`,
              hidden: true,
            })
            .getAttribute("href"),
        ).toBe(example.url);
        if (example.productUrl)
          expect(
            within(product)
              .getByRole("link", { name: example.product, hidden: true })
              .getAttribute("href"),
          ).toBe(example.productUrl);
        expect(row.textContent).not.toContain(example.confirmed);
        expect(row.textContent).not.toContain(example.limitation);
        expect(row.querySelectorAll('img[alt=""]')).toHaveLength(6);
      });
      expect(container.textContent).not.toMatch(
        /adoption|ranking|most popular|Source scope|Company example/i,
      );
      expect(container.textContent).toContain("not ready-made integrations");
      expect(container.textContent).toContain(
        "not confirmation of their current complete setup",
      );
    },
  );

  it("navigates from comparisons to combinations and back through role links", () => {
    const scroll = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    try {
      const { getByRole } = renderApp("/hosting/");
      fireEvent.click(getByRole("link", { name: "Common combinations" }));
      expect(getByRole("main")).toBe(document.activeElement);
      fireEvent.click(
        within(getByRole("table")).getByRole("link", {
          name: "Database",
        }),
      );
      expect(getByRole("heading", { level: 1 }).textContent).toBe(
        "Managed databases",
      );
      expect(document.title).toBe("Stacknotes · Knowledge base");
    } finally {
      scroll.mockRestore();
    }
  });
});
