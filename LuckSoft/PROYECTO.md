# LuckSoft — Estado del proyecto (handoff)

> Documento de contexto para retomar el trabajo en una nueva sesión.
> Actualizado: 2026-07-09. La descripción de la maqueta vanilla original quedó
> en el historial de git de este archivo; ya no aplica.

## Qué es

**LuckSoft Academy** es una plataforma educativa de programación (cursos de
Python, Diseño Web y Scratch) con roles (estudiante/docente/admin), editores en
el navegador, currículos gamificados, entregas/calificaciones, grupos con
horarios y créditos, y mascota virtual.

- **Producción:** https://app.lucksoftacademy.com (Vercel, plan Hobby).
  - Dominio `lucksoftacademy.com` comprado en Porkbun (~$11 USD/año, renovación
    estable). La raíz sirve la **landing comercial** (publicada 2026-07-11):
    proyecto Vercel separado que despliega `edwarfonseca/luksoft-frontend`
    (React+Vite, desarrollado por DajerlyMoreno, ella sigue de colaboradora);
    su `vercel.json` hace proxy de `/api/*` al backend de ella
    (`https://luksoft-backend.vercel.app`, Express+Supabase propio) — así no hay
    CORS ni variables de entorno. Panel de contenido en `/admin`. `www.` redirige
    308 a la raíz. Se separó de la plataforma porque las cabeceras COOP/COEP
    romperían los embeds de una landing.
  - DNS en Porkbun: `A @ → 216.198.79.1`, `CNAME app → 2a79bb48bc7ca67e.vercel-dns-017.com`
    y `CNAME www → 30733e4aee446379.vercel-dns-017.com`.
  - `lucksoft.vercel.app` sigue activa pero ya no se comparte.
- **Repo:** https://github.com/edwarfonseca/lucksoft (rama `main`).
- **Flujo git:** rama feature → Conventional Commit (SIN co-author trailer) →
  merge `--no-ff` a main → push → borrar rama. Vercel redespliega solo con cada
  push a main. **NUNCA versionar material de estudio personal** (zips, apuntes;
  ya ignorado en `.gitignore`) — en `docs/` solo van las guías `clases-*`
  generadas desde los currículos. Evitar `git add -A` a ciegas: revisar qué
  entra en cada commit.

## Stack y arquitectura

React 19 + TypeScript strict + Vite 8 + React Router 7 + Zod 4 + Supabase
(`@supabase/supabase-js`) + CodeMirror 6 (`@uiw/react-codemirror`).
**Arquitectura hexagonal**; regla de dependencias: `domain` ← `application` ←
(`infrastructure`, `features`).

```
src/
├── app/            router.tsx · services.ts (raíz de composición: binding de ports)
├── domain/         models (user, profile, submission, course, curriculum, lessons,
│                   horario, enrollment, teacherGroup, stats, pet) · ports
│                   (AuthService, SubmissionRepository, AdminService,
│                   EnrollmentService, ProfileService, PetService)
├── application/    casos de uso (submitAssignment, gradeSubmission,
│                   listSubmissions, loadEnrollment, manageUsers, manageHorarios,
│                   manageProfile, adminStats, pet, authenticate)
├── infrastructure/ local/ (localStorage; fallback sin .env) · supabase/
├── courses/        Strategy + registry (python/web/scratch) · curriculum.ts
│                   (mapa kind→currículo) · <curso>/curriculum.ts + scaffolds.ts
├── features/       auth · courses · grading · grades · admin · pets · profile
└── components/     AppLayout · UserMenu · Avatar
```

- Sin `.env` → modo localStorage (demo); con `VITE_SUPABASE_URL/ANON_KEY` → Supabase.
- **COOP/COEP** en todas las respuestas (vercel.json en prod, `server.headers`
  de vite en dev): imprescindibles para SharedArrayBuffer del editor Python.
- Calidad: Vitest (~69 tests), ESLint 9, Prettier, Husky+lint-staged.
  Antes de commitear: `npm run typecheck && npm run lint && npm run test && npm run build`.

## Funcionalidades construidas

### Cursos y editores

- **Python:** Pyodide en Web Worker, `input()` bloqueante (SharedArrayBuffer+Atomics),
  botón Detener, autocompletado, y módulo **turtle** propio (`public/turtle_shim.py`
  - `pyworker.js` → dibuja en canvas).
- **Diseño Web:** 3 editores (HTML/CSS/JS) en pestañas + vista previa en vivo
  (iframe srcdoc sandbox). Panel de código con **alto redimensionable** arrastrando.
- **Scratch:** TurboWarp autohospedado en `public/scratch-editor/` (NO va en git,
  ~65 MB; recompilar y aplicar parche `isInvalidEmbed = false`). Cargar .sb3
  como **Uint8Array**.
- **Currículos gamificados** (los 3 cursos): 10 periodos × 4 sesiones = 40
  lecciones (S1 intro · S2 práctica · S3 retos · S4 misión), con XP, insignias,
  agendas de 90 min, ejercicios/retos/misión, andamiajes con TODO (Python y Web).
  El editor recibe la lección por URL `?periodo=&sesion=`; las entregas llevan
  prefijo `P·S` en el título. Cada sesión trae además una **tarea para la casa**
  (refuerzo sin docente, ~25 min; contenido en `courses/<curso>/tareasCasa.ts`,
  aparece de última en el panel de Tarea con 🏠 y se entrega igual que las de
  clase; en Scratch es guía de práctica, sin entrega separada).
- Lecciones bloqueadas por progreso: solo las vistas + la siguiente durante su
  horario de clase (`set_progreso` solo permite avanzar de a 1).

### Pruebas gratis públicas (`/prueba-python` y `/prueba-scratch`)

