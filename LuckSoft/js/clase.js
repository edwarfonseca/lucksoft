// Clases remotas con Jitsi Meet (servidor público meet.jit.si).
// Cada curso tiene una sala fija para que docente y estudiantes coincidan.
// Se abre en una pestaña nueva para no chocar con las cabeceras de
// aislamiento de origen que usa el editor de Python.

function joinClass(courseKey) {
  const user = window.LuckAuth ? LuckAuth.getUser() : null;
  const displayName = user ? user.nombre : "Invitado";

  // Prefijo propio para que la sala sea difícil de adivinar por terceros.
  const room = "LuckSoftAula" + courseKey;
  const url =
    "https://meet.jit.si/" +
    encodeURIComponent(room) +
    "#userInfo.displayName=" +
    encodeURIComponent('"' + displayName + '"');

  window.open(url, "_blank", "noopener");
}

// Conecta cualquier botón con data-join-class="<curso>"
document.querySelectorAll("[data-join-class]").forEach((btn) => {
  btn.addEventListener("click", () => joinClass(btn.dataset.joinClass));
});
