import type {
  BloqueAgenda,
  Curriculum,
  PeriodoContenido,
} from "@/domain/models/curriculum";

/*
 * Currículo gamificado del curso de Scratch para niños de 7 a 12 años:
 * 10 periodos × 4 sesiones de 90 min. Programación por bloques (TurboWarp).
 * Estructura fija de cada periodo:
 *   S1 conceptos nuevos · S2 construcción guiada · S3 retos · S4 Gran Misión.
 * Mucho juego y poca teoría. Cada periodo desbloquea una insignia y da XP.
 * Las agendas reparten los 90 minutos priorizando crear y jugar.
 */

/** Sesión 1 — descubrir conceptos nuevos (con mucho juego). */
const agendaDescubre = (
  gancho: string,
  descubrimos: string,
  juntos: string,
  reto: string,
  mostramos: string,
): BloqueAgenda[] => [
  { nombre: "Calentamiento / juego", minutos: 10, detalle: gancho },
  { nombre: "Descubrimos los bloques", minutos: 20, detalle: descubrimos },
  { nombre: "Probamos juntos", minutos: 25, detalle: juntos },
  { nombre: "Mini retos en parejas", minutos: 25, detalle: reto },
  { nombre: "Mostramos lo que hicimos", minutos: 10, detalle: mostramos },
];

/** Sesión 2 — construcción guiada de un proyecto, paso a paso. */
const agendaConstruye = (
  repaso: string,
  demo: string,
  construimos: string,
  personaliza: string,
  comparte: string,
): BloqueAgenda[] => [
  { nombre: "Recordamos", minutos: 5, detalle: repaso },
  { nombre: "El profe construye y explica", minutos: 15, detalle: demo },
  { nombre: "Construimos paso a paso", minutos: 40, detalle: construimos },
  { nombre: "Personalízalo a tu gusto", minutos: 20, detalle: personaliza },
  { nombre: "Compartimos", minutos: 10, detalle: comparte },
];

/** Sesión 3 — retos y desafíos (a crear sin parar). */
const agendaRetos = (
  calienta: string,
  truco: string,
  retos: string,
  galeria: string,
): BloqueAgenda[] => [
  { nombre: "Calentamiento", minutos: 10, detalle: calienta },
  { nombre: "Truco del día", minutos: 10, detalle: truco },
  { nombre: "Retos por niveles", minutos: 55, detalle: retos },
  { nombre: "Galería: nos mostramos", minutos: 15, detalle: galeria },
];

/** Sesión 4 — Gran Misión (proyecto del periodo). */
const agendaMision = (
  planea: string,
  construye: string,
  prueba: string,
  presenta: string,
): BloqueAgenda[] => [
  { nombre: "Planeamos en papel", minutos: 15, detalle: planea },
  { nombre: "Construimos el proyecto", minutos: 45, detalle: construye },
  { nombre: "Probamos y mejoramos", minutos: 15, detalle: prueba },
  { nombre: "¡Gran presentación!", minutos: 15, detalle: presenta },
];

const periodo1: PeriodoContenido = {
  numero: 1,
  titulo: "Descubriendo Scratch",
  descripcion:
    "Conocemos la plataforma y descubrimos que programar es dar instrucciones a nuestros personajes.",
  proyecto: "Mi Personaje Favorito",
  insignia: { emoji: "🐱", nombre: "Explorador de Scratch" },
  xp: 150,
  sesiones: [
    {
      numero: 1,
      titulo: "¡Hola, Scratch!",
      tipo: "introduccion",
      nivel: "principiante",
      objetivo:
        "Conocer el escenario y los personajes (sprites) y hacer que un personaje se mueva con bloques.",
      conceptos: [
        "Programar es dar instrucciones en orden",
        "El escenario y los personajes (sprites)",
        "El bloque «al hacer clic en 🟩 (bandera verde)»",
        "«mover 10 pasos» y «decir»",
      ],
      agenda: agendaDescubre(
        "Juego del robot: un niño da órdenes y el profe las obedece tal cual. Descubrimos que las máquinas hacen EXACTO lo que les decimos.",
        "Recorrido por Scratch: el escenario, el gato, la zona de bloques. Probamos arrastrar «mover 10 pasos» y darle clic.",
        "Todos ponen «al hacer clic en 🟩» + «mover 10 pasos» + «decir ¡Hola!» y pulsan la bandera verde.",
        "Mini retos: hacer que el gato salude con tu nombre y dé varios pasos.",
        "Cada quien muestra a su gato saludando.",
      ),
      ejercicios: [
        {
          titulo: "Gato andarín",
          descripcion:
            "Al pulsar la bandera 🟩, haz que tu gato camine. ¿Logras que dé 20 pasos seguidos?",
        },
        {
          titulo: "¡Preséntate!",
          descripcion:
            "Que el gato diga «¡Hola, soy (tu nombre)!» por 2 segundos.",
        },
        {
          titulo: "Gato presumido",
          descripcion:
            "Haz que crezca un poco y diga cuál es su color favorito antes de moverse.",
        },
      ],
      retos: [
        {
          titulo: "Gato saltarín",
          nivel: "principiante",
          consigna:
            "Haz que el gato dé 30 pasos al pulsar la bandera (usa «mover 30 pasos»).",
        },
        {
          titulo: "Saludo con nombre",
          nivel: "principiante",
          consigna: "Que el gato diga «¡Hola, soy (tu nombre)!» al empezar.",
        },
        {
          titulo: "Doble saludo",
          nivel: "principiante",
          consigna: "Haz que el gato diga dos cosas, una después de la otra.",
        },
      ],
      cierre: {
        titulo: "Misión: Mi gato me saluda",
        descripcion:
          "Cuando pulses la bandera verde, tu gato debe saludar con tu nombre y moverse un poco. ¡Pruébalo!",
      },
      evaluacion: [
        "Encuentra el escenario, el sprite y los bloques.",
        "Usa «al hacer clic en 🟩» para empezar.",
        "El gato se mueve y habla al pulsar la bandera.",
      ],
      recomendaciones: [
        "Empieza con el juego del robot sin computador: engancha y explica qué es programar.",
        "Celebra el primer «clic en la bandera»: es un momento mágico para ellos.",
        "Deja que exploren bloques libremente unos minutos antes de guiar.",
      ],
      recompensa: "+30 XP · Logro 'Primer bloque'",
    },
    {
      numero: 2,
      titulo: "Mi sprite se mueve y habla",
      tipo: "practica",
      nivel: "principiante",
      objetivo:
        "Construir paso a paso un personaje que se mueve, cambia su aspecto y habla.",
      conceptos: [
        "Elegir un sprite y un fondo",
        "Bloques de Apariencia («decir», «cambiar tamaño»)",
        "Encadenar varios bloques en orden",
      ],
      agenda: agendaConstruye(
        "Recordamos: la bandera verde y «mover». ¿Qué hace cada bloque?",
        "El profe elige un nuevo sprite y un fondo, y le pone bloques para que se mueva y hable.",
        "Cada niño elige su personaje y su fondo, y construye: empezar → moverse → decir algo → cambiar de tamaño.",
        "Personalízalo: cambia el sprite, el fondo y lo que dice tu personaje.",
        "Mostramos los personajes de la clase.",
      ),
      ejercicios: [
        {
          titulo: "Nuevo héroe",
          descripcion:
            "Cambia al gato por otro personaje y ponle un fondo que combine.",
        },
        {
          titulo: "En movimiento",
          descripcion:
            "Haz que se mueva por la pantalla mientras dice su nombre.",
        },
        {
          titulo: "Crece y encoge",
          descripcion:
            "Que se haga gigante, espere un momento y vuelva a su tamaño normal.",
        },
      ],
      retos: [
        {
          titulo: "Mi escenario",
          nivel: "principiante",
          consigna:
            "Elige un fondo que combine con tu personaje y cuenta dónde está.",
        },
        {
          titulo: "Crece y encoge",
          nivel: "principiante",
          consigna:
            "Haz que tu personaje crezca y luego vuelva a su tamaño normal.",
        },
        {
          titulo: "Presentación",
          nivel: "principiante",
          consigna:
            "Que tu personaje diga su nombre y una cosa que le gusta hacer.",
        },
      ],
      cierre: {
        titulo: "Misión: Mi personaje se presenta",
        descripcion:
          "Crea un personaje con su fondo que, al pulsar la bandera, se mueva, cambie de tamaño y se presente.",
      },
      evaluacion: [
        "Elige sprite y fondo a su gusto.",
        "Encadena varios bloques en orden.",
        "El personaje se mueve, habla y cambia de tamaño.",
      ],
      recomendaciones: [
        "Permite total libertad temática: que elijan el personaje que aman.",
        "Si algo no funciona, pregúntales «¿en qué orden están tus bloques?».",
      ],
      recompensa: "+35 XP · Logro 'Mi primer escenario'",
    },
    {
      numero: 3,
      titulo: "Trucos con mi personaje",
      tipo: "retos",
      nivel: "principiante",
      objetivo:
        "Usar más bloques de apariencia y eventos para darle vida al personaje con pequeños trucos.",
      conceptos: [
        "Bloques de Eventos (al hacer clic en el sprite)",
        "Efectos: «cambiar efecto color», «mostrar / esconder»",
        "Probar y observar qué hace cada bloque",
      ],
      agenda: agendaRetos(
        "Juego «¿qué bloque hace esto?»: el profe ejecuta y los niños adivinan el bloque.",
        "Truco del día: «al hacer clic en este objeto → decir algo». ¡El personaje responde cuando lo tocas!",
        "Retos por niveles para hacer que el personaje reaccione al clic, aparezca/desaparezca y cambie de color.",
        "Galería: cada quien muestra su truco favorito.",
      ),
      ejercicios: [
        {
          titulo: "Háblame",
          descripcion: "Al hacerle clic, que tu personaje diga algo gracioso.",
        },
        {
          titulo: "Camaleón",
          descripcion:
            "Usa «efecto color» para que cambie de color al tocarlo.",
        },
        {
          titulo: "Truco de magia",
          descripcion:
            "Que aparezca y desaparezca usando «mostrar» y «esconder».",
        },
      ],
      retos: [
        {
          titulo: "Personaje parlanchín",
          nivel: "principiante",
          consigna:
            "Al hacer clic en él, que diga algo diferente cada vez (varios «decir»).",
        },
        {
          titulo: "Arcoíris",
          nivel: "principiante",
          consigna: "Haz que tu personaje cambie de color poco a poco.",
        },
        {
          titulo: "Ahora me ves",
          nivel: "intermedio",
          consigna:
            "Que el personaje aparezca y desaparezca como por arte de magia.",
        },
        {
          titulo: "Doble truco",
          nivel: "intermedio",
          consigna:
            "Combina dos trucos: que al tocarlo cambie de color Y diga algo.",
        },
      ],
      cierre: {
        titulo: "Misión: El show de trucos",
        descripcion:
          "Arma un mini show donde tu personaje haga al menos dos trucos al darle clic.",
      },
      evaluacion: [
        "Usa el evento «al hacer clic en el objeto».",
        "Aplica un efecto de apariencia.",
        "Combina dos acciones en un truco.",
      ],
      recomendaciones: [
        "Invítalos a experimentar: «prueba el bloque y mira qué pasa».",
        "Los efectos visuales encantan a esta edad; deja tiempo para jugar.",
      ],
      recompensa: "+35 XP · Trofeo 'Mago de los bloques'",
    },
    {
      numero: 4,
      titulo: "Gran Misión: Mi Personaje Favorito",
      tipo: "mision",
      nivel: "principiante",
      objetivo:
        "Crear y presentar un proyecto con tu personaje favorito que se mueve, habla y hace trucos.",
      conceptos: [
        "Integrar movimiento, apariencia y eventos",
        "Elegir personaje, fondo y acciones",
        "Presentar el propio proyecto",
      ],
      agenda: agendaMision(
        "En papel: dibuja tu personaje favorito y escribe 3 cosas que hará (moverse, hablar, un truco).",
        "Constrúyelo en Scratch: elige el sprite y el fondo, y agrega los bloques para que cobre vida.",
        "Pruébalo con la bandera verde y mejóralo: que se vea y suene como tú quieres.",
        "Cada niño presenta su personaje favorito a la clase.",
      ),
      ejercicios: [
        {
          titulo: "Elige tu héroe",
          descripcion:
            "Escoge tu personaje favorito y un fondo que cuente dónde vive.",
        },
        {
          titulo: "Cobra vida",
          descripcion: "Al pulsar la bandera, que se mueva y se presente.",
        },
        {
          titulo: "Truco secreto",
          descripcion:
            "Agrégale un truco al hacerle clic (cambiar color, sonido o salto).",
        },
      ],
      retos: [
        {
          titulo: "Personaje con vida",
          nivel: "principiante",
          consigna: "Que haga al menos 3 cosas: moverse, hablar y un truco.",
        },
        {
          titulo: "Escena completa",
          nivel: "intermedio",
          consigna:
            "Elige un fondo que cuente una historia sobre tu personaje.",
        },
        {
          titulo: "Sorpresa",
          nivel: "intermedio",
          consigna: "Agrega un detalle sorpresa que no le enseñó el profe.",
        },
      ],
      cierre: {
        titulo: "Proyecto: Mi Personaje Favorito",
        descripcion:
          "Tu personaje favorito, con su fondo, que se mueve, se presenta y hace al menos un truco. ¡Preséntalo a la clase!",
      },
      evaluacion: [
        "El proyecto tiene personaje y fondo elegidos.",
        "El personaje se mueve, habla y hace un truco.",
        "Presenta su trabajo con orgullo.",
      ],
      recomendaciones: [
        "Valora la creatividad por encima de la perfección técnica.",
        "Haz una galería: ver los trabajos de los demás los motiva muchísimo.",
      ],
      recompensa: "+50 XP · 🐱 Insignia 'Explorador de Scratch' desbloqueada",
    },
  ],
};

