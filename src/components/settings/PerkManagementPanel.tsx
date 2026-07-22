import { useMemo, useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Toggle } from '@/components/ui/Toggle';
import { Button } from '@/components/ui/Button';
import { useTranslation } from '@/context/LanguageContext';
import type { Perk } from '@/types/perk';
import type { Settings } from '@/types/settings';

const MIN_ENABLED = 4;

interface PerkGroup {
  character: string;
  perks: Perk[];
}

interface PerkManagementPanelProps {
  perks: Perk[];
  isEnabled: (perkId: string) => boolean;
  onTogglePerk: (perkId: string) => void;
  onSetGroupEnabled: (perkIds: string[], enabled: boolean) => void;
  onSelectAll: (disableAll: boolean) => void;
  settings: Settings;
  onToggleSetting: (key: keyof Settings) => void;
  onClose: () => void;
}

/** Agrupa las perks por personaje, preservando el orden en que aparecen en el dataset. */
function groupByCharacter(perks: Perk[]): PerkGroup[] {
  const groups: PerkGroup[] = [];
  const index = new Map<string, PerkGroup>();
  for (const perk of perks) {
    let group = index.get(perk.character);
    if (!group) {
      group = { character: perk.character, perks: [] };
      index.set(perk.character, group);
      groups.push(group);
    }
    group.perks.push(perk);
  }
  return groups;
}

export function PerkManagementPanel({
  perks,
  isEnabled,
  onTogglePerk,
  onSetGroupEnabled,
  onSelectAll,
  settings,
  onToggleSetting,
  onClose,
}: PerkManagementPanelProps) {
  const { strings } = useTranslation();
  const t = strings.perkManagement;
  const [search, setSearch] = useState('');

  const groups = useMemo(() => groupByCharacter(perks), [perks]);

  const filteredGroups = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (!query) return groups;
    return groups
      .map(({ character, perks: groupPerks }) => {
        const charMatches = character.toLowerCase().includes(query);
        const visiblePerks = charMatches
          ? groupPerks
          : groupPerks.filter((p) => p.name.toLowerCase().includes(query));
        return { character, perks: visiblePerks };
      })
      .filter((group) => group.perks.length > 0);
  }, [groups, search]);

  const specialQuery = search.toLowerCase().trim();
  const showSpecialGroup =
    !specialQuery ||
    t.specialGroupTitle.toLowerCase().includes(specialQuery) ||
    strings.settings.emptySlot.toLowerCase().includes(specialQuery) ||
    strings.settings.wildcard.toLowerCase().includes(specialQuery);

  const enabledCount = perks.filter((p) => isEnabled(p.id)).length;
  const atMinimum = enabledCount <= MIN_ENABLED;

  function handleToggle(perkId: string) {
    // No permite bajar de MIN_ENABLED perks habilitadas.
    if (isEnabled(perkId) && atMinimum) return;
    onTogglePerk(perkId);
  }

  function handleToggleGroup(group: PerkGroup) {
    const groupIds = group.perks.map((p) => p.id);
    const allEnabled = groupIds.every((id) => isEnabled(id));
    const nextEnabled = !allEnabled;

    if (!nextEnabled) {
      const enabledIds = perks.filter((p) => isEnabled(p.id)).map((p) => p.id);
      const remaining = enabledIds.filter((id) => !groupIds.includes(id)).length;
      if (remaining < MIN_ENABLED) return;
    }

    onSetGroupEnabled(groupIds, nextEnabled);
  }

  return (
    <Modal onClose={onClose}>
      <div className="flex max-h-[85vh] w-[92vw] max-w-6xl flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl uppercase tracking-wide text-bone-100">{t.title}</h2>
          <span className="font-display text-xs uppercase tracking-wide text-steel-400">
            {enabledCount}/{perks.length} {t.enabledCount}
          </span>
        </div>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t.searchPlaceholder}
          className="border border-steel-600 bg-fog-950/60 px-3 py-2 text-sm text-bone-100
                     placeholder:text-steel-400 focus:outline-none focus:border-blood-500"
        />

        <div className="flex gap-3">
          <Button variant="ghost" onClick={() => onSelectAll(false)} className="flex-1 text-center">
            {t.selectAll}
          </Button>
          <Button variant="ghost" onClick={() => onSelectAll(true)} className="flex-1 text-center">
            {t.selectNone}
          </Button>
        </div>

        {atMinimum && <p className="text-xs text-blood-400">{t.minWarning}</p>}

        <div
          className="flex-1 overflow-y-auto border border-steel-700 bg-steel-800/60 p-3
                     columns-1 gap-3 sm:columns-2 xl:columns-3 2xl:columns-4"
        >
          {showSpecialGroup && (
            <div className="mb-3 break-inside-avoid border border-fog-950/60 bg-fog-950/20">
              <div className="bg-fog-950/50 px-3 py-2">
                <span className="font-display text-xs uppercase tracking-[0.15em] text-bone-100">
                  {t.specialGroupTitle}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 px-3 py-2 pl-6">
                <span className="text-sm text-bone-300">{strings.settings.emptySlot}</span>
                <Toggle
                  role="checkbox"
                  label={strings.settings.emptySlot}
                  checked={settings.emptySlotEnabled}
                  onChange={() => onToggleSetting('emptySlotEnabled')}
                />
              </div>

              <div className="flex items-center justify-between gap-4 px-3 py-2 pl-6">
                <span className="text-sm text-bone-300">{strings.settings.wildcard}</span>
                <Toggle
                  role="checkbox"
                  label={strings.settings.wildcard}
                  checked={settings.wildcardEnabled}
                  onChange={() => onToggleSetting('wildcardEnabled')}
                />
              </div>
            </div>
          )}

          {filteredGroups.map((group) => {
            const groupIds = group.perks.map((p) => p.id);
            const enabledInGroup = groupIds.filter((id) => isEnabled(id)).length;
            const allEnabled = enabledInGroup === groupIds.length;
            const noneEnabled = enabledInGroup === 0;

            return (
              <div
                key={group.character}
                className="mb-3 break-inside-avoid border border-fog-950/60 bg-fog-950/20"
              >
                <div className="flex items-center justify-between gap-4 bg-fog-950/50 px-3 py-2">
                  <span className="font-display text-xs uppercase tracking-[0.15em] text-bone-100">
                    {group.character}
                  </span>
                  <Toggle
                    role="checkbox"
                    label={group.character}
                    checked={allEnabled}
                    indeterminate={!allEnabled && !noneEnabled}
                    onChange={() => handleToggleGroup(group)}
                  />
                </div>

                {group.perks.map((perk) => (
                  <div key={perk.id} className="flex items-center justify-between gap-4 px-3 py-2 pl-6">
                    <span className="text-sm text-bone-300">{perk.name}</span>
                    <Toggle
                      role="checkbox"
                      label={perk.name}
                      checked={isEnabled(perk.id)}
                      onChange={() => handleToggle(perk.id)}
                    />
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="self-end font-display text-xs uppercase tracking-[0.2em] text-blood-500 transition-colors hover:text-blood-400"
        >
          {strings.settings.close}
        </button>
      </div>
    </Modal>
  );
}
