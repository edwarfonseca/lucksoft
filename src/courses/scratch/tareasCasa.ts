import type { TareaCasa } from "@/domain/models/curriculum";

/**
 * Tareas para la casa del curso de Scratch, una por sesión (clave
 * `p<periodo>s<sesion>`). Son actividades de práctica en el editor de Scratch
 * pensadas para niños, sin ayuda del docente (~20-30 min). El proyecto se
 * entrega desde el editor como siempre (botón Entregar).
 */
export const tareasCasa: Record<string, TareaCasa> = {
  // Periodo 1 — Descubriendo Scratch
  p1s1: {
    titulo: "Presenta a tu gato",
    descripcion:
      "Haz que el gato de Scratch se mueva 10 pasos y diga tu nombre y tu edad con dos bloques «decir». Recuerda empezar con el bloque de la bandera verde 🟩. Muéstraselo a alguien de tu casa.",
  },
  p1s2: {
    titulo: "Un nuevo amigo",
    descripcion:
      "Elige un sprite nuevo de la biblioteca y un fondo que le quede bien. Haz que se presente con 3 mensajes «decir» seguidos: su nombre, qué le gusta y un saludo para tu familia.",
  },
  p1s3: {
    titulo: "El show de trucos en casa",
    descripcion:
      "Agrégale 2 trucos nuevos a tu personaje: uno con «cambiar efecto color» y otro con «esconder» y «mostrar». Haz que cada truco se active al hacer clic en el sprite y presenta tu show en casa.",
  },
  p1s4: {
    titulo: "El personaje de tu familia",
    descripcion:
      "Crea una escena nueva donde tu personaje favorito presenta a alguien de tu casa: que se mueva, diga su nombre y cuente algo gracioso de esa persona (¡con cariño!). Enséñasela a la persona presentada.",
  },

  // Periodo 2 — Secuencias y Animaciones
  p2s1: {
    titulo: "Saludo con pausas",
    descripcion:
      "Crea un diálogo de 4 mensajes «decir» con bloques «esperar 1 segundo» entre ellos, para que se puedan leer con calma. Prueba qué pasa si quitas las esperas y vuelve a ponerlas: ¡el orden y el tiempo importan!",
  },
  p2s2: {
    titulo: "Anima tu animal favorito",
    descripcion:
      "Elige un sprite que tenga varios disfraces (o un animal que te guste) y anímalo: usa «repetir» con «cambiar al siguiente disfraz» y una espera corta para que parezca que camina o vuela de verdad.",
  },
  p2s3: {
    titulo: "Mini escena viajera",
    descripcion:
      "Haz que tu personaje visite 3 lugares del escenario usando «deslizar en 1 segundo a x, y», y que en cada lugar diga algo distinto. Como si fuera un tour por su mundo.",
  },
  p2s4: {
    titulo: "La segunda escena",
    descripcion:
      "Agrégale a tu historia animada una escena más: puede ser un final alternativo o qué pasó después. Usa cambio de fondo, diálogos con esperas y los dos personajes. Estrénala en casa.",
  },

  // Periodo 3 — Coordenadas y Movimiento
  p3s1: {
    titulo: "Las 4 esquinas",
    descripcion:
      "Manda a tu sprite a las 4 esquinas del escenario con bloques «ir a x… y…» y una espera en cada esquina. Pista: las esquinas tienen números grandes como x: 200 y: 150 (con sus negativos). Termina en el centro (0, 0).",
  },
  p3s2: {
    titulo: "Control total",
    descripcion:
      "A tu personaje teledirigido agrégale 2 teclas nuevas: por ejemplo, que con la tecla espacio salte (sube y baja en Y) y con la G diga algo. Ya controlas 6 teclas: ¡como un videojuego de verdad!",
  },
  p3s3: {
    titulo: "El guardián del borde",
    descripcion:
      "Crea un personaje que patrulle solo de lado a lado: «por siempre» + «mover 10 pasos» + «si toca un borde, rebotar». Ajusta el estilo de rotación para que no quede patas arriba al voltear.",
  },
  p3s4: {
    titulo: "Pista nueva para la carrera",
    descripcion:
      "Diseña un fondo nuevo para tu carrera (más largo o con curvas dibujadas) y pruébala completa con alguien de tu casa: cada uno con sus teclas. Anota quién ganó más veces.",
  },

  // Periodo 4 — Decisiones y Condiciones
  p4s1: {
    titulo: "Reacción sorpresa",
    descripcion:
      "Programa a tu personaje para que reaccione: con «por siempre» + «si ¿tocando el puntero del ratón? entonces», haz que diga algo gracioso o cambie de color cuando lo toques con el mouse. ¡Persíguelo!",
  },
  p4s2: {
    titulo: "Laberinto hecho en casa",
    descripcion:
      "Dibuja un laberinto nuevo con paredes de OTRO color al de la clase y programa a tu personaje: si toca ese color, vuelve al inicio. Ponle una meta de color distinto que diga «¡Ganaste!» al llegar.",
  },
  p4s3: {
    titulo: "Amigo o enemigo",
    descripcion:
      "Pon 2 sprites en el escenario: uno bueno y uno malo. Con «si ¿tocando (sprite)?», haz que al tocar al bueno tu personaje sonría y diga algo amable, y al tocar al malo se asuste y huya a otra posición.",
  },
  p4s4: {
    titulo: "Nivel 2 del laberinto",
    descripcion:
      "Crea el nivel 2 de tu laberinto: más difícil, con caminos más angostos o una trampa nueva. Cuando alguien llegue a la meta del nivel 1, que cambie el fondo al nivel 2. Haz que alguien de tu casa lo juegue.",
  },

  // Periodo 5 — Repeticiones y Patrones
  p5s1: {
    titulo: "La patrulla infinita",
    descripcion:
      "Crea un personaje que se mueva solo para siempre: «por siempre» + mover + rebotar en los bordes, y que ADEMÁS cambie de disfraz mientras camina. Dos cosas repitiéndose a la vez, ¡como magia!",
  },
  p5s2: {
    titulo: "Mi coreografía",
    descripcion:
      "Inventa un baile de 8 pasos usando «repetir»: giros, movimientos y cambios de disfraz. Ponle un «repetir 4» al baile completo para que se repita como una coreografía de verdad.",
  },
  p5s3: {
    titulo: "Mandala mágico",
    descripcion:
      "Usa el lápiz para dibujar un patrón: baja el lápiz y con «repetir» haz que tu sprite avance y gire (prueba girar 36 grados 10 veces). Agrega «cambiar color del lápiz» en cada vuelta para un mandala de colores.",
  },
  p5s4: {
    titulo: "El robot estrena paso",
    descripcion:
      "Agrégale a tu Robot Bailarín un paso de baile nuevo y música de fondo. Decora el escenario para el espectáculo y estrénalo frente a tu familia. Bonus: que el robot salude al público al final.",
  },

  // Periodo 6 — Variables y Puntuaciones
  p6s1: {
    titulo: "Contador de aplausos",
    descripcion:
      "Crea una variable «aplausos» y haz que sume 1 cada vez que hagas clic en tu sprite, que debe reaccionar con un sonido o gesto. Empieza en 0 con la bandera verde. ¿Cuántos aplausos le da tu familia?",
  },
  p6s2: {
    titulo: "La tercera vida",
    descripcion:
      "Mejora tu juego con vidas: haz que cuando pierdas una vida el personaje diga algo distinto según cuántas queden (¡usa «si vidas = 2», «si vidas = 1»!) y que con 0 vidas aparezca el fin del juego.",
  },
  p6s3: {
    titulo: "Contra el reloj",
    descripcion:
      "Agrégale a un juego tuyo una cuenta regresiva de 30 segundos con una variable «tiempo»: cada segundo baja 1 y al llegar a 0 se acaba el juego mostrando los puntos logrados. Reta a tu familia a superar tu marca.",
  },
  p6s4: {
    titulo: "El récord familiar",
    descripcion:
      "Organiza un torneo de «Atrapa los Objetos» en tu casa: crea una variable «récord» que guarde el mejor puntaje (si puntos > récord, fijar récord a puntos). Anota quién es el campeón de tu casa.",
  },

  // Periodo 7 — Sonidos y Multimedia
  p7s1: {
    titulo: "Timbres locos",
    descripcion:
      "Crea un tablero de sonidos: elige 4 sonidos divertidos de la biblioteca y haz que cada uno suene con una tecla distinta (1, 2, 3 y 4). Escribe en el escenario qué tecla toca qué sonido.",
  },
  p7s2: {
    titulo: "Ambienta tu escena",
    descripcion:
      "Toma un proyecto tuyo anterior y ambiéntalo: agrégale música de fondo en bucle (repetir «tocar sonido hasta que termine») y 2 efectos visuales, como «efecto fantasma» al aparecer un personaje.",
  },
  p7s3: {
    titulo: "El dúo sincronizado",
    descripcion:
      "Haz que 2 sprites actúen coordinados con mensajes: cuando el primero termine de moverse, que envíe un mensaje y el segundo salte y suene un aplauso «al recibir» el mensaje. ¡Como un dúo de circo!",
  },
  p7s4: {
    titulo: "Función de gala",
    descripcion:
      "Agrégale un número nuevo a tu Concierto Interactivo: otro instrumento, luces (efectos de color al fondo) o un cantante invitado. Presenta la función de gala completa a tu familia como público.",
  },

  // Periodo 8 — Videojuegos Básicos
  p8s1: {
    titulo: "La ficha de mi juego",
    descripcion:
      "Completa la ficha de un videojuego que te inventes: escribe (en papel o en bloques «decir» de un presentador) el objetivo del juego, quién es el héroe, quién el enemigo y 3 reglas. Pregúntale a tu familia si suena divertido.",
  },
  p8s2: {
    titulo: "El objeto dorado",
    descripcion:
      "Agrégale a tu juego de recolección un objeto especial dorado que valga 5 puntos (los normales valen 1) y que aparezca en posiciones al azar con «ir a posición aleatoria». ¡Que no sea tan fácil de atrapar!",
  },
  p8s3: {
    titulo: "Final feliz (y triste)",
    descripcion:
      "Ponle finales a tu juego: una pantalla de «¡GANASTE! 🏆» con un sonido alegre al llegar a 10 puntos, y una de «Fin del juego 😢» con otro sonido al quedarte sin vidas. Usa cambios de fondo para las pantallas.",
  },
  p8s4: {
    titulo: "Nivel pro",
    descripcion:
      "Crea la versión PRO de tu Juego de Recolección: más velocidad, más enemigos o menos tiempo. Ponle nombre oficial a tu juego, escríbelo en el fondo, y haz que alguien de tu casa pruebe los dos niveles.",
  },

  // Periodo 9 — Diseño de Videojuegos
  p9s1: {
    titulo: "La ficha completa",
    descripcion:
      "Termina la ficha de tu videojuego original: idea, objetivo, personajes, reglas y por qué será divertido. Preséntasela a tu familia como si fueras un creador de videojuegos y anota UNA idea que te sugieran.",
  },
  p9s2: {
    titulo: "El vestuario de mi juego",
    descripcion:
      "Usa el editor de disfraces para crear o modificar un disfraz propio para tu héroe (aunque sea cambiarle los colores y un accesorio) y diseña el fondo de uno de tus niveles. ¡Que tu juego se vea único!",
  },
  p9s3: {
    titulo: "El poder secreto",
    descripcion:
      "Inventa y programa un power-up para tu juego: un objeto que al tocarlo dé un poder por unos segundos (más velocidad, puntos dobles o un escudo). Pista: usa una variable para saber si el poder está activo.",
  },
  p9s4: {
    titulo: "Prueba de jugadores",
    descripcion:
      "Haz que alguien de tu casa juegue tu videojuego original SIN que le expliques nada. Observa dónde se confunde, pregúntale qué le pareció, y mejora UNA cosa de tu juego con lo que aprendiste.",
  },

  // Periodo 10 — Gran Proyecto Final
  p10s1: {
    titulo: "Mi plan terminado",
    descripcion:
      "Completa el plan de tu proyecto final: personajes, escenas o niveles, reglas y qué es lo MÍNIMO que debe tener para estar terminado. Cuéntale el plan a tu familia: explicarlo en voz alta ayuda a encontrar huecos.",
  },
  p10s2: {
    titulo: "Sesión de construcción",
    descripcion:
      "Avanza tu proyecto final en casa: construye una parte del plan (una escena, un nivel o una mecánica) y pruébala varias veces. Si algo no te sale, anótalo para preguntarlo en la próxima clase.",
  },
  p10s3: {
    titulo: "Caza-errores en familia",
    descripcion:
      "Sesión de playtesting en casa: que un familiar pruebe tu proyecto e intente hacer cosas raras. Anota los errores o confusiones que aparezcan y arregla al menos uno antes de la próxima clase.",
  },
  p10s4: {
    titulo: "Ensayo de la gran presentación",
    descripcion:
      "Ensaya tu presentación final frente a tu familia: muestra tu proyecto, explica cómo lo hiciste y qué fue lo que más aprendiste. Practica 2 veces: la segunda siempre sale mejor. ¡Nos vemos en el estreno! 🎬",
  },
};
