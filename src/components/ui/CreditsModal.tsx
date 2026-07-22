import { Modal } from '@/components/ui/Modal';
import { useTranslation } from '@/context/LanguageContext';

interface CreditsModalProps {
  onClose: () => void;
}

export function CreditsModal({ onClose }: CreditsModalProps) {
  const { strings } = useTranslation();
  const t = strings.credits;

  return (
    <Modal onClose={onClose}>
      <div className="flex w-80 flex-col gap-4 sm:w-96">
        <h2 className="font-display text-xl uppercase tracking-wide text-bone-100">{t.title}</h2>

        <div className="flex flex-col gap-1">
          <h3 className="font-display text-xs uppercase tracking-[0.15em] text-blood-500">
            {t.imagesTitle}
          </h3>
          <p className="text-sm leading-relaxed text-bone-300">{t.imagesText}</p>
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="font-display text-xs uppercase tracking-[0.15em] text-blood-500">
            {t.privacyTitle}
          </h3>
          <p className="text-sm leading-relaxed text-bone-300">{t.privacyText}</p>
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
