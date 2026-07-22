import { useEffect, useState } from 'react';
import { DEFAULT_SETTINGS, type Settings } from '@/types/settings';

const STORAGE_KEY = 'dbd-challenge-roulette:settings';

function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(loadSettings);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    // Reutiliza el mismo mecanismo que prefers-reduced-motion (ver index.css)
    document.documentElement.classList.toggle('reduce-motion', !settings.animationsEnabled);
  }, [settings]);

  function toggle(key: keyof Settings) {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return { settings, toggle };
}
