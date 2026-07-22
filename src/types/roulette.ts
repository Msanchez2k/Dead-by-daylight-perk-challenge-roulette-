import type { Perk } from './perk';

/**
 * Un ítem dentro de la tira visual de la ruleta.
 * perk === null representa el espacio en blanco.
 */
export interface RouletteItem {
  key: string;
  perk: Perk | null;
}
