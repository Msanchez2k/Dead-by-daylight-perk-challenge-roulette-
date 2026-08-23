import type { Language } from '@/types/i18n';

export interface UIStrings {
  roleSelect: {
    eyebrow: string;
    title: string;
    survivorTitle: string;
    survivorTagline: string;
    killerTitle: string;
    killerTagline: string;
    choose: string;
  };
  mainScreen: {
    yourBuild: string;
    newBuild: string;
    copyBuild: string;
    copied: string;
    reroll: string;
    rerollCancel: string;
    rerollHint: string;
    backLabel: string;
    backAria: string;
    settingsAria: string;
    historyAria: string;
    confirmNewBuild: string;
    confirmBack: string;
  };
  slot: {
    empty: string;
  };
  roulette: {
    spinning: string;
    landed: string;
    emptyResult: string;
  };
  settings: {
    title: string;
    sound: string;
    music: string;
    animations: string;
    emptySlot: string;
    wildcard: string;
    language: string;
    close: string;
  };
  wildcard: {
    name: string;
    description: string;
  };
  perkManagement: {
    title: string;
    searchPlaceholder: string;
    selectAll: string;
    selectNone: string;
    minWarning: string;
    enabledCount: string;
    specialGroupTitle: string;
  };
  buildHistory: {
    title: string;
    empty: string;
    survivorLabel: string;
    killerLabel: string;
    restore: string;
    copy: string;
    copied: string;
    delete: string;
    clearAll: string;
    confirmClear: string;
    confirmRestore: string;
  };
  killerModeSelect: {
    eyebrow: string;
    title: string;
    characterTitle: string;
    characterTagline: string;
    perksTitle: string;
    perksTagline: string;
    choose: string;
    backLabel: string;
    backAria: string;
  };
  killerRoulette: {
    title: string;
    spin: string;
    spinAgain: string;
    prompt: string;
    managementAria: string;
    backLabel: string;
    backAria: string;
    goToPerksAria: string;
    goToKillerAria: string;
  };
  killerManagement: {
    title: string;
    searchPlaceholder: string;
    selectAll: string;
    selectNone: string;
    minWarning: string;
    enabledCount: string;
  };
  footer: {
    disclaimer: string;
    adSlot: string;
    creditsLink: string;
  };
  credits: {
    title: string;
    createdByTitle: string;
    createdByText: string;
    imagesTitle: string;
    imagesText: string;
    privacyTitle: string;
    privacyText: string;
  };
}

