import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { LoginPage } from "@/features/auth/LoginPage";
import { RequireAuth, RequireRole } from "@/features/auth/guards";
import { CoursesPage } from "@/features/courses/CoursesPage";
import { PythonEditorPage } from "@/features/courses/PythonEditorPage";
import { WebEditorPage } from "@/features/courses/WebEditorPage";
import { ScratchEditorPage } from "@/features/courses/ScratchEditorPage";
import { GradesPage } from "@/features/grades/GradesPage";
import { GradingPage } from "@/features/grading/GradingPage";

/**
 * Rutas de la aplicación. Todo lo que cuelga de AppLayout exige sesión
 * (RequireAuth); "Mis notas" y "Calificar" exigen además el rol adecuado.
 */
export const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  {
    element: (
      <RequireAuth>
        <AppLayout />
      </RequireAuth>
    ),
    children: [
      { path: "/cursos", element: <CoursesPage /> },
      { path: "/python", element: <PythonEditorPage /> },
      { path: "/web", element: <WebEditorPage /> },
      { path: "/scratch", element: <ScratchEditorPage /> },
      {
        path: "/notas",
        element: (
          <RequireRole role="estudiante">
            <GradesPage />
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
    ],
  },
]);
