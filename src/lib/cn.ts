import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { type Lang, t } from '../i18n/config';
import { ui } from '../i18n/ui';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

const LOCALE: Record<Lang, string> = { fr: 'fr-FR', en: 'en-GB' };

/** "2024-06" -> "juin 2024" / "June 2024". Les dates du contenu sont en YYYY-MM. */
export const formatDate = (value: string, lang: Lang) => {
  const [year, month] = value.split('-');
  if (!month) return year;
  const d = new Date(Number(year), Number(month) - 1);
  return d.toLocaleDateString(LOCALE[lang], { month: 'long', year: 'numeric' });
};

/**
 * Pas de date de fin = toujours en cours. Afficher juste "janvier 2022"
 * laisse croire que ca s'est arrete la : il faut un "— Aujourd'hui" explicite.
 */
export const formatRange = (date: { start: string; end?: string }, lang: Lang) => {
  /* Debut == fin : un projet court (une semaine), pas une plage. Un seul point. */
  if (date.end === date.start) return formatDate(date.start, lang);
  const end = date.end ? formatDate(date.end, lang) : t(ui.present, lang);
  return `${formatDate(date.start, lang)} — ${end}`;
};
