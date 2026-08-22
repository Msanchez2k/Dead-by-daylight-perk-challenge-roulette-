import { useMemo, useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Toggle } from '@/components/ui/Toggle';
import { Button } from '@/components/ui/Button';
import { useTranslation } from '@/context/LanguageContext';
import type { Killer } from '@/types/killer';

const MIN_ENABLED = 1;

interface KillerManagementPanelProps {
  killers: Killer[];
  isEnabled: (killerId: string) => boolean;
  onToggleKiller: (killerId: string) => void;
  onSelectAll: (disableAll: boolean) => void;
  onClose: () => void;
}

export function KillerManagementPanel({
  killers,
  isEnabled,
  onToggleKiller,
  onSelectAll,
  onClose,
}: KillerManagementPanelProps) {
  const { strings } = useTranslation();
  const t = strings.killerManagement;
  const [search, setSearch] = useState('');

  const filteredKillers = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (!query) return killers;
    return killers.filter((k) => k.name.toLowerCase().includes(query));
  }, [killers, search]);

  const enabledCount = killers.filter((k) => isEnabled(k.id)).length;
  const atMinimum = enabledCount <= MIN_ENABLED;

  function handleToggle(killerId: string) {
    if (isEnabled(killerId) && atMinimum) return;
    onToggleKiller(killerId);
  }

  return (
    <Modal onClose={onClose}>
      <div className="flex max-h-[85vh] w-[92vw] max-w-3xl flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl uppercase tracking-wide text-bone-100">{t.title}</h2>
          <span className="font-display text-xs uppercase tracking-wide text-steel-400">
            {enabledCount}/{killers.length} {t.enabledCount}
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
                     grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3"
        >
          {filteredKillers.map((killer) => (
            <div
              key={killer.id}
              className="flex items-center justify-between gap-3 border border-fog-950/60 bg-fog-950/20 px-3 py-2"
            >
              <div className="flex min-w-0 items-center gap-3">
                <img
                  src={killer.image}
                  alt=""
                  aria-hidden="true"
                  className="h-9 w-9 flex-shrink-0 rounded-sm object-cover"
                />
                <span className="truncate text-sm text-bone-300">{killer.name}</span>
              </div>
              <Toggle
                role="checkbox"
                label={killer.name}
                checked={isEnabled(killer.id)}
                onChange={() => handleToggle(killer.id)}
              />
            </div>
          ))}
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
