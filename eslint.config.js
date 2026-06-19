import js from "@eslint/js";
import globals from "globals";

// Config para el código vanilla actual (Fase 0/1). Se ampliará con el plugin de
// TypeScript/React cuando se introduzca Vite (ver PLAN.md).
export default [
  {
    ignores: ["LuckSoft/scratch-editor/**", "node_modules/**", "dist/**"],
  },
  js.configs.recommended,
  {
    files: ["LuckSoft/js/**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "script",
      globals: {
        ...globals.browser,
        // Globales propios de LuckSoft (IIFEs/consts cargadas vía <script>).
        // Se definen en un archivo y se consumen en otros.
        LuckAuth: "readonly",
        LuckDB: "readonly",
        LuckUtils: "readonly",
        renderTopbar: "readonly",
        joinClass: "readonly",
        editor: "readonly",
        // Librerías de terceros cargadas por CDN.
        CodeMirror: "readonly",
        loadPyodide: "readonly",
      },
    },
    rules: {
      // El patrón vanilla "definir un global con const/function en un archivo y
      // usarlo en otro" exige no marcar como redeclaración ni como "sin uso" los
      // símbolos que se exportan vía global. Esto desaparece en la Fase 1 (ESM).
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
    // pyworker.js corre en un Web Worker, no en el DOM.
    files: ["LuckSoft/js/pyworker.js"],
    languageOptions: {
      globals: {
        ...globals.worker,
        loadPyodide: "readonly",
        importScripts: "readonly",
      },
    },
  },
];