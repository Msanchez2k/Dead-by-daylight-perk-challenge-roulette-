import { KillerIcon } from './icons';

/**
 * Silueta gigante y desenfocada del gancho, apoyada en el borde derecho.
 * Puramente decorativa, referencia visual al fondo del menú oficial de DBD.
 */
export function BackgroundSilhouette() {
  return (
    <div
      className="pointer-events-none absolute -right-24 top-0 h-full w-[38rem] text-blood-700/20 blur-sm"
      aria-hidden="true"
    >
      <KillerIcon className="h-full w-full rotate-12" />
    </div>
  );
}