const periodo2: PeriodoContenido = {
  numero: 2,
  titulo: "Secuencias y Animaciones",
  descripcion:
    "Aprendemos a ordenar instrucciones para crear historias y animaciones simples.",
  proyecto: "Mi Historia Animada",
  insignia: { emoji: "🎬", nombre: "Animador Junior" },
  xp: 170,
  sesiones: [
    {
      numero: 1,
      titulo: "Una cosa después de otra",
      tipo: "introduccion",
      nivel: "principiante",
      objetivo:
        "Entender que el orden importa y usar «esperar» para que las acciones se vean.",
      conceptos: [
        "Secuencia: el orden de los bloques importa",
        "«esperar 1 segundo»",
        "«decir» y «pensar»",
      ],
      agenda: agendaDescubre(
        "Juego «la receta loca»: ordenamos en el tablero los pasos para hacer un sándwich. Si cambias el orden, ¡sale mal!",
        "Vemos cómo «esperar 1 segundo» hace que las cosas no pasen todas de golpe.",
        "Construimos una mini escena: el personaje dice algo, espera, y luego dice otra cosa.",
        "Mini retos cambiando el orden de los bloques para ver qué pasa.",
        "Mostramos nuestras mini escenas.",
      ),
      ejercicios: [
        {
          titulo: "Conversación",
          descripcion:
            "Que diga «Hola», espere 1 segundo y luego diga «¿Cómo estás?».",
        },
        {
          titulo: "Detective del orden",
          descripcion: "Cambia el orden de dos bloques y descubre qué pasa.",
        },
        {
          titulo: "Pienso, luego digo",
          descripcion:
            "Usa «pensar» y «decir» para mostrar lo que piensa y lo que dice.",
        },
      ],
      retos: [
        {
          titulo: "Cuenta hasta tres",
          nivel: "principiante",
          consigna: "Que el personaje diga 1, espere, diga 2, espere y diga 3.",
        },
        {
          titulo: "Diálogo",
          nivel: "principiante",
          consigna:
            "Haz que el personaje diga tres frases con pausas entre ellas.",
        },
        {
          titulo: "Pienso y digo",
          nivel: "intermedio",
          consigna:
            "Combina «pensar» y «decir» para mostrar lo que piensa y lo que dice.",
        },
      ],
      cierre: {
        titulo: "Misión: Mi mini diálogo",
        descripcion:
          "Crea un personaje que diga tres frases en orden, con pausas para que se entienda.",
      },
      evaluacion: [
        "Ordena los bloques correctamente.",
        "Usa «esperar» entre acciones.",
        "Las frases se entienden, una tras otra.",
      ],
      recomendaciones: [
        "El juego de la receta hace visible la idea de secuencia: úsalo.",
        "Sin «esperar» todo pasa de golpe; provoca ese error para que lo descubran.",
      ],
      recompensa: "+35 XP · Logro 'En orden'",
    },
    {
      numero: 2,
      titulo: "Construyo una animación",
      tipo: "practica",
      nivel: "principiante",
      objetivo:
        "Crear una animación cambiando disfraces y repitiendo acciones.",
      conceptos: [
        "Disfraces de un sprite",
        "«cambiar al siguiente disfraz»",
        "«repetir» para animar",
      ],
      agenda: agendaConstruye(
        "Recordamos las secuencias y las pausas.",
        "El profe muestra cómo un personaje «camina» cambiando de disfraz dentro de «repetir».",
        "Construimos paso a paso: «por siempre» o «repetir 10» con «cambiar disfraz» + «esperar» para que se mueva como animación.",
        "Personalízalo: elige un personaje con varios disfraces y haz tu propia animación.",
        "Compartimos las animaciones.",
      ),
      ejercicios: [
        {
          titulo: "Elige bailarín",
          descripcion: "Busca un personaje que tenga 2 o más disfraces.",
        },
        {
          titulo: "Cuadro a cuadro",
          descripcion:
            "Con «repetir 10», cambia al siguiente disfraz cada 0.2 s para animarlo.",
        },
        {
          titulo: "Control de velocidad",
          descripcion:
            "Cambia el «esperar» para que la animación vaya más rápida o más lenta.",
        },
      ],
      retos: [
        {
          titulo: "Caminando",
          nivel: "principiante",
          consigna:
            "Haz que tu personaje parezca que camina cambiando disfraces.",
        },
        {
          titulo: "Más rápido / más lento",
          nivel: "principiante",
          consigna:
            "Cambia el «esperar» para que la animación sea más rápida o más lenta.",
        },
        {
          titulo: "Animación con movimiento",
          nivel: "intermedio",
          consigna:
            "Que además de cambiar disfraz, el personaje avance por el escenario.",
        },
      ],
      cierre: {
        titulo: "Misión: Mi animación",
        descripcion:
          "Crea un personaje que se anime cambiando de disfraz mientras se mueve por el escenario.",
      },
      evaluacion: [
        "Usa varios disfraces.",
        "Repite el cambio de disfraz para animar.",
        "Controla la velocidad con «esperar».",
      ],
      recomendaciones: [
        "Elige sprites con disfraces de animación (caminar, volar) para resultados vistosos.",
        "Muestra cómo cambiar el «esperar» acelera o frena la animación.",
      ],
      recompensa: "+40 XP · Logro 'Cuadro a cuadro'",
    },
    {
      numero: 3,
      titulo: "Retos de animación",
      tipo: "retos",
      nivel: "intermedio",
      objetivo:
        "Combinar disfraces, movimiento y diálogos para animaciones más vivas.",
      conceptos: [
        "Combinar animación con diálogos",
        "«deslizar en 1 segundo a x, y» (movimiento suave)",
        "Encadenar varias acciones",
      ],
      agenda: agendaRetos(
        "Calentamiento: ¿quién hace la animación más graciosa en 2 minutos?",
        "Truco del día: «deslizar en 1 segundo a x: ... y: ...» mueve al personaje suavemente.",
        "Retos por niveles: animaciones con saltos, paseos y conversaciones.",
        "Galería: votamos la animación más creativa.",
      ),
      ejercicios: [
        {
          titulo: "Deslízate",
          descripcion:
            "Usa «deslizar en 1 s» para que tu personaje se mueva suave, sin saltos.",
        },
        {
          titulo: "Habla y anda",
          descripcion: "Que hable mientras se desplaza por el escenario.",
        },
        {
          titulo: "Animación al paso",
          descripcion:
            "Cambia disfraces mientras se desliza para que parezca que camina.",
        },
      ],
      retos: [
        {
          titulo: "El paseo",
          nivel: "intermedio",
          consigna:
            "Tu personaje cruza el escenario caminando (disfraces) y deslizándose.",
        },
        {
          titulo: "Saltarín",
          nivel: "intermedio",
          consigna: "Haz que el personaje suba y baje como si saltara.",
        },
        {
          titulo: "Dos amigos",
          nivel: "intermedio",
          consigna: "Anima dos personajes que se mueven y se saludan.",
        },
        {
          titulo: "Animación sorpresa",
          nivel: "avanzado",
          consigna:
            "Inventa una animación con un final sorpresa (un cambio de disfraz o color al terminar).",
        },
      ],
      cierre: {
        titulo: "Misión: Escena animada",
        descripcion:
          "Crea una escena donde un personaje se mueve suavemente, se anima y dice algo.",
      },
      evaluacion: [
        "Usa «deslizar» para movimiento suave.",
        "Combina animación, movimiento y diálogo.",
        "La escena se entiende y se ve fluida.",
      ],
      recomendaciones: [
        "«deslizar» da un acabado pro; muéstralo frente a «mover» de golpe.",
        "Anima a contar una micro-historia, no solo a mover por mover.",
      ],
      recompensa: "+45 XP · Trofeo 'Animador veloz'",
    },
    {
      numero: 4,
      titulo: "Gran Misión: Mi Historia Animada",
      tipo: "mision",
      nivel: "intermedio",
      objetivo:
        "Crear y presentar una historia animada corta con dos personajes que hablan y se mueven.",
      conceptos: [
        "Integrar secuencias, disfraces y diálogos",
        "Una historia con principio y final",
        "Coordinar dos personajes",
      ],
      agenda: agendaMision(
        "En papel: piensa una mini historia (¿quiénes son? ¿qué pasa? ¿cómo termina?).",
        "Constrúyela: dos personajes que se mueven, cambian de disfraz y conversan por turnos.",
        "Pruébala y mejora los tiempos (que no hablen los dos a la vez).",
        "¡Función de cine! Cada quien presenta su historia animada.",
      ),
      ejercicios: [
        {
          titulo: "El reparto",
          descripcion: "Elige dos personajes y un fondo para tu historia.",
        },
        {
          titulo: "Por turnos",
          descripcion:
            "Haz que conversen por turnos usando «decir» y «esperar».",
        },
        {
          titulo: "¡Acción!",
          descripcion: "Anímalos con disfraces mientras hablan.",
        },
      ],
      retos: [
        {
          titulo: "Conversación por turnos",
          nivel: "intermedio",
          consigna:
            "Que un personaje hable, espere, y luego hable el otro (¡sin pisarse!).",
        },
        {
          titulo: "Cambio de escena",
          nivel: "avanzado",
          consigna:
            "Cambia el fondo a mitad de la historia para mostrar otro lugar.",
        },
        {
          titulo: "Final feliz",
          nivel: "intermedio",
          consigna:
            "Termina la historia con una animación especial (baile, salto, color).",
        },
      ],
      cierre: {
        titulo: "Proyecto: Mi Historia Animada",
        descripcion:
          "Una historia corta con dos personajes que se mueven, se animan y conversan por turnos, con principio y final. ¡Preséntala!",
      },
      evaluacion: [
        "La historia tiene principio y final.",
        "Los personajes conversan por turnos, sin pisarse.",
        "Hay animación (disfraces o movimiento).",
      ],
      recomendaciones: [
        "El reto difícil es la sincronía: enséñales a usar «esperar» para los turnos.",
        "Deja que escriban su historia en papel primero; mejora muchísimo el resultado.",
      ],
      recompensa: "+55 XP · 🎬 Insignia 'Animador Junior' desbloqueada",
    },
  ],
};

