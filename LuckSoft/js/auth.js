// Autenticación de PRUEBA con roles (sin backend).
// La sesión se guarda en sessionStorage. NO usar en producción.
const LuckAuth = (() => {
  const KEY = "lucksoft_user";

  // Usuarios de demostración. En la versión real esto vendría de Supabase.
  const USERS = [
    { user: "docente", pass: "1234", rol: "docente", nombre: "Prof. García" },
    { user: "alumno", pass: "1234", rol: "estudiante", nombre: "Ana López" },
    { user: "alumno2", pass: "1234", rol: "estudiante", nombre: "Luis Pérez" },
  ];

  function login(user, pass) {
    const found = USERS.find((u) => u.user === user && u.pass === pass);
    if (found) {
      sessionStorage.setItem(
        KEY,
        JSON.stringify({
          user: found.user,
          rol: found.rol,
          nombre: found.nombre,
        }),
      );
      return true;
    }
    return false;
  }

  function logout() {
    sessionStorage.removeItem(KEY);
  }

  function isLoggedIn() {
    return sessionStorage.getItem(KEY) !== null;
  }

  // Devuelve el objeto de usuario { user, rol, nombre } o null.
  function getUser() {
    const raw = sessionStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  }

  function getRole() {
    const u = getUser();
    return u ? u.rol : null;
  }

  // Protege una página: redirige al login si no hay sesión.
  function requireLogin() {
    if (!isLoggedIn()) location.href = "index.html";
  }

  // Protege una página por rol: redirige a cursos si el rol no coincide.
  function requireRole(rol) {
    requireLogin();
    if (getRole() !== rol) location.href = "cursos.html";
  }

  return {
    login,
    logout,
    isLoggedIn,
    getUser,
    getRole,
    requireLogin,
    requireRole,
  };
})();
