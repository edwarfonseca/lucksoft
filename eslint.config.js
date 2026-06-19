import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default tseslint.config(
  {
    ignores: ["LuckSoft/scratch-editor/**", "node_modules/**", "dist/**"],
  },

  // ---- Código nuevo: React + TypeScript (src/) ----
  {
    files: ["src/**/*.{ts,tsx}"],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },

  // ---- Config de build en Node (vite.config.ts) ----
  {
    files: ["vite.config.ts"],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: { globals: globals.node },
  },

  // ---- Código legacy vanilla (LuckSoft/js) ----
  // Patrón "global vía <script>": un archivo define el global y otros lo usan.
  // Desaparece a medida que se migra a ESM (ver LuckSoft/PLAN.md).
  {
    files: ["LuckSoft/js/**/*.js"],
    extends: [js.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "script",
      globals: {
        ...globals.browser,
        LuckAuth: "readonly",
        LuckDB: "readonly",
        LuckUtils: "readonly",
        renderTopbar: "readonly",
        joinClass: "readonly",
        editor: "readonly",
        CodeMirror: "readonly",
        loadPyodide: "readonly",
      },
    },
    rules: {
      "no-redeclare": ["error", { builtinGlobals: false }],
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          caughtErrors: "none",
          varsIgnorePattern:
            "^(LuckAuth|LuckDB|LuckUtils|renderTopbar|joinClass)$",
        },
      ],
      "no-undef": "error",
    },
  },
  {
    files: ["LuckSoft/js/pyworker.js"],
    languageOptions: {
      globals: {
        ...globals.worker,
        loadPyodide: "readonly",
        importScripts: "readonly",
      },
    },
  },

  // ---- Worker clásico servido desde public/ (Pyodide) ----
  {
    files: ["public/**/*.js"],
    extends: [js.configs.recommended],
    languageOptions: {
      sourceType: "script",
      globals: {
        ...globals.worker,
        loadPyodide: "readonly",
        importScripts: "readonly",
      },
    },
  },
);