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
import search from "../../src/data/search.json";
import { renderApp } from "./render";

describe("common combinations", () => {
  it("preserves the accepted order and eight roles with sourced or no-separate-service cells", () => {
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
    expect(combinationRoles).toHaveLength(8);
    expect(combinationRoles.slice(-2)).toEqual([
      { label: "Caching", path: "/caching/" },
      { label: "Search", path: "/search/" },
    ]);
    for (const combination of combinations) {
      expect(combination.services).toHaveLength(combinationRoles.length);
      expect(
        combination.services.slice(0, 6).every(([, logo, url]) => logo && url),
      ).toBe(true);
      expect(combination.note.length).toBeGreaterThan(40);
      expect(combination.whenToChoose.length).toBeGreaterThan(20);
      expect(combination.whenToChoose.length).toBeLessThanOrEqual(280);
      expect(
        `${combination.whenToChoose} ${combination.note}`.split(/\s+/).length,
      ).toBeLessThanOrEqual(100);
      expect(combination.whenToChoose).not.toMatch(/choose this over/i);
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
      for (const [name, logo, url, alternatives] of combination.services) {
        const choices = [[name, logo, url] as const, ...(alternatives ?? [])];
        expect(
          new Set(choices.map(([name, , url]) => `${name}-${url}`)).size,
        ).toBe(choices.length);
        for (const [name, logo, url] of choices) {
          expect(name.trim()).not.toBe("");
          if (url) expect(new URL(url).protocol).toBe("https:");
          if (logo)
            expect(
              existsSync(
                resolve(import.meta.dirname, "../../public/providers", logo),
              ),
            ).toBe(true);
          if (!url) expect(logo).toBeNull();
        }
      }
    }
  });

  it("suggests a sourced cache for every cloud row without assuming app requirements", () => {
    const cacheIndex = combinationRoles.findIndex(
      ({ label }) => label === "Caching",
    );
    for (const combination of combinations) {
      const [name, logo, url] = combination.services[cacheIndex];
      expect(name).not.toBe("—");
      expect(logo).toBeTruthy();
      expect(url).toBeTruthy();
    }
    expect(
      combinations.find(({ id }) => id === "firebase")!.services[cacheIndex],
    ).toEqual(
      combinations.find(({ id }) => id === "google-cloud")!.services[
        cacheIndex
      ],
    );
  });

  it("names PostgreSQL consistently while keeping the provider relationship and service links", () => {
    const postgresIds = [
      "aws",
      "google-cloud",
      "vercel-supabase",
      "vercel-neon-clerk",
      "digitalocean",
      "render",
      "railway",
    ];
    expect(
      combinations
        .filter(({ id }) => postgresIds.includes(id))
        .map(({ services }) => services[1][0]),
    ).toEqual(Array(7).fill("PostgreSQL"));
    const urls = postgresIds.map(
      (id) =>
        combinations.find((combination) => combination.id === id)!
          .services[1][2],
    );
    expect(new Set(urls).size).toBe(7);
    for (const id of postgresIds) {
      expect(
        combinations.find((combination) => combination.id === id)!
          .services[1][4],
      ).toMatch(/^(Within |External · )/);
    }
  });

  it("suggests dedicated search services from the search comparison for every cloud row", () => {
    const searchIndex = combinationRoles.findIndex(
      ({ label }) => label === "Search",
    );
    for (const combination of combinations) {
      const [name, logo, url, alternatives] = combination.services[searchIndex];
      for (const [choiceName, choiceLogo, choiceUrl] of [
        [name, logo, url] as const,
        ...(alternatives ?? []),
      ]) {
        const provider = search.providers.find(
          (provider) => provider.name === choiceName,
        );
        expect(provider).toBeDefined();
        expect(`/providers/${choiceLogo}`).toBe(provider?.logo);
        expect(choiceUrl).toBeTruthy();
      }
    }
  });

  it("separates cache technology from its operator without implying a free bundle", () => {
    expect(
      combinations.map(({ services }) => [services[6][0], services[6][4]]),
    ).toEqual([
      ["Redis or Valkey", "Within AWS"],
      ["Redis", "Within Azure"],
      ["Valkey", "Within Google Cloud"],
      ["Valkey", "Within Google Cloud"],
      ["Redis", "External · Upstash"],
      ["Redis", "External · Upstash"],
      ["Redis", "External · Upstash"],
      ["Valkey", "Within DigitalOcean"],
      ["Valkey", "Within Render"],
      ["Redis", "Within Railway"],
    ]);
    for (const id of ["digitalocean", "railway"]) {
      expect(
        combinations.find((combination) => combination.id === id)!
          .services[6][3]?.[0][3],
      ).toBe("External · Upstash");
    }
    const { container } = renderApp("/combinations/");
    expect(container.querySelectorAll("tbody .company")).toHaveLength(81);
    expect(container.textContent).toContain(
      "Within means the row's hosting platform; external means another provider",
    );
    expect(container.textContent).not.toContain("Provided by");
    expect(container.textContent).not.toMatch(
      /included (by|with)|free bundle/i,
    );
  });

  it("labels every supporting cloud choice relative to hosting, not integration or physical cloud location", () => {
    for (const combination of combinations) {
      expect(combination.services[0][4]).toBeUndefined();
      for (const service of combination.services.slice(1)) {
        expect(service[4]).toMatch(/^(Within |External · )/);
        for (const alternative of service[3] ?? []) {
          expect(alternative[3]).toMatch(/^(Within |External · )/);
        }
      }
    }
    const aws = combinations.find(({ id }) => id === "aws")!;
    expect(
      aws.services.slice(1).every((service) => service[4] === "Within AWS"),
    ).toBe(true);
    for (const id of ["azure", "google-cloud"]) {
      const search = combinations.find((combination) => combination.id === id)!
        .services[7];
      expect(search[4]).toBe("External · Elastic");
      expect(search[3]?.map((choice) => choice[3])).toEqual([
        "External · Algolia",
        "External · Typesense",
      ]);
    }
    const vercelSupabase = combinations.find(
      ({ id }) => id === "vercel-supabase",
    )!;
    expect(
      vercelSupabase.services
        .slice(1, 4)
        .every((service) => service[4] === "External · Supabase"),
    ).toBe(true);
    expect(vercelSupabase.services[4][4]).toBe("External · Trigger.dev");
    expect(vercelSupabase.services[5][4]).toBe("External · Sentry");
    const render = combinations.find(({ id }) => id === "render")!;
    expect(render.services[1][4]).toBe("Within Render");
    expect(render.services[3][4]).toBe("External · AWS");
    expect(
      combinations.find(({ id }) => id === "vercel-neon-clerk")!.services[4][4],
    ).toBe("External · Inngest");
    expect(
      combinations.find(({ id }) => id === "digitalocean")!.services[2][4],
    ).toBe("External · Clerk");
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

  it("keeps clear fits single and presents general search and cache alternatives without changing the other roles", () => {
    for (const combination of combinations) {
      expect(
        combination.services
          .slice(0, 6)
          .every((service) => service[3] === undefined),
      ).toBe(true);
      const [name, , , alternatives] = combination.services[7];
      const choices = [name, ...(alternatives ?? []).map(([name]) => name)];
      if (["aws", "firebase", "vercel-supabase"].includes(combination.id)) {
        expect(choices).toHaveLength(1);
      } else {
        expect(choices).toContain("Algolia");
        expect(choices).toContain("Typesense Cloud");
      }
    }
    expect(
      combinations.find(({ id }) => id === "digitalocean")!.services[6][0],
    ).toBe("Valkey");
    expect(
      combinations.find(({ id }) => id === "railway")!.services[6][0],
    ).toBe("Redis");
    for (const id of ["digitalocean", "railway"]) {
      expect(
        combinations
          .find((combination) => combination.id === id)!
          .services[6][3]?.map(([name]) => name),
      ).toEqual(["Redis"]);
    }
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
        expect(cells).toHaveLength(8);
        cells.forEach((cell, serviceIndex) => {
          const [name, , url, alternatives, providedBy] =
            combinations[index].services[serviceIndex];
          if (url) {
            const link = within(cell).getByRole("link", {
              name: providedBy ? `${name} — ${providedBy}` : name,
            });
            expect(link.getAttribute("href")).toBe(url);
            expect(within(cell).getAllByRole("link")).toHaveLength(
              1 + (alternatives?.length ?? 0),
            );
            for (const [name, , url, providedBy] of alternatives ?? []) {
              expect(
                within(cell)
                  .getByRole("link", {
                    name: providedBy ? `${name} — ${providedBy}` : name,
                  })
                  .getAttribute("href"),
              ).toBe(url);
            }
          } else {
            expect(cell.textContent).toBe(name);
            expect(within(cell).queryByRole("link")).toBeNull();
          }
        });
        expect(row.querySelector(".combination-product-example")).toBeNull();
        expect(row.textContent).not.toContain(
          combinations[index].example.product,
        );
        expect(row.querySelector(".combination-choice")).toBeNull();
        const trigger = within(row as HTMLElement).getByRole("button", {
          name: `About ${combinations[index].name}`,
        });
        expect(trigger.getAttribute("aria-controls")).toBe(
          `choice-${combinations[index].id}`,
        );
        expect(
          container.querySelector(`#choice-${combinations[index].id} p`)
            ?.textContent,
        ).toBe(combinations[index].whenToChoose);
        const dialog = container.querySelector(
          `#choice-${combinations[index].id}`,
        )!;
        expect(dialog.tagName).toBe("DIALOG");
        expect(dialog.hasAttribute("open")).toBe(false);
        expect(dialog.textContent).toContain(combinations[index].note);
        expect(dialog.textContent).not.toMatch(
          /When to choose|What to know|Product example/i,
        );
        expect(row.querySelectorAll('img[alt=""]')).toHaveLength(
          combinations[index].services.reduce(
            (count, [, logo, , alternatives]) =>
              count + (logo ? 1 : 0) + (alternatives?.length ?? 0),
            0,
          ),
        );
      });
      expect(container.textContent).not.toMatch(
        /most popular|Source scope|Company example|Product example/i,
      );
      expect(container.textContent).toContain("not ready-made integrations");
      expect(container.textContent).toContain("Choose by your app's needs");
      expect(container.textContent).toContain(
        "— means no separate service is suggested",
      );
      expect(container.textContent).not.toMatch(
        /\boptional\b|not needed by default/i,
      );
      expect(container.textContent).toContain(
        "A queue store is not automatically an app cache",
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
