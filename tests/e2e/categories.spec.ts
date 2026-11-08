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
    term: "Hosting infrastructure",
  },
  {
    label: "Sign-in & accounts",
    title: "Sign-in & accounts",
    path: "/authentication/",
    rows: 7,
    term: "Hosted sign-in service",
  },
  {
    label: "Storage",
    title: "Storage",
    path: "/storage/",
    rows: 7,
    term: "Storage infrastructure",
  },
  {
    label: "Caching",
    title: "Managed caching",
    path: "/caching/",
    rows: 5,
    term: "Hosted cache service",
    count: 4,
  },
  {
    label: "Search",
    title: "Managed search",
    path: "/search/",
    rows: 5,
    term: "Hosted search service",
    count: 4,
  },
  {
    label: "Background tasks & queues",
    title: "Background tasks & queues",
    path: "/jobs/",
    rows: 7,
    term: "Hosted task or queue service",
  },
  {
    label: "Monitoring",
    title: "Monitoring",
    path: "/monitoring/",
    rows: 7,
    term: "Hosted monitoring service",
  },
];

for (const category of categories) {
  test(`${category.label} supports deep reload, sources and mobile controls`, async ({
    page,
  }) => {
    const errors: string[] = [];
    const count = category.count ?? 10;
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
    const categoryNav = page.getByRole("navigation", {
      name: "Categories",
      exact: true,
    });
    await expect(categoryNav.getByRole("link")).toHaveCount(2);
    await expect(
      categoryNav.getByRole("link", { name: "Cloud services" }),
    ).toHaveAttribute("aria-current", "true");
    await expect(
      page
        .getByRole("navigation", { name: "Cloud services topics" })
        .getByRole("link"),
    ).toHaveCount(9);
    await expect(page.locator("#technical-rows")).toBeHidden();
    await expect(page.getByRole("cell")).toHaveCount(count * 4);
    const purpose = page.getByRole("row", { name: /^Primary purpose / });
    await expect(purpose.getByRole("cell")).toHaveCount(count);
    await expect(
      page.getByRole("rowheader", { name: "What you get" }),
    ).toHaveCount(0);
    if (category.path === "/hosting/") {
      await page.getByLabel("Jump to").selectOption("9");
      const ecs = page.getByRole("link", {
        name: "ECS Express Mode",
        exact: true,
      });
      await expect(ecs).toBeInViewport();
      await expect(ecs).toHaveAttribute(
        "href",
        "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/express-service-overview.html",
      );
      await expect(purpose.getByRole("cell").nth(9)).toContainText(
        "automated server, network and traffic-routing setup",
      );
      await expect(
        page.getByText(/App Runner|Existing customers only/),
      ).toHaveCount(0);
      await page.getByLabel("Jump to").selectOption("0");
    }
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
    const compactWidth = await region.evaluate(
      (element) => element.scrollWidth,
    );
    await expect(
      page.getByRole("button", { name: "Compact view" }),
    ).toHaveAttribute("aria-pressed", "true");
    await page.getByRole("button", { name: "Compact view" }).click();
    await expect(
      page.getByRole("button", { name: "Compact view" }),
    ).toHaveAttribute("aria-pressed", "false");
    expect(
      await region.evaluate((element) => element.scrollWidth),
    ).toBeGreaterThan(compactWidth);
    await page.getByRole("button", { name: "Compact view" }).click();
    await page.getByLabel("Jump to").selectOption(String(count - 1));
    await expect(page.locator(`#provider-${count - 1}`)).toBeInViewport();
    await expect(
      page.getByRole("columnheader", { name: "Characteristic" }),
    ).toBeInViewport();
    await page.getByLabel("Jump to").selectOption("0");
    await expect(page.locator("#provider-0")).toBeInViewport();
    const toggle = page.getByRole("button", {
      name: "Who handles what",
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
      await page.getByText("Pricing sources", { exact: true }).click();
      await expect(page.locator(".sources li a")).toHaveCount(count);
    }
    expect(errors).toEqual([]);
  });
}

test("navigates across all cloud categories and back", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => {
    (window as Window & { navigationMarker?: string }).navigationMarker =
      "same-document";
  });
  for (const category of categories.slice(1)) {
    await page
      .getByRole("navigation", { name: "Cloud services topics" })
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
    "Background tasks & queues",
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

test("opens Cloud services at Services offered without a landing page", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/hosting/");
  await page
    .getByRole("navigation", { name: "Categories", exact: true })
    .getByRole("link", { name: "Cloud services", exact: true })
    .click();
  await expect(page).toHaveURL("http://127.0.0.1:4178/combinations/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Services offered",
  );
  await expect(
    page.getByRole("link", { name: "Services offered", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  await expect(
    page.getByRole("navigation", { name: "Cloud services topics" }),
  ).toBeVisible();
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
    .getByRole("button", { name: "Who handles what", exact: true })
    .click();
  await page
    .getByRole("button", {
      name: "About Hosted task or queue service",
      exact: true,
    })
    .click();
  await expect(page.locator("#term-0")).toBeVisible();
  await page
    .getByRole("navigation", { name: "Cloud services topics" })
    .getByRole("link", { name: "Hosting", exact: true })
    .click();
  await expect(page.locator("#technical-rows")).toBeHidden();
  await expect(page.locator("#term-0")).toBeHidden();
  await expect(
    page.getByRole("button", { name: "Compact view" }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("main")).toBeFocused();
  await page.goBack();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Background tasks & queues",
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
