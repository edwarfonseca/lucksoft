import type {
  BloqueAgenda,
  Curriculum,
  PeriodoContenido,
} from "@/domain/models/curriculum";

/*
 * Currículo gamificado del curso de Diseño Web: 10 periodos × 4 sesiones de 90
 * min. Estructura fija de cada periodo:
 *   S1 introducción · S2 práctica guiada · S3 retos · S4 misión final (proyecto).
 * Metodología 70% práctica / 20% guiada / 10% teoría; las agendas reparten los
 * 90 minutos con ese criterio. Cada periodo desbloquea una insignia y otorga XP.
 *
 * La ruta de aprendizaje recorre HTML (P1–P2), CSS (P3–P4), JavaScript (P5–P9)
 * y cierra con un proyecto integrador (P10). Los constructores de agenda fijan el
 * reparto de tiempo (suma 90) y solo varían los textos.
 */

/** Sesión 1 — introducción de conceptos (más explicación guiada). */
const agendaIntro = (
  gancho: string,
  teoria: string,
  guiada: string,
  reto: string,
  cierre: string,
): BloqueAgenda[] => [
  { nombre: "Repaso y gancho", minutos: 10, detalle: gancho },
  { nombre: "Concepto nuevo (teoría guiada)", minutos: 20, detalle: teoria },
  { nombre: "Práctica guiada", minutos: 25, detalle: guiada },
  { nombre: "Mini retos en parejas", minutos: 25, detalle: reto },
  { nombre: "Misión de cierre", minutos: 10, detalle: cierre },
];

/** Sesión 2 — práctica guiada (mucha práctica acompañada). */
const agendaPractica = (
  repaso: string,
  demo: string,
  guiada: string,
  retos: string,
  cierre: string,
): BloqueAgenda[] => [
  { nombre: "Calentamiento", minutos: 5, detalle: repaso },
  { nombre: "Demo guiada", minutos: 15, detalle: demo },
  { nombre: "Práctica paso a paso", minutos: 40, detalle: guiada },
  { nombre: "Mini retos", minutos: 20, detalle: retos },
  { nombre: "Misión de cierre", minutos: 10, detalle: cierre },
];

/** Sesión 3 — retos y desafíos (la práctica manda). */
const agendaRetos = (
  repaso: string,
  demo: string,
  retos: string,
  cierre: string,
): BloqueAgenda[] => [
  { nombre: "Calentamiento", minutos: 10, detalle: repaso },
  { nombre: "Mini-demo de técnica", minutos: 10, detalle: demo },
  { nombre: "Ronda de retos progresivos", minutos: 55, detalle: retos },
  { nombre: "Misión de cierre", minutos: 15, detalle: cierre },
];

/** Sesión 4 — misión final (proyecto del periodo). */
const agendaMision = (
  plan: string,
  dev: string,
  pruebas: string,
  present: string,
): BloqueAgenda[] => [
  { nombre: "Planeación de la misión", minutos: 15, detalle: plan },
  { nombre: "Desarrollo del proyecto", minutos: 45, detalle: dev },
  { nombre: "Pruebas y mejoras", minutos: 15, detalle: pruebas },
  { nombre: "Presentación / showcase", minutos: 15, detalle: present },
];

const periodo1: PeriodoContenido = {
  numero: 1,
  titulo: "Introducción al Desarrollo Web y HTML",
  descripcion:
    "Cómo funciona la web y la estructura básica de HTML: etiquetas, encabezados, párrafos, imágenes, enlaces y listas dentro de una página HTML5.",
  proyecto: "Mi Primera Página Web Personal",
  insignia: { emoji: "🌐", nombre: "Explorador de la Web" },
  xp: 200,
  sesiones: [
    {
      numero: 1,
      titulo: "¿Cómo funciona la web?",
      tipo: "introduccion",
      nivel: "principiante",
      objetivo:
        "Entender qué es Internet y una página web, y escribir tu primera estructura HTML5 con encabezados y párrafos.",
      conceptos: [
        "Internet y la web: cliente, servidor y navegador",
        "HTML, CSS y JavaScript: estructura, estilo y comportamiento",
        "Etiquetas y la estructura HTML5 (html, head, body)",
        "Encabezados <h1>–<h6> y párrafos <p>",
      ],
      agenda: agendaIntro(
        "Dinámica: ¿qué pasa cuando escribo una dirección y pulso Enter? Reconstruimos el viaje de una página hasta el navegador.",
        "Qué es HTML y para qué sirve cada lenguaje (HTML = esqueleto, CSS = ropa, JS = movimiento). Recorrido por el editor y la vista previa.",
        "Todos escriben la estructura HTML5 base y añaden un <h1> con su nombre y un <p> de saludo; lo ven en la vista previa.",
        "Mini retos para añadir varios encabezados y párrafos y observar los tamaños.",
        "Cada quien escribe un encabezado y un párrafo que lo presenten.",
      ),
      ejercicios: [
        {
          titulo: "Hola, web",
          descripcion:
            "Escribe la estructura HTML5 básica y un <h1> que diga 'Hola, web'.",
        },
        {
          titulo: "Tu primer párrafo",
          descripcion: "Añade un <p> con una frase que te describa.",
        },
        {
          titulo: "Niveles de título",
          descripcion:
            "Usa un <h1>, un <h2> y un <h3> y observa la diferencia.",
        },
      ],
      retos: [
        {
          titulo: "Mi biografía corta",
          nivel: "principiante",
          consigna:
            "Crea una página con un <h1> con tu nombre y 2 párrafos contando algo de ti.",
        },
        {
          titulo: "Titulares de periódico",
          nivel: "principiante",
          consigna:
            "Escribe 3 titulares usando encabezados de distinto nivel y un párrafo bajo cada uno.",
        },
        {
          titulo: "La estructura correcta",
          nivel: "intermedio",
          consigna:
            "Arma una página con head (con <title>) y body bien ordenados, y comprueba el título en la pestaña.",
        },
      ],
      cierre: {
        titulo: "Misión: Mi tarjeta web",
        descripcion:
          "Crea una mini página con tu nombre en un <h1>, un subtítulo en <h2> y un párrafo de presentación.",
      },
      evaluacion: [
        "La página tiene una estructura HTML5 correcta (html, head, body).",
        "Usa encabezados y párrafos con sentido.",
        "Explica con sus palabras qué hace HTML.",
      ],
      recomendaciones: [
        "Muestra primero la página terminada y luego cómo se construye: engancha más.",
        "Insiste en la diferencia entre las 3 capas (HTML/CSS/JS) con la analogía del cuerpo.",
        "Celebra ver el primer texto en la vista previa: es el 'Hola, mundo' de la web.",
      ],
      recompensa: "+40 XP · Logro 'Primera Página'",
    },
    {
      numero: 2,
      titulo: "Imágenes, enlaces y listas",
      tipo: "practica",
      nivel: "principiante",
      objetivo:
        "Enriquecer una página con imágenes, enlaces a otras páginas y listas ordenadas y desordenadas.",
      conceptos: [
        "Imágenes con <img> (src y alt)",
        "Enlaces con <a> (href y target)",
        "Listas con <ul>, <ol> y <li>",
      ],
      agenda: agendaPractica(
        "Repaso: ¿qué etiqueta usamos para un título y para un párrafo?",
        "Demo: insertar una imagen por URL, crear un enlace a otra web y armar una lista.",
        "Construyen juntos una página 'mis favoritos' con una imagen, una lista de gustos y enlaces a sitios.",
        "Mini retos cambiando el alt de la imagen, el target del enlace y el tipo de lista.",
        "Crear una lista de 3 enlaces a sus páginas favoritas.",
      ),
      ejercicios: [
        {
          titulo: "Pon una imagen",
          descripcion:
            "Inserta una imagen con <img> usando una URL y su atributo alt.",
        },
        {
          titulo: "Un enlace",
          descripcion:
            "Crea un enlace <a> a tu página favorita que abra en una pestaña nueva.",
        },
        {
          titulo: "Mi lista",
          descripcion:
            "Haz una lista desordenada (<ul>) con 4 cosas que te gusten.",
        },
      ],
      retos: [
        {
          titulo: "Galería sencilla",
          nivel: "principiante",
          consigna:
            "Muestra 3 imágenes seguidas, cada una con su texto alternativo.",
        },
        {
          titulo: "Menú de enlaces",
          nivel: "principiante",
          consigna:
            "Crea una lista de enlaces a 4 sitios web que uses a menudo.",
        },
        {
          titulo: "Receta numerada",
          nivel: "intermedio",
          consigna:
            "Escribe una receta con los pasos en una lista ordenada (<ol>) y los ingredientes en una desordenada.",
        },
        {
          titulo: "Imagen con enlace",
          nivel: "intermedio",
          consigna:
            "Haz que una imagen sea clicable envolviéndola en un enlace <a>.",
        },
      ],
      cierre: {
        titulo: "Misión: Mi página de aficiones",
        descripcion:
          "Crea una página con un título, una imagen, una lista de tus aficiones y un enlace a algo relacionado.",
      },
      evaluacion: [
        "Inserta imágenes con alt y enlaces con href correctos.",
        "Usa listas ordenadas y desordenadas según el caso.",
        "La página combina varios elementos de forma ordenada.",
      ],
      recomendaciones: [
        "Recuerda siempre el atributo alt: enséñalo como accesibilidad desde el inicio.",
        "Deja que elijan sus propias imágenes y enlaces: la identidad motiva.",
      ],
      recompensa: "+50 XP · Logro 'Página con Vida'",
    },
    {
      numero: 3,
      titulo: "Armando una página completa",
      tipo: "retos",
      nivel: "principiante",
      objetivo:
        "Combinar todas las etiquetas básicas en páginas HTML5 bien estructuradas y sin errores.",
      conceptos: [
        "Anidación correcta de etiquetas",
        "Estructura HTML5 completa",
        "Leer y corregir el HTML",
      ],
      agenda: agendaRetos(
        "Juego '¿qué etiqueta falta?': el profe muestra páginas incompletas y el grupo adivina.",
        "Cómo revisar que las etiquetas abren y cierran bien (anidación).",
        "Serie de páginas a construir combinando títulos, párrafos, imágenes, enlaces y listas, de menos a más completa.",
        "Crear una página de presentación de un personaje favorito con todos los elementos vistos.",
      ),
      ejercicios: [
        {
          titulo: "Página de un libro",
          descripcion:
            "Crea una página sobre un libro: título, imagen de portada y descripción.",
        },
        {
          titulo: "Etiquetas anidadas",
          descripcion:
            "Pon una lista dentro de la cual un elemento tenga un enlace.",
        },
        {
          titulo: "Caza el error",
          descripcion:
            "Corrige una página donde una etiqueta no se cerró correctamente.",
        },
      ],
      retos: [
        {
          titulo: "Ficha de película",
          nivel: "intermedio",
          consigna:
            "Crea la ficha de una película con título, imagen, párrafo de sinopsis y lista de actores.",
        },
        {
          titulo: "Mini blog",
          nivel: "intermedio",
          consigna:
            "Escribe una entrada de blog con título, fecha en un párrafo, una imagen y un enlace 'leer más'.",
        },
        {
          titulo: "Índice con enlaces internos",
          nivel: "avanzado",
          consigna:
            "Crea una lista de enlaces que lleven a distintos encabezados de la misma página (usa id y #).",
        },
        {
          titulo: "Página de viaje",
          nivel: "intermedio",
          consigna:
            "Describe un lugar que quieras visitar con imagen, lista de actividades y enlaces.",
        },
      ],
      cierre: {
        titulo: "Misión: Página de un personaje",
        descripcion:
          "Crea una página completa sobre tu personaje favorito con título, imagen, descripción, lista de poderes y un enlace.",
      },
      evaluacion: [
        "Las etiquetas están bien anidadas y cerradas.",
        "Combina al menos 4 tipos de elementos distintos.",
        "La página se ve ordenada en la vista previa.",
      ],
      recomendaciones: [
        "Enseña a sangrar el HTML para ver la anidación: previene muchos errores.",
        "Permite temas libres (juegos, series, deportes) para sostener la motivación.",
      ],
      recompensa: "+50 XP · Trofeo 'Constructor de Páginas'",
    },
    {
      numero: 4,
      titulo: "Misión Final: Mi Primera Página Web Personal",
      tipo: "mision",
      nivel: "principiante",
      objetivo:
        "Integrar todas las etiquetas HTML aprendidas para crear una página web personal y presentarla.",
      conceptos: [
        "Integración de encabezados, párrafos, imágenes, enlaces y listas",
        "Estructura HTML5 ordenada",
        "Presentar el propio trabajo",
      ],
      agenda: agendaMision(
        "Bocetar en papel la página: secciones (sobre mí, gustos, contacto) y qué irá en cada una.",
        "Programar la página con título, foto/avatar, párrafos de presentación, lista de gustos y enlaces.",
        "Revisar que no falten etiquetas por cerrar y mejorar el orden del contenido.",
        "Cada estudiante presenta su página personal a la clase.",
      ),
      ejercicios: [
        {
          titulo: "Sección sobre mí",
          descripcion:
            "Crea un encabezado 'Sobre mí' con un par de párrafos de presentación.",
        },
        {
          titulo: "Mis gustos",
          descripcion: "Añade una lista con tus gustos o pasatiempos.",
        },
        {
          titulo: "Mis enlaces",
          descripcion:
            "Agrega una lista de enlaces (redes, páginas favoritas).",
        },
      ],
      retos: [
        {
          titulo: "Avatar y portada",
          nivel: "principiante",
          consigna:
            "Incluye una imagen de avatar y un título de bienvenida en la parte de arriba.",
        },
        {
          titulo: "Secciones con enlaces internos",
          nivel: "intermedio",
          consigna:
            "Crea un pequeño índice arriba con enlaces que salten a cada sección de tu página.",
        },
        {
          titulo: "Contacto",
          nivel: "intermedio",
          consigna:
            "Añade una sección de contacto con un enlace de correo (mailto:).",
        },
      ],
      cierre: {
        titulo: "Proyecto: Mi Primera Página Web Personal",
        descripcion:
          "Página personal terminada con varias secciones (sobre mí, gustos, enlaces), imágenes y estructura HTML5 correcta, sin etiquetas sin cerrar. ¡Preséntala!",
      },
      evaluacion: [
        "La página tiene al menos 3 secciones bien organizadas.",
        "Usa correctamente encabezados, párrafos, imágenes, listas y enlaces.",
        "Presenta su trabajo explicando qué construyó.",
      ],
      recomendaciones: [
        "Valora la organización del contenido, no solo que 'tenga muchas cosas'.",
        "Haz una galería final: ver el trabajo de los demás motiva mucho.",
      ],
      recompensa: "+60 XP · 🌐 Insignia 'Explorador de la Web' desbloqueada",
    },
  ],
};

