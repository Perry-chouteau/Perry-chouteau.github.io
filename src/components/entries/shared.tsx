// lucide v1 a retire les icones de marque (Github, Linkedin...).
import { GitBranch, Globe, BookOpen, Package, Lock, Radio, Code2, Archive, Hammer, PlayCircle } from 'lucide-react';
import type { Link, ProjectStatus } from '../../content/types';
import { labelOf } from '../../content/skills';
import { skillIcons } from '../../content/skill-icons';
import { conceptIcons, fallbackIcon } from '../../content/concept-icons';
import { type Lang, t } from '../../i18n/config';
import { ui } from '../../i18n/ui';

/**
 * Chaque tag porte une icone : logo de marque colore (Simple Icons) si connu,
 * sinon glyphe de concept gris (lucide), sinon un glyphe generique. Meme rendu
 * que les puces de la section Competences.
 */
const TagIcon = ({ slug }: { slug: string }) => {
  const brand = skillIcons[slug];
  if (brand)
    return (
      <svg viewBox="0 0 24 24" className="size-3.5 shrink-0" fill={`#${brand.hex}`} aria-hidden="true">
        <path d={brand.path} />
      </svg>
    );
  const Concept = conceptIcons[slug] ?? fallbackIcon;
  return <Concept className="size-3.5 shrink-0 text-ink-faint" />;
};

/**
 * LA puce de tag, unique et generique : logo + libelle. Utilisee partout
 * (competences, experience, formation, projets) — une seule implementation.
 *
 * Fond `surface-hi` (le plus clair des fonds) : c'est ce qui fait ressortir un
 * logo sombre comme Express (#000) en theme sombre, sans toucher a la couleur
 * du logo lui-meme.
 */
export const Tag = ({ slug, lang }: { slug: string; lang: Lang }) => (
  <li className="inline-flex items-center gap-1.5 rounded-md border border-line-soft bg-chip px-2 py-0.5 font-mono text-[0.6875rem] text-ink-dim">
    <TagIcon slug={slug} />
    {labelOf(slug, lang)}
  </li>
);

/** Une liste de tags. Le composant unique reutilise par Stack ET la section Competences. */
export const TagList = ({ slugs, lang }: { slugs: string[]; lang: Lang }) =>
  !slugs.length ? null : (
    <ul className="flex flex-wrap gap-1.5">
      {slugs.map((slug) => (
        <Tag key={slug} slug={slug} lang={lang} />
      ))}
    </ul>
  );

export const Stack = ({ stack, lang }: { stack?: string[]; lang: Lang }) =>
  !stack?.length ? null : <TagList slugs={stack} lang={lang} />;

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
