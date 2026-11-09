/**
 * Exercises compact JavaScript comparisons, ecosystem groups and application stacks in all configured engines.
 * @packageDocumentation
 */
import { test, expect } from "@playwright/test";
import {
  javascriptTopics,
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
      ).toHaveCount(12);
      await expect(page.getByRole("columnheader")).toHaveCount(
        topic.tools.length + 1 + (topic.columnGroups?.length ?? 0),
      );
      await expect(page.getByRole("cell")).toHaveCount(topic.tools.length * 4);
      if (topic.dimensions.length) {
        await expect(
          page.getByRole("button", { name: "Features", exact: true }),
        ).toHaveAttribute("aria-expanded", "false");
        await page
          .getByRole("button", { name: "Features", exact: true })
          .click();
        await expect(page.getByRole("cell")).toHaveCount(
          topic.tools.length * (topic.dimensions.length + 4),
        );
        await expect(
          page.locator("#technical-rows .tool-feature-label"),
        ).toHaveCount(topic.tools.length * topic.dimensions.length);
        await expect(
          page.locator("tbody:first-of-type td.different"),
        ).toHaveCount(0);
        await expect(page.locator("#tool-help")).toContainText(
          "not better or worse",
        );
        const marked = page.locator("#technical-rows td.different");
        const markedCount = await marked.count();
        expect(markedCount).toBeGreaterThan(0);
        await expect(
          marked.locator('.difference-mark[aria-hidden="true"]'),
        ).toHaveCount(markedCount);
        await expect(marked.locator(".sr-only")).toHaveCount(markedCount);
        await expect(marked.first().locator(".difference-mark")).toHaveText(
          "≠",
        );
        await expect(marked.first().locator(".sr-only")).toContainText(
          "less-common feature label",
        );
        await expect(marked.first().locator(".tool-feature-label")).toHaveCSS(
          "color",
          "rgb(158, 200, 255)",
        );
      } else {
        await expect(
          page.getByRole("button", { name: "Features", exact: true }),
        ).toHaveCount(0);
        await expect(
          page.locator("#technical-rows, .difference-mark"),
        ).toHaveCount(0);
        await expect(page.locator("#tool-help")).not.toContainText(
          "less-common",
        );
      }
      await expect(page.locator(".legend")).toHaveCount(0);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      const info = page.getByRole("button", {
        name: `About ${topic.overviewPurpose?.label ?? "Primary purpose"}`,
        exact: true,
      });
      const dialog = page.getByRole("dialog", {
        name: topic.overviewPurpose?.label ?? "Primary purpose",
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

  test(`unified Styling keeps tool logos, redirects and overview dialogs at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const path of [
      "/javascript/animation/",
      "/javascript/icons/",
      "/javascript/styling/",
    ]) {
      await page.goto(path);
      await expect(page).toHaveURL(/\/javascript\/styling\/$/);
      await page.reload();
      await expect(page).toHaveTitle("Styling tools · Stacknotes");
    }
    await expect(page.getByRole("cell")).toHaveCount(36);
    await expect(page.locator("thead .provider-logo")).toHaveCount(9);
    await expect(page.locator("thead .company")).toHaveText([
      "Utility-first CSS",
      "Animation",
      "Animation",
      "Animation",
      "Animation",
      "Icons",
      "Icons",
      "Icons",
      "Icons",
    ]);
    await expect(
      page.getByRole("row", { name: /^Framework compatibility/ }),
    ).toHaveCount(0);
    await expect(page.locator("tbody img")).toHaveCount(0);
    for (const image of await page.locator("#comparison img").all())
      await expect
        .poll(() =>
          image.evaluate(
            (element) => (element as HTMLImageElement).naturalWidth,
          ),
        )
        .toBeGreaterThan(0);
    await expect(
      page.getByText("Scroll horizontally to see all nine tools →"),
    ).toHaveCount(0);
    const nav = page.getByRole("navigation", {
      name: "JavaScript / TypeScript topics",
    });
    for (const name of ["Animation", "Icons"])
      await expect(nav.getByRole("link", { name, exact: true })).toHaveCount(0);
    for (const label of [
      "Primary purpose",
      "Strengths",
      "Limitations",
      "License & operating costs",
    ]) {
      const button = page.getByRole("button", {
        name: `About ${label}`,
        exact: true,
      });
      await button.focus();
      await page.keyboard.press("Enter");
      await expect(
        page.getByRole("dialog", { name: label, exact: true }),
      ).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(button).toBeFocused();
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.locator("#comparison").evaluate((element) => {
      element.scrollLeft = element.scrollWidth;
    });
    await expect(page.locator("#tool-phosphor")).toBeInViewport();
  });

  test(`grouped frameworks preserve inclusion, sticky headers and row explanations at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/javascript/app-frameworks/");
    await expect(page).toHaveURL(/\/javascript\/ui\/$/);
    const table = page.getByRole("table");
    await expect(table.getByRole("cell")).toHaveCount(36);
    await expect(table.locator("thead img.provider-logo")).toHaveCount(9);
    for (const [id, filename] of [
      ["tanstack-start", "js-tanstack-start.svg"],
      ["sveltekit", "js-sveltekit.png"],
      ["remix", "js-remix.svg"],
    ]) {
      await expect(page.locator(`#tool-${id} img`)).toHaveAttribute(
        "src",
        `/providers/${filename}`,
      );
      await expect(page.locator(`#tool-${id} img`)).toHaveAttribute("alt", "");
    }
    await page.getByRole("button", { name: "Features", exact: true }).click();
    await expect(table.locator('th[scope="colgroup"]')).toHaveText([
      "React-based",
      "Vue-based",
      "Angular",
      "Svelte-based",
      "Other foundations",
    ]);
    await expect(table.locator(".tool-column-headers th")).toHaveCount(9);
    await expect(table.getByRole("cell")).toHaveCount(126);
    await expect(table.locator(".tool-feature-status")).toHaveCount(90);
    await expect(table.locator(".tool-capability-status")).toHaveCount(27);
    const seo = table.getByRole("row", { name: /^SEO & discoverability/ });
    await expect(seo.getByRole("cell")).toHaveCount(9);
    await expect(seo.locator(".tool-feature-label")).toHaveText([
      "App-managed integration",
      "Integrated head APIs",
      "Integrated head APIs",
      "App-managed integration",
      "Integrated head APIs",
      "Metadata services",
      "Document head markup",
      "Document head markup",
      "Document head markup",
    ]);
    await expect(seo.locator(".tool-capability-status")).toHaveCount(0);
    const seoButton = page.getByRole("button", {
      name: "About SEO & discoverability",
      exact: true,
    });
    await seoButton.focus();
    await page.keyboard.press("Enter");
    const seoDialog = page.getByRole("dialog", {
      name: "SEO & discoverability",
      exact: true,
    });
    await expect(seoDialog).toBeVisible();
    await expect(seoDialog).toContainText(
      "neither guarantees indexing or rankings",
    );
    await page.keyboard.press("Escape");
    await expect(seoDialog).toBeHidden();
    await expect(seoButton).toBeFocused();
    const forms = table.getByRole("row", { name: /^Forms support/ });
    await expect(forms.getByRole("cell")).toHaveCount(9);
    await expect(forms.locator(".tool-feature-label")).toHaveText([
      "Basic support",
      "Built-in submissions",
      "Built-in submissions",
      "Basic support",
      "Built-in server handling",
      "Built-in forms",
      "Built-in submissions",
      "Built-in submissions",
      "Built-in submissions",
    ]);
    const formsButton = page.getByRole("button", {
      name: "About Forms support",
      exact: true,
    });
    await formsButton.focus();
    await page.keyboard.press("Enter");
    const formsDialog = page.getByRole("dialog", {
      name: "Forms support",
      exact: true,
    });
    await expect(formsDialog).toBeVisible();
    await expect(formsDialog).toContainText(
      "Basic HTML checks work everywhere",
    );
    await expect(formsDialog).toContainText(
      "The server must validate submissions and enforce authorization",
    );
    await page.keyboard.press("Escape");
    await expect(formsDialog).toBeHidden();
    await expect(formsButton).toBeFocused();
    const fetching = table.getByRole("row", { name: /^Data fetching/ });
    await expect(fetching.locator(".tool-feature-label")).toHaveText([
      "App-managed",
      "Built-in page loading",
      "Built-in page loading",
      "App-managed",
      "Built-in page loading",
      "Built-in HTTP tools",
      "Built-in page loading",
      "Server-side fetching",
      "Built-in server loading",
    ]);
    const fetchingButton = page.getByRole("button", {
      name: "About Data fetching",
      exact: true,
    });
    await fetchingButton.focus();
    await page.keyboard.press("Enter");
    const fetchingDialog = page.getByRole("dialog", {
      name: "Data fetching",
      exact: true,
    });
    await expect(fetchingDialog).toBeVisible();
    await expect(fetchingDialog).toContainText("TanStack Query is separate");
    await expect(fetchingDialog).toContainText("at build time");
    await expect(fetchingDialog).toContainText("at request time");
    await page.keyboard.press("Escape");
    await expect(fetchingDialog).toBeHidden();
    await expect(fetchingButton).toBeFocused();
    await expect(page.locator("#tool-tanstack-start a")).toContainText(
      "TanStack Start",
    );
    await expect(page.locator("#tool-sveltekit a")).toContainText("SvelteKit");
    await expect(page.locator("#tool-react-router")).toHaveCount(0);
    await expect(page.locator("#tool-astro .company")).toHaveText(
      "React · Vue",
    );
    for (const status of await table
      .locator(".tool-capability-status .tool-feature-label")
      .all())
      expect(["Included", "—"]).toContain(await status.textContent());
    await expect(
      table
        .getByRole("row", { name: /^Routing/ })
        .locator(".tool-feature-label"),
    ).toHaveText([
      "—",
      "Included",
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
      "Svelte",
    ]);
    const groups = page.locator('th[scope="colgroup"]');
    for (let index = 0; index < 4; index++)
      await expect(groups.nth(index)).toHaveAttribute(
        "colspan",
        index === 3 ? "1" : "3",
      );
    await expect(page.getByRole("cell")).toHaveCount(40);
    await expect(page.getByRole("columnheader")).toHaveCount(15);
    await expect(page.getByRole("combobox")).toHaveCount(0);
    const visual = page.getByRole("row", { name: /^Default look & feel/ });
    await expect(visual.getByRole("cell")).toHaveCount(10);
    await expect(visual.locator(".different, .difference-mark")).toHaveCount(0);
    await expect(
      page.getByRole("button", { name: "About Primary purpose", exact: true }),
    ).toHaveCount(0);
    await page.getByRole("button", { name: "Features", exact: true }).click();
    await expect(page.getByRole("cell")).toHaveCount(130);
    await expect(page.locator('#technical-rows th[scope="row"]')).toHaveCount(
      9,
    );
    await expect(
      page.getByRole("row", { name: /^Interaction utilities/ }),
    ).toContainText("@mantine/hooks");
    await expect(
      page.getByRole("row", { name: /^Forms & validation integration/ }),
    ).toContainText("@primevue/forms");
    await page.locator("#comparison").evaluate((element) => {
      element.scrollLeft = element.scrollWidth;
    });
    await expect(page.locator("#tool-skeleton")).toBeInViewport();
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
    await expect(table.getByRole("rowheader")).toHaveCount(4);
    await expect(table.getByRole("cell")).toHaveCount(20);
    await expect(
      table.getByRole("columnheader", { name: "Styling", exact: true }),
    ).toHaveCount(0);
    await expect(
      table.getByRole("link", { name: "Tailwind CSS", exact: true }),
    ).toHaveCount(0);
    await expect(table.getByRole("columnheader")).toHaveText([
      "Application stack",
      "Application framework",
      "Component-library candidates",
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
      "Styling",
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
      "Svelte",
    ]);
    const svelte = table.getByRole("row", { name: /^Svelte / });
    for (const name of [
      "SvelteKit",
      "Skeleton",
      "Nano Stores",
      "TanStack Query",
      "TanStack Form",
    ])
      await expect(svelte.getByRole("link", { name, exact: true })).toHaveCount(
        1,
      );
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
      const row = table.getByRole("row").filter({
        has: page.getByRole("rowheader", { name: ui, exact: true }),
      });
      const components = row.getByRole("cell").nth(1);
      await expect(components.getByRole("link")).toHaveCount(3);
      const styles = await components
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
    await expect(table.getByRole("button")).toHaveCount(0);
    await expect(page.locator("dialog")).toHaveCount(0);
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
    await expect(page.getByRole("table").getByRole("button")).toHaveCount(0);
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
