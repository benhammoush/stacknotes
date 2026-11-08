/**
 * Checks every self-hosted route, source disclosure, responsive table and group navigation in three engines.
 * @packageDocumentation
 */
import { test, expect } from "@playwright/test";

const topics = [
  {
    path: "databases",
    title: "Self-hosted databases",
    label: "Databases",
    count: 8,
  },
  {
    path: "hosting",
    title: "Self-hosted web servers",
    label: "Hosting",
    count: 10,
  },
  {
    path: "authentication",
    title: "Self-hosted sign-in & accounts",
    label: "Sign-in & accounts",
    count: 10,
  },
  {
    path: "storage",
    title: "Self-hosted object storage",
    label: "Storage",
    count: 10,
  },
  {
    path: "caching",
    title: "Self-hosted caching",
    label: "Caching",
    count: 3,
  },
  {
    path: "search",
    title: "Self-hosted search",
    label: "Search",
    count: 4,
  },
  {
    path: "jobs",
    title: "Self-hosted background tasks & queues",
    label: "Background tasks & queues",
    count: 10,
  },
  {
    path: "monitoring",
    title: "Self-hosted monitoring",
    label: "Monitoring",
    count: 10,
  },
];

for (const topic of topics) {
  test(`self-hosted ${topic.path} supports deep reload, explanations and source links`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`/self-hosted/${topic.path}/`);
    await page.reload();
    await expect(page).toHaveTitle(`${topic.title} · Stacknotes`);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      topic.title,
    );
    await expect(page.locator('nav a[aria-current="page"]')).toHaveText(
      topic.label,
    );
    await expect(page.locator('nav a[aria-current="true"]')).toHaveText(
      "Self-hosted services",
    );
    await expect(
      page
        .getByRole("navigation", { name: "Self-hosted services topics" })
        .getByRole("link"),
    ).toHaveCount(8);
    await expect(page.getByRole("columnheader")).toHaveCount(topic.count + 1);
    await expect(page.locator("thead img.provider-logo")).toHaveCount(
      topic.count,
    );
    await expect(page.getByRole("cell")).toHaveCount(topic.count * 4);
    await expect(
      page.getByRole("rowheader", {
        name: "License & operating costs",
        exact: true,
      }),
    ).toBeVisible();
    await expect(page.locator("#comparison")).toHaveClass(/compact/);
    await expect(
      page.getByRole("button", { name: "Compact view" }),
    ).toHaveCount(0);
    await expect(page.locator("h1")).toHaveClass("sr-only");
    await expect(page.locator(".sources")).not.toHaveAttribute("open");
    await expect(page.locator("#technical-rows")).toBeHidden();
    await page
      .getByRole("button", { name: "Who handles what", exact: true })
      .click();
    await expect(page.locator("#technical-rows > tr")).toHaveCount(6);
    await page
      .getByRole("button", { name: "About Servers and network", exact: true })
      .hover();
    await expect(page.locator("#term-2")).toBeHidden();
    await page
      .getByRole("button", { name: "About Servers and network", exact: true })
      .focus();
    await page.keyboard.press("Enter");
    await expect(page.locator("#term-2")).toBeVisible();
    await expect(page.locator("dialog:modal")).toHaveCount(1);
    await expect(page.locator("#term-2")).toContainText(
      "You supply the machines",
    );
    await page.keyboard.press("Escape");
    await expect(page.locator("#term-2")).toBeHidden();
    await expect(
      page.getByRole("button", {
        name: "About Servers and network",
        exact: true,
      }),
    ).toBeFocused();
    await page
      .getByRole("button", { name: "Who handles what", exact: true })
      .click();
    await page.getByText("Notes & sources", { exact: true }).click();
    await expect(page.locator(".sources a")).toHaveCount(topic.count);
    await page.locator("#comparison").evaluate((element) => {
      element.scrollLeft = element.scrollWidth;
    });
    await page.locator("#comparison").scrollIntoViewIfNeeded();
    await expect(page.locator(`#provider-${topic.count - 1}`)).toBeInViewport();
    await expect(
      page.getByRole("columnheader", { name: "Characteristic", exact: true }),
    ).toBeInViewport();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    for (const image of await page.locator(".provider-logo:is(img)").all())
      await expect
        .poll(() =>
          image.evaluate(
            (element) => (element as HTMLImageElement).naturalWidth,
          ),
        )
        .toBeGreaterThan(0);
    expect(errors).toEqual([]);
  });
}

