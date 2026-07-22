import { useState } from 'react';
import { useTranslation } from '@/context/LanguageContext';
import { AdSlot } from '@/components/ui/AdSlot';
import { CreditsModal } from '@/components/ui/CreditsModal';

// Apaga el espacio publicitario hasta que haya anuncios reales que mostrar;
// el componente AdSlot queda listo, solo hay que poner esto en true.
const ADS_ENABLED = false;

export function Footer() {
  const { strings } = useTranslation();
  const [creditsOpen, setCreditsOpen] = useState(false);

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-10 flex flex-col items-center gap-1.5 px-6 pb-2">
        {ADS_ENABLED && <AdSlot className="h-10 w-full max-w-sm" />}

        <p className="pointer-events-none text-center text-[10px] leading-relaxed text-steel-600">
          {strings.footer.disclaimer}{' '}
          <button
            type="button"
            onClick={() => setCreditsOpen(true)}
            className="pointer-events-auto underline decoration-dotted underline-offset-2 hover:text-steel-400"
          >
            {strings.footer.creditsLink}
          </button>
        </p>
      </div>

      {creditsOpen && <CreditsModal onClose={() => setCreditsOpen(false)} />}
    </>
  );
}
