import type { Assignment } from "@/domain/models/course";
import type { CourseStrategy } from "@/courses/CourseStrategy";

/** El editor de Scratch produce el .sb3 codificado en base64. */
export interface ScratchContent {
  projectBase64: string;
}

// Scratch tiene una única actividad libre (no una lista de tareas).
const SCRATCH_ACTIVITY: Assignment = {
  id: "scratch_proyecto",
  titulo: "Proyecto de Scratch",
  dificultad: "media",
  enunciado:
    "<p>Crea, ejecuta y modifica tu proyecto con programación por bloques.</p>",
};

export const scratchCourse: CourseStrategy<Assignment, ScratchContent> = {
  kind: "scratch",
  title: "Scratch",
  icon: "🐱",
  route: "/scratch",
  description:
    "Crea, ejecuta y modifica proyectos con programación por bloques.",
  assignments: [SCRATCH_ACTIVITY],
  buildSubmitInput({ assignment, student, content }) {
    return {
      kind: "scratch",
      activityId: assignment.id,
      activityTitle: assignment.titulo,
      student: student.id,
      studentName: student.name,
      project: content.projectBase64,
    };
  },
};
