import type { ClaseHorario, Enrollment } from "@/domain/models/enrollment";
import type { EnrollmentService } from "@/domain/ports/EnrollmentService";

/** Casos de uso de inscripción (delegan en el EnrollmentService inyectado). */

export function getStudentEnrollment(
  service: EnrollmentService,
  userId: string,
): Promise<Enrollment> {
  return service.getStudentEnrollment(userId);
}

export function getTeacherClasses(
  service: EnrollmentService,
  userId: string,
): Promise<ClaseHorario[]> {
  return service.getTeacherClasses(userId);
}

export function setProgress(
  service: EnrollmentService,
  periodo: number,
  sesion: number,
): Promise<void> {
  return service.setProgress(periodo, sesion);
}
