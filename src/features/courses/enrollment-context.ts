import { createContext, useContext } from "react";
import type {
  ClaseHorario,
  Enrollment,
  TeacherStudent,
} from "@/domain/models/enrollment";

export interface EnrollmentState {
  /** Inscripción del estudiante; null si no aplica (docente/admin o modo local). */
  enrollment: Enrollment | null;
  /** Grupos que dicta el docente (vacío para otros roles). */
  teacherClasses: ClaseHorario[];
  /** Estudiantes de los grupos del docente, con su curso (para "Calificar"). */
  teacherStudents: TeacherStudent[];
  loading: boolean;
  /** True mientras se cargan los datos del docente (para evitar redirecciones prematuras). */
  teacherLoading: boolean;
  /** Vuelve a cargar la inscripción (p. ej. tras un cambio de créditos). */
  reload: () => Promise<void>;
}

export const EnrollmentContext = createContext<EnrollmentState>({
  enrollment: null,
  teacherClasses: [],
  teacherStudents: [],
  loading: false,
  teacherLoading: false,
  reload: () => Promise.resolve(),
});

export const useEnrollment = () => useContext(EnrollmentContext);
