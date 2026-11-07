// @vitest-environment jsdom
/**
 * Guards mirrored navigation, bounded self-hosted claims and software/operator responsibilities.
 * @packageDocumentation
 */
import { fireEvent, within } from "@testing-library/react";
import { existsSync, readFileSync } from "node:fs";
import { basename, resolve } from "node:path";
import { describe, expect, it, vi } from "vitest";
import {
  categories,
  categoryGroups,
  comparisonCategories,
} from "../../src/data/categories";
import { selfHostedCategories } from "../../src/data/selfHosted";
import {
  selfHostedCombinations,
  selfHostedRoles,
} from "../../src/data/selfHostedCombinations";
import { renderApp } from "./render";

describe("self-hosted services", () => {
  it("mirrors seven topics without changing the six cloud datasets or entry paths", () => {
    expect(categories).toHaveLength(6);
    expect(selfHostedCategories).toHaveLength(6);
    expect(comparisonCategories).toHaveLength(12);
    expect(new Set(comparisonCategories.map(({ path }) => path)).size).toBe(12);
    expect(categoryGroups[1].topics.map(({ label }) => label)).toEqual(
      categoryGroups[0].topics.map(({ label }) => label),
    );
    expect(categoryGroups.map(({ path }) => path)).toEqual([
      "/",
      "/self-hosted/databases/",
    ]);
    expect(
      selfHostedCategories.map(({ data }) => data.providers.length),
    ).toEqual([10, 10, 10, 10, 10, 10]);
  });

  for (const category of selfHostedCategories) {
    it(`${category.label} renders complete software matrices, licenses and operator duties`, () => {
      expect(category.selfHosted).toBe(true);
      const { data } = category;
      expect(data.overview.map(({ label }) => label)).toEqual([
        "Primary purpose",
        "Strengths",
        "Limitations",
        "License & operating costs",
      ]);
      for (const row of [...data.overview, ...data.responsibilities])
        expect(row.values).toHaveLength(data.providers.length);
      for (const row of data.responsibilities) {
        expect(row.explanation.length).toBeGreaterThan(60);
        for (const [status, note] of row.values) {
          expect(["Auto", "Manual", "Excluded"]).toContain(status);
          expect(note.length).toBeGreaterThan(20);
        }
      }
      for (const label of [
        "Servers and network",
        "Updates and security",
        "Access rules",
        "Backups and recovery",
      ]) {
        expect(
          data.responsibilities
            .find((row) => row.label === label)!
            .values.every(([status]) => status === "Manual"),
        ).toBe(true);
      }
      const { getByRole, container } = renderApp(category.path);
      expect(getByRole("heading", { level: 1 }).textContent).toBe(
        category.title,
      );
      expect(document.title).toBe(`${category.title} · Stacknotes`);
      expect(
        getByRole("link", { name: "Self-hosted services" }).getAttribute(
          "aria-current",
        ),
      ).toBe("true");
      expect(
        getByRole("navigation", {
          name: "Self-hosted services topics",
        }).querySelectorAll("a"),
      ).toHaveLength(7);
      expect(
        container.querySelectorAll("thead .provider-heading"),
      ).toHaveLength(data.providers.length);
      expect(
        container.querySelectorAll("thead img.provider-logo"),
      ).toHaveLength(10);
      expect(container.querySelector(".provider-monogram")).toBeNull();
      expect(container.querySelectorAll(".sources a")).toHaveLength(
        data.providers.length,
      );
      expect(
        getByRole("button", { name: "Compact view" }).getAttribute(
          "aria-pressed",
        ),
      ).toBe("true");
      expect(
        getByRole("button", { name: "Who handles what" }).getAttribute(
          "aria-expanded",
        ),
      ).toBe("false");
      expect(container.textContent).toContain(
        "Software handles it after setup",
      );
      expect(container.textContent).toContain("You operate the service");
      expect(container.textContent).toContain("Replication is not a backup");
      expect(container.textContent).not.toContain(
        "These are provider-run products",
      );
      expect(container.textContent).not.toContain("How billing works");
      for (const provider of data.providers) {
        expect(new URL(provider.url).protocol).toBe("https:");
        expect(new URL(provider.license!).protocol).toBe("https:");
        expect(provider.pricing).toBeUndefined();
      }
    });
  }

  it("keeps consequential identity, storage, task and license boundaries explicit", () => {
    const all = selfHostedCategories
      .flatMap(({ data }) => data.overview.flatMap(({ values }) => values))
      .join(" ");
    expect(all).toContain("Server Side Public License");
    expect(all).toContain("AGPLv3");
    expect(all).toContain(
      "MIT core with separately licensed enterprise components",
    );
    expect(all).toContain("Primarily an access-protection service");
    expect(all).toContain("not itself a metrics or log storage engine");
    expect(all).toContain("Requires Redis");
    expect(all).toContain("Requires Windows");
    expect(all).toContain("Not every S3 operation is supported");
    expect(all).toContain("SQLite");
    expect(all).toContain(
      "not a drop-in replacement for transaction-heavy app databases",
    );
    expect(all).toContain(
      "Not a user-account store or ready-made login portal",
    );
    expect(all).toContain(
      "not an OAuth or OpenID Connect authorization server",
    );
    expect(all).toContain("Not an independent object-storage engine");
    expect(all).toContain("Default terms allow non-production evaluation only");
    expect(all).toContain("Icinga 2.16+ uses GPLv3-or-later");
  });

  it("requires existing, documented logos for all 60 products and all suggested services", () => {
    const notices = readFileSync(
      resolve(import.meta.dirname, "../../THIRD_PARTY_NOTICES.txt"),
      "utf8",
    );
    const logos = selfHostedCategories.flatMap(({ data }) =>
      data.providers.map(({ logo }) => logo),
    );
    expect(logos).toHaveLength(60);
    logos.push(
      ...selfHostedCombinations.flatMap(({ services }) =>
        services.map(([, logo]) => `/providers/${logo}`),
      ),
    );
    for (const logo of logos) {
      expect(logo).toMatch(/^\/providers\/[a-z0-9-]+\.(svg|png|ico)$/);
      expect(
        existsSync(resolve(import.meta.dirname, "../../public", `.${logo}`)),
      ).toBe(true);
      expect(notices).toContain(basename(logo));
    }
  });

  it("offers four complete suggestions without fabricating company examples", () => {
    expect(selfHostedCombinations).toHaveLength(4);
    for (const combination of selfHostedCombinations) {
      expect(combination.services).toHaveLength(6);
      expect(combination.example).toBeUndefined();
      expect(combination.note.length).toBeGreaterThan(100);
    }
    expect(selfHostedRoles.map(({ path }) => path)).toEqual([
      "/self-hosted/hosting/",
      "/self-hosted/databases/",
      "/self-hosted/authentication/",
      "/self-hosted/storage/",
      "/self-hosted/jobs/",
      "/self-hosted/monitoring/",
    ]);
    const { getByRole, container } = renderApp("/self-hosted/combinations/");
    expect(getByRole("heading", { level: 1 }).textContent).toBe(
      "Self-hosted combinations",
    );
    expect(getByRole("table").querySelectorAll("tbody tr")).toHaveLength(4);
    expect(getByRole("table").querySelectorAll("tbody td")).toHaveLength(24);
    expect(container.querySelectorAll("tbody img.provider-logo")).toHaveLength(
      24,
    );
    expect(container.querySelector(".provider-monogram")).toBeNull();
    expect(
      container.querySelectorAll(".combination-product-example"),
    ).toHaveLength(0);
    expect(container.textContent).toContain(
      "not ready-made integrations or claims about a company",
    );
    expect(container.textContent).not.toContain("product examples");
  });

  it("switches groups and follows self-hosted role links without losing route focus", () => {
    const scroll = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    try {
      const { getByRole } = renderApp("/hosting/");
      fireEvent.click(getByRole("link", { name: "Self-hosted services" }));
      expect(getByRole("heading", { level: 1 }).textContent).toBe(
        "Self-hosted databases",
      );
      expect(getByRole("main")).toBe(document.activeElement);
      fireEvent.click(
        within(
          getByRole("navigation", { name: "Self-hosted services topics" }),
        ).getByRole("link", { name: "Common combinations" }),
      );
      fireEvent.click(
        within(getByRole("table")).getByRole("link", { name: "Database" }),
      );
      expect(getByRole("heading", { level: 1 }).textContent).toBe(
        "Self-hosted databases",
      );
      fireEvent.click(getByRole("link", { name: "Cloud services" }));
      expect(getByRole("heading", { level: 1 }).textContent).toBe(
        "Managed databases",
      );
      expect(
        getByRole("navigation", { name: "Cloud services topics" }),
      ).toBeTruthy();
    } finally {
      scroll.mockRestore();
    }
  });
});
