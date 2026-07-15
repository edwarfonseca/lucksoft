import type { TareaCasa } from "@/domain/models/curriculum";

/**
 * Tareas para la casa del curso de Diseño Web, una por sesión (clave
 * `p<periodo>s<sesion>`). Refuerzan lo visto en clase y se pueden hacer sin
 * ayuda del docente (~20-30 min). Se entregan desde el editor como las demás.
 */
export const tareasCasa: Record<string, TareaCasa> = {
  // Periodo 1 — Introducción al Desarrollo Web y HTML
  p1s1: {
    titulo: "La página de mi día",
    descripcion:
      "Crea una página con un <h1> con tu nombre, un <h2> que diga «Mi día» y 3 párrafos <p> contando qué haces en la mañana, en la tarde y en la noche. Revisa que cada etiqueta abra y cierre correctamente.",
  },
  p1s2: {
    titulo: "Mis 3 lugares favoritos",
    descripcion:
      "Haz una página sobre tus 3 lugares favoritos: una lista <ul> con los nombres, una imagen <img> (usa una URL de internet y no olvides el alt) y un enlace <a> a una página relacionada con alguno de ellos.",
  },
  p1s3: {
    titulo: "La página de tu mascota o juguete",
    descripcion:
      "Crea una página completa sobre tu mascota o tu juguete favorito: título, 2 párrafos, una lista de sus «superpoderes» y una imagen. Cuida la anidación: las etiquetas que abren primero cierran de último.",
  },
  p1s4: {
    titulo: "Página para tu familia",
    descripcion:
      "Haz una versión de tu página web personal, pero dedicada a alguien de tu casa: encabezados con su nombre, párrafos sobre ella o él, una lista de las cosas que le gustan y una imagen. Muéstrale el resultado en el navegador.",
  },

  // Periodo 2 — HTML Intermedio
  p2s1: {
    titulo: "Mi horario semanal",
    descripcion:
      "Construye una tabla con tu horario de la semana: una columna por día (usa <th> para los nombres de los días) y filas con lo que haces en la mañana y en la tarde. Ponle un título con <h1>.",
  },
  p2s2: {
    titulo: "Encuesta casera",
    descripcion:
      "Crea un formulario para encuestar a tu familia: al menos 4 campos de tipos distintos (texto, email, número y fecha), cada uno con su <label>, y un botón de enviar. Pídele a alguien que lo llene (aunque no se envíe de verdad).",
  },
  p2s3: {
    titulo: "Mi página con video",
    descripcion:
      "Haz una página con estructura semántica (header, main y footer) que incruste con <iframe> un video que te guste (en YouTube: Compartir → Insertar). En el header pon el título y en el footer tu nombre como autor.",
  },
  p2s4: {
    titulo: "Invitación a una fiesta",
    descripcion:
      "Crea la página de registro para una fiesta o reunión familiar: información del evento (qué, cuándo, dónde) en una tabla, y un formulario para confirmar asistencia con nombre, email y número de acompañantes.",
  },

  // Periodo 3 — Introducción a CSS
  p3s1: {
    titulo: "Colorea tu página",
    descripcion:
      "Retoma tu página de lugares favoritos (o crea una nueva) y con CSS dale: un color de fondo a la página, otro color al <h1> y crea una clase .destacado con color especial y aplícasela a tu lugar preferido.",
  },
  p3s2: {
    titulo: "Tarjeta con estilo",
    descripcion:
      "Diseña una tarjeta de presentación para alguien de tu casa: cambia la fuente con font-family, el tamaño del nombre con font-size, centra el texto y ponle un fondo de color y un borde bonito a la tarjeta.",
  },
  p3s3: {
    titulo: "Las tres cajas",
    descripcion:
      "Crea 3 <div> tipo tarjeta con títulos distintos y dale a cada una un estilo diferente de padding, margin y border. Escribe en un comentario CSS cuál es la diferencia entre padding (espacio interno) y margin (espacio externo).",
  },
  p3s4: {
    titulo: "Landing de tu favorito",
    descripcion:
      "Crea una mini landing page de tu juego, banda o película favorita: un título grande llamativo, un subtítulo, un párrafo que enamore y un «botón» (enlace con estilos) que diga algo como «¡Quiero saber más!». Cuida colores y espaciado.",
  },

  // Periodo 4 — Diseño Web Moderno
  p4s1: {
    titulo: "Barra de navegación flex",
    descripcion:
      "Crea la barra de navegación de un sitio imaginario: un <nav> con 4 enlaces distribuidos con display: flex y justify-content. Prueba al menos 2 valores distintos de justify-content y deja el que más te guste.",
  },
  p4s2: {
    titulo: "Álbum en cuadrícula",
    descripcion:
      "Arma un álbum con display: grid de 3 columnas y 2 filas (6 celdas): pueden ser imágenes o cajas de colores con títulos de momentos favoritos del año. Usa gap para separarlas con elegancia.",
  },
  p4s3: {
    titulo: "Que se vea bien en el celular",
    descripcion:
      "Haz tu álbum adaptable: con una media query, que en pantallas pequeñas (max-width: 600px) la cuadrícula pase a 1 columna. Agrega un efecto :hover a las celdas (sombra o cambio de color) con transition suave.",
  },
  p4s4: {
    titulo: "El restaurante de tu casa",
    descripcion:
      "Crea la página del «restaurante» de tu familia: nombre del restaurante, y el menú real de tu casa (3 platos con descripción y precio inventado) maquetado con flexbox o grid. Bonus: un efecto hover en cada plato.",
  },

  // Periodo 5 — JavaScript Básico
  p5s1: {
    titulo: "Mi perfil en consola",
    descripcion:
      "En la pestaña JS crea variables con const y let para tu nombre, edad, color favorito y si te gusta programar (booleano). Muéstralas en la consola con console.log con mensajes claros. Abre la consola y verifica que salgan.",
  },
  p5s2: {
    titulo: "Reporte de mi semana",
    descripcion:
      "Calcula datos de tu semana con operadores: horas de sueño por semana (horas por noche × 7), minutos de estudio, etc. Muestra los resultados en consola usando plantillas `${}` para armar frases completas.",
  },
  p5s3: {
    titulo: "Conversor de edades",
    descripcion:
      "Haz un programa que pida una edad con prompt(), la convierta con Number() y use una función para calcular cuántos meses son. Muestra el resultado con alert(). Pruébalo con las edades de tu familia.",
  },
  p5s4: {
    titulo: "Calculadora de ahorros",
    descripcion:
      "Crea una calculadora que pida cuánto ahorras por semana y cuántas semanas, y con una función calcule y muestre el total ahorrado. Agrega otra función que calcule cuánto sería en un año (52 semanas).",
  },

  // Periodo 6 — Condicionales y Bucles
  p6s1: {
    titulo: "¿Puedo ver la peli?",
    descripcion:
      "Programa un portero de cine: pide la edad con prompt() y con if/else if/else responde según la clasificación: menores de 7 con adulto, de 7 a 12 películas familiares, de 13 en adelante casi todas. Pruébalo con varias edades.",
  },
  p6s2: {
    titulo: "El menú de la semana",
    descripcion:
      "Pide un día de la semana con prompt() y usa switch para responder qué se come ese día en tu casa (invéntalo si hace falta). No olvides el default para días mal escritos.",
  },
  p6s3: {
    titulo: "Tablas a pedido",
    descripcion:
      "Pide un número con prompt() y genera su tabla de multiplicar del 1 al 10 en la consola usando un bucle for. Cada línea con plantilla: `${numero} x ${i} = ${numero * i}`.",
  },
  p6s4: {
    titulo: "La clave secreta",
    descripcion:
      "Crea el «candado» de tu cuarto: una clave secreta guardada en una variable y un bucle que dé máximo 3 intentos con prompt(). Si aciertan, mensaje de bienvenida; si se acaban los intentos, «¡Bloqueado!». Reta a tu familia a adivinarla.",
  },

  // Periodo 7 — Funciones y Arreglos
  p7s1: {
    titulo: "Caja de funciones caseras",
    descripcion:
      "Crea 2 funciones útiles: saludar(nombre) que retorne un saludo personalizado y cuadrado(numero) que retorne el número al cuadrado. Úsalas varias veces con console.log y comprueba que retornar no es lo mismo que imprimir.",
  },
  p7s2: {
    titulo: "El top 5 de tu casa",
    descripcion:
      "Haz una encuesta rápida en tu casa y guarda en un array el top 5 de comidas favoritas de la familia. Recórrelo con forEach (o for) mostrando en consola la posición y el nombre: «1. Arroz con pollo».",
  },
  p7s3: {
    titulo: "Ficha de mis tesoros",
    descripcion:
      "Crea un array con 3 objetos que describan cosas tuyas importantes (un juguete, un libro, un juego): cada uno con nombre, desde cuándo lo tienes y por qué te gusta. Recorre el array mostrando una ficha por cada uno.",
  },
  p7s4: {
    titulo: "Tareas del hogar",
    descripcion:
      "Adapta tu administrador de tareas a tu casa: un array de objetos con tareas reales del hogar (tender la cama, sacar la basura…), y funciones para agregar una tarea, listarlas y marcar una como completada. Pruébalas en consola.",
  },

  // Periodo 8 — Manipulación del DOM
  p8s1: {
    titulo: "La página que me saluda",
    descripcion:
      "Crea una página con un <h1> que diga «Cargando…» y haz que JavaScript lo cambie: selecciónalo con querySelector y cámbiale el textContent por un saludo con tu nombre. Cambia también el texto de un párrafo.",
  },
  p8s2: {
    titulo: "Contador de goles",
    descripcion:
      "Haz un marcador con un número en pantalla y 2 botones: «⚽ Gol» que suma 1 y «Reiniciar» que vuelve a 0. Usa addEventListener para los clics y actualiza el textContent del marcador.",
  },
  p8s3: {
    titulo: "Lista de invitados",
    descripcion:
      "Crea una página con un input, un botón «Agregar» y una <ul> vacía: al hacer clic, crea un <li> con createElement, ponle el nombre escrito y agrégalo a la lista con appendChild. Arma la lista de invitados de tu próxima fiesta.",
  },
  p8s4: {
    titulo: "Tareas de la casa, versión interactiva",
    descripcion:
      "Convierte las tareas del hogar en una página real: agregar tarea con input y botón, marcarla como hecha al hacerle clic (usa classList para tacharla con CSS) y un botón para borrarla. Muéstrasela a tu familia funcionando.",
  },

  // Periodo 9 — Aplicaciones Web Interactivas
  p9s1: {
    titulo: "El formulario que revisa",
    descripcion:
      "Crea un formulario con nombre y email y valídalo desde JS: al enviar (evento submit con preventDefault), si el nombre está vacío muestra un mensaje de error en rojo; si todo está bien, un mensaje de éxito en verde.",
  },
  p9s2: {
    titulo: "La página que me recuerda",
    descripcion:
      "Haz una página que pida tu nombre una sola vez y lo guarde en localStorage: cuando vuelvas a ejecutarla, debe saludarte directo sin preguntar. Agrega un contador de visitas que también se guarde y aumente cada vez.",
  },
  p9s3: {
    titulo: "La lista que no se borra",
    descripcion:
      "Mejora tu lista de invitados (o tareas): guarda el array en localStorage con JSON.stringify cada vez que cambie, y al cargar la página recupéralo con JSON.parse para que la lista siga ahí después de recargar.",
  },
  p9s4: {
    titulo: "La agenda de tu familia",
    descripcion:
      "Usa tu Agenda Personal en casa: agrega 3 contactos reales de tu familia (con su permiso), verifica que sigan ahí tras recargar la página, y prueba editar o borrar uno. Anota en un comentario qué mejorarías de tu agenda.",
  },

  // Periodo 10 — Proyecto Final
  p10s1: {
    titulo: "El boceto",
    descripcion:
      "Dibuja en papel el boceto (wireframe) de tu proyecto final: qué secciones tendrá y dónde va cada cosa. Luego arma en HTML el esqueleto: solo la estructura semántica con las secciones vacías y sus títulos.",
  },
  p10s2: {
    titulo: "Sesión de avance en casa",
    descripcion:
      "Avanza el núcleo de tu proyecto: elige UNA funcionalidad del plan y déjala funcionando (aunque sea sencilla). Si te atascas, deja un comentario en el código explicando qué intentaste para revisarlo en clase.",
  },
  p10s3: {
    titulo: "Tester en casa",
    descripcion:
      "Pide a alguien de tu casa que use tu aplicación e intente hacer cosas raras (dejar campos vacíos, hacer doble clic…). Anota en comentarios 2 problemas o mejoras que encuentren y arregla al menos 1.",
  },
  p10s4: {
    titulo: "Ensayo de presentación",
    descripcion:
      "Ensaya tu presentación con tu familia: muestra tu aplicación, explica cómo la hiciste y qué fue lo más difícil. Escribe en un comentario HTML las 3 ideas clave que dirás. ¡Ya eres desarrollador web! 🚀",
  },
};
