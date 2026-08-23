import { useMemo, useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useTranslation } from '@/context/LanguageContext';
import { buildToText, copyToClipboard } from '@/utils/clipboard';
import type { BuildHistoryEntry } from '@/types/buildHistory';
import type { Role } from '@/types/perk';
import noPerkIcon from '@/assets/textures/no-perk.png';

interface BuildHistoryPanelProps {
  role: Role;
  history: BuildHistoryEntry[];
  onRestore: (entry: BuildHistoryEntry) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
  onClose: () => void;
}

export function BuildHistoryPanel({
  role,
  history,
  onRestore,
  onDelete,
  onClearAll,
  onClose,
}: BuildHistoryPanelProps) {
  const { strings, language } = useTranslation();
  const t = strings.buildHistory;
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const entries = useMemo(() => history.filter((e) => e.role === role), [history, role]);

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(language === 'es' ? 'es-ES' : 'en-US', {
        dateStyle: 'short',
        timeStyle: 'short',
      }),
    [language],
  );

  async function handleCopy(entry: BuildHistoryEntry) {
    const ok = await copyToClipboard(buildToText(entry.slots, entry.role));
    if (!ok) return;
    setCopiedId(entry.id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  function handleRestore(entry: BuildHistoryEntry) {
    if (!window.confirm(t.confirmRestore)) return;
    onRestore(entry);
  }

  function handleClearAll() {
    if (!window.confirm(t.confirmClear)) return;
    onClearAll();
  }

  return (
    <Modal onClose={onClose}>
      <div className="flex max-h-[85vh] w-[92vw] max-w-2xl flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl uppercase tracking-wide text-bone-100">{t.title}</h2>
          {entries.length > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              className="font-display text-xs uppercase tracking-[0.2em] text-blood-500 transition-colors hover:text-blood-400"
            >
              {t.clearAll}
            </button>
          )}
        </div>

        {entries.length === 0 ? (
          <p className="py-8 text-center text-sm text-steel-400">{t.empty}</p>
        ) : (
          <div className="flex-1 overflow-y-auto border border-steel-700 bg-steel-800/60 p-3">
            <div className="flex flex-col gap-2">
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className="flex flex-col gap-3 border border-fog-950/60 bg-fog-950/20 p-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      {entry.slots.map((slot) => (
                        <div
                          key={slot.id}
                          className="h-9 w-9 flex-shrink-0 overflow-hidden rounded-sm border border-steel-700 bg-fog-950/60"
                        >
                          {slot.status === 'filled' && slot.perk ? (
                            <img
                              src={slot.perk.image}
                              alt={slot.perk.name}
                              className="h-full w-full object-contain"
                            />
                          ) : slot.status === 'empty' ? (
                            <img
                              src={noPerkIcon}
                              alt=""
                              aria-hidden="true"
                              className="h-full w-full scale-75 object-contain opacity-70"
                            />
                          ) : null}
                        </div>
                      ))}
                    </div>
                    <span className="whitespace-nowrap text-xs text-steel-400">
                      {dateFormatter.format(entry.createdAt)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <Button variant="ghost" onClick={() => handleCopy(entry)} className="px-3 py-1.5 text-[10px]">
                      {copiedId === entry.id ? t.copied : t.copy}
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => handleRestore(entry)}
                      className="px-3 py-1.5 text-[10px]"
                    >
                      {t.restore}
                    </Button>
                    <button
                      type="button"
                      onClick={() => onDelete(entry.id)}
                      aria-label={t.delete}
                      className="px-1 text-xs text-steel-500 transition-colors hover:text-blood-500"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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
