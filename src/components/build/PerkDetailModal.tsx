import type { Perk } from '@/types/perk';
import { Modal } from '@/components/ui/Modal';
import { useTranslation } from '@/context/LanguageContext';

interface PerkDetailModalProps {
  perk: Perk;
  onClose: () => void;
}

export function PerkDetailModal({ perk, onClose }: PerkDetailModalProps) {
  const { strings } = useTranslation();

  return (
    <Modal onClose={onClose}>
      <div className="flex w-80 flex-col items-center gap-4 text-center">
        <div
          className="flex h-28 w-28 items-center justify-center bg-blood-900/20"
          style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
        >
          <img
            src={perk.image}
            alt={perk.name}
            className="h-full w-full scale-100 object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]"
          />
        </div>

        <div>
          <h2 className="font-display text-xl uppercase tracking-wide text-bone-100">{perk.name}</h2>
          {perk.character && (
            <p className="mt-1 font-display text-xs uppercase tracking-[0.2em] text-blood-500">
              {perk.character}
            </p>
          )}
        </div>

        <p className="text-sm leading-relaxed text-bone-300">{perk.description}</p>

        <button
          type="button"
          onClick={onClose}
          className="font-display text-xs uppercase tracking-[0.2em] text-blood-500 transition-colors hover:text-blood-400"
        >
          {strings.settings.close}
        </button>
      </div>
    </Modal>
  );
}
