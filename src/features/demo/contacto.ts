/** Datos de contacto del cierre de las pruebas gratis. */

/** Número de WhatsApp para agendar (con indicativo, solo dígitos, p. ej. "573001234567").
 *  Vacío = el botón lleva a la landing. */
const WHATSAPP_NUMERO = "";

const MENSAJE_WHATSAPP =
  "¡Hola! Completamos la prueba gratis de LuckSoft y queremos agendar la clase de prueba 🎉";

export const URL_CONTACTO = WHATSAPP_NUMERO
  ? `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(MENSAJE_WHATSAPP)}`
  : "https://lucksoftacademy.com/";
