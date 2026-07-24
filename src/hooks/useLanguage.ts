import { useEffect, useState } from 'react';
import type { Language } from '@/types/i18n';

const STORAGE_KEY = 'dbd-challenge-roulette:language';

function detectDefaultLanguage(): Language {
  if (typeof navigator === 'undefined') return 'es';
  return navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en';
}

/** Permite forzar el idioma con un link tipo ?lang=en, sin importar el
 * navegador de quien lo abra ni una preferencia guardada previamente. */
function getLanguageFromUrl(): Language | null {
  if (typeof window === 'undefined') return null;
  const param = new URLSearchParams(window.location.search).get('lang');
  return param === 'es' || param === 'en' ? param : null;
}

function loadLanguage(): Language {
  const fromUrl = getLanguageFromUrl();
  if (fromUrl) return fromUrl;

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
