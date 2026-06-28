import type { WebProject } from "@/domain/models/submission";

/*
 * Andamiajes (proyecto HTML/CSS/JS ya empezado y comentado) para las ACTIVIDADES
 * LARGAS del curso de Diseño Web: las misiones (una por periodo) y algunos retos
 * extensos. Son una estructura inicial con comentarios TODO (en HTML, CSS y JS)
 * indicando lo que falta, para que el estudiante no parta de una hoja en blanco.
 * Las actividades cortas conservan solo un comentario con el enunciado.
 *
 * `lessonWebAssignments` los usa como "código base" del editor (los tres
 * editores: HTML, CSS y JS). Las claves de retos siguen el id que arma
 * lessonTasks: `p{periodo}s{sesion}-reto{n}`.
 */

/** Andamiaje de la misión final de cada periodo (clave = número de periodo). */
export const misionScaffolds: Record<number, WebProject> = {
  1: {
    html: `<!-- 🌐 Misión: Mi Primera Página Web Personal -->
<header>
  <h1>Tu Nombre</h1>
  <!-- TODO: añade un subtítulo (<h2>) que te describa -->
</header>

<main>
  <section>
    <h2>Sobre mí</h2>
    <p>Escribe aquí una breve presentación.</p>
    <!-- TODO: añade otro párrafo más -->
  </section>

  <section>
    <h2>Mis gustos</h2>
    <!-- TODO: crea una lista (<ul>) con 3 cosas que te gusten -->
  </section>

  <section>
    <h2>Mis enlaces</h2>
    <!-- TODO: añade una lista de enlaces (<a>) a tus páginas favoritas -->
  </section>
</main>`,
    css: `body {
  font-family: sans-serif;
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
}
/* TODO: dale color a los títulos y un fondo suave a la página */`,
    js: `// Para esta misión no necesitas JavaScript todavía 😉`,
  },
  2: {
    html: `<!-- 📋 Misión: Página de Registro para un Evento -->
<header>
  <h1>Nombre del Evento</h1>
  <!-- TODO: añade la fecha y el lugar del evento -->
</header>

<main>
  <section>
    <h2>Programa</h2>
    <table>
      <thead>
        <tr><th>Hora</th><th>Actividad</th></tr>
      </thead>
      <tbody>
        <tr><td>10:00</td><td>Bienvenida</td></tr>
        <!-- TODO: añade 2 filas más al programa -->
      </tbody>
    </table>
  </section>

  <section>
    <h2>Inscríbete</h2>
    <form>
      <label>Nombre: <input type="text" name="nombre" /></label>
      <!-- TODO: añade un input de correo (type="email") con su label -->
      <!-- TODO: añade un <select> para elegir asistencia (Sí / No) -->
      <button type="submit">Inscribirme</button>
    </form>
  </section>
</main>`,
    css: `body {
  font-family: sans-serif;
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
}
table { border-collapse: collapse; width: 100%; }
th, td { border: 1px solid #ccc; padding: 8px; }
/* TODO: dale estilo al formulario y a los inputs */`,
    js: `// (Opcional) Más adelante validaremos el formulario con JavaScript.`,
  },
  3: {
    html: `<!-- 🎨 Misión: Landing Page sencilla -->
<header class="hero">
  <h1>Mi Producto</h1>
  <p>Un subtítulo que enganche.</p>
  <a class="cta" href="#">¡Quiero saber más!</a>
</header>

<main>
  <section class="beneficios">
    <div class="card"><h3>Beneficio 1</h3><p>Descripción.</p></div>
    <!-- TODO: añade 2 tarjetas de beneficio más -->
  </section>
</main>

<footer>
  <!-- TODO: añade datos de contacto -->
</footer>`,
    css: `body { font-family: sans-serif; margin: 0; }

.hero {
  text-align: center;
  padding: 60px 20px;
  /* TODO: dale un color de fondo y de texto a la portada */
}

.cta {
  display: inline-block;
  padding: 12px 24px;
  border-radius: 8px;
  /* TODO: convierte este enlace en un botón llamativo */
}

/* TODO: da estilo a .beneficios y .card (fondo, borde, espaciado) */`,
    js: `// Esta misión es de HTML + CSS; aún no necesitas JavaScript.`,
  },
  4: {
    html: `<!-- 📱 Misión: Página Web para un Restaurante -->
<header class="nav">
  <span class="logo">Mi Restaurante</span>
  <nav>
    <a href="#menu">Menú</a>
    <a href="#galeria">Galería</a>
    <!-- TODO: añade un enlace de contacto -->
  </nav>
</header>

<section class="hero">
  <h1>Bienvenido</h1>
  <a class="cta" href="#menu">Ver menú</a>
</section>

<section id="menu" class="menu">
  <div class="plato"><h3>Plato 1</h3><p>Descripción · $10</p></div>
  <!-- TODO: añade al menos 3 platos más -->
</section>

<section id="galeria" class="galeria">
  <!-- TODO: añade varias imágenes (<img>) de la galería -->
</section>`,
    css: `body { font-family: sans-serif; margin: 0; }

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
}

.menu {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 16px;
}
/* TODO: da estilo a .plato (tarjeta con sombra) y añade un :hover con transición */

/* TODO: con una media query, haz que el menú use 1 columna en móvil */
@media (max-width: 600px) {
  /* ... */
}`,
    js: `// Esta misión es de maquetación (HTML + CSS). JavaScript es opcional.`,
  },
  5: {
    html: `<!-- ⚡ Misión: Calculadora Básica -->
<h1>Calculadora</h1>
<p>Abre la consola o usa los cuadros de diálogo para probarla.</p>
<button id="calcular">Calcular</button>
<p id="resultado"></p>`,
    css: `body { font-family: sans-serif; text-align: center; padding: 30px; }
button { font-size: 16px; padding: 8px 16px; cursor: pointer; }`,
    js: `// ⚡ Calculadora Básica: usa funciones para cada operación.

function sumar(a, b) {
  return a + b;
}
// TODO: crea las funciones restar, multiplicar y dividir

function calcular() {
  const a = Number(prompt("Primer número:"));
  const b = Number(prompt("Segundo número:"));

  let texto = "Suma: " + sumar(a, b);
  // TODO: agrega resta, multiplicación y división al texto
  // TODO: antes de dividir, comprueba que b no sea 0

  document.getElementById("resultado").textContent = texto;
}

document.getElementById("calcular").addEventListener("click", calcular);`,
  },
  6: {
    html: `<!-- 🔀 Misión: Sistema de Inicio de Sesión -->
<h1>Iniciar sesión</h1>
<button id="entrar">Entrar</button>
<p id="mensaje"></p>`,
    css: `body { font-family: sans-serif; text-align: center; padding: 30px; }
button { font-size: 16px; padding: 8px 16px; cursor: pointer; }`,
    js: `// 🔀 Sistema de Inicio de Sesión con intentos.

const USUARIO = "admin";
const CLAVE = "1234";
let intentos = 3;

function entrar() {
  // Repite mientras queden intentos
  while (intentos > 0) {
    const usuario = prompt("Usuario:");
    const clave = prompt("Contraseña:");

    if (usuario === USUARIO && clave === CLAVE) {
      document.getElementById("mensaje").textContent = "¡Bienvenido, " + usuario + "!";
      return;
    }

    intentos = intentos - 1;
    // TODO: avisa cuántos intentos quedan (usa alert o el párrafo #mensaje)
  }

  // TODO: si se acaban los intentos, muestra "cuenta bloqueada"
}

document.getElementById("entrar").addEventListener("click", entrar);`,
  },
  7: {
    html: `<!-- 📦 Misión: Administrador de Lista de Tareas (lógica) -->
<h1>Administrador de Tareas</h1>
<p>Mira la consola para ver el resultado de las funciones.</p>`,
    css: `body { font-family: sans-serif; padding: 20px; }`,
    js: `// 📦 Administrador de Tareas: funciones + array + objetos.

let tareas = [];

function agregar(texto) {
  tareas.push({ texto: texto, completada: false });
}

function listar() {
  for (let i = 0; i < tareas.length; i++) {
    const marca = tareas[i].completada ? "[x]" : "[ ]";
    console.log(i + ". " + marca + " " + tareas[i].texto);
  }
}

function completar(i) {
  // TODO: marca la tarea en la posición i como completada
}

// TODO: crea una función eliminar(i) que quite la tarea de esa posición

// Prueba tus funciones:
agregar("Estudiar JavaScript");
agregar("Hacer la tarea de web");
completar(0);
listar();
// TODO: muestra cuántas tareas quedan pendientes`,
  },
  8: {
    html: `<!-- 🕹️ Misión: Lista de Tareas Interactiva -->
<h1>Mis Tareas</h1>
<input id="nueva" type="text" placeholder="Nueva tarea..." />
<button id="agregar">Agregar</button>
<ul id="lista"></ul>`,
    css: `body { font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; }
li { padding: 8px; border-bottom: 1px solid #ddd; cursor: pointer; }
li.completada { text-decoration: line-through; color: gray; }
/* TODO: mejora el diseño (tarjetas, colores, hover) */`,
    js: `// 🕹️ Lista de Tareas Interactiva con el DOM.

const input = document.getElementById("nueva");
const lista = document.getElementById("lista");

function agregarTarea() {
  const texto = input.value;
  if (texto === "") return; // TODO: avisa si está vacío

  const li = document.createElement("li");
  li.textContent = texto;

  // Al hacer clic, marca como completada
  li.addEventListener("click", () => {
    li.classList.toggle("completada");
  });

  // TODO: añade un botón "borrar" dentro del <li> que elimine la tarea

  lista.appendChild(li);
  input.value = "";
}

document.getElementById("agregar").addEventListener("click", agregarTarea);
// TODO: muestra un contador de tareas pendientes`,
  },
  9: {
    html: `<!-- 🚀 Misión: Agenda Personal -->
<h1>Mi Agenda</h1>
<form id="form">
  <input id="nombre" type="text" placeholder="Nombre" />
  <input id="dato" type="text" placeholder="Teléfono o fecha" />
  <button type="submit">Agregar</button>
</form>
<ul id="lista"></ul>`,
    css: `body { font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; }
li { padding: 8px; border-bottom: 1px solid #ddd; }
/* TODO: dale estilo al formulario y a la lista */`,
    js: `// 🚀 Agenda Personal: formulario + localStorage + JSON.

const form = document.getElementById("form");
const lista = document.getElementById("lista");

// Recupera lo guardado (o un array vacío)
let entradas = JSON.parse(localStorage.getItem("agenda")) || [];

function guardar() {
  localStorage.setItem("agenda", JSON.stringify(entradas));
}

function pintar() {
  lista.innerHTML = "";
  for (const e of entradas) {
    const li = document.createElement("li");
    li.textContent = e.nombre + " — " + e.dato;
    lista.appendChild(li);
  }
}

form.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const dato = document.getElementById("dato").value;
  if (nombre === "" || dato === "") return; // TODO: avisa si falta algo

  entradas.push({ nombre: nombre, dato: dato });
  guardar();
  pintar();
  form.reset();
});

// TODO: añade un botón para eliminar cada entrada
// TODO (extra): añade un buscador que filtre por nombre

pintar();`,
  },
  10: {
    html: `<!-- 🏆 Proyecto Final — ¡tu aplicación web! -->
<header>
  <h1>Nombre de tu App</h1>
  <p>Una breve descripción de qué hace.</p>
</header>

<main>
  <!-- TODO: construye aquí la interfaz de tu proyecto -->
</main>

<footer>
  <!-- TODO: tu nombre y la tecnología usada -->
</footer>`,
    css: `body { font-family: sans-serif; margin: 0; padding: 20px; }
/* TODO: aplica tu paleta de colores, tipografía y diseño responsive */`,
    js: `// 🏆 Proyecto Final: organiza tu código en funciones.

function iniciar() {
  // TODO: prepara la app cuando carga la página
}

// TODO: programa las funciones principales de tu proyecto

iniciar();`,
  },
};

