# Configurar Supabase para LuckSoft (Fase 5) — paso a paso

Esta guía es para alguien que **nunca ha usado Supabase**. Síguela en orden.
Al terminar, la app dejará de usar `localStorage` y pasará a una base de datos
real compartida: docente y estudiantes podrán usar **PCs distintos**.

> Mientras no completes esto, la app sigue funcionando con `localStorage` (no se
> rompe nada). El cambio se activa solo cuando creas el archivo `.env` del paso 7.

---

## 1) Crear cuenta y proyecto

1. Entra a **https://supabase.com** y pulsa **Start your project** / **Sign in**.
   Puedes entrar con tu cuenta de GitHub.
2. En el panel, pulsa **New project**.
3. Rellena:
   - **Name:** `lucksoft`
   - **Database Password:** inventa una y **guárdala** (la pide Postgres; no es
     la de los usuarios de la app).
   - **Region:** la más cercana a ti.
4. Pulsa **Create new project** y espera 1–2 minutos a que se aprovisione.

## 2) Crear las tablas (ejecutar el SQL)

1. En el menú lateral, abre **SQL Editor**.
2. Pulsa **New query**.
3. Abre el archivo del repo **`supabase/migrations/0001_init.sql`**, copia TODO
   su contenido, pégalo en el editor y pulsa **Run** (abajo a la derecha).
4. Debe decir **Success**. Esto crea las tablas `profiles` y `submissions`, las
   reglas de seguridad (RLS) y el disparador que crea el perfil al registrarse.

## 3) Permitir login sin confirmar email

Como usaremos correos ficticios (`alumno@lucksoft.local`), hay que desactivar la
confirmación por email:

1. Menú lateral → **Authentication** → **Sign In / Providers** (o **Providers**).
2. Abre **Email**.
3. **Desactiva** la opción **Confirm email** (Confirmar email).
4. Guarda.

## 4) Crear los 3 usuarios demo

1. Menú lateral → **Authentication** → **Users** → **Add user** → **Create new user**.
2. Crea estos tres (marca **Auto Confirm User** si aparece la opción):

   | Email                     | Password   |
   | ------------------------- | ---------- |
   | `docente@lucksoft.local`  | `123456`   |
   | `alumno@lucksoft.local`   | `123456`   |
   | `alumno2@lucksoft.local`  | `123456`   |

   > La contraseña debe tener **mínimo 6 caracteres** (por eso `123456`, no
   > `1234`). Es la que escribirás al iniciar sesión en la app.

## 5) Asignar rol y nombre

1. Vuelve a **SQL Editor** → **New query**.
2. Copia y ejecuta el contenido de **`supabase/seed-roles.sql`**.
3. La consulta final debe mostrar a `Prof. García` como **docente** y a los dos
   alumnos como **estudiante**.

## 6) Copiar las credenciales

1. Menú lateral → **Project Settings** (el engranaje) → **API**.
2. Copia dos valores:
   - **Project URL** (algo como `https://xxxx.supabase.co`)
   - **anon public** key (una cadena larga; la `anon`, **no** la `service_role`).

> La clave `anon` es segura para el navegador: la seguridad real la dan las
> reglas RLS del paso 2. **Nunca** uses la `service_role` en el frontend.

## 7) Crear el archivo `.env`

En la **raíz del proyecto** (junto a `package.json`), crea un archivo llamado
`.env` con este contenido (pega tus valores):

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...la-clave-anon...
```

> `.env` está en `.gitignore`: tus claves no se suben a GitHub. Usa `.env.example`
> como plantilla.

## 8) Arrancar y probar

1. Si el dev server está corriendo, **deténlo y vuelve a arrancarlo** (Vite solo
   lee `.env` al iniciar):
   ```
   npm run dev
   ```
2. Entra con `docente` / `123456` y con `alumno` / `123456`.
3. Prueba el ciclo: el alumno entrega → el docente (incluso en **otro
   navegador/PC**) lo ve en *Calificar* y pone nota → el alumno la ve en
   *Mis notas*. ✅ Ya es multiusuario real.

---

## Si algo falla

- **"Invalid login credentials":** revisa que desactivaste *Confirm email*
  (paso 3), que el email termina en `@lucksoft.local` y que la contraseña tiene
  ≥ 6 caracteres.
- **El alumno no ve sus notas / el docente no ve entregas:** revisa que el SQL
  del paso 2 corrió sin error (las políticas RLS) y que el seed del paso 5
  asignó bien el rol `docente`.
- **La app sigue en modo local:** asegúrate de que `.env` está en la raíz, con
  el prefijo `VITE_`, y de haber reiniciado `npm run dev`.
- **Para volver al modo local:** borra o renombra `.env` y reinicia.