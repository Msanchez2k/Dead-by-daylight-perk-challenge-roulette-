import type { Role } from '@/types/perk';
import { RoleCard } from '@/components/ui/RoleCard';
import { EmberField } from '@/components/ui/EmberField';
import { LanguageSwitch } from '@/components/ui/LanguageSwitch';
import { Footer } from '@/components/ui/Footer';
import { useTranslation } from '@/context/LanguageContext';
import survivorLogo from '@/assets/logos/survivor-logo.png';
import killerLogo from '@/assets/logos/killer-logo.png';

interface RoleSelectProps {
  onSelectRole: (role: Role) => void;
}

export function RoleSelect({ onSelectRole }: RoleSelectProps) {
  const { strings } = useTranslation();
  const t = strings.roleSelect;

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pb-12">
      <EmberField />
      <Footer />

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
          role="survivor"
          title={t.survivorTitle}
          tagline={t.survivorTagline}
          chooseLabel={t.choose}
          icon={<img src={survivorLogo} alt="" aria-hidden="true" className="h-full w-full object-contain" />}
          onSelect={onSelectRole}
        />
        <RoleCard
          role="killer"
          title={t.killerTitle}
          tagline={t.killerTagline}
          chooseLabel={t.choose}
          icon={<img src={killerLogo} alt="" aria-hidden="true" className="h-full w-full object-contain" />}
          onSelect={onSelectRole}
        />
      </div>
    </div>
  );
}
