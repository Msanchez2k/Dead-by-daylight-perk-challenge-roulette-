import { useEffect, useState } from 'react';
import type { Role } from '@/types/perk';

const STORAGE_KEY = 'dbd-challenge-roulette:disabled-perks';

type DisabledMap = Record<Role, string[]>;

function loadDisabled(): DisabledMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { survivor: parsed.survivor ?? [], killer: parsed.killer ?? [] };
    }
  } catch {
    // localStorage no disponible: se empieza con todas las perks habilitadas
  }
  return { survivor: [], killer: [] };
}

/** Gestiona qué perks quedan excluidas del pool de la ruleta, por rol. */
export function usePerkSelection() {
  const [disabled, setDisabled] = useState<DisabledMap>(loadDisabled);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(disabled));
  }, [disabled]);

  function togglePerk(role: Role, perkId: string) {
    setDisabled((prev) => {
      const set = new Set(prev[role]);
      if (set.has(perkId)) {
        set.delete(perkId);
      } else {
        set.add(perkId);
      }
      return { ...prev, [role]: Array.from(set) };
    });
  }

  function setAllDisabled(role: Role, perkIds: string[], disableAll: boolean) {
    setDisabled((prev) => ({ ...prev, [role]: disableAll ? perkIds : [] }));
  }

  /** Habilita o deshabilita un subconjunto puntual de perks (ej. las 3 de un personaje). */
  function setPerksEnabled(role: Role, perkIds: string[], enabled: boolean) {
    setDisabled((prev) => {
      const set = new Set(prev[role]);
      for (const id of perkIds) {
        if (enabled) set.delete(id);
        else set.add(id);
      }
      return { ...prev, [role]: Array.from(set) };
    });
  }

  function isEnabled(role: Role, perkId: string): boolean {
    return !disabled[role].includes(perkId);
  }

  return { disabled, togglePerk, setAllDisabled, setPerksEnabled, isEnabled };
}
