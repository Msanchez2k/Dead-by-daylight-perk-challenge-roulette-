import { useEffect, useState } from 'react';
import type { Role } from '@/types/perk';
import type { KillerMode } from '@/types/killer';
import { RoleSelect } from '@/pages/RoleSelect';
import { KillerModeSelect } from '@/pages/KillerModeSelect';
import { KillerRouletteScreen } from '@/pages/KillerRouletteScreen';
import { MainScreen } from '@/pages/MainScreen';
import { useSettings } from '@/hooks/useSettings';
import { useBackgroundMusic } from '@/hooks/useBackgroundMusic';
import { preloadSounds } from '@/utils/sound';

function App() {
  const [role, setRole] = useState<Role | null>(null);
  const [killerMode, setKillerMode] = useState<KillerMode | null>(null);
  const { settings, toggle } = useSettings();

  useBackgroundMusic(settings.musicEnabled);

  useEffect(() => {
    preloadSounds();
  }, []);

  function handleSelectRole(selected: Role) {
    setRole(selected);
    setKillerMode(selected === 'survivor' ? 'perks' : null);
  }

  function handleBackToRoleSelect() {
    setRole(null);
    setKillerMode(null);
  }

  if (!role) {
    return <RoleSelect onSelectRole={handleSelectRole} />;
  }

  if (role === 'killer' && killerMode === null) {
    return <KillerModeSelect onSelectMode={setKillerMode} onBack={handleBackToRoleSelect} />;
  }

  // Ambas pantallas quedan montadas (solo se oculta la inactiva) para que al
  // saltar de un lado a otro con las flechas no se pierda ni el killer tirado
  // ni el progreso de la build de perks.
  if (role === 'killer') {
    return (
      <>
        <div className={killerMode === 'character' ? undefined : 'hidden'}>
          <KillerRouletteScreen
            settings={settings}
            onToggleSetting={toggle}
            onBack={() => setKillerMode(null)}
            onGoToPerks={() => setKillerMode('perks')}
          />
        </div>
        <div className={killerMode === 'perks' ? undefined : 'hidden'}>
          <MainScreen
            role={role}
            settings={settings}
            onToggleSetting={toggle}
            onBack={() => setKillerMode(null)}
            onGoToKiller={() => setKillerMode('character')}
          />
        </div>
      </>
    );
  }

  return (
    <MainScreen role={role} settings={settings} onToggleSetting={toggle} onBack={handleBackToRoleSelect} />
  );
}

export default App;
