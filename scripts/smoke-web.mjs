/**
 * Read-only route checks complement the shared publisher's deployment-identity checks.
 * @file
 */
import assert from "node:assert/strict";

/**
 * Verify a deep link and reject SPA fallbacks for missing static resources and APIs.
 * @param fetcher - HTTP implementation supplied by the pinned shared publisher.
 * @param origin - Environment origin already validated by the delivery allowlist.
 * @param bypass - Optional protection-bypass secret sent only to the validated origin.
 */
export async function smokeWeb(fetcher, origin, bypass) {
  for (const [path, status] of [
    ["/hosting/", 200],
    ["/assets/__stacknotes_smoke_missing__.js", 404],
    ["/providers/__stacknotes_smoke_missing__.svg", 404],
    ["/fonts/__stacknotes_smoke_missing__.woff2", 404],
    ["/api/__stacknotes_smoke_missing__", 404],
  ]) {
    const response = await fetcher(`${origin}${path}`, {
      method: "GET",
      redirect: "error",
      signal: AbortSignal.timeout(30_000),
      headers: bypass ? { "x-vercel-protection-bypass": bypass } : {},
    });
    assert.equal(
      response.status,
      status,
      `Unexpected smoke status for ${path}`,
    );
    if (status === 200) {
      assert.match(
        response.headers.get("content-type") ?? "",
        /^text\/html(?:;|$)/i,
      );
      assert.ok(
        (await response.text()).includes('<div id="root">'),
        "Deep link did not serve the application shell",
      );
    }
  }
}
