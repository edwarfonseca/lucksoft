import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { LoginPage } from "@/features/auth/LoginPage";
import {
  RequireAuth,
  RequireCourseAccess,
  RequireRole,
} from "@/features/auth/guards";
import { EnrollmentProvider } from "@/features/courses/EnrollmentProvider";
import { CoursesPage } from "@/features/courses/CoursesPage";
import { CourseLessonsPage } from "@/features/courses/CourseLessonsPage";
import { PythonEditorPage } from "@/features/courses/PythonEditorPage";
import { WebEditorPage } from "@/features/courses/WebEditorPage";
import { ScratchEditorPage } from "@/features/courses/ScratchEditorPage";
import { GradesPage } from "@/features/grades/GradesPage";
import { GradingPage } from "@/features/grading/GradingPage";
import { PetPage } from "@/features/pets/PetPage";
import { AdminPage } from "@/features/admin/AdminPage";

/**
 * Rutas de la aplicación. Todo lo que cuelga de AppLayout exige sesión
 * (RequireAuth); "Mis notas" y "Calificar" exigen además el rol adecuado.
 */
export const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  {
    element: (
      <RequireAuth>
        <EnrollmentProvider>
          <AppLayout />
        </EnrollmentProvider>
      </RequireAuth>
    ),
    children: [
      { path: "/cursos", element: <CoursesPage /> },
      { path: "/curso/:kind", element: <CourseLessonsPage /> },
      {
        path: "/python",
        element: (
          <RequireCourseAccess course="python">
            <PythonEditorPage />
          </RequireCourseAccess>
        ),
      },
      {
        path: "/web",
        element: (
          <RequireCourseAccess course="web">
            <WebEditorPage />
          </RequireCourseAccess>
        ),
      },
      {
        path: "/scratch",
        element: (
          <RequireCourseAccess course="scratch">
            <ScratchEditorPage />
          </RequireCourseAccess>
        ),
      },
      {
        path: "/notas",
        element: (
          <RequireRole role="estudiante">
            <GradesPage />
          </RequireRole>
        ),
      },
      {
        path: "/mascota",
        element: (
          <RequireRole role="estudiante">
            <PetPage />
          </RequireRole>
        ),
      },
      {
        path: "/calificar",
        element: (
          <RequireRole role="docente">
            <GradingPage />
          </RequireRole>
        ),
      },
      {
        path: "/admin",
        element: (
          <RequireRole role="admin">
            <AdminPage />
          </RequireRole>
        ),
      },
    ],
  },
]);
