import { createContext, useContext, type ReactNode } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { translations, type UIStrings } from '@/i18n/translations';
import type { Language } from '@/types/i18n';

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  strings: UIStrings;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { language, setLanguage } = useLanguage();

  const value: LanguageContextValue = {
    language,
    setLanguage,
    strings: translations[language],
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

/** Acceso a los textos traducidos e idioma activo desde cualquier componente. */
export function useTranslation() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useTranslation debe usarse dentro de <LanguageProvider>');
  }
  return ctx;
}
