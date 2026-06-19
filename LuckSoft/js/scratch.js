// Integración del editor de Scratch (TurboWarp) con LuckSoft.
// Accede al motor (window.vm) dentro del iframe para:
//   - Autoguardar el proyecto en localStorage (continuar luego).
//   - Entregar el proyecto al sistema de calificaciones.
//   - Que el docente abra una entrega para revisarla (modo ?review=ID).
(function () {
  const content = document.getElementById("content");
  const toolbar = document.getElementById("scratchToolbar");
  const statusEl = document.getElementById("scratchStatus");
  const titleEl = document.getElementById("scratchTitle");
  const saveBtn = document.getElementById("saveBtn");
  const submitBtn = document.getElementById("submitScratchBtn");

  const EDITOR_PATH = "scratch-editor/editor.html";
  const user = LuckAuth.getUser();
  const params = new URLSearchParams(location.search);
  const reviewId = params.get("review");
  const isReview = !!reviewId;

  const STORAGE_KEY = "lucksoft_scratch_proj_" + (user ? user.user : "anon");
  const SCRATCH_ACTIVITY = {
    id: "scratch_proyecto",
    titulo: "Proyecto de Scratch",
  };

  let vm = null;
  let saveTimer = null;

  // Helpers base64 <-> binario para el .sb3 (compartidos en LuckUtils).
  const bufToB64 = LuckUtils.bufToB64;
  const b64ToBuf = LuckUtils.b64ToBytes;

  function setStatus(text, isErr) {
    statusEl.textContent = text;
    statusEl.classList.toggle("err", !!isErr);
  }

  // ---------- Arranque ----------
  fetch(EDITOR_PATH, { method: "HEAD" })
    .then((r) => (r.ok ? start() : showHelp()))
    .catch(showHelp);

  function showHelp() {
    content.innerHTML = `
      <div class="build-help">
        <h1>Editor de Scratch — pendiente de instalar</h1>
        <p class="lead">El editor aún no está compilado. Compílalo una vez y recarga.</p>
        <ol>
          <li>En una terminal:
            <pre>git clone --depth=1 https://github.com/TurboWarp/scratch-gui
cd scratch-gui
npm install
npm run build</pre>
          </li>
          <li>Copia la carpeta <code>build/</code> a <code>LuckSoft/scratch-editor/</code>.</li>
          <li>Recarga esta página.</li>
        </ol>
      </div>`;
  }

  function start() {
    content.innerHTML =
      '<iframe id="scratchFrame" class="scratch-frame" src="' +
      EDITOR_PATH +
      '" allow="fullscreen"></iframe>';
    const frame = document.getElementById("scratchFrame");
    frame.addEventListener("load", () => waitForVM(frame));
  }

  let vmTries = 0;
  function waitForVM(frame) {
    const w = frame.contentWindow;
    // Esperar a que el motor exista Y a que su proyecto por defecto ya esté
    // cargado (vm.editingTarget). Si no, restaurar provoca una carrera y falla.
    const ready = w && w.vm && w.vm.runtime && w.vm.editingTarget;
    if (ready || (w && w.vm && w.vm.runtime && vmTries > 40)) {
      vm = w.vm;
      onVMReady();
    } else {
      vmTries++;
      setTimeout(() => waitForVM(frame), 250);
    }
  }

  async function onVMReady() {
    toolbar.style.display = "flex";

    if (isReview) {
      // El docente revisa una entrega: cargar ese proyecto, sin guardar.
      saveBtn.style.display = "none";
      submitBtn.style.display = "none";
      await loadReview();
      return;
    }

    // Solo los estudiantes pueden entregar.
    if (!user || user.rol !== "estudiante") {
      submitBtn.style.display = "none";
    } else {
      submitBtn.addEventListener("click", entregar);
    }

    await restoreLocal();
    attachAutosave();
  }

  // ---------- Autoguardado / restauración ----------
  async function restoreLocal() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      setStatus("Proyecto nuevo");
      return;
    }
    try {
      await vm.loadProject(b64ToBuf(saved));
      setStatus("Proyecto restaurado ✓");
    } catch (e) {
      console.error("Error al restaurar proyecto Scratch:", e);
      setStatus(
        "No se pudo restaurar: " + (e && e.message ? e.message : e),
        true,
      );
    }
  }

  function attachAutosave() {
    vm.on("PROJECT_CHANGED", () => {
      setStatus("Guardando…");
      clearTimeout(saveTimer);
      saveTimer = setTimeout(saveLocal, 1500);
    });
  }

  async function saveLocal() {
    try {
      const blob = await vm.saveProjectSb3();
      const buf = await blob.arrayBuffer();
      localStorage.setItem(STORAGE_KEY, bufToB64(buf));
      setStatus("Guardado ✓ " + new Date().toLocaleTimeString("es"));
    } catch (e) {
      if (e && e.name === "QuotaExceededError") {
        setStatus("Proyecto demasiado grande para autoguardar", true);
      } else {
        setStatus("Error al guardar", true);
      }
    }
  }

  if (saveBtn) saveBtn.addEventListener("click", saveLocal);

  // ---------- Entregar ----------
  async function entregar() {
    try {
      setStatus("Preparando entrega…");
      const blob = await vm.saveProjectSb3();
      const buf = await blob.arrayBuffer();
      LuckDB.submit({
        activityId: SCRATCH_ACTIVITY.id,
        activityTitle: SCRATCH_ACTIVITY.titulo,
        student: user.user,
        studentName: user.nombre,
        kind: "scratch",
        project: bufToB64(buf),
      });
      setStatus("Entregado ✓");
      alert("✓ Proyecto entregado. El docente podrá revisarlo en “Calificar”.");
    } catch (e) {
      setStatus("Error al entregar", true);
      alert("No se pudo entregar el proyecto: " + e);
    }
  }

  // ---------- Modo revisión (docente) ----------
  async function loadReview() {
    const sub = LuckDB.getById(reviewId);
    if (!sub || sub.kind !== "scratch" || !sub.project) {
      setStatus("Entrega no encontrada", true);
      return;
    }
    titleEl.textContent = "🐱 Revisando: " + (sub.studentName || sub.student);
    try {
      await vm.loadProject(b64ToBuf(sub.project));
      setStatus("Pulsa la bandera verde para ejecutar el proyecto");
    } catch (e) {
      console.error("Error al cargar entrega Scratch:", e);
      setStatus("No se pudo cargar: " + (e && e.message ? e.message : e), true);
    }
  }
})();
