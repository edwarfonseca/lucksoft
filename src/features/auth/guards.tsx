import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import type { Role } from "@/domain/models/user";
import { useAuth } from "@/features/auth/auth-context";

/** Exige sesión iniciada; si no, redirige al login. */
export function RequireAuth({ children }: { children: ReactNode }) {
  const { user } = useAuth();
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
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  if (user.role !== role) return <Navigate to="/cursos" replace />;
  return <>{children}</>;
}
