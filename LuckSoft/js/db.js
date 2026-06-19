// Capa de datos de LuckSoft (Fase 1: localStorage).
//
// IMPORTANTE: toda la persistencia pasa por aquí. Para la versión real,
// basta reemplazar el cuerpo de estas funciones por llamadas a Supabase;
// el resto de la aplicación no cambia.
const LuckDB = (() => {
  const SUB_KEY = "lucksoft_submissions";

  function _read() {
    try {
      return JSON.parse(localStorage.getItem(SUB_KEY)) || [];
    } catch {
      return [];
    }
  }

  function _write(list) {
    localStorage.setItem(SUB_KEY, JSON.stringify(list));
  }

  function _id() {
    return "s_" + Date.now() + "_" + Math.random().toString(16).slice(2, 8);
  }

  // Todas las entregas (para el docente).
  function getAllSubmissions() {
    return _read().sort((a, b) => b.submittedAt - a.submittedAt);
  }

  // Entregas de un estudiante concreto.
  function getSubmissionsByStudent(studentUser) {
    return getAllSubmissions().filter((s) => s.student === studentUser);
  }

  // El estudiante entrega (o reenvía) una actividad.
  // Reenviar reinicia la calificación a "pendiente".
  //   kind    : "python" (texto en `code`) | "scratch" (proyecto base64 en `project`)
  function submit({
    activityId,
    activityTitle,
    student,
    studentName,
    code = "",
    kind = "python",
    project = null,
  }) {
    const list = _read();
    const existing = list.find(
      (s) => s.activityId === activityId && s.student === student,
    );
    if (existing) {
      existing.code = code;
      existing.kind = kind;
      existing.project = project;
      existing.submittedAt = Date.now();
      existing.grade = null;
      existing.comment = "";
      existing.gradedAt = null;
    } else {
      list.push({
        id: _id(),
        activityId,
        activityTitle,
        student,
        studentName,
        code,
        kind,
        project,
        submittedAt: Date.now(),
        grade: null,
        comment: "",
        gradedAt: null,
      });
    }
    _write(list);
  }

  // Una entrega concreta por id (para que el docente la revise).
  function getById(id) {
    return _read().find((s) => s.id === id) || null;
  }

  // El docente califica una entrega.
  function grade(submissionId, grade, comment) {
    const list = _read();
    const s = list.find((x) => x.id === submissionId);
    if (s) {
      s.grade = grade;
      s.comment = comment || "";
      s.gradedAt = Date.now();
      _write(list);
    }
  }

  return { getAllSubmissions, getSubmissionsByStudent, getById, submit, grade };
})();