const periodo2: PeriodoContenido = {
  numero: 2,
  titulo: "HTML Intermedio",
  descripcion:
    "Contenido organizado: tablas, formularios con inputs y botones, multimedia (video, audio, iframes) y etiquetas semánticas con accesibilidad básica.",
  proyecto: "Página de Registro para un Evento",
  insignia: { emoji: "📋", nombre: "Arquitecto de Contenido" },
  xp: 220,
  sesiones: [
    {
      numero: 1,
      titulo: "Datos en tablas",
      tipo: "introduccion",
      nivel: "principiante",
      objetivo:
        "Organizar información en tablas con filas, columnas y encabezados.",
      conceptos: [
        "Tablas con <table>",
        "Filas <tr>, celdas <td> y encabezados <th>",
        "Encabezado de tabla (<thead>) y cuerpo (<tbody>)",
      ],
      agenda: agendaIntro(
        "¿Dónde vemos tablas en la vida real? (horarios, marcadores, precios). Las identificamos.",
        "Cómo se arma una tabla: filas y celdas; diferencia entre <td> y <th>.",
        "Construyen juntos un horario de clases sencillo en una tabla.",
        "Mini retos añadiendo filas y columnas a la tabla.",
        "Crear una tabla con 3 productos y su precio.",
      ),
      ejercicios: [
        {
          titulo: "Tabla de 2x2",
          descripcion: "Crea una tabla con 2 filas y 2 columnas.",
        },
        {
          titulo: "Encabezados",
          descripcion:
            "Añade una fila de encabezados con <th> a una tabla de precios.",
        },
        {
          titulo: "Mi horario",
          descripcion: "Haz una tabla con tus clases de un día.",
        },
      ],
      retos: [
        {
          titulo: "Marcador deportivo",
          nivel: "principiante",
          consigna:
            "Crea una tabla con 3 equipos y sus puntos, con fila de encabezados.",
        },
        {
          titulo: "Horario semanal",
          nivel: "intermedio",
          consigna:
            "Arma una tabla con los días de la semana como columnas y 3 actividades.",
        },
        {
          titulo: "Tabla de precios",
          nivel: "intermedio",
          consigna:
            "Crea una tabla de un menú con columnas Plato, Descripción y Precio.",
        },
      ],
      cierre: {
        titulo: "Misión: Tabla de mi top 5",
        descripcion:
          "Crea una tabla con tu top 5 de algo (juegos, películas, canciones) con columnas Puesto, Nombre y Año.",
      },
      evaluacion: [
        "La tabla tiene filas, celdas y encabezados correctos.",
        "La información queda organizada y legible.",
        "Diferencia <th> de <td>.",
      ],
      recomendaciones: [
        "Dibuja la tabla en una cuadrícula antes de programarla: ayuda a entender filas/columnas.",
        "Evita usar tablas para 'maquetar': aclara que son para datos tabulares.",
      ],
      recompensa: "+50 XP · Logro 'Organizador de Datos'",
    },
    {
      numero: 2,
      titulo: "Formularios e inputs",
      tipo: "practica",
      nivel: "intermedio",
      objetivo:
        "Crear formularios para que el usuario escriba datos usando inputs, etiquetas y botones.",
      conceptos: [
        "Formulario con <form>",
        "Campos <input> (text, email, number, date…)",
        "Etiquetas <label> y botón de envío",
      ],
      agenda: agendaPractica(
        "Repaso: ¿qué páginas te piden escribir datos? Identificamos formularios.",
        "Demo: un formulario de contacto con nombre, correo y un botón Enviar.",
        "Construyen un formulario de inscripción con varios tipos de input y sus labels.",
        "Mini retos cambiando el tipo de input (email, number, date) y el placeholder.",
        "Crear un formulario que pida nombre y edad.",
      ),
      ejercicios: [
        {
          titulo: "Campo de nombre",
          descripcion: "Crea un <input> de texto con su <label> 'Nombre'.",
        },
        {
          titulo: "Correo y botón",
          descripcion:
            "Añade un input de tipo email y un botón de enviar al formulario.",
        },
        {
          titulo: "Varios tipos",
          descripcion:
            "Usa un input de número y uno de fecha con sus etiquetas.",
        },
      ],
      retos: [
        {
          titulo: "Formulario de contacto",
          nivel: "intermedio",
          consigna:
            "Crea un formulario con nombre, correo, mensaje (textarea) y botón Enviar.",
        },
        {
          titulo: "Encuesta rápida",
          nivel: "intermedio",
          consigna:
            "Haz un formulario con opciones (radio) para elegir una respuesta y un botón.",
        },
        {
          titulo: "Casillas de intereses",
          nivel: "intermedio",
          consigna:
            "Añade casillas (checkbox) para que el usuario marque varios intereses.",
        },
        {
          titulo: "Lista desplegable",
          nivel: "avanzado",
          consigna:
            "Incluye un <select> con varias opciones (por ejemplo, país o curso).",
        },
      ],
      cierre: {
        titulo: "Misión: Formulario de inscripción",
        descripcion:
          "Crea un formulario de inscripción con nombre, correo, fecha, una lista desplegable y un botón Enviar, cada campo con su label.",
      },
      evaluacion: [
        "Usa <form>, varios <input> y sus <label>.",
        "Elige tipos de input adecuados a cada dato.",
        "El formulario tiene un botón de envío.",
      ],
      recomendaciones: [
        "Asocia siempre label con su input: es accesibilidad y mejor experiencia.",
        "Usa placeholders claros para guiar al usuario.",
      ],
      recompensa: "+55 XP · Logro 'Recolector de Datos'",
    },
    {
      numero: 3,
      titulo: "Multimedia y semántica",
      tipo: "retos",
      nivel: "intermedio",
      objetivo:
        "Incrustar video, audio e iframes y estructurar la página con etiquetas semánticas accesibles.",
      conceptos: [
        "Video <video> y audio <audio>",
        "Incrustar con <iframe>",
        "Etiquetas semánticas (header, nav, main, section, footer) y accesibilidad",
      ],
      agenda: agendaRetos(
        "Juego 'ponle nombre a la zona': sobre una web real, nombramos header, menú, contenido y pie.",
        "Demo: incrustar un video, un audio y un mapa con iframe; presentar las etiquetas semánticas.",
        "Retos para incrustar multimedia y reorganizar una página con etiquetas semánticas, de menos a más.",
        "Convertir una página de <div> a etiquetas semánticas con header, main y footer.",
      ),
      ejercicios: [
        {
          titulo: "Un video",
          descripcion: "Incrusta un video con <video> y controles (controls).",
        },
        {
          titulo: "Estructura semántica",
          descripcion: "Crea una página con <header>, <main> y <footer>.",
        },
        {
          titulo: "Un mapa",
          descripcion: "Incrusta un mapa u otra web con un <iframe>.",
        },
      ],
      retos: [
        {
          titulo: "Reproductor",
          nivel: "intermedio",
          consigna:
            "Crea una página con un video y un audio, cada uno con sus controles.",
        },
        {
          titulo: "Página bien estructurada",
          nivel: "intermedio",
          consigna:
            "Arma una página con header (con nav), main (con secciones) y footer.",
        },
        {
          titulo: "Accesible de verdad",
          nivel: "avanzado",
          consigna:
            "Revisa una página y añade alt a las imágenes, labels a los inputs y texto descriptivo a los enlaces.",
        },
        {
          titulo: "Galería con video",
          nivel: "intermedio",
          consigna:
            "Combina imágenes, un video incrustado y un iframe en una misma página semántica.",
        },
      ],
      cierre: {
        titulo: "Misión: Página multimedia",
        descripcion:
          "Crea una página sobre un tema que te guste, con estructura semántica, un video o audio y un iframe, cuidando la accesibilidad.",
      },
      evaluacion: [
        "Incrusta correctamente multimedia (video/audio/iframe).",
        "Usa etiquetas semánticas en vez de solo <div>.",
        "Aplica al menos 2 buenas prácticas de accesibilidad.",
      ],
      recomendaciones: [
        "Presenta lo semántico como 'ponerle nombre a cada parte para que todos entiendan'.",
        "Conecta accesibilidad con personas reales: lectores de pantalla, conexiones lentas.",
      ],
      recompensa: "+60 XP · Trofeo 'Maestro Multimedia'",
    },
    {
      numero: 4,
      titulo: "Misión Final: Página de Registro para un Evento",
      tipo: "mision",
      nivel: "intermedio",
      objetivo:
        "Integrar tablas, formularios y estructura semántica para crear la página de registro de un evento.",
      conceptos: [
        "Integración de formularios, tablas y semántica",
        "Organización de la información del evento",
        "Accesibilidad básica del formulario",
      ],
      agenda: agendaMision(
        "Elegir el evento (concierto, torneo, taller) y decidir qué datos pedir y qué mostrar.",
        "Programar la página: cabecera del evento, tabla con el programa y formulario de inscripción.",
        "Probar el formulario, revisar labels/alt y mejorar el orden de las secciones.",
        "Presentar la página de registro y simular una inscripción.",
      ),
      ejercicios: [
        {
          titulo: "Cabecera del evento",
          descripcion:
            "Crea un header con el nombre del evento, la fecha y el lugar.",
        },
        {
          titulo: "Programa en tabla",
          descripcion:
            "Añade una tabla con la agenda del evento (hora y actividad).",
        },
        {
          titulo: "Formulario de inscripción",
          descripcion:
            "Crea el formulario para registrarse (nombre, correo, asistencia).",
        },
      ],
      retos: [
        {
          titulo: "Más campos",
          nivel: "intermedio",
          consigna:
            "Amplía el formulario con una lista desplegable y casillas de preferencias.",
        },
        {
          titulo: "Sección de invitados",
          nivel: "intermedio",
          consigna:
            "Añade una sección con imágenes y nombres de los invitados o ponentes.",
        },
        {
          titulo: "Mapa del lugar",
          nivel: "avanzado",
          consigna:
            "Incrusta con un iframe un mapa de la ubicación del evento.",
        },
      ],
      cierre: {
        titulo: "Proyecto: Página de Registro para un Evento",
        descripcion:
          "Página de un evento con estructura semántica, tabla con el programa y un formulario de inscripción completo y accesible. ¡Preséntala!",
      },
      evaluacion: [
        "Incluye un formulario funcional con varios tipos de campo.",
        "Organiza la información con tabla y etiquetas semánticas.",
        "Cuida la accesibilidad (labels, alt).",
      ],
      recomendaciones: [
        "Que cada quien invente su evento: hace el proyecto más personal.",
        "Revisa juntos un formulario mal hecho y mejórenlo: enseña por contraste.",
      ],
      recompensa: "+65 XP · 📋 Insignia 'Arquitecto de Contenido' desbloqueada",
    },
  ],
};

