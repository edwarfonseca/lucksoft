// Web Worker: ejecuta Python (Pyodide) en un hilo aparte.
// La entrada de teclado (input()) se lee de forma BLOQUEANTE usando
// SharedArrayBuffer + Atomics, sin congelar la página principal.
//
// Se sirve desde public/ (sin empaquetar) para usarlo como worker clásico con
// importScripts. Requiere aislamiento de origen (cabeceras COOP/COEP), que el
// dev server de Vite ya envía (ver vite.config.ts).

importScripts("https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js");

let pyodide = null;
let control = null; // Int32Array: [0] = bandera, [1] = longitud en bytes
let dataBytes = null; // Uint8Array compartido con el texto de entrada

// Lee una línea de la consola, bloqueando el worker hasta que llegue.
function readLine() {
  // Avisar al hilo principal que necesitamos entrada.
  Atomics.store(control, 0, 0);
  postMessage({ type: "input_request" });

  // Esperar (bloqueante) a que el hilo principal escriba la entrada.
  Atomics.wait(control, 0, 0);

  const len = Atomics.load(control, 1);
  const bytes = dataBytes.slice(0, len);
  const text = new TextDecoder().decode(bytes);
  return text + "\n"; // input() necesita el salto de línea para terminar
}

async function init(controlSAB, dataSAB) {
  try {
    control = new Int32Array(controlSAB);
    dataBytes = new Uint8Array(dataSAB);

    pyodide = await loadPyodide();
    // Salida INMEDIATA (no por líneas): así el mensaje de input(), que no lleva
    // salto de línea, se muestra ANTES del campo de entrada.
    const outDecoder = new TextDecoder("utf-8");
    const errDecoder = new TextDecoder("utf-8");
    pyodide.setStdout({
      write: (buf) => {
        postMessage({
          type: "stdout",
          text: outDecoder.decode(buf, { stream: true }),
        });
        return buf.length;
      },
    });
    pyodide.setStderr({
      write: (buf) => {
        postMessage({
          type: "stderr",
          text: errDecoder.decode(buf, { stream: true }),
        });
        return buf.length;
      },
    });
    pyodide.setStdin({ stdin: readLine });

    // Instalar nuestro módulo "turtle" (dibuja a SVG en vez de Tkinter).
    try {
      const shimSrc = await fetch("/turtle_shim.py").then((r) => r.text());
      pyodide.globals.set("_lucksoft_turtle_src", shimSrc);
      pyodide.runPython(
        "import sys, types\n" +
          '_m = types.ModuleType("turtle")\n' +
          "exec(_lucksoft_turtle_src, _m.__dict__)\n" +
          '_m.__name__ = "turtle"\n' +
          'sys.modules["turtle"] = _m\n' +
          "del _lucksoft_turtle_src",
      );
    } catch {
      // Si falla, turtle simplemente no estará disponible; no rompe lo demás.
    }

    postMessage({ type: "ready" });
  } catch (err) {
    postMessage({
      type: "init_error",
      text: String(err && err.stack ? err.stack : err),
    });
  }
}

// Si el programa usó turtle, envía los trazos (en orden) al hilo principal para
// animar el avance en un canvas.
function flushTurtle() {
  try {
    const json = pyodide.runPython(
      'sys.modules["turtle"]._lucksoft_json() if "turtle" in sys.modules else None',
    );
    if (json) postMessage({ type: "turtle", data: JSON.parse(json) });
  } catch {
    /* sin dibujo */
  }
}

async function run(code) {
  try {
    pyodide.runPython(
      'import sys\nif "turtle" in sys.modules: sys.modules["turtle"]._lucksoft_reset()',
    );
    await pyodide.runPythonAsync(code);
    flushTurtle();
    postMessage({ type: "done" });
  } catch (err) {
    flushTurtle(); // mostrar lo dibujado hasta el error
    postMessage({ type: "error", text: String(err) });
  }
}

onmessage = (e) => {
  const msg = e.data;
  if (msg.type === "init") init(msg.controlSAB, msg.dataSAB);
  else if (msg.type === "run") run(msg.code);
};
