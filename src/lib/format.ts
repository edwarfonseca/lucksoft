/** Formatea una marca de tiempo (ms) como fecha/hora legible en español. */
export function formatDateTime(ts: number | null): string {
  return ts ? new Date(ts).toLocaleString("es") : "—";
}