const periodo3: PeriodoContenido = {
  numero: 3,
  titulo: "Introducción a CSS",
  descripcion:
    "Dar estilo a las páginas: selectores, colores, tipografías, fondos, bordes y el modelo de caja (márgenes, padding) con la propiedad display.",
  proyecto: "Landing Page sencilla",
  insignia: { emoji: "🎨", nombre: "Aprendiz del Estilo" },
  xp: 240,
  sesiones: [
    {
      numero: 1,
      titulo: "El color de la web",
      tipo: "introduccion",
      nivel: "principiante",
      objetivo:
        "Aplicar estilos con CSS usando selectores y propiedades de color a los elementos.",
      conceptos: [
        "Qué es CSS y cómo se conecta con HTML",
        "Selectores (etiqueta, clase, id)",
        "Color de texto y de fondo",
      ],
      agenda: agendaIntro(
        "Antes/después: la misma página sin y con CSS. ¿Qué cambió? Descubrimos para qué sirve.",
        "Cómo se escribe una regla CSS (selector { propiedad: valor }) y los tipos de selectores.",
        "Pintan juntos una página: color de fondo, color de los títulos y de los párrafos.",
        "Mini retos cambiando colores con nombres y con códigos hexadecimales.",
        "Dar color de fondo y de texto a una página propia.",
      ),
      ejercicios: [
        {
          titulo: "Fondo de color",
          descripcion: "Ponle un color de fondo al body con CSS.",
        },
        {
          titulo: "Títulos de color",
          descripcion: "Cambia el color de todos los <h1> usando un selector.",
        },
        {
          titulo: "Una clase",
          descripcion:
            "Crea una clase .destacado y aplícale un color a un párrafo.",
        },
      ],
      retos: [
        {
          titulo: "Paleta de colores",
          nivel: "principiante",
          consigna:
            "Crea una página donde fondo, títulos y párrafos usen 3 colores que combinen.",
        },
        {
          titulo: "Clases y ids",
          nivel: "intermedio",
          consigna:
            "Aplica un estilo a una clase (.aviso) y otro distinto a un id (#principal).",
        },
        {
          titulo: "Modo oscuro",
          nivel: "intermedio",
          consigna:
            "Diseña una página con fondo oscuro y texto claro que se lea bien.",
        },
      ],
      cierre: {
        titulo: "Misión: Mi página con color",
        descripcion:
          "Toma una página de HTML que ya tengas y dale color de fondo, color de títulos y resalta un elemento con una clase.",
      },
      evaluacion: [
        "Escribe reglas CSS con la sintaxis correcta.",
        "Usa selectores de etiqueta, clase e id.",
        "Aplica colores de texto y de fondo.",
      ],
      recomendaciones: [
        "Empieza con nombres de color (red, blue) antes de los hexadecimales.",
        "Muestra el panel de la vista previa en vivo: cambiar un color y ver el efecto engancha.",
      ],
      recompensa: "+55 XP · Logro 'Primer Estilo'",
    },
    {
      numero: 2,
      titulo: "Tipografía y fondos",
      tipo: "practica",
      nivel: "intermedio",
      objetivo:
        "Mejorar la apariencia con tipografías, tamaños de texto, fondos y bordes.",
      conceptos: [
        "Fuentes (font-family) y tamaño (font-size)",
        "Peso, estilo y alineación del texto",
        "Fondos e imágenes de fondo; bordes (border)",
      ],
      agenda: agendaPractica(
        "Repaso: ¿cómo cambio el color del texto? Lo aplicamos rápido.",
        "Demo: cambiar la fuente, el tamaño y la alineación; añadir borde y fondo a una caja.",
        "Practican dando estilo a una tarjeta: tipografía, fondo y bordes redondeados.",
        "Mini retos jugando con font-size, font-weight y border-radius.",
        "Diseñar un título grande y centrado con su fuente.",
      ),
      ejercicios: [
        {
          titulo: "Cambia la fuente",
          descripcion: "Aplica una font-family distinta a toda la página.",
        },
        {
          titulo: "Texto grande",
          descripcion: "Haz que el <h1> sea más grande y esté centrado.",
        },
        {
          titulo: "Una caja con borde",
          descripcion: "Ponle borde y esquinas redondeadas a un elemento.",
        },
      ],
      retos: [
        {
          titulo: "Tarjeta de presentación",
          nivel: "intermedio",
          consigna:
            "Diseña una tarjeta con fondo de color, borde redondeado, tipografía y texto centrado.",
        },
        {
          titulo: "Cita destacada",
          nivel: "intermedio",
          consigna:
            "Crea una cita con texto en cursiva, más grande y con un borde a la izquierda.",
        },
        {
          titulo: "Fondo con imagen",
          nivel: "avanzado",
          consigna:
            "Pon una imagen de fondo a una sección y texto que se lea encima.",
        },
        {
          titulo: "Botón bonito",
          nivel: "intermedio",
          consigna:
            "Da estilo a un enlace para que parezca un botón (fondo, padding, borde redondeado).",
        },
      ],
      cierre: {
        titulo: "Misión: Mi tarjeta con estilo",
        descripcion:
          "Crea una tarjeta de perfil con foto, nombre y descripción, con tipografía cuidada, fondo, bordes y todo bien alineado.",
      },
      evaluacion: [
        "Cambia tipografía, tamaño y alineación del texto.",
        "Aplica fondos y bordes con buen gusto.",
        "El resultado se ve cuidado y legible.",
      ],
      recomendaciones: [
        "Pocas fuentes y colores: enseña que 'menos es más' en diseño.",
        "Comparen tarjetas entre compañeros para inspirarse.",
      ],
      recompensa: "+60 XP · Logro 'Diseñador de Tarjetas'",
    },
    {
      numero: 3,
      titulo: "El modelo de caja",
      tipo: "retos",
      nivel: "intermedio",
      objetivo:
        "Controlar el espacio con márgenes y padding y entender display para colocar elementos.",
      conceptos: [
        "Modelo de caja: contenido, padding, borde y margen",
        "margin y padding",
        "display (block, inline, inline-block, none)",
      ],
      agenda: agendaRetos(
        "Analogía de la caja: contenido (regalo), padding (relleno), borde (caja) y margen (espacio alrededor).",
        "Demo: cómo cambian margin y padding el espacio; diferencia entre block e inline.",
        "Retos para separar y alinear cajas usando margin, padding y display.",
        "Crear una fila de 3 cajas separadas y bien espaciadas.",
      ),
      ejercicios: [
        {
          titulo: "Dale aire",
          descripcion:
            "Añade padding a una caja para separar el texto del borde.",
        },
        {
          titulo: "Separa cajas",
          descripcion: "Usa margin para separar dos elementos.",
        },
        {
          titulo: "Centrar una caja",
          descripcion:
            "Centra una caja horizontalmente con margin auto y un ancho fijo.",
        },
      ],
      retos: [
        {
          titulo: "Tres tarjetas en fila",
          nivel: "intermedio",
          consigna:
            "Coloca 3 tarjetas en una fila usando display inline-block y márgenes.",
        },
        {
          titulo: "Caja perfecta",
          nivel: "intermedio",
          consigna:
            "Crea una caja con padding interno, borde y margen externo bien diferenciados.",
        },
        {
          titulo: "Esconder y mostrar",
          nivel: "intermedio",
          consigna:
            "Usa display none para ocultar un elemento y deja una versión visible al lado.",
        },
        {
          titulo: "Menú horizontal",
          nivel: "avanzado",
          consigna:
            "Convierte una lista vertical en un menú horizontal usando display y márgenes.",
        },
      ],
      cierre: {
        titulo: "Misión: Galería de cajas",
        descripcion:
          "Crea una galería con 4 cajas iguales, bien espaciadas y alineadas, controlando margin, padding y display.",
      },
      evaluacion: [
        "Diferencia margin de padding y los usa bien.",
        "Coloca elementos usando display.",
        "El espaciado se ve uniforme y ordenado.",
      ],
      recomendaciones: [
        "El modelo de caja es clave: dibújalo en el tablero y úsalo todo el periodo.",
        "Activa los bordes temporalmente para 'ver' las cajas mientras se aprende.",
      ],
      recompensa: "+65 XP · Trofeo 'Maestro de las Cajas'",
    },
    {
      numero: 4,
      titulo: "Misión Final: Landing Page sencilla",
      tipo: "mision",
      nivel: "intermedio",
      objetivo:
        "Integrar selectores, colores, tipografía y modelo de caja para diseñar una landing page atractiva.",
      conceptos: [
        "Integración de HTML + CSS",
        "Jerarquía visual (título, subtítulo, llamada a la acción)",
        "Espaciado y composición",
      ],
      agenda: agendaMision(
        "Elegir el producto/servicio de la landing y bocetar sus secciones (portada, beneficios, contacto).",
        "Programar la estructura HTML y darle estilo: colores, tipografía, cajas y un botón de acción.",
        "Probar la legibilidad, ajustar espaciados y colores, y revisar la jerarquía visual.",
        "Presentar la landing y explicar las decisiones de diseño.",
      ),
      ejercicios: [
        {
          titulo: "Portada con CTA",
          descripcion:
            "Crea una portada con título grande, subtítulo y un botón de acción.",
        },
        {
          titulo: "Sección de beneficios",
          descripcion: "Añade 3 cajas con un beneficio cada una.",
        },
        {
          titulo: "Pie con contacto",
          descripcion: "Crea un footer con datos de contacto estilizado.",
        },
      ],
      retos: [
        {
          titulo: "Paleta coherente",
          nivel: "intermedio",
          consigna:
            "Usa una paleta de 3 colores en toda la landing de forma coherente.",
        },
        {
          titulo: "Botón con estilo",
          nivel: "intermedio",
          consigna:
            "Diseña un botón llamativo (fondo, padding, bordes redondeados) bien colocado.",
        },
        {
          titulo: "Imagen de portada",
          nivel: "avanzado",
          consigna:
            "Añade una imagen o fondo en la portada con el texto legible encima.",
        },
      ],
      cierre: {
        titulo: "Proyecto: Landing Page sencilla",
        descripcion:
          "Landing page de un producto o servicio con portada, sección de beneficios y contacto, con CSS cuidado (colores, tipografía, espaciado). ¡Preséntala!",
      },
      evaluacion: [
        "Aplica CSS coherente (colores, tipografía, espaciado).",
        "Tiene una jerarquía visual clara.",
        "Incluye una llamada a la acción visible.",
      ],
      recomendaciones: [
        "Muestra landings reales como referencia y que las imiten a su manera.",
        "Premia la coherencia visual por encima de 'meter muchos colores'.",
      ],
      recompensa: "+70 XP · 🎨 Insignia 'Aprendiz del Estilo' desbloqueada",
    },
  ],
};

