import { createContext, useContext } from "react";
import type { ClaseHorario, Enrollment } from "@/domain/models/enrollment";

export interface EnrollmentState {
  /** Inscripción del estudiante; null si no aplica (docente/admin o modo local). */
  enrollment: Enrollment | null;
  /** Grupos que dicta el docente (vacío para otros roles). */
  teacherClasses: ClaseHorario[];
  loading: boolean;
  /** Vuelve a cargar la inscripción (p. ej. tras un cambio de créditos). */
  reload: () => void;
}

export const EnrollmentContext = createContext<EnrollmentState>({
  enrollment: null,
  teacherClasses: [],
  loading: false,
  reload: () => {},
});

export const useEnrollment = () => useContext(EnrollmentContext);
