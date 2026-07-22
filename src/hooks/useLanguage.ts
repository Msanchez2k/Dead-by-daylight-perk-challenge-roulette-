import { useEffect, useState } from 'react';
import type { Language } from '@/types/i18n';

const STORAGE_KEY = 'dbd-challenge-roulette:language';

function detectDefaultLanguage(): Language {
  if (typeof navigator === 'undefined') return 'es';
  return navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en';
}

function loadLanguage(): Language {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === 'es' || raw === 'en') return raw;
  } catch {
    // localStorage no disponible: se usa el idioma detectado del navegador
  }
  return detectDefaultLanguage();
}

export function useLanguage() {
  const [language, setLanguage] = useState<Language>(loadLanguage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  return { language, setLanguage };
}