export const translations: Record<Language, UIStrings> = {
  es: {
    roleSelect: {
      eyebrow: 'Elige tu destino en la niebla',
      title: 'DBD Challenge Roulette',
      survivorTitle: 'Survivor',
      survivorTagline: 'Repara. Cura. Escapa.',
      killerTitle: 'Killer',
      killerTagline: 'Rastrea. Golpea. Sacrifica.',
      choose: 'Elegir →',
    },
    mainScreen: {
      yourBuild: 'Tu build',
      newBuild: 'Nueva Build',
      copyBuild: 'Copiar Build',
      copied: '¡Copiado!',
      reroll: 'Volver a Tirar',
      rerollCancel: 'Cancelar',
      rerollHint: 'Toca la perk que quieras volver a tirar',
      backLabel: 'Rol',
      backAria: 'Volver a elegir rol',
      settingsAria: 'Configuración',
      historyAria: 'Historial de builds',
      confirmNewBuild: '¿Reiniciar las 4 casillas de la build actual?',
      confirmBack: '¿Volver atrás? Perderás la build actual.',
    },
    slot: {
      empty: 'Vacío',
    },
    roulette: {
      spinning: 'Girando el destino...',
      landed: 'El destino ha hablado',
      emptyResult: 'Espacio vacío',
    },
    settings: {
      title: 'Configuración',
      sound: 'Sonidos',
      music: 'Música',
      animations: 'Animaciones',
      emptySlot: 'Espacio vacío en la ruleta',
      wildcard: 'Comodín en la ruleta',
      language: 'Idioma',
      close: 'Cerrar',
    },
    wildcard: {
      name: 'Comodín',
      description: 'Puedes usar la perk que quieras en esta casilla.',
    },
    perkManagement: {
      title: 'Perks disponibles',
      searchPlaceholder: 'Buscar perk...',
      selectAll: 'Seleccionar todas',
      selectNone: 'Ninguna',
      minWarning: 'Debes dejar al menos 4 perks habilitadas.',
      enabledCount: 'habilitadas',
      specialGroupTitle: 'Especiales',
    },
    buildHistory: {
      title: 'Historial de builds',
      empty: 'Todavía no guardaste ninguna build.',
      survivorLabel: 'Survivor',
      killerLabel: 'Killer',
      restore: 'Usar esta build',
      copy: 'Copiar',
      copied: '¡Copiado!',
      delete: 'Eliminar',
      clearAll: 'Borrar historial',
      confirmClear: '¿Borrar todo el historial de builds de este rol?',
      confirmRestore: '¿Reemplazar la build actual con esta? Perderás el progreso actual.',
    },
    killerModeSelect: {
      eyebrow: 'Elige tu ruleta',
      title: 'Killer',
      characterTitle: 'Killer',
      characterTagline: '¿Con qué killer te tocará jugar?',
      perksTitle: 'Perks',
      perksTagline: 'Arma tu build de perks al azar.',
      choose: 'Elegir →',
      backLabel: 'Rol',
      backAria: 'Volver a elegir rol',
    },
    killerRoulette: {
      title: 'Ruleta de Killer',
      spin: 'Girar Killer',
      spinAgain: 'Volver a Girar',
      prompt: '¿Qué killer te tocará jugar?',
      managementAria: 'Killers disponibles',
      backLabel: 'Modo',
      backAria: 'Volver a elegir modo',
      goToPerksAria: 'Ver perks de este killer',
      goToKillerAria: 'Ver qué killer te tocó',
    },
    killerManagement: {
      title: 'Killers disponibles',
      searchPlaceholder: 'Buscar killer...',
      selectAll: 'Seleccionar todos',
      selectNone: 'Ninguno',
      minWarning: 'Debes dejar al menos 1 killer habilitado.',
      enabledCount: 'habilitados',
    },
    footer: {
      disclaimer:
        'DBD Challenge Roulette es un proyecto de fans sin fines de lucro, no afiliado a Behaviour Interactive Inc. Dead by Daylight® es una marca registrada de Behaviour Interactive Inc. Todo el contenido corre en tu navegador; no se guarda nada en ningún servidor.',
      adSlot: 'Espacio publicitario',
      creditsLink: 'Créditos y privacidad',
    },
    credits: {
      title: 'Créditos y Privacidad',
      createdByTitle: 'Creado por',
      createdByText: 'M. Sánchez',
      imagesTitle: 'Créditos de imágenes',
      imagesText:
        'Los íconos de perks, logos y demás material gráfico relacionado con Dead by Daylight que se usan en este sitio son propiedad de Behaviour Interactive Inc. Se usan aquí como contenido de fans, sin fines de lucro, al amparo de su política de contenido de fans. Todos los derechos sobre esas imágenes pertenecen a sus respectivos dueños.',
      privacyTitle: 'Privacidad',
      privacyText:
        'Esta página no tiene servidor ni base de datos: todo (tu build, tus perks habilitadas, tus ajustes) se guarda únicamente en el almacenamiento local de tu navegador (localStorage) y nunca sale de tu equipo. No usamos cookies de rastreo ni recolectamos datos personales. Si en el futuro se muestran anuncios, estos podrían usar sus propias cookies de terceros — se avisará aquí mismo cuando eso ocurra.',
    },
  },
  en: {
    roleSelect: {
      eyebrow: 'Choose your fate in the fog',
      title: 'DBD Challenge Roulette',
      survivorTitle: 'Survivor',
      survivorTagline: 'Repair. Heal. Escape.',
      killerTitle: 'Killer',
      killerTagline: 'Track. Strike. Sacrifice.',
      choose: 'Choose →',
    },
    mainScreen: {
      yourBuild: 'Your Build',
      newBuild: 'New Build',
      copyBuild: 'Copy Build',
      copied: 'Copied!',
      reroll: 'Reroll',
      rerollCancel: 'Cancel',
      rerollHint: 'Tap the perk you want to reroll',
      backLabel: 'Role',
      backAria: 'Back to role selection',
      settingsAria: 'Settings',
      historyAria: 'Build history',
      confirmNewBuild: 'Reset all 4 slots of the current build?',
      confirmBack: "Go back? You'll lose the current build.",
    },
    slot: {
      empty: 'Empty',
    },
    roulette: {
      spinning: 'Spinning fate...',
      landed: 'Fate has spoken',
      emptyResult: 'Empty slot',
    },
    settings: {
      title: 'Settings',
      sound: 'Sound',
      music: 'Music',
      animations: 'Animations',
      emptySlot: 'Empty slot in roulette',
      wildcard: 'Wildcard in roulette',
      language: 'Language',
      close: 'Close',
    },
    wildcard: {
      name: 'Wildcard',
      description: 'You can use any perk you want in this slot.',
    },
    perkManagement: {
      title: 'Available perks',
      searchPlaceholder: 'Search perk...',
      selectAll: 'Select all',
      selectNone: 'None',
      minWarning: 'You must leave at least 4 perks enabled.',
      enabledCount: 'enabled',
      specialGroupTitle: 'Special',
    },
    buildHistory: {
      title: 'Build history',
      empty: "You haven't saved any builds yet.",
      survivorLabel: 'Survivor',
      killerLabel: 'Killer',
      restore: 'Use this build',
      copy: 'Copy',
      copied: 'Copied!',
      delete: 'Delete',
      clearAll: 'Clear history',
      confirmClear: 'Clear the whole build history for this role?',
      confirmRestore: "Replace the current build with this one? You'll lose the current progress.",
    },
    killerModeSelect: {
      eyebrow: 'Choose your roulette',
      title: 'Killer',
      characterTitle: 'Killer',
      characterTagline: 'Which killer will you play?',
      perksTitle: 'Perks',
      perksTagline: 'Build a random perk loadout.',
      choose: 'Choose →',
      backLabel: 'Role',
      backAria: 'Back to role selection',
    },
    killerRoulette: {
      title: 'Killer Roulette',
      spin: 'Spin Killer',
      spinAgain: 'Spin Again',
      prompt: 'Which killer will you play?',
      managementAria: 'Available killers',
      backLabel: 'Mode',
      backAria: 'Back to mode selection',
      goToPerksAria: "See this killer's perks",
      goToKillerAria: 'See which killer you got',
    },
    killerManagement: {
      title: 'Available killers',
      searchPlaceholder: 'Search killer...',
      selectAll: 'Select all',
      selectNone: 'None',
      minWarning: 'You must leave at least 1 killer enabled.',
      enabledCount: 'enabled',
    },
    footer: {
      disclaimer:
        'DBD Challenge Roulette is a non-commercial fan project, not affiliated with Behaviour Interactive Inc. Dead by Daylight® is a registered trademark of Behaviour Interactive Inc. Everything runs in your browser; nothing is stored on any server.',
      adSlot: 'Ad space',
      creditsLink: 'Credits & privacy',
    },
    credits: {
      title: 'Credits & Privacy',
      createdByTitle: 'Created by',
      createdByText: 'M. Sánchez',
      imagesTitle: 'Image credits',
      imagesText:
        'Perk icons, logos, and other Dead by Daylight-related artwork used on this site are property of Behaviour Interactive Inc. They are used here as non-commercial fan content under their fan content policy. All rights to that artwork belong to their respective owners.',
      privacyTitle: 'Privacy',
      privacyText:
        "This site has no server or database: everything (your build, enabled perks, settings) is saved only in your browser's local storage (localStorage) and never leaves your device. We don't use tracking cookies or collect personal data. If ads are shown here in the future, they may use their own third-party cookies — this notice will be updated when that happens.",
    },
  },
};
