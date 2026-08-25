import type { Perk, Role } from '@/types/perk';
import type { Settings } from '@/types/settings';
import type { BuildHistoryEntry } from '@/types/buildHistory';
import { useBuild } from '@/hooks/useBuild';
import { usePerks } from '@/hooks/usePerks';
import { usePerkSelection } from '@/hooks/usePerkSelection';
import { useBuildHistory } from '@/hooks/useBuildHistory';
import { BuildGrid } from '@/components/build/BuildGrid';
import { PerkDetailModal } from '@/components/build/PerkDetailModal';
import { BuildHistoryPanel } from '@/components/build/BuildHistoryPanel';
import { RouletteModal } from '@/components/roulette/RouletteModal';
import { SettingsPanel } from '@/components/settings/SettingsPanel';
import { PerkManagementPanel } from '@/components/settings/PerkManagementPanel';
import { BackIcon, HistoryIcon } from '@/components/ui/icons';
import managePerksIcon from '@/assets/icons/manage-perks.png';
import settingsIcon from '@/assets/icons/settings.png';
import exposedIcon from '@/assets/icons/exposed.png';
import { EmberField } from '@/components/ui/EmberField';
import { Footer } from '@/components/ui/Footer';
import { Button } from '@/components/ui/Button';
import { useTranslation } from '@/context/LanguageContext';
import { createWildcardPerk } from '@/data/wildcard';
import { buildToText, copyToClipboard } from '@/utils/clipboard';
import { useMemo, useState } from 'react';

interface MainScreenProps {
  role: Role;
  settings: Settings;
  onToggleSetting: (key: keyof Settings) => void;
  onSetVolume: (key: 'soundVolume' | 'musicVolume', value: number) => void;
  onBack: () => void;
  onGoToKiller?: () => void;
}

const ROLE_LABEL: Record<Role, string> = {
  survivor: 'Survivor',
  killer: 'Killer',
};

