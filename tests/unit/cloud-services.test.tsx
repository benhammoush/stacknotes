// @vitest-environment jsdom
/**
 * Guards provider ownership, inventory scope and accessible Cloud navigation.
 * @packageDocumentation
 */
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { fireEvent, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  cloudProviders,
  cloudServiceRoles,
} from "../../src/data/cloudServices";
import { renderApp } from "./render";

describe("cloud service inventory", () => {
  it("sorts nineteen providers by listed category coverage with alphabetical ties", () => {
    expect(cloudProviders).toHaveLength(19);
    expect(new Set(cloudProviders.map(({ id }) => id)).size).toBe(19);
    expect(new Set(cloudProviders.map(({ name }) => name)).size).toBe(19);
    const names = cloudProviders.map(({ name }) => name);
    expect(names).toEqual([
      "AWS",
      "Azure",
      "Google Cloud",
      "Cloudflare",
      "DigitalOcean",
      "Firebase",
      "Neon",
      "Railway",
      "Supabase",
      "Render",
      "Vercel",
      "Elastic",
      "Upstash",
      "Algolia",
      "Clerk",
      "Inngest",
      "Sentry",
      "Trigger.dev",
      "Typesense",
    ]);
    expect(
      cloudProviders.map(
        (provider) =>
          cloudServiceRoles.filter(({ id }) => provider.services[id]?.length)
            .length,
      ),
    ).toEqual([8, 8, 8, 7, 6, 6, 6, 6, 6, 5, 5, 2, 2, 1, 1, 1, 1, 1, 1]);
    expect(names).toContain("Vercel");
    expect(names).toContain("Supabase");
    expect(names.every((name) => !name.includes(" + "))).toBe(true);
    expect(cloudServiceRoles.map(({ label }) => label)).toEqual([
      "Hosting",
      "Database",
      "Sign-in & accounts",
      "Storage",
      "Background tasks & queues",
      "Monitoring",
      "Caching",
      "Search",
    ]);
  });

  it("uses local provider marks and official links owned by each row's platform", () => {
    const hosts: Record<string, string[]> = {
      algolia: ["www.algolia.com"],
      aws: ["docs.aws.amazon.com", "aws.amazon.com"],
      azure: ["learn.microsoft.com"],
      clerk: ["clerk.com"],
      cloudflare: ["developers.cloudflare.com"],
      digitalocean: ["docs.digitalocean.com"],
      elastic: ["www.elastic.co"],
      firebase: ["firebase.google.com"],
      "google-cloud": ["cloud.google.com", "docs.cloud.google.com"],
      inngest: ["www.inngest.com"],
      neon: ["neon.com"],
      railway: ["docs.railway.com"],
      render: ["render.com"],
      sentry: ["docs.sentry.io"],
      supabase: ["supabase.com"],
      trigger: ["trigger.dev"],
      typesense: ["typesense.org"],
      upstash: ["upstash.com"],
      vercel: ["vercel.com"],
    };
    for (const provider of cloudProviders) {
      expect(
        existsSync(
          resolve(import.meta.dirname, "../../public/providers", provider.logo),
        ),
      ).toBe(true);
      expect(Object.keys(provider.services).length).toBeGreaterThan(0);
      for (const [role, offerings] of Object.entries(provider.services)) {
        expect(cloudServiceRoles.some(({ id }) => id === role)).toBe(true);
        expect(offerings.length).toBeGreaterThan(0);
        expect(new Set(offerings.map(({ url }) => url)).size).toBe(
          offerings.length,
        );
        for (const offering of offerings) {
          expect(offering.name.trim()).not.toBe("");
          const url = new URL(offering.url);
          expect(url.protocol).toBe("https:");
          expect(hosts[provider.id]).toContain(url.hostname);
        }
      }
    }
  });

  it("does not misattribute marketplace databases or external search to the host", () => {
    const vercel = cloudProviders.find(({ id }) => id === "vercel")!;
    expect(vercel.services.database).toBeUndefined();
    expect(vercel.services.auth).toBeUndefined();
    expect(vercel.services.storage?.[0].name).toBe("Vercel Blob");
    expect(vercel.services.jobs?.every(({ note }) => note === "Beta")).toBe(
      true,
    );
    expect(
      cloudProviders.find(({ id }) => id === "supabase")!.services.auth?.[0]
        .name,
    ).toBe("Supabase Auth");
    expect(
      cloudProviders.find(({ id }) => id === "azure")!.services.search?.[0]
        .name,
    ).toBe("Azure AI Search");
    expect(
      cloudProviders.find(({ id }) => id === "google-cloud")!.services
        .search?.[0].name,
    ).toBe("Agent Search");
    expect(
      cloudProviders.find(({ id }) => id === "cloudflare")!.services.search?.[0]
        .name,
    ).toBe("AI Search");
    expect(
      cloudProviders.find(({ id }) => id === "firebase")!.services.search,
    ).toBeUndefined();
    expect(
      cloudProviders.find(({ id }) => id === "upstash")!.services.search,
    ).toBeUndefined();
    expect(
      cloudProviders.find(({ id }) => id === "railway")!.services.database?.[0]
        .note,
    ).toContain("template");
    expect(
      cloudProviders.filter(
        ({ services }) => services.database?.[0].name === "PostgreSQL",
      ),
    ).toHaveLength(7);
  });

  it.each(["/combinations/", "/combinations", "/Combinations/"])(
    "preserves old links at %s while presenting a provider inventory without dialogs",
    (path) => {
      const { getByRole, container } = renderApp(path);
      expect(document.title).toBe("Services offered · Stacknotes");
      expect(getByRole("heading", { level: 1 }).textContent).toBe(
        "Services offered",
      );
      expect(
        getByRole("link", { name: "Cloud services" }).getAttribute(
          "aria-current",
        ),
      ).toBe("true");
      expect(
        getByRole("link", { name: "Services offered" }).getAttribute(
          "aria-current",
        ),
      ).toBe("page");
      expect(
        within(
          getByRole("navigation", { name: "Cloud services topics" }),
        ).getAllByRole("link"),
      ).toHaveLength(9);
      const table = within(
        getByRole("table", { name: "Services by provider" }),
      );
      expect(
        table
          .getAllByRole("columnheader")
          .map(({ textContent }) => textContent),
      ).toEqual(["Provider", ...cloudServiceRoles.map(({ label }) => label)]);
      expect(table.getAllByRole("cell")).toHaveLength(152);
      const rows = container.querySelectorAll("tbody tr");
      expect(rows).toHaveLength(19);
      rows.forEach((row, index) => {
        const provider = cloudProviders[index];
        expect(row.querySelector('th[scope="row"]')?.textContent).toBe(
          provider.name,
        );
        expect(row.querySelector('img[alt=""]')?.getAttribute("src")).toBe(
          `/providers/${provider.logo}`,
        );
        within(row as HTMLElement)
          .getAllByRole("cell")
          .forEach((cell, roleIndex) => {
            const offerings =
              provider.services[cloudServiceRoles[roleIndex].id];
            if (offerings) {
              expect(within(cell).getAllByRole("link")).toHaveLength(
                offerings.length,
              );
              for (const offering of offerings) {
                expect(
                  within(cell)
                    .getByRole("link", { name: offering.name })
                    .getAttribute("href"),
                ).toBe(offering.url);
                if (offering.note)
                  expect(cell.textContent).toContain(offering.note);
              }
            } else {
              expect(cell.textContent).toBe("—");
              expect(within(cell).queryByRole("link")).toBeNull();
              expect(
                within(cell).getByLabelText("No offering listed in this scope"),
              ).toBeTruthy();
            }
          });
      });
      expect(
        container.querySelectorAll("dialog, button.combination-info"),
      ).toHaveLength(0);
      expect(container.querySelector("h1")?.className).toBe("sr-only");
      expect(
        container.querySelector(".page-heading, select, .provider-count"),
      ).toBeNull();
      expect(container.querySelector(".sources")?.hasAttribute("open")).toBe(
        false,
      );
      expect(
        container.querySelector(".cloud-services-page > .cloud-services-note"),
      ).toBeNull();
      expect(container.textContent).toContain(
        "not necessarily bundled, free or automatically connected",
      );
      expect(container.textContent).toContain("not an exhaustive catalog");
      expect(container.textContent).toContain(
        "not that the provider has no related capability",
      );
      expect(container.textContent).toContain(
        "ordered by listed category coverage",
      );
      expect(container.textContent).toContain("not overall provider quality");
      expect(
        getByRole("region", { name: "Cloud service inventory" }).getAttribute(
          "tabindex",
        ),
      ).toBe("0");
    },
  );

  it("navigates to every unchanged dedicated comparison through the column headings", () => {
    const scroll = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    try {
      const { getByRole } = renderApp("/hosting/");
      for (const role of cloudServiceRoles) {
        fireEvent.click(getByRole("link", { name: "Services offered" }));
        expect(getByRole("main")).toBe(document.activeElement);
        fireEvent.click(
          within(getByRole("table")).getByRole("link", {
            name: role.label,
          }),
        );
        expect(getByRole("main")).toBe(document.activeElement);
        expect(document.title).not.toBe("Services offered · Stacknotes");
      }
    } finally {
      scroll.mockRestore();
    }
  });
});
