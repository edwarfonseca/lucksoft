import { NIVEL_LABEL, type SesionContenido } from "@/domain/models/curriculum";

/**
 * Panel de tarea para una lección del currículo. Muestra, de forma simple y
 * pensada para niños, lo que toca hacer hoy: objetivo, ejercicios, retos y la
 * misión. Sin descripciones largas; texto plano (React lo escapa solo).
 */
export function LessonTaskPanel({
  periodo,
  sesion,
  contenido,
}: {
  periodo: number;
  sesion: number;
  contenido: SesionContenido;
}) {
  const esMision = contenido.tipo === "mision";
  return (
    <div className="task-pane">
      <div className="task-header">
        <span>📋 Tu tarea de hoy</span>
      </div>
      <div className="task-content lesson-task">
        <p className="lt-ruta">
          Periodo {periodo} · Sesión {sesion}
        </p>
        <h3 className="lt-titulo">{contenido.titulo}</h3>
        <p className="lt-objetivo">🎯 {contenido.objetivo}</p>

        <h4 className="lt-seccion">✍️ Practica</h4>
        <ol className="lt-ejercicios">
          {contenido.ejercicios.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ol>

        <h4 className="lt-seccion">🏅 Retos</h4>
        <ul className="lt-retos">
          {contenido.retos.map((r) => (
            <li key={r.titulo}>
              <div className="lt-reto-cab">
                <strong>{r.titulo}</strong>
                <span className={`tag nivel-${r.nivel}`}>
                  {NIVEL_LABEL[r.nivel]}
                </span>
              </div>
              <p>{r.consigna}</p>
            </li>
          ))}
        </ul>

        <h4 className="lt-seccion">
          {esMision ? "🚀 Misión Final" : "🎯 Para terminar"}
        </h4>
        <div className="lt-mision">
          <strong>{contenido.cierre.titulo}</strong>
          <p>{contenido.cierre.descripcion}</p>
        </div>
      </div>
    </div>
  );
}
