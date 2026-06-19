# LuckSoft — Plan de profesionalización

> Migración de la maqueta vanilla/localStorage a una app **React + TypeScript +
> Supabase** con **arquitectura hexagonal (Ports & Adapters)**.
> Documento vivo: marca cada paso a medida que avanzas.

## Decisiones tomadas

- **Backend real:** Supabase (Auth + Postgres + RLS + Storage).
- **UI:** React + TypeScript.
- **Build:** Vite.
- **Arquitectura:** Hexagonal. El dominio no depende de React ni de Supabase.
- **Migración incremental**, nunca big-bang: cada fase deja la app funcionando.

---

## Stack final

| Capa            | Tecnología                                           |
| --------------- | ---------------------------------------------------- |
| Lenguaje        | TypeScript (strict)                                  |
| Build / dev     | Vite                                                 |
| UI              | React + React Router                                 |
| Estado servidor | TanStack Query                                       |
| Backend         | Supabase (Postgres, Auth, Storage, RLS)              |
| Validación      | Zod (formularios + respuestas del backend)           |
| Estilos         | CSS Modules (migrando desde `css/styles.css`)        |
| Tests           | Vitest + Testing Library (unidad) · Playwright (e2e) |
| Calidad         | ESLint + Prettier + Husky + lint-staged              |
| Commits         | Conventional Commits                                 |
| CI/CD           | GitHub Actions → Vercel / Cloudflare Pages           |

---

## Estructura objetivo del repo

```
lucksoft/
├── index.html
├── package.json · tsconfig.json · vite.config.ts
├── .env.example · eslint.config.js · .prettierrc
├── .github/workflows/ci.yml
├── supabase/
│   ├── migrations/            # schema versionado
│   └── seed.sql               # usuarios y tareas demo
└── src/
    ├── main.tsx
    ├── app/
    │   ├── router.tsx
    │   └── providers.tsx       # QueryClient + AuthProvider
    ├── domain/                 # NÚCLEO — sin dependencias externas
    │   ├── models/             # Submission, User, Course, Grade
    │   └── ports/              # SubmissionRepository, AuthService (interfaces)
    ├── application/            # casos de uso: submitAssignment, gradeSubmission…
    ├── infrastructure/         # ADAPTADORES
    │   ├── supabase/           # SupabaseSubmissionRepository, SupabaseAuthService
    │   └── local/              # LocalSubmissionRepository (offline / tests)
    ├── courses/                # STRATEGY: un módulo por curso
    │   ├── CourseStrategy.ts   # interfaz común
    │   ├── python/ · web/ · scratch/
    │   └── registry.ts         # mapa kind -> estrategia
    ├── features/               # UI por feature: auth, courses, grading, grades
    ├── components/             # UI compartida (Topbar…)
    ├── lib/                    # utils: escapeHtml, base64, zod schemas
    └── styles/
```

**Regla de dependencias:** `domain` ← `application` ← (`infrastructure`, `features`).
El dominio nunca importa de React ni de Supabase. Los adaptadores implementan
los _ports_ definidos en el dominio.

---

## Patrones aplicados

- **Repository / Port:** formaliza el actual `js/db.js` como interfaz
  `SubmissionRepository`. Implementaciones: Supabase y Local.
- **Adapter:** intercambiar persistencia sin tocar dominio ni UI.
- **Strategy:** cada curso (`python`/`web`/`scratch`) implementa
  `render()`, `submit()`, `renderReview()`. Elimina los `if (kind === …)` de
  `calificar.html` y de cada editor. Añadir un curso = añadir una estrategia.
- **Factory + Registry:** `courses/registry.ts` resuelve la estrategia por `kind`.
- **Provider/Context:** sesión y QueryClient vía React Context.

---

## Modelo de datos (Supabase)

```sql
-- profiles: extiende auth.users con rol
create type user_role as enum ('docente', 'estudiante');
create table profiles (
  id         uuid primary key references auth.users on delete cascade,
  full_name  text not null,
  role       user_role not null default 'estudiante'
);

-- submissions: una entrega por (assignment, student)
create table submissions (
  id             uuid primary key default gen_random_uuid(),
  assignment_id  text not null,
  activity_title text not null,
  student_id     uuid not null references profiles(id),
  kind           text not null check (kind in ('python','web','scratch')),
  code           text,                 -- python
  project        jsonb,                -- web {html,css,js}
  project_path   text,                 -- scratch: ruta en Storage (.sb3)
  submitted_at   timestamptz not null default now(),
  grade          int check (grade between 0 and 100),
  comment        text,
  graded_at      timestamptz,
  graded_by      uuid references profiles(id),
  unique (assignment_id, student_id)
);
```

**Storage:** los `.sb3` de Scratch (pueden pesar MB) van a un bucket
`scratch-projects`, no en la fila. La fila guarda solo `project_path`.

**RLS (lo que mata la limitación "mismo navegador" de forma segura):**