test("all self-hosted comparisons show complete desktop logos", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  for (const topic of topics) {
    await page.goto(`/self-hosted/${topic.path}/`);
    const logos = page.locator("thead img.provider-logo");
    await expect(logos).toHaveCount(topic.count);
    for (const image of await logos.all()) {
      await expect
        .poll(() =>
          image.evaluate(
            (element) => (element as HTMLImageElement).naturalWidth,
          ),
        )
        .toBeGreaterThan(0);
      await expect(image).toHaveCSS("width", "24px");
      await expect(image).toHaveCSS("height", "24px");
    }
    await expect(page.locator(`#provider-${topic.count - 1}`)).toBeInViewport();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    for (const image of await logos.filter({ visible: true }).all()) {
      const src = await image.getAttribute("src");
      if (
        /\/(versity\.png|dramatiq\.png|huey\.png|artemis\.png|victoriametrics\.ico)$/.test(
          src ?? "",
        )
      ) {
        await expect(image).toHaveCSS("background-color", "rgb(238, 238, 238)");
      }
    }
  }
});

for (const width of [360, 1440]) {
  test(`self-hosted category entry and group transitions work at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/hosting/");
    await page
      .getByRole("link", { name: "Self-hosted services", exact: true })
      .click();
    await expect(page).toHaveURL(/\/self-hosted\/databases\/$/);
    await expect(page.getByRole("main")).toBeFocused();
    await page.reload();
    await expect(page).toHaveTitle("Self-hosted databases · Stacknotes");
    const topics = page.getByRole("navigation", {
      name: "Self-hosted services topics",
    });
    await expect(topics.getByRole("link")).toHaveCount(8);
    await expect(
      topics.getByRole("link", { name: "Services offered" }),
    ).toHaveCount(0);
    await expect(page.locator("dialog:modal")).toHaveCount(0);
    await expect(page.getByRole("columnheader")).toHaveCount(9);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    for (const label of ["Caching", "Search"]) {
      await topics.getByRole("link", { name: label, exact: true }).click();
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        `Self-hosted ${label.toLowerCase()}`,
      );
      await page.goBack();
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        "Self-hosted databases",
      );
    }
    await topics.getByRole("link", { name: "Hosting", exact: true }).click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Self-hosted web servers",
    );
    await page
      .getByRole("link", { name: "Cloud services", exact: true })
      .click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Services offered",
    );
    await expect(page.locator('nav a[aria-current="true"]')).toHaveText(
      "Cloud services",
    );
    await expect(page).toHaveURL(/(?<!self-hosted)\/combinations\/$/);
    const table = page.getByRole("table", { name: "Services by provider" });
    await expect(
      table.getByRole("rowheader", { name: "AWS", exact: true }),
    ).toHaveCount(1);
    await expect(table.getByRole("button")).toHaveCount(0);
    await expect(page.locator("dialog")).toHaveCount(0);
    await page.goBack();
    await expect(page.locator("dialog:modal")).toHaveCount(0);
    await page
      .getByRole("link", { name: "Self-hosted services", exact: true })
      .click();
    await expect(page.locator("dialog:modal")).toHaveCount(0);
    expect(
      await page
        .locator("#comparison")
        .evaluate((element) => element.scrollTop),
    ).toBe(0);
    await expect(page).toHaveURL(/\/self-hosted\/databases\/$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Self-hosted databases",
    );
    await page.goto("/self-hosted/combinations/");
    await page.reload();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Page not found",
    );
    await expect(page.getByRole("table")).toHaveCount(0);
  });
}
