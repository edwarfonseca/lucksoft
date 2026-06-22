import { useCallback, useEffect, useState, type ReactNode } from "react";
import type { Enrollment } from "@/domain/models/enrollment";
import { enrollmentService } from "@/app/services";
import { getStudentEnrollment } from "@/application/loadEnrollment";
import { useAuth } from "@/features/auth/auth-context";
import {
  EnrollmentContext,
  type EnrollmentState,
} from "@/features/courses/enrollment-context";

/**
 * Carga la inscripción del estudiante autenticado y la expone vía contexto, para
 * que el catálogo y los guards de los editores compartan los mismos datos
 * (curso inscrito, créditos, horario) sin volver a pedirlos.
 */
export function EnrollmentProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const isStudent = user?.role === "estudiante" && !!enrollmentService;

  // `undefined` = cargando; `null` = no aplica o error; objeto = inscripción.
  const [enrollment, setEnrollment] = useState<Enrollment | null | undefined>(
    isStudent ? undefined : null,
  );

  // El setState va en los callbacks de la promesa, no en el cuerpo del efecto
  // (cumple react-hooks/set-state-in-effect).
  useEffect(() => {
    if (!isStudent || !user) return;
    let active = true;
    getStudentEnrollment(enrollmentService!, user.id)
      .then((e) => active && setEnrollment(e))
      .catch(() => active && setEnrollment(null));
    return () => {
      active = false;
    };
  }, [isStudent, user]);

  // Recarga manual (p. ej. tras un cambio externo). Como se invoca desde manejadores
  // de eventos, aquí sí puede hacer setState de forma directa.
  const reload = useCallback(() => {
    if (!isStudent || !user) return;
    setEnrollment(undefined);
    getStudentEnrollment(enrollmentService!, user.id)
      .then((e) => setEnrollment(e))
      .catch(() => setEnrollment(null));
  }, [isStudent, user]);

  const value: EnrollmentState = {
    enrollment: enrollment ?? null,
    loading: enrollment === undefined,
    reload,
  };
  return (
    <EnrollmentContext.Provider value={value}>
      {children}
    </EnrollmentContext.Provider>
  );
}
