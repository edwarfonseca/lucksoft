/**
 * Escapa texto para insertarlo de forma segura en HTML (incluye comillas, por
 * lo que también vale dentro de atributos). Previene XSS.
 *
 * Nota: en React el escapado de `{texto}` es automático; esta utilidad es para
 * casos en que se construye HTML como string (p. ej. el iframe srcdoc).
 */
const ESCAPE_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export function escapeHtml(value: unknown): string {
  return String(value ?? "").replace(/[&<>"']/g, (c) => ESCAPE_MAP[c]);
}
