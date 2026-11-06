/**
 * Offline regression checks for delivery isolation, workflow pins and documentation gates.
 * @file
 */
import { readFileSync, readdirSync } from "node:fs";
import { ESLint } from "eslint";
import { parse } from "yaml";
import { beforeAll, describe, expect, it } from "vitest";
import { deliverySettings } from "../../scripts/delivery-policy.mjs";

const config = JSON.parse(readFileSync(".github/ci-cd.json", "utf8"));
const hosting = JSON.parse(readFileSync("vercel.json", "utf8"));
const eslint = new ESLint();

// Start the type-aware compiler in setup, not inside the five-second assertion budget.
beforeAll(async () => {
  await eslint.lintFiles(["src/main.tsx"]);
}, 30_000);
const env = {
  GITHUB_REF: "refs/heads/main",
  CI_SOURCE_SHA: "a".repeat(40),
  CI_ENVIRONMENT: "dev",
  GITHUB_EVENT_NAME: "push",
  GITHUB_RUN_ATTEMPT: "1",
  DEV_PROJECT_ID: "prj_dev",
  PRODUCTION_PROJECT_ID: "prj_prod",
  VERCEL_PROJECT_ID: "prj_dev",
  TARGET_ORIGIN: "https://stacknotes-dev.vercel.app",
};

describe("delivery policy", () => {
  it("selects isolated dev and production settings", () => {
    expect(deliverySettings(env, config, hosting).name).toBe("stacknotes-dev");
    expect(
      deliverySettings(
        {
          ...env,
          CI_ENVIRONMENT: "production",
          GITHUB_EVENT_NAME: "workflow_dispatch",
          VERCEL_PROJECT_ID: "prj_prod",
          TARGET_ORIGIN: "https://stacknotes-one.vercel.app",
        },
        config,
        hosting,
      ).name,
    ).toBe("stacknotes");
  });
  it.each([
    { GITHUB_REF: "refs/heads/feature" },
    { CI_SOURCE_SHA: "main" },
    { CI_ENVIRONMENT: "preview" },
    { GITHUB_EVENT_NAME: "pull_request" },
    { PRODUCTION_PROJECT_ID: "prj_dev" },
    { VERCEL_PROJECT_ID: "prj_prod" },
    { DEV_PROJECT_ID: "" },
    { TARGET_ORIGIN: "http://example.com" },
    { TARGET_ORIGIN: "https://user:pass@example.com" },
    { TARGET_ORIGIN: "https://example.com/path" },
    { TARGET_ORIGIN: "https://example.com" },
    { TARGET_ORIGIN: "https://stacknotes.vercel.app" },
    { TARGET_ORIGIN: "https://stacknotes-one.vercel.app" },
    { CI_ENVIRONMENT: "production" },
    {
      CI_ENVIRONMENT: "production",
      GITHUB_EVENT_NAME: "workflow_dispatch",
      GITHUB_RUN_ATTEMPT: "2",
      VERCEL_PROJECT_ID: "prj_prod",
    },
  ])("fails closed for invalid target settings %j", (overrides) => {
    expect(() =>
      deliverySettings({ ...env, ...overrides }, config, hosting),
    ).toThrow();
  });
  it("rejects undeclared public build inputs", () => {
    expect(() =>
      deliverySettings(
        env,
        {
          ...config,
          buildEnvironment: { dev: { VITE_API: "unexpected" }, production: {} },
        },
        hosting,
      ),
    ).toThrow();
  });
  it("rejects the former unassigned production address", () => {
    expect(() =>
      deliverySettings(
        {
          ...env,
          CI_ENVIRONMENT: "production",
          GITHUB_EVENT_NAME: "workflow_dispatch",
          VERCEL_PROJECT_ID: "prj_prod",
          TARGET_ORIGIN: "https://stacknotes.vercel.app",
        },
        config,
        hosting,
      ),
    ).toThrow("environment allowlist");
  });
});