```sql
alter table submissions enable row level security;

-- Estudiante: ve, crea y reenvía SOLO lo suyo
create policy "alumno lee lo suyo" on submissions
  for select using (student_id = auth.uid());
create policy "alumno entrega lo suyo" on submissions
  for insert with check (student_id = auth.uid());
create policy "alumno reenvia lo suyo" on submissions
  for update using (student_id = auth.uid());

-- Docente: ve todo y califica
create policy "docente lee todo" on submissions
  for select using (
    exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'docente')
  );
create policy "docente califica" on submissions
  for update using (
    exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'docente')
  );
```

> Con esto, un alumno **no puede** leer notas de otros aunque manipule el cliente.
> La seguridad deja de vivir en el JS del navegador.

Las **tareas** (`ASSIGNMENTS`, `WEB_ASSIGNMENTS`) pueden quedarse como config
estática en `courses/*/assignments.ts` (más simple) o migrar a una tabla
`assignments` si quieres que el docente las edite. Recomendado: empezar estáticas.

---

## Fases de ejecución

Cada fase es un PR revisable y deja la app usable.

### Fase 0 — Higiene y seguridad (sin reescritura)

- [ ] `git init` + `.gitignore` (node_modules, scratch-editor/, .env).
- [ ] ESLint + Prettier + EditorConfig.
- [ ] **Arreglar XSS**: escapado completo (incluye comillas) o DOMPurify en
      `calificar.html` (`activityTitle`, `comment`, `studentName`).
- [ ] Extraer duplicación (`DIFICULTAD_LABEL`, `escapeHtml`, base64, `buildDoc`)
      a un único `lib/`.

### Fase 1 — Andamiaje React + TS + Vite

- [ ] `npm create vite@latest` (plantilla react-ts).
- [ ] `tsconfig` en modo `strict`.
- [ ] Estructura de carpetas objetivo (vacía, por capas).
- [ ] React Router con las rutas: login, cursos, python, web, scratch, notas,
      calificar.

### Fase 2 — Dominio + Ports (TypeScript puro, testeable)

- [ ] Modelos: `Submission`, `User`, `Course`, `Grade` con Zod.
- [ ] Ports: `SubmissionRepository`, `AuthService`.
- [ ] Casos de uso en `application/`.
- [ ] `LocalSubmissionRepository` (reusa la lógica actual de `db.js`) para seguir
      funcionando offline y para tests.

### Fase 3 — Strategy de cursos

- [ ] Interfaz `CourseStrategy`.
- [ ] Implementar `python`, `web`, `scratch` (mover lógica de los editores).
- [ ] `registry.ts`. Borrar los `if (kind)` dispersos.

### Fase 4 — UI a componentes React

- [ ] Topbar, login, catálogo de cursos, editores, panel de calificar, notas.
- [ ] Editores: CodeMirror 6 vía `@uiw/react-codemirror`.
- [ ] El escapado anti-XSS pasa a ser automático (JSX) salvo `dangerouslySetInnerHTML`.

### Fase 5 — Supabase

- [ ] Proyecto Supabase + migraciones + RLS (schema de arriba).
- [ ] `SupabaseAuthService` (reemplaza el login falso de `auth.js`).
- [ ] `SupabaseSubmissionRepository` (implementa el mismo Port).
- [ ] Storage para `.sb3`.
- [ ] TanStack Query para fetch/cache/mutaciones.
- [ ] Cambiar el binding del Port: Local → Supabase. El resto no cambia.

### Fase 6 — Calidad y entrega

- [ ] Vitest: dominio y casos de uso (entregar → calificar → ver nota).
- [ ] Playwright: flujo e2e estudiante y docente.
- [ ] Husky + lint-staged (lint/format/test en pre-commit).
- [ ] GitHub Actions: lint + typecheck + test + build.
- [ ] Deploy en Vercel/Cloudflare Pages. Variables de entorno de Supabase.

---

## Notas heredadas que NO se pierden

- **COOP/COEP**: en Vercel/Cloudflare se configuran por headers (igual que hacía
  `server.py`). Necesarias para `SharedArrayBuffer` del editor de Python. En dev,
  Vite los pone vía `server.headers` en `vite.config.ts`.
- **Parche de TurboWarp** (`isInvalidEmbed = false`): documentarlo como paso de
  post-build del `scratch-editor/`; sigue sin ir en git.
- **Scratch `.sb3` como `Uint8Array`** al cargar: conservar ese detalle al mover
  la lógica a `courses/scratch/`.
- **Jitsi** (`clase.js`): se vuelve un componente; abrir en pestaña nueva sigue
  evitando el choque con las cabeceras de aislamiento.

---

## Orden recomendado para empezar

Fase 0 (rápida, alto valor: seguridad + git) → Fase 1 → Fase 2.
Las fases 0–4 se pueden hacer sin tocar Supabase; la 5 es el salto multiusuario.
