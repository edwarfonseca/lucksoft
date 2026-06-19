// Tareas / asignaciones del curso de Python.
// Para agregar una nueva tarea, añade un objeto a este arreglo.
//   id         : identificador único
//   titulo     : nombre de la tarea
//   dificultad : "facil" | "media" | "dificil"
//   enunciado  : HTML con las instrucciones para el estudiante
//   codigoBase : plantilla que se carga en el editor (opcional)
const ASSIGNMENTS = [
  {
    id: "saludo",
    titulo: "1. Saludo personalizado",
    dificultad: "facil",
    enunciado: `
      <p>Escribe un programa que:</p>
      <ol>
        <li>Pida el <b>nombre</b> del usuario con <code>input()</code>.</li>
        <li>Pida su <b>edad</b>.</li>
        <li>Muestre el mensaje:
          <i>"Hola NOMBRE, el próximo año tendrás X años"</i>.</li>
      </ol>
      <p><b>Pista:</b> recuerda convertir la edad con <code>int()</code>.</p>
    `,
    codigoBase:
      "# Tarea 1: Saludo personalizado\n" +
      "nombre = input('¿Cómo te llamas? ')\n" +
      "# Completa el resto del programa...\n",
  },
  {
    id: "ppt",
    titulo: "2. Piedra, papel o tijera",
    dificultad: "media",
    enunciado: `
      <p>Crea el juego de <b>piedra, papel o tijera</b> contra la computadora:</p>
      <ol>
        <li>Pide al jugador que elija una opción.</li>
        <li>La computadora elige al azar con <code>random</code>.</li>
        <li>Determina quién gana y lleva el <b>marcador</b>.</li>
        <li>Repite hasta que el jugador decida salir.</li>
      </ol>
      <p><b>Reglas:</b> piedra &gt; tijera, tijera &gt; papel, papel &gt; piedra.</p>
    `,
    codigoBase:
      "import random\n\n" +
      "mi_puntaje = 0\n" +
      "puntaje_compu = 0\n\n" +
      "# Escribe tu juego aquí...\n",
  },
  {
    id: "primos",
    titulo: "3. Números primos",
    dificultad: "dificil",
    enunciado: `
      <p>Escribe una función <code>es_primo(n)</code> que devuelva
      <code>True</code> si <code>n</code> es primo y <code>False</code>
      en caso contrario.</p>
      <p>Luego, imprime todos los números primos del <b>1 al 50</b>.</p>
      <p><b>Reto extra:</b> hazlo eficiente comprobando divisores solo
      hasta la raíz cuadrada de <code>n</code>.</p>
    `,
    codigoBase:
      "def es_primo(n):\n" +
      "    # Completa esta función\n" +
      "    pass\n\n" +
      "for numero in range(1, 51):\n" +
      "    if es_primo(numero):\n" +
      "        print(numero)\n",
  },
];

// Etiquetas legibles para la dificultad (compartidas en LuckUtils).
const DIFICULTAD_LABEL = LuckUtils.DIFICULTAD_LABEL;

// ---------- Render del panel de tareas ----------
(function initTasks() {
  const select = document.getElementById("taskSelect");
  const content = document.getElementById("taskContent");
  const toggleBtn = document.getElementById("taskToggle");
  const editorBody = document.getElementById("editorBody");
  const submitBtn = document.getElementById("submitBtn");

  let currentIndex = 0;

  // Llenar el selector
  ASSIGNMENTS.forEach((task, i) => {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = task.titulo;
    select.appendChild(opt);
  });

  function renderTask(index) {
    currentIndex = index;
    const task = ASSIGNMENTS[index];
    const dif = DIFICULTAD_LABEL[task.dificultad] || task.dificultad;
    content.innerHTML = `
      <span class="tag dif-${task.dificultad}">${dif}</span>
      <div class="task-text">${task.enunciado}</div>
      <button class="btn btn-ghost task-load" id="loadCodeBtn">
        ⬇ Cargar código base
      </button>
    `;

    const loadBtn = document.getElementById("loadCodeBtn");
    if (!task.codigoBase) {
      loadBtn.style.display = "none";
      return;
    }
    loadBtn.addEventListener("click", () => {
      const actual = editor.getValue().trim();
      if (
        actual &&
        !confirm("Esto reemplazará tu código actual. ¿Continuar?")
      ) {
        return;
      }
      editor.setValue(task.codigoBase);
      editor.focus();
    });
  }

  select.addEventListener("change", () => renderTask(Number(select.value)));
  renderTask(0);

  // Mostrar / ocultar el panel
  toggleBtn.addEventListener("click", () => {
    editorBody.classList.toggle("with-task");
    const visible = editorBody.classList.contains("with-task");
    toggleBtn.classList.toggle("active", visible);
    setTimeout(() => editor.refresh(), 0); // recalcular tamaño del editor
  });

  // ---------- Entregar (solo estudiantes) ----------
  const user = LuckAuth.getUser();
  if (submitBtn) {
    if (!user || user.rol !== "estudiante") {
      // El docente no entrega tareas; ocultamos el botón.
      submitBtn.style.display = "none";
    } else {
      submitBtn.addEventListener("click", () => {
        const task = ASSIGNMENTS[currentIndex];
        const code = editor.getValue().trim();
        if (!code) {
          alert("Escribe algo de código antes de entregar.");
          return;
        }
        if (
          !confirm(
            `¿Entregar tu solución de "${task.titulo}"?\n` +
              "Si ya habías entregado esta actividad, se reemplazará y quedará pendiente de calificar.",
          )
        ) {
          return;
        }
        LuckDB.submit({
          activityId: task.id,
          activityTitle: task.titulo,
          student: user.user,
          studentName: user.nombre,
          code: editor.getValue(),
          kind: "python",
        });
        alert(
          "✓ Entrega registrada. Podrás ver tu calificación en “Mis notas”.",
        );
      });
    }
  }
})();
