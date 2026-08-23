import { useEffect, useState } from 'react';
import type { BuildSlot } from '@/types/build';
import type { BuildHistoryEntry } from '@/types/buildHistory';
import type { Role } from '@/types/perk';

const STORAGE_KEY = 'dbd-challenge-roulette:build-history';
const MAX_ENTRIES = 20;

function loadHistory(): BuildHistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // localStorage no disponible: se empieza con historial vacío
  }
  return [];
}

/** Guarda y gestiona las últimas builds generadas (por rol), persistidas en localStorage. */
export function useBuildHistory() {
  const [history, setHistory] = useState<BuildHistoryEntry[]>(loadHistory);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  /** Archiva la build actual al principio del historial (no-op si está vacía). */
  function addEntry(role: Role, slots: BuildSlot[]) {
    const hasProgress = slots.some((s) => s.status !== 'unfilled');
    if (!hasProgress) return;

    const entry: BuildHistoryEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      role,
      slots,
      createdAt: Date.now(),
    };
    setHistory((prev) => [entry, ...prev].slice(0, MAX_ENTRIES));
  }

  function removeEntry(id: string) {
    setHistory((prev) => prev.filter((e) => e.id !== id));
  }

  function clearHistory(role: Role) {
    setHistory((prev) => prev.filter((e) => e.role !== role));
  }

  return { history, addEntry, removeEntry, clearHistory };
}
