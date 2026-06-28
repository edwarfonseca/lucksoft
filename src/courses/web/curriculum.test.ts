import { describe, it, expect } from "vitest";
import { PERIODOS, SESIONES_POR_PERIODO } from "@/domain/models/lessons";
import { duracionTotal } from "@/domain/models/curriculum";
import { webCurriculum } from "./curriculum";

describe("currículo de Diseño Web", () => {
  it("tiene 10 periodos numerados 1..10", () => {
    expect(webCurriculum).toHaveLength(PERIODOS);
    webCurriculum.forEach((p, i) => expect(p.numero).toBe(i + 1));
  });

  it("cada periodo tiene 4 sesiones numeradas 1..4", () => {
    for (const p of webCurriculum) {
      expect(p.sesiones).toHaveLength(SESIONES_POR_PERIODO);
      p.sesiones.forEach((s, i) => expect(s.numero).toBe(i + 1));
    }
  });

  it("la sesión 4 de cada periodo es la misión final", () => {
    for (const p of webCurriculum) {
      expect(p.sesiones[3].tipo).toBe("mision");
    }
  });

  it("cada sesión dura 90 minutos en su agenda", () => {
    for (const p of webCurriculum) {
      for (const s of p.sesiones) {
        expect(duracionTotal(s)).toBe(90);
      }
    }
  });

  it("cada sesión tiene entre 3 y 5 retos", () => {
    for (const p of webCurriculum) {
      for (const s of p.sesiones) {
        expect(s.retos.length).toBeGreaterThanOrEqual(3);
        expect(s.retos.length).toBeLessThanOrEqual(5);
      }
    }
  });

  it("cada sesión trae objetivo, conceptos, ejercicios, evaluación y recomendaciones", () => {
    for (const p of webCurriculum) {
      for (const s of p.sesiones) {
        expect(s.objetivo.length).toBeGreaterThan(0);
        expect(s.conceptos.length).toBeGreaterThan(0);
        expect(s.ejercicios.length).toBeGreaterThan(0);
        expect(s.evaluacion.length).toBeGreaterThan(0);
        expect(s.recomendaciones.length).toBeGreaterThan(0);
        expect(s.recompensa.length).toBeGreaterThan(0);
        expect(s.cierre.titulo.length).toBeGreaterThan(0);
      }
    }
  });

  it("cada periodo desbloquea una insignia y otorga XP", () => {
    for (const p of webCurriculum) {
      expect(p.insignia.emoji.length).toBeGreaterThan(0);
      expect(p.insignia.nombre.length).toBeGreaterThan(0);
      expect(p.xp).toBeGreaterThan(0);
      expect(p.proyecto.length).toBeGreaterThan(0);
    }
  });
});