const periodo3: PeriodoContenido = {
  numero: 3,
  titulo: "Coordenadas y Movimiento",
  descripcion:
    "Aprendemos a mover personajes por todo el escenario usando coordenadas y el teclado.",
  proyecto: "Carrera de Personajes",
  insignia: { emoji: "🕹️", nombre: "Piloto de Sprites" },
  xp: 190,
  sesiones: [
    {
      numero: 1,
      titulo: "El mapa secreto (X e Y)",
      tipo: "introduccion",
      nivel: "principiante",
      objetivo:
        "Entender las coordenadas X e Y y mover el personaje a un punto exacto.",
      conceptos: [
        "El escenario es un mapa con X (izquierda-derecha) e Y (arriba-abajo)",
        "«ir a x: ... y: ...»",
        "El centro es x:0 y:0",
      ],
      agenda: agendaDescubre(
        "Juego «batalla naval» sencillo en el tablero: encontramos casillas dando dos números.",
        "Vemos cómo el escenario tiene coordenadas y movemos el gato arrastrándolo (mira cómo cambian X e Y).",
        "Probamos «ir a x: 100 y: 50» y otros puntos para teletransportar al personaje.",
        "Mini retos: llevar al personaje a las esquinas y al centro.",
        "Mostramos a dónde logramos llevar al personaje.",
      ),
      ejercicios: [
        {
          titulo: "Explorador X-Y",
          descripcion:
            "Arrastra tu personaje y observa cómo cambian los números X e Y.",
        },
        {
          titulo: "Al centro",
          descripcion: "Usa «ir a x: 0 y: 0» para teletransportarlo al centro.",
        },
        {
          titulo: "A la esquina",
          descripcion: "Llévalo a una esquina usando coordenadas grandes.",
        },
      ],
      retos: [
        {
          titulo: "Teletransporte",
          nivel: "principiante",
          consigna:
            "Haz que al pulsar la bandera el personaje aparezca en una esquina exacta.",
        },
        {
          titulo: "Recorrido",
          nivel: "principiante",
          consigna:
            "Que el personaje vaya a 3 puntos distintos, esperando entre cada uno.",
        },
        {
          titulo: "Al centro y a volar",
          nivel: "intermedio",
          consigna:
            "Empieza en el centro (x:0 y:0) y muévete a la derecha del escenario.",
        },
      ],
      cierre: {
        titulo: "Misión: El recorrido mágico",
        descripcion:
          "Haz que tu personaje visite 4 puntos del escenario en orden, esperando en cada uno.",
      },
      evaluacion: [
        "Entiende que X e Y ubican al personaje.",
        "Usa «ir a x.. y..» para puntos exactos.",
        "Lleva el personaje a varios lugares en orden.",
      ],
      recomendaciones: [
        "La batalla naval en papel hace tangibles las coordenadas: úsala de gancho.",
        "Muestra los números X/Y que cambian al arrastrar el sprite.",
      ],
      recompensa: "+40 XP · Logro 'Lector de mapas'",
    },
    {
      numero: 2,
      titulo: "Muevo con el teclado",
      tipo: "practica",
      nivel: "principiante",
      objetivo:
        "Controlar al personaje con las flechas del teclado usando eventos de tecla.",
      conceptos: [
        "«al presionar tecla [flecha]»",
        "«sumar a x» y «sumar a y» para moverse",
        "Apuntar en dirección",
      ],
      agenda: agendaConstruye(
        "Recordamos X e Y y para qué sirven.",
        "El profe construye el control con flechas: «al presionar flecha derecha → sumar 10 a x».",
        "Construimos paso a paso el control completo: arriba, abajo, izquierda y derecha.",
        "Personalízalo: cambia el personaje y la velocidad (cuánto suma cada flecha).",
        "Compartimos y probamos los controles de los compañeros.",
      ),
      ejercicios: [
        {
          titulo: "Hacia la derecha",
          descripcion: "Programa «al presionar flecha derecha → sumar 10 a x».",
        },
        {
          titulo: "Izquierda también",
          descripcion: "Agrega la flecha izquierda (sumar -10 a x).",
        },
        {
          titulo: "Control total",
          descripcion:
            "Suma las flechas arriba y abajo para moverte en las 4 direcciones.",
        },
      ],
      retos: [
        {
          titulo: "Control total",
          nivel: "principiante",
          consigna:
            "Que el personaje se mueva en las 4 direcciones con las flechas.",
        },
        {
          titulo: "Turbo",
          nivel: "principiante",
          consigna: "Haz una versión rápida (sumar 20) y una lenta (sumar 5).",
        },
        {
          titulo: "Mira a dónde va",
          nivel: "intermedio",
          consigna: "Que el personaje apunte hacia el lado al que se mueve.",
        },
      ],
      cierre: {
        titulo: "Misión: Mi personaje teledirigido",
        descripcion:
          "Crea un personaje que puedas mover por todo el escenario con las 4 flechas.",
      },
      evaluacion: [
        "Usa eventos «al presionar tecla».",
        "Mueve el personaje en las 4 direcciones.",
        "Controla la velocidad del movimiento.",
      ],
      recomendaciones: [
        "Que prueben su control de inmediato: el movimiento por teclado entusiasma.",
        "Si solo se mueve en un sentido, revisen el signo del número (10 vs -10).",
      ],
      recompensa: "+45 XP · Logro 'Manos al control'",
    },
    {
      numero: 3,
      titulo: "Retos de movimiento",
      tipo: "retos",
      nivel: "intermedio",
      objetivo:
        "Controlar el movimiento dentro de los límites del escenario y rebotar en los bordes.",
      conceptos: [
        "«si toca un borde, rebotar»",
        "Mantener al personaje dentro del escenario",
        "Combinar teclado y movimiento automático",
      ],
      agenda: agendaRetos(
        "Calentamiento: carrera de 30 segundos moviendo el personaje con las flechas.",
        "Truco del día: «por siempre → mover 5 pasos → si toca un borde, rebotar» (¡se mueve solo y no se escapa!).",
        "Retos por niveles: que el personaje no se salga, que rebote, que persiga el ratón.",
        "Galería: mostramos los movimientos más locos.",
      ),
      ejercicios: [
        {
          titulo: "Pelota rebotona",
          descripcion:
            "Haz un personaje que se mueva solo y rebote en los bordes.",
        },
        {
          titulo: "Sígueme",
          descripcion:
            "Que un personaje vaya siempre hacia el puntero del ratón.",
        },
        {
          titulo: "Sin escaparse",
          descripcion:
            "Evita que tu personaje con flechas se salga de la pantalla.",
        },
      ],
      retos: [
        {
          titulo: "Pelota loca",
          nivel: "intermedio",
          consigna:
            "Una pelota que se mueve sola y rebota por todo el escenario.",
        },
        {
          titulo: "Sígueme",
          nivel: "intermedio",
          consigna: "Un personaje que siempre va hacia donde está el ratón.",
        },
        {
          titulo: "Sin escapar",
          nivel: "intermedio",
          consigna:
            "Que tu personaje con flechas no pueda salirse de la pantalla.",
        },
        {
          titulo: "Persecución",
          nivel: "avanzado",
          consigna: "Un personaje que persigue a otro por el escenario.",
        },
      ],
      cierre: {
        titulo: "Misión: Movimiento sin límites",
        descripcion:
          "Crea una escena con un personaje que se mueve solo y rebota, y otro que controlas tú.",
      },
      evaluacion: [
        "Usa «rebotar» en los bordes.",
        "Mantiene el personaje dentro del escenario.",
        "Combina movimiento automático y por teclado.",
      ],
      recomendaciones: [
        "El rebote engancha; ya prepara la base para los juegos de los próximos periodos.",
        "Recuérdales «por siempre» para que el movimiento no se detenga.",
      ],
      recompensa: "+50 XP · Trofeo 'As del volante'",
    },
    {
      numero: 4,
      titulo: "Gran Misión: Carrera de Personajes",
      tipo: "mision",
      nivel: "intermedio",
      objetivo:
        "Crear y presentar una carrera para dos jugadores, controlando cada personaje con el teclado.",
      conceptos: [
        "Integrar coordenadas, teclado y bordes",
        "Dos controles distintos (dos jugadores)",
        "Línea de meta",
      ],
      agenda: agendaMision(
        "En papel: dibuja la pista, dónde empiezan los corredores y dónde está la meta.",
        "Constrúyela: dos personajes en la salida, cada uno con sus teclas, y una meta.",
        "Pruébala con un compañero y ajusta la velocidad para que sea justa.",
        "¡Gran carrera! Compiten los proyectos entre compañeros.",
      ),
      ejercicios: [
        {
          titulo: "A la salida",
          descripcion:
            "Coloca dos personajes en la línea de salida con «ir a x.. y..».",
        },
        {
          titulo: "Dos controles",
          descripcion: "Dale a cada corredor sus propias teclas para moverse.",
        },
        {
          titulo: "¡Meta!",
          descripcion: "Pon una meta y prueba quién llega primero.",
        },
      ],
      retos: [
        {
          titulo: "Dos jugadores",
          nivel: "intermedio",
          consigna:
            "Que el jugador 1 use las flechas y el jugador 2 las teclas W A S D.",
        },
        {
          titulo: "¡Ganaste!",
          nivel: "avanzado",
          consigna:
            "Que al llegar a la meta, el personaje diga «¡Gané!» (pista: «si tocando la meta»).",
        },
        {
          titulo: "Pista con curvas",
          nivel: "intermedio",
          consigna:
            "Dibuja un fondo de pista con curvas y un punto de salida claro.",
        },
      ],
      cierre: {
        titulo: "Proyecto: Carrera de Personajes",
        descripcion:
          "Una carrera para dos jugadores: cada personaje con su control, salida y meta. ¡Organicen un torneo!",
      },
      evaluacion: [
        "Dos personajes con controles distintos.",
        "Salida y meta definidas.",
        "La carrera es jugable y justa.",
      ],
      recomendaciones: [
        "El torneo final es muy motivador: resérvale tiempo.",
        "Ayúdalos a equilibrar la velocidad para que ninguno gane siempre.",
      ],
      recompensa: "+60 XP · 🕹️ Insignia 'Piloto de Sprites' desbloqueada",
    },
  ],
};

const periodo4: PeriodoContenido = {
  numero: 4,
  titulo: "Decisiones y Condiciones",
  descripcion:
    "Hacemos que nuestros programas reaccionen: tomen decisiones y respondan a lo que pasa.",
  proyecto: "Laberinto Interactivo",
  insignia: { emoji: "🧭", nombre: "Detective de Decisiones" },
  xp: 210,
  sesiones: [
    {
      numero: 1,
      titulo: "Si pasa esto, haz aquello",
      tipo: "introduccion",
      nivel: "intermedio",
      objetivo:
        "Usar el bloque «si... entonces» para que el personaje reaccione a una situación.",
      conceptos: [
        "El bloque «si... entonces»",
        "Sensores: «¿tocando el puntero?», «¿tecla pulsada?»",
        "«por siempre» + «si» para vigilar todo el tiempo",
      ],
      agenda: agendaDescubre(
        "Juego «Simón dice»: solo obedecemos SI Simón lo dice. ¡Eso es una condición!",
        "Descubrimos «si... entonces» y los sensores (tocando, tecla pulsada).",
        "Construimos juntos: «por siempre → si ¿tocando el puntero? → decir ¡Me tocaste!».",
        "Mini retos: que el personaje reaccione a una tecla o al ratón.",
        "Mostramos nuestras reacciones.",
      ),
      ejercicios: [
        {
          titulo: "Me tocaste",
          descripcion:
            "Programa «si ¿tocando el puntero? entonces decir ¡Hola!».",
        },
        {
          titulo: "Vigilante",
          descripcion:
            "Mete ese «si» dentro de «por siempre» para que vigile todo el tiempo.",
        },
        {
          titulo: "Botón espacio",
          descripcion:
            "Haz que reaccione al pulsar la tecla espacio («¿tecla espacio pulsada?»).",
        },
      ],
      retos: [
        {
          titulo: "No me toques",
          nivel: "intermedio",
          consigna:
            "Que el personaje grite algo cada vez que el ratón lo toca.",
        },
        {
          titulo: "Botón mágico",
          nivel: "intermedio",
          consigna: "Que al pulsar una tecla, el personaje cambie de color.",
        },
        {
          titulo: "Vigilante",
          nivel: "intermedio",
          consigna:
            "Usa «por siempre» para que el personaje reaccione una y otra vez.",
        },
      ],
      cierre: {
        titulo: "Misión: El personaje reactivo",
        descripcion:
          "Crea un personaje que reaccione de dos formas distintas: al tocarlo con el ratón y al pulsar una tecla.",
      },
      evaluacion: [
        "Usa «si... entonces» con un sensor.",
        "Lo coloca dentro de «por siempre».",
        "El personaje reacciona como se espera.",
      ],
      recomendaciones: [
        "«Simón dice» enseña la condición sin computador: aprovéchalo.",
        "Sin «por siempre», el «si» solo se revisa una vez: muéstralo.",
      ],
      recompensa: "+45 XP · Logro 'Primera decisión'",
    },
    {
      numero: 2,
      titulo: "Construyo un laberinto",
      tipo: "practica",
      nivel: "intermedio",
      objetivo:
        "Detectar colores para crear las paredes de un laberinto que el personaje no puede cruzar.",
      conceptos: [
        "«¿tocando color?»",
        "«si... entonces... si no...»",
        "Volver atrás si chocas con una pared",
      ],
      agenda: agendaConstruye(
        "Recordamos «si... entonces» y los sensores.",
        "El profe dibuja un laberinto en el fondo y muestra: «si tocando el color de la pared, vuelve atrás».",
        "Construimos paso a paso: mover con flechas + detectar el color de las paredes para no atravesarlas.",
        "Personalízalo: dibuja tu propio laberinto y elige el color de las paredes.",
        "Compartimos: jugamos los laberintos de los demás.",
      ),
      ejercicios: [
        {
          titulo: "Dibuja el camino",
          descripcion: "Pinta un laberinto sencillo en el fondo del escenario.",
        },
        {
          titulo: "A moverse",
          descripcion: "Controla al personaje con las flechas del teclado.",
        },
        {
          titulo: "Paredes sólidas",
          descripcion:
            "«si ¿tocando color (pared)?» retrocede un poco para no atravesarla.",
        },
      ],
      retos: [
        {
          titulo: "Paredes sólidas",
          nivel: "intermedio",
          consigna:
            "Que el personaje no pueda atravesar ninguna pared del laberinto.",
        },
        {
          titulo: "La salida",
          nivel: "intermedio",
          consigna:
            "Marca una salida de otro color y que al tocarla diga «¡Lo lograste!».",
        },
        {
          titulo: "Laberinto difícil",
          nivel: "avanzado",
          consigna: "Dibuja un laberinto más complicado con varios caminos.",
        },
      ],
      cierre: {
        titulo: "Misión: Mi laberinto",
        descripcion:
          "Crea un laberinto donde controlas un personaje que no puede atravesar las paredes.",
      },
      evaluacion: [
        "Usa «¿tocando color?» para las paredes.",
        "El personaje no atraviesa las paredes.",
        "El laberinto se puede jugar.",
      ],
      recomendaciones: [
        "Que pinten las paredes de un color liso y distinto; facilita la detección.",
        "Truco clave: al tocar la pared, regresar a la posición anterior.",
      ],
      recompensa: "+50 XP · Logro 'Constructor de laberintos'",
    },
    {
      numero: 3,
      titulo: "Retos de interacción",
      tipo: "retos",
      nivel: "intermedio",
      objetivo: "Crear interacciones combinando varias condiciones y sensores.",
      conceptos: [
        "«¿tocando (otro sprite)?»",
        "Combinar varias condiciones",
        "Reacciones distintas según lo que toca",
      ],
      agenda: agendaRetos(
        "Calentamiento: «si... entonces» relámpago: el profe dice una condición y los niños la programan.",
        "Truco del día: «¿tocando (otro objeto)?» para que dos personajes interactúen.",
        "Retos por niveles: trampas, premios, puertas que se abren al tocar una llave.",
        "Galería: mostramos las interacciones más ingeniosas.",
      ),
      ejercicios: [
        {
          titulo: "¡Punto!",
          descripcion:
            "Al tocar una estrella, que el personaje diga «¡Punto!».",
        },
        {
          titulo: "Cuidado, trampa",
          descripcion:
            "Al tocar una trampa, que el personaje vuelva al inicio.",
        },
        {
          titulo: "Dos reacciones",
          descripcion:
            "Que reaccione distinto al tocar dos objetos diferentes.",
        },
      ],
      retos: [
        {
          titulo: "Recoge la moneda",
          nivel: "intermedio",
          consigna:
            "Que al tocar una moneda, la moneda desaparezca (esconder).",
        },
        {
          titulo: "Trampa",
          nivel: "intermedio",
          consigna:
            "Que al tocar una trampa, el personaje regrese a la salida.",
        },
        {
          titulo: "Llave y puerta",
          nivel: "avanzado",
          consigna:
            "Que la puerta se abra (desaparezca) solo después de tocar la llave.",
        },
        {
          titulo: "Tres reacciones",
          nivel: "avanzado",
          consigna:
            "Crea tres objetos, cada uno con una reacción diferente al tocarlo.",
        },
      ],
      cierre: {
        titulo: "Misión: Mundo interactivo",
        descripcion:
          "Crea una escena con al menos tres objetos que reaccionan distinto cuando el personaje los toca.",
      },
      evaluacion: [
        "Usa «¿tocando (sprite)?» correctamente.",
        "Crea reacciones distintas para distintos objetos.",
        "Las interacciones funcionan al jugar.",
      ],
      recomendaciones: [
        "Estas interacciones son la base de los juegos: refuérzalas bien.",
        "Pídeles inventar sus propias reglas: «¿qué pasa si tocas esto?».",
      ],
      recompensa: "+55 XP · Trofeo 'Detective de reglas'",
    },
    {
      numero: 4,
      titulo: "Gran Misión: Laberinto Interactivo",
      tipo: "mision",
      nivel: "avanzado",
      objetivo:
        "Crear y presentar un laberinto jugable con paredes, premios, trampas y una salida ganadora.",
      conceptos: [
        "Integrar condiciones, sensores y colores",
        "Reglas del juego (ganar / reiniciar)",
        "Diseño de un nivel jugable",
      ],
      agenda: agendaMision(
        "En papel: dibuja tu laberinto con la salida, dos premios y una trampa.",
        "Constrúyelo: paredes con color, control con flechas, premios que desaparecen, trampa que reinicia y meta que gana.",
        "Pruébalo (que un compañero lo juegue) y arregla los caminos imposibles.",
        "¡Sala de juegos! Cada quien presenta y deja jugar su laberinto.",
      ),
      ejercicios: [
        {
          titulo: "El plano",
          descripcion: "Dibuja tu laberinto con su salida y su meta.",
        },
        {
          titulo: "Tesoros",
          descripcion: "Agrega premios que desaparecen al tocarlos.",
        },
        {
          titulo: "Trampa traicionera",
          descripcion: "Pon una trampa que devuelve al jugador al inicio.",
        },
      ],
      retos: [
        {
          titulo: "¡Has ganado!",
          nivel: "avanzado",
          consigna: "Que al tocar la meta aparezca un mensaje de victoria.",
        },
        {
          titulo: "Premios a recoger",
          nivel: "intermedio",
          consigna: "Coloca al menos dos premios que el jugador deba recoger.",
        },
        {
          titulo: "Reto extra",
          nivel: "avanzado",
          consigna: "Agrega una trampa móvil que también reinicie si te toca.",
        },
      ],
      cierre: {
        titulo: "Proyecto: Laberinto Interactivo",
        descripcion:
          "Un laberinto jugable con paredes que no se atraviesan, premios, una trampa y una meta que gana el juego. ¡Que lo jueguen!",
      },
      evaluacion: [
        "Las paredes funcionan (no se atraviesan).",
        "Hay premios, trampa y meta con sus reacciones.",
        "El laberinto se puede ganar.",
      ],
      recomendaciones: [
        "Es su primer mini-juego completo: celebra el logro.",
        "Las pruebas cruzadas entre compañeros descubren caminos rotos.",
      ],
      recompensa: "+70 XP · 🧭 Insignia 'Detective de Decisiones' desbloqueada",
    },
  ],
};