/** Andamiaje de algunos retos largos (clave = id del reto en lessonTasks). */
export const retoScaffolds: Record<string, WebProject> = {
  "p6s3-reto4": {
    html: `<!-- 🏅 Reto: Adivina el número -->
<h1>Adivina el número (1 a 20)</h1>
<button id="jugar">Jugar</button>
<p id="mensaje"></p>`,
    css: `body { font-family: sans-serif; text-align: center; padding: 30px; }`,
    js: `// Genera un número secreto y deja que el usuario adivine con pistas.

function jugar() {
  const secreto = Math.floor(Math.random() * 20) + 1;
  let intento = 0;

  while (intento !== secreto) {
    intento = Number(prompt("Adivina (1 a 20):"));
    // TODO: si intento < secreto di "más alto", si no "más bajo"
  }

  document.getElementById("mensaje").textContent = "¡Correcto! Era " + secreto;
}

document.getElementById("jugar").addEventListener("click", jugar);`,
  },
  "p8s2-reto1": {
    html: `<!-- 🏅 Reto: Contador completo -->
<h1 id="num">0</h1>
<button id="sumar">+1</button>
<button id="restar">-1</button>
<button id="reset">Reiniciar</button>`,
    css: `body { font-family: sans-serif; text-align: center; padding: 30px; }
button { font-size: 18px; padding: 8px 16px; margin: 4px; cursor: pointer; }`,
    js: `let n = 0;
const num = document.getElementById("num");

document.getElementById("sumar").addEventListener("click", () => {
  n = n + 1;
  num.textContent = n;
});

// TODO: haz que "restar" reste 1 y lo muestre
// TODO: haz que "reset" ponga el contador en 0`,
  },
  "p9s2-reto1": {
    html: `<!-- 🏅 Reto: Recuerda mi nombre -->
<h1 id="saludo">Hola 👋</h1>`,
    css: `body { font-family: sans-serif; text-align: center; padding: 30px; }`,
    js: `// Pide el nombre solo la primera vez y recuérdalo al volver.

let nombre = localStorage.getItem("nombre");

if (!nombre) {
  nombre = prompt("¿Cómo te llamas?");
  // TODO: guarda el nombre en localStorage
}

// TODO: muestra "Hola, NOMBRE" en el elemento #saludo`,
  },
};