const periodo4: PeriodoContenido = {
  numero: 4,
  titulo: "Diseño Web Moderno",
  descripcion:
    "Interfaces atractivas y adaptables con Flexbox, Grid, diseño responsive, unidades relativas, pseudo-clases y elementos, transiciones y sombras.",
  proyecto: "Página Web para un Restaurante",
  insignia: { emoji: "📱", nombre: "Maestro Responsive" },
  xp: 260,
  sesiones: [
    {
      numero: 1,
      titulo: "Layouts con Flexbox",
      tipo: "introduccion",
      nivel: "intermedio",
      objetivo: "Acomodar elementos en filas y columnas flexibles con Flexbox.",
      conceptos: [
        "Contenedor flex (display: flex)",
        "Dirección y distribución (justify-content, align-items)",
        "Espacio entre elementos (gap)",
      ],
      agenda: agendaIntro(
        "Reto: alinear 3 cajas perfectamente. ¿Con lo de antes era fácil? Aparece Flexbox.",
        "Cómo funciona un contenedor flex y las propiedades para alinear y distribuir.",
        "Acomodan juntos una barra de navegación y una fila de tarjetas con flex.",
        "Mini retos cambiando justify-content y align-items.",
        "Centrar un elemento perfectamente con Flexbox.",
      ),
      ejercicios: [
        {
          titulo: "Fila flexible",
          descripcion: "Pon 3 cajas en una fila usando display flex.",
        },
        {
          titulo: "Centrado total",
          descripcion:
            "Centra una caja horizontal y verticalmente con Flexbox.",
        },
        {
          titulo: "Con espacio",
          descripcion: "Separa los elementos de una fila usando gap.",
        },
      ],
      retos: [
        {
          titulo: "Barra de navegación",
          nivel: "intermedio",
          consigna:
            "Crea una nav con el logo a la izquierda y los enlaces a la derecha usando flex.",
        },
        {
          titulo: "Tarjetas en fila",
          nivel: "intermedio",
          consigna:
            "Coloca 4 tarjetas iguales en una fila, bien distribuidas con flex y gap.",
        },
        {
          titulo: "Columna centrada",
          nivel: "intermedio",
          consigna:
            "Apila 3 elementos en columna y céntralos con flex-direction column.",
        },
        {
          titulo: "Pie en dos zonas",
          nivel: "avanzado",
          consigna:
            "Crea un footer con texto a un lado y enlaces al otro usando space-between.",
        },
      ],
      cierre: {
        titulo: "Misión: Encabezado profesional",
        descripcion:
          "Crea un encabezado con logo y menú alineados con Flexbox, bien espaciados y centrados verticalmente.",
      },
      evaluacion: [
        "Usa display flex para alinear elementos.",
        "Controla la distribución con justify-content y align-items.",
        "El resultado queda alineado y equilibrado.",
      ],
      recomendaciones: [
        "Flexbox se entiende practicando: pon muchos mini ejemplos de alinear.",
        "Usa colores de fondo en las cajas para 'ver' cómo se acomodan.",
      ],
      recompensa: "+60 XP · Logro 'Domador de Flexbox'",
    },
    {
      numero: 2,
      titulo: "Cuadrículas con Grid",
      tipo: "practica",
      nivel: "intermedio",
      objetivo:
        "Crear cuadrículas de filas y columnas con CSS Grid para maquetar páginas.",
      conceptos: [
        "Contenedor grid (display: grid)",
        "Columnas y filas (grid-template-columns)",
        "Espacio (gap) y áreas de la cuadrícula",
      ],
      agenda: agendaPractica(
        "Repaso de flex y diferencia con la idea de cuadrícula (2 dimensiones).",
        "Demo: una galería en cuadrícula de 3 columnas con gap.",
        "Practican maquetando una galería y un dashboard sencillo con Grid.",
        "Mini retos cambiando el número de columnas y el tamaño con fr.",
        "Crear una galería de 6 imágenes en 3 columnas.",
      ),
      ejercicios: [
        {
          titulo: "Tres columnas",
          descripcion:
            "Crea una cuadrícula de 3 columnas iguales con display grid.",
        },
        {
          titulo: "Con separación",
          descripcion: "Añade gap entre las celdas de la cuadrícula.",
        },
        {
          titulo: "Galería 2x2",
          descripcion: "Acomoda 4 imágenes en una cuadrícula de 2x2.",
        },
      ],
      retos: [
        {
          titulo: "Galería de fotos",
          nivel: "intermedio",
          consigna:
            "Crea una galería de 6 imágenes en 3 columnas con espacio uniforme.",
        },
        {
          titulo: "Columnas desiguales",
          nivel: "intermedio",
          consigna:
            "Haz una cuadrícula con una columna ancha y otra estrecha usando fr.",
        },
        {
          titulo: "Tablero de tarjetas",
          nivel: "avanzado",
          consigna:
            "Maqueta un tablero con varias tarjetas, una ocupando 2 columnas.",
        },
        {
          titulo: "Layout de página",
          nivel: "avanzado",
          consigna:
            "Usa Grid para maquetar header, contenido y footer de una página.",
        },
      ],
      cierre: {
        titulo: "Misión: Galería en cuadrícula",
        descripcion:
          "Crea una galería responsive de imágenes o tarjetas usando Grid, con columnas iguales y buen espaciado.",
      },
      evaluacion: [
        "Usa display grid con columnas y gap.",
        "Distribuye el contenido en una cuadrícula ordenada.",
        "Combina Grid con el contenido de forma clara.",
      ],
      recomendaciones: [
        "Aclara cuándo conviene Grid (2D) y cuándo Flexbox (1D).",
        "La unidad fr cuesta: muéstrala como 'partes' de un pastel.",
      ],
      recompensa: "+65 XP · Logro 'Arquitecto de Cuadrículas'",
    },
    {
      numero: 3,
      titulo: "Responsive y efectos",
      tipo: "retos",
      nivel: "avanzado",
      objetivo:
        "Hacer páginas adaptables con unidades relativas y media queries, y añadir efectos con pseudo-clases, transiciones y sombras.",
      conceptos: [
        "Unidades relativas (%, rem, vw/vh) y media queries",
        "Pseudo-clases (:hover) y pseudo-elementos (::before)",
        "Transiciones (transition) y sombras (box-shadow)",
      ],
      agenda: agendaRetos(
        "Achicamos la ventana: ¿qué se rompe? Descubrimos por qué hace falta responsive.",
        "Demo: una media query que cambia el layout en móvil; un :hover con transición y sombra.",
        "Retos para adaptar una página a móvil y añadir efectos de hover, sombras y transiciones.",
        "Hacer que una galería pase de 3 columnas a 1 en pantallas pequeñas.",
      ),
      ejercicios: [
        {
          titulo: "Botón con hover",
          descripcion:
            "Haz que un botón cambie de color al pasar el cursor (:hover).",
        },
        {
          titulo: "Sombra de tarjeta",
          descripcion: "Añade una sombra (box-shadow) a una tarjeta.",
        },
        {
          titulo: "Adaptar a móvil",
          descripcion:
            "Usa una media query para cambiar el color de fondo en pantallas pequeñas.",
        },
      ],
      retos: [
        {
          titulo: "Galería responsive",
          nivel: "avanzado",
          consigna:
            "Haz que una galería tenga 3 columnas en escritorio y 1 en móvil con media queries.",
        },
        {
          titulo: "Tarjeta interactiva",
          nivel: "avanzado",
          consigna:
            "Añade a una tarjeta una transición suave y una sombra que aparezca en hover.",
        },
        {
          titulo: "Menú adaptable",
          nivel: "avanzado",
          consigna:
            "Haz que un menú horizontal se apile en vertical en pantallas pequeñas.",
        },
        {
          titulo: "Efecto ::before",
          nivel: "avanzado",
          consigna:
            "Usa un pseudo-elemento ::before para añadir un ícono o decoración a un título.",
        },
      ],
      cierre: {
        titulo: "Misión: Página adaptable",
        descripcion:
          "Toma una página tuya y hazla responsive con unidades relativas y media queries, añadiendo hover, transiciones y sombras.",
      },
      evaluacion: [
        "Usa unidades relativas y al menos una media query.",
        "Añade efectos con pseudo-clases y transiciones.",
        "La página se ve bien en pantalla grande y pequeña.",
      ],
      recomendaciones: [
        "Prueba siempre achicando la ventana del navegador: es el test rápido de responsive.",
        "Las transiciones suben mucho la sensación de 'app profesional': motívalas.",
      ],
      recompensa: "+75 XP · Trofeo 'Mago Responsive'",
    },
    {
      numero: 4,
      titulo: "Misión Final: Página Web para un Restaurante",
      tipo: "mision",
      nivel: "avanzado",
      objetivo:
        "Integrar Flexbox, Grid, responsive y efectos para crear la página de un restaurante atractiva y adaptable.",
      conceptos: [
        "Integración de layout (flex/grid) + responsive + efectos",
        "Composición de una página real",
        "Detalles visuales (hover, sombras, transiciones)",
      ],
      agenda: agendaMision(
        "Elegir el restaurante y bocetar sus secciones (portada, menú, galería, contacto).",
        "Programar el layout con flex/grid, el menú, la galería y aplicar estilos y efectos.",
        "Probar en móvil y escritorio, ajustar el responsive y pulir los detalles visuales.",
        "Presentar la página del restaurante y mostrarla en distintos tamaños.",
      ),
      ejercicios: [
        {
          titulo: "Portada con hero",
          descripcion:
            "Crea una portada con imagen de fondo, nombre del restaurante y botón 'Ver menú'.",
        },
        {
          titulo: "Menú en cuadrícula",
          descripcion: "Muestra los platos en una cuadrícula con Grid.",
        },
        {
          titulo: "Galería responsive",
          descripcion: "Añade una galería de fotos que se adapte a móvil.",
        },
      ],
      retos: [
        {
          titulo: "Navegación pegajosa",
          nivel: "avanzado",
          consigna:
            "Crea una barra de navegación con flex y efectos de hover en los enlaces.",
        },
        {
          titulo: "Tarjetas de platos con efecto",
          nivel: "avanzado",
          consigna:
            "Da a cada plato una tarjeta con sombra y una transición al pasar el cursor.",
        },
        {
          titulo: "Totalmente responsive",
          nivel: "avanzado",
          consigna:
            "Asegúrate de que toda la página se vea bien en móvil con media queries.",
        },
      ],
      cierre: {
        titulo: "Proyecto: Página Web para un Restaurante",
        descripcion:
          "Página de un restaurante con portada, menú en cuadrícula, galería y contacto, maquetada con flex/grid, responsive y con efectos. ¡Preséntala!",
      },
      evaluacion: [
        "Maqueta con Flexbox y/o Grid de forma correcta.",
        "La página es responsive (móvil y escritorio).",
        "Incluye efectos visuales (hover, sombras, transiciones).",
      ],
      recomendaciones: [
        "Anímalos a buscar referencias reales de restaurantes y adaptarlas.",
        "Revisa el responsive en clase con la ventana achicada: es el sello de calidad.",
      ],
      recompensa: "+85 XP · 📱 Insignia 'Maestro Responsive' desbloqueada",
    },
  ],
};

const periodo5: PeriodoContenido = {
  numero: 5,
  titulo: "JavaScript Básico",
  descripcion:
    "Dar lógica a las páginas: qué es JavaScript, variables, tipos de datos, operadores, la consola, entrada/salida y funciones básicas.",
  proyecto: "Calculadora Básica",
  insignia: { emoji: "⚡", nombre: "Chispa de la Lógica" },
  xp: 280,
  sesiones: [
    {
      numero: 1,
      titulo: "Variables y datos",
      tipo: "introduccion",
      nivel: "intermedio",
      objetivo:
        "Escribir tu primer JavaScript: variables y tipos de datos mostrados en la consola.",
      conceptos: [
        "Qué es JavaScript y dónde se ejecuta",
        "Variables con let y const",
        "Tipos de datos: número, texto (string) y booleano",
      ],
      agenda: agendaIntro(
        "¿Qué hace que una página 'reaccione'? Vemos ejemplos de páginas con y sin JavaScript.",
        "Cómo se declara una variable (let/const), los tipos básicos y console.log.",
        "Crean variables (nombre, edad, esEstudiante) y las muestran en la consola.",
        "Mini retos cambiando valores y tipos de las variables.",
        "Crear 3 variables sobre uno mismo y mostrarlas.",
      ),
      ejercicios: [
        {
          titulo: "Tu primera variable",
          descripcion:
            "Crea una variable con tu nombre y muéstrala con console.log.",
        },
        {
          titulo: "Número y texto",
          descripcion:
            "Crea una variable de número (edad) y una de texto (ciudad).",
        },
        {
          titulo: "Verdadero o falso",
          descripcion: "Crea una variable booleana y muéstrala en consola.",
        },
      ],
      retos: [
        {
          titulo: "Mi ficha en consola",
          nivel: "intermedio",
          consigna:
            "Crea variables nombre, edad y ciudad y muéstralas en una frase con console.log.",
        },
        {
          titulo: "let vs const",
          nivel: "intermedio",
          consigna:
            "Crea una variable con let y cámbiala; crea otra con const y explica por qué no cambia.",
        },
        {
          titulo: "Tipos mezclados",
          nivel: "intermedio",
          consigna:
            "Crea una variable de cada tipo (número, texto, booleano) y di cuál es cuál en comentarios.",
        },
      ],
      cierre: {
        titulo: "Misión: Mi perfil en consola",
        descripcion:
          "Crea variables para tu perfil (nombre, edad, hobby, ¿estudia?) y muéstralo todo ordenado en la consola.",
      },
      evaluacion: [
        "Declara variables con let/const correctamente.",
        "Distingue número, texto y booleano.",
        "Muestra valores con console.log.",
      ],
      recomendaciones: [
        "Conecta JS con cosas que ya viven (botones, menús): así ven para qué sirve.",
        "Abre la consola y muestra que el código 'corre de verdad': es muy motivador.",
      ],
      recompensa: "+60 XP · Logro 'Primer Código JS'",
    },
    {
      numero: 2,
      titulo: "Operadores y consola",
      tipo: "practica",
      nivel: "intermedio",
      objetivo:
        "Hacer cálculos y combinar textos con operadores, mostrando resultados en la consola.",
      conceptos: [
        "Operadores aritméticos (+, -, *, /, %)",
        "Concatenar texto y plantillas (`${}`)",
        "Operadores de comparación",
      ],
      agenda: agendaPractica(
        "Repaso de variables con un ejemplo en vivo.",
        "Demo: operaciones matemáticas, unir texto con variables y comparar valores.",
        "Practican calculando totales y armando frases con plantillas de texto.",
        "Mini retos con módulo, comparaciones y plantillas.",
        "Calcular el área de un rectángulo y mostrarla en una frase.",
      ),
      ejercicios: [
        {
          titulo: "Suma en JS",
          descripcion:
            "Crea dos variables numéricas y muestra su suma en consola.",
        },
        {
          titulo: "Une textos",
          descripcion:
            "Usa una plantilla `${}` para crear un saludo con tu nombre.",
        },
        {
          titulo: "Compara",
          descripcion:
            "Compara dos números y muestra el resultado (true/false).",
        },
      ],
      retos: [
        {
          titulo: "Calculadora de área",
          nivel: "intermedio",
          consigna:
            "Con base y altura en variables, calcula y muestra el área en una frase.",
        },
        {
          titulo: "¿Es par?",
          nivel: "intermedio",
          consigna:
            "Usa el operador % para mostrar si un número es par (residuo 0).",
        },
        {
          titulo: "Promedio",
          nivel: "intermedio",
          consigna:
            "Calcula el promedio de 3 notas y muéstralo con una plantilla.",
        },
        {
          titulo: "Comparador",
          nivel: "avanzado",
          consigna:
            "Compara dos variables con >, < e === y muestra cada resultado.",
        },
      ],
      cierre: {
        titulo: "Misión: Mini reporte",
        descripcion:
          "Crea un programa que, con variables, calcule un total y un promedio y los muestre en frases claras con plantillas.",
      },
      evaluacion: [
        "Usa operadores aritméticos correctamente.",
        "Concatena texto con variables (plantillas).",
        "Muestra resultados claros en consola.",
      ],
      recomendaciones: [
        "Muestra la diferencia entre sumar números y 'sumar' textos: gran momento de aprendizaje.",
        "Las plantillas `${}` son cómodas: enséñalas pronto.",
      ],
      recompensa: "+65 XP · Logro 'Calculista JS'",
    },
    {
      numero: 3,
      titulo: "Entrada, salida y funciones",
      tipo: "retos",
      nivel: "avanzado",
      objetivo:
        "Leer datos del usuario con prompt, mostrarlos con alert y empaquetar lógica en funciones básicas.",
      conceptos: [
        "Entrada con prompt() y salida con alert()",
        "Convertir texto a número (Number)",
        "Funciones básicas (function) y return",
      ],
      agenda: agendaRetos(
        "¿Cómo le preguntamos algo al usuario? Probamos prompt y vemos que devuelve texto.",
        "Demo: pedir un dato con prompt, convertirlo con Number y crear una función que calcule algo.",
        "Retos pidiendo datos, convirtiéndolos y resolviéndolos dentro de funciones.",
        "Crear una función que reciba dos números y devuelva su suma.",
      ),
      ejercicios: [
        {
          titulo: "Pregunta el nombre",
          descripcion: "Pide el nombre con prompt y salúdalo con alert.",
        },
        {
          titulo: "Texto a número",
          descripcion:
            "Pide un número con prompt y conviértelo con Number para sumarle 10.",
        },
        {
          titulo: "Tu primera función",
          descripcion:
            "Crea una función saludar(nombre) que devuelva un saludo.",
        },
      ],
      retos: [
        {
          titulo: "Sumadora real",
          nivel: "avanzado",
          consigna:
            "Pide dos números con prompt, conviértelos y muestra la suma correcta (no texto pegado).",
        },
        {
          titulo: "Función de área",
          nivel: "avanzado",
          consigna:
            "Crea una función area(base, altura) que devuelva el área, y úsala con datos del usuario.",
        },
        {
          titulo: "Conversor de temperatura",
          nivel: "avanzado",
          consigna:
            "Pide grados Celsius y, con una función, devuelve y muestra los Fahrenheit.",
        },
        {
          titulo: "Entrevista",
          nivel: "avanzado",
          consigna: "Pide 3 datos con prompt y muestra un resumen con alert.",
        },
      ],
      cierre: {
        titulo: "Misión: Conversor con función",
        descripcion:
          "Crea un programa que pida un dato al usuario, lo convierta y, usando una función, calcule y muestre un resultado.",
      },
      evaluacion: [
        "Usa prompt/alert para entrada y salida.",
        "Convierte texto a número cuando hace falta.",
        "Define y usa al menos una función con return.",
      ],
      recomendaciones: [
        "El error de 'sumar textos' vuelve aquí con prompt: provócalo y explícalo.",
        "Presenta las funciones como 'máquinas': entra algo, sale algo.",
      ],
      recompensa: "+70 XP · Trofeo 'Creador de Funciones'",
    },
    {
      numero: 4,
      titulo: "Misión Final: Calculadora Básica",
      tipo: "mision",
      nivel: "avanzado",
      objetivo:
        "Integrar variables, operadores, entrada/salida y funciones para crear una calculadora básica.",
      conceptos: [
        "Integración de entrada, cálculo y salida",
        "Funciones para cada operación",
        "Mostrar resultados claros",
      ],
      agenda: agendaMision(
        "Decidir qué operaciones tendrá (suma, resta, multiplicación, división) y cómo pedir los datos.",
        "Programar la calculadora con funciones por operación y entrada/salida.",
        "Probar con varios números y cuidar la división entre cero.",
        "Presentar la calculadora y retar a un compañero a probarla.",
      ),
      ejercicios: [
        {
          titulo: "Pide dos números",
          descripcion: "Pide dos números con prompt y conviértelos a número.",
        },
        {
          titulo: "Funciones de operación",
          descripcion:
            "Crea funciones sumar(a,b) y restar(a,b) que devuelvan el resultado.",
        },
        {
          titulo: "Muestra el reporte",
          descripcion:
            "Muestra suma, resta, producto y división con etiquetas claras.",
        },
      ],
      retos: [
        {
          titulo: "Calculadora completa",
          nivel: "avanzado",
          consigna:
            "Muestra las 4 operaciones de dos números usando una función para cada una.",
        },
        {
          titulo: "A prueba de cero",
          nivel: "avanzado",
          consigna:
            "Evita que la división se rompa si el segundo número es 0 (avísalo).",
        },
        {
          titulo: "Elige la operación",
          nivel: "avanzado",
          consigna:
            "Pide al usuario qué operación quiere y muestra solo ese resultado.",
        },
      ],
      cierre: {
        titulo: "Proyecto: Calculadora Básica",
        descripcion:
          "Calculadora que pide dos números, usa funciones para operar y muestra los resultados claros, cuidando la división entre cero. ¡Preséntala!",
      },
      evaluacion: [
        "Realiza las operaciones correctamente con funciones.",
        "Lee datos del usuario y muestra resultados claros.",
        "Maneja el caso de dividir entre cero.",
      ],
      recomendaciones: [
        "Esta calculadora prepara los condicionales del próximo periodo: aprovéchalo.",
        "Haz una mini competencia: ¿quién encuentra un dato que rompa la calculadora?",
      ],
      recompensa: "+85 XP · ⚡ Insignia 'Chispa de la Lógica' desbloqueada",
    },
  ],
};