const periodo5: PeriodoContenido = {
  numero: 5,
  titulo: "Repeticiones y Patrones",
  descripcion:
    "Aprendemos a repetir acciones automáticamente para crear movimientos y patrones.",
  proyecto: "Robot Bailarín",
  insignia: { emoji: "🔁", nombre: "Maestro de los Bucles" },
  xp: 230,
  sesiones: [
    {
      numero: 1,
      titulo: "Repetir sin cansarse",
      tipo: "introduccion",
      nivel: "intermedio",
      objetivo:
        "Usar «repetir» y «por siempre» para que el personaje haga acciones automáticamente.",
      conceptos: [
        "«repetir 10»",
        "«por siempre»",
        "Repetir nos ahorra poner muchos bloques iguales",
      ],
      agenda: agendaDescubre(
        "Juego «la ola»: repetimos el mismo gesto en cadena. ¡Eso es un bucle!",
        "Descubrimos «repetir 10» y «por siempre». Vemos cómo un solo «repetir» reemplaza muchos bloques.",
        "Construimos juntos: «repetir 4 → mover 50 → girar 90» (¡dibuja un cuadrado al caminar!).",
        "Mini retos cambiando el número de repeticiones.",
        "Mostramos nuestros movimientos repetidos.",
      ),
      ejercicios: [
        {
          titulo: "Cuatro pasotes",
          descripcion:
            "Haz que el personaje dé 4 pasos grandes usando «repetir 4».",
        },
        {
          titulo: "Gira sin fin",
          descripcion: "Usa «por siempre» para que gire sin parar.",
        },
        {
          titulo: "Más o menos",
          descripcion:
            "Cambia el número de «repetir» y mira cómo cambia el resultado.",
        },
      ],
      retos: [
        {
          titulo: "Vueltas",
          nivel: "intermedio",
          consigna: "Que el personaje dé 10 vueltas usando «repetir».",
        },
        {
          titulo: "Cuadrado caminando",
          nivel: "intermedio",
          consigna:
            "Con «repetir 4», «mover» y «girar 90», dibuja un cuadrado con el recorrido.",
        },
        {
          titulo: "Sin parar",
          nivel: "intermedio",
          consigna:
            "Usa «por siempre» para una animación que nunca se detiene.",
        },
      ],
      cierre: {
        titulo: "Misión: El movimiento infinito",
        descripcion:
          "Crea un personaje que haga un movimiento repetido para siempre (girar, latir o rebotar).",
      },
      evaluacion: [
        "Usa «repetir» con un número.",
        "Usa «por siempre» para repetir sin fin.",
        "Entiende que repetir ahorra bloques.",
      ],
      recomendaciones: [
        "El juego de «la ola» hace sentir el bucle con el cuerpo.",
        "Compara: 4 bloques «mover» vs un «repetir 4». ¡Magia!",
      ],
      recompensa: "+50 XP · Logro 'Primer bucle'",
    },
    {
      numero: 2,
      titulo: "Construyo movimientos automáticos",
      tipo: "practica",
      nivel: "intermedio",
      objetivo:
        "Combinar repeticiones con disfraces y giros para crear movimientos automáticos.",
      conceptos: [
        "Repetir con cambio de disfraz",
        "«girar» dentro de un bucle",
        "Contadores básicos (sumar 1 en cada vuelta)",
      ],
      agenda: agendaConstruye(
        "Recordamos «repetir» y «por siempre».",
        "El profe construye un personaje que «baila»: dentro de un bucle cambia disfraz, gira y se mueve.",
        "Construimos paso a paso un baile automático con varias acciones repetidas.",
        "Personalízalo: elige tu personaje y crea tu propio baile.",
        "Compartimos los bailes automáticos.",
      ),
      ejercicios: [
        {
          titulo: "Baile en bucle",
          descripcion: "Dentro de «por siempre»: cambiar disfraz + esperar.",
        },
        {
          titulo: "Da vueltas",
          descripcion: "Agrega un «girar» para que dé vueltas mientras baila.",
        },
        {
          titulo: "Baila y avanza",
          descripcion:
            "Que también se mueva por el escenario mientras se anima.",
        },
      ],
      retos: [
        {
          titulo: "Baile básico",
          nivel: "intermedio",
          consigna: "Un personaje que baila repitiendo disfraces y giros.",
        },
        {
          titulo: "Más pasos",
          nivel: "intermedio",
          consigna:
            "Agrega un tercer movimiento al baile (saltar o cambiar de tamaño).",
        },
        {
          titulo: "Cuenta los pasos",
          nivel: "avanzado",
          consigna:
            "Crea una variable que sume 1 en cada vuelta del baile y muéstrala.",
        },
      ],
      cierre: {
        titulo: "Misión: Mi baile automático",
        descripcion:
          "Crea un personaje que baile solo, repitiendo al menos tres movimientos diferentes.",
      },
      evaluacion: [
        "Usa un bucle para el baile.",
        "Combina disfraces, giros y movimiento.",
        "El baile se repite de forma fluida.",
      ],
      recomendaciones: [
        "Pon música de fondo de la clase mientras construyen sus bailes: pura motivación.",
        "Introduce el contador con suavidad; no es obligatorio para todos.",
      ],
      recompensa: "+55 XP · Logro 'Coreógrafo digital'",
    },
    {
      numero: 3,
      titulo: "Retos de patrones",
      tipo: "retos",
      nivel: "avanzado",
      objetivo:
        "Usar bucles con el lápiz (o sellos) para dibujar patrones bonitos.",
      conceptos: [
        "Bloques de Lápiz: «bajar lápiz», «sellar»",
        "Repetir + girar = figuras y patrones",
        "Cambiar color en cada vuelta",
      ],
      agenda: agendaRetos(
        "Calentamiento: con «repetir» y «girar», ¿qué figura sale? Adivinamos antes de probar.",
        "Truco del día: «bajar lápiz» + «repetir 36 → mover → girar 10» dibuja un círculo de pasos.",
        "Retos por niveles: estrellas, flores, espirales y mosaicos con sellos.",
        "Galería: exponemos nuestros dibujos de patrones.",
      ),
      ejercicios: [
        {
          titulo: "Cuadrado mágico",
          descripcion:
            "Con «bajar lápiz» y «repetir 4» (mover + girar 90) dibuja un cuadrado.",
        },
        {
          titulo: "Estrella",
          descripcion: "Cambia el giro a 72 para que salga una estrella.",
        },
        {
          titulo: "Arcoíris",
          descripcion: "Cambia el color del lápiz en cada vuelta del dibujo.",
        },
      ],
      retos: [
        {
          titulo: "Polígono mágico",
          nivel: "intermedio",
          consigna:
            "Dibuja un triángulo y luego un pentágono cambiando el giro.",
        },
        {
          titulo: "Flor de colores",
          nivel: "avanzado",
          consigna:
            "Repite una figura girando un poco cada vez para formar una flor.",
        },
        {
          titulo: "Espiral",
          nivel: "avanzado",
          consigna: "Haz una espiral moviéndote un poco más en cada vuelta.",
        },
        {
          titulo: "Mosaico con sellos",
          nivel: "avanzado",
          consigna:
            "Usa «sellar» dentro de un bucle para llenar el escenario de un patrón.",
        },
      ],
      cierre: {
        titulo: "Misión: Mi obra de arte",
        descripcion:
          "Crea un dibujo de patrones usando bucles y el lápiz, con cambios de color.",
      },
      evaluacion: [
        "Usa el lápiz o los sellos dentro de un bucle.",
        "Genera un patrón reconocible.",
        "Aplica cambios de color para decorarlo.",
      ],
      recomendaciones: [
        "Recuerda «borrar todo» al empezar y «subir lápiz» al terminar.",
        "Los patrones geométricos asombran; deja tiempo para experimentar con los números.",
      ],
      recompensa: "+60 XP · Trofeo 'Artista de patrones'",
    },
    {
      numero: 4,
      titulo: "Gran Misión: Robot Bailarín",
      tipo: "mision",
      nivel: "avanzado",
      objetivo:
        "Crear y presentar un robot que baila solo combinando bucles, movimientos y patrones.",
      conceptos: [
        "Integrar repeticiones, animación y patrones",
        "Coreografía automática con varios bloques",
        "Escenario decorado",
      ],
      agenda: agendaMision(
        "En papel: diseña a tu robot y escribe los 4 pasos de su baile.",
        "Constrúyelo: un robot que repite su coreografía (disfraces, giros, movimiento) y deja un patrón de fondo.",
        "Pruébalo y ajusta los tiempos para que el baile se vea bien.",
        "¡Concurso de baile! Presentamos los robots bailarines.",
      ),
      ejercicios: [
        {
          titulo: "Tu robot",
          descripcion:
            "Elige (o dibuja) un robot y ponle un fondo para su show.",
        },
        {
          titulo: "La coreografía",
          descripcion: "Programa su baile dentro de un bucle.",
        },
        {
          titulo: "Pista decorada",
          descripcion: "Decora el fondo con un patrón hecho con bucles.",
        },
      ],
      retos: [
        {
          titulo: "Coreografía completa",
          nivel: "avanzado",
          consigna:
            "El robot repite al menos 4 movimientos distintos en su baile.",
        },
        {
          titulo: "Fondo con patrón",
          nivel: "avanzado",
          consigna:
            "Dibuja un patrón decorativo de fondo con el lápiz o sellos.",
        },
        {
          titulo: "Dúo de baile",
          nivel: "avanzado",
          consigna: "Agrega un segundo robot que baile a un ritmo distinto.",
        },
      ],
      cierre: {
        titulo: "Proyecto: Robot Bailarín",
        descripcion:
          "Un robot que baila solo repitiendo su coreografía, sobre un escenario decorado con patrones. ¡Que empiece el show!",
      },
      evaluacion: [
        "Usa bucles para la coreografía.",
        "Combina varios movimientos repetidos.",
        "El escenario tiene un patrón decorativo.",
      ],
      recomendaciones: [
        "El concurso de baile cierra el periodo con energía: dale protagonismo.",
        "Valora tanto la coreografía como la decoración del escenario.",
      ],
      recompensa: "+75 XP · 🔁 Insignia 'Maestro de los Bucles' desbloqueada",
    },
  ],
};

