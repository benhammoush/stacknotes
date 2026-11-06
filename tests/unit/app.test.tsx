// @vitest-environment jsdom
/**
 * Protects router ownership, page metadata, not-found recovery and per-route state.
 * @packageDocumentation
 */
import { fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { renderApp } from "./render";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("application routing", () => {
  it("keeps the HTML entry and rendered home metadata broad and consistent", () => {
    const html = new DOMParser().parseFromString(
      readFileSync(resolve(import.meta.dirname, "../../index.html"), "utf8"),
      "text/html",
    );
    const description = document.createElement("meta");
    description.name = "description";
    document.head.append(description);
    try {
      renderApp();
      expect(document.title).toBe("Stacknotes · Knowledge base");
      expect(html.title).toBe(document.title);
      expect(description.content).toBe(
        "A growing knowledge base for ideas, clear explanations, practical notes and useful comparisons.",
      );
      expect(
        html.querySelector('meta[name="description"]')?.getAttribute("content"),
      ).toBe(description.content);
      expect(html.querySelector('link[rel="icon"]')?.getAttribute("href")).toBe(
        "/favicon.svg",
      );
    } finally {
      description.remove();
    }
  });
  it.each(["/hosting", "/hosting/", "/Hosting/"])(
    "uses router matching consistently for %s",
    (path) => {
      const { container, getByRole } = renderApp(path);
      expect(getByRole("heading", { level: 1 }).textContent).toBe("Hosting");
      expect(document.title).toBe("Hosting · Stacknotes");
      expect(
        container.querySelector('nav a[aria-current="page"]')?.textContent,
      ).toBe("Hosting");
    },
  );
  it("navigates without replacing the shell and resets comparison controls", async () => {
    const scroll = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    const { container, getByRole } = renderApp();
    const header = container.querySelector("header");
    fireEvent.click(getByRole("button", { name: "Compact view" }));
    fireEvent.click(getByRole("button", { name: "Who handles what" }));
    expect(
      container.querySelector("#technical-rows")?.hasAttribute("hidden"),
    ).toBe(false);
    fireEvent.click(getByRole("link", { name: "Hosting" }));
    await waitFor(() => expect(document.title).toBe("Hosting · Stacknotes"));
    expect(container.querySelector("header")).toBe(header);
    expect(
      container.querySelector(".table-scroll")?.classList.contains("compact"),
    ).toBe(false);
    expect(
      container.querySelector("#technical-rows")?.hasAttribute("hidden"),
    ).toBe(true);
    expect(container.querySelector("main")).toBe(document.activeElement);
    expect(scroll).toHaveBeenCalled();
    fireEvent.click(getByRole("link", { name: "Databases" }));
    expect(document.title).toBe("Stacknotes · Knowledge base");
    expect(
      container.querySelector("#technical-rows")?.hasAttribute("hidden"),
    ).toBe(true);
    scroll.mockRestore();
  });

  it("opens a category's first topic directly without a landing page", () => {
    const scroll = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    const { getByRole, container } = renderApp("/hosting/");
    const cloud = getByRole("link", { name: "Cloud services" });
    expect(cloud.getAttribute("href")).toBe("/");
    expect(cloud.getAttribute("aria-current")).toBe("true");
    expect(
      getByRole("navigation", { name: "Cloud services topics" }),
    ).toBeTruthy();
    expect(container.querySelectorAll("nav")).toHaveLength(2);
    fireEvent.click(cloud);
    expect(getByRole("heading", { level: 1 }).textContent).toBe(
      "Managed databases",
    );
    expect(
      getByRole("link", { name: "Databases" }).getAttribute("aria-current"),
    ).toBe("page");
    expect(getByRole("navigation", { name: "Categories" }).textContent).toBe(
      "Cloud services",
    );
    scroll.mockRestore();
  });

  it("shows unknown pages and recovers through the router", () => {
    const scroll = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    const { getByRole, container } = renderApp("/unknown/nested-page");
    expect(getByRole("heading", { level: 1 }).textContent).toBe(
      "Page not found",
    );
    expect(document.title).toBe("Page not found · Stacknotes");
    expect(container.querySelector("#comparison")).not.toBeNull();
    expect(container.querySelector('nav [aria-current="page"]')).toBeNull();
    expect(container.querySelector('nav [aria-current="true"]')).toBeNull();
    fireEvent.click(getByRole("link", { name: "Browse comparisons" }));
    expect(getByRole("heading", { level: 1 }).textContent).toBe(
      "Managed databases",
    );
    scroll.mockRestore();
  });
});
