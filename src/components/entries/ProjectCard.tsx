import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../../content/types';
import { contextOf } from '../../content';
import { type Lang, t } from '../../i18n/config';
import { ui } from '../../i18n/ui';
import { formatRange } from '../../lib/cn';
import { StatusBadge, Stack } from './shared';

/**
 * LA carte projet, unique : meme rendu pour les organisations et les projets
 * autonomes (avant, deux markups differents pour la meme donnee).
 */
export const ProjectCard = ({ p, lang }: { p: Project; lang: Lang }) => (
  <a
    href={`/${lang}/projects/${p.id}`}
    className="group flex flex-col gap-3 rounded-card border border-line-soft bg-surface p-5 transition-colors hover:border-[var(--accent-line)]"
  >
    <div className="flex items-start justify-between gap-3">
      <h3 className="text-lg font-semibold leading-tight text-ink transition-colors group-hover:text-[var(--accent)]">
        {t(p.title, lang)}
      </h3>
      <StatusBadge status={p.status} lang={lang} />
    </div>

    <p className="font-mono text-xs text-ink-faint">
      {formatRange(p.date, lang)} · {t(contextOf(p.context).label, lang)}
    </p>

    <p className="text-[0.9375rem] leading-relaxed text-ink-dim">{t(p.tagline, lang)}</p>

    <div className="mt-auto space-y-3 pt-1">
      <Stack stack={p.stack} lang={lang} />
      <span className="inline-flex items-center gap-1 text-[0.8125rem] font-medium text-[var(--accent)]">
        {t(ui.seeProject, lang)}
        <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </div>
  </a>
);