const periodo6: PeriodoContenido = {
  numero: 6,
  titulo: "Variables y Puntuaciones",
  descripcion:
    "Aprendemos a guardar información en los proyectos: puntos, vidas y cronómetros.",
  proyecto: "Atrapa los Objetos",
  insignia: { emoji: "🔢", nombre: "Guardián de Puntos" },
  xp: 250,
  sesiones: [
    {
      numero: 1,
      titulo: "Una cajita que guarda números",
      tipo: "introduccion",
      nivel: "intermedio",
      objetivo:
        "Entender qué es una variable y crear un marcador de puntos que sube.",
      conceptos: [
        "Una variable es una cajita con nombre que guarda un valor",
        "Crear la variable «puntos»",
        "«fijar puntos a 0» y «sumar 1 a puntos»",
      ],
      agenda: agendaDescubre(
        "Juego del marcador: contamos puntos a mano en el tablero. La compu puede hacerlo por nosotros con una variable.",
        "Descubrimos cómo crear la variable «puntos» y verla en el escenario.",
        "Construimos juntos: empezar en 0 y, al hacer clic en un objeto, «sumar 1 a puntos».",
        "Mini retos cambiando cuánto suma cada clic.",
        "Mostramos nuestros marcadores.",
      ),
      ejercicios: [
        {
          titulo: "Crea «puntos»",
          descripcion:
            "Crea la variable «puntos» y haz que aparezca en el escenario.",
        },
        {
          titulo: "Empieza en 0",
          descripcion: "Pon «fijar puntos a 0» al pulsar la bandera verde.",
        },
        {
          titulo: "Clic = punto",
          descripcion: "Al hacer clic en un objeto, «sumar 1 a puntos».",
        },
      ],
      retos: [
        {
          titulo: "Clicker",
          nivel: "intermedio",
          consigna: "Que cada clic en el personaje sume 1 punto al marcador.",
        },
        {
          titulo: "Vale por 5",
          nivel: "intermedio",
          consigna: "Crea un objeto especial que sume 5 puntos de una vez.",
        },
        {
          titulo: "Reinicio",
          nivel: "intermedio",
          consigna: "Que al pulsar la bandera, los puntos vuelvan a 0.",
        },
      ],
      cierre: {
        titulo: "Misión: Mi marcador",
        descripcion:
          "Crea un juego de clics donde cada clic suma puntos y el marcador empieza en 0.",
      },
      evaluacion: [
        "Crea y muestra una variable.",
        "La inicializa en 0 al empezar.",
        "Suma puntos al interactuar.",
      ],
      recomendaciones: [
        "La metáfora de la «cajita con nombre» funciona genial a esta edad.",
        "Que vean el número subir en pantalla los engancha al instante.",
      ],
      recompensa: "+50 XP · Logro 'Mi primera variable'",
    },
    {
      numero: 2,
      titulo: "Construyo un juego con vidas",
      tipo: "practica",
      nivel: "intermedio",
      objetivo:
        "Usar dos variables (puntos y vidas) y mostrar cuándo se acaba el juego.",
      conceptos: [
        "Variable «vidas» además de «puntos»",
        "«restar 1 a vidas» al fallar",
        "«si vidas = 0» → fin del juego",
      ],
      agenda: agendaConstruye(
        "Recordamos qué es una variable y cómo suma puntos.",
        "El profe construye un juego con vidas: ganar puntos al acertar, perder vidas al fallar.",
        "Construimos paso a paso: dos variables, sumar puntos, restar vidas y revisar si llegaron a 0.",
        "Personalízalo: cambia los personajes y cuántas vidas se empieza.",
        "Compartimos y jugamos.",
      ),
      ejercicios: [
        {
          titulo: "Tres vidas",
          descripcion: "Crea la variable «vidas» y empiézala en 3.",
        },
        {
          titulo: "¡Ay, fallaste!",
          descripcion: "Haz que al fallar se «reste 1 a vidas».",
        },
        {
          titulo: "Game over",
          descripcion: "Cuando vidas = 0, muestra el mensaje «Fin del juego».",
        },
      ],
      retos: [
        {
          titulo: "Tres vidas",
          nivel: "intermedio",
          consigna:
            "El jugador empieza con 3 vidas y las pierde al cometer errores.",
        },
        {
          titulo: "Game over",
          nivel: "intermedio",
          consigna: "Cuando las vidas llegan a 0, el juego se detiene y avisa.",
        },
        {
          titulo: "Puntos y vidas juntos",
          nivel: "avanzado",
          consigna: "Muestra a la vez el puntaje y las vidas durante el juego.",
        },
      ],
      cierre: {
        titulo: "Misión: Juego con vidas",
        descripcion:
          "Crea un mini juego que lleve puntos y vidas, y que termine cuando se acaban las vidas.",
      },
      evaluacion: [
        "Usa dos variables (puntos y vidas).",
        "Resta vidas al fallar.",
        "Detecta el fin del juego con «si vidas = 0».",
      ],
      recomendaciones: [
        "«Detener todos» o un mensaje claro al llegar a 0 ayuda a cerrar el juego.",
        "Que decidan cuántas vidas dar: les encanta tener ese control.",
      ],
      recompensa: "+55 XP · Logro 'Sistema de vidas'",
    },
    {
      numero: 3,
      titulo: "Retos de marcadores",
      tipo: "retos",
      nivel: "avanzado",
      objetivo:
        "Usar cronómetros y récords para hacer los juegos más emocionantes.",
      conceptos: [
        "El «cronómetro» de Scratch",
        "Variable «tiempo» o cuenta regresiva",
        "Guardar el récord (mejor puntaje)",
      ],
      agenda: agendaRetos(
        "Calentamiento: ¿quién consigue más clics en 10 segundos?",
        "Truco del día: usar el «cronómetro» y «reiniciar cronómetro» para ponerle tiempo al juego.",
        "Retos por niveles: cuenta regresiva, récord, bonus por velocidad.",
        "Galería: comparamos récords de la clase.",
      ),
      ejercicios: [
        {
          titulo: "Contrarreloj",
          descripcion:
            "Muestra el «cronómetro» en pantalla y reinícialo al empezar.",
        },
        {
          titulo: "Cuenta atrás",
          descripcion: "Crea una cuenta regresiva de 30 a 0 con una variable.",
        },
        {
          titulo: "Récord",
          descripcion: "Guarda el mejor puntaje en una variable «récord».",
        },
      ],
      retos: [
        {
          titulo: "Contrarreloj",
          nivel: "avanzado",
          consigna:
            "El juego dura 30 segundos; al acabar, muestra el puntaje final.",
        },
        {
          titulo: "Récord",
          nivel: "avanzado",
          consigna:
            "Si superas el récord, guárdalo y muestra «¡Nuevo récord!».",
        },
        {
          titulo: "Bonus rápido",
          nivel: "avanzado",
          consigna: "Da puntos extra si aciertas en los primeros segundos.",
        },
        {
          titulo: "Cuenta regresiva",
          nivel: "intermedio",
          consigna: "Muestra una variable «tiempo» que baja de 30 a 0.",
        },
      ],
      cierre: {
        titulo: "Misión: Juego contrarreloj",
        descripcion: "Crea un mini juego con tiempo límite y récord guardado.",
      },
      evaluacion: [
        "Usa el cronómetro o una cuenta regresiva.",
        "Guarda y muestra un récord.",
        "El tiempo hace el juego más emocionante.",
      ],
      recomendaciones: [
        "El récord motiva a repetir y mejorar: gran enganche.",
        "La cuenta regresiva con variable es buen reto de lógica para los mayores.",
      ],
      recompensa: "+60 XP · Trofeo 'Cazador de récords'",
    },
    {
      numero: 4,
      titulo: "Gran Misión: Atrapa los Objetos",
      tipo: "mision",
      nivel: "avanzado",
      objetivo:
        "Crear y presentar un juego donde atrapas objetos que caen, con puntos, vidas y tiempo.",
      conceptos: [
        "Integrar variables, condiciones y movimiento",
        "Objetos que caen y se atrapan",
        "Reglas de puntos y fin del juego",
      ],
      agenda: agendaMision(
        "En papel: diseña tu juego (¿qué cae?, ¿qué suma puntos?, ¿qué quita vidas?).",
        "Constrúyelo: una canasta que mueves, objetos que caen, puntos al atrapar y vidas al fallar.",
        "Pruébalo (que un compañero juegue) y ajusta la dificultad.",
        "¡Sala de arcade! Presentamos y jugamos los juegos.",
      ),
      ejercicios: [
        {
          titulo: "La canasta",
          descripcion: "Crea una canasta que muevas a izquierda y derecha.",
        },
        {
          titulo: "Lluvia",
          descripcion: "Haz que un objeto caiga desde arriba del escenario.",
        },
        {
          titulo: "Puntos y vidas",
          descripcion: "Suma puntos al atrapar y resta vidas al dejarlo caer.",
        },
      ],
      retos: [
        {
          titulo: "Lluvia de objetos",
          nivel: "avanzado",
          consigna:
            "Que los objetos caigan una y otra vez en posiciones distintas.",
        },
        {
          titulo: "Buenos y malos",
          nivel: "avanzado",
          consigna:
            "Agrega objetos que suman y objetos que quitan vidas si los atrapas.",
        },
        {
          titulo: "Final con puntaje",
          nivel: "avanzado",
          consigna:
            "Cuando se acaban las vidas o el tiempo, muestra el puntaje final.",
        },
      ],
      cierre: {
        titulo: "Proyecto: Atrapa los Objetos",
        descripcion:
          "Un juego completo: mueves una canasta para atrapar objetos que caen, con puntos, vidas y un final claro. ¡A jugar!",
      },
      evaluacion: [
        "Usa variables de puntos y vidas.",
        "Los objetos caen y se pueden atrapar.",
        "El juego tiene un final con puntaje.",
      ],
      recomendaciones: [
        "Este proyecto junta casi todo lo aprendido: dale tiempo y acompaña.",
        "Ayúdalos a equilibrar la velocidad de caída para que sea divertido, no imposible.",
      ],
      recompensa: "+85 XP · 🔢 Insignia 'Guardián de Puntos' desbloqueada",
    },
  ],
};

