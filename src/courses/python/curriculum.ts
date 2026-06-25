import type {
  BloqueAgenda,
  Curriculum,
  PeriodoContenido,
} from "@/domain/models/curriculum";

/*
 * Currículo gamificado del curso de Python: 10 periodos × 4 sesiones de 90 min.
 * Estructura fija de cada periodo:
 *   S1 introducción · S2 práctica guiada · S3 retos · S4 misión final (proyecto).
 * Metodología 70% práctica / 20% guiada / 10% teoría; las agendas reparten los
 * 90 minutos con ese criterio. Cada periodo desbloquea una insignia y otorga XP.
 *
 * Los constructores de agenda fijan el reparto de tiempo (suma 90) y solo varían
 * los textos, para mantener la metodología coherente en todo el curso.
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
  titulo: "Descubriendo la Programación",
  descripcion:
    "Primer contacto con el código: qué es un algoritmo, qué es Python y cómo dar tus primeras órdenes a la computadora con print().",
  proyecto: "Mi Tarjeta de Presentación Digital",
  insignia: { emoji: "🧭", nombre: "Explorador del Código" },
  xp: 200,
  sesiones: [
    {
      numero: 1,
      titulo: "El mapa del programador",
      tipo: "introduccion",
      nivel: "principiante",
      objetivo:
        "Entender qué es un algoritmo y escribir tu primer programa en Python que muestra texto en pantalla.",
      conceptos: [
        "Algoritmo: pasos ordenados para resolver un problema",
        "Qué es Python y para qué se usa",
        "El compilador/editor integrado de LuckSoft",
        "La función print()",
      ],
      agenda: agendaIntro(
        "Dinámica 'robot humano': un alumno da instrucciones paso a paso para que el profe haga un sándwich. Se descubre qué es un algoritmo.",
        "¿Qué es Python? Por qué es popular. Recorrido por el editor: dónde escribir, botón Ejecutar y consola.",
        "Todos escriben y ejecutan print('Hola, mundo') y luego su nombre. Vemos cómo aparece en la consola.",
        "Retos cortos para imprimir varias líneas y un dibujo de texto.",
        "Cada quien imprime una frase que lo represente y la comparte.",
      ),
      ejercicios: [
        "Imprime 'Hola, mundo' y ejecútalo.",
        "Imprime tu nombre y tu edad en dos líneas separadas.",
        "Escribe un algoritmo en español (en comentarios) para lavarse los dientes.",
      ],
      retos: [
        {
          titulo: "Triple saludo",
          nivel: "principiante",
          consigna:
            "Imprime tres líneas: un saludo, tu color favorito y tu comida favorita.",
        },
        {
          titulo: "Arte ASCII",
          nivel: "principiante",
          consigna:
            "Usando varios print(), dibuja una carita feliz :) con símbolos.",
        },
        {
          titulo: "El algoritmo del día",
          nivel: "principiante",
          consigna:
            "Describe con print() los 5 pasos de tu rutina para llegar al colegio.",
        },
      ],
      cierre: {
        titulo: "Misión: Tu primera huella",
        descripcion:
          "Crea un programa que imprima un mini cartel con tu nombre rodeado de símbolos (***). Ejecútalo sin errores.",
      },
      evaluacion: [
        "El programa se ejecuta sin errores.",
        "Usa print() correctamente con comillas.",
        "Comprende la idea de algoritmo (lo explica con sus palabras).",
      ],
      recomendaciones: [
        "Empieza con la dinámica desconectada (sin computador) para enganchar.",
        "Celebra el primer 'Hola, mundo' de cada estudiante: es un momento clave.",
        "No corrijas la sintaxis antes de tiempo; deja que vean el error y lo lean.",
      ],
      recompensa: "+40 XP · Logro 'Primer Hola, mundo'",
    },
    {
      numero: 2,
      titulo: "Hablando con la consola",
      tipo: "practica",
      nivel: "principiante",
      objetivo:
        "Dominar print() con varios mensajes y aprender a documentar el código con comentarios.",
      conceptos: [
        "print() con varios argumentos",
        "Comentarios con #",
        "Líneas en blanco y orden del código",
      ],
      agenda: agendaPractica(
        "Repaso relámpago: ¿qué hace print()? Cada quien dice un ejemplo.",
        "El profe muestra print('a', 'b') y comentarios #; se ve qué se ejecuta y qué no.",
        "Construyen juntos un 'menú de heladería' con varias líneas y comentarios que explican cada parte.",
        "Mini retos para añadir comentarios y reordenar líneas.",
        "Documentar con comentarios el programa de la sesión anterior.",
      ),
      ejercicios: [
        "Imprime una lista de compras (4 productos), uno por línea.",
        "Añade un comentario que explique qué hace tu programa.",
        "Usa print() con varias palabras separadas por comas.",
      ],
      retos: [
        {
          titulo: "Menú del restaurante",
          nivel: "principiante",
          consigna: "Imprime un menú con título y 3 platos con su precio.",
        },
        {
          titulo: "Comentarios espías",
          nivel: "principiante",
          consigna:
            "Toma un programa y añade un comentario por cada línea explicando qué hace.",
        },
        {
          titulo: "Escalera de texto",
          nivel: "intermedio",
          consigna:
            "Imprime una escalera: cada línea con un # más que la anterior (5 escalones).",
        },
      ],
      cierre: {
        titulo: "Misión: Mi póster",
        descripcion:
          "Diseña con print() un póster de tu serie/juego favorito (título, una frase y un dibujo ASCII), comentado.",
      },
      evaluacion: [
        "Usa al menos un comentario útil.",
        "El texto sale ordenado y como se esperaba.",
        "Diferencia código de comentario.",
      ],
      recomendaciones: [
        "Refuerza que los comentarios son para humanos, no para la máquina.",
        "Permite temas libres (juegos, música) para mantener la motivación.",
      ],
      recompensa: "+50 XP · Logro 'Código Comentado'",
    },
    {
      numero: 3,
      titulo: "Cazadores de errores",
      tipo: "retos",
      nivel: "principiante",
      objetivo:
        "Reconocer y corregir errores básicos leyendo los mensajes de la consola.",
      conceptos: [
        "Errores de sintaxis (comillas, paréntesis)",
        "Leer el mensaje de error",
        "Depuración: probar y corregir",
      ],
      agenda: agendaRetos(
        "Juego '¿se ejecuta o no?': el profe muestra líneas y el grupo vota.",
        "Cómo leer un SyntaxError: qué línea y qué pista da.",
        "Serie de programas con errores que el estudiante debe arreglar, de menos a más difícil.",
        "Crear a propósito un error y explicárselo a un compañero.",
      ),
      ejercicios: [
        "Arregla print('Hola) (falta una comilla).",
        "Arregla print Hola (faltan paréntesis y comillas).",
        "Encuentra el error en un programa de 3 líneas dado por el profe.",
      ],
      retos: [
        {
          titulo: "Hospital de código",
          nivel: "principiante",
          consigna:
            "Recibe 3 programas 'enfermos' (con errores) y cúralos hasta que ejecuten.",
        },
        {
          titulo: "Detective de comillas",
          nivel: "principiante",
          consigna:
            "En un texto con varios print(), encuentra el único que tiene un error.",
        },
        {
          titulo: "Trampa para tu compañero",
          nivel: "intermedio",
          consigna:
            "Escribe un programa correcto, introdúcele 1 error y rétalo a encontrarlo.",
        },
        {
          titulo: "El error invisible",
          nivel: "intermedio",
          consigna:
            "Arregla un programa que mezcla mayúsculas en Print() y comillas distintas.",
        },
      ],
      cierre: {
        titulo: "Misión: Clínica de bugs",
        descripcion:
          "Corrige una tanda final de 4 errores variados y deja todos los programas ejecutando.",
      },
      evaluacion: [
        "Identifica el tipo de error a partir del mensaje.",
        "Corrige sin ayuda al menos 3 de 4 programas.",
        "Mantiene la calma ante los errores (actitud de depuración).",
      ],
      recomendaciones: [
        "Normaliza el error: 'equivocarse es parte de programar'.",
        "Enseña a leer SIEMPRE la última línea del mensaje primero.",
      ],
      recompensa: "+50 XP · Trofeo 'Cazador de Bugs'",
    },
    {
      numero: 4,
      titulo: "Misión Final: Tarjeta de Presentación Digital",
      tipo: "mision",
      nivel: "principiante",
      objetivo:
        "Integrar print() y comentarios para crear una tarjeta de presentación personal y presentarla.",
      conceptos: [
        "Integración de print() y comentarios",
        "Diseño con texto (ASCII)",
        "Presentar el propio trabajo",
      ],
      agenda: agendaMision(
        "Bocetar en papel la tarjeta: nombre, apodo, hobby, frase y un dibujo.",
        "Programar la tarjeta con varios print(), bordes de símbolos y comentarios por sección.",
        "Probar que ejecuta sin errores y mejorar el diseño (alineación, marco).",
        "Cada estudiante presenta su tarjeta a la clase.",
      ),
      ejercicios: [
        "Imprime un marco con símbolos alrededor de tu nombre.",
        "Añade una sección 'Sobre mí' con 3 datos.",
        "Comenta cada sección del programa.",
      ],
      retos: [
        {
          titulo: "Marco perfecto",
          nivel: "principiante",
          consigna:
            "Logra que el marco de símbolos quede del mismo ancho en todas las líneas.",
        },
        {
          titulo: "Tarjeta con logo",
          nivel: "intermedio",
          consigna:
            "Incluye un pequeño dibujo ASCII que te represente (animal, símbolo, etc.).",
        },
        {
          titulo: "Doble idioma",
          nivel: "intermedio",
          consigna: "Muestra tu frase favorita en español y en inglés.",
        },
      ],
      cierre: {
        titulo: "Proyecto: Tarjeta de Presentación Digital",
        descripcion:
          "Programa terminado con nombre, datos personales, una frase y un diseño ASCII, todo comentado y sin errores. ¡Preséntalo!",
      },
      evaluacion: [
        "La tarjeta incluye nombre, al menos 3 datos y un diseño.",
        "El código está comentado y ejecuta sin errores.",
        "Presenta su trabajo explicando qué hizo.",
      ],
      recomendaciones: [
        "Dale valor a la creatividad, no solo a que 'funcione'.",
        "Haz una galería: que vean los trabajos de los demás motiva mucho.",
      ],
      recompensa: "+60 XP · 🧭 Insignia 'Explorador del Código' desbloqueada",
    },
  ],
};

const periodo2: PeriodoContenido = {
  numero: 2,
  titulo: "Variables y Datos",
  descripcion:
    "Guardar información en variables, distinguir tipos de datos (texto, números, booleanos) y leer datos del usuario con input().",
  proyecto: "Generador de Perfil Gamer",
  insignia: { emoji: "🎒", nombre: "Coleccionista de Datos" },
  xp: 220,
  sesiones: [
    {
      numero: 1,
      titulo: "Cajas con nombre",
      tipo: "introduccion",
      nivel: "principiante",
      objetivo:
        "Crear variables para guardar datos y usarlas dentro de print().",
      conceptos: [
        "Variable como 'caja' con nombre",
        "Asignación con =",
        "Strings, enteros y decimales",
      ],
      agenda: agendaIntro(
        "Analogía de los casilleros: cada casillero (variable) guarda algo y tiene una etiqueta (nombre).",
        "Cómo se crea una variable, reglas de nombres y los tipos básicos (texto, entero, decimal).",
        "Crear variables nombre, edad y altura, y mostrarlas en una frase con print().",
        "Mini retos cambiando el valor de las variables y observando el resultado.",
        "Crear 3 variables sobre uno mismo e imprimir una presentación.",
      ),
      ejercicios: [
        "Crea una variable juego y muéstrala.",
        "Guarda tu edad en una variable y úsala en una frase.",
        "Crea una variable decimal (por ejemplo, tu estatura).",
      ],
      retos: [
        {
          titulo: "Mi ficha",
          nivel: "principiante",
          consigna:
            "Crea variables nombre, edad y ciudad y muéstralas en una frase completa.",
        },
        {
          titulo: "Intercambio",
          nivel: "intermedio",
          consigna:
            "Con dos variables a y b, intercambia sus valores y muéstralos.",
        },
        {
          titulo: "Etiqueta correcta",
          nivel: "principiante",
          consigna:
            "Crea una variable de cada tipo (texto, entero, decimal) y di cuál es cuál en comentarios.",
        },
      ],
      cierre: {
        titulo: "Misión: Mi avatar",
        descripcion:
          "Define tu avatar con variables (nombre, nivel, vida, arma) e imprime su ficha.",
      },
      evaluacion: [
        "Crea y usa variables correctamente.",
        "Distingue texto de número.",
        "Las usa dentro de print().",
      ],
      recomendaciones: [
        "Usa nombres de variables con sentido (no a, b) para crear buen hábito.",
        "Relaciona variables con estadísticas de videojuegos: enganchan mucho.",
      ],
      recompensa: "+50 XP · Logro 'Primera Variable'",
    },
    {
      numero: 2,
      titulo: "La computadora pregunta",
      tipo: "practica",
      nivel: "principiante",
      objetivo:
        "Usar input() para que el programa lea datos del usuario y responda con ellos.",
      conceptos: [
        "input() para leer texto",
        "Guardar lo leído en una variable",
        "Combinar input() con print()",
      ],
      agenda: agendaPractica(
        "Repaso de variables con un ejemplo en vivo.",
        "Demo: pedir el nombre con input() y saludar a esa persona.",
        "Construyen un 'formulario' que pregunta nombre, edad y color favorito y los repite.",
        "Mini retos personalizando las preguntas y respuestas.",
        "Programa que entrevista al usuario y devuelve un resumen.",
      ),
      ejercicios: [
        "Pide el nombre y saluda a la persona.",
        "Pregunta el juego favorito y responde con una frase.",
        "Pide dos datos y muéstralos juntos.",
      ],
      retos: [
        {
          titulo: "Recepcionista",
          nivel: "principiante",
          consigna:
            "Pregunta nombre y ciudad y da una bienvenida personalizada.",
        },
        {
          titulo: "Mi mascota virtual",
          nivel: "intermedio",
          consigna:
            "Pregunta el nombre y tipo de mascota y crea una frase presentándola.",
        },
        {
          titulo: "Entrevista exprés",
          nivel: "intermedio",
          consigna:
            "Haz 4 preguntas y al final muestra una 'tarjeta' con todas las respuestas.",
        },
      ],
      cierre: {
        titulo: "Misión: El adivino",
        descripcion:
          "Pide 3 datos al usuario y muestra una frase divertida que los combine.",
      },
      evaluacion: [
        "Usa input() y guarda el resultado en variables.",
        "Combina la entrada con print() correctamente.",
        "El programa interactúa de forma clara.",
      ],
      recomendaciones: [
        "Recuerda que input() siempre devuelve texto (lo veremos en la próxima sesión).",
        "Haz que prueben su programa con datos de un compañero: lo hace real.",
      ],
      recompensa: "+50 XP · Logro 'Programa Interactivo'",
    },
    {
      numero: 3,
      titulo: "Transformando datos",
      tipo: "retos",
      nivel: "intermedio",
      objetivo:
        "Convertir entre tipos con int(), float() y str(), y usar booleanos.",
      conceptos: [
        "Conversión de tipos: int(), float(), str()",
        "Por qué input() devuelve texto",
        "Booleanos: True / False",
      ],
      agenda: agendaRetos(
        "¿Por qué '5' + '5' da '55'? Provocamos el bug y lo discutimos.",
        "Demo de int(input()) para sumar dos números de verdad.",
        "Retos que obligan a convertir tipos para que las operaciones funcionen.",
        "Crear un mini programa que sume dos edades introducidas por el usuario.",
      ),
      ejercicios: [
        "Pide un número con input() y conviértelo con int().",
        "Suma dos números introducidos por el usuario.",
        "Crea una variable booleana y muéstrala.",
      ],
      retos: [
        {
          titulo: "Sumadora real",
          nivel: "intermedio",
          consigna: "Pide dos números y muestra su suma correcta (no '55').",
        },
        {
          titulo: "¿Eres mayor de edad?",
          nivel: "intermedio",
          consigna:
            "Pide la edad y muestra un booleano que indique si es mayor de 18.",
        },
        {
          titulo: "Conversor de billetes",
          nivel: "intermedio",
          consigna:
            "Pide una cantidad y conviértela de texto a número para multiplicarla por 1000.",
        },
        {
          titulo: "Texto y número",
          nivel: "avanzado",
          consigna:
            "Combina un número convertido a texto con str() dentro de un mensaje.",
        },
      ],
      cierre: {
        titulo: "Misión: Convertidor mágico",
        descripcion:
          "Crea un programa que pida un número, lo convierta y muestre su doble y su mitad.",
      },
      evaluacion: [
        "Convierte correctamente con int()/float()/str().",
        "Explica por qué hace falta convertir.",
        "Las operaciones dan el resultado esperado.",
      ],
      recomendaciones: [
        "El error '55' es un momento de oro para enseñar: provócalo a propósito.",
        "Conecta booleanos con preguntas de sí/no de la vida real.",
      ],
      recompensa: "+60 XP · Trofeo 'Transformador de Datos'",
    },
    {
      numero: 4,
      titulo: "Misión Final: Generador de Perfil Gamer",
      tipo: "mision",
      nivel: "intermedio",
      objetivo:
        "Crear un programa que arme el perfil gamer del usuario combinando input(), variables y conversiones.",
      conceptos: [
        "Integración de input(), variables y tipos",
        "Diseño de una salida atractiva",
        "Validar que los datos tengan sentido",
      ],
      agenda: agendaMision(
        "Decidir qué datos pedirá el perfil (nick, edad, juego favorito, horas jugadas, nivel).",
        "Programar las preguntas, convertir los números y armar la ficha del perfil.",
        "Probar con varios usuarios y mejorar el diseño de la ficha.",
        "Presentar el generador y crear el perfil de un compañero en vivo.",
      ),
      ejercicios: [
        "Pide el nick y el juego favorito.",
        "Pide las horas jugadas y conviértelas a número.",
        "Muestra una ficha con todos los datos.",
      ],
      retos: [
        {
          titulo: "Rango automático",
          nivel: "intermedio",
          consigna:
            "Según las horas jugadas, muestra un texto de rango (Novato/Pro) usando un booleano.",
        },
        {
          titulo: "Ficha con marco",
          nivel: "intermedio",
          consigna:
            "Presenta el perfil dentro de un marco ASCII bien alineado.",
        },
        {
          titulo: "Estadística extra",
          nivel: "avanzado",
          consigna:
            "Calcula y muestra cuántos días en total ha jugado (horas / 24).",
        },
      ],
      cierre: {
        titulo: "Proyecto: Generador de Perfil Gamer",
        descripcion:
          "Programa que entrevista al usuario y genera una ficha de perfil gamer completa, con números convertidos y diseño cuidado.",
      },
      evaluacion: [
        "Usa input(), variables y al menos una conversión.",
        "La ficha final es clara y completa.",
        "El programa funciona con distintos usuarios.",
      ],
      recomendaciones: [
        "Deja que personalicen los campos: identidad = motivación.",
        "Anima a probar el programa con datos extremos para ver si aguanta.",
      ],
      recompensa: "+60 XP · 🎒 Insignia 'Coleccionista de Datos' desbloqueada",
    },
  ],
};

const periodo3: PeriodoContenido = {
  numero: 3,
  titulo: "Matemáticas y Operadores",
  descripcion:
    "Hacer cálculos con Python: operadores aritméticos, potencias, módulo y construcción de fórmulas útiles.",
  proyecto: "Calculadora Inteligente",
  insignia: { emoji: "🧮", nombre: "Mago de los Números" },
  xp: 240,
  sesiones: [
    {
      numero: 1,
      titulo: "Python, tu calculadora",
      tipo: "introduccion",
      nivel: "principiante",
      objetivo:
        "Usar los operadores aritméticos básicos para hacer cálculos y mostrar resultados.",
      conceptos: [
        "Operadores + - * /",
        "Orden de operaciones (paréntesis)",
        "Mostrar resultados con print()",
      ],
      agenda: agendaIntro(
        "Reto mental: calcular cuántos minutos hay en un día. Lo comprobamos con Python.",
        "Operadores aritméticos y prioridad; el papel de los paréntesis.",
        "Calculan juntos áreas, totales de compra y promedios sencillos.",
        "Mini retos de cálculo con datos pedidos al usuario.",
        "Programa que calcula cuántos segundos has vivido.",
      ),
      ejercicios: [
        "Calcula 7 * 8 y muéstralo.",
        "Pide dos números y muestra su suma y su resta.",
        "Calcula el promedio de tres notas.",
      ],
      retos: [
        {
          titulo: "Carrito de compras",
          nivel: "principiante",
          consigna: "Pide precio y cantidad de un producto y muestra el total.",
        },
        {
          titulo: "Área del rectángulo",
          nivel: "principiante",
          consigna: "Pide base y altura y calcula el área.",
        },
        {
          titulo: "Promedio de notas",
          nivel: "intermedio",
          consigna: "Pide 3 notas y muestra el promedio con un decimal.",
        },
      ],
      cierre: {
        titulo: "Misión: Segundos de vida",
        descripcion:
          "Pide la edad del usuario y calcula aproximadamente cuántos segundos ha vivido.",
      },
      evaluacion: [
        "Usa los operadores correctamente.",
        "Respeta el orden de operaciones.",
        "Los resultados son correctos.",
      ],
      recomendaciones: [
        "Parte de problemas cotidianos (compras, tiempo) para dar sentido a la matemática.",
        "Muestra el paréntesis como 'la regla para mandar' en el cálculo.",
      ],
      recompensa: "+55 XP · Logro 'Calculista'",
    },
    {
      numero: 2,
      titulo: "Potencias y residuos",
      tipo: "practica",
      nivel: "intermedio",
      objetivo:
        "Usar potencias (**) y el módulo (%) para resolver problemas concretos.",
      conceptos: [
        "Potencias con **",
        "Módulo % (residuo)",
        "División entera //",
      ],
      agenda: agendaPractica(
        "Repaso de operadores con un cálculo rápido.",
        "Demo: ** para potencias y % para saber si un número es par.",
        "Practican calculando cuadrados, cubos y detectando pares/impares.",
        "Mini retos con módulo (¿es múltiplo de? ¿qué hora será dentro de N horas?).",
        "Programa que dice si un número es par o impar.",
      ),
      ejercicios: [
        "Calcula 2 elevado a 10.",
        "Averigua el residuo de 17 entre 5.",
        "Comprueba si un número pedido es par usando %.",
      ],
      retos: [
        {
          titulo: "Par o impar",
          nivel: "intermedio",
          consigna: "Pide un número y muestra su residuo entre 2 (0 = par).",
        },
        {
          titulo: "Reloj de 24h",
          nivel: "intermedio",
          consigna:
            "Pide una hora y cuántas horas pasan; calcula la hora final con %.",
        },
        {
          titulo: "Potencias en cadena",
          nivel: "intermedio",
          consigna: "Muestra los cuadrados de 1 a 5 (calculados con **).",
        },
        {
          titulo: "Cambio de monedas",
          nivel: "avanzado",
          consigna:
            "Dado un total, usa // y % para saber cuántas monedas de 100 y de 50 caben.",
        },
      ],
      cierre: {
        titulo: "Misión: Detector de pares",
        descripcion:
          "Crea un programa que pida un número y diga si es par o impar usando el módulo.",
      },
      evaluacion: [
        "Usa ** y % correctamente.",
        "Interpreta el residuo (par/impar, múltiplos).",
        "Resuelve un problema real con módulo.",
      ],
      recomendaciones: [
        "El módulo cuesta: usa relojes y repartos para hacerlo visual.",
        "Conecta potencias con 'crecer muy rápido' (memes de duplicar).",
      ],
      recompensa: "+60 XP · Logro 'Maestro del Módulo'",
    },
    {
      numero: 3,
      titulo: "Constructor de fórmulas",
      tipo: "retos",
      nivel: "intermedio",
      objetivo:
        "Traducir problemas reales a fórmulas en Python combinando varios operadores.",
      conceptos: [
        "Construcción de fórmulas",
        "Combinar operadores",
        "Probar la fórmula con datos",
      ],
      agenda: agendaRetos(
        "De la frase a la fórmula: traducimos juntos 'el doble más tres'.",
        "Demo: fórmula del IMC o de descuento en una tienda.",
        "Retos que piden inventar y programar fórmulas (descuentos, conversores, propinas).",
        "Crear un conversor (km↔millas o °C↔°F) que funcione.",
      ),
      ejercicios: [
        "Programa la fórmula 'doble más tres' para un número dado.",
        "Calcula el 10% de descuento de un precio.",
        "Convierte grados Celsius a Fahrenheit.",
      ],
      retos: [
        {
          titulo: "Tienda con descuento",
          nivel: "intermedio",
          consigna: "Pide precio y % de descuento y muestra el precio final.",
        },
        {
          titulo: "Conversor de unidades",
          nivel: "intermedio",
          consigna: "Convierte kilómetros a millas (1 km = 0.621 millas).",
        },
        {
          titulo: "Propina justa",
          nivel: "intermedio",
          consigna:
            "Dado el total y el número de personas, calcula cuánto paga cada una con 10% de propina.",
        },
        {
          titulo: "Velocidad media",
          nivel: "avanzado",
          consigna: "Pide distancia y tiempo y calcula la velocidad media.",
        },
      ],
      cierre: {
        titulo: "Misión: Mi fórmula útil",
        descripcion:
          "Inventa una fórmula útil para tu vida (gasto semanal, puntos de un juego) y prográmala.",
      },
      evaluacion: [
        "Traduce el problema a una fórmula correcta.",
        "Combina operadores con buen orden.",
        "Prueba la fórmula con varios datos.",
      ],
      recomendaciones: [
        "Pide que primero escriban la fórmula en papel y luego la traduzcan.",
        "Valora las fórmulas que inventen ellos: fomenta la creatividad.",
      ],
      recompensa: "+60 XP · Trofeo 'Constructor de Fórmulas'",
    },
    {
      numero: 4,
      titulo: "Misión Final: Calculadora Inteligente",
      tipo: "mision",
      nivel: "intermedio",
      objetivo:
        "Construir una calculadora que pida dos números y muestre varias operaciones a la vez.",
      conceptos: [
        "Integración de operadores",
        "Salida organizada de resultados",
        "Casos especiales (dividir entre 0)",
      ],
      agenda: agendaMision(
        "Decidir qué operaciones tendrá la calculadora (+, -, *, /, **, %).",
        "Programar la lectura de dos números y mostrar todas las operaciones.",
        "Probar con números grandes y con cero; cuidar la división.",
        "Presentar la calculadora y retar a un compañero a romperla.",
      ),
      ejercicios: [
        "Pide dos números y muestra su suma y producto.",
        "Añade la potencia y el módulo a la salida.",
        "Muestra los resultados con etiquetas claras.",
      ],
      retos: [
        {
          titulo: "Reporte completo",
          nivel: "intermedio",
          consigna:
            "Muestra suma, resta, producto, división, potencia y módulo de dos números.",
        },
        {
          titulo: "Decimales bonitos",
          nivel: "avanzado",
          consigna: "Muestra la división con solo 2 decimales.",
        },
        {
          titulo: "Calculadora a prueba de cero",
          nivel: "avanzado",
          consigna:
            "Evita que el programa se rompa si el segundo número es 0 en la división (avísalo).",
        },
      ],
      cierre: {
        titulo: "Proyecto: Calculadora Inteligente",
        descripcion:
          "Calculadora que pide dos números y entrega un reporte ordenado con todas las operaciones, cuidando la división entre cero.",
      },
      evaluacion: [
        "Realiza correctamente todas las operaciones.",
        "La salida es ordenada y legible.",
        "Maneja el caso de dividir entre cero (sin romperse).",
      ],
      recomendaciones: [
        "El caso 'dividir entre 0' adelanta las decisiones del próximo periodo: aprovéchalo.",
        "Haz una mini competencia: ¿quién rompe la calculadora del otro?",
      ],
      recompensa: "+65 XP · 🧮 Insignia 'Mago de los Números' desbloqueada",
    },
  ],
};

const periodo4: PeriodoContenido = {
  numero: 4,
  titulo: "Decisiones",
  descripcion:
    "Que el programa elija qué hacer: comparaciones y condicionales con if, if-else y elif.",
  proyecto: "¿Qué superhéroe eres?",
  insignia: { emoji: "🦸", nombre: "Maestro de Decisiones" },
  xp: 260,
  sesiones: [
    {
      numero: 1,
      titulo: "Verdadero o falso",
      tipo: "introduccion",
      nivel: "intermedio",
      objetivo:
        "Usar comparaciones y la primera estructura if para tomar decisiones simples.",
      conceptos: [
        "Comparadores ==, !=, <, >, <=, >=",
        "La estructura if",
        "Indentación (sangría) en Python",
      ],
      agenda: agendaIntro(
        "Juego 'la frontera': el profe dice condiciones y los alumnos se mueven a un lado si son verdaderas.",
        "Comparadores y el if; la importancia de la sangría.",
        "Programan un 'control de edad' que solo saluda si la edad es mayor que 12.",
        "Mini retos con una sola condición.",
        "Programa que dice 'aprobado' si la nota es 3 o más.",
      ),
      ejercicios: [
        "Compara dos números y muestra True/False.",
        "Si un número es mayor que 10, muestra un mensaje.",
        "Si la edad es mayor o igual a 18, di 'mayor de edad'.",
      ],
      retos: [
        {
          titulo: "Control de acceso",
          nivel: "intermedio",
          consigna:
            "Pide la edad y muestra 'Puedes entrar' solo si es mayor de 12.",
        },
        {
          titulo: "¿Aprobaste?",
          nivel: "intermedio",
          consigna: "Pide una nota y muestra 'Aprobado' si es 3 o más.",
        },
        {
          titulo: "Número positivo",
          nivel: "intermedio",
          consigna: "Pide un número y avisa si es positivo.",
        },
      ],
      cierre: {
        titulo: "Misión: El portero",
        descripcion:
          "Crea un portero que pida una contraseña y solo deje pasar si es la correcta.",
      },
      evaluacion: [
        "Escribe comparaciones correctas.",
        "Usa if con la sangría adecuada.",
        "La decisión funciona según la condición.",
      ],
      recomendaciones: [
        "La sangría es el error #1: insiste con calma y muéstrala como 'lo que está dentro del if'.",
        "La dinámica corporal ayuda muchísimo a entender verdadero/falso.",
      ],
      recompensa: "+60 XP · Logro 'Primera Decisión'",
    },
    {
      numero: 2,
      titulo: "Este sí, este no",
      tipo: "practica",
      nivel: "intermedio",
      objetivo:
        "Usar if-else para responder de dos formas distintas según la condición.",
      conceptos: ["if-else", "Caminos alternativos", "Probar ambos casos"],
      agenda: agendaPractica(
        "Repaso del if con un ejemplo rápido.",
        "Demo de if-else: par o impar respondiendo de dos maneras.",
        "Programan un 'adivina si llueve', un 'mayor de edad/menor' y un 'pasa/no pasa'.",
        "Mini retos asegurando que ambos caminos funcionen.",
        "Programa que dice si un número es par o impar con if-else.",
      ),
      ejercicios: [
        "Si un número es par di 'par', si no 'impar'.",
        "Si la nota es 3 o más di 'aprobado', si no 'reprobado'.",
        "Si la edad es mayor de 18, 'adulto'; si no, 'menor'.",
      ],
      retos: [
        {
          titulo: "Par o impar 2.0",
          nivel: "intermedio",
          consigna: "Pide un número y responde 'par' o 'impar' con if-else.",
        },
        {
          titulo: "Mayor de dos",
          nivel: "intermedio",
          consigna: "Pide dos números y muestra cuál es el mayor.",
        },
        {
          titulo: "Login",
          nivel: "intermedio",
          consigna:
            "Pide usuario y contraseña y muestra 'acceso permitido' o 'denegado'.",
        },
        {
          titulo: "Descuento VIP",
          nivel: "avanzado",
          consigna:
            "Si la compra supera 100, aplica 10% de descuento; si no, no.",
        },
      ],
      cierre: {
        titulo: "Misión: ¿Puedo ver la peli?",
        descripcion:
          "Pide la edad y la clasificación de una película y decide si la persona puede verla.",
      },
      evaluacion: [
        "Usa if-else correctamente.",
        "Prueba que ambos caminos funcionan.",
        "El mensaje corresponde a cada caso.",
      ],
      recomendaciones: [
        "Haz que prueben SIEMPRE los dos casos antes de darlo por bueno.",
        "Usa ejemplos con los que se identifiquen (películas, juegos, acceso).",
      ],
      recompensa: "+60 XP · Logro 'Dos Caminos'",
    },
    {
      numero: 3,
      titulo: "Muchos caminos: elif",
      tipo: "retos",
      nivel: "intermedio",
      objetivo:
        "Encadenar varias condiciones con elif para manejar más de dos opciones.",
      conceptos: ["elif", "Orden de las condiciones", "Rangos de valores"],
      agenda: agendaRetos(
        "Reto: clasificar una nota en A/B/C/D. ¿Con if-else basta? Surge elif.",
        "Demo de if-elif-else con un sistema de calificaciones.",
        "Retos de clasificación: notas, edades por etapa, signos del zodiaco, etc.",
        "Crear un clasificador de notas en letras que funcione para todos los rangos.",
      ),
      ejercicios: [
        "Clasifica una nota en 'alto/medio/bajo'.",
        "Según la edad, di si es niño, joven o adulto.",
        "Dado un número, di si es negativo, cero o positivo.",
      ],
      retos: [
        {
          titulo: "Boletín de notas",
          nivel: "intermedio",
          consigna:
            "Convierte una nota (0–5) en letra: A, B, C o D según rangos.",
        },
        {
          titulo: "Etapas de la vida",
          nivel: "intermedio",
          consigna:
            "Según la edad, clasifica en bebé, niño, joven, adulto o mayor.",
        },
        {
          titulo: "Semáforo",
          nivel: "intermedio",
          consigna: "Según un color (rojo/amarillo/verde), indica qué hacer.",
        },
        {
          titulo: "Calculadora con menú",
          nivel: "avanzado",
          consigna:
            "Pide dos números y una operación (+,-,*,/) y usa elif para ejecutar la elegida.",
        },
      ],
      cierre: {
        titulo: "Misión: Clasificador inteligente",
        descripcion:
          "Crea un clasificador (de notas, edades o lo que elijas) con al menos 4 caminos usando elif.",
      },
      evaluacion: [
        "Usa elif para 3 o más opciones.",
        "Ordena bien las condiciones (sin huecos ni solapes).",
        "Cubre todos los casos posibles.",
      ],
      recomendaciones: [
        "Muestra cómo el orden de los elif cambia el resultado: es un gran 'aha'.",
        "La 'calculadora con menú' une todo lo del periodo: úsala como reto estrella.",
      ],
      recompensa: "+65 XP · Trofeo 'Clasificador Maestro'",
    },
    {
      numero: 4,
      titulo: "Misión Final: ¿Qué superhéroe eres?",
      tipo: "mision",
      nivel: "intermedio",
      objetivo:
        "Crear un test de personalidad que, según las respuestas, asigne un superhéroe usando condicionales.",
      conceptos: [
        "Integración de if/elif/else",
        "Sistema de puntos simple",
        "Decisión final según el puntaje",
      ],
      agenda: agendaMision(
        "Diseñar 3–4 preguntas y qué superhéroe corresponde a cada perfil.",
        "Programar las preguntas, sumar puntos según respuestas y decidir el héroe con elif.",
        "Probar respondiendo distinto para verificar que salen varios héroes.",
        "Presentar el test y dejar que la clase lo responda.",
      ),
      ejercicios: [
        "Haz una pregunta y suma puntos según la respuesta.",
        "Con el puntaje, asigna un héroe usando elif.",
        "Muestra el resultado con una descripción.",
      ],
      retos: [
        {
          titulo: "Más preguntas",
          nivel: "intermedio",
          consigna: "Amplía el test a 4 preguntas que sumen puntos.",
        },
        {
          titulo: "Héroe secreto",
          nivel: "avanzado",
          consigna:
            "Añade un héroe 'oculto' que solo aparece con una combinación especial.",
        },
        {
          titulo: "Resultado con estilo",
          nivel: "intermedio",
          consigna:
            "Presenta el resultado con un marco ASCII y la descripción del héroe.",
        },
      ],
      cierre: {
        titulo: "Proyecto: ¿Qué superhéroe eres?",
        descripcion:
          "Test interactivo que hace preguntas, lleva un puntaje y asigna un superhéroe con if/elif/else. ¡Que la clase lo juegue!",
      },
      evaluacion: [
        "Usa condicionales para decidir el resultado.",
        "El test da resultados distintos según las respuestas.",
        "La presentación del resultado es atractiva.",
      ],
      recomendaciones: [
        "Deja libertad temática (superhéroes, casas de Hogwarts, animales): sube la motivación.",
        "Sugiere probar todos los caminos para que ningún héroe quede 'inalcanzable'.",
      ],
      recompensa: "+75 XP · 🦸 Insignia 'Maestro de Decisiones' desbloqueada",
    },
  ],
};

const periodo5: PeriodoContenido = {
  numero: 5,
  titulo: "Repeticiones",
  descripcion:
    "Hacer que el programa repita tareas sin reescribir código: bucles while y for, range(), contadores y acumuladores.",
  proyecto: "Generador de Patrones y Tablas",
  insignia: { emoji: "🔁", nombre: "Señor de los Bucles" },
  xp: 280,
  sesiones: [
    {
      numero: 1,
      titulo: "Repite mientras...",
      tipo: "introduccion",
      nivel: "intermedio",
      objetivo:
        "Usar el bucle while para repetir acciones mientras se cumpla una condición.",
      conceptos: [
        "Bucle while",
        "Condición de parada",
        "Peligro del bucle infinito",
      ],
      agenda: agendaIntro(
        "Juego 'sigue aplaudiendo hasta que diga basta': introducción a repetir con condición.",
        "Cómo funciona while y por qué hay que cambiar la condición (evitar bucle infinito).",
        "Programan una cuenta regresiva del 5 al 1 con while.",
        "Mini retos modificando la condición de parada.",
        "Programa que imprime los números del 1 al 10 con while.",
      ),
      ejercicios: [
        "Imprime del 1 al 5 con while.",
        "Haz una cuenta regresiva del 10 al 1.",
        "Repite un mensaje 3 veces con un contador.",
      ],
      retos: [
        {
          titulo: "Cuenta regresiva",
          nivel: "intermedio",
          consigna:
            "Pide un número y haz la cuenta regresiva desde él hasta 0.",
        },
        {
          titulo: "Eco controlado",
          nivel: "intermedio",
          consigna: "Repite un mensaje las veces que pida el usuario.",
        },
        {
          titulo: "Suma hasta N",
          nivel: "avanzado",
          consigna: "Usa while para sumar los números del 1 al N.",
        },
      ],
      cierre: {
        titulo: "Misión: Lanzamiento de cohete",
        descripcion:
          "Haz una cuenta regresiva desde 10 que termine con '¡Despegue!' usando while.",
      },
      evaluacion: [
        "Escribe un while con condición de parada correcta.",
        "Evita el bucle infinito.",
        "El bucle repite el número de veces esperado.",
      ],
      recomendaciones: [
        "Provoca un bucle infinito controlado para que vean el peligro (y cómo detenerlo).",
        "Dibuja en el tablero cómo cambia el contador en cada vuelta.",
      ],
      recompensa: "+60 XP · Logro 'Primer Bucle'",
    },
    {
      numero: 2,
      titulo: "Recorriendo con for y range",
      tipo: "practica",
      nivel: "intermedio",
      objetivo:
        "Usar for con range() para repetir un número exacto de veces de forma sencilla.",
      conceptos: ["Bucle for", "range(inicio, fin, paso)", "for vs while"],
      agenda: agendaPractica(
        "Repaso de while y comparación con la idea de for.",
        "Demo de for con range(): contar, saltar de 2 en 2, ir al revés.",
        "Practican tablas de multiplicar y secuencias con for.",
        "Mini retos jugando con los parámetros de range().",
        "Programa que imprime la tabla del número que elija el usuario.",
      ),
      ejercicios: [
        "Imprime del 1 al 10 con for.",
        "Imprime los pares del 2 al 20 con range.",
        "Cuenta del 10 al 1 con for.",
      ],
      retos: [
        {
          titulo: "Tabla de multiplicar",
          nivel: "intermedio",
          consigna: "Pide un número e imprime su tabla del 1 al 10.",
        },
        {
          titulo: "Saltos de canguro",
          nivel: "intermedio",
          consigna: "Imprime de 0 a 50 saltando de 5 en 5.",
        },
        {
          titulo: "Cuenta atrás con for",
          nivel: "intermedio",
          consigna: "Imprime del 20 al 1 usando range con paso negativo.",
        },
        {
          titulo: "Escalera con bucle",
          nivel: "avanzado",
          consigna:
            "Imprime una escalera de asteriscos usando un for (1 a 5 asteriscos).",
        },
      ],
      cierre: {
        titulo: "Misión: Tablas a la carta",
        descripcion:
          "Crea un programa que imprima la tabla de multiplicar del número que pida el usuario.",
      },
      evaluacion: [
        "Usa for y range() correctamente.",
        "Controla inicio, fin y paso.",
        "Elige for cuando sabe cuántas veces repetir.",
      ],
      recomendaciones: [
        "Aclara que range(1, 11) llega hasta 10: es una confusión clásica.",
        "Las tablas de multiplicar dan logros rápidos y visibles.",
      ],
      recompensa: "+65 XP · Logro 'Maestro del for'",
    },
    {
      numero: 3,
      titulo: "Contadores y acumuladores",
      tipo: "retos",
      nivel: "avanzado",
      objetivo:
        "Usar variables que cuentan y que acumulan dentro de un bucle para calcular totales y promedios.",
      conceptos: [
        "Contador (suma de 1 en 1)",
        "Acumulador (suma de valores)",
        "Promedios dentro de bucles",
      ],
      agenda: agendaRetos(
        "Reto: sumar los primeros 100 números. Aparece la idea de acumulador.",
        "Demo de contador y acumulador: contar pares y sumar una lista de precios.",
        "Retos de totales, promedios, máximos y conteos con bucles.",
        "Programa que pide 5 notas y calcula el promedio con un acumulador.",
      ),
      ejercicios: [
        "Suma los números del 1 al 100 con un acumulador.",
        "Cuenta cuántos pares hay entre 1 y 50.",
        "Pide 3 números y muestra su total.",
      ],
      retos: [
        {
          titulo: "Promedio de notas",
          nivel: "avanzado",
          consigna: "Pide 5 notas en un bucle y calcula el promedio.",
        },
        {
          titulo: "Cajero del día",
          nivel: "avanzado",
          consigna:
            "Suma varias ventas hasta que el usuario escriba 0, y muestra el total.",
        },
        {
          titulo: "Contador de aprobados",
          nivel: "avanzado",
          consigna:
            "Pide varias notas y cuenta cuántas son mayores o iguales a 3.",
        },
        {
          titulo: "El más grande",
          nivel: "avanzado",
          consigna: "Pide 5 números y muestra el mayor de todos.",
        },
      ],
      cierre: {
        titulo: "Misión: Mi promedio del periodo",
        descripcion:
          "Crea un programa que pida tus notas, las sume con un acumulador y muestre tu promedio.",
      },
      evaluacion: [
        "Usa correctamente contador y/o acumulador.",
        "Inicializa las variables antes del bucle.",
        "Los totales y promedios son correctos.",
      ],
      recomendaciones: [
        "El error de no inicializar el acumulador en 0 es muy común: anticípalo.",
        "Relaciona acumuladores con marcadores de juegos y dinero: motiva.",
      ],
      recompensa: "+70 XP · Trofeo 'Rey del Acumulador'",
    },
    {
      numero: 4,
      titulo: "Misión Final: Generador de Patrones y Tablas",
      tipo: "mision",
      nivel: "avanzado",
      objetivo:
        "Combinar bucles para generar patrones visuales y tablas a partir de lo que pida el usuario.",
      conceptos: [
        "Bucles aplicados a diseño",
        "Bucles anidados (introducción)",
        "Generar salida según parámetros",
      ],
      agenda: agendaMision(
        "Elegir qué generar: pirámide, tablas, cuadrícula… y bocetarlo.",
        "Programar el generador con for/while y, si se animan, un bucle dentro de otro.",
        "Probar con distintos tamaños y ajustar el patrón.",
        "Presentar el generador y crear un patrón a pedido de la clase.",
      ),
      ejercicios: [
        "Imprime una pirámide de asteriscos de 5 filas.",
        "Genera la tabla de multiplicar de un número elegido.",
        "Dibuja un cuadrado de NxN con símbolos.",
      ],
      retos: [
        {
          titulo: "Pirámide ajustable",
          nivel: "avanzado",
          consigna:
            "Pide la altura y dibuja una pirámide de asteriscos de ese tamaño.",
        },
        {
          titulo: "Tabla doble",
          nivel: "avanzado",
          consigna: "Genera las tablas de dos números, una al lado de la otra.",
        },
        {
          titulo: "Tablero de ajedrez",
          nivel: "avanzado",
          consigna:
            "Dibuja una cuadrícula alternando símbolos (como un tablero).",
        },
      ],
      cierre: {
        titulo: "Proyecto: Generador de Patrones y Tablas",
        descripcion:
          "Programa que, según lo que pida el usuario, genera un patrón o una tabla usando bucles. Pruébalo con varios tamaños.",
      },
      evaluacion: [
        "Usa bucles para generar la salida.",
        "El resultado se adapta al tamaño pedido.",
        "El patrón se ve correcto y alineado.",
      ],
      recomendaciones: [
        "Los bucles anidados son difíciles: preséntalos como 'un bucle por cada fila'.",
        "Premia los patrones creativos: animan a experimentar.",
      ],
      recompensa: "+85 XP · 🔁 Insignia 'Señor de los Bucles' desbloqueada",
    },
  ],
};

const periodo6: PeriodoContenido = {
  numero: 6,
  titulo: "Colecciones de Datos",
  descripcion:
    "Guardar muchos datos en una sola variable con listas: crearlas, agregar y quitar elementos y recorrerlas.",
  proyecto: "Lista de Mis Videojuegos Favoritos",
  insignia: { emoji: "📚", nombre: "Guardián de Listas" },
  xp: 300,
  sesiones: [
    {
      numero: 1,
      titulo: "Una caja con muchos cajones",
      tipo: "introduccion",
      nivel: "intermedio",
      objetivo: "Crear listas y acceder a sus elementos por posición (índice).",
      conceptos: [
        "Lista: muchos datos en una variable",
        "Índices (empiezan en 0)",
        "len() para saber el tamaño",
      ],
      agenda: agendaIntro(
        "Analogía del tren: cada vagón (índice) lleva un dato; el primero es el 0.",
        "Crear listas, acceder por índice y medir con len().",
        "Crean una lista de sus comidas favoritas y muestran algunas por posición.",
        "Mini retos accediendo a distintos índices.",
        "Programa que muestra el primer y el último elemento de una lista.",
      ),
      ejercicios: [
        "Crea una lista con 4 frutas e imprime la primera.",
        "Muestra el último elemento usando su índice.",
        "Imprime cuántos elementos tiene la lista con len().",
      ],
      retos: [
        {
          titulo: "Top 5",
          nivel: "intermedio",
          consigna:
            "Crea una lista con tus 5 canciones favoritas y muestra la número 1 y la 5.",
        },
        {
          titulo: "Primero y último",
          nivel: "intermedio",
          consigna:
            "Dada una lista, muestra siempre su primer y último elemento (con len()).",
        },
        {
          titulo: "El del medio",
          nivel: "avanzado",
          consigna: "Muestra el elemento del centro de una lista impar.",
        },
      ],
      cierre: {
        titulo: "Misión: Mi inventario",
        descripcion:
          "Crea la lista del inventario de un personaje y muestra cuántos objetos tiene y el primero.",
      },
      evaluacion: [
        "Crea listas correctamente.",
        "Accede a elementos por índice (incluyendo el 0).",
        "Usa len() para el tamaño.",
      ],
      recomendaciones: [
        "El índice 0 confunde: insiste con ejemplos visuales (vagones, casilleros).",
        "Listas de gustos personales = motivación inmediata.",
      ],
      recompensa: "+65 XP · Logro 'Primera Lista'",
    },
    {
      numero: 2,
      titulo: "Agregar y quitar",
      tipo: "practica",
      nivel: "intermedio",
      objetivo:
        "Modificar listas agregando y eliminando elementos con append() y remove().",
      conceptos: [
        "append() para agregar",
        "remove() y pop() para quitar",
        "Cambiar un elemento por su índice",
      ],
      agenda: agendaPractica(
        "Repaso de listas e índices.",
        "Demo: agregar con append(), quitar con remove() y cambiar por índice.",
        "Construyen una 'lista de tareas' donde se agregan y completan (quitan) tareas.",
        "Mini retos modificando listas.",
        "Programa que agrega 3 elementos a una lista vacía y muestra el resultado.",
      ),
      ejercicios: [
        "Crea una lista vacía y agrégale 3 elementos.",
        "Elimina un elemento por su valor con remove().",
        "Cambia el segundo elemento de la lista.",
      ],
      retos: [
        {
          titulo: "Lista de compras viva",
          nivel: "intermedio",
          consigna:
            "Pide 3 productos y agrégalos a una lista, luego muéstrala.",
        },
        {
          titulo: "Tachar tarea",
          nivel: "intermedio",
          consigna:
            "Dada una lista de tareas, elimina la que indique el usuario.",
        },
        {
          titulo: "Cambio de planes",
          nivel: "intermedio",
          consigna:
            "Reemplaza un elemento de la lista por otro usando su índice.",
        },
        {
          titulo: "Cola del videojuego",
          nivel: "avanzado",
          consigna:
            "Simula una cola: agrega jugadores y saca al primero con pop(0).",
        },
      ],
      cierre: {
        titulo: "Misión: Mochila dinámica",
        descripcion:
          "Crea una mochila (lista) donde el usuario pueda agregar y soltar objetos.",
      },
      evaluacion: [
        "Agrega elementos con append().",
        "Elimina elementos correctamente.",
        "La lista refleja los cambios.",
      ],
      recomendaciones: [
        "Conecta con juegos (inventarios, colas) para que se sienta útil.",
        "Muestra la lista después de cada cambio para que vean el efecto.",
      ],
      recompensa: "+70 XP · Logro 'Editor de Listas'",
    },
    {
      numero: 3,
      titulo: "Recorriendo listas",
      tipo: "retos",
      nivel: "avanzado",
      objetivo:
        "Recorrer listas con for para procesar todos sus elementos (sumar, buscar, contar).",
      conceptos: [
        "for sobre una lista",
        "Combinar listas con acumuladores",
        "Buscar dentro de una lista",
      ],
      agenda: agendaRetos(
        "Reto: sumar todos los precios de una lista. Surge el for sobre la lista.",
        "Demo: recorrer una lista para sumar, contar y encontrar el mayor.",
        "Retos de procesamiento: promedios, búsquedas, conteos sobre listas.",
        "Programa que recorre una lista de notas y dice cuántas están aprobadas.",
      ),
      ejercicios: [
        "Recorre una lista de números e imprime cada uno.",
        "Suma todos los elementos de una lista.",
        "Cuenta cuántos elementos cumplen una condición.",
      ],
      retos: [
        {
          titulo: "Total del carrito",
          nivel: "avanzado",
          consigna: "Dada una lista de precios, calcula el total a pagar.",
        },
        {
          titulo: "El más caro",
          nivel: "avanzado",
          consigna: "Recorre una lista de precios y encuentra el mayor.",
        },
        {
          titulo: "Buscador",
          nivel: "avanzado",
          consigna: "Pregunta un nombre y di si está en la lista de invitados.",
        },
        {
          titulo: "Filtro de aprobados",
          nivel: "avanzado",
          consigna: "De una lista de notas, muestra solo las aprobadas (>= 3).",
        },
      ],
      cierre: {
        titulo: "Misión: Analista de datos",
        descripcion:
          "Toma una lista de números y muestra su total, su promedio y el mayor.",
      },
      evaluacion: [
        "Recorre la lista completa con for.",
        "Combina el recorrido con contadores/acumuladores.",
        "Obtiene resultados correctos (total, mayor, etc.).",
      ],
      recomendaciones: [
        "Une el for sobre listas con lo aprendido de acumuladores: refuerza ambos.",
        "Usa datos reales del grupo (edades, notas) para dar contexto.",
      ],
      recompensa: "+75 XP · Trofeo 'Analista de Listas'",
    },
    {
      numero: 4,
      titulo: "Misión Final: Lista de Mis Videojuegos Favoritos",
      tipo: "mision",
      nivel: "avanzado",
      objetivo:
        "Construir un gestor de videojuegos favoritos que permita agregar, quitar y listar juegos.",
      conceptos: [
        "Integración de listas + bucles + decisiones",
        "Menú interactivo simple",
        "Mostrar la colección ordenada",
      ],
      agenda: agendaMision(
        "Diseñar las opciones del gestor: agregar, eliminar, ver lista, salir.",
        "Programar el menú con un bucle y manejar la lista de juegos según la opción.",
        "Probar agregando y quitando varios juegos y revisando la lista.",
        "Presentar el gestor y compartir el top de juegos.",
      ),
      ejercicios: [
        "Crea la lista inicial de juegos.",
        "Permite agregar un juego nuevo.",
        "Muestra toda la colección numerada.",
      ],
      retos: [
        {
          titulo: "Menú con repetición",
          nivel: "avanzado",
          consigna:
            "Haz un menú que se repita hasta que el usuario elija 'salir'.",
        },
        {
          titulo: "Sin duplicados",
          nivel: "avanzado",
          consigna: "Evita agregar un juego que ya esté en la lista.",
        },
        {
          titulo: "Contador de la colección",
          nivel: "avanzado",
          consigna: "Muestra siempre cuántos juegos hay en la colección.",
        },
      ],
      cierre: {
        titulo: "Proyecto: Lista de Mis Videojuegos Favoritos",
        descripcion:
          "Gestor con menú que agrega, elimina y lista videojuegos usando una lista y un bucle. ¡Arma tu colección!",
      },
      evaluacion: [
        "Maneja la lista con append/remove.",
        "El menú se repite y responde a cada opción.",
        "Muestra la colección de forma clara.",
      ],
      recomendaciones: [
        "Este proyecto integra todo: dale tiempo y acompaña los menús con bucle.",
        "Permite cualquier temática de colección (películas, libros, cartas).",
      ],
      recompensa: "+90 XP · 📚 Insignia 'Guardián de Listas' desbloqueada",
    },
  ],
};

const periodo7: PeriodoContenido = {
  numero: 7,
  titulo: "Funciones",
  descripcion:
    "Organizar el código en funciones reutilizables con parámetros y valores de retorno.",
  proyecto: "Centro de Herramientas Matemáticas",
  insignia: { emoji: "🛠️", nombre: "Ingeniero de Funciones" },
  xp: 320,
  sesiones: [
    {
      numero: 1,
      titulo: "Crea tus propias órdenes",
      tipo: "introduccion",
      nivel: "intermedio",
      objetivo:
        "Definir y llamar funciones propias para reutilizar bloques de código.",
      conceptos: [
        "def para definir funciones",
        "Llamar a una función",
        "Por qué evitan repetir código",
      ],
      agenda: agendaIntro(
        "Idea: 'inventar un nuevo comando'. ¿Y si print() lo hubieras creado tú?",
        "Cómo se define una función con def y cómo se llama.",
        "Crean una función saludar() y la llaman varias veces.",
        "Mini retos creando funciones simples.",
        "Programa con una función que dibuja una línea decorativa.",
      ),
      ejercicios: [
        "Define una función que imprima '¡Hola!'.",
        "Llama a tu función tres veces.",
        "Crea una función que imprima una línea de guiones.",
      ],
      retos: [
        {
          titulo: "Mi firma",
          nivel: "intermedio",
          consigna:
            "Crea una función que imprima tu firma con marco y llámala al final.",
        },
        {
          titulo: "Separador",
          nivel: "intermedio",
          consigna:
            "Crea una función linea() y úsala entre secciones de un programa.",
        },
        {
          titulo: "Menú reutilizable",
          nivel: "avanzado",
          consigna:
            "Crea una función que imprima un menú y llámala donde se necesite.",
        },
      ],
      cierre: {
        titulo: "Misión: Mi primer comando",
        descripcion:
          "Inventa una función útil (un banner, un separador, un saludo) y úsala al menos dos veces.",
      },
      evaluacion: [
        "Define una función con def correctamente.",
        "La llama y se ejecuta.",
        "Entiende que evita repetir código.",
      ],
      recomendaciones: [
        "Vende las funciones como 'crear tus propios superpoderes'.",
        "Refuerza la diferencia entre definir (crear) y llamar (usar).",
      ],
      recompensa: "+70 XP · Logro 'Primera Función'",
    },
    {
      numero: 2,
      titulo: "Funciones con datos: parámetros",
      tipo: "practica",
      nivel: "avanzado",
      objetivo:
        "Pasar información a las funciones mediante parámetros para que sean flexibles.",
      conceptos: [
        "Parámetros",
        "Argumentos al llamar",
        "Varias entradas en una función",
      ],
      agenda: agendaPractica(
        "Repaso: definir y llamar. ¿Cómo saludar a alguien por su nombre?",
        "Demo: saludar(nombre) y una función que dibuja N estrellas.",
        "Practican funciones con uno y dos parámetros (saludos, áreas, sumas).",
        "Mini retos cambiando los argumentos al llamar.",
        "Programa con una función que saluda a cualquier nombre que reciba.",
      ),
      ejercicios: [
        "Crea saludar(nombre) y llámala con dos nombres distintos.",
        "Crea una función que reciba un número e imprima su tabla.",
        "Crea una función que dibuje N asteriscos.",
      ],
      retos: [
        {
          titulo: "Saludo personalizado",
          nivel: "avanzado",
          consigna:
            "Función que reciba nombre y edad y arme un saludo con ambos.",
        },
        {
          titulo: "Generador de líneas",
          nivel: "avanzado",
          consigna:
            "Función que reciba un símbolo y una cantidad y dibuje esa línea.",
        },
        {
          titulo: "Rectángulo a medida",
          nivel: "avanzado",
          consigna:
            "Función que reciba ancho y alto y dibuje un rectángulo de símbolos.",
        },
        {
          titulo: "Conversor reutilizable",
          nivel: "avanzado",
          consigna:
            "Función celsius_a_fahrenheit(grados) que imprima la conversión.",
        },
      ],
      cierre: {
        titulo: "Misión: Funciones a la carta",
        descripcion:
          "Crea dos funciones con parámetros y úsalas con distintos argumentos.",
      },
      evaluacion: [
        "Define funciones con parámetros.",
        "Las llama con distintos argumentos.",
        "El resultado cambia según los datos pasados.",
      ],
      recomendaciones: [
        "Muestra cómo una sola función con parámetro reemplaza muchas casi iguales.",
        "Insiste en el orden de los argumentos al llamar.",
      ],
      recompensa: "+75 XP · Logro 'Funciones Flexibles'",
    },
    {
      numero: 3,
      titulo: "Funciones que devuelven",
      tipo: "retos",
      nivel: "avanzado",
      objetivo:
        "Usar return para que las funciones devuelvan un resultado y poder reutilizarlo.",
      conceptos: [
        "return de un valor",
        "Guardar el resultado en una variable",
        "Diferencia entre imprimir y devolver",
      ],
      agenda: agendaRetos(
        "Reto: una función que SUME y me dé el resultado para seguir usándolo.",
        "Demo: print vs return; guardar el retorno y combinarlo.",
        "Retos creando funciones de cálculo que devuelven (área, mayor, es_par).",
        "Programa con una función es_par(n) que devuelve True/False y se usa en un if.",
      ),
      ejercicios: [
        "Crea sumar(a, b) que devuelva la suma.",
        "Crea area(base, altura) que devuelva el área.",
        "Crea es_par(n) que devuelva True o False.",
      ],
      retos: [
        {
          titulo: "Caja de cálculos",
          nivel: "avanzado",
          consigna:
            "Funciones que devuelvan suma, resta y producto, y úsalas juntas.",
        },
        {
          titulo: "El mayor",
          nivel: "avanzado",
          consigna:
            "Función mayor(a, b) que devuelva el más grande de dos números.",
        },
        {
          titulo: "Detector con retorno",
          nivel: "avanzado",
          consigna:
            "Función es_par(n) que devuelva un booleano y úsala en un if.",
        },
        {
          titulo: "Combinar funciones",
          nivel: "avanzado",
          consigna: "Usa el resultado de una función como argumento de otra.",
        },
      ],
      cierre: {
        titulo: "Misión: Mini biblioteca",
        descripcion:
          "Crea 3 funciones que devuelvan valores y combínalas para resolver un cálculo.",
      },
      evaluacion: [
        "Usa return para devolver valores.",
        "Reutiliza el resultado (lo guarda o lo combina).",
        "Distingue imprimir de devolver.",
      ],
      recomendaciones: [
        "La diferencia print/return es clave: usa el ejemplo de una calculadora real.",
        "Muestra cómo encadenar funciones: abre la puerta a programas más grandes.",
      ],
      recompensa: "+80 XP · Trofeo 'Maestro del return'",
    },
    {
      numero: 4,
      titulo: "Misión Final: Centro de Herramientas Matemáticas",
      tipo: "mision",
      nivel: "avanzado",
      objetivo:
        "Construir un programa con un menú que ofrezca varias herramientas matemáticas, cada una en su función.",
      conceptos: [
        "Integración de funciones con parámetros y return",
        "Menú que llama a funciones",
        "Organización del código en piezas",
      ],
      agenda: agendaMision(
        "Elegir las herramientas (área, potencia, conversor, par/impar…) y diseñar el menú.",
        "Programar cada herramienta como una función y conectarlas con un menú en bucle.",
        "Probar cada opción del menú con varios datos.",
        "Presentar el centro de herramientas como una mini app.",
      ),
      ejercicios: [
        "Crea una función por cada herramienta.",
        "Haz un menú que llame a la función elegida.",
        "Repite el menú hasta que el usuario salga.",
      ],
      retos: [
        {
          titulo: "Cuatro herramientas",
          nivel: "avanzado",
          consigna:
            "Incluye al menos 4 herramientas, cada una en su propia función.",
        },
        {
          titulo: "Resultados reutilizables",
          nivel: "avanzado",
          consigna:
            "Que cada herramienta devuelva (return) su resultado y el menú lo muestre.",
        },
        {
          titulo: "A prueba de errores",
          nivel: "avanzado",
          consigna:
            "Si el usuario elige una opción inválida, avísalo y vuelve al menú.",
        },
      ],
      cierre: {
        titulo: "Proyecto: Centro de Herramientas Matemáticas",
        descripcion:
          "Mini app con menú que reúne varias herramientas matemáticas, cada una como función con parámetros y return.",
      },
      evaluacion: [
        "Cada herramienta es una función bien definida.",
        "El menú llama a la función correcta.",
        "Las funciones usan parámetros y return.",
      ],
      recomendaciones: [
        "Es el proyecto más 'de ingeniería': resalta el orden y la reutilización.",
        "Anímalos a añadir su propia herramienta extra: apropiación del proyecto.",
      ],
      recompensa: "+95 XP · 🛠️ Insignia 'Ingeniero de Funciones' desbloqueada",
    },
  ],
};

const periodo8: PeriodoContenido = {
  numero: 8,
  titulo: "Juegos en Consola",
  descripcion:
    "Crear juegos de texto con azar (random), menús interactivos y un sistema de puntos.",
  proyecto: "Piedra, Papel o Tijera",
  insignia: { emoji: "🎮", nombre: "Creador de Juegos" },
  xp: 340,
  sesiones: [
    {
      numero: 1,
      titulo: "El azar entra al juego",
      tipo: "introduccion",
      nivel: "intermedio",
      objetivo:
        "Usar el módulo random para generar números y elecciones al azar.",
      conceptos: [
        "import random",
        "random.randint() y random.choice()",
        "Azar en los juegos",
      ],
      agenda: agendaIntro(
        "¿Cómo decide la máquina en un juego? Lanzamos un 'dado' mental.",
        "Importar random y usar randint() y choice().",
        "Programan un dado y una 'ruleta' que elige entre opciones.",
        "Mini retos generando números y elecciones al azar.",
        "Programa que tira un dado de 6 caras.",
      ),
      ejercicios: [
        "Genera un número al azar del 1 al 6.",
        "Elige al azar entre 'cara' y 'cruz'.",
        "Elige un color al azar de una lista.",
      ],
      retos: [
        {
          titulo: "Dado de la suerte",
          nivel: "intermedio",
          consigna: "Simula tirar dos dados y muestra la suma.",
        },
        {
          titulo: "Decisiones al azar",
          nivel: "intermedio",
          consigna: "Crea una 'bola mágica' que responda sí/no/quizás al azar.",
        },
        {
          titulo: "Equipo aleatorio",
          nivel: "avanzado",
          consigna: "De una lista de jugadores, elige al azar un capitán.",
        },
      ],
      cierre: {
        titulo: "Misión: Generador de la suerte",
        descripcion:
          "Crea un programa que dé un 'número de la suerte' y una frase al azar.",
      },
      evaluacion: [
        "Importa y usa random correctamente.",
        "Genera números y elecciones al azar.",
        "El resultado cambia en cada ejecución.",
      ],
      recomendaciones: [
        "El azar engancha mucho: úsalo como gancho del periodo de juegos.",
        "Muestra que cada ejecución da algo distinto: les encanta.",
      ],
      recompensa: "+70 XP · Logro 'Domador del Azar'",
    },
    {
      numero: 2,
      titulo: "Menús y puntos",
      tipo: "practica",
      nivel: "avanzado",
      objetivo:
        "Construir menús interactivos y llevar un sistema de puntos durante el juego.",
      conceptos: [
        "Menú interactivo con bucle",
        "Sistema de puntos (acumulador)",
        "Repetir hasta salir",
      ],
      agenda: agendaPractica(
        "Repaso de bucles y condicionales aplicados a un menú.",
        "Demo: menú de juego que suma puntos y se repite hasta salir.",
        "Construyen un 'adivina el número' con intentos y puntaje.",
        "Mini retos mejorando el sistema de puntos.",
        "Programa con un menú de 3 opciones que responde a cada una.",
      ),
      ejercicios: [
        "Haz un menú con 3 opciones y un 'salir'.",
        "Suma 10 puntos cada vez que el usuario acierta.",
        "Repite el menú hasta que elija salir.",
      ],
      retos: [
        {
          titulo: "Adivina el número",
          nivel: "avanzado",
          consigna:
            "La máquina piensa un número (random) y el jugador adivina con pistas mayor/menor.",
        },
        {
          titulo: "Marcador persistente",
          nivel: "avanzado",
          consigna: "Lleva el puntaje del jugador a lo largo de varias rondas.",
        },
        {
          titulo: "Menú a prueba de todo",
          nivel: "avanzado",
          consigna:
            "Si eligen una opción que no existe, avisa y vuelve a mostrar el menú.",
        },
        {
          titulo: "Vidas",
          nivel: "avanzado",
          consigna: "Añade 3 vidas: el juego termina cuando se acaban.",
        },
      ],
      cierre: {
        titulo: "Misión: Adivina el número",
        descripcion:
          "Crea el juego de adivinar un número al azar con intentos limitados y puntaje.",
      },
      evaluacion: [
        "El menú se repite y maneja las opciones.",
        "Lleva un puntaje correcto.",
        "Termina cuando corresponde (salir/vidas).",
      ],
      recomendaciones: [
        "El 'adivina el número' es un clásico que integra random + bucles + if: aprovéchalo.",
        "Los puntos y vidas dan sensación de videojuego: refuerza la motivación.",
      ],
      recompensa: "+80 XP · Logro 'Game Master'",
    },
    {
      numero: 3,
      titulo: "Retos arcade",
      tipo: "retos",
      nivel: "avanzado",
      objetivo:
        "Combinar azar, menús y puntos para crear mini juegos completos.",
      conceptos: [
        "Combinar random + bucles + decisiones",
        "Reglas de juego",
        "Mensajes de victoria/derrota",
      ],
      agenda: agendaRetos(
        "Galería de mini juegos de consola: ¿cómo funcionan por dentro?",
        "Demo: estructura común de un mini juego (preparar, jugar en bucle, mostrar resultado).",
        "Retos para programar mini juegos: par/impar contra la máquina, mayor número, trivia exprés.",
        "Terminar un mini juego completo elegido por el estudiante.",
      ),
      ejercicios: [
        "Juego de 'par o impar' contra la máquina.",
        "Juego de 'mayor número' (cada uno saca un dado).",
        "Pequeño quiz de 3 preguntas con puntaje.",
      ],
      retos: [
        {
          titulo: "Par o impar arcade",
          nivel: "avanzado",
          consigna:
            "Juega par/impar contra la máquina al mejor de 3 con marcador.",
        },
        {
          titulo: "Duelo de dados",
          nivel: "avanzado",
          consigna:
            "Jugador y máquina sacan dados; gana el mayor. Lleva el marcador.",
        },
        {
          titulo: "Quiz relámpago",
          nivel: "avanzado",
          consigna:
            "Haz 3 preguntas y muestra el puntaje final con un mensaje según el resultado.",
        },
        {
          titulo: "Ahorcado fácil",
          nivel: "avanzado",
          consigna:
            "Versión simple: adivina una palabra letra por letra con intentos limitados.",
        },
      ],
      cierre: {
        titulo: "Misión: Mi mini arcade",
        descripcion:
          "Termina un mini juego completo con azar, puntaje y mensaje de victoria/derrota.",
      },
      evaluacion: [
        "El juego combina azar, bucle y decisiones.",
        "Lleva puntaje y declara un ganador.",
        "Las reglas son claras y funcionan.",
      ],
      recomendaciones: [
        "Deja que elijan el juego: la apropiación dispara el esfuerzo.",
        "Recuérdales reutilizar funciones del periodo 7 para ordenar el código.",
      ],
      recompensa: "+85 XP · Trofeo 'Arcade Master'",
    },
    {
      numero: 4,
      titulo: "Misión Final: Piedra, Papel o Tijera",
      tipo: "mision",
      nivel: "avanzado",
      objetivo:
        "Programar el juego de Piedra, Papel o Tijera contra la máquina con marcador y varias rondas.",
      conceptos: [
        "Integración de random + condicionales + bucle",
        "Reglas del juego",
        "Marcador y fin de partida",
      ],
      agenda: agendaMision(
        "Repasar las reglas y planear el flujo: elegir, comparar, puntuar, repetir.",
        "Programar el juego: elección del jugador, jugada al azar de la máquina y marcador.",
        "Probar muchas rondas y verificar que el marcador y el ganador sean correctos.",
        "Torneo relámpago: jugar los programas entre compañeros.",
      ),
      ejercicios: [
        "Pide la jugada del usuario y genera la de la máquina.",
        "Decide quién gana la ronda con if/elif.",
        "Lleva el marcador y muéstralo cada ronda.",
      ],
      retos: [
        {
          titulo: "Al mejor de 5",
          nivel: "avanzado",
          consigna: "Termina la partida cuando alguien gane 3 rondas.",
        },
        {
          titulo: "Validación de jugada",
          nivel: "avanzado",
          consigna:
            "Si el usuario escribe algo que no es piedra/papel/tijera, vuelve a pedirlo.",
        },
        {
          titulo: "Modo lagarto-Spock",
          nivel: "avanzado",
          consigna: "Amplía el juego con dos jugadas extra y sus reglas.",
        },
      ],
      cierre: {
        titulo: "Proyecto: Piedra, Papel o Tijera",
        descripcion:
          "Juego completo contra la máquina con jugadas al azar, marcador y final de partida. ¡Organicen un torneo!",
      },
      evaluacion: [
        "Las reglas se aplican correctamente.",
        "Lleva marcador y declara ganador.",
        "Maneja jugadas inválidas sin romperse.",
      ],
      recomendaciones: [
        "El torneo final entre compañeros es un cierre motivador: resérvale tiempo.",
        "Valora el código ordenado (funciones, nombres claros), no solo que funcione.",
      ],
      recompensa: "+100 XP · 🎮 Insignia 'Creador de Juegos' desbloqueada",
    },
  ],
};

const periodo9: PeriodoContenido = {
  numero: 9,
  titulo: "Pensar como un Desarrollador",
  descripcion:
    "Resolver problemas grandes partiéndolos en piezas, organizar programas y usar funciones avanzadas.",
  proyecto: "Trivia de Preguntas y Respuestas",
  insignia: { emoji: "🧠", nombre: "Arquitecto de Software" },
  xp: 360,
  sesiones: [
    {
      numero: 1,
      titulo: "Divide y vencerás",
      tipo: "introduccion",
      nivel: "avanzado",
      objetivo:
        "Aprender a descomponer un problema grande en pasos y subproblemas más pequeños.",
      conceptos: [
        "Descomposición de problemas",
        "De la idea a los pasos",
        "Pensamiento computacional",
      ],
      agenda: agendaIntro(
        "Reto: 'organizar una fiesta'. Lo partimos en tareas pequeñas en el tablero.",
        "Cómo descomponer un programa en funciones/pasos antes de escribir código.",
        "Toman un problema (cajero, juego) y lo dividen en subproblemas en papel y código.",
        "Mini retos descomponiendo problemas dados.",
        "Bocetar la trivia del periodo en pasos.",
      ),
      ejercicios: [
        "Escribe en pasos cómo haría un programa de cajero.",
        "Divide un juego en 'preparar, jugar, terminar'.",
        "Convierte uno de los pasos en una función vacía.",
      ],
      retos: [
        {
          titulo: "Plano del programa",
          nivel: "avanzado",
          consigna:
            "Toma un problema y escribe sus subproblemas como funciones (solo los nombres).",
        },
        {
          titulo: "De pasos a código",
          nivel: "avanzado",
          consigna: "Implementa uno de los subproblemas que definiste.",
        },
        {
          titulo: "Caja negra",
          nivel: "avanzado",
          consigna:
            "Define una función por su entrada y salida, sin escribir aún su interior.",
        },
      ],
      cierre: {
        titulo: "Misión: El plano",
        descripcion:
          "Elige un programa que te gustaría hacer y entrégalo dividido en funciones (su 'plano').",
      },
      evaluacion: [
        "Descompone el problema en subproblemas claros.",
        "Asocia cada parte a una función.",
        "El plano es coherente y completo.",
      ],
      recomendaciones: [
        "Trabaja primero en papel: pensar antes de teclear es la gran meta del periodo.",
        "Valora un buen plano aunque el código aún no esté: es lo que hace un desarrollador.",
      ],
      recompensa: "+80 XP · Logro 'Mente de Arquitecto'",
    },
    {
      numero: 2,
      titulo: "Programas ordenados",
      tipo: "practica",
      nivel: "avanzado",
      objetivo:
        "Organizar un programa en funciones bien nombradas y datos en listas, con un flujo claro.",
      conceptos: [
        "Organización de programas",
        "Nombres claros y comentarios",
        "Datos en listas + funciones",
      ],
      agenda: agendaPractica(
        "Repaso: descomponer. Ahora lo llevamos a un programa ordenado.",
        "Demo: refactorizar un programa desordenado en funciones con buenos nombres.",
        "Reorganizan un programa dado moviendo lógica a funciones y datos a listas.",
        "Mini retos mejorando la organización y los nombres.",
        "Estructurar el esqueleto de la trivia en funciones.",
      ),
      ejercicios: [
        "Mueve un bloque repetido a una función.",
        "Renombra variables poco claras.",
        "Guarda un conjunto de datos en una lista.",
      ],
      retos: [
        {
          titulo: "Gran limpieza",
          nivel: "avanzado",
          consigna:
            "Toma un programa largo y reorganízalo en al menos 3 funciones.",
        },
        {
          titulo: "Datos fuera del código",
          nivel: "avanzado",
          consigna:
            "Mueve las preguntas/datos a listas, separados de la lógica.",
        },
        {
          titulo: "Flujo principal",
          nivel: "avanzado",
          consigna:
            "Crea una función main() que ordene las llamadas del programa.",
        },
      ],
      cierre: {
        titulo: "Misión: Refactor",
        descripcion:
          "Toma un programa de un periodo anterior y reorganízalo con funciones y nombres claros.",
      },
      evaluacion: [
        "El programa queda dividido en funciones con buenos nombres.",
        "Separa datos (listas) de la lógica.",
        "El flujo principal es fácil de seguir.",
      ],
      recomendaciones: [
        "Refactorizar un proyecto propio les muestra el valor del orden de primera mano.",
        "Premia los nombres claros tanto como que el programa funcione.",
      ],
      recompensa: "+85 XP · Logro 'Código Limpio'",
    },
    {
      numero: 3,
      titulo: "Funciones avanzadas",
      tipo: "retos",
      nivel: "avanzado",
      objetivo:
        "Usar funciones que se combinan, procesan listas y manejan valores por defecto.",
      conceptos: [
        "Funciones que reciben/devuelven listas",
        "Combinar funciones entre sí",
        "Parámetros por defecto",
      ],
      agenda: agendaRetos(
        "Reto: una función que reciba una lista de notas y devuelva el promedio.",
        "Demo: funciones que procesan listas y se llaman unas a otras.",
        "Retos creando funciones que reciben listas, devuelven listas y se combinan.",
        "Crear una función que valide una respuesta de la trivia.",
      ),
      ejercicios: [
        "Función promedio(lista) que devuelva el promedio.",
        "Función que devuelva el mayor de una lista.",
        "Función con un parámetro por defecto.",
      ],
      retos: [
        {
          titulo: "Estadísticas",
          nivel: "avanzado",
          consigna:
            "Funciones promedio(), maximo() y minimo() sobre una misma lista.",
        },
        {
          titulo: "Filtrar lista",
          nivel: "avanzado",
          consigna:
            "Función que reciba una lista y devuelva solo los aprobados.",
        },
        {
          titulo: "Función que llama a función",
          nivel: "avanzado",
          consigna:
            "Una función que use a otras dos para entregar un reporte completo.",
        },
        {
          titulo: "Valor por defecto",
          nivel: "avanzado",
          consigna:
            "Función saludar(nombre, saludo='Hola') que use el saludo por defecto si no se pasa.",
        },
      ],
      cierre: {
        titulo: "Misión: Caja de herramientas",
        descripcion:
          "Crea un conjunto de funciones que trabajen juntas sobre una lista de datos.",
      },
      evaluacion: [
        "Crea funciones que procesan listas.",
        "Combina funciones entre sí.",
        "Usa al menos un parámetro por defecto.",
      ],
      recomendaciones: [
        "Conecta con el proyecto: estas funciones serán parte de la trivia.",
        "Muestra cómo funciones pequeñas y combinables hacen programas más fáciles.",
      ],
      recompensa: "+90 XP · Trofeo 'Funciones Pro'",
    },
    {
      numero: 4,
      titulo: "Misión Final: Trivia de Preguntas y Respuestas",
      tipo: "mision",
      nivel: "avanzado",
      objetivo:
        "Construir un juego de trivia bien organizado con preguntas en listas, puntaje y funciones.",
      conceptos: [
        "Integración: descomposición + funciones + listas",
        "Banco de preguntas en listas",
        "Puntaje y reporte final",
      ],
      agenda: agendaMision(
        "Diseñar la trivia: tema, preguntas, cómo se guardan y cómo se puntúa.",
        "Programar el banco de preguntas (listas) y las funciones de jugar y puntuar.",
        "Probar respondiendo bien y mal; revisar el puntaje y el reporte final.",
        "Jugar las trivias entre compañeros y comentar.",
      ),
      ejercicios: [
        "Guarda 5 preguntas con sus respuestas en listas.",
        "Crea una función que haga una pregunta y diga si acertó.",
        "Lleva el puntaje y muéstralo al final.",
      ],
      retos: [
        {
          titulo: "Banco grande",
          nivel: "avanzado",
          consigna: "Incluye al menos 6 preguntas organizadas en listas.",
        },
        {
          titulo: "Reporte final",
          nivel: "avanzado",
          consigna:
            "Al terminar, muestra aciertos, errores y un mensaje según el puntaje.",
        },
        {
          titulo: "Preguntas al azar",
          nivel: "avanzado",
          consigna:
            "Haz que las preguntas salgan en orden aleatorio con random.",
        },
      ],
      cierre: {
        titulo: "Proyecto: Trivia de Preguntas y Respuestas",
        descripcion:
          "Juego de trivia organizado en funciones, con banco de preguntas en listas, puntaje y reporte final.",
      },
      evaluacion: [
        "El programa está dividido en funciones claras.",
        "Las preguntas viven en listas, separadas de la lógica.",
        "Lleva puntaje y entrega un reporte final.",
      ],
      recomendaciones: [
        "Este proyecto demuestra 'pensar como desarrollador': resalta el orden y la reutilización.",
        "Deja que elijan el tema de la trivia: dispara la motivación.",
      ],
      recompensa: "+105 XP · 🧠 Insignia 'Arquitecto de Software' desbloqueada",
    },
  ],
};

const periodo10: PeriodoContenido = {
  numero: 10,
  titulo: "Proyecto Final",
  descripcion:
    "Llevar una idea propia de principio a fin: planear, desarrollar, probar y presentar tu programa.",
  proyecto: "Proyecto libre creado por el estudiante",
  insignia: { emoji: "🏆", nombre: "Programador LuckSoft" },
  xp: 400,
  sesiones: [
    {
      numero: 1,
      titulo: "Planeación",
      tipo: "introduccion",
      nivel: "avanzado",
      objetivo:
        "Elegir un proyecto propio y planear sus funciones, datos y pasos antes de programar.",
      conceptos: [
        "Definir el objetivo del proyecto",
        "Planear funciones y datos",
        "Alcance realista (lo mínimo que funcione)",
      ],
      agenda: agendaIntro(
        "Lluvia de ideas de proyectos: juegos, herramientas, simuladores. Cada quien elige.",
        "Cómo planear: objetivo, qué pedirá, qué hará, qué mostrará; lista de funciones.",
        "Cada estudiante escribe el plan de su proyecto (objetivo + funciones + datos).",
        "Revisión por parejas del plan: ¿es claro? ¿es realista?",
        "Entregar el plan del proyecto final.",
      ),
      ejercicios: [
        "Escribe en una frase qué hará tu proyecto.",
        "Lista las funciones que vas a necesitar.",
        "Define qué datos guardarás (y en qué listas).",
      ],
      retos: [
        {
          titulo: "Objetivo claro",
          nivel: "avanzado",
          consigna:
            "Resume tu proyecto en una sola frase y en 3 funciones principales.",
        },
        {
          titulo: "Plan B",
          nivel: "avanzado",
          consigna:
            "Define una versión mínima (lo esencial) y una versión 'extra' si te sobra tiempo.",
        },
        {
          titulo: "Bocetar la pantalla",
          nivel: "avanzado",
          consigna:
            "Dibuja en papel cómo se verá la interacción en la consola.",
        },
      ],
      cierre: {
        titulo: "Misión: Mi plan maestro",
        descripcion:
          "Entrega el plan de tu proyecto: objetivo, lista de funciones, datos y una versión mínima.",
      },
      evaluacion: [
        "El proyecto tiene un objetivo claro.",
        "El plan lista funciones y datos.",
        "El alcance es realista para el tiempo.",
      ],
      recomendaciones: [
        "Ayuda a ajustar el alcance: mejor algo pequeño y terminado que algo grande a medias.",
        "Que cada quien elija algo que le apasione: es su proyecto.",
      ],
      recompensa: "+90 XP · Logro 'Planificador'",
    },
    {
      numero: 2,
      titulo: "Desarrollo",
      tipo: "practica",
      nivel: "avanzado",
      objetivo:
        "Programar la versión mínima del proyecto siguiendo el plan, función por función.",
      conceptos: [
        "Construir por partes",
        "Probar mientras se programa",
        "Resolver problemas sobre la marcha",
      ],
      agenda: agendaPractica(
        "Revisar el plan y elegir por dónde empezar.",
        "Demo: construir una función, probarla y pasar a la siguiente (paso a paso).",
        "Tiempo de desarrollo acompañado: cada quien implementa su versión mínima.",
        "Puntos de control: ¿qué función ya funciona? ¿qué falta?",
        "Dejar la versión mínima ejecutándose.",
      ),
      ejercicios: [
        "Programa la primera función de tu plan y pruébala.",
        "Conecta dos funciones de tu proyecto.",
        "Guarda y prueba tu avance.",
      ],
      retos: [
        {
          titulo: "Primer hito",
          nivel: "avanzado",
          consigna:
            "Logra que la parte central de tu proyecto funcione (aunque sea simple).",
        },
        {
          titulo: "Probar temprano",
          nivel: "avanzado",
          consigna:
            "Prueba cada función apenas la termines y corrige antes de seguir.",
        },
        {
          titulo: "Pedir ayuda con sentido",
          nivel: "avanzado",
          consigna:
            "Cuando te trabes, describe el problema en una frase antes de pedir ayuda.",
        },
      ],
      cierre: {
        titulo: "Misión: Versión jugable",
        descripcion:
          "Deja tu proyecto en una versión mínima que ya se pueda usar de principio a fin.",
      },
      evaluacion: [
        "Avanza siguiendo su plan.",
        "Prueba a medida que construye.",
        "Tiene una versión mínima funcionando.",
      ],
      recomendaciones: [
        "Refuerza 'programa un poco, prueba un poco': evita el código gigante sin probar.",
        "Celebra cada función que empieza a funcionar: mantiene la energía.",
      ],
      recompensa: "+95 XP · Logro 'En Construcción'",
    },
    {
      numero: 3,
      titulo: "Pruebas y mejoras",
      tipo: "retos",
      nivel: "avanzado",
      objetivo:
        "Probar el proyecto a fondo, corregir errores y pulir detalles antes de presentarlo.",
      conceptos: [
        "Pruebas con casos límite",
        "Corrección de errores (debugging)",
        "Mejoras y validaciones",
      ],
      agenda: agendaRetos(
        "¿Cómo 'romper' un programa para encontrar fallos? Lluvia de casos raros.",
        "Demo: probar con datos extremos y validar entradas del usuario.",
        "Cada quien prueba su proyecto, corrige bugs y añade validaciones/mejoras.",
        "Intercambio: un compañero prueba tu proyecto y reporta lo que encuentre.",
      ),
      ejercicios: [
        "Prueba tu proyecto con datos raros (vacío, muy grande).",
        "Valida una entrada para que no rompa el programa.",
        "Corrige un error que hayas encontrado.",
      ],
      retos: [
        {
          titulo: "Romper para mejorar",
          nivel: "avanzado",
          consigna:
            "Encuentra y corrige al menos 2 problemas probando con datos extremos.",
        },
        {
          titulo: "A prueba de usuarios",
          nivel: "avanzado",
          consigna:
            "Añade validaciones para que entradas inválidas no rompan el programa.",
        },
        {
          titulo: "Toque final",
          nivel: "avanzado",
          consigna:
            "Mejora la presentación (mensajes, marcos, instrucciones claras).",
        },
      ],
      cierre: {
        titulo: "Misión: Versión pulida",
        descripcion:
          "Deja tu proyecto probado, sin errores conocidos y con una presentación cuidada.",
      },
      evaluacion: [
        "Prueba con varios casos, incluidos límites.",
        "Corrige los errores encontrados.",
        "Añade validaciones o mejoras.",
      ],
      recomendaciones: [
        "Las pruebas cruzadas entre compañeros encuentran fallos que el autor no ve.",
        "Enseña que 'sin errores conocidos' es una meta de calidad, no perfección.",
      ],
      recompensa: "+100 XP · Trofeo 'Cazador de Bugs Senior'",
    },
    {
      numero: 4,
      titulo: "Misión Final: Presentación del Proyecto",
      tipo: "mision",
      nivel: "avanzado",
      objetivo:
        "Presentar el proyecto final a la clase, explicando qué hace, cómo lo hizo y demostrándolo.",
      conceptos: [
        "Presentar y demostrar software",
        "Explicar decisiones de código",
        "Recibir y dar retroalimentación",
      ],
      agenda: agendaMision(
        "Preparar la presentación: qué mostrar, qué contar y un guion corto.",
        "Demostración en vivo de cada proyecto ante la clase.",
        "Ronda de preguntas y retroalimentación positiva entre compañeros.",
        "Ceremonia de cierre: entrega de la insignia final y reconocimiento de logros.",
      ),
      ejercicios: [
        "Prepara una demo de 2 minutos de tu proyecto.",
        "Explica qué función te costó más y por qué.",
        "Anota una mejora futura para tu proyecto.",
      ],
      retos: [
        {
          titulo: "Demo impecable",
          nivel: "avanzado",
          consigna:
            "Presenta tu proyecto funcionando de principio a fin sin errores.",
        },
        {
          titulo: "Detrás del código",
          nivel: "avanzado",
          consigna: "Explica cómo organizaste tus funciones y por qué.",
        },
        {
          titulo: "Próxima versión",
          nivel: "avanzado",
          consigna: "Propón 2 mejoras que harías si tuvieras más tiempo.",
        },
      ],
      cierre: {
        titulo: "Proyecto: Proyecto Final Libre",
        descripcion:
          "Tu programa completo, planeado, desarrollado, probado y presentado a la clase. ¡Es tu obra como programador!",
      },
      evaluacion: [
        "El proyecto funciona de principio a fin.",
        "Aplica lo aprendido (funciones, listas, decisiones, bucles).",
        "Presenta y explica su trabajo con claridad.",
      ],
      recomendaciones: [
        "Haz de la presentación una celebración, no un examen: refuerza la confianza.",
        "Destaca el progreso de cada estudiante desde el periodo 1: cierra el viaje.",
      ],
      recompensa: "+150 XP · 🏆 Insignia 'Programador LuckSoft' desbloqueada",
    },
  ],
};

/** Currículo completo del curso de Python (10 periodos × 4 sesiones). */
export const pythonCurriculum: Curriculum = [
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
