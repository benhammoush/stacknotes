/**
 * Built-output reading, keyboard, mouse and narrow-screen comparison journeys.
 * @packageDocumentation
 */
import { test, expect } from "@playwright/test";

test("reads the complete table and opens a keyboard explanation", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("#root")).toBeVisible();
  const logos = page.locator("thead img.provider-logo");
  await expect(logos).toHaveCount(10);
  for (const logo of await logos.all()) {
    await expect
      .poll(() =>
        logo.evaluate((image) => (image as HTMLImageElement).naturalWidth),
      )
      .toBeGreaterThan(0);
  }
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Managed databases",
  );
  await expect(page.getByRole("columnheader")).toHaveCount(11);
  await page
    .getByRole("button", { name: "Who handles what", exact: true })
    .click();
  await expect(page.getByRole("rowheader")).toHaveCount(17);
  await expect(page.getByRole("cell")).toHaveCount(150);
  await expect(page.getByRole("link", { name: "D1" })).toHaveAttribute(
    "href",
    "https://developers.cloudflare.com/d1/",
  );
  const button = page.getByRole("button", {
    name: "About Backups and recovery history",
    exact: true,
  });
  await button.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#term-3")).toBeVisible();
  await expect(page.locator("#term-3")).toContainText("Point-in-time recovery");
  await page.keyboard.press("Escape");
  await expect(page.locator("#term-3")).toBeHidden();
  await expect(button).toBeFocused();
});

test("discovers explanations on hover and can dismiss them", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "Who handles what", exact: true })
    .click();
  await page
    .getByRole("button", { name: "About Maintenance", exact: true })
    .hover();
  await expect(page.locator("#term-0")).toBeVisible();
  await page
    .getByRole("button", { name: "About Maintenance", exact: true })
    .click();
  await expect(page.locator("#term-0")).toBeVisible();
  await page.getByRole("button", { name: "Close explanation" }).click();
  await expect(page.locator("#term-0")).toBeHidden();
});

for (const width of [360, 768, 1440]) {
  test(`compares all services without page overflow at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page
      .getByRole("button", { name: "Who handles what", exact: true })
      .click();
    const region = page.getByRole("region", {
      name: "Managed database comparison",
    });
    await region.scrollIntoViewIfNeeded();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    const hasOverflow = await region.evaluate(
      (element) => element.scrollWidth > element.clientWidth,
    );
    if (hasOverflow) {
      await region.focus();
      await page.keyboard.press("ArrowRight");
      await expect
        .poll(async () => region.evaluate((element) => element.scrollLeft))
        .toBeGreaterThan(0);
    }
    await region.evaluate((element) => {
      element.scrollLeft = element.scrollWidth;
    });
    await expect(
      page.getByRole("link", { name: "D1", exact: true }),
    ).toBeInViewport();
    await expect(
      page.getByRole("button", {
        name: "Who handles what",
        exact: true,
      }),
    ).toBeInViewport();
    await expect(
      page.getByRole("columnheader", { name: "Characteristic" }),
    ).toBeInViewport();
    await page
      .getByRole("button", { name: "About Maintenance", exact: true })
      .focus();
    await page.keyboard.press("Enter");
    await expect(page.locator("#term-0")).toBeVisible();
    const panel = await page.locator("#term-0").boundingBox();
    expect(panel).not.toBeNull();
    expect(panel!.x).toBeGreaterThanOrEqual(0);
    expect(panel!.x + panel!.width).toBeLessThanOrEqual(width);
  });
}

for (const width of [390, 1440, 1920]) {
  test(`keeps the real ten-product table readable at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const table = page.locator("table");
    await expect(page.getByRole("columnheader")).toHaveCount(11);
    expect(
      await table.evaluate((element) => element.getBoundingClientRect().width),
    ).toBeGreaterThanOrEqual(1688);
    expect(
      await table.evaluate((element) =>
        parseFloat(getComputedStyle(element).fontSize),
      ),
    ).toBeGreaterThanOrEqual(14);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.getByLabel("Jump to").selectOption("9");
    await expect(page.locator("#provider-9")).toBeInViewport();
    await expect(
      page.getByRole("columnheader", { name: "Characteristic" }),
    ).toBeInViewport();
    const compact = page.getByRole("button", { name: "Compact view" });
    await expect(compact).toHaveAttribute("aria-pressed", "true");
    const compactWidth = await table.evaluate(
      (element) => element.getBoundingClientRect().width,
    );
    await compact.click();
    expect(
      await table.evaluate((element) => element.getBoundingClientRect().width),
    ).toBeGreaterThan(compactWidth);
  });
}

test("opens an explanation by touch", async ({ browser }) => {
  const context = await browser.newContext({
    hasTouch: true,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  try {
    await page.goto("http://127.0.0.1:4178/");
    await page
      .getByRole("button", { name: "Who handles what", exact: true })
      .tap();
    await page
      .getByRole("button", { name: "About Maintenance", exact: true })
      .tap();
    await expect(page.locator("#term-0")).toBeVisible();
    await page.getByRole("button", { name: "Close explanation" }).tap();
    await expect(page.locator("#term-0")).toBeHidden();
  } finally {
    await context.close();
  }
});

test("expands and collapses the entire technical section by keyboard", async ({
  page,
}) => {
  await page.goto("/");
  const toggle = page.getByRole("button", {
    name: "Who handles what",
    exact: true,
  });
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("#technical-rows")).toBeHidden();
  await expect(page.getByRole("cell")).toHaveCount(40);
  await toggle.focus();
  await page.keyboard.press("Enter");
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#technical-rows")).toBeVisible();
  await expect(page.getByRole("cell")).toHaveCount(150);
  await expect(page.locator("#technical-rows > tr")).toHaveCount(11);
  await page.keyboard.press("Space");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("#technical-rows")).toBeHidden();
  await expect(page.getByRole("cell")).toHaveCount(40);
  await expect(toggle).toBeFocused();
});
