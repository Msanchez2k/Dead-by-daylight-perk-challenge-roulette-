import type { Perk } from '@/types/perk';
import type { RouletteItem } from '@/types/roulette';
import { pickRandom } from './random';

/**
 * Elige la perk ganadora (o null = espacio vacío) entre las perks disponibles.
 * El espacio vacío y el comodín participan como una opción más cada uno, con
 * la misma probabilidad que una perk individual — son "casillas" más de la ruleta.
 */
export function pickWinner(
  perks: Perk[],
  allowEmptySlot: boolean,
  wildcard: Perk | null,
): Perk | null {
  const pool = buildPool(perks, allowEmptySlot, wildcard);
  return pickRandom(pool);
}

function buildPool(perks: Perk[], allowEmptySlot: boolean, wildcard: Perk | null): (Perk | null)[] {
  const pool: (Perk | null)[] = [...perks];
  if (allowEmptySlot) pool.push(null);
  if (wildcard) pool.push(wildcard);
  return pool;
}

// Largo fijo de la tira: da la sensación de un giro largo sin importar
// si el pool tiene 12 perks o 500 — clave para escalar a los ~170+ perks reales.
// Debe quedar por debajo de 360° / ITEM_ANGLE_STEP (9°) = 40 posiciones: si el
// total (REEL_LENGTH + TAIL_PADDING) llega o supera 40, algún índice cae en el
// mismo ángulo que otro (ej. 43 y 3) y sus ítems se dibujan superpuestos.
const REEL_LENGTH = 32;
const TAIL_PADDING = 4;

function perkKey(perk: Perk | null): string {
  return perk?.id ?? 'empty';
}

/**
 * Elige un ítem al azar del pool evitando repetir `avoidKey` cuando hay
 * más de una opción disponible — con pools chicos (pocas perks habilitadas)
 * los repetidos consecutivos se notaban demasiado en la tira.
 */
function pickAvoiding(pool: (Perk | null)[], avoidKey: string | null): Perk | null {
  if (pool.length <= 1) return pickRandom(pool);
  const choice = pickRandom(pool);
  if (perkKey(choice) !== avoidKey) return choice;
  const rest = pool.filter((p) => perkKey(p) !== avoidKey);
  return pickRandom(rest);
}

/**
 * Construye la tira de ítems que se recorrerá durante el giro (largo fijo,
 * ítems tomados al azar del pool sin repetir el vecino inmediato), garantizando
 * que el ganador quede fijo en `winnerIndex`.
 */
export function buildReel(
  perks: Perk[],
  allowEmptySlot: boolean,
  wildcard: Perk | null,
  winner: Perk | null,
): { reel: RouletteItem[]; winnerIndex: number } {
  const basePool = buildPool(perks, allowEmptySlot, wildcard);

  const reel: RouletteItem[] = [];
  let prevKey: string | null = null;
  for (let i = 0; i < REEL_LENGTH; i++) {
    const perk = pickAvoiding(basePool, prevKey);
    prevKey = perkKey(perk);
    reel.push({ key: `reel-${i}-${prevKey}`, perk });
  }

  const winnerIndex = REEL_LENGTH - TAIL_PADDING - 1;
  const winnerKey = perkKey(winner);

  // Si el ítem justo antes del ganador coincidió con él, se redibuja para
  // que no se vean "dos iguales pegados" justo donde cae la aguja.
  if (winnerIndex > 0 && perkKey(reel[winnerIndex - 1].perk) === winnerKey) {
    const perk = pickAvoiding(basePool, winnerKey);
    reel[winnerIndex - 1] = { key: `reel-${winnerIndex - 1}-${perkKey(perk)}`, perk };
  }

  reel[winnerIndex] = { key: `winner-${winnerKey}`, perk: winner };

  let tailPrevKey = winnerKey;
  for (let i = 0; i < TAIL_PADDING; i++) {
    const perk = pickAvoiding(basePool, tailPrevKey);
    tailPrevKey = perkKey(perk);
    reel.push({ key: `tail-${i}-${tailPrevKey}`, perk });
  }

  return { reel, winnerIndex };
}
