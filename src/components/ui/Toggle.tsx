interface ToggleProps {
  label: string;
  checked: boolean;
  /** Estado "algunos sí, algunos no" para checkboxes que agrupan varios ítems. */
  indeterminate?: boolean;
  onChange: () => void;
  role?: 'switch' | 'checkbox';
}

export function Toggle({ label, checked, indeterminate = false, onChange, role = 'switch' }: ToggleProps) {
  return (
    <button
      type="button"
      role={role}
      aria-checked={indeterminate ? 'mixed' : checked}
      aria-label={label}
      onClick={onChange}
      className="flex h-6 w-6 shrink-0 items-center justify-center border border-steel-600 bg-fog-950/60 transition-colors duration-200 hover:border-blood-500"
    >
      {indeterminate ? (
        <span className="block h-0.5 w-3 bg-blood-500" aria-hidden="true" />
      ) : (
        checked && (
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-blood-500" aria-hidden="true">
            <path
              d="M2 8.5L6 12L14 3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="square"
            />
          </svg>
        )
      )}
    </button>
  );
}
