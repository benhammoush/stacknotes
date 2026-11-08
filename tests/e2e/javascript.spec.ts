/**
 * Exercises compact JavaScript comparisons, ecosystem groups and application stacks in all configured engines.
 * @packageDocumentation
 */
import { test, expect } from "@playwright/test";
import {
  javascriptTopics,
  javascriptTools,
  javascriptStacksTopic,
} from "../../src/data/javascript";
import { javascriptStacks } from "../../src/data/javascriptStacks";

for (const width of [390, 1440]) {
  test(`JavaScript topics support deep reload, sources and bounded layout at ${width}px`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewportSize({ width, height: 900 });
    for (const topic of javascriptTopics) {
      await page.goto(topic.path);
      await page.reload();
      await expect(page).toHaveTitle(`${topic.title} · Stacknotes`);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        topic.title,
      );
      await expect(page.getByRole("heading", { level: 1 })).toHaveClass(
        "sr-only",
      );
      await expect(page.locator(".page-heading")).toHaveCount(0);
      await expect(page.getByRole("combobox")).toHaveCount(0);
      await expect(
        page.getByRole("button", { name: "Compact view" }),
      ).toHaveCount(0);
      await expect(page.locator("#comparison")).toHaveClass(/compact/);
      await expect(page.locator(".sources")).not.toHaveAttribute("open");
      await expect(page.locator(".reading-notes > p")).toHaveCount(0);
      await expect(page.locator('nav a[aria-current="true"]')).toHaveText(
        "JavaScript / TypeScript",
      );
      await expect(page.locator('nav a[aria-current="page"]')).toHaveText(
        topic.label,
      );
      await expect(
        page
          .getByRole("navigation", { name: "JavaScript / TypeScript topics" })
          .getByRole("link"),
      ).toHaveCount(14);
      await expect(page.getByRole("columnheader")).toHaveCount(
        topic.tools.length + 1 + (topic.columnGroups?.length ?? 0),
      );
      await expect(page.getByRole("cell")).toHaveCount(topic.tools.length * 4);
      await expect(
        page.getByRole("button", { name: "Features", exact: true }),
      ).toHaveAttribute("aria-expanded", "false");
      await page.getByRole("button", { name: "Features", exact: true }).click();
      await expect(page.getByRole("cell")).toHaveCount(
        topic.tools.length * (topic.dimensions.length + 4),
      );
      await expect(page.locator(".legend")).toHaveCount(0);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      const info = page.getByRole("button", {
        name: "About Primary purpose",
        exact: true,
      });
      const dialog = page.getByRole("dialog", {
        name: "Primary purpose",
        exact: true,
      });
      await info.hover();
      await expect(dialog).toBeHidden();
      await info.focus();
      await expect(dialog).toBeHidden();
      await page.keyboard.press("Enter");
      await expect(dialog).toBeVisible();
      await expect(page.locator("dialog:modal")).toHaveCount(1);
      await page.keyboard.press("Escape");
      await expect(dialog).toBeHidden();
      await expect(info).toBeFocused();
      await page.getByText("Notes & sources", { exact: true }).click();
      await expect(page.locator(".sources a")).toHaveCount(
        topic.tools.length * 2 + (topic.sources?.length ?? 0),
      );
    }
    expect(errors).toEqual([]);
  });

  test(`grouped frameworks preserve inclusion, sticky headers and row explanations at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/javascript/app-frameworks/");
    await expect(page).toHaveURL(/\/javascript\/ui\/$/);
    const table = page.getByRole("table");
    await expect(table.getByRole("cell")).toHaveCount(32);
    await page.getByRole("button", { name: "Features", exact: true }).click();
    await expect(table.locator('th[scope="colgroup"]')).toHaveText([
      "React-based",
      "Vue-based",
      "Angular",
      "Other foundations",
    ]);
    await expect(table.locator(".tool-column-headers th")).toHaveCount(8);
    await expect(table.getByRole("cell")).toHaveCount(88);
    await expect(table.locator(".tool-feature-status")).toHaveCount(24);
    for (const status of await table.locator(".tool-feature-status").all())
      expect(["Included", "—"]).toContain(await status.textContent());
    await expect(
      table
        .getByRole("row", { name: /^Routing/ })
        .locator(".tool-feature-status"),
    ).toHaveText([
      "—",
      "Included",
      "Included",
      "Included",
      "Included",
      "Included",
      "Included",
      "Included",
    ]);
    await page.locator("#comparison").evaluate((element) => {
      element.scrollTop = 300;
      element.scrollLeft = element.scrollWidth;
    });
    const corner = table.locator(".tool-group-corner");
    await expect(corner).toBeInViewport();
    await expect(page.locator("#tool-remix")).toBeInViewport();
    const groupBounds = await table
      .locator(".tool-group-headers th")
      .last()
      .boundingBox();
    const toolBounds = await page.locator("#tool-remix").boundingBox();
    expect(toolBounds!.y).toBeGreaterThanOrEqual(
      groupBounds!.y + groupBounds!.height - 1,
    );
    for (const button of await table.locator(".info-button").all()) {
      const name = (await button.getAttribute("aria-label"))!.replace(
        /^About /,
        "",
      );
      const dialog = page.getByRole("dialog", { name, exact: true });
      // Safari does not focus pointer-clicked buttons; test keyboard focus restoration.
      await button.focus();
      await button.press("Enter");
      await expect(dialog).toBeVisible();
      expect(
        (await dialog.locator(".combination-dialog-body").textContent())!
          .length,
      ).toBeGreaterThan(60);
      await page.keyboard.press("Escape");
      await expect(dialog).toBeHidden();
      await expect(button).toBeFocused();
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  });

  test(`component groups stay compact and feature disclosure resets at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/javascript/components/");
    await expect(page.locator('th[scope="colgroup"]')).toHaveText([
      "React-based",
      "Vue-based",
      "Angular",
    ]);
    for (const group of await page.locator('th[scope="colgroup"]').all())
      await expect(group).toHaveAttribute("colspan", "3");
    await expect(page.getByRole("cell")).toHaveCount(36);
    await expect(page.getByRole("columnheader")).toHaveCount(13);
    await expect(page.getByRole("combobox")).toHaveCount(0);
    await page.getByRole("button", { name: "Features", exact: true }).click();
    await expect(page.getByRole("cell")).toHaveCount(72);
    await page.locator("#comparison").evaluate((element) => {
      element.scrollLeft = element.scrollWidth;
    });
    await expect(page.locator("#tool-ng-zorro")).toBeInViewport();
    await expect(page.locator(".sources > p").first()).toBeHidden();
    await page.getByText("Notes & sources", { exact: true }).click();
    await expect(page.locator(".sources > p").first()).toBeVisible();
    await page.getByRole("link", { name: "Forms", exact: true }).click();
    await expect(
      page.getByRole("button", { name: "Features", exact: true }),
    ).toHaveAttribute("aria-expanded", "false");
    await expect(page.locator("#comparison")).toHaveClass(/compact/);
    await expect(
      page.getByRole("button", { name: "Compact view" }),
    ).toHaveCount(0);
  });

  test(`JavaScript application stacks preserve modal and group boundaries at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page
      .getByRole("link", { name: "JavaScript / TypeScript", exact: true })
      .click();
    await expect(page).toHaveURL(new RegExp(`${javascriptStacksTopic.path}$`));
    await expect(page.getByRole("main")).toBeFocused();
    await page.reload();
    await expect(page).toHaveTitle(
      `${javascriptStacksTopic.title} · Stacknotes`,
    );
    const table = page.getByRole("table", {
      name: "Tools by application stack",
    });
    await expect(table.getByRole("rowheader")).toHaveCount(3);
    await expect(table.getByRole("cell")).toHaveCount(18);
    await expect(table.getByRole("columnheader")).toHaveText([
      "Application stack",
      "Application framework",
      "Component-library candidates",
      "Styling",
      "State management",
      "Data fetching",
      "Forms",
    ]);
    await page.locator("#comparison").evaluate((element) => {
      element.scrollLeft = element.scrollWidth;
    });
    await expect(
      table.getByRole("columnheader", {
        name: "Forms",
        exact: true,
      }),
    ).toBeInViewport();
    const topics = page.getByRole("navigation", {
      name: "JavaScript / TypeScript topics",
    });
    for (const label of [
      "Backend frameworks",
      "Build tools",
      "Animation",
      "Icons",
      "Database tools",
      "Validation",
      "Testing",
    ])
      await expect(
        topics.getByRole("link", { name: label, exact: true }),
      ).toHaveCount(1);
    await expect(table.locator(".combination-name")).toHaveText([
      "React",
      "Angular",
      "Vue",
    ]);
    const images = table.locator("img.provider-logo");
    const expectedLogos = javascriptStacks
      .flatMap(({ services }) =>
        services.flatMap(([, logo, , alternatives]) => [
          logo,
          ...(alternatives ?? []).map(([, otherLogo]) => otherLogo),
        ]),
      )
      .filter(Boolean).length;
    await expect(images).toHaveCount(expectedLogos);
    for (const image of await images.all()) {
      await expect(image).toHaveAttribute("alt", "");
      await expect
        .poll(() =>
          image.evaluate(
            (element) => (element as HTMLImageElement).naturalWidth,
          ),
        )
        .toBeGreaterThan(0);
      await expect(image).toHaveCSS("width", "24px");
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    for (const ui of ["React", "Vue", "Angular"]) {
      const infoButton = page.getByRole("button", {
        name: `About ${ui}`,
        exact: true,
      });
      const row = table.getByRole("row").filter({ has: infoButton });
      const styling = row.getByRole("cell").nth(2);
      await expect(styling.getByRole("link").first()).toHaveText(
        "Tailwind CSS",
      );
      const styles = await styling
        .locator(".provider-heading")
        .evaluateAll((elements) =>
          elements.map((element) => ({
            color: getComputedStyle(element).color,
            weight: getComputedStyle(element).fontWeight,
          })),
        );
      expect(
        styles.every(
          (style) => JSON.stringify(style) === JSON.stringify(styles[0]),
        ),
      ).toBe(true);
    }
    await expect(page.getByText(/Within means/)).toHaveCount(0);
    for (const stack of javascriptStacks) {
      const info = table.getByRole("button", {
        name: `About ${stack.name}`,
        exact: true,
      });
      const dialog = page.getByRole("dialog", {
        name: stack.name,
        exact: true,
      });
      await info.hover();
      await expect(dialog).toBeHidden();
      await info.focus();
      await expect(dialog).toBeHidden();
      await page.keyboard.press("Enter");
      await expect(dialog).toBeVisible();
      await expect(dialog).toContainText(stack.note);
      await expect(
        dialog.getByRole("link", { name: "UI documentation ↗" }),
      ).toHaveAttribute("href", javascriptTools[stack.name.toLowerCase()].url);
      await page.keyboard.press("Escape");
      await expect(info).toBeFocused();
    }
    await page
      .getByRole("link", { name: "Cloud services", exact: true })
      .click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Services offered",
    );
    await page
      .getByRole("link", { name: "Self-hosted services", exact: true })
      .click();
    await expect(page).toHaveURL(/\/self-hosted\/databases\/$/);
    await expect(
      page
        .getByRole("navigation", { name: "Self-hosted services topics" })
        .getByRole("link", { name: "Services offered" }),
    ).toHaveCount(0);
  });
}

test("JavaScript dialogs open by touch and close without navigating", async ({
  browser,
}) => {
  const context = await browser.newContext({
    hasTouch: true,
    viewport: { width: 390, height: 844 },
  });
  try {
    const page = await context.newPage();
    await page.goto("/javascript/stacks/");
    await page.locator(".combination-name").first().tap();
    await expect(page.locator("dialog:modal")).toHaveCount(0);
    await page.getByRole("button", { name: "About React", exact: true }).tap();
    const dialog = page.getByRole("dialog", {
      name: "React",
      exact: true,
    });
    await expect(dialog).toBeVisible();
    const bounds = await dialog.boundingBox();
    expect(Math.abs(bounds!.x + bounds!.width / 2 - 195)).toBeLessThanOrEqual(
      2,
    );
    await dialog.getByRole("button", { name: "Close combination guide" }).tap();
    await expect(dialog).toBeHidden();
    await page.goto("/javascript/ui/");
    await page.getByRole("button", { name: "Features", exact: true }).tap();
    await page
      .getByRole("button", { name: "About Routing", exact: true })
      .tap();
    await expect(
      page.getByRole("dialog", { name: "Routing", exact: true }),
    ).toBeVisible();
    await page
      .getByRole("button", { name: "Close explanation", exact: true })
      .tap();
    await expect(page.locator("dialog:modal")).toHaveCount(0);
  } finally {
    await context.close();
  }
});