const periodo6: PeriodoContenido = {
  numero: 6,
  titulo: "Condicionales y Bucles",
  descripcion:
    "Tomar decisiones y automatizar tareas: if/else/else if, switch, operadores lógicos y bucles while y for.",
  proyecto: "Sistema de Inicio de Sesión",
  insignia: { emoji: "🔀", nombre: "Tomador de Decisiones" },
  xp: 300,
  sesiones: [
    {
      numero: 1,
      titulo: "Tomar decisiones con if",
      tipo: "introduccion",
      nivel: "intermedio",
      objetivo:
        "Usar if, else y else if para que el programa decida qué hacer según condiciones.",
      conceptos: [
        "Comparaciones (===, !==, <, >, <=, >=)",
        "Estructura if / else",
        "Encadenar con else if",
      ],
      agenda: agendaIntro(
        "Juego 'la frontera': el profe dice condiciones y los alumnos se mueven si son verdaderas.",
        "Cómo se escribe un if/else y cómo encadenar varias condiciones con else if.",
        "Programan juntos un 'control de edad' y un clasificador de notas con else if.",
        "Mini retos con una y con varias condiciones.",
        "Decir si un número es positivo, negativo o cero.",
      ),
      ejercicios: [
        {
          titulo: "Mayor de edad",
          descripcion:
            "Si la edad es 18 o más, muestra 'mayor'; si no, 'menor'.",
        },
        {
          titulo: "Par o impar",
          descripcion: "Con if/else, di si un número es par o impar.",
        },
        {
          titulo: "Tres caminos",
          descripcion: "Con else if, clasifica una nota en alta, media o baja.",
        },
      ],
      retos: [
        {
          titulo: "Control de acceso",
          nivel: "intermedio",
          consigna:
            "Pide la edad y muestra 'Puedes entrar' solo si es mayor de 12.",
        },
        {
          titulo: "Boletín de notas",
          nivel: "intermedio",
          consigna:
            "Convierte una nota (0–5) en letra A, B, C o D con else if.",
        },
        {
          titulo: "Signo del número",
          nivel: "intermedio",
          consigna:
            "Di si un número es positivo, negativo o cero con if/else if/else.",
        },
        {
          titulo: "Mayor de dos",
          nivel: "avanzado",
          consigna: "Pide dos números y muestra cuál es el mayor.",
        },
      ],
      cierre: {
        titulo: "Misión: El portero",
        descripcion:
          "Crea un programa que pida una contraseña y solo deje pasar si es la correcta; si no, avise.",
      },
      evaluacion: [
        "Escribe condiciones correctas.",
        "Usa if/else y else if cuando corresponde.",
        "El programa decide bien en cada caso.",
      ],
      recomendaciones: [
        "Insiste en === (tres iguales) frente a = (asignación): error clásico.",
        "Pide que prueben SIEMPRE los dos caminos antes de darlo por bueno.",
      ],
      recompensa: "+65 XP · Logro 'Primera Decisión'",
    },
    {
      numero: 2,
      titulo: "switch y lógica",
      tipo: "practica",
      nivel: "intermedio",
      objetivo:
        "Elegir entre muchas opciones con switch y combinar condiciones con operadores lógicos.",
      conceptos: [
        "Estructura switch / case / default",
        "Operadores lógicos (&&, ||, !)",
        "Combinar condiciones",
      ],
      agenda: agendaPractica(
        "Repaso de else if con un ejemplo rápido.",
        "Demo: un menú con switch y condiciones combinadas con && y ||.",
        "Practican un 'menú de opciones' con switch y validaciones con lógica.",
        "Mini retos combinando condiciones (rango de edad, dos requisitos a la vez).",
        "Crear un menú que responda distinto según la opción elegida.",
      ),
      ejercicios: [
        {
          titulo: "Día de la semana",
          descripcion:
            "Con switch, muestra el nombre del día según un número (1–7).",
        },
        {
          titulo: "Dos condiciones",
          descripcion:
            "Muestra 'acceso' solo si el usuario Y la contraseña son correctos (&&).",
        },
        {
          titulo: "Una u otra",
          descripcion:
            "Muestra un mensaje si es fin de semana (sábado O domingo) con ||.",
        },
      ],
      retos: [
        {
          titulo: "Menú con switch",
          nivel: "intermedio",
          consigna:
            "Crea un menú (1=saludar, 2=despedir, 3=ayuda) con switch y un default.",
        },
        {
          titulo: "Rango válido",
          nivel: "intermedio",
          consigna:
            "Comprueba que un número esté entre 1 y 10 usando && (mayor que 0 y menor que 11).",
        },
        {
          titulo: "Semáforo",
          nivel: "intermedio",
          consigna:
            "Según un color (rojo/amarillo/verde), indica qué hacer usando switch.",
        },
        {
          titulo: "Validador de formulario",
          nivel: "avanzado",
          consigna:
            "Pide nombre y edad y avisa si falta algún dato o la edad no es válida (lógica combinada).",
        },
      ],
      cierre: {
        titulo: "Misión: Menú interactivo",
        descripcion:
          "Crea un menú con varias opciones usando switch, validando la entrada con operadores lógicos.",
      },
      evaluacion: [
        "Usa switch con case y default.",
        "Combina condiciones con &&, || y !.",
        "Maneja entradas no válidas.",
      ],
      recomendaciones: [
        "Muestra cuándo conviene switch (muchas opciones) frente a else if.",
        "Las tablas de verdad ayudan: arma ejemplos de && y || en el tablero.",
      ],
      recompensa: "+70 XP · Logro 'Maestro de la Lógica'",
    },
    {
      numero: 3,
      titulo: "Bucles while y for",
      tipo: "retos",
      nivel: "avanzado",
      objetivo:
        "Repetir tareas automáticamente con bucles while y for, usando contadores y acumuladores.",
      conceptos: [
        "Bucle while y condición de parada",
        "Bucle for (inicio, condición, paso)",
        "Contadores y acumuladores",
      ],
      agenda: agendaRetos(
        "Reto: imprimir del 1 al 100 sin escribir 100 líneas. Aparecen los bucles.",
        "Demo: un while con condición de parada y un for que recorre números.",
        "Retos de conteos, sumas y tablas con while y for, de menos a más.",
        "Crear la tabla de multiplicar de un número con un for.",
      ),
      ejercicios: [
        {
          titulo: "Del 1 al 10",
          descripcion: "Muestra del 1 al 10 en consola con un for.",
        },
        {
          titulo: "Cuenta regresiva",
          descripcion: "Con while, haz una cuenta regresiva del 5 al 1.",
        },
        {
          titulo: "Suma hasta N",
          descripcion:
            "Suma los números del 1 al 10 con un acumulador en un for.",
        },
      ],
      retos: [
        {
          titulo: "Tabla de multiplicar",
          nivel: "avanzado",
          consigna: "Pide un número y muestra su tabla del 1 al 10 con un for.",
        },
        {
          titulo: "Solo pares",
          nivel: "avanzado",
          consigna: "Muestra los números pares del 2 al 20 usando un bucle.",
        },
        {
          titulo: "Promedio de notas",
          nivel: "avanzado",
          consigna:
            "Pide 5 notas en un bucle y calcula el promedio con un acumulador.",
        },
        {
          titulo: "Adivina el número",
          nivel: "avanzado",
          consigna:
            "Genera un número al azar y, con un while, deja que el usuario adivine con pistas.",
        },
      ],
      cierre: {
        titulo: "Misión: Generador de tablas",
        descripcion:
          "Crea un programa que pida un número y muestre su tabla de multiplicar completa usando un bucle.",
      },
      evaluacion: [
        "Usa while y for correctamente.",
        "Evita los bucles infinitos.",
        "Aplica contadores/acumuladores cuando hace falta.",
      ],
      recomendaciones: [
        "Provoca un bucle infinito controlado para que vean el peligro (y cómo parar).",
        "Dibuja en el tablero cómo cambia el contador en cada vuelta.",
      ],
      recompensa: "+75 XP · Trofeo 'Señor de los Bucles'",
    },
    {
      numero: 4,
      titulo: "Misión Final: Sistema de Inicio de Sesión",
      tipo: "mision",
      nivel: "avanzado",
      objetivo:
        "Integrar condicionales, lógica y bucles para crear un sistema de inicio de sesión con intentos.",
      conceptos: [
        "Integración de condicionales y bucles",
        "Validación de credenciales",
        "Límite de intentos",
      ],
      agenda: agendaMision(
        "Decidir el usuario y contraseña 'correctos' y cuántos intentos se permiten.",
        "Programar el login: pedir credenciales, comprobarlas y repetir mientras queden intentos.",
        "Probar con datos correctos e incorrectos y revisar el límite de intentos.",
        "Presentar el sistema de login y demostrar los distintos casos.",
      ),
      ejercicios: [
        {
          titulo: "Comprueba credenciales",
          descripcion:
            "Pide usuario y contraseña y di si son correctos con un if.",
        },
        {
          titulo: "Con intentos",
          descripcion: "Usa un bucle para permitir 3 intentos de contraseña.",
        },
        {
          titulo: "Bloqueo",
          descripcion: "Si se agotan los intentos, muestra 'cuenta bloqueada'.",
        },
      ],
      retos: [
        {
          titulo: "Mensajes claros",
          nivel: "avanzado",
          consigna: "Muestra cuántos intentos quedan tras cada fallo.",
        },
        {
          titulo: "Varios usuarios",
          nivel: "avanzado",
          consigna:
            "Permite validar entre 2 usuarios distintos con sus contraseñas.",
        },
        {
          titulo: "Bienvenida personalizada",
          nivel: "avanzado",
          consigna: "Al entrar bien, saluda al usuario por su nombre.",
        },
      ],
      cierre: {
        titulo: "Proyecto: Sistema de Inicio de Sesión",
        descripcion:
          "Login que pide credenciales, las valida, da varios intentos con mensajes claros y bloquea al agotarlos. ¡Preséntalo!",
      },
      evaluacion: [
        "Valida credenciales con condicionales.",
        "Controla los intentos con un bucle.",
        "Da mensajes claros en cada caso.",
      ],
      recomendaciones: [
        "Relaciónalo con apps reales: todos conocen una pantalla de login.",
        "Pídeles probar 'como hacker': intentar romperlo descubre casos olvidados.",
      ],
      recompensa: "+90 XP · 🔀 Insignia 'Tomador de Decisiones' desbloqueada",
    },
  ],
};

