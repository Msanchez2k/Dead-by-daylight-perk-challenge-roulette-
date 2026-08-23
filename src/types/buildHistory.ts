import type { BuildSlot } from './build';
import type { Role } from './perk';

/** Una build guardada en el historial local del usuario. */
export interface BuildHistoryEntry {
  id: string;
  role: Role;
  slots: BuildSlot[];
  createdAt: number;
}
