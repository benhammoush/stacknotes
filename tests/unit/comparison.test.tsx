// @vitest-environment jsdom
/**
 * Protects the complete editorial baseline, escaping and semantic rendering.
 * @packageDocumentation
 */
import { describe, expect, it } from "vitest";
import data from "../../src/data/databases.json";
import { fireEvent, render } from "@testing-library/react";
import ComparisonPage from "../../src/components/ComparisonPage";
import { categories } from "../../src/data/categories";
import { renderApp } from "./render";

describe("database comparison", () => {
  it("keeps all eight services, four overview rows and eleven responsibility rows", () => {
    expect(data.providers.map(({ name }) => name)).toEqual([
      "D1",
      "RDS",
      "Aurora",
      "Cloud SQL",
      "Azure SQL",
      "Supabase",
      "Neon",
      "Atlas",
    ]);
    expect(data.overview).toHaveLength(4);
    expect(data.responsibilities).toHaveLength(11);
    for (const row of [...data.overview, ...data.responsibilities])
      expect(row.values).toHaveLength(8);
    for (const row of data.responsibilities) {
      expect(row.explanation.length).toBeGreaterThan(60);
      for (const [status] of row.values)
        expect(["Auto", "Manual", "Excluded"]).toContain(status);
    }
    for (const provider of data.providers)
      expect(new URL(provider.url).protocol).toBe("https:");
  });

  it("escapes editorial text rather than interpreting markup", () => {
    const title = `<script a="x">&'</script>`;
    const { container } = render(
      <ComparisonPage category={{ ...categories[0], title }} />,
    );
    expect(container.querySelector("h1")?.textContent).toBe(title);
    expect(container.querySelector("script")).toBeNull();
  });

  it("renders a labelled table, source links and uniquely connected explanations", () => {
    const { container: root } = renderApp();
    expect(root.querySelectorAll("thead th")).toHaveLength(9);
    expect(root.querySelectorAll('th[scope="row"]')).toHaveLength(15);
    expect(root.querySelectorAll("td")).toHaveLength(120);
    expect(root.querySelectorAll("thead a")).toHaveLength(8);
    expect(
      root.querySelectorAll('thead img.provider-logo[alt=""]'),
    ).toHaveLength(8);
    expect(root.querySelector("table caption")?.textContent).toContain(
      "Managed database providers",
    );
    for (const button of root.querySelectorAll(".info-button")) {
      const id = button.getAttribute("popovertarget");
      expect(root.querySelector(`#${id}`)?.hasAttribute("popover")).toBe(true);
      expect(button.getAttribute("aria-label")).toMatch(/^About /);
    }
    expect(root.textContent).toContain("not been independently revalidated");
    expect(root.textContent).toContain("copies are not backups");
  });

  it("keeps the page free of decorative taglines and repeated navigation", () => {
    const { container: root } = renderApp();
    expect(root.querySelector("h1")?.textContent).toBe("Managed databases");
    expect(root.querySelector("footer")).toBeNull();
    for (const removed of [
      "A developer’s field notes",
      "THE COMPARISON NOTEBOOK",
      "What you get. What you trade off.",
      "How to read this",
      "Compare to understand.",
      "The small print matters",
    ]) {
      expect(root.textContent).not.toContain(removed);
    }
  });

  it("collapses only the technical section by default and toggles all its rows together", () => {
    const { container: root } = renderApp();
    const toggle = root.querySelector<HTMLButtonElement>("#technical-toggle")!;
    const rows =
      root.querySelector<HTMLTableSectionElement>("#technical-rows")!;
    expect(toggle.getAttribute("aria-controls")).toBe(rows.id);
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    expect(rows.hidden).toBe(true);
    expect(rows.querySelectorAll("tr")).toHaveLength(11);
    expect(root.querySelectorAll("tbody:not(#technical-rows) td")).toHaveLength(
      32,
    );
    fireEvent.click(toggle);
    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    expect(rows.hidden).toBe(false);
    fireEvent.click(toggle);
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    expect(rows.hidden).toBe(true);
  });
});