const periodo7: PeriodoContenido = {
  numero: 7,
  titulo: "Funciones y Arreglos",
  descripcion:
    "Organizar mejor el código: funciones con parámetros y return, arrays con sus métodos y objetos básicos.",
  proyecto: "Administrador de Lista de Tareas",
  insignia: { emoji: "📦", nombre: "Organizador de Código" },
  xp: 320,
  sesiones: [
    {
      numero: 1,
      titulo: "Funciones a fondo",
      tipo: "introduccion",
      nivel: "intermedio",
      objetivo:
        "Crear funciones reutilizables con parámetros y valores de retorno.",
      conceptos: [
        "Definir y llamar funciones",
        "Parámetros y argumentos",
        "return y reutilización",
      ],
      agenda: agendaIntro(
        "¿Qué tareas repetimos en el código? Idea de 'empaquetar' para no repetir.",
        "Cómo se define una función con parámetros y cómo devuelve un valor con return.",
        "Crean funciones útiles (saludar, doble, esMayor) y las llaman con distintos datos.",
        "Mini retos creando funciones con uno y varios parámetros.",
        "Crear una función que reciba un nombre y devuelva un saludo.",
      ),
      ejercicios: [
        {
          titulo: "Función saludar",
          descripcion: "Crea saludar(nombre) que devuelva 'Hola, NOMBRE'.",
        },
        {
          titulo: "El doble",
          descripcion: "Crea una función doble(n) que devuelva el doble de n.",
        },
        {
          titulo: "Dos parámetros",
          descripcion:
            "Crea sumar(a, b) que devuelva la suma y úsala dos veces.",
        },
      ],
      retos: [
        {
          titulo: "Calculadora de funciones",
          nivel: "intermedio",
          consigna:
            "Crea funciones sumar, restar y multiplicar y muestra resultados con cada una.",
        },
        {
          titulo: "¿Es mayor de edad?",
          nivel: "intermedio",
          consigna:
            "Crea esMayor(edad) que devuelva true o false y úsala con varias edades.",
        },
        {
          titulo: "Área y perímetro",
          nivel: "avanzado",
          consigna:
            "Crea dos funciones que devuelvan el área y el perímetro de un rectángulo.",
        },
        {
          titulo: "Saludo con hora",
          nivel: "intermedio",
          consigna:
            "Crea una función que reciba la hora y devuelva 'Buenos días/tardes/noches'.",
        },
      ],
      cierre: {
        titulo: "Misión: Mi caja de funciones",
        descripcion:
          "Crea 3 funciones útiles (con parámetros y return) y muéstralas funcionando con distintos datos.",
      },
      evaluacion: [
        "Define funciones con parámetros y return.",
        "Las reutiliza con distintos argumentos.",
        "El código queda más ordenado gracias a las funciones.",
      ],
      recomendaciones: [
        "Refuerza la idea de 'no repetir': una función se escribe una vez y se usa muchas.",
        "Distingue mostrar (console.log) de devolver (return): confusión típica.",
      ],
      recompensa: "+70 XP · Logro 'Fabricante de Funciones'",
    },
    {
      numero: 2,
      titulo: "Arrays y sus métodos",
      tipo: "practica",
      nivel: "intermedio",
      objetivo:
        "Guardar muchos datos en arrays y manejarlos con sus métodos y bucles.",
      conceptos: [
        "Crear arrays y acceder por índice",
        "Métodos push, pop y length",
        "Recorrer un array con for o forEach",
      ],
      agenda: agendaPractica(
        "Repaso de variables: ¿y si necesito guardar 100 nombres? Aparecen los arrays.",
        "Demo: crear un array, agregar/quitar elementos y recorrerlo.",
        "Practican una lista de compras: agregar, quitar y mostrar todos los elementos.",
        "Mini retos con push, pop, length y recorrido.",
        "Crear un array de 5 elementos y mostrarlos uno por uno.",
      ),
      ejercicios: [
        {
          titulo: "Tu primer array",
          descripcion: "Crea un array con 4 frutas y muéstralo en consola.",
        },
        {
          titulo: "Agregar y quitar",
          descripcion: "Usa push para agregar y pop para quitar un elemento.",
        },
        {
          titulo: "Recórrelo",
          descripcion: "Recorre un array con un bucle y muestra cada elemento.",
        },
      ],
      retos: [
        {
          titulo: "Lista de compras",
          nivel: "intermedio",
          consigna:
            "Crea una lista, agrega 3 productos, quita 1 y muestra cuántos quedan.",
        },
        {
          titulo: "Suma del array",
          nivel: "intermedio",
          consigna: "Recorre un array de números y muestra su suma total.",
        },
        {
          titulo: "El más grande",
          nivel: "avanzado",
          consigna: "Recorre un array de números y encuentra el mayor.",
        },
        {
          titulo: "Buscar elemento",
          nivel: "avanzado",
          consigna:
            "Comprueba si un nombre está en un array y avisa si lo encontró.",
        },
      ],
      cierre: {
        titulo: "Misión: Mi top de favoritos",
        descripcion:
          "Crea un array con tu top de algo (juegos, canciones), permite agregar y quitar, y muestra la lista numerada.",
      },
      evaluacion: [
        "Crea y manipula arrays (push/pop/length).",
        "Recorre arrays con un bucle.",
        "Resuelve un problema simple usando un array.",
      ],
      recomendaciones: [
        "Recuerda que los índices empiezan en 0: confusión muy común.",
        "Usa ejemplos cercanos (playlists, listas de amigos) para enganchar.",
      ],
      recompensa: "+75 XP · Logro 'Domador de Arrays'",
    },
    {
      numero: 3,
      titulo: "Objetos básicos",
      tipo: "retos",
      nivel: "avanzado",
      objetivo:
        "Agrupar datos relacionados en objetos con propiedades y combinarlos con arrays.",
      conceptos: [
        "Objetos con propiedades clave: valor",
        "Acceder y cambiar propiedades",
        "Arrays de objetos",
      ],
      agenda: agendaRetos(
        "¿Cómo guardo el nombre, la edad y la nota de un estudiante juntos? Aparecen los objetos.",
        "Demo: crear un objeto, leer y cambiar sus propiedades, y un array de objetos.",
        "Retos creando objetos (producto, estudiante, personaje) y recorriendo arrays de objetos.",
        "Crear un array con 3 personajes (objetos) y mostrar sus nombres.",
      ),
      ejercicios: [
        {
          titulo: "Tu primer objeto",
          descripcion:
            "Crea un objeto persona con nombre, edad y ciudad, y muéstralo.",
        },
        {
          titulo: "Cambia una propiedad",
          descripcion: "Modifica la edad de un objeto y vuelve a mostrarlo.",
        },
        {
          titulo: "Array de objetos",
          descripcion:
            "Crea un array con 2 objetos producto (nombre y precio).",
        },
      ],
      retos: [
        {
          titulo: "Ficha de personaje",
          nivel: "avanzado",
          consigna:
            "Crea un objeto personaje con nombre, vida y poderes (array) y muéstralo.",
        },
        {
          titulo: "Catálogo",
          nivel: "avanzado",
          consigna:
            "Crea un array de 3 productos (objetos) y recórrelo mostrando nombre y precio.",
        },
        {
          titulo: "Total del carrito",
          nivel: "avanzado",
          consigna: "Recorre un array de productos y suma todos sus precios.",
        },
        {
          titulo: "Buscar por propiedad",
          nivel: "avanzado",
          consigna:
            "Busca en un array de objetos el que tenga cierto nombre y muéstralo.",
        },
      ],
      cierre: {
        titulo: "Misión: Mini base de datos",
        descripcion:
          "Crea un array de objetos (estudiantes, productos o personajes) y muestra sus datos recorriéndolo con un bucle.",
      },
      evaluacion: [
        "Crea objetos con propiedades y las usa.",
        "Maneja arrays de objetos.",
        "Recorre y filtra datos de objetos.",
      ],
      recomendaciones: [
        "Presenta el objeto como una 'ficha' con campos: ayuda a visualizarlo.",
        "Los arrays de objetos son la base de casi toda app: dales importancia.",
      ],
      recompensa: "+80 XP · Trofeo 'Maestro de Objetos'",
    },
    {
      numero: 4,
      titulo: "Misión Final: Administrador de Lista de Tareas",
      tipo: "mision",
      nivel: "avanzado",
      objetivo:
        "Integrar funciones, arrays y objetos para crear un administrador de tareas (en lógica).",
      conceptos: [
        "Integración de funciones + arrays + objetos",
        "Operaciones CRUD básicas (agregar, listar, completar, borrar)",
        "Organización del código en funciones",
      ],
      agenda: agendaMision(
        "Decidir qué guarda cada tarea (texto, ¿completada?) y qué operaciones tendrá.",
        "Programar las funciones: agregar, listar, completar y eliminar tareas del array.",
        "Probar agregando y borrando tareas y revisar que el listado quede correcto.",
        "Presentar el administrador y demostrar todas las operaciones.",
      ),
      ejercicios: [
        {
          titulo: "Agregar tarea",
          descripcion: "Crea una función que agregue un objeto tarea al array.",
        },
        {
          titulo: "Listar tareas",
          descripcion:
            "Crea una función que recorra y muestre todas las tareas.",
        },
        {
          titulo: "Completar tarea",
          descripcion: "Crea una función que marque una tarea como completada.",
        },
      ],
      retos: [
        {
          titulo: "Eliminar tarea",
          nivel: "avanzado",
          consigna:
            "Agrega una función para eliminar una tarea por su posición.",
        },
        {
          titulo: "Contador de pendientes",
          nivel: "avanzado",
          consigna: "Muestra cuántas tareas faltan por completar.",
        },
        {
          titulo: "Mostrar estado",
          nivel: "avanzado",
          consigna:
            "Al listar, muestra [x] si la tarea está completada y [ ] si no.",
        },
      ],
      cierre: {
        titulo: "Proyecto: Administrador de Lista de Tareas",
        descripcion:
          "Administrador (en lógica) con funciones para agregar, listar, completar y eliminar tareas guardadas en un array de objetos. ¡Preséntalo!",
      },
      evaluacion: [
        "Usa funciones, un array y objetos coordinados.",
        "Realiza agregar, listar, completar y eliminar.",
        "El código está organizado en funciones claras.",
      ],
      recomendaciones: [
        "Este proyecto es la lógica de la app del próximo periodo (DOM): conéctalos.",
        "Pide nombres de funciones claros: es el momento de crear buen hábito.",
      ],
      recompensa: "+95 XP · 📦 Insignia 'Organizador de Código' desbloqueada",
    },
  ],
};

