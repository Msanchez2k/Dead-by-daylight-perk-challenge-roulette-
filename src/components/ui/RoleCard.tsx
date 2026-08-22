import type { ReactNode } from 'react';

type CardAccent = 'bone' | 'blood';

interface RoleCardProps<T extends string> {
  id: T;
  accent: CardAccent;
  title: string;
  tagline: string;
  chooseLabel: string;
  icon: ReactNode;
  onSelect: (id: T) => void;
}

const ACCENT_CLASS: Record<CardAccent, string> = {
  bone: 'group-hover:border-bone-300/50',
  blood: 'group-hover:border-blood-500/70',
};

const TORN_EDGE_CLIP =
  'polygon(0% 1.5%, 1% 0%, 99% 0.8%, 100% 2.2%, 100% 97.5%, 99.2% 100%, 0.8% 99.3%, 0% 98%)';

export function RoleCard<T extends string>({
  id,
  accent,
  title,
  tagline,
  chooseLabel,
  icon,
  onSelect,
}: RoleCardProps<T>) {
  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      className={`group relative w-64 sm:w-72 border border-steel-700 bg-steel-800/80 px-8 py-10
                 text-left transition-all duration-300 ease-out
                 hover:-translate-y-1 hover:bg-steel-800 active:translate-y-0 active:scale-[0.98]
                 focus-visible:-translate-y-1 ${ACCENT_CLASS[accent]}`}
      style={{ clipPath: TORN_EDGE_CLIP }}
    >
      <div className="relative flex flex-col items-start gap-6">
        <div className="opacity-70 transition-opacity duration-300 group-hover:opacity-100">
          <div className="h-16 w-16">{icon}</div>
        </div>

        <div>
          <h2 className="font-display text-2xl uppercase tracking-wide text-bone-100">{title}</h2>
          <p className="mt-2 text-sm text-steel-400">{tagline}</p>
        </div>

        <span
          className="mt-2 font-display text-xs uppercase tracking-[0.2em] text-blood-500 opacity-0
                     transition-opacity duration-300 group-hover:opacity-100"
        >
          {chooseLabel}
        </span>
      </div>
    </button>
  );
}
