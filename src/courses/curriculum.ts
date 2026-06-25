import type { CourseKind } from "@/domain/models/course";
import type { Curriculum } from "@/domain/models/curriculum";
import { pythonCurriculum } from "@/courses/python/curriculum";

/**
 * Currículos gamificados por curso. Por ahora solo Python tiene contenido de
 * lecciones; los demás cursos abren el editor directamente hasta que se les
 * escriba su currículo. Añadir uno = crear su `curriculum.ts` y registrarlo aquí.
 */
const curriculumByCourse: Partial<Record<CourseKind, Curriculum>> = {
  python: pythonCurriculum,
};

/** Devuelve el currículo de un curso, o undefined si aún no tiene contenido. */
export function getCurriculum(kind: CourseKind): Curriculum | undefined {
  return curriculumByCourse[kind];
}
