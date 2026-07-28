import { Sun, Moon, Languages } from 'lucide-react';
import { type Lang, t } from '../i18n/config';
import { ui } from '../i18n/ui';

type Props = { lang: Lang; altPath: string; altLang: Lang };

/**
 * La SEULE island du site. Tout le reste est du HTML rendu au build.
 * Le thème vit sur <html data-theme>, pose par le script inline du <head>
 * avant le premier paint : pas de useState ici, sinon mismatch d'hydratation
 * (le serveur ne peut pas savoir quel thème le visiteur a choisi).
 */
export default function Settings({ lang, altPath, altLang }: Props) {
  const toggleTheme = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === 'light' ? 'dark' : 'light';
    root.dataset.theme = next;
    localStorage.setItem('theme', next);
  };

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={t(ui.theme, lang)}
        className="grid size-9 place-items-center rounded-lg text-ink-faint transition-colors hover:bg-surface-hi hover:text-ink"
      >
        <Sun data-icon="to-light" className="size-[18px]" />
        <Moon data-icon="to-dark" className="size-[18px]" />
      </button>

      <a
        href={altPath}
        hrefLang={altLang}
        aria-label={t(ui.language, lang)}
        className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-semibold uppercase tracking-wider text-ink-faint transition-colors hover:bg-surface-hi hover:text-ink"
      >
        <Languages className="size-[18px]" />
        {altLang}
      </a>
    </div>
  );
}
