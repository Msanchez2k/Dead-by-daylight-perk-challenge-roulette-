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

// Killers cuyo audio viene en 2 variantes (se elige una al azar cada vez).
const TWO_VARIANT_KILLER_SOUNDS = new Set(['mastermind', 'oni']);

function killerSoundSrc(killerId: string): string {
  if (TWO_VARIANT_KILLER_SOUNDS.has(killerId)) {
    const variant = Math.random() < 0.5 ? 1 : 2;
    return `/killer-sounds/${killerId}-${variant}.mp3`;
  }
  return `/killer-sounds/${killerId}.mp3`;
}

/** Precarga y decodifica los efectos de sonido para que suenen sin retraso la primera vez. */
export function preloadSounds() {
  loadBuffer(SPIN_SRC);
  loadBuffer(LAND_SRC);
  loadBuffer(TICK_SRC);
}

// El volumen "de fábrica" de cada efecto (los valores de siempre) corresponde
// al 60% en el ajustador de la UI; de ahí se escala hacia arriba o abajo.
const DEFAULT_VOLUME_PERCENT = 60;

function scaleVolume(baseVolume: number, volumePercent: number): number {
  return baseVolume * (volumePercent / DEFAULT_VOLUME_PERCENT);
}

/** Tambor grave al iniciar el giro de la ruleta. */
export function playSpinSound(volumePercent = DEFAULT_VOLUME_PERCENT) {
  playFileSound(SPIN_SRC, scaleVolume(0.5, volumePercent));
}

/** Stinger al aterrizar el resultado. */
export function playLandSound(volumePercent = DEFAULT_VOLUME_PERCENT) {
  playFileSound(LAND_SRC, scaleVolume(0.5, volumePercent));
}

/** Clic cada vez que la tira de la ruleta pasa por un ítem. */
export function playTickSound(volumePercent = DEFAULT_VOLUME_PERCENT) {
  playFileSound(TICK_SRC, scaleVolume(0.4, volumePercent));
}

/**
 * Frase característica del killer que tocó en la ruleta. Si el killer todavía
 * no tiene audio subido a /public/killer-sounds, la carga falla en silencio
 * (ver loadBuffer) y simplemente no suena nada.
 */
export function playKillerSound(killerId: string, volumePercent = DEFAULT_VOLUME_PERCENT) {
  playFileSound(killerSoundSrc(killerId), scaleVolume(1.4, volumePercent));
}
