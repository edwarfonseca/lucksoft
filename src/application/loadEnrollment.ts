import type {
  ClaseHorario,
  Enrollment,
  TeacherStudent,
} from "@/domain/models/enrollment";
import type { GrupoEstudiante } from "@/domain/models/teacherGroup";
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

export function getTeacherStudents(
  service: EnrollmentService,
): Promise<TeacherStudent[]> {
  return service.getTeacherStudents();
}

export function getGroupStudents(
  service: EnrollmentService,
  horarioId: string,
): Promise<GrupoEstudiante[]> {
  return service.getGroupStudents(horarioId);
}

export function setProgress(
  service: EnrollmentService,
  horarioId: string,
  leccionIdx: number,
): Promise<void> {
  return service.setProgress(horarioId, leccionIdx);
}
