import type { Assignment } from "@/domain/models/course";
import type { WebProject } from "@/domain/models/submission";
import type { CourseStrategy } from "@/courses/CourseStrategy";

/** Tarea de Diseño Web: incluye el proyecto base (HTML/CSS/JS). */
export interface WebAssignment extends Assignment {
  base: WebProject;
}

/** El contenido del editor web es directamente un proyecto {html, css, js}. */
export type WebContent = WebProject;

const assignments: WebAssignment[] = [
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
    base: {
      html: '<div class="tarjeta">\n  <h1>Tu Nombre</h1>\n  <p>Estudiante de programación</p>\n</div>',
      css: ".tarjeta {\n  background: #6c5ce7;\n  color: white;\n  padding: 24px;\n  border-radius: 12px;\n  font-family: sans-serif;\n  text-align: center;\n}",
      js: "// Aún no necesitas JavaScript para esta tarea",
    },
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
    base: {
      html: '<h1 id="num">0</h1>\n<button id="btn">Sumar 1</button>',
      css: "body {\n  font-family: sans-serif;\n  text-align: center;\n  padding: 30px;\n}\nbutton {\n  font-size: 18px;\n  padding: 8px 16px;\n  cursor: pointer;\n}",
      js: "let n = 0;\nconst num = document.getElementById('num');\ndocument.getElementById('btn').addEventListener('click', () => {\n  n = n + 1;\n  num.textContent = n;\n});",
    },
  },
  {
    id: "web_libre",
    titulo: "3. Proyecto libre",
    dificultad: "dificil",
    enunciado: `
      <p>Crea la <b>página que quieras</b> usando HTML, CSS y JavaScript.</p>
      <p>Ideas: una galería de imágenes, una lista de tareas, una calculadora…</p>
    `,
    base: {
      html: "<!-- ¡Tu página aquí! -->\n<h1>Hola mundo</h1>",
      css: "body { font-family: sans-serif; }",
      js: "console.log('¡Listo!');",
    },
  },
];

export const webCourse: CourseStrategy<WebAssignment, WebContent> = {
  kind: "web",
  title: "Diseño Web",
  icon: "🎨",
  route: "/web",
  description:
    "Crea páginas con HTML, CSS y JavaScript y mira el resultado en vivo.",
  assignments,
  buildSubmitInput({ assignment, student, content }) {
    return {
      kind: "web",
      activityId: assignment.id,
      // El legacy prefijaba el título con "Web · " en la vista del docente.
      activityTitle: "Web · " + assignment.titulo,
      student: student.id,
      studentName: student.name,
      project: content,
    };
  },
};
