import { useCallback, useEffect, useState, type ReactNode } from "react";
import type {
  ClaseHorario,
  Enrollment,
  TeacherStudent,
} from "@/domain/models/enrollment";
import { enrollmentService } from "@/app/services";
import {
  getStudentEnrollment,
  getTeacherClasses,
  getTeacherStudents,
} from "@/application/loadEnrollment";
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
  const isTeacher = user?.role === "docente" && !!enrollmentService;

  // `undefined` = cargando; `null` = no aplica o error; objeto = inscripción.
  const [enrollment, setEnrollment] = useState<Enrollment | null | undefined>(
    isStudent ? undefined : null,
  );
  const [teacherClasses, setTeacherClasses] = useState<ClaseHorario[]>([]);
  const [teacherStudents, setTeacherStudents] = useState<TeacherStudent[]>([]);
  const [teacherLoading, setTeacherLoading] = useState(isTeacher);

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

  // Datos del docente: sus grupos (para el botón de clase y "Calificar") y los
  // estudiantes de esos grupos (para filtrar las entregas a calificar).
  useEffect(() => {
    if (!isTeacher || !user) return;
    let active = true;
    // `teacherLoading` arranca en true (estado inicial) para los docentes; aquí
    // solo lo apagamos al terminar (en callbacks de la promesa, no en el cuerpo
    // del efecto, para cumplir react-hooks/set-state-in-effect).
    Promise.all([
      getTeacherClasses(enrollmentService!, user.id),
      getTeacherStudents(enrollmentService!),
    ])
      .then(([cs, ss]) => {
        if (!active) return;
        setTeacherClasses(cs);
        setTeacherStudents(ss);
      })
      .catch(() => {
        if (!active) return;
        setTeacherClasses([]);
        setTeacherStudents([]);
      })
      .finally(() => active && setTeacherLoading(false));
    return () => {
      active = false;
    };
  }, [isTeacher, user]);

  // Recarga manual (p. ej. tras un cambio externo). Como se invoca desde manejadores
  // de eventos, aquí sí puede hacer setState de forma directa.
  const reload = useCallback(() => {
    if (!isStudent || !user) return Promise.resolve();
    setEnrollment(undefined);
    return getStudentEnrollment(enrollmentService!, user.id)
      .then((e) => setEnrollment(e))
      .catch(() => setEnrollment(null));
  }, [isStudent, user]);

  const value: EnrollmentState = {
    enrollment: enrollment ?? null,
    teacherClasses,
    teacherStudents,
    loading: enrollment === undefined,
    teacherLoading,
    reload,
  };
  return (
    <EnrollmentContext.Provider value={value}>
      {children}
    </EnrollmentContext.Provider>
  );
}
