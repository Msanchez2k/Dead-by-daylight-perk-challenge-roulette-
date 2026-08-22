import { useEffect, useState } from 'react';

const STORAGE_KEY = 'dbd-challenge-roulette:disabled-killers';

function loadDisabled(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // localStorage no disponible: se empieza con todos los killers habilitados
  }
  return [];
}

/** Gestiona qué killers quedan excluidos del pool de la ruleta (ej. DLC que no tienes). */
export function useKillerSelection() {
  const [disabled, setDisabled] = useState<string[]>(loadDisabled);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(disabled));
  }, [disabled]);

  function toggleKiller(killerId: string) {
    setDisabled((prev) =>
      prev.includes(killerId) ? prev.filter((id) => id !== killerId) : [...prev, killerId],
    );
  }

  function setAllDisabled(killerIds: string[], disableAll: boolean) {
    setDisabled(disableAll ? killerIds : []);
  }

  function isEnabled(killerId: string): boolean {
    return !disabled.includes(killerId);
  }

  return { disabled, toggleKiller, setAllDisabled, isEnabled };
}
