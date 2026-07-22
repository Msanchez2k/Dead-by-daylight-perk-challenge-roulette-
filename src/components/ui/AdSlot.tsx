import { useTranslation } from '@/context/LanguageContext';

interface AdSlotProps {
  className?: string;
}

/**
 * Espacio reservado para un futuro anuncio (aún sin integrar ninguna red
 * publicitaria). Se deja visible y marcado a propósito para reservar el
 * layout; cuando se integre un proveedor real, este componente es el único
 * lugar que hay que tocar.
 */
export function AdSlot({ className = '' }: AdSlotProps) {
  const { strings } = useTranslation();

  return (
    <div
      className={`pointer-events-auto flex items-center justify-center border border-dashed border-steel-700/70 bg-fog-950/30 text-[9px] uppercase tracking-[0.2em] text-steel-600 ${className}`}
    >
      {strings.footer.adSlot}
    </div>
  );
}
