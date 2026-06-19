// Editor de Python: CodeMirror + Pyodide.
// Modo preferido: Pyodide en un Web Worker con entrada por consola (input()
//   se escribe directo en la consola). Requiere aislamiento de origen.
// Modo de respaldo: Pyodide en el hilo principal con input() vía window.prompt.

const statusEl = document.getElementById("status");
const runBtn = document.getElementById("runBtn");
const stopBtn = document.getElementById("stopBtn");
const clearBtn = document.getElementById("clearBtn");
const outputEl = document.getElementById("output");

// ---------- Autocompletado ----------
const PY_KEYWORDS = [
  "and",
  "as",
  "assert",
  "async",
  "await",
  "break",
  "class",
  "continue",
  "def",
  "del",
  "elif",
  "else",
  "except",
  "finally",
  "for",
  "from",
  "global",
  "if",
  "import",
  "in",
  "is",
  "lambda",
  "nonlocal",
  "not",
  "or",
  "pass",
  "raise",
  "return",
  "try",
  "while",
  "with",
  "yield",
  "True",
  "False",
  "None",
];
const PY_BUILTINS = [
  "print",
  "input",
  "len",
  "range",
  "int",
  "str",
  "float",
  "bool",
  "list",
  "dict",
  "set",
  "tuple",
  "abs",
  "round",
  "sum",
  "min",
  "max",
  "sorted",
  "reversed",
  "enumerate",
  "zip",
  "map",
  "filter",
  "type",
  "isinstance",
  "open",
  "format",
  "help",
  "id",
  "ord",
  "chr",
  "bin",
  "hex",
  "pow",
  "divmod",
  "random",
  "time",
];

CodeMirror.registerHelper("hint", "python", function (cm) {
  const cur = cm.getCursor();
  const line = cm.getLine(cur.line);
  let start = cur.ch;
  while (start && /[\w]/.test(line.charAt(start - 1))) start--;
  const word = line.slice(start, cur.ch);
  if (!word) return null;

  const docWords = new Set();
  (cm.getValue().match(/[A-Za-z_]\w*/g) || []).forEach((w) => docWords.add(w));

  const all = new Set([...PY_KEYWORDS, ...PY_BUILTINS, ...docWords]);
  const lower = word.toLowerCase();
  const list = [...all]
    .filter((w) => w.toLowerCase().startsWith(lower) && w !== word)
    .sort();

  if (!list.length) return null;
  return {
    list,
    from: CodeMirror.Pos(cur.line, start),
    to: CodeMirror.Pos(cur.line, cur.ch),
  };
});

const editor = CodeMirror.fromTextArea(document.getElementById("code"), {
  mode: "python",
  theme: "material-darker",
  lineNumbers: true,
  indentUnit: 4,
  tabSize: 4,
  matchBrackets: true,
  autoCloseBrackets: true,
  autofocus: true,
  extraKeys: {
    "Ctrl-Enter": () => runCode(),
    "Ctrl-Space": (cm) =>
      cm.showHint({ hint: CodeMirror.hint.python, completeSingle: false }),
  },
});

editor.on("inputRead", (cm, change) => {
  if (!/[\w]/.test(change.text[0])) return;
  cm.showHint({ hint: CodeMirror.hint.python, completeSingle: false });
});

// ---------- Consola ----------
function clearConsole() {
  outputEl.innerHTML = "";
}

function writeOutput(text, isError = false) {
  const span = document.createElement("span");
  if (isError) span.className = "err";
  span.textContent = text;
  outputEl.appendChild(span);
  outputEl.scrollTop = outputEl.scrollHeight;
}

clearBtn.addEventListener("click", clearConsole);

// Muestra un campo de entrada inline en la consola y devuelve lo escrito.
function promptInConsole() {
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.className = "console-input";
    input.autocomplete = "off";
    outputEl.appendChild(input);
    input.focus();
    outputEl.scrollTop = outputEl.scrollHeight;

    input.addEventListener("keydown", (e) => {
      if (e.key !== "Enter") return;
      const value = input.value;
      input.remove();
      writeOutput(value + "\n"); // eco de lo escrito, como en una terminal
      resolve(value);
    });
  });
}

// ---------- Estado de ejecución ----------
const canUseWorker =
  typeof SharedArrayBuffer !== "undefined" && self.crossOriginIsolated === true;

let setReady; // habilita el botón Ejecutar cuando Python está listo
const ready = new Promise((res) => (setReady = res));

function setRunning(running) {
  runBtn.disabled = running;
  stopBtn.disabled = !running;
}

