/**
 * Contenido de la prueba gratis pública (/prueba): una mini-aventura guiada de
 * 3 misiones (~5 minutos) donde un niño programa por primera vez sin registrarse.
 * Un personaje guía va hablando como en un videojuego; el "wow" es la tortuga
 * dibujando en pantalla. Al final, el llamado a la clase de prueba real.
 */

/** Resultado de una ejecución, para evaluar si la misión se logró. */
export interface ResultadoEjecucion {
  /** Salida completa de la consola (stdout + stderr concatenados). */
  salida: string;
  /** Hubo algún error de ejecución. */
  error: boolean;
  /** La tortuga dibujó algo. */
  turtle: boolean;
  /** Código que se ejecutó. */
  codigo: string;
}

export interface PasoDemo {
  id: string;
  /** Nombre de la misión (estilo videojuego). */
  titulo: string;
  /** Lo que dice el guía al entrar a la misión (burbujas, en orden). */
  mensajes: string[];
  /** Instrucción corta que queda fija sobre el editor. */
  instruccion: string;
  /** Código con el que arranca el editor. */
  codigo: string;
  /** ¿La ejecución cumple la misión? */
  exito: (r: ResultadoEjecucion) => boolean;
  /** Lo que dice el guía al lograrlo. */
  festejo: string;
  /** Pista si ejecutó pero aún no lo logra. */
  pista: string;
  /** Pista si la ejecución dio error. */
  pistaError: string;
  /** Puntos que otorga. */
  xp: number;
}

export const XP_TOTAL = 100;

export const PASOS_DEMO: PasoDemo[] = [
  {
    id: "saludo",
    titulo: "Misión 1 · El código secreto",
    mensajes: [
      "¡Psst! Ya eres parte de la academia. Tu primera misión: enseñarle a la computadora a decir TU nombre.",
      "Mira el código de abajo: donde dice TU-NOMBRE, escribe el tuyo (¡sin borrar las comillas!) y pulsa ▶ Ejecutar.",
    ],
    instruccion: "Cambia TU-NOMBRE por tu nombre y pulsa ▶ Ejecutar",
    codigo: 'print("Hola, yo soy TU-NOMBRE y estoy programando 😎")\n',
    exito: (r) =>
      !r.error && r.salida.includes("Hola") && !r.salida.includes("TU-NOMBRE"),
    festejo:
      "¡BOOM! 💥 Acabas de escribir tu primera línea de código de verdad. La computadora ya te conoce.",
    pista:
      "¡Casi! Fíjate: hay que reemplazar TU-NOMBRE por tu nombre real, dentro de las comillas. Inténtalo otra vez.",
    pistaError:
      "Uy, la computadora se confundió 🤭 Revisa que no se haya borrado una comilla o un paréntesis, y ejecuta de nuevo.",
    xp: 20,
  },
  {
    id: "tortuga",
    titulo: "Misión 2 · Invoca a la tortuga",
    mensajes: [
      "Ahora viene mi parte favorita: vas a invocar a la tortuga mágica 🐢, una artista que dibuja lo que tu código le ordene.",
      "Este hechizo le ordena dibujar un cuadrado. Pulsa ▶ Ejecutar y no le quites los ojos a la pantalla…",
    ],
    instruccion: "Pulsa ▶ Ejecutar y mira a la tortuga dibujar",
    codigo:
      'import turtle\n\nturtle.color("purple")\nfor lado in range(4):\n    turtle.forward(120)\n    turtle.left(90)\n',
    exito: (r) => !r.error && r.turtle,
    festejo:
      '¡La tortuga te obedeció! 🐢✨ Eso que viste es TU código convertido en dibujo. Si quieres, cambia "purple" por "red" o "blue" y ejecútalo otra vez.',
    pista:
      "Hmm, la tortuga no dibujó nada. Asegúrate de no borrar la línea «import turtle» y vuelve a ejecutar.",
    pistaError:
      "La tortuga se enredó 🐢💦 Revisa que el código esté igual al original (cuida los espacios al inicio de las líneas) y ejecuta de nuevo.",
    xp: 30,
  },
  {
    id: "estrella",
    titulo: "Misión 3 · La estrella mágica",
    mensajes: [
      "Última misión, la más difícil: la ESTRELLA MÁGICA ⭐ Solo los verdaderos programadores la logran.",
      "El hechizo está casi listo, pero le saboteé un número 😏 Para que salga una estrella perfecta, la tortuga debe girar 144 grados. Encuentra el número equivocado, cámbialo por 144 y ejecuta.",
    ],
    instruccion: "Cambia el número de giro por 144 y pulsa ▶ Ejecutar",
    codigo:
      'import turtle\n\nturtle.color("gold")\nfor punta in range(5):\n    turtle.forward(150)\n    turtle.right(90)\n',
    exito: (r) => !r.error && r.turtle && r.codigo.includes("144"),
    festejo:
      "⭐ ¡LA ESTRELLA MÁGICA! Lo lograste. Acabas de usar un bucle, un ángulo y una tortuga — cosas que muchos adultos no saben hacer.",
    pista:
      "Salió una figura, ¡pero no es la estrella! Busca el número que va después de turtle.right( y cámbialo por 144.",
    pistaError:
      "Algo se rompió en el hechizo 🤔 Revisa que solo hayas cambiado el número del giro (nada más) y ejecuta otra vez.",
    xp: 50,
  },
];
