import { useEffect, useRef, useState } from 'react';
import type { RouletteBase } from '@/types/roulette';
import { Modal } from '@/components/ui/Modal';
import { Roulette } from './Roulette';
import { useRoulette } from '@/hooks/useRoulette';
import { pickWinner } from '@/utils/roulette';
import { playLandSound, playSpinSound, playTickSound } from '@/utils/sound';
import { useTranslation } from '@/context/LanguageContext';

interface RouletteModalProps<T extends RouletteBase> {
  perks: T[];
  allowEmptySlot: boolean;
  wildcard: T | null;
  soundEnabled: boolean;
  soundVolume?: number;
  onResult: (perk: T | null) => void;
}

const AUTO_CLOSE_DELAY_MS = 1400;

export function RouletteModal<T extends RouletteBase>({
  perks,
  allowEmptySlot,
  wildcard,
  soundEnabled,
  soundVolume,
  onResult,
}: RouletteModalProps<T>) {
  const { status, spinToken, spin, land } = useRoulette();
  const [winner] = useState<T | null>(() => pickWinner(perks, allowEmptySlot, wildcard));
  const autoCloseTimer = useRef<ReturnType<typeof setTimeout>>();
  const { strings } = useTranslation();
  const t = strings.roulette;

  useEffect(() => {
    spin();
    if (soundEnabled) playSpinSound(soundVolume);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (status !== 'landed') return;
    if (soundEnabled) playLandSound(soundVolume);
    autoCloseTimer.current = setTimeout(() => onResult(winner), AUTO_CLOSE_DELAY_MS);
    return () => clearTimeout(autoCloseTimer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  function handleSkip() {
    if (status !== 'landed') return;
    clearTimeout(autoCloseTimer.current);
    onResult(winner);
  }

  return (
    <Modal closable={false}>
      <div className="flex flex-col items-center gap-6" onClick={handleSkip}>
        <p className="font-display text-xs uppercase tracking-[0.35em] text-blood-500">
          {status === 'landed' ? t.landed : t.spinning}
        </p>

        <Roulette
          perks={perks}
          allowEmptySlot={allowEmptySlot}
          wildcard={wildcard}
          winner={winner}
          spinToken={spinToken}
          landed={status === 'landed'}
          onLand={land}
          onTick={soundEnabled ? () => playTickSound(soundVolume) : undefined}
        />

        <div className="h-16 text-center">
          {status === 'landed' && (
            <div className="flex flex-col items-center gap-1 animate-fade-in">
              <p className="font-display text-xl uppercase text-bone-100 animate-pulse-glow rounded-sm px-3 py-1">
                <span className="inline-block animate-pop-in">
                  {winner ? winner.name : t.emptyResult}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