Aventuras guiadas de 3 misiones (~5 min) SIN registro, para captar padres:
Lucky (guía estilo videojuego, `src/features/demo/`; piezas compartidas en
`guia.tsx`) habla en burbujas con máquina de escribir. **Python**
(`/prueba-python`, 10+; `/prueba` redirige aquí por compatibilidad): saludo
con print(), tortuga y estrella (144°), evaluado al ejecutar.
**Scratch** (`/prueba-scratch`, 7-9): TurboWarp embebido y Lucky detecta EN
VIVO los bloques que el niño arrastra (evento PROJECT_CHANGED → escaneo de
opcodes: mover/decir/efecto color), con botón «💡 Dame una pista»; los textos
dicen "tu personaje" porque TurboWarp elige un sprite al azar. XP + chips +
cierre con CTA a la clase gratis; enlaces cruzados entre ambas. Corren 100% en
el navegador, no tocan Supabase. Pendientes: animaciones HTML de Lucky en
`public/characters/lucky/` (hola/habla/celebra/piensa, mapa `ANIMACIONES_GUIA`
en `guia.tsx`; mientras tanto emojis) y el número en `WHATSAPP_NUMERO`
(`contacto.ts`; vacío = CTA lleva a la landing).

### Roles

- **Estudiante:** sus cursos inscritos, créditos (bolsa compartida; advertencia
  ≤3, bloqueo total en 0), clase remota (Jitsi o enlace del grupo, botón solo en
  la franja horaria), Mis notas, **Mascota** tamagotchi (energía −34 por lección,
  monedas = nota/10, tienda de comida; animaciones HTML del tiburón en
  `public/pets/` mapeadas por estado en PetPage, escaladas con `--pet-scale`).
- **Docente:** vista "Tus grupos" (conteo + tarjetas) → estudiantes del grupo con
  créditos y modal "Ver información" (edad, acudiente, teléfono, país).
  **Calificar por curso** (`/calificar` → `/calificar/:kind`): solo ve entregas
  de estudiantes de SUS grupos.
- **Admin:** Usuarios (CRUD vía Edge Functions con service_role; credenciales,
  grupos múltiples, créditos, desbloquear lecciones), Horarios (grupos Python1…,
  día/hora/docente/enlace, descuento manual de créditos), **Pagos** (historial
  automático: cada aumento de créditos = pago del acudiente; resumen del mes,
  búsqueda por estudiante), **Estadísticas**
  (entregas por grupo con lecciones alcanzadas y entregas/esperadas %, y
  estudiantes con <3 créditos con datos de acudiente).
- **Todos:** menú de usuario con avatar (foto o iniciales) + **Mi perfil**
  (editar nombre para mostrar y subir avatar a Storage). Login sin cuentas demo
  visibles, con personaje animado (`public/characters/saludo.html`).

## Supabase (proyecto ref `unimlouxtqbiwibypakg`)

- **Migraciones 0001–0017 TODAS aplicadas en producción** (`supabase/migrations/`):
  init (profiles/submissions/RLS) · admin+campos perfil · horarios · cron créditos
  (pg_cron) · grupos · enlace reunión · username · progreso · inscripciones ·
  mascota (fix ambigüedad en 0011) · 0012 `mis_estudiantes()` (docente→sus
  estudiantes) · 0013 `admin_entregas_por_grupo()` · 0014
  `docente_estudiantes_grupo()` · 0015 avatar (columna, RPC
  `actualizar_mi_perfil`, bucket `avatars` público + políticas por carpeta).
- 0016 aplicada (2026-07-11): las estadísticas esperan 2 entregas por lección
  (clase + tarea de casa) en Python/Web; Scratch sigue en 1.
- 0017 aplicada (2026-07-12, probada por el admin): tabla `pagos` + trigger que
  registra cada aumento de créditos como pago (snapshot del nombre) + RPC
  `admin_historial_pagos()`.
- **Edge Functions desplegadas:** admin-create-user, admin-delete-user,
  admin-update-credentials.
- **Auth:** login usuario→email `usuario@lucksoft.local`; Site URL
  `https://app.lucksoftacademy.com`; redirect URLs incluyen el dominio y
  lucksoft.vercel.app. Patrón de seguridad: lo que cruza datos de varios usuarios
  va en RPC SECURITY DEFINER validando `auth.uid()`/`is_admin()`.

## Material docente

`docs/clases-{python,web,scratch}.{html,doc}`: guías completas de las 40 clases
por curso, **generadas desde los currículos** (regenerables si cambia el
contenido; el generador fue un test temporal, pedirlo de nuevo si hace falta).
HTML → imprimir a PDF; .doc → editable en Word.

## Pendientes / próximos pasos

1. ~~Landing comercial~~ **publicada** en `lucksoftacademy.com` (2026-07-11).
   Riesgo conocido: si Dajerly renombra su proyecto Vercel del backend, se rompe
   el proxy (`luksoft-backend.vercel.app`).
2. **Google Search Console**: registrar el dominio ahora que la landing existe.
3. ~~Backlog UI: modales propios en vez de `confirm`/`alert`~~ hecho (2026-07-11):
   `DialogProvider` global (`useDialog` → `confirmar`/`avisar`) en
   `src/components/`; ya no queda ningún alert/confirm nativo en la app.
4. Al empezar a **cobrar**: Vercel Hobby es no-comercial → Pro ($20/mes) o migrar
   a Cloudflare Pages (gratis comercial; `public/_headers` ya listo). Supabase
   free se pausa tras ~1 semana de inactividad → Pro ($25/mes) cuando haya
   ingresos. Pagos en Colombia: Wompi / MercadoPago / PayU.
5. Ideas de cursos: SQL (sql.js), C/C++ (hoy son teasers en el catálogo).
