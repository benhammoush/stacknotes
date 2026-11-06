/**
 * Checks every built route, category navigation, local assets and narrow-screen tools.
 * @packageDocumentation
 */
import { test, expect } from "@playwright/test";
const categories = [
  {
    label: "Databases",
    title: "Managed databases",
    path: "/",
    rows: 11,
    term: "Maintenance",
  },
  {
    label: "Hosting",
    title: "Hosting",
    path: "/hosting/",
    rows: 6,
    term: "Managed runtime",
  },
  {
    label: "Authentication",
    title: "Authentication",
    path: "/authentication/",
    rows: 7,
    term: "Identity service",
  },
  {
    label: "Storage",
    title: "Storage",
    path: "/storage/",
    rows: 7,
    term: "Storage infrastructure",
  },
  {
    label: "Jobs & queues",
    title: "Jobs & queues",
    path: "/jobs/",
    rows: 7,
    term: "Service infrastructure",
  },
  {
    label: "Monitoring",
    title: "Monitoring",
    path: "/monitoring/",
    rows: 7,
    term: "Telemetry backend",
  },
];

for (const category of categories) {
  test(`${category.label} supports deep reload, sources and mobile controls`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewportSize({ width: 390, height: 844 });
    const response = await page.goto(category.path);
    expect(response?.status()).toBe(200);
    await page.reload();
    await expect(page).toHaveTitle(
      category.path === "/"
        ? "Stacknotes · Knowledge base"
        : `${category.title} · Stacknotes`,
    );
    if (category.path === "/") {
      expect(
        await page.evaluate(
          () =>
            new Promise<boolean>((resolve) => {
              const image = new Image();
              image.onload = () => resolve(image.naturalWidth > 0);
              image.onerror = () => resolve(false);
              image.src = "/favicon.svg";
            }),
        ),
      ).toBe(true);
    }
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      category.title,
    );
    await expect(page.locator('nav a[aria-current="page"]')).toHaveText(
      category.label,
    );
    await expect(page.locator("#technical-rows")).toBeHidden();
    await expect(page.getByRole("cell")).toHaveCount(32);
    for (const logo of await page.locator(".provider-logo").all()) {
      await expect
        .poll(() =>
          logo.evaluate((image) => (image as HTMLImageElement).naturalWidth),
        )
        .toBeGreaterThan(0);
    }
    expect(
      await page.evaluate(async () => {
        await document.fonts.ready;
        return [...document.fonts].some(
          (font) => font.family === "Inter" && font.status === "loaded",
        );
      }),
    ).toBe(true);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const region = page.locator(".table-scroll");
    const fullWidth = await region.evaluate((element) => element.scrollWidth);
    await page.getByRole("button", { name: "Compact view" }).click();
    await expect(
      page.getByRole("button", { name: "Compact view" }),
    ).toHaveAttribute("aria-pressed", "true");
    expect(
      await region.evaluate((element) => element.scrollWidth),
    ).toBeLessThan(fullWidth);
    await page.getByLabel("Jump to").selectOption("7");
    await expect(page.locator("#provider-7")).toBeInViewport();
    await expect(
      page.getByRole("columnheader", { name: "Characteristic" }),
    ).toBeInViewport();
    await page.getByLabel("Jump to").selectOption("0");
    await expect(page.locator("#provider-0")).toBeInViewport();
    const toggle = page.getByRole("button", {
      name: "Technical responsibilities",
      exact: true,
    });
    await toggle.focus();
    await page.keyboard.press("Enter");
    await expect(page.locator("#technical-rows")).toBeVisible();
    await expect(page.locator("#technical-rows > tr")).toHaveCount(
      category.rows,
    );
    const info = page.getByRole("button", {
      name: `About ${category.term}`,
      exact: true,
    });
    await info.focus();
    await page.keyboard.press("Enter");
    await expect(page.locator("#term-0")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator("#term-0")).toBeHidden();
    await toggle.focus();
    await page.keyboard.press("Space");
    await expect(page.locator("#technical-rows")).toBeHidden();
    if (category.path !== "/") {
      await page.getByText("Billing sources", { exact: true }).click();
      await expect(page.locator(".sources li a")).toHaveCount(8);
    }
    expect(errors).toEqual([]);
  });
}

test("navigates across all six categories and back", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => {
    (window as Window & { navigationMarker?: string }).navigationMarker =
      "same-document";
  });
  for (const category of categories.slice(1)) {
    await page
      .getByRole("navigation", { name: "Categories" })
      .getByRole("link", { name: category.label, exact: true })
      .click();
    await expect(page).toHaveURL(new RegExp(`${category.path}$`));
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      category.title,
    );
    await expect(page.locator("#technical-rows")).toBeHidden();
    expect(
      await page.evaluate(
        () =>
          (window as Window & { navigationMarker?: string }).navigationMarker,
      ),
    ).toBe("same-document");
  }
  await page.goBack();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Jobs & queues",
  );
  await page.getByRole("link", { name: "Stacknotes home" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Managed databases",
  );
  await expect(page).toHaveTitle("Stacknotes · Knowledge base");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    "A growing knowledge base for ideas, clear explanations, practical notes and useful comparisons.",
  );
});

test("serves the knowledge-base favicon and broad HTML metadata before JavaScript", async ({
  browser,
  request,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto("http://127.0.0.1:4178/");
    await expect(page).toHaveTitle("Stacknotes · Knowledge base");
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /knowledge base/,
    );
    await expect(page.locator('link[rel="icon"]')).toHaveAttribute(
      "href",
      "/favicon.svg",
    );
    const response = await request.get("/favicon.svg");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/svg+xml");
    expect(await response.text()).toContain(
      '<svg xmlns="http://www.w3.org/2000/svg"',
    );
  } finally {
    await context.close();
  }
});

test("resets route state, closes old explanations and handles unknown pages", async ({
  page,
}) => {
  await page.goto("/jobs/");
  await page.getByRole("button", { name: "Compact view" }).click();
  await page
    .getByRole("button", { name: "Technical responsibilities", exact: true })
    .click();
  await page
    .getByRole("button", { name: "About Service infrastructure", exact: true })
    .click();
  await expect(page.locator("#term-0")).toBeVisible();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Hosting", exact: true })
    .click();
  await expect(page.locator("#technical-rows")).toBeHidden();
  await expect(page.locator("#term-0")).toBeHidden();
  await expect(
    page.getByRole("button", { name: "Compact view" }),
  ).toHaveAttribute("aria-pressed", "false");
  await expect(page.locator("main")).toBeFocused();
  await page.goBack();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Jobs & queues",
  );
  await expect(page.locator("#technical-rows")).toBeHidden();
  await page.goto("/this-page-does-not-exist");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Page not found",
  );
  await expect(page).toHaveTitle("Page not found · Stacknotes");
  await page.getByRole("link", { name: "Browse comparisons" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Managed databases",
  );
  await page.goto("/hosting");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Hosting");
  await expect(page.locator('nav a[aria-current="page"]')).toHaveText(
    "Hosting",
  );
});
