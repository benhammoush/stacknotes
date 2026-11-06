/**
 * Blocking type-aware code and documentation rules for handwritten modules.
 * @file
 */
import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";
import jsdoc from "eslint-plugin-jsdoc";
import tsdoc from "eslint-plugin-tsdoc";
import reactHooks from "eslint-plugin-react-hooks";

export default defineConfig(
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "test-results/**",
      "playwright-report/**",
    ],
  },
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    extends: [tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  { languageOptions: { globals: { ...globals.node, ...globals.browser } } },
  {
    files: ["**/*.{ts,tsx,mjs}"],
    plugins: { jsdoc },
    settings: { jsdoc: { mode: "typescript" } },
    rules: {
      "jsdoc/require-jsdoc": [
        "error",
        {
          contexts: [
            "FunctionDeclaration",
            "ClassDeclaration",
            "MethodDefinition",
            'ArrowFunctionExpression[parent.type="VariableDeclarator"]',
            'FunctionExpression[parent.type="VariableDeclarator"]',
            "TSInterfaceDeclaration",
            "TSTypeAliasDeclaration",
          ],
          require: { FunctionDeclaration: false },
          exemptEmptyFunctions: false,
        },
      ],
      "jsdoc/require-description": ["error", { contexts: ["any"] }],
      "jsdoc/check-param-names": "error",
      "jsdoc/require-param": "error",
      "jsdoc/require-param-description": "error",
      "jsdoc/require-returns": "error",
      "jsdoc/require-returns-description": "error",
      "jsdoc/check-tag-names": [
        "error",
        { definedTags: ["packageDocumentation"] },
      ],
      "jsdoc/valid-types": "error",
      "jsdoc/require-file-overview": [
        "error",
        {
          tags: {
            file: {
              mustExist: true,
              initialCommentsOnly: true,
              preventDuplicates: true,
            },
          },
        },
      ],
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    plugins: { tsdoc },
    rules: {
      "tsdoc/syntax": "error",
      "jsdoc/no-types": "error",
      "jsdoc/require-file-overview": [
        "error",
        {
          tags: {
            packageDocumentation: {
              mustExist: true,
              initialCommentsOnly: true,
              preventDuplicates: true,
            },
          },
        },
      ],
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    plugins: { "react-hooks": reactHooks },
    rules: reactHooks.configs.recommended.rules,
  },
);