it("keeps workflow references pinned and release dependencies intact", () => {
  const workflows = Object.fromEntries(
    readdirSync(".github/workflows").map((name) => [
      name,
      parse(readFileSync(`.github/workflows/${name}`, "utf8")),
    ]),
  );
  expect(Object.keys(workflows)).toHaveLength(4);
  for (const workflow of Object.values(workflows)) {
    for (const job of Object.values(workflow.jobs)) {
      if (job.uses)
        expect(job.uses).toMatch(new RegExp(`@${config.automationSha}$`));
      if (job.with?.automation_sha)
        expect(job.with.automation_sha).toBe(config.automationSha);
      if (job["runs-on"]) expect(job["runs-on"]).toBe("ubuntu-24.04");
    }
  }
  const pr = workflows["verify-pr.yml"];
  expect(Object.keys(pr.on)).toEqual(["pull_request"]);
  expect(JSON.stringify(pr)).not.toContain("secrets");
  expect(pr.jobs.verify_result.name).toBe("Verify");
  expect(pr.jobs.verify_result.if).toBe("always()");
  expect(pr.jobs.verify_result.needs).toBe("verify");
  expect(workflows["verify-and-deploy-dev.yml"].jobs.deploy_dev.needs).toBe(
    "verify",
  );
  expect(Object.keys(workflows["verify-and-deploy-prod.yml"].on)).toEqual([
    "workflow_dispatch",
  ]);
  expect(
    workflows["verify-and-deploy-prod.yml"].jobs.deploy_production.needs,
  ).toBe("verify_release");
  for (const job of [
    workflows["verify-and-deploy-dev.yml"].jobs.deploy_dev,
    workflows["verify-and-deploy-prod.yml"].jobs.deploy_production,
  ]) {
    expect(job.secrets).toEqual({
      VERCEL_TOKEN: "${{ secrets.VERCEL_TOKEN }}",
    });
  }
  const metadata = JSON.parse(readFileSync("package.json", "utf8"));
  const lock = JSON.parse(readFileSync("package-lock.json", "utf8"));
  expect(lock.version).toBe(metadata.version);
  expect(lock.packages[""].version).toBe(metadata.version);
  expect(readFileSync("index.html", "utf8")).toContain('<div id="root"></div>');
});

it("keeps local state, credentials and build output out of the publication set", () => {
  const rules = readFileSync(".gitignore", "utf8").split(/\r?\n/);
  for (const rule of [
    "/node_modules/",
    "/dist/",
    "/test-results/",
    "/playwright-report/",
    "/.vercel/",
    ".env*",
    "*.log",
    "/coverage/",
    "/DEV.md",
    "/ci-build.json",
    "/delivery-record.json",
  ])
    expect(rules).toContain(rule);
  const attributes = readFileSync(".gitattributes", "utf8");
  expect(attributes).toContain("* text=auto eol=lf");
  for (const extension of ["png", "ico", "woff2"])
    expect(attributes).toContain(`*.${extension} binary`);
});

it("blocks missing module/function docs, parameter docs and invalid TSDoc", async () => {
  const [missing] = await eslint.lintText(
    "export function note(value: string): string { return value; }",
    { filePath: "src/utils/comparison.ts" },
  );
  expect(missing.messages.map(({ ruleId }) => ruleId)).toContain(
    "jsdoc/require-jsdoc",
  );
  expect(missing.messages.map(({ ruleId }) => ruleId)).toContain(
    "jsdoc/require-file-overview",
  );
  const [invalid] = await eslint.lintText(
    "/** Module.\n * @packageDocumentation\n */\n/** Return a note. @unknownTag */\nexport function note(value: string): string { return value; }",
    { filePath: "src/utils/comparison.ts" },
  );
  expect(invalid.messages.map(({ ruleId }) => ruleId)).toContain(
    "jsdoc/require-param",
  );
  expect(invalid.messages.map(({ ruleId }) => ruleId)).toContain(
    "tsdoc/syntax",
  );
  const [valid] = await eslint.lintText(
    "/** Module.\n * @packageDocumentation\n */\n/**\n * Return a note.\n * @param value - Note content.\n * @returns The unchanged note.\n */\nexport function note(value: string): string { return value; }",
    { filePath: "src/utils/comparison.ts" },
  );
  expect(valid.messages).toEqual([]);
});

it("serves the SPA only after filesystem lookup and missing-resource guards", () => {
  expect(hosting.routes[1]).toEqual({ handle: "filesystem" });
  const routes = hosting.routes.slice(2);
  for (const path of [
    "/assets/missing.js",
    "/providers/missing.svg",
    "/fonts/missing.woff2",
    "/api",
    "/api/missing",
    "/missing.js",
    "/unknown/image.png/",
  ]) {
    const match = routes.find((route) =>
      new RegExp(`^${route.src}$`).test(path),
    );
    expect(match?.status).toBe(404);
    expect(match?.dest).toBeUndefined();
  }
  for (const path of [
    "/hosting",
    "/hosting/",
    "/future-category",
    "/unknown/nested",
  ]) {
    const match = routes.find((route) =>
      new RegExp(`^${route.src}$`).test(path),
    );
    expect(match?.dest).toBe("/index.html");
  }
});

it("enforces TypeScript and function documentation for React modules too", async () => {
  const [missing] = await eslint.lintText(
    "export default function Example() { return <main>Hello</main>; }",
    { filePath: "src/components/NotFound.tsx" },
  );
  expect(missing.messages.map(({ ruleId }) => ruleId)).toContain(
    "jsdoc/require-jsdoc",
  );
  expect(missing.messages.map(({ ruleId }) => ruleId)).toContain(
    "jsdoc/require-file-overview",
  );
});
