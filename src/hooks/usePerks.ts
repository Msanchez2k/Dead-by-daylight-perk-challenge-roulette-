import survivorPerksEs from '@/data/perks.survivor.json';
import survivorPerksEn from '@/data/perks.survivor.en.json';
import killerPerks from '@/data/perks.killer.json';
import type { Perk, Role } from '@/types/perk';
import type { Language } from '@/types/i18n';
import { useTranslation } from '@/context/LanguageContext';

// El dataset de Killer todavía no tiene versión en inglés (pendiente);
// mientras tanto ambos idiomas usan el mismo archivo en español.
const PERKS_BY_LANGUAGE: Record<Language, Record<Role, Perk[]>> = {
  es: {
    survivor: survivorPerksEs as Perk[],
    killer: killerPerks as Perk[],
  },
  en: {
    survivor: survivorPerksEn as Perk[],
    killer: killerPerks as Perk[],
  },
};

/** Devuelve el dataset completo de perks correspondiente al rol activo y al idioma elegido. */
export function usePerks(role: Role): Perk[] {
  const { language } = useTranslation();
  return PERKS_BY_LANGUAGE[language][role];
}
