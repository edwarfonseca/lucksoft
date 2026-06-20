// Edge Function: elimina una cuenta. Solo admin. Borra el usuario de auth y, en
// cascada, su fila en profiles y sus entregas.
import { createClient } from "npm:@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, content-type",
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

    const { id } = await req.json();
    if (!id) return json(400, { error: "Falta el id" });
    if (id === user.id)
      return json(400, { error: "No puedes eliminar tu propia cuenta" });

    const { error } = await admin.auth.admin.deleteUser(id);
    if (error) return json(400, { error: error.message });

    return json(200, { ok: true });
  } catch (e) {
    return json(500, { error: String(e) });
  }
});
