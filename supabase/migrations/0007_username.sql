-- LuckSoft — Fase 9: guardar el nombre de usuario en el perfil.
-- El login usa el email usuario@lucksoft.local de Supabase Auth; aquí guardamos
-- una copia del "usuario" en profiles para poder verlo y editarlo desde el panel.
-- Pega TODO este archivo en el SQL Editor de Supabase y pulsa "Run".

alter table public.profiles
  add column if not exists username text;

-- Rellenar desde auth.users (el SQL Editor corre como superusuario y puede leerla).
update public.profiles p
   set username = split_part(u.email, '@', 1)
  from auth.users u
 where u.id = p.id
   and (p.username is null or p.username = '');
