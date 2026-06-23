// Edge Function: cambia el usuario (email) y/o la contraseña de una cuenta.
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

    const b = await req.json();
    if (!b.id) return json(400, { error: "Falta el id del usuario" });

    const updates: Record<string, unknown> = {};
    let newUsername: string | null = null;
    if (typeof b.username === "string" && b.username.trim()) {
      newUsername = b.username.trim().toLowerCase();
      updates.email = `${newUsername}@lucksoft.local`;
      updates.email_confirm = true;
    }
    if (typeof b.password === "string" && b.password) {
      updates.password = b.password;
    }
    if (Object.keys(updates).length === 0) {
      return json(400, { error: "No hay cambios de credenciales" });
    }

    const { error: updErr } = await admin.auth.admin.updateUserById(
      b.id,
      updates,
    );
    if (updErr) return json(400, { error: updErr.message });

    // Mantener la copia del usuario en el perfil sincronizada.
    if (newUsername) {
      const { error: pErr } = await admin
        .from("profiles")
        .update({ username: newUsername })
        .eq("id", b.id);
      if (pErr) return json(400, { error: pErr.message });
    }

    return json(200, { ok: true });
  } catch (e) {
    return json(500, { error: String(e) });
  }
});
