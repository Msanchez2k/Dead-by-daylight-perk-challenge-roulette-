export interface Settings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  animationsEnabled: boolean;
  emptySlotEnabled: boolean;
  wildcardEnabled: boolean;
  /** 0-100. El volumen "de fábrica" de cada efecto corresponde al 60%. */
  soundVolume: number;
  /** 0-100. El volumen "de fábrica" de la música corresponde al 60%. */
  musicVolume: number;
}

export const DEFAULT_SETTINGS: Settings = {
  soundEnabled: true,
  musicEnabled: true,
  animationsEnabled: true,
  emptySlotEnabled: true,
  wildcardEnabled: true,
  soundVolume: 60,
  musicVolume: 60,
};
