let ctx: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const AudioCtx = window.AudioContext ?? (window as any).webkitAudioContext;
    if (!AudioCtx) return null;
    ctx = new AudioCtx();
  }
  return ctx;
}

const bufferCache = new Map<string, Promise<AudioBuffer | null>>();

/**
 * Descarga y decodifica un audio una sola vez (el resultado se cachea).
 * Usar `preloadSounds()` al arrancar la app deja esto listo antes de que
 * haga falta reproducir nada, para que el primer giro no tenga que esperar
 * la descarga.
 */
function loadBuffer(src: string): Promise<AudioBuffer | null> {
  const audioCtx = getContext();
  if (!audioCtx) return Promise.resolve(null);

  let cached = bufferCache.get(src);
  if (!cached) {
    cached = fetch(src)
      .then((res) => res.arrayBuffer())
      .then((data) => audioCtx.decodeAudioData(data))
      .catch(() => null);
    bufferCache.set(src, cached);
  }
  return cached;
}

/**
 * Reproduce un audio ya decodificado con Web Audio API: mucho menor latencia
 * que crear un <audio> nuevo en cada llamada (clave en móvil), y permite que
 * varios sonidos se superpongan sin cortarse entre sí.
 */
async function playFileSound(src: string, volume: number) {
  const audioCtx = getContext();
  if (!audioCtx) return;
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }

  const buffer = await loadBuffer(src);
  if (!buffer) return;

  const source = audioCtx.createBufferSource();
  const gain = audioCtx.createGain();
  gain.gain.value = volume;
  source.buffer = buffer;
  source.connect(gain).connect(audioCtx.destination);
  source.start();
}

const SPIN_SRC = '/audio/spin.wav';
const LAND_SRC = '/audio/land.wav';
const TICK_SRC = '/audio/tick.wav';

/** Precarga y decodifica los efectos de sonido para que suenen sin retraso la primera vez. */
export function preloadSounds() {
  loadBuffer(SPIN_SRC);
  loadBuffer(LAND_SRC);
  loadBuffer(TICK_SRC);
}

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
