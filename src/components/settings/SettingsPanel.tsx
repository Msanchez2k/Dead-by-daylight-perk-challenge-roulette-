import { Modal } from '@/components/ui/Modal';
import { Toggle } from '@/components/ui/Toggle';
import { Slider } from '@/components/ui/Slider';
import { LanguageSwitch } from '@/components/ui/LanguageSwitch';
import { MenuPanel, MenuRow } from '@/components/ui/MenuPanel';
import { useTranslation } from '@/context/LanguageContext';
import type { Settings } from '@/types/settings';

interface SettingsPanelProps {
  settings: Settings;
  onToggle: (key: keyof Settings) => void;
  onSetVolume: (key: 'soundVolume' | 'musicVolume', value: number) => void;
  onClose: () => void;
}

export function SettingsPanel({ settings, onToggle, onSetVolume, onClose }: SettingsPanelProps) {
  const { strings } = useTranslation();
  const t = strings.settings;

  return (
    <Modal onClose={onClose}>
      <div className="flex w-80 flex-col gap-5">
        <h2 className="font-display text-2xl uppercase tracking-wide text-bone-100">{t.title}</h2>

        <MenuPanel>
          <MenuRow label={t.language}>
            <LanguageSwitch />
          </MenuRow>
          <MenuRow label={t.sound}>
            <Toggle
              label={t.sound}
              checked={settings.soundEnabled}
              onChange={() => onToggle('soundEnabled')}
            />
          </MenuRow>
          <MenuRow label={t.soundVolume}>
            <Slider
              label={t.soundVolume}
              value={settings.soundVolume}
              disabled={!settings.soundEnabled}
              onChange={(value) => onSetVolume('soundVolume', value)}
            />
          </MenuRow>
          <MenuRow label={t.music}>
            <Toggle
              label={t.music}
              checked={settings.musicEnabled}
              onChange={() => onToggle('musicEnabled')}
            />
          </MenuRow>
          <MenuRow label={t.musicVolume}>
            <Slider
              label={t.musicVolume}
              value={settings.musicVolume}
              disabled={!settings.musicEnabled}
              onChange={(value) => onSetVolume('musicVolume', value)}
            />
          </MenuRow>
          <MenuRow label={t.animations}>
            <Toggle
              label={t.animations}
              checked={settings.animationsEnabled}
              onChange={() => onToggle('animationsEnabled')}
            />
          </MenuRow>
        </MenuPanel>

        <button
          type="button"
          onClick={onClose}
          className="self-end font-display text-xs uppercase tracking-[0.2em] text-blood-500 transition-colors hover:text-blood-400"
        >
          {t.close}
        </button>
      </div>
    </Modal>
  );
}
