/** Un killer jugable, cargado desde los JSON locales. */
export interface Killer {
  id: string;
  name: string;
  image: string;
}

/** Qué ruleta eligió el jugador dentro del rol Killer. */
export type KillerMode = 'character' | 'perks';
