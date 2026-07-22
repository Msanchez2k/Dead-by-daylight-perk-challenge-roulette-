import type { Perk, Role } from '@/types/perk';
import wildcardImage from '@/assets/wildcard/wildcard.png';

export const WILDCARD_ID = 'wildcard';

/** Crea el ítem comodín: si cae en la ruleta, la casilla puede llenarse con cualquier perk. */
export function createWildcardPerk(role: Role, name: string, description: string): Perk {
  return {
    id: WILDCARD_ID,
    name,
    character: '',
    image: wildcardImage,
    description,
    role,
  };
}

export function isWildcard(perk: Perk | null): boolean {
  return perk?.id === WILDCARD_ID;
}
