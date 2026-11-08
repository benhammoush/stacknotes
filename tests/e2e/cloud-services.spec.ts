/**
 * Exercises inventory navigation, provider rows, icons and bounded scrolling.
 * @packageDocumentation
 */
import { test, expect } from "@playwright/test";
import {
  cloudProviders,
  cloudServiceRoles,
} from "../../src/data/cloudServices";

for (const width of [360, 768, 1440]) {
  test(`cloud inventory keeps providers and service columns reachable at ${width}px`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/hosting/");
    await page
      .getByRole("link", { name: "Services offered", exact: true })
      .click();
    await expect(page).toHaveURL(/\/combinations\/$/);
    await expect(page.getByRole("main")).toBeFocused();
    await page.reload();
    await expect(page).toHaveTitle("Services offered · Stacknotes");
    await expect(page.locator('nav a[aria-current="page"]')).toHaveText(
      "Services offered",
    );
    await expect(page.locator('nav a[aria-current="true"]')).toHaveText(
      "Cloud services",
    );
    await expect(page.locator(".page-heading")).toHaveCount(0);
    await expect(page.locator("h1")).toHaveClass("sr-only");
    await expect(page.getByRole("combobox")).toHaveCount(0);
    await expect(page.locator(".sources")).not.toHaveAttribute("open");
    const region = page.getByRole("region", {
      name: "Cloud service inventory",
    });
    const table = page.getByRole("table", { name: "Services by provider" });
    await expect(table.getByRole("columnheader")).toHaveText([
      "Provider",
      ...cloudServiceRoles.map(({ label }) => label),
    ]);
    await expect(table.getByRole("rowheader")).toHaveText(
      cloudProviders.map(({ name }) => name),
    );
    await expect(table.getByRole("cell")).toHaveCount(152);
    await expect(page.locator("dialog")).toHaveCount(0);
    await expect(table.getByRole("button")).toHaveCount(0);
    await expect(table.locator("img")).toHaveCount(19);
    for (const image of await table.locator("img").all()) {
      await expect(image).toHaveAttribute("alt", "");
      await expect
        .poll(() =>
          image.evaluate(
            (element) => (element as HTMLImageElement).naturalWidth,
          ),
        )
        .toBeGreaterThan(0);
    }
    const vercel = table.getByRole("row").filter({
      has: page.getByRole("rowheader", { name: "Vercel", exact: true }),
    });
    await expect(vercel.getByRole("cell").nth(1)).toHaveText("—");
    await expect(
      vercel.getByRole("link", { name: "Vercel Blob", exact: true }),
    ).toHaveAttribute("href", "https://vercel.com/docs/vercel-blob");
    await expect(page.locator(".sources p").first()).toBeHidden();
    await page.getByText("Notes & sources", { exact: true }).click();
    await expect(page.locator(".sources p").first()).toContainText(
      "bundled pricing",
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await region.scrollIntoViewIfNeeded();
    if (width < 1440) {
      await region.focus();
      await page.keyboard.press("ArrowRight");
      await expect
        .poll(() => region.evaluate((element) => element.scrollLeft))
        .toBeGreaterThan(0);
      // Wait for native smooth keyboard scrolling to settle before explicit scrolling.
      let previousOffset = -1;
      let stableReads = 0;
      await expect
        .poll(async () => {
          const offset = await region.evaluate((element) => element.scrollLeft);
          stableReads = offset === previousOffset ? stableReads + 1 : 0;
          previousOffset = offset;
          return stableReads;
        })
        .toBeGreaterThanOrEqual(2);
    }
    await region.evaluate((element) => {
      element.scrollLeft = element.scrollWidth;
      element.scrollTop = element.scrollHeight;
    });
    await expect(table.getByRole("rowheader").last()).toBeInViewport();
    await expect(
      table.getByRole("columnheader", { name: "Search", exact: true }),
    ).toBeInViewport();
    await region.evaluate((element) => {
      element.scrollLeft = 0;
      element.scrollTop = 0;
    });
    for (const label of ["Caching", "Search", "Database"]) {
      await table.getByRole("link", { name: label, exact: true }).focus();
      await page.keyboard.press("Enter");
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        label === "Database"
          ? "Managed databases"
          : `Managed ${label.toLowerCase()}`,
      );
      await page.goBack();
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        "Services offered",
      );
    }
    expect(errors).toEqual([]);
  });
}

test("touch navigation opens the inventory without combination popups", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
  });
  try {
    const page = await context.newPage();
    await page.goto("/self-hosted/databases/");
    await page.getByRole("link", { name: "Cloud services", exact: true }).tap();
    const table = page.getByRole("table", { name: "Services by provider" });
    await table.getByRole("rowheader", { name: "AWS", exact: true }).tap();
    await expect(page.locator("dialog")).toHaveCount(0);
    await expect(page).toHaveURL(/\/combinations\/$/);
    await page
      .getByRole("link", { name: "Self-hosted services", exact: true })
      .tap();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Self-hosted databases",
    );
  } finally {
    await context.close();
  }
});
