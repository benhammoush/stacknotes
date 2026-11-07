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
  it("mirrors nine topics with focused product sets and unchanged entry paths", () => {
    expect(categories).toHaveLength(8);
    expect(selfHostedCategories).toHaveLength(8);
    expect(comparisonCategories).toHaveLength(16);
    expect(new Set(comparisonCategories.map(({ path }) => path)).size).toBe(16);
    expect(categoryGroups[1].topics.map(({ label }) => label)).toEqual(
      categoryGroups[0].topics.map(({ label }) => label),
    );
    expect(categoryGroups.map(({ path }) => path)).toEqual([
      "/combinations/",
      "/self-hosted/combinations/",
    ]);
    expect(
      selfHostedCategories.map(({ data }) => data.providers.length),
    ).toEqual([8, 10, 10, 10, 3, 4, 10, 10]);
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
      ).toHaveLength(9);
      expect(
        container.querySelectorAll("thead .provider-heading"),
      ).toHaveLength(data.providers.length);
      expect(
        container.querySelectorAll("thead img.provider-logo"),
      ).toHaveLength(data.providers.length);
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

  it("requires existing, documented logos for all software and suggested services", () => {
    const notices = readFileSync(
      resolve(import.meta.dirname, "../../THIRD_PARTY_NOTICES.txt"),
      "utf8",
    );
    const logos = selfHostedCategories.flatMap(({ data }) =>
      data.providers.map(({ logo }) => logo),
    );
    expect(logos).toHaveLength(65);
    logos.push(
      ...selfHostedCombinations.flatMap(({ services }) =>
        services.flatMap(([, logo]) => (logo ? [`/providers/${logo}`] : [])),
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

  it("offers ten distinct associations with choice guidance and scoped documentation examples", () => {
    expect(selfHostedCombinations).toHaveLength(10);
    expect(new Set(selfHostedCombinations.map(({ id }) => id)).size).toBe(10);
    for (const combination of selfHostedCombinations) {
      expect(combination.services).toHaveLength(8);
      expect(combination.whenToChoose.length).toBeGreaterThan(20);
      expect(combination.whenToChoose.length).toBeLessThanOrEqual(280);
      expect(
        `${combination.whenToChoose} ${combination.note}`.split(/\s+/).length,
      ).toBeLessThanOrEqual(100);
      expect(combination.whenToChoose).not.toMatch(/choose this over/i);
      expect(new URL(combination.example.url).protocol).toBe("https:");
      expect(combination.example.confirmed.length).toBeGreaterThan(60);
      expect(combination.example.limitation.length).toBeGreaterThan(60);
      for (const [name, logo, url] of combination.services) {
        expect(name.trim()).not.toBe("");
        if (url) expect(new URL(url).protocol).toBe("https:");
        if (logo) expect(url).not.toBeNull();
      }
      expect(combination.note.length).toBeGreaterThan(100);
    }
    expect(selfHostedRoles.map(({ path }) => path)).toEqual([
      "/self-hosted/hosting/",
      "/self-hosted/databases/",
      "/self-hosted/authentication/",
      "/self-hosted/storage/",
      "/self-hosted/jobs/",
      "/self-hosted/monitoring/",
      "/self-hosted/caching/",
      "/self-hosted/search/",
    ]);
    const { getByRole, container } = renderApp("/self-hosted/combinations/");
    expect(getByRole("heading", { level: 1 }).textContent).toBe(
      "Self-hosted combinations",
    );
    expect(getByRole("table").querySelectorAll("tbody tr")).toHaveLength(10);
    expect(getByRole("table").querySelectorAll("tbody td")).toHaveLength(80);
    expect(container.querySelectorAll("tbody img.provider-logo")).toHaveLength(
      selfHostedCombinations.flatMap(({ services }) =>
        services.filter(([, logo]) => logo),
      ).length,
    );
    expect(container.querySelector(".provider-monogram")).toBeNull();
    expect(
      container.querySelectorAll(".combination-product-example"),
    ).toHaveLength(10);
    expect(container.textContent).toContain(
      "not every service choice or a company's live deployment",
    );
    expect(container.textContent).not.toContain("product examples");
    const rows = getByRole("table").querySelectorAll("tbody tr");
    rows.forEach((row, index) => {
      const combination = selfHostedCombinations[index];
      expect(row.querySelector(".combination-choice")).toBeNull();
      expect(
        container.querySelector(`#choice-${combination.id} p`)?.textContent,
      ).toBe(combination.whenToChoose);
      expect(
        row
          .querySelector("button.combination-info")
          ?.getAttribute("aria-controls"),
      ).toBe(`choice-${combination.id}`);
      expect(row.querySelector("details")).toBeNull();
      const dialog = container.querySelector(`#choice-${combination.id}`)!;
      expect(dialog.tagName).toBe("DIALOG");
      expect(dialog.hasAttribute("open")).toBe(false);
      const example = dialog.querySelector(".combination-product-example")!;
      expect(example.textContent).toContain(combination.example.product);
      expect(example.textContent).toContain(
        "Core association, not a complete deployment",
      );
      expect(dialog.textContent).toContain(combination.note);
      expect(
        example
          .querySelector(
            `a[aria-label="Source for ${combination.example.product}"]`,
          )
          ?.getAttribute("href"),
      ).toBe(combination.example.url);
    });
    expect(container.textContent).toContain("Local files");
    expect(container.textContent).toContain("Built-in app accounts");
    expect(container.textContent).toContain("Redis for multi-worker");
    expect(container.textContent).toContain(
      "— means no separate service is suggested",
    );
    expect(container.textContent).not.toMatch(
      /\boptional\b|not needed by default|no extra cache service/i,
    );
    expect(container.textContent).toContain("App-managed search");
    expect(container.querySelectorAll("tbody .company")).toHaveLength(0);
    const gitlab = selfHostedCombinations.find(
      ({ id }) => id === "rails-sidekiq",
    )!;
    expect(gitlab.services[7][0]).toBe("Basic search");
    expect(gitlab.note).toContain("Elasticsearch or OpenSearch");
    expect(gitlab.note).toContain("Premium or Ultimate");
    expect(gitlab.note).toContain("administrator setup");
  });

  it("switches groups and follows self-hosted role links without losing route focus", () => {
    const scroll = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    try {
      const { getByRole } = renderApp("/hosting/");
      fireEvent.click(getByRole("link", { name: "Self-hosted services" }));
      expect(getByRole("heading", { level: 1 }).textContent).toBe(
        "Self-hosted combinations",
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
        "Common combinations",
      );
      expect(
        getByRole("navigation", { name: "Cloud services topics" }),
      ).toBeTruthy();
    } finally {
      scroll.mockRestore();
    }
  });
});
