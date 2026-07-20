import { describe, it, expect } from "vitest";
import { PASOS_DEMO, XP_TOTAL, type ResultadoEjecucion } from "./pasosDemo";

const base: ResultadoEjecucion = {
  salida: "",
  error: false,
  turtle: false,
  codigo: "",
};

describe("prueba gratis: pasos de la aventura", () => {
  it("todos los pasos están completos y el XP suma el total", () => {
    for (const p of PASOS_DEMO) {
      expect(p.mensajes.length).toBeGreaterThan(0);
      expect(p.codigo.length).toBeGreaterThan(0);
      expect(p.instruccion.length).toBeGreaterThan(0);
      expect(p.festejo.length).toBeGreaterThan(0);
      expect(p.pista.length).toBeGreaterThan(0);
      expect(p.pistaError.length).toBeGreaterThan(0);
    }
    expect(PASOS_DEMO.reduce((acc, p) => acc + p.xp, 0)).toBe(XP_TOTAL);
  });

  it("misión 1: exige el saludo con nombre propio (sin el marcador)", () => {
    const [saludo] = PASOS_DEMO;
    expect(saludo.exito({ ...base, salida: "Hola, yo soy Ana 😎\n" })).toBe(
      true,
    );
    expect(
      saludo.exito({ ...base, salida: "Hola, yo soy TU-NOMBRE 😎\n" }),
    ).toBe(false);
    expect(saludo.exito({ ...base, salida: "Hola", error: true })).toBe(false);
  });

  it("misión 2: exige que la tortuga dibuje sin errores", () => {
    const tortuga = PASOS_DEMO[1];
    expect(tortuga.exito({ ...base, turtle: true })).toBe(true);
    expect(tortuga.exito({ ...base, turtle: false })).toBe(false);
    expect(tortuga.exito({ ...base, turtle: true, error: true })).toBe(false);
  });

  it("misión 3: exige la estrella (giro de 144) dibujada", () => {
    const estrella = PASOS_DEMO[2];
    const codigoOk = estrella.codigo.replace("90", "144");
    expect(estrella.exito({ ...base, turtle: true, codigo: codigoOk })).toBe(
      true,
    );
    // Con el código original (giro saboteado) no cuenta como estrella.
    expect(
      estrella.exito({ ...base, turtle: true, codigo: estrella.codigo }),
    ).toBe(false);
  });

  it("el código inicial de la misión 3 trae el número saboteado, no la solución", () => {
    expect(PASOS_DEMO[2].codigo).not.toContain("144");
  });
});
