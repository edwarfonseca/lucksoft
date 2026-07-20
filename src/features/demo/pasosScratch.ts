/**
 * Misiones de la prueba gratis de Scratch (/prueba-scratch), para niños de
 * 7-9 años. No hay botón "ejecutar": Lucky detecta EN VIVO cuándo el niño
 * arrastra el bloque correcto (evento PROJECT_CHANGED del motor de TurboWarp)
 * y celebra al instante, como en un videojuego.
 */

export interface PasoScratch {
  id: string;
  /** Nombre de la misión (estilo videojuego). */
  titulo: string;
  /** Lo que dice Lucky al entrar a la misión (burbujas, en orden). */
  mensajes: string[];
  /** Instrucción corta que queda fija sobre el editor. */
  instruccion: string;
  /** ¿Los bloques del proyecto cumplen la misión? (opcodes presentes). */
  exito: (opcodes: Set<string>) => boolean;
  /** Lo que dice Lucky al lograrlo. */
  festejo: string;
  /** Pista si el niño pide ayuda. */
  pista: string;
  /** Puntos que otorga. */
  xp: number;
}

export const XP_TOTAL_SCRATCH = 100;

export const PASOS_SCRATCH: PasoScratch[] = [
  {
    id: "mover",
    titulo: "Misión 1 · Despierta al gato",
    mensajes: [
      "¿Ves a tu personaje ahí quieto en la pantalla? ¡Está dormido por dentro! Tu primera misión es despertarlo.",
      "Mira los bloques AZULES de la izquierda (dice «Movimiento»). Agarra con el mouse el bloque «mover 10 pasos» y arrástralo al tablero grande del centro.",
    ],
    instruccion: "Arrastra el bloque azul «mover 10 pasos» al centro",
    exito: (ops) => ops.has("motion_movesteps"),
    festejo:
      "¡Lo pusiste! 🎉 Ahora haz CLIC sobre ese bloque varias veces y mira a tu personaje caminar. Cada clic es una orden que él obedece. ¡Tú mandas!",
    pista:
      "Busca en la columna de la izquierda el círculo AZUL que dice «Movimiento». El primer bloque es «mover 10 pasos»: agárralo con el mouse sin soltar y suéltalo en el tablero grande.",
    xp: 20,
  },
  {
    id: "hablar",
    titulo: "Misión 2 · Haz que hable",
    mensajes: [
      "Tu personaje ya camina… ¡pero le falta la voz! 🗣️",
      "Ahora busca los bloques MORADOS (dice «Apariencia») y arrastra el bloque «decir ¡Hola!». Pégalo DEBAJO de tu bloque azul, como fichas de LEGO.",
    ],
    instruccion: "Arrastra el bloque morado «decir ¡Hola!» y pégalo debajo",
    exito: (ops) => ops.has("looks_sayforsecs") || ops.has("looks_say"),
    festejo:
      "¡Habló! 💬 Haz clic en tu torre de bloques: tu personaje camina Y habla, en orden. Eso que armaste ya es un PROGRAMA de verdad. Puedes cambiar el «¡Hola!» por lo que quieras.",
    pista:
      "El círculo MORADO de la izquierda dice «Apariencia». Ahí está «decir ¡Hola!»: arrástralo y suéltalo justo debajo del bloque azul hasta que se peguen solos.",
    xp: 30,
  },
  {
    id: "arcoiris",
    titulo: "Misión 3 · Personaje arcoíris",
    mensajes: [
      "Última misión, la más loca de todas: darle PODERES ARCOÍRIS a tu personaje 🌈",
      "En los bloques MORADOS busca «cambiar efecto color por 25». Pégalo a tu torre… y luego haz clic muchas, muchas veces. 😏",
    ],
    instruccion: "Agrega el bloque «cambiar efecto color por 25» y haz clic",
    exito: (ops) =>
      ops.has("looks_changeeffectby") || ops.has("looks_seteffectto"),
    festejo:
      "🌈 ¡PODERES ARCOÍRIS! Cada clic le cambia el color. Acabas de aprender lo que hace un programador: dar órdenes en orden para crear cosas increíbles.",
    pista:
      "Está en «Apariencia» (morado), un poquito más abajo: se llama «cambiar efecto color por 25». Pégalo debajo de los otros y haz clic en la torre de bloques.",
    xp: 50,
  },
];
