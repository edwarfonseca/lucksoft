import { z } from "zod";

/** Proyecto del curso de Diseño Web. */
export const webProjectSchema = z.object({
  html: z.string(),
  css: z.string(),
  js: z.string(),
});
export type WebProject = z.infer<typeof webProjectSchema>;

/** Campos comunes a toda entrega (incluye lo asignado por el repositorio). */
const submissionBase = z.object({
  id: z.string(),
  activityId: z.string(),
  activityTitle: z.string(),
  student: z.string(),
  studentName: z.string(),
  submittedAt: z.number(),
  grade: z.number().int().min(0).max(100).nullable(),
  comment: z.string(),
  gradedAt: z.number().nullable(),
});

/**
 * Una entrega. Unión discriminada por `kind`: el tipo del contenido depende del
 * curso. Esto reemplaza los `if (kind === …)` dispersos por seguridad de tipos:
 * si `kind === "web"`, TypeScript sabe que existe `project: WebProject`.
 *   - python  → `code` (texto)
 *   - web     → `project` (objeto {html, css, js})
 *   - scratch → `project` (string base64 del .sb3)
 */
export const submissionSchema = z.discriminatedUnion("kind", [
  submissionBase.extend({ kind: z.literal("python"), code: z.string() }),
  submissionBase.extend({ kind: z.literal("web"), project: webProjectSchema }),
  submissionBase.extend({ kind: z.literal("scratch"), project: z.string() }),
]);
export type Submission = z.infer<typeof submissionSchema>;

/** Campos comunes que aporta el estudiante al entregar. */
const submitInputBase = z.object({
  activityId: z.string().min(1),
  activityTitle: z.string().min(1),
  student: z.string().min(1),
  studentName: z.string().min(1),
});

/**
 * Lo que se envía al entregar (sin los campos que asigna el repositorio: id,
 * fechas, nota…). También es unión discriminada por `kind`.
 */
export const submitInputSchema = z.discriminatedUnion("kind", [
  submitInputBase.extend({ kind: z.literal("python"), code: z.string() }),
  submitInputBase.extend({ kind: z.literal("web"), project: webProjectSchema }),
  submitInputBase.extend({ kind: z.literal("scratch"), project: z.string() }),
]);
export type SubmitInput = z.infer<typeof submitInputSchema>;
