import { DIFFICULTY_LABEL, type Assignment } from "@/domain/models/course";

/**
 * Panel de enunciado reutilizable por los editores. Permite elegir la tarea y,
 * opcionalmente, cargar su código base.
 *
 * El enunciado se inyecta como HTML: es contenido propio y de confianza
 * (definido en `courses/`), no entrada de usuario.
 */
export function TaskPanel<T extends Assignment>({
  assignments,
  index,
  onSelect,
  onLoadBase,
}: {
  assignments: T[];
  index: number;
  onSelect: (i: number) => void;
  onLoadBase?: () => void;
}) {
  const task = assignments[index];
  return (
    <div className="task-pane">
      <div className="task-header">
        <span>📋 Enunciado</span>
        <select
          className="task-select"
          value={index}
          onChange={(e) => onSelect(Number(e.target.value))}
        >
          {assignments.map((a, i) => (
            <option key={a.id} value={i}>
              {a.titulo}
            </option>
          ))}
        </select>
      </div>
      <div className="task-content">
        <span className={"tag dif-" + task.dificultad}>
          {DIFFICULTY_LABEL[task.dificultad]}
        </span>
        <div
          className="task-text"
          dangerouslySetInnerHTML={{ __html: task.enunciado }}
        />
        {onLoadBase && (
          <button className="btn btn-ghost" onClick={onLoadBase}>
            ⬇ Cargar código base
          </button>
        )}
      </div>
    </div>
  );
}
