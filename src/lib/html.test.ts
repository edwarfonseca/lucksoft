import { describe, it, expect } from "vitest";
import { escapeHtml } from "./html";

describe("escapeHtml", () => {
  it("escapa los caracteres peligrosos, incluidas comillas", () => {
    expect(escapeHtml(`<img src="x" onerror='hack'>&`)).toBe(
      "&lt;img src=&quot;x&quot; onerror=&#39;hack&#39;&gt;&amp;",
    );
  });

  it("neutraliza un intento de XSS", () => {
    expect(escapeHtml("<script>alert(1)</script>")).not.toContain("<script>");
  });

  it("convierte null/undefined en cadena vacía", () => {
    expect(escapeHtml(null)).toBe("");
    expect(escapeHtml(undefined)).toBe("");
  });
});
