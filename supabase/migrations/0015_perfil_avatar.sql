-- LuckSoft — "Mi perfil": el usuario edita su nombre para mostrar y su avatar.
-- Incluye: columna avatar_url, una función segura para que cada quien edite SOLO
-- su nombre/avatar (nunca su rol ni créditos) y el bucket de Storage con sus
-- reglas (cada usuario sube solo en su propia carpeta).
-- Pega TODO este archivo en el SQL Editor de Supabase y pulsa "Run".

-- 1) Avatar en el perfil.
alter table public.profiles
  add column if not exists avatar_url text;

-- 2) Edición propia y acotada del perfil. SECURITY DEFINER: actualiza solo la
--    fila del usuario autenticado y solo las columnas permitidas (no rol/créditos).
create or replace function public.actualizar_mi_perfil(
  p_full_name  text,
  p_avatar_url text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.profiles
     set full_name  = coalesce(nullif(btrim(p_full_name), ''), full_name),
         avatar_url = p_avatar_url
   where id = auth.uid();
end;
$$;

grant execute on function public.actualizar_mi_perfil(text, text) to authenticated;

-- 3) Bucket público para los avatares (incluido en el plan gratuito de Storage).
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- 4) Reglas del bucket: lectura pública; cada usuario sube/edita/borra solo en
--    su carpeta (la primera parte de la ruta debe ser su id de usuario).
drop policy if exists "avatars: lectura publica" on storage.objects;
create policy "avatars: lectura publica" on storage.objects
  for select using (bucket_id = 'avatars');

drop policy if exists "avatars: subir lo propio" on storage.objects;
create policy "avatars: subir lo propio" on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "avatars: actualizar lo propio" on storage.objects;
create policy "avatars: actualizar lo propio" on storage.objects
  for update to authenticated
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "avatars: borrar lo propio" on storage.objects;
create policy "avatars: borrar lo propio" on storage.objects
  for delete to authenticated
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
