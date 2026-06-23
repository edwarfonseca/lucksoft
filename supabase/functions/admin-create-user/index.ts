// Edge Function: crea una cuenta (estudiante o docente) con sus datos de perfil.
// Solo un usuario con rol admin puede invocarla. Usa service_role (inyectada por
// Supabase) que NUNCA debe estar en el navegador.
import { createClient } from "npm:@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  try {
    const url = Deno.env.get("SUPABASE_URL")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // ¿Quién llama? Verificamos su token y que sea admin.
    const caller = createClient(url, anonKey, {
      global: {
        headers: { Authorization: req.headers.get("Authorization") ?? "" },
      },
    });
    const {
      data: { user },
    } = await caller.auth.getUser();
    if (!user) return json(401, { error: "No autenticado" });

    const admin = createClient(url, serviceKey);
    const { data: me } = await admin
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();
    if (me?.role !== "admin") return json(403, { error: "Requiere rol admin" });

    // Datos de entrada.
    const b = await req.json();
    if (!b.username || !b.password || !b.role) {
      return json(400, { error: "Faltan usuario, contraseña o rol" });
    }
    const email = `${String(b.username).trim().toLowerCase()}@lucksoft.local`;

    // Crear la cuenta de auth (ya confirmada).
    const { data: created, error: createErr } =
      await admin.auth.admin.createUser({
        email,
        password: b.password,
        email_confirm: true,
      });
    if (createErr) return json(400, { error: createErr.message });

    // Completar el perfil (el trigger ya creó la fila base).
    const full_name = `${b.nombres ?? ""} ${b.apellidos ?? ""}`.trim();
    const { error: updErr } = await admin
      .from("profiles")
      .update({
        role: b.role,
        username: String(b.username).trim().toLowerCase(),
        nombres: b.nombres ?? null,
        apellidos: b.apellidos ?? null,
        edad: b.edad ?? null,
        full_name,
        creditos_pagados:
          b.role === "estudiante" ? (b.creditos_pagados ?? 0) : 0,
        nombre_acudiente:
          b.role === "estudiante" ? (b.nombre_acudiente ?? null) : null,
        numero_acudiente:
          b.role === "estudiante" ? (b.numero_acudiente ?? null) : null,
        pais: b.role === "estudiante" ? (b.pais ?? null) : null,
      })
      .eq("id", created.user.id);
    if (updErr) {
      // Si falla el perfil, deshacemos la cuenta para no dejarla a medias.
      await admin.auth.admin.deleteUser(created.user.id);
      return json(400, { error: updErr.message });
    }

    // Inscribir al estudiante en sus grupos.
    const horarioIds: string[] = Array.isArray(b.horario_ids)
      ? b.horario_ids
      : [];
    if (b.role === "estudiante" && horarioIds.length > 0) {
      const { error: insErr } = await admin.from("inscripciones").insert(
        horarioIds.map((horario_id: string) => ({
          estudiante_id: created.user.id,
          horario_id,
        })),
      );
      if (insErr) {
        await admin.auth.admin.deleteUser(created.user.id);
        return json(400, { error: insErr.message });
      }
    }

    return json(200, { id: created.user.id });
  } catch (e) {
    return json(500, { error: String(e) });
  }
});
