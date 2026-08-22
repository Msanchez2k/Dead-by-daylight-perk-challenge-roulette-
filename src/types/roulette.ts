/** Forma mínima que necesita cualquier ítem para poder pasar por la ruleta (perks, killers, etc). */
export interface RouletteBase {
  id: string;
  name: string;
  image: string;
}

/**
 * Un ítem dentro de la tira visual de la ruleta.
 * perk === null representa el espacio en blanco.
 */
export interface RouletteItem<T extends RouletteBase = RouletteBase> {
  key: string;
  perk: T | null;
}
