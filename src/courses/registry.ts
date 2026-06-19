import type { CourseKind } from "@/domain/models/course";
import type { CourseInfo } from "@/courses/CourseStrategy";
import { pythonCourse } from "@/courses/python";
import { webCourse } from "@/courses/web";
import { scratchCourse } from "@/courses/scratch";

/**
 * Registro central de cursos (patrón Registry). Para añadir un curso, créalo en
 * su carpeta y agrégalo aquí: el catálogo y el resto del sistema lo recogen
 * automáticamente, sin más cambios.
 */
export const courseRegistry = {
  python: pythonCourse,
  web: webCourse,
  scratch: scratchCourse,
};

/** Estrategia concreta por kind (tipos precisos por curso). */
export const getCourse = <K extends CourseKind>(
  kind: K,
): (typeof courseRegistry)[K] => courseRegistry[kind];

/** Lista de cursos para el catálogo (solo metadata). */
export const courseList: CourseInfo[] = Object.values(courseRegistry);
