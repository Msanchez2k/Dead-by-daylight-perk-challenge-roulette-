import { useState } from 'react';
import type { Killer } from '@/types/killer';
import type { Settings } from '@/types/settings';
import { useKillers } from '@/hooks/useKillers';
import { useKillerSelection } from '@/hooks/useKillerSelection';
import { RouletteModal } from '@/components/roulette/RouletteModal';
import { SettingsPanel } from '@/components/settings/SettingsPanel';
import { KillerManagementPanel } from '@/components/settings/KillerManagementPanel';
import { BackIcon } from '@/components/ui/icons';
import settingsIcon from '@/assets/icons/settings.png';
import shrineOfSecretsIcon from '@/assets/icons/shrine-of-secrets.png';
import exposedIcon from '@/assets/icons/exposed.png';
import { EmberField } from '@/components/ui/EmberField';
import { Footer } from '@/components/ui/Footer';
import { Button } from '@/components/ui/Button';
import { useTranslation } from '@/context/LanguageContext';
import { playKillerSound } from '@/utils/sound';

interface KillerRouletteScreenProps {
  settings: Settings;
  onToggleSetting: (key: keyof Settings) => void;
  onSetVolume: (key: 'soundVolume' | 'musicVolume', value: number) => void;
  onBack: () => void;
  onGoToPerks: () => void;
}

export function KillerRouletteScreen({
  settings,
  onToggleSetting,
  onSetVolume,
  onBack,
  onGoToPerks,
}: KillerRouletteScreenProps) {
  const allKillers = useKillers();
  const killerSelection = useKillerSelection();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [killerManagementOpen, setKillerManagementOpen] = useState(false);
  const [selectedKiller, setSelectedKiller] = useState<Killer | null>(null);
  const [killerSpinning, setKillerSpinning] = useState(false);
  const { strings } = useTranslation();
  const t = strings.killerRoulette;

  const availableKillers = allKillers.filter((k) => killerSelection.isEnabled(k.id));

  function handleSpin() {
    if (availableKillers.length === 0) return;
    setKillerSpinning(true);
  }

  function handleResult(killer: Killer | null) {
    setSelectedKiller(killer);
    setKillerSpinning(false);
    if (killer && settings.soundEnabled) playKillerSound(killer.id, settings.soundVolume);
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-10 overflow-hidden px-6 pb-12 animate-fade-in">
      <EmberField count={26} />
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

      <div className="fixed right-5 top-5 z-20 flex items-center gap-4">
        <button
          type="button"
          onClick={() => setKillerManagementOpen(true)}
          aria-label={t.managementAria}
          className="opacity-70 transition-all duration-300 hover:scale-110 hover:opacity-100 hover:drop-shadow-[0_0_10px_rgba(196,30,30,0.6)]"
        >
          <img src={exposedIcon} alt="" aria-hidden="true" className="h-16 w-16 select-none" />
        </button>
        <button
          type="button"
          onClick={() => setSettingsOpen(true)}
          aria-label={strings.mainScreen.settingsAria}
          className="opacity-70 transition-all duration-300 hover:scale-110 hover:opacity-100 hover:drop-shadow-[0_0_10px_rgba(196,30,30,0.6)]"
        >
          <img src={settingsIcon} alt="" aria-hidden="true" className="h-16 w-16 select-none" />
        </button>
      </div>

      <div className="relative z-10 text-center">
        <p className="mb-2 font-display text-xs uppercase tracking-[0.35em] text-blood-500">
          {strings.roleSelect.killerTitle}
        </p>
        <h1 className="font-display text-3xl uppercase tracking-wide text-bone-100">{t.title}</h1>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-3">
        {selectedKiller ? (
          <div className="flex flex-col items-center gap-2 animate-fade-in">
            <div
              className="h-[28rem] w-[28rem] max-h-[80vw] max-w-[80vw] overflow-hidden"
              style={{
                WebkitMaskImage: 'radial-gradient(circle closest-side, black 40%, transparent 90%)',
                maskImage: 'radial-gradient(circle closest-side, black 40%, transparent 90%)',
              }}
            >
              <img
                src={selectedKiller.image}
                alt={selectedKiller.name}
                className="h-full w-full object-cover"
              />
            </div>
            <p className="font-display text-lg uppercase tracking-wide text-bone-100">
              {selectedKiller.name}
            </p>
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={handleSpin} disabled={availableKillers.length === 0}>
                {t.spinAgain}
              </Button>
              <button
                type="button"
                onClick={onGoToPerks}
                aria-label={t.goToPerksAria}
                className="opacity-80 transition-all duration-300 hover:scale-110 hover:opacity-100 hover:drop-shadow-[0_0_10px_rgba(196,30,30,0.6)]"
              >
                <img
                  src={shrineOfSecretsIcon}
                  alt=""
                  aria-hidden="true"
                  className="h-12 w-12 select-none"
                />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <p className="font-display text-xs uppercase tracking-[0.2em] text-steel-400">
              {t.prompt}
            </p>
            <Button variant="primary" onClick={handleSpin} disabled={availableKillers.length === 0}>
              {t.spin}
            </Button>
          </div>
        )}
      </div>

      {killerSpinning && (
        <RouletteModal<Killer>
          perks={availableKillers}
          allowEmptySlot={false}
          wildcard={null}
          soundEnabled={settings.soundEnabled}
          soundVolume={settings.soundVolume}
          onResult={handleResult}
        />
      )}

      {settingsOpen && (
        <SettingsPanel
          settings={settings}
          onToggle={onToggleSetting}
          onSetVolume={onSetVolume}
          onClose={() => setSettingsOpen(false)}
        />
      )}

      {killerManagementOpen && (
        <KillerManagementPanel
          killers={allKillers}
          isEnabled={killerSelection.isEnabled}
          onToggleKiller={killerSelection.toggleKiller}
          onSelectAll={(disableAll) =>
            killerSelection.setAllDisabled(allKillers.map((k) => k.id), disableAll)
          }
          onClose={() => setKillerManagementOpen(false)}
        />
      )}
    </div>
  );
}
