/**
 * Guards bounded read-only route smoke checks without using provider credentials.
 * @file
 */
import { readFileSync } from "node:fs";
import { describe, expect, it, vi } from "vitest";
import { smokeWeb } from "../../scripts/smoke-web.mjs";
import { deliverySettings } from "../../scripts/delivery-policy.mjs";

const origin = "https://stacknotes-dev.vercel.app";
const missingPaths = [
  "/assets/__stacknotes_smoke_missing__.js",
  "/providers/__stacknotes_smoke_missing__.svg",
  "/fonts/__stacknotes_smoke_missing__.woff2",
  "/api/__stacknotes_smoke_missing__",
];

describe("publication route smoke", () => {
  it("uses anonymous bounded GETs without following redirects", async () => {
    const fetcher = vi.fn(
      async (url) =>
        new Response('<div id="root"></div>', {
          status: url === `${origin}/hosting/` ? 200 : 404,
          headers: { "content-type": "text/html; charset=utf-8" },
        }),
    );
    await smokeWeb(fetcher, origin);
    expect(fetcher.mock.calls.map(([url]) => url)).toEqual(
      ["/hosting/", ...missingPaths].map((path) => `${origin}${path}`),
    );
    for (const [, options] of fetcher.mock.calls) {
      expect(options.method).toBe("GET");
      expect(options.redirect).toBe("error");
      expect(options.signal).toBeInstanceOf(AbortSignal);
      expect(options.headers).toEqual({});
    }
  });

  it.each(missingPaths)(
    "fails when %s incorrectly returns a successful SPA response",
    async (path) => {
      const fetcher = vi.fn(
        async (url) =>
          new Response('<div id="root"></div>', {
            status:
              url === `${origin}/hosting/` || url === `${origin}${path}`
                ? 200
                : 404,
            headers: { "content-type": "text/html" },
          }),
      );
      await expect(smokeWeb(fetcher, origin)).rejects.toThrow(
        "Unexpected smoke status",
      );
    },
  );

  it.each([
    { status: 404, content: '<div id="root"></div>', type: "text/html" },
    { status: 302, content: "Redirect", type: "text/html" },
    { status: 200, content: "Not the app", type: "text/html" },
    { status: 200, content: '<div id="root"></div>', type: "text/plain" },
  ])("rejects a broken deep link: %j", async ({ status, content, type }) => {
    const fetcher = vi.fn(
      async () =>
        new Response(content, { status, headers: { "content-type": type } }),
    );
    await expect(smokeWeb(fetcher, origin)).rejects.toThrow();
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it("propagates network failure without retrying", async () => {
    const fetcher = vi.fn().mockRejectedValue(new Error("Network unavailable"));
    await expect(smokeWeb(fetcher, origin)).rejects.toThrow(
      "Network unavailable",
    );
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it("wires anonymous smoke checks into the validated adapter", async () => {
    const config = JSON.parse(readFileSync(".github/ci-cd.json", "utf8"));
    const hosting = JSON.parse(readFileSync("vercel.json", "utf8"));
    const settings = deliverySettings(
      {
        GITHUB_REF: "refs/heads/main",
        CI_SOURCE_SHA: "a".repeat(40),
        CI_ENVIRONMENT: "dev",
        GITHUB_EVENT_NAME: "push",
        GITHUB_RUN_ATTEMPT: "1",
        DEV_PROJECT_ID: "prj_dev",
        PRODUCTION_PROJECT_ID: "prj_prod",
        VERCEL_PROJECT_ID: "prj_dev",
        TARGET_ORIGIN: origin,
      },
      config,
      hosting,
    );
    const fetcher = vi.fn(
      async (url) =>
        new Response('<div id="root"></div>', {
          status: url === `${origin}/hosting/` ? 200 : 404,
          headers: { "content-type": "text/html" },
        }),
    );
    await settings.smoke(fetcher);
    for (const [url, options] of fetcher.mock.calls) {
      expect(new URL(url).origin).toBe(origin);
      expect(options.headers).toEqual({});
    }
  });
});