const periodo8: PeriodoContenido = {
  numero: 8,
  titulo: "Manipulación del DOM",
  descripcion:
    "Modificar la página desde JavaScript: el DOM, querySelector, eventos con addEventListener, cambiar texto y estilos, y crear o eliminar elementos.",
  proyecto: "Lista de Tareas Interactiva",
  insignia: { emoji: "🕹️", nombre: "Domador del DOM" },
  xp: 340,
  sesiones: [
    {
      numero: 1,
      titulo: "El DOM y querySelector",
      tipo: "introduccion",
      nivel: "intermedio",
      objetivo:
        "Seleccionar elementos de la página desde JavaScript y leer o cambiar su contenido.",
      conceptos: [
        "Qué es el DOM (la página como objetos)",
        "Seleccionar con querySelector / getElementById",
        "Leer y cambiar textContent",
      ],
      agenda: agendaIntro(
        "Idea clave: JavaScript puede 'tocar' la página. Mostramos un texto que cambia solo.",
        "Qué es el DOM y cómo seleccionar elementos para leer o cambiar su texto.",
        "Seleccionan un título y un párrafo y les cambian el texto desde JS.",
        "Mini retos seleccionando por id y por clase.",
        "Cambiar el texto de un encabezado al cargar la página.",
      ),
      ejercicios: [
        {
          titulo: "Selecciona un título",
          descripcion:
            "Selecciona un <h1> con querySelector y muéstralo en consola.",
        },
        {
          titulo: "Cambia el texto",
          descripcion: "Cambia el texto de un párrafo desde JavaScript.",
        },
        {
          titulo: "Por id",
          descripcion:
            "Selecciona un elemento por su id y cámbiale el contenido.",
        },
      ],
      retos: [
        {
          titulo: "Mensaje de bienvenida",
          nivel: "intermedio",
          consigna:
            "Al cargar la página, cambia un título para que muestre un saludo.",
        },
        {
          titulo: "Reloj de texto",
          nivel: "intermedio",
          consigna:
            "Muestra la hora actual dentro de un párrafo usando el DOM.",
        },
        {
          titulo: "Varios cambios",
          nivel: "intermedio",
          consigna: "Selecciona y cambia el texto de 3 elementos distintos.",
        },
        {
          titulo: "Contador inicial",
          nivel: "avanzado",
          consigna:
            "Pon un número en un elemento y cámbialo desde JS al cargar.",
        },
      ],
      cierre: {
        titulo: "Misión: Página que se actualiza sola",
        descripcion:
          "Crea una página donde, al cargar, JavaScript cambie el título, un párrafo y muestre la fecha.",
      },
      evaluacion: [
        "Selecciona elementos con querySelector/getElementById.",
        "Lee y cambia el texto de un elemento.",
        "Conecta el HTML con el JavaScript.",
      ],
      recomendaciones: [
        "Muestra el HTML y el JS lado a lado: ayuda a ver la conexión.",
        "Recuerda poner el script al final o esperar a que cargue el DOM.",
      ],
      recompensa: "+75 XP · Logro 'Selector Experto'",
    },
    {
      numero: 2,
      titulo: "Eventos y clics",
      tipo: "practica",
      nivel: "intermedio",
      objetivo: "Responder a las acciones del usuario con addEventListener.",
      conceptos: [
        "Eventos (click, input…)",
        "addEventListener",
        "Funciones que responden a eventos",
      ],
      agenda: agendaPractica(
        "Repaso: cambiamos un texto desde JS. ¿Y si lo cambia el usuario al hacer clic?",
        "Demo: un botón que, al hacer clic, cambia un texto o suma a un contador.",
        "Practican un contador con botones de sumar y reiniciar usando eventos.",
        "Mini retos añadiendo más botones y respuestas.",
        "Crear un botón que cambie el texto de un párrafo al pulsarlo.",
      ),
      ejercicios: [
        {
          titulo: "Botón que saluda",
          descripcion:
            "Crea un botón que, al hacer clic, muestre un saludo en un párrafo.",
        },
        {
          titulo: "Contador",
          descripcion: "Crea un botón que sume 1 a un número en pantalla.",
        },
        {
          titulo: "Reiniciar",
          descripcion: "Añade un botón que ponga el contador en 0.",
        },
      ],
      retos: [
        {
          titulo: "Contador completo",
          nivel: "intermedio",
          consigna:
            "Crea botones de sumar, restar y reiniciar para un contador.",
        },
        {
          titulo: "Interruptor de luz",
          nivel: "intermedio",
          consigna:
            "Un botón que cambie el texto entre 'Encendido' y 'Apagado' en cada clic.",
        },
        {
          titulo: "Saludo personalizado",
          nivel: "avanzado",
          consigna:
            "Un input para el nombre y un botón que muestre 'Hola, NOMBRE'.",
        },
        {
          titulo: "Doble botón",
          nivel: "intermedio",
          consigna:
            "Dos botones que muestren mensajes distintos en el mismo lugar.",
        },
      ],
      cierre: {
        titulo: "Misión: Mi contador interactivo",
        descripcion:
          "Crea un contador con botones de sumar, restar y reiniciar, todo respondiendo a clics.",
      },
      evaluacion: [
        "Usa addEventListener para responder a clics.",
        "La página reacciona a las acciones del usuario.",
        "Los botones hacen lo esperado.",
      ],
      recomendaciones: [
        "Presenta el evento como 'cuando pase X, haz Y': modelo mental simple.",
        "Celebra el primer botón que funciona: es un gran momento.",
      ],
      recompensa: "+80 XP · Logro 'Maestro de Eventos'",
    },
    {
      numero: 3,
      titulo: "Crear, cambiar y borrar",
      tipo: "retos",
      nivel: "avanzado",
      objetivo:
        "Cambiar estilos desde JS y crear o eliminar elementos de la página dinámicamente.",
      conceptos: [
        "Cambiar estilos (classList, style)",
        "Crear elementos (createElement, appendChild)",
        "Eliminar elementos (remove)",
      ],
      agenda: agendaRetos(
        "Reto: ¿cómo agrego un elemento nuevo sin escribirlo en el HTML? Aparece createElement.",
        "Demo: cambiar el color de un elemento, crear un <li> nuevo y eliminarlo.",
        "Retos creando y borrando elementos y cambiando estilos al hacer clic.",
        "Crear un botón que añada un elemento nuevo a una lista.",
      ),
      ejercicios: [
        {
          titulo: "Cambia el estilo",
          descripcion:
            "Con un botón, cambia el color de fondo de un elemento desde JS.",
        },
        {
          titulo: "Crear un elemento",
          descripcion:
            "Crea un <li> nuevo y agrégalo a una lista con appendChild.",
        },
        {
          titulo: "Eliminar",
          descripcion: "Crea un botón que elimine un elemento de la página.",
        },
      ],
      retos: [
        {
          titulo: "Agregar a la lista",
          nivel: "avanzado",
          consigna:
            "Un input y un botón que agreguen lo escrito como nuevo elemento de una lista.",
        },
        {
          titulo: "Resaltar al clic",
          nivel: "avanzado",
          consigna:
            "Haz que al hacer clic en un elemento de la lista, se resalte (cambie de clase).",
        },
        {
          titulo: "Borrar elemento",
          nivel: "avanzado",
          consigna:
            "Añade a cada elemento un botón que lo elimine de la lista.",
        },
        {
          titulo: "Modo oscuro",
          nivel: "avanzado",
          consigna:
            "Un botón que active/desactive una clase de modo oscuro en toda la página.",
        },
      ],
      cierre: {
        titulo: "Misión: Lista que crece",
        descripcion:
          "Crea una lista donde puedas agregar elementos con un input y eliminarlos con un botón, y resaltar el elemento al hacer clic.",
      },
      evaluacion: [
        "Cambia estilos desde JavaScript.",
        "Crea y elimina elementos del DOM.",
        "La interacción funciona de forma fluida.",
      ],
      recomendaciones: [
        "classList es más limpio que tocar style directamente: enséñalo así.",
        "Crear/eliminar elementos es la base de las apps: dale tiempo de práctica.",
      ],
      recompensa: "+85 XP · Trofeo 'Domador del DOM'",
    },
    {
      numero: 4,
      titulo: "Misión Final: Lista de Tareas Interactiva",
      tipo: "mision",
      nivel: "avanzado",
      objetivo:
        "Integrar DOM, eventos y manipulación de elementos para crear una lista de tareas interactiva real.",
      conceptos: [
        "Integración de DOM + eventos + crear/eliminar",
        "Marcar completadas y borrar",
        "Interfaz usable",
      ],
      agenda: agendaMision(
        "Bocetar la interfaz: input, botón agregar y la lista con sus acciones.",
        "Programar agregar tareas, marcarlas como completadas (clic) y eliminarlas (botón).",
        "Probar el flujo completo y mejorar estilos y mensajes.",
        "Presentar la app de tareas y demostrar todas las acciones.",
      ),
      ejercicios: [
        {
          titulo: "Agregar tareas",
          descripcion:
            "Input + botón que agreguen una tarea a la lista en pantalla.",
        },
        {
          titulo: "Marcar completada",
          descripcion:
            "Al hacer clic en una tarea, que se marque como completada (tachada).",
        },
        {
          titulo: "Eliminar tarea",
          descripcion: "Cada tarea con un botón para eliminarla de la lista.",
        },
      ],
      retos: [
        {
          titulo: "Contador de tareas",
          nivel: "avanzado",
          consigna: "Muestra cuántas tareas hay y cuántas están pendientes.",
        },
        {
          titulo: "Evitar vacías",
          nivel: "avanzado",
          consigna:
            "No permitas agregar una tarea si el input está vacío (avisa).",
        },
        {
          titulo: "Estilo profesional",
          nivel: "avanzado",
          consigna:
            "Da estilo a la app (tarjetas, colores, hover) para que se vea pulida.",
        },
      ],
      cierre: {
        titulo: "Proyecto: Lista de Tareas Interactiva",
        descripcion:
          "App de tareas donde se agregan, completan y eliminan tareas en la página, con un contador y buen diseño. ¡Preséntala!",
      },
      evaluacion: [
        "Agrega, completa y elimina tareas en el DOM.",
        "Responde correctamente a los eventos.",
        "La interfaz es clara y usable.",
      ],
      recomendaciones: [
        "Es el proyecto estrella del curso de DOM: dale tiempo y celébralo.",
        "Conéctalo con la lógica del periodo 7: aquí se 've' lo que antes era consola.",
      ],
      recompensa: "+100 XP · 🕹️ Insignia 'Domador del DOM' desbloqueada",
    },
  ],
};

const periodo9: PeriodoContenido = {
  numero: 9,
  titulo: "Aplicaciones Web Interactivas",
  descripcion:
    "Integrar HTML, CSS y JS en apps completas: formularios dinámicos, validaciones, temporizadores, localStorage, JSON básico y organización del proyecto.",
  proyecto: "Agenda Personal",
  insignia: { emoji: "🚀", nombre: "Constructor de Apps" },
  xp: 360,
  sesiones: [
    {
      numero: 1,
      titulo: "Formularios y validaciones",
      tipo: "introduccion",
      nivel: "avanzado",
      objetivo:
        "Procesar formularios desde JavaScript y validar los datos antes de usarlos.",
      conceptos: [
        "Leer valores de inputs (value)",
        "Evento submit y prevenir el envío",
        "Validaciones (campos vacíos, formato)",
      ],
      agenda: agendaIntro(
        "¿Qué pasa cuando un formulario está mal llenado? Vemos validaciones reales.",
        "Cómo leer los valores de un formulario en JS y validar antes de continuar.",
        "Procesan juntos un formulario de registro: leer datos y avisar si falta algo.",
        "Mini retos validando distintos campos (vacío, edad mínima, correo con @).",
        "Validar que un campo de nombre no esté vacío al enviar.",
      ),
      ejercicios: [
        {
          titulo: "Lee el input",
          descripcion:
            "Lee el valor de un input al hacer clic en un botón y muéstralo.",
        },
        {
          titulo: "Campo obligatorio",
          descripcion: "Avisa si el usuario deja vacío el campo de nombre.",
        },
        {
          titulo: "Validar edad",
          descripcion: "Comprueba que la edad sea un número mayor que 0.",
        },
      ],
      retos: [
        {
          titulo: "Registro validado",
          nivel: "avanzado",
          consigna:
            "Valida un formulario de nombre, correo y edad y muestra los errores encontrados.",
        },
        {
          titulo: "Correo con @",
          nivel: "avanzado",
          consigna: "Comprueba que el correo contenga '@' antes de aceptarlo.",
        },
        {
          titulo: "Mostrar resumen",
          nivel: "avanzado",
          consigna:
            "Si los datos son válidos, muestra un resumen del registro en la página.",
        },
        {
          titulo: "Resaltar errores",
          nivel: "avanzado",
          consigna: "Marca en rojo los campos que estén mal llenados.",
        },
      ],
      cierre: {
        titulo: "Misión: Formulario inteligente",
        descripcion:
          "Crea un formulario que valide sus campos al enviar, muestre los errores y, si todo está bien, confirme el registro.",
      },
      evaluacion: [
        "Lee valores de los inputs desde JS.",
        "Valida los datos y avisa de los errores.",
        "Solo continúa cuando los datos son válidos.",
      ],
      recomendaciones: [
        "Usa preventDefault para evitar que el formulario recargue la página.",
        "Las validaciones enseñan a pensar en el usuario: dales importancia.",
      ],
      recompensa: "+80 XP · Logro 'Validador Experto'",
    },
    {
      numero: 2,
      titulo: "Temporizadores y localStorage",
      tipo: "practica",
      nivel: "avanzado",
      objetivo:
        "Usar temporizadores para acciones en el tiempo y guardar datos con localStorage.",
      conceptos: [
        "setTimeout y setInterval",
        "Guardar y leer en localStorage",
        "Persistir datos entre recargas",
      ],
      agenda: agendaPractica(
        "Repaso: la app olvida todo al recargar. ¿Cómo recordar? Aparece localStorage.",
        "Demo: un cronómetro con setInterval y guardar/leer un dato en localStorage.",
        "Practican un contador que se guarda y un mensaje que aparece tras unos segundos.",
        "Mini retos con temporizadores y guardado de datos.",
        "Guardar el nombre del usuario y recuperarlo al recargar.",
      ),
      ejercicios: [
        {
          titulo: "Mensaje con retraso",
          descripcion:
            "Muestra un mensaje 3 segundos después de cargar (setTimeout).",
        },
        {
          titulo: "Cronómetro",
          descripcion:
            "Crea un contador que sube cada segundo con setInterval.",
        },
        {
          titulo: "Guarda un dato",
          descripcion: "Guarda un nombre en localStorage y léelo al recargar.",
        },
      ],
      retos: [
        {
          titulo: "Recuerda mi nombre",
          nivel: "avanzado",
          consigna:
            "Pide el nombre una vez, guárdalo y salúdalo automáticamente al volver.",
        },
        {
          titulo: "Cuenta regresiva",
          nivel: "avanzado",
          consigna:
            "Crea una cuenta regresiva desde 10 que avise al llegar a 0.",
        },
        {
          titulo: "Contador persistente",
          nivel: "avanzado",
          consigna:
            "Un contador con botones que recuerde su valor aunque recargues.",
        },
        {
          titulo: "Tema guardado",
          nivel: "avanzado",
          consigna:
            "Guarda en localStorage si el modo oscuro está activo y aplícalo al cargar.",
        },
      ],
      cierre: {
        titulo: "Misión: App que recuerda",
        descripcion:
          "Crea una app sencilla (contador o notas) que guarde su estado en localStorage y lo recupere al recargar.",
      },
      evaluacion: [
        "Usa setTimeout/setInterval correctamente.",
        "Guarda y recupera datos con localStorage.",
        "La app conserva su estado entre recargas.",
      ],
      recomendaciones: [
        "Muestra que al recargar los datos siguen ahí: el 'wow' de localStorage.",
        "Recuerda detener los setInterval cuando ya no se necesitan.",
      ],
      recompensa: "+85 XP · Logro 'Guardián de Datos'",
    },
    {
      numero: 3,
      titulo: "JSON y organización",
      tipo: "retos",
      nivel: "avanzado",
      objetivo:
        "Guardar estructuras de datos con JSON y organizar el proyecto en partes claras.",
      conceptos: [
        "JSON.stringify y JSON.parse",
        "Guardar arrays/objetos en localStorage",
        "Organizar el código del proyecto",
      ],
      agenda: agendaRetos(
        "Reto: guardar una lista completa, no solo un dato. Aparece JSON.",
        "Demo: convertir un array de objetos a JSON, guardarlo y volver a leerlo.",
        "Retos guardando y recuperando listas con JSON y ordenando el código.",
        "Guardar una lista de tareas como JSON y recargarla al volver.",
      ),
      ejercicios: [
        {
          titulo: "Array a JSON",
          descripcion:
            "Convierte un array a texto con JSON.stringify y muéstralo.",
        },
        {
          titulo: "Guardar lista",
          descripcion:
            "Guarda un array de objetos en localStorage usando JSON.",
        },
        {
          titulo: "Recuperar lista",
          descripcion:
            "Lee el JSON de localStorage y conviértelo de vuelta con JSON.parse.",
        },
      ],
      retos: [
        {
          titulo: "Notas persistentes",
          nivel: "avanzado",
          consigna:
            "Crea una lista de notas que se guarde como JSON y se recupere al recargar.",
        },
        {
          titulo: "Favoritos guardados",
          nivel: "avanzado",
          consigna:
            "Permite marcar favoritos de una lista y guárdalos con JSON.",
        },
        {
          titulo: "Código ordenado",
          nivel: "avanzado",
          consigna:
            "Reorganiza un programa separando la lógica en funciones con nombres claros.",
        },
      ],
      cierre: {
        titulo: "Misión: Lista persistente",
        descripcion:
          "Crea una lista (compras, tareas o notas) que guarde todos sus elementos como JSON y los recupere al volver.",
      },
      evaluacion: [
        "Convierte datos con JSON.stringify/parse.",
        "Guarda y recupera estructuras completas.",
        "El código está organizado en funciones claras.",
      ],
      recomendaciones: [
        "JSON es clave para apps reales y APIs: siéntales bien la base.",
        "Aprovecha para hablar de orden del código: prepara el proyecto final.",
      ],
      recompensa: "+90 XP · Trofeo 'Maestro de JSON'",
    },
    {
      numero: 4,
      titulo: "Misión Final: Agenda Personal",
      tipo: "mision",
      nivel: "avanzado",
      objetivo:
        "Integrar formularios, validaciones, localStorage y JSON para crear una agenda personal completa.",
      conceptos: [
        "Integración de formulario + DOM + persistencia",
        "CRUD de contactos/eventos con JSON",
        "App completa y usable",
      ],
      agenda: agendaMision(
        "Decidir qué guarda la agenda (contactos o eventos) y sus campos.",
        "Programar agregar, listar y eliminar entradas, guardándolas con JSON en localStorage.",
        "Probar el flujo completo, validar campos y revisar que todo persista al recargar.",
        "Presentar la agenda y demostrar que recuerda los datos.",
      ),
      ejercicios: [
        {
          titulo: "Formulario de la agenda",
          descripcion:
            "Crea el formulario para agregar una entrada (nombre, fecha o teléfono).",
        },
        {
          titulo: "Listar entradas",
          descripcion: "Muestra todas las entradas guardadas en la página.",
        },
        {
          titulo: "Guardar con JSON",
          descripcion: "Guarda las entradas como JSON en localStorage.",
        },
      ],
      retos: [
        {
          titulo: "Eliminar entrada",
          nivel: "avanzado",
          consigna: "Permite borrar una entrada y actualizar lo guardado.",
        },
        {
          titulo: "Validación completa",
          nivel: "avanzado",
          consigna: "Valida que los campos no estén vacíos antes de agregar.",
        },
        {
          titulo: "Buscar en la agenda",
          nivel: "avanzado",
          consigna: "Añade un buscador que filtre las entradas por nombre.",
        },
      ],
      cierre: {
        titulo: "Proyecto: Agenda Personal",
        descripcion:
          "Agenda que agrega, lista, busca y elimina entradas, con validaciones y datos guardados en localStorage como JSON. ¡Preséntala!",
      },
      evaluacion: [
        "Integra formulario, DOM y persistencia con JSON.",
        "Realiza agregar, listar, buscar y eliminar.",
        "Los datos persisten entre recargas.",
      ],
      recomendaciones: [
        "Es casi una app real: anímalos, ya saben todo lo necesario.",
        "Pide que la prueben cerrando y abriendo la pestaña: demuestra la persistencia.",
      ],
      recompensa: "+110 XP · 🚀 Insignia 'Constructor de Apps' desbloqueada",
    },
  ],
};

