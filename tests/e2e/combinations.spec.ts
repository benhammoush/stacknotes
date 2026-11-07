/**
 * Exercises the compact combination matrix, sticky labels and accessible setup notes.
 * @packageDocumentation
 */
import { test, expect } from "@playwright/test";

for (const width of [360, 768, 1440]) {
  test(`common combinations compare rows by service type at ${width}px`, async ({
    page,
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
    await expect(table.getByRole("cell")).toHaveCount(60);
    await expect(table.getByRole("rowheader")).toHaveCount(10);
    await expect(
      page.getByText("10 combinations", { exact: true }),
    ).toBeVisible();
    await expect(table.locator(".combination-product-example")).toHaveCount(10);
    await expect(
      table.locator(".combination-product-example").first(),
    ).toBeHidden();
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
      await region.evaluate((element) => {
        element.scrollTop = element.scrollHeight;
      });
      await expect(table.getByRole("rowheader").last()).toBeInViewport();
      await expect(
        table.getByRole("columnheader", {
          name: "Monitoring",
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
          name: "Monitoring",
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
    const scope = table.locator("th details").nth(5);
    await scope.locator("summary").focus();
    await page.keyboard.press("Enter");
    await expect(scope).toHaveAttribute("open", "");
    const product = scope.locator(".combination-product-example");
    await expect(product).toBeVisible();
    await expect(product).toContainText("partial match");
    await expect(
      product.getByRole("link", { name: "Neptune", exact: true }),
    ).toHaveAttribute("href", "https://meetneptune.com/");
    await expect(
      product.getByRole("link", { name: "Source for Neptune", exact: true }),
    ).toHaveAttribute(
      "href",
      "https://neon.com/blog/neptune-built-a-fast-serverless-backend-with-neon-and-vercel",
    );
    await expect(scope).not.toContainText("Does not establish Clerk");
    await expect(scope.locator("p").first()).toHaveCSS("font-size", "14px");
    await page.keyboard.press("Enter");
    await expect(scope).not.toHaveAttribute("open", "");
    await region.evaluate((element) => {
      element.scrollTop = 0;
      element.scrollLeft = 0;
    });
    const details = table.locator("th details").first();
    await details.locator("summary").focus();
    await page.keyboard.press("Enter");
    await expect(details).toHaveAttribute("open", "");
    await expect(details).toContainText("You connect permissions");
    await expect(details.locator("p").first()).toHaveCSS("font-size", "14px");
    await expect(details.locator("p").first()).toHaveCSS(
      "color",
      "rgb(238, 238, 238)",
    );
    await page.keyboard.press("Enter");
    await expect(details).not.toHaveAttribute("open", "");
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
