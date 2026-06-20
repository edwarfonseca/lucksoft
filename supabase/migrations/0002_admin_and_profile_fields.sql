-- LuckSoft — Fase 7: rol admin + campos de perfil para gestión de usuarios.
-- Pega TODO este archivo en el SQL Editor de Supabase y pulsa "Run".

-- 1) Nuevo rol admin (no se "usa" como literal en este script, así que es seguro
--    añadirlo en la misma transacción).
alter type user_role add value if not exists 'admin';

-- 2) Campos de perfil. Los de estudiante quedan nulos para docentes/admin.
alter table public.profiles
  add column if not exists nombres text,
  add column if not exists apellidos text,
  add column if not exists edad int,
  add column if not exists activo boolean not null default true,
  add column if not exists curso text,
  add column if not exists creditos_pagados int not null default 0,
  add column if not exists nombre_acudiente text,
  add column if not exists numero_acudiente text,
  add column if not exists pais text;

-- 3) ¿El usuario actual es admin? (role::text evita validar el enum aquí).
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role::text = 'admin'
  );
$$;

-- 4) RLS: el admin puede leer y editar TODOS los perfiles.
--    (Crear/borrar cuentas reales lo hacen las Edge Functions con service_role.)
create policy "admin: leer perfiles" on public.profiles
  for select using (public.is_admin());
create policy "admin: actualizar perfiles" on public.profiles
  for update using (public.is_admin());