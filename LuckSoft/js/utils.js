// Utilidades compartidas de LuckSoft.
// Centraliza helpers que antes estaban duplicados en varias páginas/editores.
// En la Fase 2 (ver PLAN.md) esto se moverá a src/lib/ como módulos ES.
const LuckUtils = (() => {
  // Escapa texto para insertarlo de forma segura en HTML (incluye comillas,
  // por lo que también es válido dentro de atributos "..."). Evita XSS.
  function escapeHtml(value) {
    return String(value == null ? "" : value).replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  }

  // ---------- base64 <-> binario (proyectos .sb3 de Scratch) ----------
  function bufToB64(buf) {
    const bytes = new Uint8Array(buf);
    let bin = "";
    const chunk = 0x8000;
    for (let i = 0; i < bytes.length; i += chunk) {
      bin += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
    }
    return btoa(bin);
  }

  // Devuelve un Uint8Array (NO .buffer): el analizador de Scratch necesita poder
  // indexar los bytes para reconocer el .sb3 (ZIP). También sirve para Blob.
  function b64ToBytes(b64) {
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return bytes;
  }

  // ---------- Vista previa de proyectos web en un iframe srcdoc ----------
  function buildPreviewDoc(html = "", css = "", js = "") {
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

  // ---------- Etiquetas legibles de dificultad ----------
  const DIFICULTAD_LABEL = {
    facil: "Fácil",
    media: "Media",
    dificil: "Difícil",
  };

  return {
    escapeHtml,
    bufToB64,
    b64ToBytes,
    buildPreviewDoc,
    DIFICULTAD_LABEL,
  };
})();
