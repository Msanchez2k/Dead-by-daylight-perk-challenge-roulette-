import type { BuildSlot } from '@/types/build';
import diamondTexture from '@/assets/textures/diamond-slot.png';
import diamondTextureWildcard from '@/assets/textures/diamond-slot-wildcard.png';
import noPerkIcon from '@/assets/textures/no-perk.png';
import { isWildcard } from '@/data/wildcard';
import { useTranslation } from '@/context/LanguageContext';

interface BuildSlotCardProps {
  slot: BuildSlot;
  onClick: (id: number) => void;
}

export function BuildSlotCard({ slot, onClick }: BuildSlotCardProps) {
  const { strings } = useTranslation();
  const isUnfilled = slot.status === 'unfilled';
  const isEmpty = slot.status === 'empty';
  const isFilled = slot.status === 'filled';
  const isSlotWildcard = isFilled && isWildcard(slot.perk);
  const isSpecialRed = isSlotWildcard || isEmpty;

  return (
    <button
      type="button"
      onClick={() => onClick(slot.id)}
      className="group relative z-0 flex aspect-square w-full cursor-pointer items-center justify-center
                 bg-transparent transition-transform duration-300 ease-out
                 hover:z-10 active:scale-[0.96]"
    >
      {/* El clipPath vive en este wrapper, no en el <button>: así el área táctil real
          sigue siendo el cuadrado completo (más fácil de tocar en celular) y solo lo
          visual queda recortado a la forma del rombo. */}
      <div
        className="absolute inset-0 h-full w-full"
        style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
      >
        {/* Textura del rombo: el filtro drop-shadow sigue el contorno real (alpha), no la caja cuadrada */}
        <img
          src={isSpecialRed ? diamondTextureWildcard : diamondTexture}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full select-none transition-all duration-300 ease-out
            ${isUnfilled ? 'opacity-90 group-hover:opacity-100 group-hover:scale-105 group-hover:drop-shadow-[0_0_18px_rgba(196,30,30,0.55)]' : ''}
            ${isEmpty || isFilled ? 'opacity-100 drop-shadow-[0_0_14px_rgba(196,30,30,0.35)]' : ''}
          `}
        />

        {/* Ícono de la perk (o de "sin perk"): se sobreescala para compensar el margen
            transparente de los PNG de origen; el clipPath del wrapper recorta el sobrante
            a la forma exacta del rombo, así el blanco cubre toda la zona roja/naranja. */}
        {isFilled && slot.perk && (
          <img
            src={slot.perk.image}
            alt={slot.perk.name}
            className="absolute inset-0 h-full w-full scale-100 object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]"
          />
        )}

        {isEmpty && (
          <img
            src={noPerkIcon}
            alt={strings.slot.empty}
            className="absolute inset-0 h-full w-full scale-75 object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]"
          />
        )}
      </div>

      <div className="relative z-10 flex flex-col items-center gap-1 px-6 text-center">
        {isUnfilled && (
          <span className="font-display text-3xl text-bone-100 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] transition-colors duration-300 group-hover:text-bone-100">
            ?
          </span>
        )}
      </div>
    </button>
  );
}
