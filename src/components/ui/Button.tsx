import type { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'border border-blood-600/70 bg-blood-600/10 text-bone-100 hover:bg-blood-600/20 hover:border-blood-500',
  ghost: 'border border-steel-600 bg-fog-950/40 text-steel-400 hover:border-bone-300/50 hover:text-bone-100',
};

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={`px-6 py-2.5 font-display text-xs uppercase tracking-[0.2em] transition-all duration-300
                  active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-steel-600
                  ${VARIANT_CLASSES[variant]} ${className}`}
      {...props}
    />
  );
}
