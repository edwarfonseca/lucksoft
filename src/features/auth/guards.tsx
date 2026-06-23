import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import type { Role } from "@/domain/models/user";
import type { CourseKind } from "@/domain/models/course";
import { estadoCreditos } from "@/domain/models/enrollment";
import { enrollmentService } from "@/app/services";
import { useAuth } from "@/features/auth/auth-context";
import { useEnrollment } from "@/features/courses/enrollment-context";

/** Mientras se resuelve la sesión, no decidir todavía. */
function Loading() {
  return (
    <div className="page">
      <p className="lead">Cargando…</p>
    </div>
  );
}

/** Exige sesión iniciada; si no, redirige al login. */
export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <Loading />;
  if (!user) return <Navigate to="/" replace />;
  return <>{children}</>;
}

/** Exige un rol concreto; si no coincide, redirige al catálogo de cursos. */
export function RequireRole({
  role,
  children,
}: {
  role: Role;
  children: ReactNode;
}) {
  const { user, loading } = useAuth();
  if (loading) return <Loading />;
  if (!user) return <Navigate to="/" replace />;
  if (user.role !== role) return <Navigate to="/cursos" replace />;
  return <>{children}</>;
}

/**
 * Protege el editor de un curso para el estudiante: solo puede entrar al curso
 * en el que está inscrito y mientras tenga créditos (> 0). Docentes, admin y
 * modo local pasan sin restricción.
 */
export function RequireCourseAccess({
  course,
  children,
}: {
  course: CourseKind;
  children: ReactNode;
}) {
  const { user } = useAuth();
  const { enrollment, loading } = useEnrollment();

  // Solo se restringe a estudiantes con servicio real de inscripción.
  if (user?.role !== "estudiante" || !enrollmentService) return <>{children}</>;
  if (loading) return <Loading />;

  const inscrito = !!enrollment?.cursos.some((c) => c.curso === course);
  const creditos = enrollment?.creditos ?? 0;
  if (!inscrito || estadoCreditos(creditos) === "bloqueado")
    return <Navigate to="/cursos" replace />;
  return <>{children}</>;
}
