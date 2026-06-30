/**
 * Un estudiante de un grupo, tal como lo ve su docente: datos de contacto y
 * seguimiento (créditos, acudiente, edad). Lo provee una RPC que solo devuelve
 * estudiantes de grupos del propio docente (ver migración 0014).
 */
export interface GrupoEstudiante {
  id: string;
  fullName: string;
  edad: number | null;
  creditos: number;
  nombreAcudiente: string | null;
  numeroAcudiente: string | null;
  pais: string | null;
  activo: boolean;
}
