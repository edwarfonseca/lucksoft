// Curso de Diseño Web: tres editores (HTML/CSS/JS) + vista previa en vivo.

// ---------- Tareas del curso ----------
const WEB_ASSIGNMENTS = [
  {
    id: "web_tarjeta",
    titulo: "1. Tarjeta de presentación",
    dificultad: "facil",
    enunciado: `
      <p>Crea una <b>tarjeta de presentación</b> con:</p>
      <ol>
        <li>Tu nombre en un <code>&lt;h1&gt;</code>.</li>
        <li>Una breve descripción en un <code>&lt;p&gt;</code>.</li>
        <li>Dale color de fondo y bordes redondeados con <b>CSS</b>.</li>
      </ol>
    `,
    html: '<div class="tarjeta">\n  <h1>Tu Nombre</h1>\n  <p>Estudiante de programación</p>\n</div>',
    css: ".tarjeta {\n  background: #6c5ce7;\n  color: white;\n  padding: 24px;\n  border-radius: 12px;\n  font-family: sans-serif;\n  text-align: center;\n}",
    js: "// Aún no necesitas JavaScript para esta tarea",
  },
  {
    id: "web_contador",
    titulo: "2. Contador con botón",
    dificultad: "media",
    enunciado: `
      <p>Crea un <b>contador</b>:</p>
      <ol>
        <li>Un número en pantalla (empieza en 0).</li>
        <li>Un botón que, al hacer clic, sume 1.</li>
        <li>Usa <code>addEventListener</code> en el <b>JavaScript</b>.</li>
      </ol>
      <p><b>Pista:</b> usa <code>document.getElementById</code>.</p>
    `,
    html: '<h1 id="num">0</h1>\n<button id="btn">Sumar 1</button>',
    css: "body {\n  font-family: sans-serif;\n  text-align: center;\n  padding: 30px;\n}\nbutton {\n  font-size: 18px;\n  padding: 8px 16px;\n  cursor: pointer;\n}",
    js: "let n = 0;\nconst num = document.getElementById('num');\ndocument.getElementById('btn').addEventListener('click', () => {\n  n = n + 1;\n  num.textContent = n;\n});",
  },
  {
    id: "web_libre",
    titulo: "3. Proyecto libre",
    dificultad: "dificil",
    enunciado: `
      <p>Crea la <b>página que quieras</b> usando HTML, CSS y JavaScript.</p>
      <p>Ideas: una galería de imágenes, una lista de tareas, una calculadora…</p>
    `,
    html: "<!-- ¡Tu página aquí! -->\n<h1>Hola mundo</h1>",
    css: "body { font-family: sans-serif; }",
    js: "console.log('¡Listo!');",
  },
];

const DIFICULTAD_LABEL = LuckUtils.DIFICULTAD_LABEL;

// ---------- Editores ----------
const cmOpts = (mode, extra = {}) => ({
  mode,
  theme: "material-darker",
  lineNumbers: true,
  indentUnit: 2,
  tabSize: 2,
  autoCloseBrackets: true,
  matchBrackets: true,
  ...extra,
});

const htmlEditor = CodeMirror.fromTextArea(
  document.getElementById("htmlCode"),
  cmOpts("htmlmixed", { autoCloseTags: true }),
);
const cssEditor = CodeMirror.fromTextArea(
  document.getElementById("cssCode"),
  cmOpts("css"),
);
const jsEditor = CodeMirror.fromTextArea(
  document.getElementById("jsCode"),
  cmOpts("javascript"),
);

// ---------- Autocompletado por lenguaje ----------
// Activa las sugerencias al escribir y con Ctrl+Espacio.
function enableAutocomplete(editor, hintFn) {
  editor.setOption("extraKeys", {
    "Ctrl-Space": (cm) => cm.showHint({ hint: hintFn, completeSingle: false }),
  });
  editor.on("inputRead", (cm, change) => {
    // Dispara con letras, '<' (etiquetas HTML), '.', '-' (propiedades)
    if (/[\w<.-]/.test(change.text[0])) {
      cm.showHint({ hint: hintFn, completeSingle: false });
    }
  });
}

enableAutocomplete(htmlEditor, CodeMirror.hint.html);
enableAutocomplete(cssEditor, CodeMirror.hint.css);
enableAutocomplete(jsEditor, CodeMirror.hint.javascript);

