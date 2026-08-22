import type { RouletteBase, RouletteItem } from '@/types/roulette';
import { pickRandom } from './random';

/**
 * Elige el ítem ganador (o null = espacio vacío) entre los ítems disponibles.
 * El espacio vacío y el comodín participan como una opción más cada uno, con
 * la misma probabilidad que un ítem individual — son "casillas" más de la ruleta.
 */
export function pickWinner<T extends RouletteBase>(
  items: T[],
  allowEmptySlot: boolean,
  wildcard: T | null,
): T | null {
  const pool = buildPool(items, allowEmptySlot, wildcard);
  return pickRandom(pool);
}

function buildPool<T extends RouletteBase>(
  items: T[],
  allowEmptySlot: boolean,
  wildcard: T | null,
): (T | null)[] {
  const pool: (T | null)[] = [...items];
  if (allowEmptySlot) pool.push(null);
  if (wildcard) pool.push(wildcard);
  return pool;
}

// Largo fijo de la tira: da la sensación de un giro largo sin importar
// si el pool tiene 12 ítems o 500 — clave para escalar a los ~170+ perks reales.
// Debe quedar por debajo de 360° / ITEM_ANGLE_STEP (9°) = 40 posiciones: si el
// total (REEL_LENGTH + TAIL_PADDING) llega o supera 40, algún índice cae en el
// mismo ángulo que otro (ej. 43 y 3) y sus ítems se dibujan superpuestos.
const REEL_LENGTH = 32;
const TAIL_PADDING = 4;

function itemKey<T extends RouletteBase>(item: T | null): string {
  return item?.id ?? 'empty';
}

/**
 * Elige un ítem al azar del pool evitando repetir `avoidKey` cuando hay
 * más de una opción disponible — con pools chicos (pocos ítems habilitados)
 * los repetidos consecutivos se notaban demasiado en la tira.
 */
function pickAvoiding<T extends RouletteBase>(pool: (T | null)[], avoidKey: string | null): T | null {
  if (pool.length <= 1) return pickRandom(pool);
  const choice = pickRandom(pool);
  if (itemKey(choice) !== avoidKey) return choice;
  const rest = pool.filter((p) => itemKey(p) !== avoidKey);
  return pickRandom(rest);
}

/**
 * Construye la tira de ítems que se recorrerá durante el giro (largo fijo,
 * ítems tomados al azar del pool sin repetir el vecino inmediato), garantizando
 * que el ganador quede fijo en `winnerIndex`.
 */
export function buildReel<T extends RouletteBase>(
  items: T[],
  allowEmptySlot: boolean,
  wildcard: T | null,
  winner: T | null,
): { reel: RouletteItem<T>[]; winnerIndex: number } {
  const basePool = buildPool(items, allowEmptySlot, wildcard);

  const reel: RouletteItem<T>[] = [];
  let prevKey: string | null = null;
  for (let i = 0; i < REEL_LENGTH; i++) {
    const item: T | null = pickAvoiding<T>(basePool, prevKey);
    prevKey = itemKey(item);
    reel.push({ key: `reel-${i}-${prevKey}`, perk: item });
  }

  const winnerIndex = REEL_LENGTH - TAIL_PADDING - 1;
  const winnerKey = itemKey(winner);

  // Si el ítem justo antes del ganador coincidió con él, se redibuja para
  // que no se vean "dos iguales pegados" justo donde cae la aguja.
  if (winnerIndex > 0 && itemKey(reel[winnerIndex - 1].perk) === winnerKey) {
    const item = pickAvoiding<T>(basePool, winnerKey);
    reel[winnerIndex - 1] = { key: `reel-${winnerIndex - 1}-${itemKey(item)}`, perk: item };
  }

  reel[winnerIndex] = { key: `winner-${winnerKey}`, perk: winner };

  let tailPrevKey = winnerKey;
  for (let i = 0; i < TAIL_PADDING; i++) {
    const item = pickAvoiding<T>(basePool, tailPrevKey);
    tailPrevKey = itemKey(item);
    reel.push({ key: `tail-${i}-${tailPrevKey}`, perk: item });
  }

  return { reel, winnerIndex };
}
