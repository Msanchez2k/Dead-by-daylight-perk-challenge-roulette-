import type { Perk } from './perk';

/**
 * Estado de una casilla individual de la build.
 * - 'unfilled': el usuario aún no ha girado la ruleta para esta casilla.
 * - 'empty': la ruleta cayó en el espacio en blanco (perk deliberadamente ausente).
 * - 'filled': la casilla contiene una perk.
 */
export type BuildSlotStatus = 'unfilled' | 'empty' | 'filled';

export interface BuildSlot {
  id: number; // 0-3, posición fija en el grid
  status: BuildSlotStatus;
  perk: Perk | null;
}

/** Crea las 4 casillas vacías (estado inicial de una build nueva). */
export function createEmptyBuild(): BuildSlot[] {
  return Array.from({ length: 4 }, (_, id) => ({
    id,
    status: 'unfilled' as const,
    perk: null,
  }));
}
