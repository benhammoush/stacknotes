/**
 * Rejects missing or mixed Vercel targets before calling the pinned shared adapter.
 * @file
 */
import assert from "node:assert/strict";
import { smokeWeb } from "./smoke-web.mjs";

/**
 * Validate isolated environment settings without making provider requests.
 * @param env - CI-provided environment, including selected nonsecret variables.
 * @param config - Trusted-main shared-workflow configuration.
 * @param hosting - Trusted-main static routing configuration.
 * @returns Public settings consumed by the immutable shared delivery implementation.
 */
export function deliverySettings(env, config, hosting) {
  assert.equal(env.GITHUB_REF, "refs/heads/main");
  assert.match(env.CI_SOURCE_SHA ?? "", /^[a-f0-9]{40}$/);
  assert.ok(["dev", "production"].includes(env.CI_ENVIRONMENT));
  assert.ok(["push", "workflow_dispatch"].includes(env.GITHUB_EVENT_NAME));
  if (env.CI_ENVIRONMENT === "production") {
    assert.equal(env.GITHUB_EVENT_NAME, "workflow_dispatch");
    assert.equal(env.GITHUB_RUN_ATTEMPT, "1");
  }
  for (const name of ["DEV_PROJECT_ID", "PRODUCTION_PROJECT_ID"])
    assert.match(env[name] ?? "", /^prj_[a-zA-Z0-9]+$/);
  assert.notEqual(env.DEV_PROJECT_ID, env.PRODUCTION_PROJECT_ID);
  assert.equal(
    env.VERCEL_PROJECT_ID,
    env.CI_ENVIRONMENT === "dev"
      ? env.DEV_PROJECT_ID
      : env.PRODUCTION_PROJECT_ID,
  );
  const origin = new URL(env.TARGET_ORIGIN);
  assert.equal(origin.protocol, "https:");
  assert.equal(origin.origin, env.TARGET_ORIGIN);
  assert.ok(!origin.username && !origin.password && !origin.port);
  assert.equal(
    origin.origin,
    env.CI_ENVIRONMENT === "dev"
      ? "https://stacknotes-dev.vercel.app"
      : "https://stacknotes.vercel.app",
    "Target origin must match the environment allowlist before any credentialed request.",
  );
  assert.deepEqual(config.buildEnvironment, { dev: {}, production: {} });
  return {
    name: env.CI_ENVIRONMENT === "dev" ? "stacknotes-dev" : "stacknotes",
    origin: origin.origin,
    buildEnvironment: {},
    hosting: { version: 3, routes: hosting.routes },
    smoke: (fetcher) => smokeWeb(fetcher, origin.origin, env.SMOKE_BYPASS),
  };
}
