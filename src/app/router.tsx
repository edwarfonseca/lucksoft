import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { LoginPage } from "@/features/auth/LoginPage";
import { CoursesPage } from "@/features/courses/CoursesPage";
import { PythonEditorPage } from "@/features/courses/PythonEditorPage";
import { WebEditorPage } from "@/features/courses/WebEditorPage";
import { ScratchEditorPage } from "@/features/courses/ScratchEditorPage";
import { GradesPage } from "@/features/grades/GradesPage";
import { GradingPage } from "@/features/grading/GradingPage";

/**
 * Rutas de la aplicación. Equivalen a las páginas HTML de la versión legacy.
 * La protección por sesión/rol se añadirá en la Fase 4 con un loader/guard.
 */
export const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  {
    element: <AppLayout />,
    children: [
      { path: "/cursos", element: <CoursesPage /> },
      { path: "/python", element: <PythonEditorPage /> },
      { path: "/web", element: <WebEditorPage /> },
      { path: "/scratch", element: <ScratchEditorPage /> },
      { path: "/notas", element: <GradesPage /> },
      { path: "/calificar", element: <GradingPage /> },
    ],
  },
]);
