import type { Assignment, CourseKind } from "@/domain/models/course";
import type { SubmitInput } from "@/domain/models/submission";
import type { User } from "@/domain/models/user";

/** Metadata de un curso para el catálogo (sin tipos específicos). */
export interface CourseInfo {
  kind: CourseKind;
  title: string;
  icon: string;
  /** Ruta del editor en el router (p. ej. "/python"). */
  route: string;
  description: string;
}

/**
 * Estrategia de un curso (patrón Strategy). Cada curso aporta su metadata, sus
 * tareas y cómo transformar el contenido del editor en una entrega del dominio.
 *
 * Genérica en:
 *   - TAssignment: el tipo de sus tareas (puede extender Assignment con campos
 *     propios, p. ej. plantilla de código).
 *   - TContent: lo que produce su editor (código, proyecto web, .sb3…).
 *
 * Esto elimina los `if (kind === …)` del legacy: añadir un curso = añadir una
 * estrategia y registrarla, sin tocar el resto del sistema.
 */
export interface CourseStrategy<
  TAssignment extends Assignment,
  TContent,
> extends CourseInfo {
  assignments: TAssignment[];

  /** Construye el SubmitInput del dominio a partir del trabajo del estudiante. */
  buildSubmitInput(params: {
    assignment: TAssignment;
    student: Pick<User, "id" | "name">;
    content: TContent;
  }): SubmitInput;
}
