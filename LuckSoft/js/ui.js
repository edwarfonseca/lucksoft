// Barra superior compartida, adaptada al rol del usuario.
// Uso: coloca <header class="topbar" id="topbar"></header> y llama
//      renderTopbar("nombrePaginaActiva") tras incluir auth.js.
function renderTopbar(active) {
  const u = LuckAuth.getUser();
  if (!u) return;

  const links = [{ href: "cursos.html", label: "Cursos", id: "cursos" }];
  if (u.rol === "estudiante") {
    links.push({ href: "notas.html", label: "Mis notas", id: "notas" });
  }
  if (u.rol === "docente") {
    links.push({ href: "calificar.html", label: "Calificar", id: "calificar" });
  }

  const navHtml = links
    .map(
      (l) =>
        `<a href="${l.href}" class="nav-link${l.id === active ? " active" : ""}">${l.label}</a>`,
    )
    .join("");

  const rolBadge = `<span class="rol-badge rol-${u.rol}">${
    u.rol === "docente" ? "Docente" : "Estudiante"
  }</span>`;

  document.getElementById("topbar").innerHTML = `
    <div class="brand">
      <span class="logo">L</span>
      <span>Luck<b>Soft</b></span>
    </div>
    <nav class="nav">${navHtml}</nav>
    <div class="user-box">
      ${rolBadge}
      <span>${u.nombre}</span>
      <button class="btn btn-ghost" id="logoutBtn">Cerrar sesión</button>
    </div>
  `;

  document.getElementById("logoutBtn").addEventListener("click", () => {
    LuckAuth.logout();
    location.href = "index.html";
  });
}