// ---------- Pestañas (HTML / CSS / JS) ----------
const editorsByTab = { html: htmlEditor, css: cssEditor, js: jsEditor };

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    const which = tab.dataset.tab;
    document
      .querySelectorAll(".tab")
      .forEach((t) => t.classList.toggle("active", t === tab));
    document
      .querySelectorAll(".editor-host")
      .forEach((h) => h.classList.toggle("active", h.dataset.host === which));
    const ed = editorsByTab[which];
    setTimeout(() => {
      ed.refresh();
      ed.focus();
    }, 0);
  });
});

// ---------- Vista previa en vivo ----------
const preview = document.getElementById("preview");
const statusEl = document.getElementById("status");

let renderTimer = null;
function scheduleRender() {
  statusEl.textContent = "Actualizando…";
  clearTimeout(renderTimer);
  renderTimer = setTimeout(render, 500);
}

function render() {
  preview.srcdoc = LuckUtils.buildPreviewDoc(
    htmlEditor.getValue(),
    cssEditor.getValue(),
    jsEditor.getValue(),
  );
  statusEl.textContent = "Vista previa actualizada ✓";
  saveLocal();
}

[htmlEditor, cssEditor, jsEditor].forEach((ed) =>
  ed.on("change", scheduleRender),
);

// ---------- Autoguardado local (continuar luego) ----------
const user = LuckAuth.getUser();
const STORAGE_KEY = "lucksoft_web_" + (user ? user.user : "anon");

function saveLocal() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        html: htmlEditor.getValue(),
        css: cssEditor.getValue(),
        js: jsEditor.getValue(),
      }),
    );
  } catch (e) {
    /* sin espacio: ignorar */
  }
}

function setCode({ html, css, js }) {
  htmlEditor.setValue(html || "");
  cssEditor.setValue(css || "");
  jsEditor.setValue(js || "");
}

function restoreLocal() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      setCode(JSON.parse(saved));
      return true;
    } catch (e) {
      /* dato corrupto */
    }
  }
  return false;
}

// ---------- Panel de tareas ----------
const select = document.getElementById("taskSelect");
const content = document.getElementById("taskContent");
const toggleBtn = document.getElementById("taskToggle");
const editorBody = document.getElementById("editorBody");
let currentIndex = 0;

WEB_ASSIGNMENTS.forEach((t, i) => {
  const opt = document.createElement("option");
  opt.value = i;
  opt.textContent = t.titulo;
  select.appendChild(opt);
});

function renderTask(index) {
  currentIndex = index;
  const task = WEB_ASSIGNMENTS[index];
  const dif = DIFICULTAD_LABEL[task.dificultad] || task.dificultad;
  content.innerHTML = `
    <span class="tag dif-${task.dificultad}">${dif}</span>
    <div class="task-text">${task.enunciado}</div>
    <button class="btn btn-ghost task-load" id="loadCodeBtn">⬇ Cargar código base</button>
  `;
  document.getElementById("loadCodeBtn").addEventListener("click", () => {
    if (!confirm("Esto reemplazará tu código actual. ¿Continuar?")) return;
    setCode(task);
  });
}

select.addEventListener("change", () => renderTask(Number(select.value)));
renderTask(0);

toggleBtn.addEventListener("click", () => {
  editorBody.classList.toggle("with-task");
  toggleBtn.classList.toggle(
    "active",
    editorBody.classList.contains("with-task"),
  );
  setTimeout(() => {
    htmlEditor.refresh();
    cssEditor.refresh();
    jsEditor.refresh();
  }, 0);
});

// ---------- Entregar (solo estudiantes) ----------
const submitBtn = document.getElementById("submitBtn");
if (!user || user.rol !== "estudiante") {
  submitBtn.style.display = "none";
} else {
  submitBtn.addEventListener("click", () => {
    const task = WEB_ASSIGNMENTS[currentIndex];
    if (!confirm(`¿Entregar tu solución de "${task.titulo}"?`)) return;
    LuckDB.submit({
      activityId: task.id,
      activityTitle: "Web · " + task.titulo,
      student: user.user,
      studentName: user.nombre,
      kind: "web",
      project: {
        html: htmlEditor.getValue(),
        css: cssEditor.getValue(),
        js: jsEditor.getValue(),
      },
    });
    alert("✓ Entrega registrada. El docente podrá verla en “Calificar”.");
  });
}

// ---------- Arranque ----------
if (!restoreLocal()) setCode(WEB_ASSIGNMENTS[0]); // primera vez: carga la tarea 1
render();
