import type { TareaCasa } from "@/domain/models/curriculum";

/**
 * Tareas para la casa del curso de Python, una por sesión (clave `p<periodo>s<sesion>`).
 * Refuerzan lo visto en clase y se pueden hacer sin ayuda del docente (~20-30 min).
 * Se entregan desde el editor igual que las actividades de clase.
 */
export const tareasCasa: Record<string, TareaCasa> = {
  // Periodo 1 — Descubriendo la Programación
  p1s1: {
    titulo: "Receta de algoritmo",
    descripcion:
      "Piensa en algo que haces todos los días en casa (alistarte para dormir, preparar el desayuno…) y escríbelo como un algoritmo: un print() por cada paso, mínimo 6 pasos EN ORDEN. Recuerda: si los pasos se desordenan, ¡la receta falla!",
  },
  p1s2: {
    titulo: "El cartel de mi cuarto",
    descripcion:
      "Crea un cartel para la puerta de tu cuarto usando varios print(): tu nombre bien grande (decóralo con símbolos como * o =), y debajo 3 cosas que te encantan. Agrega un comentario con # encima de cada parte explicando qué hace.",
  },
  p1s3: {
    titulo: "Caza tus propios bugs",
    descripcion:
      "Escribe un programa de 5 líneas con print() que funcione perfecto. Luego dáñalo A PROPÓSITO (quita una comilla, borra un paréntesis), ejecútalo y LEE el mensaje de error. Arréglalo y repite con otro error distinto. Deja en comentarios qué decía cada error.",
  },
  p1s4: {
    titulo: "Tarjeta para tu familia",
    descripcion:
      "Haz una nueva tarjeta de presentación digital, pero esta vez para alguien de tu familia: su nombre con decoración ASCII, 3 datos curiosos y un mensaje bonito. Muéstrale el resultado ejecutándolo en vivo.",
  },

  // Periodo 2 — Variables y Datos
  p2s1: {
    titulo: "Ficha de mi mascota (o juguete favorito)",
    descripcion:
      "Crea 4 variables con los datos de tu mascota o tu juguete favorito: nombre, edad, color y una habilidad especial. Después muéstralos con print() formando una ficha ordenada, usando las variables (no escribas los datos directo en el print).",
  },
  p2s2: {
    titulo: "Entrevista en casa",
    descripcion:
      "Escribe un programa entrevistador: con input() haz 3 preguntas a alguien de tu casa (nombre, comida favorita, superpoder que quisiera) y al final muestra un resumen usando sus respuestas, como si el programa lo conociera.",
  },
  p2s3: {
    titulo: "La máquina del tiempo",
    descripcion:
      "Pide la edad con input(), conviértela a número con int() y muestra: en qué año nació aproximadamente (2026 menos la edad) y cuántos años tendrá en 2030. Recuerda: input() siempre devuelve texto, por eso hay que convertir.",
  },
  p2s4: {
    titulo: "Perfil gamer de tu familia",
    descripcion:
      "Usa tu Generador de Perfil Gamer con alguien de tu casa: pídele sus datos con input() y genera su perfil. Agrégale un dato nuevo que no hicimos en clase (por ejemplo su videojuego o película favorita).",
  },

  // Periodo 3 — Matemáticas y Operadores
  p3s1: {
    titulo: "La cuenta del mercado",
    descripcion:
      "Crea variables con el precio de 5 productos que haya en tu cocina (invéntate los precios si no los sabes). Calcula y muestra el total de la compra y cuánto costaría si compraras 2 de cada uno.",
  },
  p3s2: {
    titulo: "Reparto justo de dulces",
    descripcion:
      "Tienes 25 dulces (o los que quieras) para repartir entre las personas de tu casa. Usa // para mostrar cuántos dulces le tocan a cada uno y % para mostrar cuántos sobran. Prueba con varios números de dulces.",
  },
  p3s3: {
    titulo: "Mi fórmula casera",
    descripcion:
      "Inventa una fórmula útil para tu casa y prográmala: por ejemplo, cuántas horas de pantalla usas a la semana (horas por día × 7), o cuánto ahorras en un año guardando algo cada mes. Muestra el resultado con un mensaje claro.",
  },
  p3s4: {
    titulo: "Calculadora de propinas",
    descripcion:
      "Crea una calculadora que pida con input() el valor de una cuenta de restaurante y muestre: la propina del 10%, y el total a pagar con propina incluida. Pruébala con 3 valores distintos.",
  },

  // Periodo 4 — Decisiones
  p4s1: {
    titulo: "¿Saco chaqueta?",
    descripcion:
      "Programa un consejero del clima: pide la temperatura con input(), conviértela a número y usa if para aconsejar: si es menor a 15, que diga «¡Lleva chaqueta! 🧥». Pruébalo con temperaturas frías y calientes.",
  },
  p4s2: {
    titulo: "Par o impar",
    descripcion:
      "Pide un número y usa if-else con el operador % para decir si es PAR o IMPAR (pista: los pares dejan residuo 0 al dividir entre 2). Pruébalo con 4 números diferentes, ¡incluye el 0!",
  },
  p4s3: {
    titulo: "El semáforo",
    descripcion:
      "Pide un color con input() y responde con if/elif/else: «rojo» → ¡Detente!, «amarillo» → Prepárate…, «verde» → ¡Avanza! Y si escriben cualquier otra cosa, responde que ese color no está en el semáforo.",
  },
  p4s4: {
    titulo: "¿Qué animal eres?",
    descripcion:
      "Crea un mini test de personalidad de 2 preguntas (por ejemplo: ¿prefieres el día o la noche?, ¿mar o montaña?) y según las respuestas dile a la persona qué animal es. Haz que alguien de tu casa lo responda.",
  },

  // Periodo 5 — Repeticiones
  p5s1: {
    titulo: "Cuenta regresiva personalizada",
    descripcion:
      "Pide un número con input() y haz una cuenta regresiva desde ese número hasta 0 con while, terminando con un mensaje de despegue 🚀. Cuidado con el bucle infinito: ¡no olvides restar 1 en cada vuelta!",
  },
  p5s2: {
    titulo: "La tabla que más te cueste",
    descripcion:
      "Pide un número y muestra su tabla de multiplicar del 1 al 12 usando for y range(). Cada línea debe verse así: «7 x 3 = 21». Úsala para repasar la tabla que más difícil te parezca.",
  },
  p5s3: {
    titulo: "Suma de mi semana",
    descripcion:
      "Con un bucle, pide 7 valores (por ejemplo, cuántos minutos jugaste cada día de la semana) y usa un acumulador para mostrar al final el total y el promedio por día.",
  },
  p5s4: {
    titulo: "Pirámide de estrellas",
    descripcion:
      'Pide un tamaño y dibuja una pirámide de asteriscos de ese alto usando for: primera línea 1 estrella, segunda 2, y así. Pista: en Python puedes repetir texto con «"*" * n».',
  },

  // Periodo 6 — Colecciones de Datos
  p6s1: {
    titulo: "Lista del mercado",
    descripcion:
      "Crea una lista con 6 productos que haga falta comprar en tu casa. Muestra: el primero de la lista, el último (pista: índice -1), y cuántos productos hay usando len(). Todo con print() e índices, sin escribir los productos otra vez.",
  },
  p6s2: {
    titulo: "Maleta de viaje",
    descripcion:
      "Empieza con una lista de 4 cosas para un viaje. Luego: agrega 3 cosas más con append(), te das cuenta de que algo no cabe y lo quitas con remove(), y muestra la maleta final y cuántas cosas llevas.",
  },
  p6s3: {
    titulo: "Analista de palabras",
    descripcion:
      "Crea una lista con los nombres de las personas de tu familia y amigos (mínimo 6). Recórrela con for y cuenta cuántos nombres tienen más de 5 letras (pista: len() también funciona con textos). Muestra el resultado.",
  },
  p6s4: {
    titulo: "Mi top de películas",
    descripcion:
      "Haz un mini gestor de tu top de películas o series: una lista inicial con 3, un menú que pregunte si quieres agregar otra o ver la lista, y que muestre el top numerado (1., 2., 3.…) al final.",
  },

  // Periodo 7 — Funciones
  p7s1: {
    titulo: "Saludo automático",
    descripcion:
      "Define una función saludar() que imprima un saludo de 3 líneas con tu estilo (emojis, decoración…). Llámala 3 veces seguidas y observa cómo la función te ahorra repetir código. Agrega otra función despedir() y úsala al final.",
  },
  p7s2: {
    titulo: "Fábrica de carteles",
    descripcion:
      "Crea una función cartel(nombre) que imprima un cartel decorado con el nombre que reciba como parámetro. Llámala con los nombres de 3 personas de tu casa y regálales su cartel.",
  },
  p7s3: {
    titulo: "Conversor de horas",
    descripcion:
      "Escribe una función a_minutos(horas) que RETORNE (con return, no print) cuántos minutos son. Úsala para mostrar cuántos minutos duran: una clase de LuckSoft (1.5 horas), una noche de sueño (8 horas) y tu película favorita.",
  },
  p7s4: {
    titulo: "Mi mini centro de cálculo",
    descripcion:
      "Construye un programa con menú que ofrezca 2 herramientas, cada una en su propia función con return: «doble de un número» y «mitad de un número». El menú pregunta cuál usar, pide el número y muestra el resultado.",
  },

  // Periodo 8 — Juegos en Consola
  p8s1: {
    titulo: "El dado de las decisiones",
    descripcion:
      "Crea un programa que decida por ti: haz una lista con 5 opciones de merienda (o de qué hacer el fin de semana) y usa random.choice() para que Python elija una. Agrégale un random.randint(1, 6) que lance un dado de propina.",
  },
  p8s2: {
    titulo: "Adivina mi número, en familia",
    descripcion:
      "Programa el juego de adivinar un número del 1 al 10 (elegido con random.randint) con máximo 3 intentos, diciendo si el número secreto es mayor o menor. Reta a alguien de tu casa a jugarlo.",
  },
  p8s3: {
    titulo: "Cara o sello",
    descripcion:
      'Simula una moneda con random.choice(["cara", "sello"]). El jugador elige, la moneda se lanza y se juega al mejor de 5 rondas llevando marcador con acumuladores. Al final muestra quién ganó: tú o Python.',
  },
  p8s4: {
    titulo: "Torneo de Piedra, Papel o Tijera",
    descripcion:
      "Mejora tu juego de la clase: que se juegue al mejor de 5 rondas, con marcador y un mensaje final personalizado según quién gane. Organiza un torneo en tu casa y anota quién fue el campeón.",
  },

  // Periodo 9 — Pensar como un Desarrollador
  p9s1: {
    titulo: "El plano de mi programa",
    descripcion:
      "Piensa en un programa que te gustaría crear y escríbelo como un plano: en comentarios (#), lista los pasos y subproblemas en orden. Luego programa SOLO los 2 primeros pasos. Descomponer antes de programar es de desarrolladores pro.",
  },
  p9s2: {
    titulo: "Operación orden",
    descripcion:
      "Toma un programa que hayas hecho antes (el que quieras) y refactorízalo: organízalo en al menos 2 funciones con nombres claros, ponle comentarios a cada parte y verifica que siga funcionando igual que antes.",
  },
  p9s3: {
    titulo: "Caja de herramientas de listas",
    descripcion:
      "Crea una función mayor_de(numeros) que reciba una lista y devuelva el número más grande (recorriéndola con for, sin usar max()). Pruébala con 2 listas distintas y muestra los resultados.",
  },
  p9s4: {
    titulo: "Trivia de tu familia",
    descripcion:
      "Crea una trivia de 5 preguntas sobre tu familia (¿cuál es la comida favorita de mamá?…) con las preguntas y respuestas en listas, puntaje con acumulador y reporte final. Haz que alguien de tu casa la juegue.",
  },

  // Periodo 10 — Proyecto Final
  p10s1: {
    titulo: "Vende tu idea",
    descripcion:
      "Termina el plan de tu proyecto final: en comentarios escribe el objetivo, las 3 funciones principales y qué datos usará. Luego preséntale la idea a alguien de tu casa en 1 minuto y anota (en un comentario) qué opinó.",
  },
  p10s2: {
    titulo: "Sesión de avance en casa",
    descripcion:
      "Avanza tu proyecto final: programa 1 función más de tu plan y pruébala varias veces. Si algo se atasca, escribe en un comentario qué intentaste — eso le servirá al profe para ayudarte en la próxima clase.",
  },
  p10s3: {
    titulo: "Tester en casa",
    descripcion:
      "Pide a alguien de tu casa que use tu proyecto e intente «romperlo» (escribir cosas raras, respuestas inesperadas…). Anota en comentarios 2 cosas por mejorar que hayan encontrado y arregla al menos 1.",
  },
  p10s4: {
    titulo: "Ensayo general",
    descripcion:
      "Ensaya tu presentación final frente a tu familia: qué hace tu programa, cómo lo construiste y una demostración en vivo. Escribe en comentarios las 3 ideas más importantes que dirás. ¡A brillar en la presentación! 🌟",
  },
};
