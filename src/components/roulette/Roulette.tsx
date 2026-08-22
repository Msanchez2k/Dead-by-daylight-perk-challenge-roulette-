import { useEffect, useMemo, useRef, useState } from 'react';
import type { RouletteBase } from '@/types/roulette';
import { buildReel } from '@/utils/roulette';
import { cubicBezier } from '@/utils/easing';

// La tira se dibuja como el borde superior de una rueda enorme cuyo centro
// queda fuera de pantalla (a `RADIUS` px por debajo). Solo vemos un fragmento
// curvo — la ilusión de una ruleta circular, sin importar cuántos ítems tenga.
const RADIUS = 840; // px, distancia del centro de la rueda a cada ítem
const ITEM_ANGLE_STEP = 9; // grados entre ítems consecutivos
const EXTRA_TURNS = 3; // vueltas completas adicionales para que el giro se sienta largo
const VIEWPORT_WIDTH = 840;
const VIEWPORT_HEIGHT = 320;
const TOP_OFFSET = 88; // margen desde el borde superior hasta el ítem en ángulo 0
const ITEM_SIZE = 120;
const SPIN_DURATION_MS = 4200;
const EASE_POINTS = [0.08, 0.82, 0.17, 1] as const;
const TRANSITION = `transform ${SPIN_DURATION_MS}ms cubic-bezier(${EASE_POINTS.join(', ')})`;
// Misma curva que la transición CSS de arriba, pero evaluable en JS: permite
// calcular cuadro a cuadro qué ítem está pasando bajo la aguja para el tick.
const spinEasing = cubicBezier(...EASE_POINTS);

interface RouletteProps<T extends RouletteBase> {
  perks: T[];
  allowEmptySlot: boolean;
  wildcard: T | null;
  winner: T | null;
  spinToken: number;
  landed: boolean;
  onLand: () => void;
  onTick?: () => void;
}

export function Roulette<T extends RouletteBase>({
  perks,
  allowEmptySlot,
  wildcard,
  winner,
  spinToken,
  landed,
  onLand,
  onTick,
}: RouletteProps<T>) {
  const [spinAngle, setSpinAngle] = useState(0);
  const [animate, setAnimate] = useState(false);
  const rafRef = useRef<number>();

  const { reel, winnerIndex } = useMemo(
    () => buildReel(perks, allowEmptySlot, wildcard, winner),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [spinToken],
  );

  // El ítem winnerIndex ya está centrado exactamente en su propio ángulo
  // (index * ITEM_ANGLE_STEP), así que no hace falta ningún offset extra:
  // solo hay que traer ese ángulo a 0 (donde está la aguja).
  const targetAngle = -winnerIndex * ITEM_ANGLE_STEP - 360 * EXTRA_TURNS;

  useEffect(() => {
    setAnimate(false);
    setSpinAngle(0);

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = requestAnimationFrame(() => {
        setAnimate(true);
        setSpinAngle(targetAngle);
      });
    });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spinToken]);

  // Recorre en JS la misma curva de easing que la transición CSS para saber,
  // cuadro a cuadro, cuántos ítems ya pasaron bajo la aguja y disparar un
  // tick por cada uno — sin esto habría que leer el DOM para saberlo.
  useEffect(() => {
    if (!animate || !onTick) return;

    const startTime = performance.now();
    let lastIndex = 0;
    let tickRafId: number;

    function frame(now: number) {
      const progress = Math.min((now - startTime) / SPIN_DURATION_MS, 1);
      const currentAngle = spinEasing(progress) * targetAngle;
      const passedIndex = Math.floor(-currentAngle / ITEM_ANGLE_STEP);

      if (passedIndex > lastIndex) {
        lastIndex = passedIndex;
        onTick?.();
      }

      if (progress < 1) tickRafId = requestAnimationFrame(frame);
    }

    tickRafId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(tickRafId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animate]);

  return (
    <div
      className="relative overflow-hidden"
      style={{ width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT }}
    >
      {/* Marcador: aguja fija que señala el resultado, arriba al centro */}
      <div className="pointer-events-none absolute left-1/2 top-0 z-20 -translate-x-1/2">
        <div className="h-0 w-0 border-x-[12px] border-t-[18px] border-x-transparent border-t-blood-500" />
      </div>

      {/* Máscara de desvanecimiento en los bordes izquierdo/derecho */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            'linear-gradient(90deg, rgba(10,9,8,1) 0%, rgba(10,9,8,0) 20%, rgba(10,9,8,0) 80%, rgba(10,9,8,1) 100%)',
        }}
      />

      {/* Pivote de la rueda: el único elemento que gira. Vive fuera de pantalla,
          RADIUS px por debajo, para que el ítem en ángulo 0 asome arriba. */}
      <div
        className="absolute left-1/2"
        style={{
          top: RADIUS + TOP_OFFSET,
          transform: `translateX(-50%) rotate(${spinAngle}deg)`,
          transition: animate ? TRANSITION : 'none',
        }}
        onTransitionEnd={() => {
          if (animate) onLand();
        }}
      >
        {reel.map((item, index) => {
          const itemAngle = index * ITEM_ANGLE_STEP;
          return (
            <div
              key={item.key}
              className={`absolute left-0 top-0 ${landed && index === winnerIndex ? 'z-30' : ''}`}
              style={{
                transformOrigin: '0 0',
                transform: `rotate(${itemAngle}deg) translateY(-${RADIUS}px)`,
              }}
            >
              {/* Contra-rotación: mantiene el ícono siempre "de pie" mientras la rueda gira.
                  El centrado usa posición (left/top), no transform, para que la rotación
                  de este elemento ocurra exactamente sobre su propio centro. */}
              <div
                className="absolute flex items-center justify-center"
                style={{
                  width: ITEM_SIZE,
                  height: ITEM_SIZE,
                  left: -ITEM_SIZE / 2,
                  top: -ITEM_SIZE / 2,
                  transform: `rotate(${-(spinAngle + itemAngle)}deg)`,
                  transition: animate ? TRANSITION : 'none',
                }}
              >
                <div
                  className={`flex h-full w-full items-center justify-center rounded-sm border transition-opacity duration-500 ${
                    item.perk
                      ? 'border-fog-600/60 bg-fog-900/60'
                      : 'border-fog-700/40 bg-fog-950/40'
                  } ${landed && index === winnerIndex ? 'animate-drop-in' : ''} ${
                    landed && index !== winnerIndex ? 'opacity-10' : ''
                  }`}
                >
                  {item.perk ? (
                    <img
                      src={item.perk.image}
                      alt={item.perk.name}
                      className="h-full w-full rounded-sm object-cover"
                    />
                  ) : (
                    <span className="text-xs uppercase tracking-widest text-bone-500/40">
                      Vacío
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
