import { MapPin, GraduationCap, ArrowUpRight } from 'lucide-react';
import type { Education, Experience } from '../../content/types';
import { type Lang, t } from '../../i18n/config';
import { formatRange } from '../../lib/cn';
import { Bullets, Stack } from './shared';

/**
 * Timeline : un filet vertical relie les entrees, une pastille marque
 * chacune. C'est ce qui donne le rythme et evite la liste plate.
 */
const Item = ({ mark, children }: { mark: React.ReactNode; children: React.ReactNode }) => (
  <article className="relative flex gap-4 pb-8 last:pb-0">
    <div
      aria-hidden="true"
      className="absolute bottom-0 left-5 top-12 w-px bg-line-soft last:hidden"
    />
    {mark}
    <div className="min-w-0 flex-1 space-y-3 pt-1">{children}</div>
  </article>
);

const Meta = ({ children }: { children: React.ReactNode }) => (
  <p className="flex flex-wrap items-center gap-x-2 gap-y-0.5 font-mono text-xs text-ink-faint">
    {children}
  </p>
);

export const ExperienceItem = ({ entry, lang }: { entry: Experience; lang: Lang }) => (
  <Item
    mark={
      <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-surface font-semibold text-ink-dim">
        {entry.company.charAt(0)}
      </span>
    }
  >
    <header className="space-y-1">
      <h3 className="text-lg font-semibold leading-tight text-ink">{t(entry.role, lang)}</h3>
      <p className="text-[0.9375rem] font-medium text-[var(--accent)]">
        {entry.companyUrl ? (
          <a
            href={entry.companyUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-0.5 hover:underline"
          >
            {entry.company}
            <ArrowUpRight className="size-3.5" />
          </a>
        ) : (
          entry.company
        )}
      </p>
      <Meta>
        <span>{formatRange(entry.date, lang)}</span>
        <span className="text-line">·</span>
        <span className="inline-flex items-center gap-1">
          <MapPin className="size-3" />
          {entry.location}
        </span>
      </Meta>
    </header>
    <Bullets bullets={entry.bullets} lang={lang} />
    <Stack stack={entry.stack} lang={lang} />
  </Item>
);

export const EducationItem = ({ entry, lang }: { entry: Education; lang: Lang }) => (
  <Item
    mark={
      <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-surface text-ink-faint">
        <GraduationCap className="size-4" />
      </span>
    }
  >
    <header className="space-y-1">
      <h3 className="text-lg font-semibold leading-tight text-ink">{t(entry.title, lang)}</h3>
      <p className="text-[0.9375rem] font-medium text-[var(--accent)]">{entry.school}</p>
      <Meta>
        <span>{formatRange(entry.date, lang)}</span>
        <span className="text-line">·</span>
        <span className="inline-flex items-center gap-1">
          <MapPin className="size-3" />
          {entry.location}
        </span>
        {entry.rncp && (
          <>
            <span className="text-line">·</span>
            <span>{entry.rncp}</span>
          </>
        )}
      </Meta>
    </header>
    <p className="text-[0.9375rem] leading-relaxed text-ink-dim">{t(entry.summary, lang)}</p>
    <Stack stack={entry.stack} lang={lang} />
  </Item>
);
