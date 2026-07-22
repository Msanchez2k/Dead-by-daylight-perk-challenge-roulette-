import type { ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
  onClose?: () => void;
  closable?: boolean;
}

export function Modal({ children, onClose, closable = true }: ModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-fog-950/90 animate-fade-in"
      onClick={closable ? onClose : undefined}
    >
      <div
        className="relative border border-steel-700 bg-fog-900/95 p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
