import type { BuildSlot } from '@/types/build';
import { BuildSlotCard } from './BuildSlotCard';

interface BuildGridProps {
  slots: BuildSlot[];
  onSlotClick: (id: number) => void;
}

// Posición de cada casilla (25%/50% del contenedor) para que las 4 se toquen
// exactamente en el centro, formando un único rombo grande — igual a la referencia.
const POSITION_CLASS = [
  'left-1/4 top-0', // Norte
  'left-1/2 top-1/4', // Este
  'left-1/4 top-1/2', // Sur
  'left-0 top-1/4', // Oeste
];

export function BuildGrid({ slots, onSlotClick }: BuildGridProps) {
  return (
    <div className="relative mx-auto aspect-square w-72 sm:w-96">
      {slots.map((slot, index) => (
        <div key={slot.id} className={`absolute h-1/2 w-1/2 ${POSITION_CLASS[index]}`}>
          <BuildSlotCard slot={slot} onClick={onSlotClick} />
        </div>
      ))}
    </div>
  );
}
