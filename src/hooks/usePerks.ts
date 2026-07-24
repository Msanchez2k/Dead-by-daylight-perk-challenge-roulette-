import survivorPerksEs from '@/data/perks.survivor.json';
import survivorPerksEn from '@/data/perks.survivor.en.json';
import killerPerksEs from '@/data/perks.killer.json';
import killerPerksEn from '@/data/perks.killer.en.json';
import type { Perk, Role } from '@/types/perk';
import type { Language } from '@/types/i18n';
import { useTranslation } from '@/context/LanguageContext';

const PERKS_BY_LANGUAGE: Record<Language, Record<Role, Perk[]>> = {
  es: {
    survivor: survivorPerksEs as Perk[],
    killer: killerPerksEs as Perk[],
  },
  en: {
    survivor: survivorPerksEn as Perk[],
    killer: killerPerksEn as Perk[],
  },
};

/** Devuelve el dataset completo de perks correspondiente al rol activo y al idioma elegido. */
export function usePerks(role: Role): Perk[] {
  const { language } = useTranslation();
  return PERKS_BY_LANGUAGE[language][role];
}
