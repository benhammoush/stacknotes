// @vitest-environment jsdom
/**
 * Protects the complete editorial baseline, escaping and semantic rendering.
 * @packageDocumentation
 */
import { describe, expect, it, vi } from "vitest";
import data from "../../src/data/databases.json";
import { fireEvent, render } from "@testing-library/react";
import ComparisonPage from "../../src/components/ComparisonPage";
import { categories, comparisonCategories } from "../../src/data/categories";
import { renderApp } from "./render";

describe("database comparison", () => {
  it("covers ten products, four overview rows and eleven responsibility rows", () => {
    expect(data.providers.map(({ name }) => name)).toEqual([
      "RDS",
      "DynamoDB",
      "Atlas",
      "Azure SQL",
      "Cloud SQL",
      "Aurora",
      "Firestore",
      "Supabase",
      "Neon",
      "D1",
    ]);
    expect(data.overview).toHaveLength(4);
    expect(data.responsibilities).toHaveLength(11);
    for (const row of [...data.overview, ...data.responsibilities])
      expect(row.values).toHaveLength(10);
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

  it("sizes the real ten-product comparison from its provider count", () => {
    const { container } = renderApp();
    expect(
      container
        .querySelector("table")
        ?.style.getPropertyValue("--provider-count"),
    ).toBe("10");
    expect(container.querySelectorAll("thead th")).toHaveLength(11);
    expect(container.querySelectorAll("tbody td")).toHaveLength(150);
    expect(container.querySelector(".provider-count")).toBeNull();
    expect(container.querySelector("h1")?.className).toBe("sr-only");
    expect(container.querySelector("select")).toBeNull();
    expect(container.querySelector(".sources")?.hasAttribute("open")).toBe(
      false,
    );
    expect(container.querySelector(".reading-notes > p")).toBeNull();
    expect(
      container.querySelector(".table-scroll")?.classList.contains("compact"),
    ).toBe(true);
    for (const row of container.querySelectorAll("tbody tr:not(.section-row)"))
      expect(row.querySelectorAll("td")).toHaveLength(10);
  });

  it("renders a labelled table, source links and uniquely connected explanations", () => {
    const { container: root } = renderApp();
    expect(root.querySelectorAll("thead th")).toHaveLength(11);
    expect(root.querySelectorAll('th[scope="row"]')).toHaveLength(15);
    expect(root.querySelectorAll("td")).toHaveLength(150);
    expect(root.querySelectorAll("thead a")).toHaveLength(10);
    expect(
      root.querySelectorAll('thead img.provider-logo[alt=""]'),
    ).toHaveLength(10);
    expect(root.querySelector("table caption")?.textContent).toContain(
      "Managed database providers",
    );
    for (const button of root.querySelectorAll(".info-button")) {
      const id = button.getAttribute("aria-controls");
      const dialog = root.querySelector<HTMLDialogElement>(`#${id}`)!;
      expect(dialog.tagName).toBe("DIALOG");
      expect(button.getAttribute("aria-haspopup")).toBe("dialog");
      expect(button.getAttribute("aria-label")).toMatch(/^About /);
      expect(
        root.querySelector(`#${dialog.getAttribute("aria-labelledby")}`)
          ?.textContent,
      ).toBe(button.getAttribute("aria-label")?.replace(/^About /, ""));
      expect(
        root.querySelector(`#${dialog.getAttribute("aria-describedby")}`)
          ?.textContent,
      ).toBeTruthy();
    }
    expect(root.textContent).toContain("not been independently revalidated");
    expect(root.textContent).toContain("copies are not backups");
  });

  it.each(comparisonCategories)(
    "opens $title explanations only on activation",
    (category) => {
      const { container } = render(<ComparisonPage category={category} />);
      const button =
        container.querySelector<HTMLButtonElement>(".info-button")!;
      const dialog = container.querySelector<HTMLDialogElement>(
        `#${button.getAttribute("aria-controls")}`,
      )!;
      const showModal = vi.fn();
      const close = vi.fn();
      dialog.showModal = showModal;
      dialog.close = close;
      fireEvent.pointerEnter(button, { pointerType: "mouse" });
      fireEvent.focus(button);
      expect(showModal).not.toHaveBeenCalled();
      fireEvent.click(button);
      expect(showModal).toHaveBeenCalledOnce();
      fireEvent.click(dialog.querySelector("p")!);
      expect(close).not.toHaveBeenCalled();
      fireEvent.click(dialog.querySelector("button")!);
      expect(close).toHaveBeenCalledOnce();
      fireEvent.click(dialog);
      expect(close).toHaveBeenCalledTimes(2);
    },
  );

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
      40,
    );
    fireEvent.click(toggle);
    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    expect(rows.hidden).toBe(false);
    fireEvent.click(toggle);
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    expect(rows.hidden).toBe(true);
  });
});
