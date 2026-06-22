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

---

# Horarios de clase y créditos (Fase 8) — paso a paso

Añade **horarios**: clases semanales de 1 hora (un curso + un día + una hora).
Cada estudiante se asigna a **un** horario y, cada semana el día de su clase, se
le **descuenta 1 crédito** automáticamente.

## 1) Ampliar la base de datos

1. Supabase → **SQL Editor** → **New query**.
2. Pega TODO `supabase/migrations/0003_horarios.sql` → **Run**.
   - Crea la tabla `horarios`, añade `profiles.horario_id`, las reglas RLS y las
     funciones de descuento de créditos (incluido el botón manual del panel).

## 2) Activar el descuento automático semanal (cron)

1. Supabase → **Database → Extensions** → busca **`pg_cron`** → **Enable**.
2. Supabase → **SQL Editor** → pega TODO
   `supabase/migrations/0004_cron_creditos.sql` → **Run**.
   - Programa un job diario que descuenta 1 crédito a los estudiantes con clase
     ese día (calculado en zona horaria `America/Bogota`; ajústala en el SQL si
     lo necesitas).

> ¿No quieres usar el cron? Puedes saltarte el paso 2: desde el panel, en la
> pestaña **Horarios**, el botón **"Descontar créditos de hoy"** ejecuta el mismo
> descuento a mano.

## 3) Re-desplegar la función de creación de usuarios

`admin-create-user` ahora también guarda el horario del estudiante. Vuelve a
desplegarla:

```bash
npx supabase functions deploy admin-create-user
```

## 4) Numeración de grupos (Python1, Web1, …)

1. Supabase → **SQL Editor** → pega TODO
   `supabase/migrations/0005_grupos.sql` → **Run**.
   - Añade el número de **grupo** a `horarios` (numera los existentes) y un
     trigger que asigna el siguiente número por curso al crear uno nuevo.

## 5) Clase remota y bloqueo por créditos

1. Supabase → **SQL Editor** → pega TODO
   `supabase/migrations/0006_enlace_reunion.sql` → **Run**.
   - Añade `enlace_reunion` a `horarios` (el enlace de la videollamada del grupo).

Con esto, en la vista del estudiante (**Mis cursos**):

- El estudiante ve **solo su curso** inscrito.
- El botón **“Ingresar a la clase remota”** aparece únicamente durante la franja
  de su clase (desde 10 min antes hasta que termina la hora). El docente del
  grupo ve **“Iniciar clase (anfitrión)”** en la misma franja; ambos entran a la
  **misma sala**.
- Si dejas el **enlace de reunión** vacío en el grupo, la app genera una sala
  **Jitsi** automática y estable por grupo (sin configurar nada). Si pones un
  enlace (Zoom/Meet/Teams), se usa ese.
- Cuando los créditos del estudiante bajan a **3 o menos**, ve una advertencia.
  Al llegar a **0**, su curso queda **bloqueado** (no entra al editor ni a la
  clase) hasta que renueves sus créditos.

## 6) Usar

En **Administración** verás dos pestañas:

- **Horarios:** resumen de cuántos grupos hay por curso y la lista de clases
  (cada grupo se nombra `Python1`, `Web1`, `Scratch1`, …). Crea/edita/elimina
  clases (curso, día, hora, docente y enlace de reunión opcionales).
- **Usuarios:** al crear o editar un estudiante, elige su **grupo/horario** (el
  curso se deriva del grupo elegido) y sus **créditos**.
