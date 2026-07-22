const audioCache = new Map<string, HTMLAudioElement>();

/**
 * Reproduce un archivo de audio real. Cada llamada reproduce un clon del
 * <audio> base para que dos llamadas seguidas (ej. abrir otro giro antes de
 * que termine el sonido anterior) no se corten entre sí.
 */
function playFileSound(src: string, volume: number) {
  if (typeof window === 'undefined') return;
  let base = audioCache.get(src);
  if (!base) {
    base = new Audio(src);
    base.preload = 'auto';
    audioCache.set(src, base);
  }
  const clone = base.cloneNode(true) as HTMLAudioElement;
  clone.volume = volume;
  clone.play().catch(() => {});
}

const SPIN_SRC = '/audio/spin.wav';
const LAND_SRC = '/audio/land.wav';
const TICK_SRC = '/audio/tick.wav';

/** Tambor grave al iniciar el giro de la ruleta. */
export function playSpinSound() {
  playFileSound(SPIN_SRC, 0.5);
}

/** Stinger al aterrizar el resultado. */
export function playLandSound() {
  playFileSound(LAND_SRC, 0.5);
}

/** Clic cada vez que la tira de la ruleta pasa por un ítem. */
export function playTickSound() {
  playFileSound(TICK_SRC, 0.4);
}
