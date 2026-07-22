import { useEffect, useState } from 'react';
import type { Role } from '@/types/perk';
import { RoleSelect } from '@/pages/RoleSelect';
import { MainScreen } from '@/pages/MainScreen';
import { useSettings } from '@/hooks/useSettings';
import { useBackgroundMusic } from '@/hooks/useBackgroundMusic';
import { preloadSounds } from '@/utils/sound';

function App() {
  const [role, setRole] = useState<Role | null>(null);
  const { settings, toggle } = useSettings();

  useBackgroundMusic(settings.musicEnabled);

  useEffect(() => {
    preloadSounds();
  }, []);

  if (!role) {
    return <RoleSelect onSelectRole={setRole} />;
  }

  return (
    <MainScreen
      role={role}
      settings={settings}
      onToggleSetting={toggle}
      onBack={() => setRole(null)}
    />
  );
}

export default App;
