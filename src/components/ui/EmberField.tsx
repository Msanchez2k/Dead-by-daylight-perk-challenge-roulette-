import { useMemo } from 'react';

interface Ember {
  left: string;
  delay: string;
  duration: string;
  size: string;
}

function generateEmbers(count: number): Ember[] {
  return Array.from({ length: count }, () => ({
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 6}s`,
    duration: `${5 + Math.random() * 4}s`,
    size: `${2 + Math.random() * 2}px`,
  }));
}

/**
 * Brasas ascendentes decorativas, referencia a la fogata que une a
 * supervivientes y killer en Dead by Daylight. Puramente ambiental,
 * no interactivo, respeta prefers-reduced-motion vía CSS global.
 */
export function EmberField({ count = 34 }: { count?: number }) {
  const embers = useMemo(() => generateEmbers(count), [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {embers.map((ember, index) => (
        <span
          key={index}
          className="absolute bottom-0 rounded-full bg-blood-500/70 animate-ember"
          style={{
            left: ember.left,
            width: ember.size,
            height: ember.size,
            animationDelay: ember.delay,
            animationDuration: ember.duration,
          }}
        />
      ))}
    </div>
  );
}
