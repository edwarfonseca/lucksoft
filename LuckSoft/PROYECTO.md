# LuckSoft — Resumen del proyecto (handoff)

> Pega este archivo (o su contenido) al iniciar un nuevo chat para retomar el contexto.

## Qué es

**LuckSoft** es una plataforma educativa de programación que corre **100% en el
navegador, sin backend**. Tiene login con roles (docente/estudiante), varios
cursos con editores funcionales, y un sistema de entregas y calificaciones.

- Carpeta del proyecto: `c:\Users\edwar\Desktop\Ejercicios JS\LuckSoft`
- (El `index.html` de la carpeta padre `Ejercicios JS` es una prueba vieja, no es parte de LuckSoft.)

## Cómo ejecutar

```powershell
cd "c:\Users\edwar\Desktop\Ejercicios JS\LuckSoft"
python server.py
```

Abrir **http://localhost:8000/** (Ctrl+F5 para evitar caché).

`server.py` es clave: sirve los archivos con cabeceras de **aislamiento de
origen** (`Cross-Origin-Opener-Policy: same-origin` y
`Cross-Origin-Embedder-Policy: credentialless`). Sin ellas, el editor de Python
no puede usar `SharedArrayBuffer` y la entrada por consola deja de funcionar.

## Cuentas de demo (contraseña `1234`)

| Usuario   | Rol        |
| --------- | ---------- |
| `docente` | docente    |
| `alumno`  | estudiante |
| `alumno2` | estudiante |

## Estructura de archivos

```
LuckSoft/
├── server.py              Servidor dev con cabeceras COOP/COEP
├── index.html             Login
├── cursos.html            Catálogo de cursos (barra según rol)
├── python.html            Editor de Python
├── scratch.html           Editor de Scratch (embebe scratch-editor/)
├── web.html               Editor de Diseño Web (HTML/CSS/JS)
├── notas.html             Estudiante: ver sus calificaciones
├── calificar.html         Docente: revisar entregas y calificar
├── scratch-editor/        Build de TurboWarp (NO en git; ver Scratch abajo)
├── css/styles.css         Estilos de toda la plataforma
└── js/
    ├── auth.js            Login + roles (requireLogin / requireRole)
    ├── db.js              CAPA DE DATOS (localStorage) — entregas/notas
    ├── ui.js              Barra superior (renderTopbar) según rol
    ├── clase.js           Botón "Unirse a la clase" (Jitsi)
    ├── editor.js          Lógica del editor de Python
    ├── pyworker.js        Web Worker que corre Pyodide
    ├── assignments.js     Tareas + botón Entregar (Python)
    ├── web.js             Editor web: pestañas, preview, tareas, entregar
    └── scratch.js         Integración Scratch: autosave/entregar/revisar
```

## Cursos y cómo funciona cada editor

### Python (`python.html` + `editor.js` + `pyworker.js`)

- Pyodide (Python real vía WebAssembly) corre en un **Web Worker**.
- `input()` es **bloqueante por consola** usando `SharedArrayBuffer` + `Atomics`
  (por eso hacen falta las cabeceras COOP/COEP). Si no hay aislamiento de origen,
  cae a un modo de respaldo con `window.prompt`.
- Salida **inmediata** (`setStdout({write})`, no `batched`) para que el mensaje
  de `input()` aparezca antes del campo de entrada.
- Autocompletado con addon show-hint de CodeMirror.
- Botón **⏹ Detener** termina el worker (corta bucles `while True`).

### Diseño Web (`web.html` + `web.js`)

- Tres editores CodeMirror en **pestañas** (HTML/CSS/JS), uno a pantalla completa.
- **Vista previa en vivo** combinando el código en un `<iframe srcdoc sandbox>`.
- Autocompletado por lenguaje (html-hint/css-hint/javascript-hint) + autocierre
  de etiquetas.

### Scratch (`scratch.html` + `scratch.js`)

- Se auto-hospeda el editor **TurboWarp** (scratch-gui). Para compilarlo:
  ```
  git clone --depth=1 https://github.com/TurboWarp/scratch-gui
  cd scratch-gui && npm install && npm run build
  ```
  Copiar `build/` a `LuckSoft/scratch-editor/`. La página embebe
  `scratch-editor/editor.html` en un iframe.
- **PARCHE IMPORTANTE:** TurboWarp bloquea el embebido con
  `const isInvalidEmbed = window.parent !== window` en
  `scratch-editor/js/editor.js`. Se cambió a `const isInvalidEmbed = false`.
  ⚠️ **Este parche se pierde si recompilas y vuelves a copiar el build.**
- Se accede al motor expuesto `window.vm` desde el iframe (mismo origen) para:
  - Autoguardar el proyecto en localStorage (`vm.saveProjectSb3()`).
  - Restaurar al volver (`vm.loadProject(...)`).
  - Entregar y que el docente revise (`scratch.html?review=<id>`).
- ⚠️ **Gotcha resuelto:** al cargar el `.sb3` hay que pasar un **`Uint8Array`**,
  no un `ArrayBuffer`; si no, Scratch no detecta el ZIP y falla con
  "Could not parse as a valid SB2 or SB3 project".

## Sistema de roles y calificaciones

- `auth.js`: login falso con roles, sesión en `sessionStorage`.
- `db.js`: **única capa de persistencia** (localStorage). Entregas tienen
  `kind`: `"python"` (texto en `code`), `"web"` (objeto `{html,css,js}` en
  `project`) o `"scratch"` (sb3 en base64 en `project`).
- Estudiante entrega desde el editor → docente ve en `calificar.html`
  (código, vista previa web, o abrir/descargar proyecto Scratch) y pone nota +
  comentario → estudiante lo ve en `notas.html`.

## Clases remotas (Jitsi)

- `clase.js`: botón **📹 Unirse a la clase** en cada editor. Abre una sala fija
  por curso en `meet.jit.si` (`LuckSoftAula<Curso>`) en pestaña nueva, con el
  nombre del usuario. Sin backend ni cuentas.

## Limitaciones actuales (es una MAQUETA)

- **Todo vive en `localStorage`** → docente y estudiante deben usar el **mismo
  navegador/PC** para verse. No es multiusuario real.
- Login es de prueba (credenciales en el JS del cliente).
- localStorage ~5 MB: proyectos Scratch muy pesados pueden no caber.

## Próximos pasos / ideas pendientes

1. **Fase 2 — Supabase:** reemplazar el interior de `db.js` por Supabase
   (auth real con roles, base de datos compartida multi-dispositivo,
   almacenamiento de archivos). La arquitectura ya está aislada para este salto.
2. **Curso de SQL** con `sql.js` (SQLite en el navegador) — recomendado, encaja
   igual que Python.
3. **Python para Datos** (pandas/matplotlib, ya soportados por Pyodide).
4. **Jitsi IFrame API**: incrustar la clase y **registrar asistencia**
   automáticamente en `db.js` (requiere una página de clase servida SIN las
   cabeceras de aislamiento).
5. Posible: MakeCode Arcade (bloques estilo Scratch que corren en el navegador).

```

## Herramientas instaladas: Node v24, npm, git, Python 3.13.
```