const periodo7: PeriodoContenido = {
  numero: 7,
  titulo: "Sonidos y Multimedia",
  descripcion:
    "Hacemos proyectos más vivos con sonidos, música, fondos y efectos visuales.",
  proyecto: "Concierto Interactivo",
  insignia: { emoji: "🎵", nombre: "DJ Creativo" },
  xp: 270,
  sesiones: [
    {
      numero: 1,
      titulo: "¡Que suene!",
      tipo: "introduccion",
      nivel: "intermedio",
      objetivo: "Agregar sonidos a los proyectos y reproducirlos con eventos.",
      conceptos: [
        "Bloques de Sonido: «iniciar sonido», «tocar sonido hasta que termine»",
        "Elegir sonidos de la biblioteca",
        "Reproducir sonido al hacer clic o con una tecla",
      ],
      agenda: agendaDescubre(
        "Juego de la orquesta: cada niño es un «instrumento» y suena cuando el director lo señala.",
        "Descubrimos los bloques de sonido y la biblioteca de sonidos.",
        "Construimos juntos: «al hacer clic en este objeto → iniciar sonido».",
        "Mini retos: que distintos objetos suenen distinto.",
        "Mostramos (¡y escuchamos!) nuestros objetos sonoros.",
      ),
      ejercicios: [
        {
          titulo: "Elige un sonido",
          descripcion: "Escoge un sonido de la biblioteca para tu personaje.",
        },
        {
          titulo: "Clic sonoro",
          descripcion: "Haz que suene al hacer clic en él.",
        },
        {
          titulo: "Dúo de sonidos",
          descripcion: "Agrega un segundo objeto con un sonido distinto.",
        },
      ],
      retos: [
        {
          titulo: "Botonera de sonidos",
          nivel: "intermedio",
          consigna: "Crea 3 objetos que suenen distinto al hacerles clic.",
        },
        {
          titulo: "Sonido con tecla",
          nivel: "intermedio",
          consigna: "Que al pulsar una tecla suene un efecto.",
        },
        {
          titulo: "Animal que habla",
          nivel: "intermedio",
          consigna:
            "Un animal que hace su sonido y además «dice» qué animal es.",
        },
      ],
      cierre: {
        titulo: "Misión: Mi tablero de sonidos",
        descripcion:
          "Crea un tablero con al menos 3 objetos que reproducen sonidos al tocarlos.",
      },
      evaluacion: [
        "Agrega sonidos de la biblioteca.",
        "Los reproduce con un evento (clic o tecla).",
        "Cada objeto suena distinto.",
      ],
      recomendaciones: [
        "Usa audífonos o turnos para que el aula no sea un caos de sonidos.",
        "El juego de la orquesta prepara la idea de sincronizar.",
      ],
      recompensa: "+55 XP · Logro 'Maestro del sonido'",
    },
    {
      numero: 2,
      titulo: "Construyo una escena con música",
      tipo: "practica",
      nivel: "intermedio",
      objetivo:
        "Combinar música de fondo, cambios de fondo y efectos visuales en una escena.",
      conceptos: [
        "Música de fondo en bucle",
        "Cambiar el fondo del escenario",
        "Efectos visuales («efecto color», «efecto fantasma»)",
      ],
      agenda: agendaConstruye(
        "Recordamos cómo reproducir sonidos.",
        "El profe arma una escena con música de fondo, un cambio de fondo y luces (efectos).",
        "Construimos paso a paso: música en «por siempre», cambiar el fondo y aplicar efectos al personaje.",
        "Personalízalo: elige tu música, tus fondos y tus efectos.",
        "Compartimos las escenas ambientadas.",
      ),
      ejercicios: [
        {
          titulo: "Música sin fin",
          descripcion: "Pon una música de fondo que se repita en bucle.",
        },
        {
          titulo: "Cambia el lugar",
          descripcion: "Cambia el fondo del escenario a otro distinto.",
        },
        {
          titulo: "Luces",
          descripcion:
            "Aplica «efecto color» o «efecto fantasma» a tu personaje.",
        },
      ],
      retos: [
        {
          titulo: "Ambiente",
          nivel: "intermedio",
          consigna:
            "Crea una escena (día, fiesta o espacio) con su música y su fondo.",
        },
        {
          titulo: "Luces de colores",
          nivel: "intermedio",
          consigna:
            "Haz que las luces (efecto color) cambien al ritmo, en un bucle.",
        },
        {
          titulo: "Aparición fantasma",
          nivel: "avanzado",
          consigna:
            "Que un personaje aparezca poco a poco con el efecto fantasma.",
        },
      ],
      cierre: {
        titulo: "Misión: Mi escena ambientada",
        descripcion:
          "Crea una escena con música de fondo, al menos un cambio de fondo y un efecto visual.",
      },
      evaluacion: [
        "Usa música de fondo en bucle.",
        "Cambia el fondo del escenario.",
        "Aplica un efecto visual.",
      ],
      recomendaciones: [
        "Que la música no tape los efectos: enséñales a bajar el volumen si hace falta.",
        "Los efectos «fantasma» y «color» dan resultados vistosos con poco esfuerzo.",
      ],
      recompensa: "+60 XP · Logro 'Ambientador'",
    },
    {
      numero: 3,
      titulo: "Retos de sincronización",
      tipo: "retos",
      nivel: "avanzado",
      objetivo: "Coordinar sonidos y animaciones usando mensajes y esperas.",
      conceptos: [
        "«enviar mensaje» y «al recibir mensaje»",
        "Sincronizar varios sprites",
        "Sonido + animación al mismo tiempo",
      ],
      agenda: agendaRetos(
        "Calentamiento: el director envía «¡ya!» y todos los instrumentos suenan a la vez.",
        "Truco del día: «enviar mensaje» avisa a otros sprites para que actúen juntos.",
        "Retos por niveles: que la música y el baile vayan al mismo tiempo; que un mensaje encienda las luces.",
        "Galería: presentamos nuestros números sincronizados.",
      ),
      ejercicios: [
        {
          titulo: "Mensajero",
          descripcion:
            "Usa «enviar mensaje» y que otro sprite reaccione con «al recibir».",
        },
        {
          titulo: "Música + baile",
          descripcion: "Haz que un personaje baile mientras suena la música.",
        },
        {
          titulo: "A la vez",
          descripcion: "Sincroniza dos personajes con un mismo mensaje.",
        },
      ],
      retos: [
        {
          titulo: "A la cuenta de tres",
          nivel: "avanzado",
          consigna:
            "Que al enviar un mensaje, tres personajes hagan algo a la vez.",
        },
        {
          titulo: "Música y baile",
          nivel: "avanzado",
          consigna: "Que el baile empiece justo cuando empieza la música.",
        },
        {
          titulo: "Luces al ritmo",
          nivel: "avanzado",
          consigna:
            "Que las luces cambien sincronizadas con los golpes de la música.",
        },
        {
          titulo: "Coro",
          nivel: "intermedio",
          consigna:
            "Varios personajes que «cantan» (dicen) por turnos con mensajes.",
        },
      ],
      cierre: {
        titulo: "Misión: Número sincronizado",
        descripcion:
          "Crea una escena donde música, animación y efectos pasan coordinados gracias a los mensajes.",
      },
      evaluacion: [
        "Usa «enviar» y «al recibir» mensaje.",
        "Coordina sonido y animación.",
        "Varios sprites actúan en sincronía.",
      ],
      recomendaciones: [
        "Los mensajes son un concepto poderoso; preséntalos como «avisar a los demás».",
        "Empieza sincronizando solo dos sprites antes de añadir más.",
      ],
      recompensa: "+65 XP · Trofeo 'Director de orquesta'",
    },
    {
      numero: 4,
      titulo: "Gran Misión: Concierto Interactivo",
      tipo: "mision",
      nivel: "avanzado",
      objetivo:
        "Crear y presentar un concierto donde el público interactúa con sonidos, luces y animaciones.",
      conceptos: [
        "Integrar sonido, efectos y mensajes",
        "Interacción del público (clics y teclas)",
        "Espectáculo coordinado",
      ],
      agenda: agendaMision(
        "En papel: diseña tu concierto (¿qué instrumentos?, ¿qué pasa al tocarlos?, ¿qué luces?).",
        "Constrúyelo: instrumentos que suenan al clic, músicos que se animan y luces sincronizadas con mensajes.",
        "Pruébalo y ajusta volúmenes y tiempos.",
        "¡Gran concierto! Cada quien presenta su espectáculo interactivo.",
      ),
      ejercicios: [
        {
          titulo: "Instrumentos",
          descripcion: "Crea instrumentos que suenen al hacerles clic.",
        },
        {
          titulo: "La banda",
          descripcion: "Agrega músicos que se animen mientras tocan.",
        },
        {
          titulo: "Show de luces",
          descripcion: "Pon luces (efectos) que cambien con la música.",
        },
      ],
      retos: [
        {
          titulo: "Banda completa",
          nivel: "avanzado",
          consigna: "Al menos 3 instrumentos interactivos que suenan distinto.",
        },
        {
          titulo: "Show de luces",
          nivel: "avanzado",
          consigna: "Luces sincronizadas con la música usando mensajes.",
        },
        {
          titulo: "El público participa",
          nivel: "avanzado",
          consigna:
            "Que con el teclado el público pueda añadir sonidos al concierto.",
        },
      ],
      cierre: {
        titulo: "Proyecto: Concierto Interactivo",
        descripcion:
          "Un concierto donde el público hace sonar instrumentos, los músicos se animan y las luces van al ritmo. ¡Que suba el telón!",
      },
      evaluacion: [
        "Combina sonidos, animación y efectos.",
        "El público puede interactuar.",
        "Hay sincronía (mensajes) en el espectáculo.",
      ],
      recomendaciones: [
        "El concierto es ideal para una presentación grupal: dale escenario.",
        "Cuida el volumen en el aula; sugiere turnos para presentar.",
      ],
      recompensa: "+95 XP · 🎵 Insignia 'DJ Creativo' desbloqueada",
    },
  ],
};

