/** Rol de juego: determina qué set de perks aplica. */
export type Role = 'survivor' | 'killer';

/** Una perk cargada desde los JSON locales. */
export interface Perk {
  id: string;
  name: string;
  /** Personaje al que pertenece la perk, o "Ventaja" si es una perk general. */
  character: string;
  image: string;
  description: string;
  role: Role;
}