const periodo10: PeriodoContenido = {
  numero: 10,
  titulo: "Proyecto Final",
  descripcion:
    "Desarrollar una aplicación web completa con todo lo aprendido: planear, diseñar, programar, probar y presentar.",
  proyecto: "Aplicación Web Final (a elección)",
  insignia: { emoji: "🏆", nombre: "Desarrollador Web Junior" },
  xp: 400,
  sesiones: [
    {
      numero: 1,
      titulo: "Planear y diseñar",
      tipo: "introduccion",
      nivel: "avanzado",
      objetivo:
        "Elegir el proyecto final, planear sus funciones y diseñar su estructura y aspecto.",
      conceptos: [
        "Elegir alcance realista",
        "Boceto/wireframe y secciones",
        "Estructura HTML y plan de funciones JS",
      ],
      agenda: agendaIntro(
        "Galería de ideas: portafolio, quiz, conversor, biblioteca, juego… ¿qué te emociona?",
        "Cómo planear un proyecto: qué hace, qué pantallas tiene y qué datos maneja.",
        "Cada quien elige su proyecto y dibuja su boceto y lista de funciones.",
        "Mini retos definiendo el alcance mínimo (lo que sí o sí tendrá).",
        "Escribir la estructura HTML base del proyecto elegido.",
      ),
      ejercicios: [
        {
          titulo: "Elige tu proyecto",
          descripcion:
            "Decide tu proyecto final y escribe en comentarios qué hará.",
        },
        {
          titulo: "Boceto",
          descripcion: "Crea la estructura HTML de las secciones principales.",
        },
        {
          titulo: "Lista de funciones",
          descripcion: "Anota en comentarios las funciones JS que necesitarás.",
        },
      ],
      retos: [
        {
          titulo: "Alcance mínimo",
          nivel: "avanzado",
          consigna:
            "Define la versión mínima que debe funcionar sí o sí y prográmala primero.",
        },
        {
          titulo: "Estructura completa",
          nivel: "avanzado",
          consigna:
            "Arma todo el HTML de las secciones aunque aún no tengan estilo ni lógica.",
        },
        {
          titulo: "Estilo base",
          nivel: "avanzado",
          consigna: "Aplica una paleta y tipografía base a todo el proyecto.",
        },
      ],
      cierre: {
        titulo: "Misión: Plan del proyecto",
        descripcion:
          "Deja listo el plan: proyecto elegido, boceto, estructura HTML base y lista de funciones a programar.",
      },
      evaluacion: [
        "Elige un proyecto con alcance realista.",
        "Planea sus secciones y funciones.",
        "Deja la estructura HTML base lista.",
      ],
      recomendaciones: [
        "Ayúdalos a recortar el alcance: mejor algo pequeño que funcione completo.",
        "Pide que escriban primero qué debe hacer antes de programar.",
      ],
      recompensa: "+80 XP · Logro 'Planificador'",
    },
    {
      numero: 2,
      titulo: "Programar el núcleo",
      tipo: "practica",
      nivel: "avanzado",
      objetivo:
        "Construir la funcionalidad principal del proyecto integrando HTML, CSS y JS.",
      conceptos: [
        "Integrar DOM, eventos y datos",
        "Avanzar por partes y probar seguido",
        "Persistencia si aplica (localStorage/JSON)",
      ],
      agenda: agendaPractica(
        "Repaso del plan: ¿cuál es la función principal a lograr hoy?",
        "Demo: cómo avanzar por partes y probar cada función antes de seguir.",
        "Programan la funcionalidad central de su proyecto con apoyo del profe.",
        "Mini retos puliendo la función principal y probándola con casos reales.",
        "Dejar funcionando la característica más importante del proyecto.",
      ),
      ejercicios: [
        {
          titulo: "Función principal",
          descripcion:
            "Programa la acción central de tu app (lo que más importa).",
        },
        {
          titulo: "Conecta el botón",
          descripcion: "Haz que un evento dispare tu función principal.",
        },
        {
          titulo: "Muestra resultados",
          descripcion: "Refleja el resultado en la página (DOM).",
        },
      ],
      retos: [
        {
          titulo: "Segunda función",
          nivel: "avanzado",
          consigna:
            "Agrega una segunda característica importante a tu proyecto.",
        },
        {
          titulo: "Guarda datos",
          nivel: "avanzado",
          consigna: "Si tu app maneja datos, guárdalos con localStorage/JSON.",
        },
        {
          titulo: "Maneja errores",
          nivel: "avanzado",
          consigna:
            "Controla los casos en que el usuario hace algo inesperado.",
        },
      ],
      cierre: {
        titulo: "Misión: Núcleo funcionando",
        descripcion:
          "Deja la funcionalidad principal de tu proyecto funcionando de principio a fin.",
      },
      evaluacion: [
        "La función principal del proyecto funciona.",
        "Integra HTML, CSS y JS de forma coordinada.",
        "Avanza probando por partes.",
      ],
      recomendaciones: [
        "Recuérdales guardar/probar seguido: evita perder el avance.",
        "Mejor una función sólida que cinco a medias.",
      ],
      recompensa: "+90 XP · Logro 'Desarrollador en Acción'",
    },
    {
      numero: 3,
      titulo: "Probar y pulir",
      tipo: "retos",
      nivel: "avanzado",
      objetivo:
        "Detectar y corregir errores, mejorar el diseño y hacer el proyecto responsive.",
      conceptos: [
        "Pruebas y corrección de errores",
        "Mejoras de diseño y experiencia",
        "Responsive y detalles finales",
      ],
      agenda: agendaRetos(
        "Intercambio: cada quien prueba la app de un compañero y anota qué falla.",
        "Demo: cómo encontrar errores con la consola y mejorar el diseño con detalles.",
        "Retos para corregir bugs, validar entradas y pulir el diseño y el responsive.",
        "Dejar el proyecto sin errores conocidos y adaptable a móvil.",
      ),
      ejercicios: [
        {
          titulo: "Caza de bugs",
          descripcion:
            "Prueba tu app y corrige al menos 2 errores encontrados.",
        },
        {
          titulo: "Validaciones",
          descripcion:
            "Asegura que la app no se rompa con entradas vacías o raras.",
        },
        {
          titulo: "Detalles de diseño",
          descripcion: "Mejora colores, espaciados y tipografía del proyecto.",
        },
      ],
      retos: [
        {
          titulo: "Responsive total",
          nivel: "avanzado",
          consigna:
            "Haz que tu proyecto se vea bien en móvil con media queries.",
        },
        {
          titulo: "Efectos finales",
          nivel: "avanzado",
          consigna:
            "Añade transiciones, hover o sombras para una experiencia más pulida.",
        },
        {
          titulo: "Prueba de usuario",
          nivel: "avanzado",
          consigna:
            "Pide a un compañero que la use y corrige lo que le confunda.",
        },
      ],
      cierre: {
        titulo: "Misión: Versión pulida",
        descripcion:
          "Deja tu proyecto sin errores conocidos, responsive y con un diseño cuidado.",
      },
      evaluacion: [
        "Corrige los errores encontrados.",
        "El proyecto es responsive y cuidado.",
        "Maneja entradas inesperadas sin romperse.",
      ],
      recomendaciones: [
        "Las pruebas cruzadas entre compañeros descubren muchos errores: organízalas.",
        "Recuérdales que pulir detalles es lo que separa un proyecto bueno de uno excelente.",
      ],
      recompensa: "+100 XP · Trofeo 'Pulidor Experto'",
    },
    {
      numero: 4,
      titulo: "Misión Final: Presentar la Aplicación",
      tipo: "mision",
      nivel: "avanzado",
      objetivo:
        "Terminar la aplicación web completa y presentarla explicando cómo se construyó.",
      conceptos: [
        "Cierre del proyecto",
        "Documentación breve",
        "Presentación del trabajo",
      ],
      agenda: agendaMision(
        "Repasar la lista de funciones: ¿está todo lo planeado? Ajustar lo pendiente.",
        "Dar los toques finales y escribir una breve descripción de qué hace y cómo se usa.",
        "Probar por última vez en móvil y escritorio antes de presentar.",
        "Cada estudiante presenta su aplicación a la clase y responde preguntas.",
      ),
      ejercicios: [
        {
          titulo: "Toques finales",
          descripcion: "Completa los detalles que falten de tu proyecto.",
        },
        {
          titulo: "Descripción",
          descripcion: "Escribe en comentarios qué hace tu app y cómo se usa.",
        },
        {
          titulo: "Prueba final",
          descripcion: "Revisa que todo funcione antes de presentar.",
        },
      ],
      retos: [
        {
          titulo: "Pantalla de inicio",
          nivel: "avanzado",
          consigna:
            "Añade una portada con el nombre de la app y una breve descripción.",
        },
        {
          titulo: "Función extra",
          nivel: "avanzado",
          consigna:
            "Si te alcanza el tiempo, añade una característica adicional que la mejore.",
        },
        {
          titulo: "Créditos",
          nivel: "avanzado",
          consigna: "Agrega un footer con tu nombre y la tecnología usada.",
        },
      ],
      cierre: {
        titulo: "Proyecto: Aplicación Web Final",
        descripcion:
          "Aplicación web completa (portafolio, quiz, conversor, biblioteca, juego…) planeada, programada, probada y presentada a la clase. ¡Tu graduación como desarrollador web junior!",
      },
      evaluacion: [
        "La aplicación cumple lo que se propuso.",
        "Integra HTML, CSS y JavaScript con calidad.",
        "Presenta su trabajo explicando cómo lo construyó.",
      ],
      recomendaciones: [
        "Haz una verdadera feria de proyectos: la presentación cierra el curso con orgullo.",
        "Resalta cuánto avanzaron desde el 'Hola, web' del periodo 1.",
      ],
      recompensa:
        "+130 XP · 🏆 Insignia 'Desarrollador Web Junior' desbloqueada",
    },
  ],
};

/** Currículo completo del curso de Diseño Web (10 periodos × 4 sesiones). */
export const webCurriculum: Curriculum = [
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
