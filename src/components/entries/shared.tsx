// lucide v1 a retire les icones de marque (Github, Linkedin...).
import { GitBranch, Globe, BookOpen, Package, Lock, Radio, Code2, Archive, Hammer, PlayCircle } from 'lucide-react';
import type { Link, ProjectStatus } from '../../content/types';
import { labelOf } from '../../content/skills';
import { type Lang, t } from '../../i18n/config';
import { ui } from '../../i18n/ui';

export const Stack = ({ stack, lang }: { stack?: string[]; lang: Lang }) =>
  !stack?.length ? null : (
    <ul className="flex flex-wrap gap-1.5">
      {stack.map((slug) => (
        <li
          key={slug}
          className="rounded-md border border-line-soft bg-bg px-2 py-0.5 font-mono text-[0.6875rem] text-ink-dim"
        >
          {labelOf(slug, lang)}
        </li>
      ))}
    </ul>
  );

const linkIcon = {
  repo: GitBranch,
  live: Globe,
  doc: BookOpen,
  package: Package,
  demo: PlayCircle,
} as const;

export const Links = ({ links }: { links?: Link[] }) =>
  !links?.length ? null : (
    <ul className="flex flex-wrap gap-2">
      {links.map((link) => {
        const Icon = linkIcon[link.type];
        return (
          <li key={link.url}>
            <a
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1 text-[0.8125rem] text-ink-dim transition-colors hover:border-[var(--accent-line)] hover:text-ink"
            >
              <Icon className="size-3.5" />
              {link.label}
            </a>
          </li>
        );
      })}
    </ul>
  );

/**
 * L'etat est affiche tel quel, y compris "archive" et "prive". Un projet
 * mort assume se lit mieux qu'un projet mort maquille, et le maquillage
 * se voit toujours.
 */
const statusMap = {
  live: { Icon: Radio, label: ui.statusLive, className: 'border-[var(--accent-line)] text-[var(--accent)]' },
  wip: { Icon: Hammer, label: ui.statusWip, className: 'border-line text-ink-dim' },
  source: { Icon: Code2, label: ui.statusSource, className: 'border-line text-ink-dim' },
  private: { Icon: Lock, label: ui.statusPrivate, className: 'border-line text-ink-faint' },
  archived: { Icon: Archive, label: ui.statusArchived, className: 'border-line text-ink-faint' },
} as const;

export const StatusBadge = ({ status, lang }: { status: ProjectStatus; lang: Lang }) => {
  const { Icon, label, className } = statusMap[status];
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2 py-0.5 text-[0.6875rem] font-medium ${className}`}
    >
      <Icon className="size-3" />
      {t(label, lang)}
    </span>
  );
};

export const Bullets = ({
  bullets,
  lang,
}: {
  bullets?: { fr: string; en: string }[];
  lang: Lang;
}) =>
  !bullets?.length ? null : (
    <ul className="space-y-1.5">
      {bullets.map((b) => (
        <li
          key={b.fr}
          className="relative pl-4 text-[0.9375rem] leading-relaxed text-ink-dim before:absolute before:left-0 before:top-[0.6em] before:size-1 before:rounded-full before:bg-[var(--accent-line)]"
        >
          {t(b, lang)}
        </li>
      ))}
    </ul>
  );
