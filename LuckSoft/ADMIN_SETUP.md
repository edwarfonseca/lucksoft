# Configurar el panel de Admin (Fase 7) — paso a paso

Requisito previo: ya tienes Supabase configurado (ver `SUPABASE_SETUP.md`).
Esto añade el rol **admin** y la capacidad de crear/borrar cuentas de forma
segura mediante **Edge Functions** (la clave secreta `service_role` vive solo en
el servidor, nunca en el navegador).

---

## 1) Ampliar la base de datos

1. Supabase → **SQL Editor** → **New query**.
2. Pega TODO `supabase/migrations/0002_admin_and_profile_fields.sql` → **Run**.
   - Añade el rol `admin`, los campos de perfil (nombres, apellidos, edad,
     curso, créditos, acudiente, país, activo) y las reglas RLS de admin.

## 2) Crear la cuenta de administrador

1. Supabase → **Authentication → Users → Add user → Create new user**.
2. Email `admin@lucksoft.local`, contraseña `123456` (o la que quieras, mín. 6),
   marca **Auto Confirm User**.
3. Supabase → **SQL Editor** → pega y ejecuta `supabase/seed-admin.sql`.
   - Convierte esa cuenta en `admin`. La consulta final debe mostrarla.

## 3) Desplegar las Edge Functions

Las funciones (`admin-create-user`, `admin-delete-user`) están en
`supabase/functions/`. Se despliegan con la CLI de Supabase (necesitas Node, que
ya tienes). En una terminal en la raíz del proyecto:

```bash
# 1) Iniciar sesión (abre el navegador para autorizar) — solo la primera vez
npx supabase login

# 2) Enlazar este repo con tu proyecto Supabase — solo la primera vez
npx supabase link --project-ref unimlouxtqbiwibypakg

# 3) Desplegar las dos funciones
npx supabase functions deploy admin-create-user
npx supabase functions deploy admin-delete-user
```

> No hace falta configurar secretos: Supabase inyecta `SUPABASE_URL`,
> `SUPABASE_ANON_KEY` y `SUPABASE_SERVICE_ROLE_KEY` en las funciones
> automáticamente. La verificación de JWT (activada por defecto) está bien: las
> funciones además comprueban por su cuenta que quien llama tiene rol `admin`.

Para comprobar que se desplegaron: Supabase → **Edge Functions** → deben
aparecer las dos.

## 4) Probar

Cuando esté lista la UI (Fase 7b), entra con `admin` / `123456` y verás el
panel **Administración** para crear, editar y eliminar estudiantes y docentes.

---

## Notas de seguridad

- Crear/borrar cuentas pasa **siempre** por las Edge Functions (con
  `service_role` en el servidor). El navegador nunca ve esa clave.
- Editar datos del perfil (nombre, edad, curso, créditos…) lo hace el admin
  directo contra la tabla, protegido por RLS (`is_admin()`).
- Un admin no puede eliminar su propia cuenta (lo bloquea la función).
