import { useState } from 'react';
import { createEmptyBuild, type BuildSlot } from '@/types/build';
import type { Perk } from '@/types/perk';

export function useBuild() {
  const [slots, setSlots] = useState<BuildSlot[]>(createEmptyBuild());

  /** Reinicia las 4 casillas a su estado inicial ('unfilled'). */
  function resetBuild() {
    setSlots(createEmptyBuild());
  }

  /** Aplica el resultado de la ruleta a una casilla: perk, o null = espacio vacío. */
  function fillSlot(id: number, perk: Perk | null) {
    setSlots((prev) =>
      prev.map((slot) =>
        slot.id === id ? { ...slot, status: perk ? 'filled' : 'empty', perk } : slot,
      ),
    );
  }

  return { slots, setSlots, resetBuild, fillSlot };
}
