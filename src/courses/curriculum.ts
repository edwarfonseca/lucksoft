import type { CourseKind } from "@/domain/models/course";
import type { Curriculum } from "@/domain/models/curriculum";
import { pythonCurriculum } from "@/courses/python/curriculum";
import { webCurriculum } from "@/courses/web/curriculum";
import { scratchCurriculum } from "@/courses/scratch/curriculum";

/**
 * Currículos gamificados por curso. Python, Diseño Web y Scratch tienen contenido
 * de lecciones; los demás cursos abren el editor directamente hasta que se les
 * escriba su currículo. Añadir uno = crear su `curriculum.ts` y registrarlo aquí.
 */
const curriculumByCourse: Partial<Record<CourseKind, Curriculum>> = {
  python: pythonCurriculum,
  web: webCurriculum,
  scratch: scratchCurriculum,
};

/** Devuelve el currículo de un curso, o undefined si aún no tiene contenido. */
export function getCurriculum(kind: CourseKind): Curriculum | undefined {
  return curriculumByCourse[kind];
}
