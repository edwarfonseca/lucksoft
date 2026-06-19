import type { WebProject } from "@/domain/models/submission";

/**
 * Construye el documento HTML completo para la vista previa de un proyecto web
 * dentro de un `<iframe srcdoc>`. La etiqueta script se parte para no cerrar el
 * script contenedor al inyectarlo como string.
 */
export function buildPreviewDoc(project: Partial<WebProject>): string {
  const { html = "", css = "", js = "" } = project;
  return (
    "<!DOCTYPE html><html><head><meta charset='utf-8'><style>" +
    css +
    "</style></head><body>" +
    html +
    "<scr" +
    "ipt>" +
    js +
    "</scr" +
    "ipt></body></html>"
  );
}
