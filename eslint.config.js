import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import perfectionist from "eslint-plugin-perfectionist";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js, perfectionist },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
    rules: {
      "no-undef": "error",
      "no-unused-vars": "warn",
      "prefer-const": "error",
      "no-console": "warn",
      "no-var": "error",
      "perfectionist/sort-imports": [
        "error",
        {
          type: "natural",
          order: "asc",
        },
      ],
    },
  },
]);
