import type { ReactNode } from 'react';

const TORN_EDGE_CLIP =
  'polygon(0% 1.5%, 1% 0%, 99% 0.8%, 100% 2.2%, 100% 97.5%, 99.2% 100%, 0.8% 99.3%, 0% 98%)';

interface MenuPanelProps {
  children: ReactNode;
  className?: string;
}

/** Contenedor de filas de menú, con borde irregular y divisores finos entre filas. */
export function MenuPanel({ children, className = '' }: MenuPanelProps) {
  return (
    <div
      className={`divide-y divide-fog-950/60 bg-steel-800/80 ${className}`}
      style={{ clipPath: TORN_EDGE_CLIP }}
    >
      {children}
    </div>
  );
}

interface MenuRowProps {
  label: string;
  children: ReactNode;
}

/** Una fila del menú: etiqueta apagada a la izquierda, control a la derecha. */
export function MenuRow({ label, children }: MenuRowProps) {
  return (
    <div className="flex items-center justify-between gap-8 px-5 py-3.5">
      <span className="font-display text-sm uppercase tracking-wide text-steel-400">{label}</span>
      <div className="flex items-center">{children}</div>
    </div>
  );
}
