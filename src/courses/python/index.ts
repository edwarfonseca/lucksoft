import type { Assignment } from "@/domain/models/course";
import type { CourseStrategy } from "@/courses/CourseStrategy";

/** Tarea de Python: añade una plantilla de código opcional. */
export interface PythonAssignment extends Assignment {
  codigoBase?: string;
}

/** Contenido que produce el editor de Python. */
export interface PythonContent {
  code: string;
}

const assignments: PythonAssignment[] = [
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

export const pythonCourse: CourseStrategy<PythonAssignment, PythonContent> = {
  kind: "python",
  title: "Python",
  icon: "🐍",
  route: "/python",
  description:
    "Aprende Python escribiendo y ejecutando código real en tu navegador.",
  assignments,
  buildSubmitInput({ assignment, student, content }) {
    return {
      kind: "python",
      activityId: assignment.id,
      activityTitle: assignment.titulo,
      student: student.id,
      studentName: student.name,
      code: content.code,
    };
  },
};
