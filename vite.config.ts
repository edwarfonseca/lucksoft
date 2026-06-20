import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // Alias @/ -> src/ (debe coincidir con paths de tsconfig.app.json).
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    // Aislamiento de origen: habilita SharedArrayBuffer, necesario para el
    // editor de Python (Pyodide + input() bloqueante) cuando se migre.
    // Equivale a las cabeceras que ponía LuckSoft/server.py.
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "credentialless",
    },
  },
  test: {
    // jsdom da localStorage/sessionStorage a los tests de los adaptadores.
    environment: "jsdom",
    restoreMocks: true,
    include: ["src/**/*.test.{ts,tsx}"],
  },
});
