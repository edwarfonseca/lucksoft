import { describe, it, expect } from "vitest";
import { buildPreviewDoc } from "./preview";

describe("buildPreviewDoc", () => {
  it("combina html, css y js en un documento", () => {
    const doc = buildPreviewDoc({
      html: "<h1>Hola</h1>",
      css: "h1{color:red}",
      js: "console.log(1)",
    });
    expect(doc).toContain("<h1>Hola</h1>");
    expect(doc).toContain("h1{color:red}");
    expect(doc).toContain("console.log(1)");
    expect(doc).toContain("<!DOCTYPE html>");
  });

  it("tolera campos ausentes", () => {
    expect(() => buildPreviewDoc({})).not.toThrow();
  });
});