// ============================================================
// MODO 1: Web Worker con entrada por consola
// ============================================================
let worker = null;
let control = null; // Int32Array: [0] bandera, [1] longitud
let dataBytes = null; // Uint8Array compartido

function createWorker() {
  const controlSAB = new SharedArrayBuffer(8);
  const dataSAB = new SharedArrayBuffer(1024 * 8);
  control = new Int32Array(controlSAB);
  dataBytes = new Uint8Array(dataSAB);

  worker = new Worker("js/pyworker.js");
  worker.postMessage({ type: "init", controlSAB, dataSAB });

  worker.onerror = (e) => {
    statusEl.textContent = "Error al cargar Python";
    writeOutput(
      "✗ Error en el worker: " +
        (e.message || "no se pudo cargar") +
        (e.filename ? "\n   " + e.filename + ":" + e.lineno : "") +
        "\n",
      true,
    );
  };

  worker.onmessage = (e) => {
    const msg = e.data;
    switch (msg.type) {
      case "ready":
        statusEl.textContent = "Python listo ✓";
        setRunning(false); // desbloquea el botón Ejecutar
        setReady();
        break;
      case "stdout":
        writeOutput(msg.text);
        break;
      case "stderr":
        writeOutput(msg.text, true);
        break;
      case "input_request":
        promptInConsole().then((value) => {
          const bytes = new TextEncoder().encode(value);
          const len = Math.min(bytes.length, dataBytes.length);
          dataBytes.set(bytes.subarray(0, len));
          Atomics.store(control, 1, len);
          Atomics.store(control, 0, 1);
          Atomics.notify(control, 0, 1);
        });
        break;
      case "done":
        statusEl.textContent = "Listo ✓";
        setRunning(false);
        break;
      case "error":
        writeOutput(msg.text, true);
        statusEl.textContent = "Terminó con errores";
        setRunning(false);
        break;
      case "init_error":
        statusEl.textContent = "Error al cargar Python";
        writeOutput("✗ No se pudo iniciar Python:\n" + msg.text + "\n", true);
        break;
    }
  };
}

function runWithWorker() {
  clearConsole();
  setRunning(true);
  statusEl.textContent = "Ejecutando…";
  worker.postMessage({ type: "run", code: editor.getValue() });
}

function stopWithWorker() {
  worker.terminate();
  writeOutput("\n⏹ Ejecución detenida.\n", true);
  statusEl.textContent = "Reiniciando Python…";
  setRunning(true);
  runBtn.disabled = true;
  // Recrear el worker para una próxima ejecución
  const reready = new Promise((res) => (setReady = res));
  createWorker();
  reready.then(() => setRunning(false));
}

// ============================================================
// MODO 2 (respaldo): Pyodide en el hilo principal con window.prompt
// ============================================================
let pyodide = null;

async function initMainThread() {
  try {
    pyodide = await loadPyodide();
    pyodide.setStdout({ batched: (s) => writeOutput(s + "\n") });
    pyodide.setStderr({ batched: (s) => writeOutput(s + "\n", true) });
    pyodide.runPython(`
import builtins
from js import window

def _lucksoft_input(prompt=""):
    if prompt:
        print(prompt, end="")
    valor = window.prompt(str(prompt))
    if valor is None:
        raise KeyboardInterrupt("Entrada cancelada")
    print(valor)
    return valor

builtins.input = _lucksoft_input
`);
    statusEl.textContent = "Python listo ✓ (entrada por ventana)";
    setRunning(false); // desbloquea el botón Ejecutar
    setReady();
  } catch (err) {
    statusEl.textContent = "Error al cargar Python";
    writeOutput("✗ No se pudo iniciar Python:\n" + String(err) + "\n", true);
  }
}

async function runMainThread() {
  clearConsole();
  setRunning(true);
  statusEl.textContent = "Ejecutando…";
  try {
    await pyodide.runPythonAsync(editor.getValue());
    statusEl.textContent = "Listo ✓";
  } catch (err) {
    writeOutput(String(err), true);
    statusEl.textContent = "Terminó con errores";
  } finally {
    setRunning(false);
  }
}

// ============================================================
// Arranque
// ============================================================
async function runCode() {
  await ready;
  if (canUseWorker) runWithWorker();
  else runMainThread();
}

runBtn.addEventListener("click", runCode);

if (canUseWorker) {
  stopBtn.addEventListener("click", stopWithWorker);
  createWorker();
} else {
  // Sin aislamiento de origen: no hay consola interactiva real.
  stopBtn.style.display = "none";
  writeOutput(
    "ℹ Entrada por ventana emergente. Para escribir en la consola, " +
      "ejecuta el servidor con:  python server.py\n\n",
  );
  initMainThread();
}
