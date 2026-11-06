/**
 * Shared Vite build and isolated test configuration.
 * @packageDocumentation
 */
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    include: ["tests/unit/**/*.test.{ts,tsx}", "tests/tooling/**/*.test.mjs"],
    setupFiles: ["tests/setup.ts"],
  },
});
