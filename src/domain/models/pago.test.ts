import { describe, it, expect } from "vitest";
import { pagosDelMes, resumenPagos, type Pago } from "./pago";

function pago(fecha: string, creditos: number): Pago {
  return {
    id: Math.random(),
    fecha,
    estudianteId: "e1",
    estudiante: "Ana",
    creditos,
    saldoDespues: creditos,
    registradoPor: "Admin",
  };
}

describe("modelo de pagos", () => {
  it("resumenPagos suma pagos y créditos", () => {
    const r = resumenPagos([
      pago("2026-07-01T10:00:00Z", 4),
      pago("2026-07-15T10:00:00Z", 8),
    ]);
    expect(r.totalPagos).toBe(2);
    expect(r.totalCreditos).toBe(12);
  });

  it("resumenPagos con lista vacía es cero", () => {
    expect(resumenPagos([])).toEqual({ totalPagos: 0, totalCreditos: 0 });
  });

  it("pagosDelMes filtra solo el mes pedido (fecha local)", () => {
    const julio = pago("2026-07-15T10:00:00", 4);
    const junio = pago("2026-06-30T10:00:00", 8);
    const filtrados = pagosDelMes([julio, junio], 2026, 6); // julio = mes 6
    expect(filtrados).toHaveLength(1);
    expect(filtrados[0]).toBe(julio);
  });
});
