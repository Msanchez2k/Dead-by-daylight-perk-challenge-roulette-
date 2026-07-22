import { useEffect, useRef } from 'react';

const MUSIC_SRC = '/audio/theme.mp3';
const VOLUME = 0.35;

/**
 * Reproduce música de fondo en loop mientras `enabled` sea true.
 * Los navegadores bloquean el autoplay con sonido hasta que el usuario
 * interactúa con la página, así que el <audio> se crea de forma perezosa
 * y el play real ocurre en el primer intento tras una interacción
 * (cualquier click en la app ya cuenta como interacción válida).
 */
export function useBackgroundMusic(enabled: boolean) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio(MUSIC_SRC);
      audio.loop = true;
      audio.volume = VOLUME;
      audioRef.current = audio;
    }

    const audio = audioRef.current;

    if (!enabled) {
      audio.pause();
      return;
    }

    let cancelled = false;

    audio.play().catch(() => {
      // Bloqueado por autoplay: reintenta en la primera interacción real del usuario.
      const retry = () => {
        if (cancelled) return;
        audio.play().catch(() => {});
      };
      document.addEventListener('click', retry, { once: true });
      return () => document.removeEventListener('click', retry);
    });

    return () => {
      cancelled = true;
    };
  }, [enabled]);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  // Pausa la música cuando la pestaña/pantalla queda en segundo plano
  // (celular bloqueado, cambio de app, etc.) y la retoma al volver, si
  // el ajuste de música sigue activado.
  useEffect(() => {
    function handleVisibilityChange() {
      const audio = audioRef.current;
      if (!audio) return;

      if (document.hidden) {
        audio.pause();
      } else if (enabled) {
        audio.play().catch(() => {});
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [enabled]);
}