export function MainScreen({
  role,
  settings,
  onToggleSetting,
  onSetVolume,
  onBack,
  onGoToKiller,
}: MainScreenProps) {
  const { slots, setSlots, fillSlot, resetBuild } = useBuild();
  const allPerks = usePerks(role);
  const { isEnabled, togglePerk, setAllDisabled, setPerksEnabled } = usePerkSelection();
  const { history, addEntry, removeEntry, clearHistory } = useBuildHistory();
  const [activeSlotId, setActiveSlotId] = useState<number | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [perkManagementOpen, setPerkManagementOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [detailPerk, setDetailPerk] = useState<Perk | null>(null);
  const [rerollMode, setRerollMode] = useState(false);
  const [rerollUsed, setRerollUsed] = useState(false);
  const { strings } = useTranslation();
  const t = strings.mainScreen;

  // Al tirar de nuevo una casilla ya llena, su propia perk no debe contarse
  // como "en uso" — si no, se quedaría fuera de su propio pool de reroll.
  const usedPerkIds = new Set(
    slots.filter((s) => s.perk && s.id !== activeSlotId).map((s) => s.perk!.id),
  );
  const availablePerks = allPerks.filter((p) => isEnabled(role, p.id) && !usedPerkIds.has(p.id));
  const hasProgress = slots.some((s) => s.status !== 'unfilled');
  const canReroll = hasProgress && !rerollUsed && activeSlotId === null;
  // Si el rol es killer, "atrás" vuelve a la pantalla de modo (Killer/Perks), no a selección de rol.
  const backLabel = role === 'killer' ? strings.killerRoulette.backLabel : t.backLabel;
  const backAria = role === 'killer' ? strings.killerRoulette.backAria : t.backAria;

  const wildcardPerk = useMemo(
    () =>
      settings.wildcardEnabled
        ? createWildcardPerk(role, strings.wildcard.name, strings.wildcard.description)
        : null,
    [settings.wildcardEnabled, role, strings.wildcard.name, strings.wildcard.description],
  );

  function handleSlotClick(id: number) {
    const slot = slots.find((s) => s.id === id);
    if (!slot) return;

    if (rerollMode) {
      if (slot.status !== 'filled' && slot.status !== 'empty') return;
      setRerollMode(false);
      setRerollUsed(true);
      setActiveSlotId(id);
      return;
    }

    if (slot.status === 'filled' && slot.perk) {
      setDetailPerk(slot.perk);
      return;
    }

    if (slot.status !== 'unfilled') return;
    const poolSize = availablePerks.length + (settings.emptySlotEnabled ? 1 : 0) + (wildcardPerk ? 1 : 0);
    if (poolSize === 0) return;
    setActiveSlotId(id);
  }

  function handleResult(perk: Parameters<typeof fillSlot>[1]) {
    if (activeSlotId === null) return;
    fillSlot(activeSlotId, perk);
    setActiveSlotId(null);
  }

  function handleNewBuild() {
    if (hasProgress && !window.confirm(t.confirmNewBuild)) return;
    if (hasProgress) addEntry(role, slots);
    resetBuild();
    setRerollMode(false);
    setRerollUsed(false);
  }

  function handleRerollClick() {
    setRerollMode((prev) => !prev);
  }

  function handleBack() {
    if (hasProgress && !window.confirm(t.confirmBack)) return;
    if (hasProgress) addEntry(role, slots);
    onBack();
  }

  function handleRestoreFromHistory(entry: BuildHistoryEntry) {
    setSlots(entry.slots);
    setRerollMode(false);
    setRerollUsed(false);
    setHistoryOpen(false);
  }

  async function handleCopyBuild() {
    const ok = await copyToClipboard(buildToText(slots, role));
    if (!ok) return;
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-10 overflow-hidden px-6 pb-12 animate-fade-in">
      <EmberField count={26} />
      <Footer />

      <button
        type="button"
        onClick={handleBack}
        aria-label={backAria}
        className="fixed left-5 top-5 z-20 flex items-center gap-2 text-steel-400 transition-colors duration-300 hover:text-blood-500"
      >
        <BackIcon className="h-5 w-5" />
        <span className="font-display text-xs uppercase tracking-[0.2em]">{backLabel}</span>
      </button>

      <div className="fixed right-5 top-5 z-20 flex items-center gap-4">
        <button
          type="button"
          onClick={() => setPerkManagementOpen(true)}
          aria-label={strings.perkManagement.title}
          className="opacity-70 transition-all duration-300 hover:scale-110 hover:opacity-100 hover:drop-shadow-[0_0_10px_rgba(196,30,30,0.6)]"
        >
          <img src={managePerksIcon} alt="" aria-hidden="true" className="h-16 w-16 select-none" />
        </button>
        <button
          type="button"
          onClick={() => setHistoryOpen(true)}
          aria-label={t.historyAria}
          className="text-bone-100 opacity-70 transition-all duration-300 hover:scale-110 hover:opacity-100 hover:drop-shadow-[0_0_10px_rgba(196,30,30,0.6)]"
        >
          <HistoryIcon className="h-9 w-9 select-none" />
        </button>
        <button
          type="button"
          onClick={() => setSettingsOpen(true)}
          aria-label={t.settingsAria}
          className="opacity-70 transition-all duration-300 hover:scale-110 hover:opacity-100 hover:drop-shadow-[0_0_10px_rgba(196,30,30,0.6)]"
        >
          <img src={settingsIcon} alt="" aria-hidden="true" className="h-16 w-16 select-none" />
        </button>
      </div>

      <div className="relative z-10 text-center">
        <p className="mb-2 font-display text-xs uppercase tracking-[0.35em] text-blood-500">
          {ROLE_LABEL[role]}
        </p>
        <h1 className="font-display text-3xl uppercase tracking-wide text-bone-100">
          {t.yourBuild}
        </h1>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-3">
        <BuildGrid slots={slots} onSlotClick={handleSlotClick} />
        {rerollMode && (
          <p className="font-display text-xs uppercase tracking-[0.2em] text-blood-500 animate-fade-in">
            {t.rerollHint}
          </p>
        )}
      </div>

      <div className="relative z-10 flex items-center gap-3">
        {role === 'killer' && onGoToKiller && (
          <button
            type="button"
            onClick={onGoToKiller}
            aria-label={strings.killerRoulette.goToKillerAria}
            className="opacity-80 transition-all duration-300 hover:scale-110 hover:opacity-100 hover:drop-shadow-[0_0_10px_rgba(196,30,30,0.6)]"
          >
            <img src={exposedIcon} alt="" aria-hidden="true" className="h-12 w-12 select-none" />
          </button>
        )}
        <Button variant="ghost" onClick={handleNewBuild} disabled={!hasProgress}>
          {t.newBuild}
        </Button>
        <Button variant="ghost" onClick={handleCopyBuild} disabled={!hasProgress}>
          {copied ? t.copied : t.copyBuild}
        </Button>
        <Button variant="ghost" onClick={handleRerollClick} disabled={!rerollMode && !canReroll}>
          {rerollMode ? t.rerollCancel : t.reroll}
        </Button>
      </div>

      {activeSlotId !== null && (
        <RouletteModal
          perks={availablePerks}
          allowEmptySlot={settings.emptySlotEnabled}
          wildcard={wildcardPerk}
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

      {detailPerk && <PerkDetailModal perk={detailPerk} onClose={() => setDetailPerk(null)} />}

      {perkManagementOpen && (
        <PerkManagementPanel
          perks={allPerks}
          isEnabled={(perkId) => isEnabled(role, perkId)}
          onTogglePerk={(perkId) => togglePerk(role, perkId)}
          onSetGroupEnabled={(perkIds, enabled) => setPerksEnabled(role, perkIds, enabled)}
          onSelectAll={(disableAll) => setAllDisabled(role, allPerks.map((p) => p.id), disableAll)}
          settings={settings}
          onToggleSetting={onToggleSetting}
          onClose={() => setPerkManagementOpen(false)}
        />
      )}

      {historyOpen && (
        <BuildHistoryPanel
          role={role}
          history={history}
          onRestore={handleRestoreFromHistory}
          onDelete={removeEntry}
          onClearAll={() => clearHistory(role)}
          onClose={() => setHistoryOpen(false)}
        />
      )}
    </div>
  );
}
