interface SliderProps {
  label: string;
  value: number;
  disabled?: boolean;
  onChange: (value: number) => void;
}

/** Control de volumen 0-100, con el valor actual mostrado al lado. */
export function Slider({ label, value, disabled = false, onChange }: SliderProps) {
  return (
    <div className="flex items-center gap-3">
      <input
        type="range"
        min={0}
        max={100}
        step={5}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        style={{ accentColor: '#c41e1e' }}
        className="h-1.5 w-28 cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
      />
      <span className="w-9 text-right text-xs tabular-nums text-steel-400">{value}%</span>
    </div>
  );
}
