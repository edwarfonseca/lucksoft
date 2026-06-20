/** Superficie mínima del motor de TurboWarp (window.vm) que usamos. */
export interface ScratchVM {
  runtime: unknown;
  editingTarget: unknown;
  loadProject(data: Uint8Array): Promise<void>;
  saveProjectSb3(): Promise<Blob>;
  on(event: string, listener: () => void): void;
}

/** La ventana del iframe del editor expone `vm` (mismo origen). */
export interface ScratchWindow extends Window {
  vm?: ScratchVM;
}
