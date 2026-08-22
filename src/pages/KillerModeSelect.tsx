import type { KillerMode } from '@/types/killer';
import { RoleCard } from '@/components/ui/RoleCard';
import { EmberField } from '@/components/ui/EmberField';
import { LanguageSwitch } from '@/components/ui/LanguageSwitch';
import { Footer } from '@/components/ui/Footer';
import { BackIcon } from '@/components/ui/icons';
import { useTranslation } from '@/context/LanguageContext';
import managePerksIcon from '@/assets/icons/manage-perks.png';
import exposedIcon from '@/assets/icons/exposed.png';

interface KillerModeSelectProps {
  onSelectMode: (mode: KillerMode) => void;
  onBack: () => void;
}

export function KillerModeSelect({ onSelectMode, onBack }: KillerModeSelectProps) {
  const { strings } = useTranslation();
  const t = strings.killerModeSelect;

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pb-12 animate-fade-in">
      <EmberField />
      <Footer />

      <button
        type="button"
        onClick={onBack}
        aria-label={t.backAria}
        className="fixed left-5 top-5 z-20 flex items-center gap-2 text-steel-400 transition-colors duration-300 hover:text-blood-500"
      >
        <BackIcon className="h-5 w-5" />
        <span className="font-display text-xs uppercase tracking-[0.2em]">{t.backLabel}</span>
      </button>

      <div className="fixed right-5 top-5 z-20">
        <LanguageSwitch />
      </div>

      <div className="relative z-10 mb-14 text-center animate-fade-in">
        <p className="mb-3 font-display text-xs uppercase tracking-[0.35em] text-blood-500">
          {t.eyebrow}
        </p>
        <h1 className="font-display text-4xl uppercase tracking-wide text-bone-100 sm:text-5xl">
          {t.title}
        </h1>
      </div>

      <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:gap-10 animate-fade-in">
        <RoleCard
          id="character"
          accent="blood"
          title={t.characterTitle}
          tagline={t.characterTagline}
          chooseLabel={t.choose}
          icon={<img src={exposedIcon} alt="" aria-hidden="true" className="h-full w-full object-contain" />}
          onSelect={onSelectMode}
        />
        <RoleCard
          id="perks"
          accent="bone"
          title={t.perksTitle}
          tagline={t.perksTagline}
          chooseLabel={t.choose}
          icon={
            <img src={managePerksIcon} alt="" aria-hidden="true" className="h-full w-full object-contain" />
          }
          onSelect={onSelectMode}
        />
      </div>
    </div>
  );
}