const periodo8: PeriodoContenido = {
  numero: 8,
  titulo: "Videojuegos Básicos",
  descripcion:
    "Juntamos todo lo aprendido para crear videojuegos con objetivo, enemigos y reglas.",
  proyecto: "Juego de Recolección",
  insignia: { emoji: "🎮", nombre: "Creador de Juegos" },
  xp: 290,
  sesiones: [
    {
      numero: 1,
      titulo: "¿Qué hace divertido un juego?",
      tipo: "introduccion",
      nivel: "intermedio",
      objetivo:
        "Entender las partes de un videojuego: objetivo, héroe, enemigos y reglas.",
      conceptos: [
        "El objetivo del juego (qué hay que lograr)",
        "Héroe y enemigos",
        "Reglas: qué suma, qué quita, cómo se gana o pierde",
      ],
      agenda: agendaDescubre(
        "Charla rápida: ¿cuál es tu juego favorito y por qué es divertido? Buscamos qué tienen en común.",
        "Descubrimos las partes de un juego con ejemplos sencillos hechos en Scratch.",
        "Construimos juntos el inicio: un héroe que se mueve y un objetivo (recoger algo).",
        "Mini retos: agregar una regla (sumar puntos al recoger).",
        "Mostramos nuestros inicios de juego.",
      ),
      ejercicios: [
        {
          titulo: "El héroe",
          descripcion: "Crea un héroe que se mueve con las flechas.",
        },
        {
          titulo: "A recoger",
          descripcion: "Agrega un objeto que suma puntos al recogerlo.",
        },
        {
          titulo: "La misión",
          descripcion: "Que el juego «diga» cuál es el objetivo al empezar.",
        },
      ],
      retos: [
        {
          titulo: "Objetivo claro",
          nivel: "intermedio",
          consigna: "Que al empezar, el juego diga al jugador qué debe hacer.",
        },
        {
          titulo: "Primer enemigo",
          nivel: "intermedio",
          consigna: "Agrega un enemigo que se mueve por el escenario.",
        },
        {
          titulo: "Regla simple",
          nivel: "intermedio",
          consigna: "Suma puntos al recoger y resta vidas al tocar al enemigo.",
        },
      ],
      cierre: {
        titulo: "Misión: Las bases de mi juego",
        descripcion:
          "Crea el inicio de un juego con héroe, un objeto a recoger, un enemigo y una regla.",
      },
      evaluacion: [
        "Identifica las partes de un juego.",
        "Crea héroe, objetivo y enemigo.",
        "Define al menos una regla.",
      ],
      recomendaciones: [
        "Partir de sus juegos favoritos los conecta con la idea de diseño.",
        "Insiste en el objetivo claro: muchos juegos fallan por no decir qué hacer.",
      ],
      recompensa: "+55 XP · Logro 'Aprendiz de game designer'",
    },
    {
      numero: 2,
      titulo: "Construyo un juego de recolección",
      tipo: "practica",
      nivel: "avanzado",
      objetivo:
        "Construir paso a paso un juego de recoger objetos con puntos, enemigos y vidas.",
      conceptos: [
        "Objetos que reaparecen al recogerlos",
        "Enemigos que quitan vidas",
        "Marcador de puntos y vidas",
      ],
      agenda: agendaConstruye(
        "Recordamos las partes de un juego.",
        "El profe construye un juego de recolección completo y explica cada parte.",
        "Construimos paso a paso: héroe + objetos que reaparecen + enemigo + puntos + vidas.",
        "Personalízalo: cambia el tema (frutas, monedas, estrellas) y la dificultad.",
        "Compartimos y jugamos los juegos.",
      ),
      ejercicios: [
        {
          titulo: "Reaparece",
          descripcion: "Que el objeto reaparezca en otro lugar al recogerlo.",
        },
        {
          titulo: "¡Peligro!",
          descripcion: "Agrega un enemigo que quita una vida al tocarte.",
        },
        {
          titulo: "Marcador",
          descripcion: "Muestra los puntos y las vidas en pantalla.",
        },
      ],
      retos: [
        {
          titulo: "Reaparición",
          nivel: "intermedio",
          consigna:
            "Que cada objeto recogido aparezca en una posición nueva al azar.",
        },
        {
          titulo: "Enemigo peligroso",
          nivel: "avanzado",
          consigna:
            "Que tocar al enemigo reste una vida (sin perderlas todas de golpe).",
        },
        {
          titulo: "Sube la dificultad",
          nivel: "avanzado",
          consigna:
            "Haz que el enemigo se mueva más rápido a medida que ganas puntos.",
        },
      ],
      cierre: {
        titulo: "Misión: Mi juego de recolección",
        descripcion:
          "Crea un juego donde recoges objetos para sumar puntos mientras esquivas a un enemigo.",
      },
      evaluacion: [
        "Los objetos reaparecen al recogerse.",
        "El enemigo quita vidas.",
        "Muestra puntos y vidas.",
      ],
      recomendaciones: [
        "El truco «ir a posición al azar» da rejugabilidad: enséñalo.",
        "Cuida que tocar al enemigo no quite todas las vidas de un golpe (usa una espera).",
      ],
      recompensa: "+65 XP · Logro 'Mecánico de juegos'",
    },
    {
      numero: 3,
      titulo: "Retos de juego",
      tipo: "retos",
      nivel: "avanzado",
      objetivo:
        "Agregar condiciones de victoria y derrota y pulir las reglas del juego.",
      conceptos: [
        "Ganar al llegar a una meta de puntos",
        "Perder al quedarse sin vidas",
        "Pantallas de «¡Ganaste!» y «Fin del juego»",
      ],
      agenda: agendaRetos(
        "Calentamiento: jugamos un juego sin final... ¡aburre! ¿Por qué hace falta ganar o perder?",
        "Truco del día: «si puntos = 10 → enviar mensaje ganar» para terminar el juego.",
        "Retos por niveles: victoria, derrota, niveles, bonus.",
        "Galería: probamos los juegos y damos ideas.",
      ),
      ejercicios: [
        {
          titulo: "¡Ganaste!",
          descripcion: "Al llegar a 10 puntos, muestra el mensaje «¡Ganaste!».",
        },
        {
          titulo: "Fin del juego",
          descripcion: "Al quedarte sin vidas, muestra «Fin del juego».",
        },
        {
          titulo: "Punto final",
          descripcion: "Detén el juego cuando termina (al ganar o al perder).",
        },
      ],
      retos: [
        {
          titulo: "Pantalla de victoria",
          nivel: "avanzado",
          consigna: "Al ganar, muestra un fondo de «¡Ganaste!» y detén todo.",
        },
        {
          titulo: "Pantalla de derrota",
          nivel: "avanzado",
          consigna: "Al perder, muestra «Fin del juego» con el puntaje.",
        },
        {
          titulo: "Segundo nivel",
          nivel: "avanzado",
          consigna:
            "Al ganar el primer nivel, cambia de fondo y haz el juego más difícil.",
        },
        {
          titulo: "Reiniciar",
          nivel: "intermedio",
          consigna: "Agrega un botón o tecla para volver a empezar el juego.",
        },
      ],
      cierre: {
        titulo: "Misión: Juego con final",
        descripcion:
          "Mejora tu juego para que tenga condición de victoria y de derrota, con sus pantallas.",
      },
      evaluacion: [
        "Tiene condición de victoria.",
        "Tiene condición de derrota.",
        "Muestra pantallas y detiene el juego al terminar.",
      ],
      recomendaciones: [
        "Jugar un juego «sin final» les hace sentir por qué importan las condiciones.",
        "Los mensajes («ganar», «perder») mantienen el código ordenado.",
      ],
      recompensa: "+75 XP · Trofeo 'Reglas de oro'",
    },
    {
      numero: 4,
      titulo: "Gran Misión: Juego de Recolección",
      tipo: "mision",
      nivel: "avanzado",
      objetivo:
        "Crear y presentar un videojuego completo de recolección con todas sus reglas.",
      conceptos: [
        "Integrar héroe, enemigos, puntos, vidas y final",
        "Un juego jugable de principio a fin",
        "Equilibrar la dificultad",
      ],
      agenda: agendaMision(
        "En papel: diseña tu juego (héroe, qué recoges, enemigos, cómo se gana y se pierde).",
        "Constrúyelo: junta todo lo aprendido en un juego completo y jugable.",
        "Pruébalo con un compañero y ajusta la dificultad y las reglas.",
        "¡Feria de videojuegos! Presentamos y jugamos los juegos.",
      ),
      ejercicios: [
        {
          titulo: "Arma el juego",
          descripcion:
            "Junta el héroe, los objetos y los enemigos en el escenario.",
        },
        {
          titulo: "Reglas claras",
          descripcion: "Agrega puntos, vidas y condiciones de ganar/perder.",
        },
        {
          titulo: "Cómo jugar",
          descripcion: "Pon un mensaje de inicio que explique el objetivo.",
        },
      ],
      retos: [
        {
          titulo: "Juego completo",
          nivel: "avanzado",
          consigna: "Tu juego tiene objetivo, puntos, vidas, enemigos y final.",
        },
        {
          titulo: "Bien explicado",
          nivel: "intermedio",
          consigna:
            "Al empezar, el juego explica cómo se juega y cómo se gana.",
        },
        {
          titulo: "Toque personal",
          nivel: "avanzado",
          consigna:
            "Agrega una idea original que haga tu juego diferente a los demás.",
        },
      ],
      cierre: {
        titulo: "Proyecto: Juego de Recolección",
        descripcion:
          "Un videojuego completo y jugable: recoges objetos, esquivas enemigos, llevas puntos y vidas, y se puede ganar o perder. ¡A la feria de juegos!",
      },
      evaluacion: [
        "El juego es jugable de principio a fin.",
        "Tiene objetivo, puntos, vidas, enemigos y final.",
        "Está equilibrado (ni imposible ni demasiado fácil).",
      ],
      recomendaciones: [
        "La feria de videojuegos es un cierre potente: invita a otras clases si puedes.",
        "Valora el equilibrio del juego, no solo que «funcione».",
      ],
      recompensa: "+100 XP · 🎮 Insignia 'Creador de Juegos' desbloqueada",
    },
  ],
};

const periodo9: PeriodoContenido = {
  numero: 9,
  titulo: "Diseño de Videojuegos",
  descripcion:
    "Pensamos como creadores de videojuegos: planeamos, diseñamos personajes y niveles, y mejoramos la experiencia.",
  proyecto: "Mi Primer Videojuego Original",
  insignia: { emoji: "🎨", nombre: "Diseñador de Mundos" },
  xp: 320,
  sesiones: [
    {
      numero: 1,
      titulo: "Pienso mi videojuego",
      tipo: "introduccion",
      nivel: "intermedio",
      objetivo:
        "Planear un videojuego propio: idea, objetivo, personajes y reglas.",
      conceptos: [
        "Planear antes de programar",
        "La idea, el objetivo y la diversión",
        "Personajes principales y reglas en papel",
      ],
      agenda: agendaDescubre(
        "Lluvia de ideas: cada quien dice una idea loca de videojuego. ¡Todo vale!",
        "Vemos cómo los creadores planean en papel antes de programar (ficha del juego).",
        "Construimos juntos la «ficha de mi juego»: nombre, objetivo, héroe, enemigos y reglas.",
        "Mini retos: dibujar al héroe y un enemigo de tu juego.",
        "Compartimos las ideas de juego.",
      ),
      ejercicios: [
        {
          titulo: "La idea",
          descripcion: "Escribe el nombre y el objetivo de tu juego.",
        },
        {
          titulo: "Héroe y villano",
          descripcion: "Dibuja a tu héroe y a un enemigo.",
        },
        {
          titulo: "Dos reglas",
          descripcion: "Escribe 2 reglas: qué suma puntos y cómo se gana.",
        },
      ],
      retos: [
        {
          titulo: "Ficha completa",
          nivel: "intermedio",
          consigna:
            "Completa la ficha: nombre, objetivo, héroe, enemigos y reglas.",
        },
        {
          titulo: "¿Por qué es divertido?",
          nivel: "intermedio",
          consigna: "Escribe en una frase por qué tu juego será divertido.",
        },
        {
          titulo: "Versión mínima",
          nivel: "avanzado",
          consigna: "Marca qué es lo más importante para tener listo primero.",
        },
      ],
      cierre: {
        titulo: "Misión: La ficha de mi juego",
        descripcion:
          "Entrega la ficha de tu videojuego original: idea, objetivo, personajes, reglas y por qué es divertido.",
      },
      evaluacion: [
        "Tiene una idea clara con objetivo.",
        "Define héroe, enemigos y reglas.",
        "Explica por qué será divertido.",
      ],
      recomendaciones: [
        "Planear en papel es la gran meta del periodo: dale valor aunque no toquen el computador.",
        "Ayúdalos a achicar ideas gigantes a algo posible de hacer.",
      ],
      recompensa: "+60 XP · Logro 'Mente creadora'",
    },
    {
      numero: 2,
      titulo: "Diseño personajes y niveles",
      tipo: "practica",
      nivel: "avanzado",
      objetivo:
        "Crear y editar disfraces de personajes y diseñar el fondo de los niveles.",
      conceptos: [
        "El editor de disfraces (crear y modificar personajes)",
        "Diseñar fondos para distintos niveles",
        "Que el aspecto cuente la historia del juego",
      ],
      agenda: agendaConstruye(
        "Recordamos nuestra ficha de juego.",
        "El profe muestra el editor de disfraces y cómo dibujar/editar personajes y fondos.",
        "Construimos paso a paso: diseña a tu héroe (disfraz) y el fondo de tu primer nivel.",
        "Personalízalo: dale tu estilo a personajes y niveles.",
        "Compartimos los diseños.",
      ),
      ejercicios: [
        {
          titulo: "Héroe con estilo",
          descripcion: "Edita el disfraz de tu héroe a tu gusto.",
        },
        {
          titulo: "El escenario",
          descripcion: "Diseña o elige el fondo de tu primer nivel.",
        },
        {
          titulo: "Disfraz extra",
          descripcion: "Crea un disfraz más (por ejemplo, el héroe «dañado»).",
        },
      ],
      retos: [
        {
          titulo: "Héroe con estilo",
          nivel: "avanzado",
          consigna:
            "Diseña a tu héroe con al menos dos disfraces (normal y especial).",
        },
        {
          titulo: "Nivel con ambiente",
          nivel: "intermedio",
          consigna: "Crea un fondo que muestre dónde ocurre tu juego.",
        },
        {
          titulo: "Segundo nivel",
          nivel: "avanzado",
          consigna: "Diseña un segundo fondo distinto para otro nivel.",
        },
      ],
      cierre: {
        titulo: "Misión: El look de mi juego",
        descripcion:
          "Diseña a tu héroe (con disfraces) y al menos un nivel con su fondo, acorde a tu idea.",
      },
      evaluacion: [
        "Crea o edita disfraces del héroe.",
        "Diseña el fondo de un nivel.",
        "El aspecto encaja con la idea del juego.",
      ],
      recomendaciones: [
        "El editor de dibujo encanta; deja que se expresen artísticamente.",
        "Recuérdales que un buen aspecto hace el juego más atractivo, pero la idea manda.",
      ],
      recompensa: "+70 XP · Logro 'Artista de juegos'",
    },
    {
      numero: 3,
      titulo: "Retos de mecánicas",
      tipo: "retos",
      nivel: "avanzado",
      objetivo:
        "Inventar y programar mecánicas que hagan el juego más divertido.",
      conceptos: [
        "Mecánicas (poderes, niveles, power-ups)",
        "Probar y mejorar (playtesting)",
        "Equilibrio: ni muy fácil ni imposible",
      ],
      agenda: agendaRetos(
        "Calentamiento: ¿qué mecánica «mágica» le pondrías a tu juego favorito?",
        "Truco del día: un power-up que te da un poder temporal (más velocidad, escudo).",
        "Retos por niveles: power-ups, niveles que cambian, jefes finales.",
        "Galería: probamos las mecánicas de los compañeros y damos ideas.",
      ),
      ejercicios: [
        {
          titulo: "Power-up",
          descripcion: "Agrega un objeto que te dé un poder al recogerlo.",
        },
        {
          titulo: "Sube de nivel",
          descripcion: "Haz que el juego cambie al pasar de nivel.",
        },
        {
          titulo: "Prueba y anota",
          descripcion: "Juega tu propio juego y anota qué puedes mejorar.",
        },
      ],
      retos: [
        {
          titulo: "Power-up",
          nivel: "avanzado",
          consigna:
            "Un objeto que al recogerlo te da más velocidad por unos segundos.",
        },
        {
          titulo: "Cambio de nivel",
          nivel: "avanzado",
          consigna: "Al cumplir un objetivo, cambia el fondo y la dificultad.",
        },
        {
          titulo: "Jefe final",
          nivel: "avanzado",
          consigna: "Agrega un enemigo «jefe» más difícil al final.",
        },
        {
          titulo: "Mejora tras probar",
          nivel: "intermedio",
          consigna:
            "Pide a un compañero que juegue y mejora algo según lo que diga.",
        },
      ],
      cierre: {
        titulo: "Misión: Mi mecánica especial",
        descripcion:
          "Agrega a tu juego una mecánica original (power-up, nivel o jefe) y mejórala probándola.",
      },
      evaluacion: [
        "Programa una mecánica nueva que funciona.",
        "Prueba el juego y lo ajusta.",
        "La mecánica hace el juego más divertido.",
      ],
      recomendaciones: [
        "El playtesting (probar con otros) es clave: enséñales a escuchar al jugador.",
        "Celebra las mecánicas originales aunque sean simples.",
      ],
      recompensa: "+80 XP · Trofeo 'Inventor de mecánicas'",
    },
    {
      numero: 4,
      titulo: "Gran Misión: Mi Primer Videojuego Original",
      tipo: "mision",
      nivel: "avanzado",
      objetivo:
        "Crear y presentar un videojuego original propio, basado en la ficha planeada.",
      conceptos: [
        "Integrar diseño, mecánicas y reglas propias",
        "Un juego original de principio a fin",
        "Presentar como un creador",
      ],
      agenda: agendaMision(
        "Revisa tu ficha y decide qué tendrá listo tu juego hoy.",
        "Constrúyelo: héroe, niveles, enemigos, puntos, una mecánica especial y un final.",
        "Pruébalo con compañeros y haz mejoras según lo que digan.",
        "¡Estudio de juegos! Presenta tu videojuego original y explica tus ideas.",
      ),
      ejercicios: [
        {
          titulo: "Héroe y nivel",
          descripcion: "Programa tu héroe y su primer nivel.",
        },
        {
          titulo: "Tus reglas",
          descripcion: "Agrega reglas, puntos y una mecánica especial.",
        },
        {
          titulo: "Inicio y final",
          descripcion: "Pon un inicio que explique el juego y un final.",
        },
      ],
      retos: [
        {
          titulo: "Juego original",
          nivel: "avanzado",
          consigna:
            "Tu juego tiene una idea propia, no es una copia del de clase.",
        },
        {
          titulo: "Experiencia cuidada",
          nivel: "avanzado",
          consigna: "Inicio claro, juego equilibrado y final con puntaje.",
        },
        {
          titulo: "Detrás del juego",
          nivel: "intermedio",
          consigna: "Prepara una mini explicación de qué quisiste lograr.",
        },
      ],
      cierre: {
        titulo: "Proyecto: Mi Primer Videojuego Original",
        descripcion:
          "Tu videojuego original, diseñado por ti: héroe, niveles, mecánicas y reglas propias, jugable de principio a fin. ¡Preséntalo como creador!",
      },
      evaluacion: [
        "El juego es original y propio.",
        "Aplica diseño, mecánicas y reglas.",
        "Lo presenta y explica sus decisiones.",
      ],
      recomendaciones: [
        "Resalta que ahora son CREADORES, no solo jugadores.",
        "Haz una presentación tipo «estudio de juegos»: sube la autoestima.",
      ],
      recompensa: "+110 XP · 🎨 Insignia 'Diseñador de Mundos' desbloqueada",
    },
  ],
};

