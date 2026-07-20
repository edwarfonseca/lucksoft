import { describe, it, expect } from "vitest";
import { PASOS_SCRATCH, XP_TOTAL_SCRATCH } from "./pasosScratch";

describe("prueba gratis de Scratch: misiones", () => {
  it("todas las misiones están completas y el XP suma el total", () => {
    for (const p of PASOS_SCRATCH) {
      expect(p.mensajes.length).toBeGreaterThan(0);
      expect(p.instruccion.length).toBeGreaterThan(0);
      expect(p.festejo.length).toBeGreaterThan(0);
      expect(p.pista.length).toBeGreaterThan(0);
    }
    expect(PASOS_SCRATCH.reduce((acc, p) => acc + p.xp, 0)).toBe(
      XP_TOTAL_SCRATCH,
    );
  });

  it("misión 1: se logra con el bloque «mover 10 pasos»", () => {
    const [mover] = PASOS_SCRATCH;
    expect(mover.exito(new Set(["motion_movesteps"]))).toBe(true);
    expect(mover.exito(new Set(["looks_say"]))).toBe(false);
    expect(mover.exito(new Set())).toBe(false);
  });

  it("misión 2: se logra con cualquier bloque de «decir»", () => {
    const hablar = PASOS_SCRATCH[1];
    expect(hablar.exito(new Set(["looks_sayforsecs"]))).toBe(true);
    expect(hablar.exito(new Set(["looks_say"]))).toBe(true);
    expect(hablar.exito(new Set(["motion_movesteps"]))).toBe(false);
  });

  it("misión 3: se logra con el efecto de color", () => {
    const arcoiris = PASOS_SCRATCH[2];
    expect(arcoiris.exito(new Set(["looks_changeeffectby"]))).toBe(true);
    expect(arcoiris.exito(new Set(["looks_seteffectto"]))).toBe(true);
    expect(arcoiris.exito(new Set(["motion_movesteps", "looks_say"]))).toBe(
      false,
    );
  });
});
