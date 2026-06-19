# domain — Núcleo

Modelos y reglas de negocio puras: `Submission`, `User`, `Course`, `Grade`, y
las interfaces (_ports_) que el dominio necesita del exterior, p. ej.
`SubmissionRepository` y `AuthService`.

**Regla de dependencias:** esta capa NO importa nada de React, Supabase, ni de
ninguna otra capa. Todo el resto del sistema depende de ella, nunca al revés.

Se llena en la **Fase 2** (ver `LuckSoft/PLAN.md`).