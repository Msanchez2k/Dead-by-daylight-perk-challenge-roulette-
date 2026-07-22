/**
 * Baraja un array con el algoritmo Fisher-Yates.
 * No muta el array original.
 */
export function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/** Elige un elemento al azar de un array. Lanza error si está vacío. */
export function pickRandom<T>(items: T[]): T {
  if (items.length === 0) {
    throw new Error('pickRandom: no se puede elegir de un array vacío');
  }
  return items[Math.floor(Math.random() * items.length)];
}
