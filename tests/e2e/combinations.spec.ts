/**
 * Exercises the compact combination matrix, sticky labels and accessible setup notes.
 * @packageDocumentation
 */
import { test, expect } from "@playwright/test";

for (const width of [360, 768, 1440]) {
  test(`common combinations compare rows by service type at ${width}px`, async ({
    page,
    browserName,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/hosting/");
    await page
      .getByRole("link", { name: "Common combinations", exact: true })
      .click();
    await expect(page).toHaveURL(/\/combinations\/$/);
    await expect(page.getByRole("main")).toBeFocused();
    await page.reload();
    await expect(page).toHaveTitle("Common combinations · Stacknotes");
    await expect(page.locator('nav a[aria-current="page"]')).toHaveText(
      "Common combinations",
    );
    await expect(page.locator('nav a[aria-current="true"]')).toHaveText(
      "Cloud services",
    );
    const region = page.getByRole("region", {
      name: "Common service combinations",
    });
    await expect(region).toHaveClass(/compact/);
    const table = page.getByRole("table", { name: "Services by combination" });
    await expect(table.getByRole("columnheader")).toHaveText([
      "Combination",
      "Hosting",
      "Database",
      "Sign-in & accounts",
      "Storage",
      "Background tasks & queues",
      "Monitoring",
      "Caching",
      "Search",
    ]);
    await expect(table.locator(".combination-name")).toHaveText([
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
    await expect(table.getByRole("cell")).toHaveCount(80);
    await expect(table.getByRole("rowheader")).toHaveCount(10);
    for (const rowIndex of [0, 2, 4, 5, 7, 8, 9]) {
      await expect(
        table
          .locator("tbody tr")
          .nth(rowIndex)
          .getByRole("cell")
          .nth(1)
          .getByRole("link"),
      ).toHaveText("PostgreSQL");
    }
    await expect(table.locator("tbody .company")).toHaveCount(81);
    await expect(
      table.locator("tbody tr > td:first-of-type .company"),
    ).toHaveCount(0);
    await expect(
      table
        .locator("tbody tr")
        .first()
        .getByRole("cell")
        .nth(3)
        .locator(".company"),
    ).toHaveText("Within AWS");
    await expect(
      table
        .locator("tbody tr")
        .nth(8)
        .getByRole("cell")
        .nth(3)
        .locator(".company"),
    ).toHaveText("External · AWS");
    await expect(
      table
        .locator("tbody tr")
        .nth(4)
        .getByRole("cell")
        .nth(1)
        .locator(".company"),
    ).toHaveText("External · Supabase");
    const azureSearch = table
      .locator("tbody tr")
      .nth(1)
      .getByRole("cell")
      .nth(7);
    await expect(azureSearch.getByRole("link")).toHaveText([
      "Elastic Cloud",
      "Algolia",
      "Typesense Cloud",
    ]);
    await expect(azureSearch.locator(".company")).toHaveText([
      "External · Elastic",
      "External · Algolia",
      "External · Typesense",
    ]);
    for (const link of await azureSearch.getByRole("link").all()) {
      await expect(link).toHaveCSS("font-weight", "400");
    }
    await expect(
      table
        .locator("tbody tr")
        .nth(7)
        .getByRole("cell")
        .nth(6)
        .getByRole("link"),
    ).toHaveText(["Valkey", "Redis"]);
    await expect(
      table
        .locator("tbody tr")
        .nth(7)
        .getByRole("cell")
        .nth(6)
        .locator(".company"),
    ).toHaveText(["Within DigitalOcean", "External · Upstash"]);
    await expect(
      table
        .locator("tbody tr")
        .last()
        .getByRole("cell")
        .nth(6)
        .getByRole("link"),
    ).toHaveText(["Redis", "Redis"]);
    await expect(
      table
        .locator("tbody tr")
        .last()
        .getByRole("cell")
        .nth(6)
        .locator(".company"),
    ).toHaveText(["Within Railway", "External · Upstash"]);
    await expect(
      table.getByRole("link", {
        name: "Redis — Within Railway",
        exact: true,
      }),
    ).toHaveAttribute("href", "https://docs.railway.com/guides/redis");
    await expect(
      page.getByText("10 combinations", { exact: true }),
    ).toBeVisible();
    await expect(table.locator(".combination-product-example")).toHaveCount(0);
    await expect(table.locator("details")).toHaveCount(0);
    await expect(page.locator(".combination-dialog")).toHaveCount(10);
    const guidance = page.locator("#choice-aws");
    await expect(guidance).toBeHidden();
    const name = table.locator(".combination-name").first();
    const info = table.getByRole("button", {
      name: "About AWS",
      exact: true,
    });
    await name.hover();
    await expect(guidance).toBeHidden();
    await info.hover();
    await expect(guidance).toBeHidden();
    await info.focus();
    await expect(guidance).toBeHidden();
    await page.keyboard.press("Enter");
    await expect(guidance).toBeVisible();
    await expect(guidance).toHaveAccessibleName("AWS");
    await expect(guidance).toContainText("wide choice of cloud services");
    await expect(guidance).toContainText(
      "more setup than with a small app platform",
    );
    const popup = await guidance.boundingBox();
    expect(
      Math.abs(popup!.x + popup!.width / 2 - width / 2),
    ).toBeLessThanOrEqual(2);
    expect(Math.abs(popup!.y + popup!.height / 2 - 450)).toBeLessThanOrEqual(2);
    await expect(
      guidance.getByRole("button", { name: "Close combination guide" }),
    ).toBeFocused();
    await page.keyboard.press("Tab");
    // WebKit's default keyboard preference skips links during Tab navigation.
    if (browserName === "webkit") await guidance.getByRole("link").focus();
    await expect(guidance.getByRole("link")).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(
      guidance.getByRole("button", { name: "Close combination guide" }),
    ).toBeFocused();
    await table.getByRole("link", { name: "Hosting", exact: true }).focus();
    await expect(
      guidance.getByRole("button", { name: "Close combination guide" }),
    ).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(guidance).toBeHidden();
    await expect(info).toBeFocused();
    await info.click();
    await expect(guidance).toBeVisible();
    await guidance
      .getByRole("button", { name: "Close combination guide" })
      .click();
    await expect(guidance).toBeHidden();
    await info.click();
    await page.mouse.click(2, 2);
    await expect(guidance).toBeHidden();
    expect(
      await table
        .locator("tbody tr")
        .first()
        .evaluate((element) => element.getBoundingClientRect().height),
    ).toBeLessThanOrEqual(96);
    if (width === 1440) {
      await table.getByRole("rowheader").nth(5).scrollIntoViewIfNeeded();
      await expect(table.getByRole("rowheader").nth(5)).toBeInViewport();
    }
    for (const image of await table.locator("img").all()) {
      await expect
        .poll(() =>
          image.evaluate(
            (element) => (element as HTMLImageElement).naturalWidth,
          ),
        )
        .toBeGreaterThan(0);
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await expect(table.locator("details[open]")).toHaveCount(0);
    if (width === 1440) {
      expect(
        await region.evaluate(
          (element) => element.scrollWidth <= element.clientWidth,
        ),
      ).toBe(true);
      await region.scrollIntoViewIfNeeded();
      await region.evaluate((element) => {
        element.scrollTop = element.scrollHeight;
      });
      await expect(table.getByRole("rowheader").last()).toBeInViewport();
      await expect(
        table.getByRole("columnheader", {
          name: "Search",
          exact: true,
        }),
      ).toBeInViewport();
      await region.evaluate((element) => {
        element.scrollTop = 0;
      });
    } else {
      await region.focus();
      await page.keyboard.press("ArrowRight");
      await expect
        .poll(() => region.evaluate((element) => element.scrollLeft))
        .toBeGreaterThan(0);
      // Let native keyboard scrolling settle before testing explicit positions.
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
      await region.evaluate((element) => {
        element.scrollLeft = element.scrollWidth;
      });
      await expect(table.getByRole("rowheader").first()).toBeInViewport();
      await expect(
        table.getByRole("columnheader", {
          name: "Search",
          exact: true,
        }),
      ).toBeInViewport();
      await region.evaluate((element) => {
        element.scrollLeft = 0;
      });
      await expect
        .poll(() => region.evaluate((element) => element.scrollLeft))
        .toBe(0);
    }
    const scope = page.locator("#choice-vercel-neon-clerk");
    await table
      .getByRole("button", { name: "About Vercel + Neon + Clerk", exact: true })
      .click();
    await expect(scope).toBeVisible();
    await expect(scope.locator(".combination-product-example")).toHaveCount(0);
    await expect(scope).toContainText(
      "More services means more connections to maintain",
    );
    await expect(scope).not.toContainText("Does not establish Clerk");
    await page.keyboard.press("Escape");
    await expect(scope).toBeHidden();
    await region.evaluate((element) => {
      element.scrollTop = 0;
      element.scrollLeft = 0;
    });
    for (const label of ["Caching", "Search"]) {
      await table.getByRole("link", { name: label, exact: true }).click();
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        `Managed ${label.toLowerCase()}`,
      );
      await page.goBack();
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        "Common combinations",
      );
    }
    const database = table.getByRole("link", { name: "Database", exact: true });
    await database.focus();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Managed databases",
    );
    await page.goBack();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Common combinations",
    );
    expect(errors).toEqual([]);
  });
}
