import { useState } from 'react';

type RouletteStatus = 'idle' | 'spinning' | 'landed';

export function useRoulette() {
  const [status, setStatus] = useState<RouletteStatus>('idle');
  const [spinToken, setSpinToken] = useState(0);

  /** Inicia un nuevo giro (incrementa el token para forzar recomputar la tira). */
  function spin() {
    setStatus('spinning');
    setSpinToken((t) => t + 1);
  }

  /** Se llama cuando la animación de la tira termina de desacelerar. */
  function land() {
    setStatus('landed');
  }

  function reset() {
    setStatus('idle');
  }

  return { status, spinToken, spin, land, reset };
}
