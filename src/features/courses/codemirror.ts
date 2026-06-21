import { tooltips } from "@codemirror/view";
import type { Extension } from "@codemirror/state";

/**
 * Renderiza los popups de CodeMirror (autocompletado, diagnósticos…) en
 * document.body. Sin esto, el `overflow: hidden` de los paneles del editor
 * recorta la lista de sugerencias y parece que "no autocompleta".
 *
 * El autocompletado en sí ya viene activado por basicSetup de
 * @uiw/react-codemirror (activateOnTyping) y por las extensiones de lenguaje
 * (HTML/CSS/JS/Python), que aportan las sugerencias.
 */
export const editorTooltips: Extension = tooltips({ parent: document.body });
