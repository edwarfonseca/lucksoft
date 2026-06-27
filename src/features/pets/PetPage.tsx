import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ENERGIA_MAX,
  estadoMascota,
  puedeComprar,
  type Comida,
  type Mascota,
} from "@/domain/models/pet";
import { petService } from "@/app/services";
import {
  alimentarMascota,
  getComidas,
  getMascota,
  renombrarMascota,
} from "@/application/pet";

/**
 * Cuando tengas la animación HTML de la mascota (igual que
 * `public/characters/saludo.html` del login), súbela a `public/pets/` y pon aquí
 * su ruta (p. ej. "/pets/mascota.html"). Mientras sea null se muestra una mascota
 * de emoji grande que cambia según el hambre, así la página ya funciona.
 */
const MASCOTA_ANIMACION: string | null = null;

/** "Mascota": tamagotchi del estudiante + tienda de comida. */
export function PetPage() {
  const [mascota, setMascota] = useState<Mascota | null>(null);
  const [comidas, setComidas] = useState<Comida[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [ocupado, setOcupado] = useState(false);
  const [aviso, setAviso] = useState<string | null>(null);
  const [editando, setEditando] = useState(false);
  const [nombreInput, setNombreInput] = useState("");

  useEffect(() => {
    let activo = true;
    Promise.all([getMascota(petService), getComidas(petService)])
      .then(([m, c]) => {
        if (!activo) return;
        setMascota(m);
        setComidas(c);
      })
      .catch((e) => activo && setError((e as Error).message));
    return () => {
      activo = false;
    };
  }, []);

  async function alimentar(comida: Comida) {
    if (ocupado || !mascota) return;
    setOcupado(true);
    setAviso(null);
    try {
      const actualizada = await alimentarMascota(petService, comida.id);
      setMascota(actualizada);
      setAviso(`¡Ñam! ${comida.emoji} +${comida.energia} de energía`);
    } catch (e) {
      setAviso((e as Error).message);
    } finally {
      setOcupado(false);
    }
  }

  async function guardarNombre() {
    if (!nombreInput.trim()) {
      setEditando(false);
      return;
    }
    setOcupado(true);
    try {
      const actualizada = await renombrarMascota(
        petService,
        nombreInput.trim(),
      );
      setMascota(actualizada);
      setEditando(false);
    } catch (e) {
      setAviso((e as Error).message);
    } finally {
      setOcupado(false);
    }
  }

  if (error) {
    return (
      <div className="page">
        <h1>Mi mascota</h1>
        <p className="empty">No se pudo cargar tu mascota: {error}</p>
      </div>
    );
  }

  if (!mascota) {
    return (
      <div className="page">
        <h1>Mi mascota</h1>
        <p className="lead">Cargando…</p>
      </div>
    );
  }

  const estado = estadoMascota(mascota.energia);
  const pct = Math.round((mascota.energia / ENERGIA_MAX) * 100);

  return (
    <div className="page pet-page">
      <h1>Mi mascota</h1>
      <p className="lead">
        Cuídala: cada lección que avanzas le da hambre. Gana monedas con tus
        notas y cómprale comida en la tienda. 🪙
      </p>

      <div className={"pet-card " + estado.clase}>
        <div className="pet-stage">
          {MASCOTA_ANIMACION ? (
            <iframe
              className="pet-anim"
              src={MASCOTA_ANIMACION}
              title={`Mascota ${mascota.nombre}`}
            />
          ) : (
            <div className="pet-emoji" aria-hidden="true">
              {estado.emoji}
            </div>
          )}
        </div>

        <div className="pet-info">
          <div className="pet-name-row">
            {editando ? (
              <>
                <input
                  className="pet-name-input"
                  value={nombreInput}
                  maxLength={24}
                  autoFocus
                  placeholder="Nombre de la mascota"
                  onChange={(e) => setNombreInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && guardarNombre()}
                />
                <button
                  className="btn btn-sm"
                  onClick={guardarNombre}
                  disabled={ocupado}
                >
                  Guardar
                </button>
                <button
                  className="btn btn-sm btn-ghost"
                  onClick={() => setEditando(false)}
                >
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <h2 className="pet-name">{mascota.nombre}</h2>
                <button
                  className="btn btn-sm btn-ghost"
                  title="Cambiar nombre"
                  onClick={() => {
                    setNombreInput(mascota.nombre);
                    setEditando(true);
                  }}
                >
                  ✏️
                </button>
              </>
            )}
            <span className={"pet-estado " + estado.clase}>{estado.label}</span>
          </div>

          <p className="pet-mensaje">{estado.mensaje}</p>

          <div className="pet-bar" aria-label={`Energía ${pct}%`}>
            <div className="pet-bar-fill" style={{ width: pct + "%" }} />
            <span className="pet-bar-text">⚡ Energía {pct}%</span>
          </div>

          <p className="pet-monedas">
            🪙 <b>{mascota.monedas}</b> monedas
          </p>
        </div>
      </div>

      <h2 className="pet-tienda-titulo">🛒 Tienda de comida</h2>
      {aviso && <p className="pet-aviso">{aviso}</p>}
      <div className="pet-tienda">
        {comidas.map((c) => {
          const alcanza = puedeComprar(mascota, c);
          return (
            <div className="pet-comida" key={c.id}>
              <div className="pet-comida-emoji" aria-hidden="true">
                {c.emoji}
              </div>
              <div className="pet-comida-nombre">{c.nombre}</div>
              <div className="pet-comida-energia">+{c.energia} ⚡</div>
              <button
                className="btn btn-primary btn-sm"
                disabled={!alcanza || ocupado}
                onClick={() => alimentar(c)}
              >
                🪙 {c.costo}
              </button>
            </div>
          );
        })}
      </div>

      <p className="pet-pie">
        ¿Quieres más monedas? Entrega y mejora tus actividades en{" "}
        <Link to="/cursos">Cursos</Link>: cada nota suma (nota ÷ 10 monedas).
      </p>
    </div>
  );
}
