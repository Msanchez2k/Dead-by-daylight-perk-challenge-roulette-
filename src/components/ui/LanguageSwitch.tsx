import { useTranslation } from '@/context/LanguageContext';

export function LanguageSwitch() {
  const { language, setLanguage } = useTranslation();

  return (
    <div className="inline-flex overflow-hidden border border-steel-600 font-display text-xs uppercase tracking-[0.15em]">
      <button
        type="button"
        onClick={() => setLanguage('es')}
        aria-pressed={language === 'es'}
        className={`px-3 py-1.5 transition-colors duration-300 ${
          language === 'es' ? 'bg-blood-600 text-bone-100' : 'bg-fog-950/60 text-steel-400 hover:text-bone-300'
        }`}
      >
        ES
      </button>
      <button
        type="button"
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
        className={`px-3 py-1.5 transition-colors duration-300 ${
          language === 'en' ? 'bg-blood-600 text-bone-100' : 'bg-fog-950/60 text-steel-400 hover:text-bone-300'
        }`}
      >
        EN
      </button>
    </div>
  );
}
