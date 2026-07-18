/**
 * Un pago registrado: cada aumento de créditos de un estudiante equivale a un
 * pago del acudiente (lo registra un trigger en la base de datos). Los
 * descuentos de créditos son consumo de clases y no aparecen aquí.
 */
export interface Pago {
  id: number;
  /** Fecha/hora del pago (ISO). */
  fecha: string;
  estudianteId: string | null;
  estudiante: string;
  /** Créditos agregados en este pago (siempre positivo). */
  creditos: number;
  /** Saldo de créditos del estudiante después del pago. */
  saldoDespues: number;
  /** Nombre del admin que lo registró ("Sistema" si vino del servidor). */
  registradoPor: string;
}

/** Totales de un conjunto de pagos (para el resumen del panel). */
export function resumenPagos(pagos: Pago[]): {
  totalPagos: number;
  totalCreditos: number;
} {
  return {
    totalPagos: pagos.length,
    totalCreditos: pagos.reduce((acc, p) => acc + p.creditos, 0),
  };
}

/** Filtra los pagos de un mes concreto (year-month de la fecha local). */
export function pagosDelMes(
  pagos: Pago[],
  year: number,
  month: number,
): Pago[] {
  return pagos.filter((p) => {
    const d = new Date(p.fecha);
    return d.getFullYear() === year && d.getMonth() === month;
  });
}