const periodo10: PeriodoContenido = {
  numero: 10,
  titulo: "Gran Proyecto Final",
  descripcion:
    "Diseñamos, construimos y presentamos un proyecto propio: nuestro mejor videojuego o historia interactiva.",
  proyecto: "Mi Videojuego o Historia Interactiva",
  insignia: { emoji: "🏆", nombre: "Gran Creador LuckSoft" },
  xp: 400,
  sesiones: [
    {
      numero: 1,
      titulo: "Planeación",
      tipo: "introduccion",
      nivel: "avanzado",
      objetivo:
        "Elegir el proyecto final (juego o historia) y planearlo completo en papel.",
      conceptos: [
        "Elegir entre videojuego o historia interactiva",
        "Planear personajes, niveles/escenas y reglas",
        "Definir lo mínimo para tenerlo terminado",
      ],
      agenda: agendaDescubre(
        "Recordamos todo lo aprendido: ¿qué sabemos hacer ya en Scratch? Hacemos una lista.",
        "Vemos ejemplos de proyectos grandes y cómo se planean.",
        "Construimos el plan: cada quien elige juego o historia y llena su ficha completa.",
        "Mini retos: dibujar la pantalla principal y la lista de cosas a programar.",
        "Compartimos los planes.",
      ),
      ejercicios: [
        {
          titulo: "Juego o historia",
          descripcion:
            "Decide si harás un videojuego o una historia interactiva.",
        },
        {
          titulo: "Lo importante",
          descripcion: "Escribe el objetivo y los personajes principales.",
        },
        {
          titulo: "Lista de tareas",
          descripcion: "Haz una lista de lo que necesitas programar.",
        },
      ],
      retos: [
        {
          titulo: "Plan maestro",
          nivel: "avanzado",
          consigna:
            "Entrega una ficha completa con idea, personajes, escenas/niveles y reglas.",
        },
        {
          titulo: "Versión mínima",
          nivel: "avanzado",
          consigna:
            "Marca qué es lo esencial para terminar y qué sería un «extra».",
        },
        {
          titulo: "Boceto de pantalla",
          nivel: "intermedio",
          consigna: "Dibuja cómo se verá la pantalla principal de tu proyecto.",
        },
      ],
      cierre: {
        titulo: "Misión: Mi plan final",
        descripcion:
          "Entrega el plan completo de tu proyecto final, con su versión mínima bien definida.",
      },
      evaluacion: [
        "El proyecto tiene idea y objetivo claros.",
        "El plan lista personajes, escenas/niveles y reglas.",
        "El alcance es realista para el tiempo.",
      ],
      recomendaciones: [
        "Ayuda a ajustar el tamaño: mejor algo pequeño y terminado que algo enorme a medias.",
        "Que elijan lo que les apasione: es SU proyecto.",
      ],
      recompensa: "+80 XP · Logro 'Gran planificador'",
    },
    {
      numero: 2,
      titulo: "Construcción",
      tipo: "practica",
      nivel: "avanzado",
      objetivo: "Programar la versión mínima del proyecto siguiendo el plan.",
      conceptos: [
        "Construir por partes",
        "Probar mientras se construye",
        "Pedir ayuda cuando uno se atasca",
      ],
      agenda: agendaConstruye(
        "Revisamos el plan y elegimos por dónde empezar.",
        "El profe recuerda el método: construye una parte, pruébala y pasa a la siguiente.",
        "Tiempo de construcción acompañada: cada quien arma su versión mínima.",
        "Personalízalo: ve añadiendo tu estilo a personajes y escenas.",
        "Punto de control: ¿qué parte ya funciona?",
      ),
      ejercicios: [
        {
          titulo: "Lo principal",
          descripcion: "Programa la parte más importante de tu proyecto.",
        },
        {
          titulo: "Prueba ya",
          descripcion: "Pruébala y corrige los errores antes de seguir.",
        },
        {
          titulo: "Guarda",
          descripcion: "Guarda tu avance para no perderlo.",
        },
      ],
      retos: [
        {
          titulo: "Primera parte lista",
          nivel: "avanzado",
          consigna: "Logra que lo más importante de tu proyecto ya funcione.",
        },
        {
          titulo: "Probar temprano",
          nivel: "avanzado",
          consigna:
            "Prueba cada parte apenas la termines y arregla los errores.",
        },
        {
          titulo: "Pedir ayuda bien",
          nivel: "intermedio",
          consigna:
            "Cuando te atasques, explica el problema en una frase antes de pedir ayuda.",
        },
      ],
      cierre: {
        titulo: "Misión: Versión jugable",
        descripcion:
          "Deja tu proyecto en una versión mínima que ya se pueda usar o jugar de principio a fin.",
      },
      evaluacion: [
        "Avanza siguiendo su plan.",
        "Prueba a medida que construye.",
        "Tiene una versión mínima funcionando.",
      ],
      recomendaciones: [
        "Refuerza «construye un poco, prueba un poco»: evita el proyecto gigante sin probar.",
        "Celebra cada parte que empieza a funcionar: mantiene la energía.",
      ],
      recompensa: "+90 XP · Logro 'En construcción'",
    },
    {
      numero: 3,
      titulo: "Pruebas y mejoras",
      tipo: "retos",
      nivel: "avanzado",
      objetivo:
        "Probar el proyecto con compañeros, corregir errores y pulir detalles.",
      conceptos: [
        "Playtesting: que otros lo prueben",
        "Encontrar y arreglar errores",
        "Pulir: sonidos, instrucciones, detalles",
      ],
      agenda: agendaRetos(
        "Calentamiento: ¿cómo «rompemos» un proyecto para encontrar fallos? Lluvia de ideas.",
        "Truco del día: pedir a alguien que juegue tu proyecto y mirar qué le cuesta.",
        "Tiempo de pruebas cruzadas: cada quien prueba el proyecto de otro y deja sugerencias.",
        "Galería: aplicamos mejoras según lo aprendido.",
      ),
      ejercicios: [
        {
          titulo: "Jugador invitado",
          descripcion: "Pide a un compañero que pruebe tu proyecto.",
        },
        {
          titulo: "Lista de mejoras",
          descripcion: "Anota 3 cosas que puedes mejorar.",
        },
        {
          titulo: "Cazabugs",
          descripcion: "Arregla al menos un error que hayas encontrado.",
        },
      ],
      retos: [
        {
          titulo: "Cazador de errores",
          nivel: "avanzado",
          consigna:
            "Encuentra y arregla al menos dos problemas en tu proyecto.",
        },
        {
          titulo: "Instrucciones claras",
          nivel: "intermedio",
          consigna:
            "Agrega una pantalla o mensaje que explique cómo se usa tu proyecto.",
        },
        {
          titulo: "Toque final",
          nivel: "avanzado",
          consigna:
            "Añade un detalle que mejore la experiencia (sonido, efecto, mensaje).",
        },
      ],
      cierre: {
        titulo: "Misión: Versión pulida",
        descripcion:
          "Deja tu proyecto probado, sin errores conocidos y con instrucciones claras.",
      },
      evaluacion: [
        "Prueba el proyecto con otra persona.",
        "Corrige los errores encontrados.",
        "Pule detalles de la experiencia.",
      ],
      recomendaciones: [
        "Las pruebas cruzadas encuentran fallos que el autor no ve: son oro.",
        "Enséñales que «sin errores conocidos» es una meta de calidad, no perfección.",
      ],
      recompensa: "+100 XP · Trofeo 'Pulidor experto'",
    },
    {
      numero: 4,
      titulo: "Gran Misión: Presentación Final",
      tipo: "mision",
      nivel: "avanzado",
      objetivo:
        "Presentar el proyecto final a la clase: mostrarlo, explicarlo y celebrarlo.",
      conceptos: [
        "Presentar y demostrar tu creación",
        "Explicar tus ideas y lo que aprendiste",
        "Dar y recibir comentarios positivos",
      ],
      agenda: agendaMision(
        "Prepara tu presentación: qué mostrar y qué contar en 2 minutos.",
        "Últimos ajustes y prueba final del proyecto antes de presentar.",
        "Demostración en vivo de cada proyecto ante la clase.",
        "¡Gran cierre! Comentarios positivos y entrega de la insignia final.",
      ),
      ejercicios: [
        {
          titulo: "Tu demo",
          descripcion: "Prepara una demostración corta de tu proyecto.",
        },
        {
          titulo: "Tu historia",
          descripcion: "Explica qué parte te costó más y cómo la resolviste.",
        },
        {
          titulo: "Próxima versión",
          descripcion: "Anota una mejora futura para tu proyecto.",
        },
      ],
      retos: [
        {
          titulo: "Demo impecable",
          nivel: "avanzado",
          consigna: "Presenta tu proyecto funcionando de principio a fin.",
        },
        {
          titulo: "Cuenta tu proceso",
          nivel: "avanzado",
          consigna:
            "Explica tu idea, lo que aprendiste y lo que más te gustó hacer.",
        },
        {
          titulo: "Próxima versión",
          nivel: "intermedio",
          consigna: "Propón 2 mejoras que harías si tuvieras más tiempo.",
        },
      ],
      cierre: {
        titulo: "Proyecto: Mi Videojuego o Historia Interactiva",
        descripcion:
          "Tu mejor proyecto: planeado, construido, probado y presentado a la clase. ¡Es tu obra como creador de Scratch!",
      },
      evaluacion: [
        "El proyecto funciona de principio a fin.",
        "Aplica lo aprendido en todo el curso.",
        "Presenta y explica su trabajo con claridad.",
      ],
      recomendaciones: [
        "Haz de la presentación una celebración, no un examen: refuerza la confianza.",
        "Destaca el progreso de cada niño desde el periodo 1: cierra el viaje con orgullo.",
      ],
      recompensa: "+150 XP · 🏆 Insignia 'Gran Creador LuckSoft' desbloqueada",
    },
  ],
};

/** Currículo completo del curso de Scratch (10 periodos × 4 sesiones). */
export const scratchCurriculum: Curriculum = [
  periodo1,
  periodo2,
  periodo3,
  periodo4,
  periodo5,
  periodo6,
  periodo7,
  periodo8,
  periodo9,
  periodo10,
];
