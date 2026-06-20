# Desplegar LuckSoft

La app es estática (Vite build). Cualquier hosting de estáticos sirve, pero hay
**dos requisitos**:

1. **Cabeceras COOP/COEP** en todas las respuestas (habilitan `SharedArrayBuffer`,
   necesario para el editor de Python):
   - `Cross-Origin-Opener-Policy: same-origin`
   - `Cross-Origin-Embedder-Policy: credentialless`
2. **Ruteo SPA**: servir `index.html` para rutas desconocidas (React Router).

El repo ya incluye la config para los dos hostings más comunes:

- **Vercel** → `vercel.json` (cabeceras + rewrites).
- **Cloudflare Pages / Netlify** → `public/_headers` y `public/_redirects`
  (se copian a la build).

## Variables de entorno (Supabase)

En el panel del hosting, define las mismas variables que tu `.env`:

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=<tu-clave-anon/publishable>
```

Sin ellas, la versión desplegada arranca en modo `localStorage` (cada navegador
por separado). Con ellas, usa tu Supabase (multiusuario).

> Recuerda añadir el dominio del despliegue en Supabase →
> **Authentication → URL Configuration** (Site URL / Redirect URLs).

## Pasos en Vercel (recomendado)

1. Entra a **https://vercel.com**, inicia sesión con GitHub.
2. **Add New → Project** → importa el repo `lucksoft`.
3. Framework preset: **Vite**. Build command `npm run build`, output `dist`.
4. En **Environment Variables**, añade `VITE_SUPABASE_URL` y
   `VITE_SUPABASE_ANON_KEY`.
5. **Deploy**. Vercel aplicará las cabeceras de `vercel.json` automáticamente.

## Editor de Scratch en producción

El build de TurboWarp (`public/scratch-editor/`) **no está en git** (pesa ~65 MB).
Para que Scratch funcione en producción, compílalo y colócalo en
`public/scratch-editor/` antes de desplegar (ver `LuckSoft/PLAN.md`). Si no está,
la app muestra una ayuda de instalación en esa sección y el resto funciona igual.
