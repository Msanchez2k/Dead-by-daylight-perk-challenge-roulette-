import killersEs from '@/data/killers.json';
import killersEn from '@/data/killers.en.json';
import type { Killer } from '@/types/killer';
import type { Language } from '@/types/i18n';
import { useTranslation } from '@/context/LanguageContext';

const KILLERS_BY_LANGUAGE: Record<Language, Killer[]> = {
  es: killersEs as Killer[],
  en: killersEn as Killer[],
};

/** Devuelve el roster completo de killers en el idioma activo. */
export function useKillers(): Killer[] {
  const { language } = useTranslation();
  return KILLERS_BY_LANGUAGE[language];
}
