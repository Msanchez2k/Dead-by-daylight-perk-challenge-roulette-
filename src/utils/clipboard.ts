import type { BuildSlot } from '@/types/build';
import type { Role } from '@/types/perk';

/** Convierte el estado actual de la build en un texto compartible. */
export function buildToText(slots: BuildSlot[], role: Role): string {
  const roleLabel = role === 'survivor' ? 'Superviviente' : 'Killer';
  const lines = slots.map((slot, index) => {
    if (slot.status === 'filled' && slot.perk) {
      return `${index + 1}. ${slot.perk.name}`;
    }
    if (slot.status === 'empty') {
      return `${index + 1}. (espacio vacío)`;
    }
    return `${index + 1}. —`;
  });

  return [`DBD Challenge Roulette — Build de ${roleLabel}`, ...lines].join('\n');
}

/** Copia texto al portapapeles. Devuelve true si tuvo éxito. */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
