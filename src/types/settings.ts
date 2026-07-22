export interface Settings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  animationsEnabled: boolean;
  emptySlotEnabled: boolean;
  wildcardEnabled: boolean;
}

export const DEFAULT_SETTINGS: Settings = {
  soundEnabled: true,
  musicEnabled: true,
  animationsEnabled: true,
  emptySlotEnabled: true,
  wildcardEnabled: true,
};
