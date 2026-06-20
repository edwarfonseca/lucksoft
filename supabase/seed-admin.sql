-- LuckSoft — convierte una cuenta en administrador (Fase 7).
-- Ejecútalo DESPUÉS de:
--   1) correr 0002_admin_and_profile_fields.sql, y
--   2) crear el usuario admin@lucksoft.local en Authentication > Users.
-- Pega TODO en el SQL Editor y pulsa "Run".

update public.profiles
   set role = 'admin',
       nombres = 'Admin',
       apellidos = 'LuckSoft',
       full_name = 'Admin LuckSoft'
 where id = (select id from auth.users where email = 'admin@lucksoft.local');

-- Comprueba:
select full_name, role from public.profiles where role::text = 'admin';