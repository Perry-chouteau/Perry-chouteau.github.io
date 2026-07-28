import { useEffect, useState } from 'react';
import { type Lang, t } from '../i18n/config';
import type { I18nText } from '../i18n/config';
import { cn } from '../lib/cn';

export type NavSection = { id: string; label: I18nText };

type Props = { sections: NavSection[]; lang: Lang };

/** Ligne de lecture : une section devient active quand elle passe ce seuil. */
const READING_LINE = 0.3;

/**
 * Sommaire lateral avec indicateur de position.
 *
 * Island parce qu'il faut savoir OU on est : la seule information que le build
 * ne peut pas connaitre.
 *
 * Ecrit avec un listener de scroll et PAS un IntersectionObserver : l'IO
 * repondait "quelles sections touchent une bande", ce qui n'est pas la
 * question. Une section a cheval sur 7 pixels gagnait contre celle qui
 * remplissait l'ecran, et la derniere section n'etait JAMAIS active quand la
 * page etait trop courte pour l'amener au milieu du viewport. Ici la regle
 * est explicite : la derniere section franchie, et le bas de page force la
 * derniere tout court.
 */
export default function SectionNav({ sections, lang }: Props) {
  const [active, setActive] = useState<string>(sections[0]?.id ?? '');

  useEffect(() => {
    if (!sections.length) return;

    const compute = () => {
      const doc = document.documentElement;
      const scrollY = window.scrollY;

      /*
       * Bas de page : la derniere section gagne. Sans cette regle elle reste
       * inatteignable des que la page ne peut plus scroller assez loin pour
       * l'amener sous la ligne de lecture.
       *
       * Le seuil est un RATIO du viewport, pas 2px : a 2px la fenetre
       * d'activation faisait litteralement 3 pixels (mesure), donc la
       * derniere section ne s'allumait jamais en pratique.
       */
      const distanceToBottom = doc.scrollHeight - (scrollY + window.innerHeight);
      if (distanceToBottom <= window.innerHeight * 0.15) {
        return sections[sections.length - 1].id;
      }

      const line = scrollY + window.innerHeight * READING_LINE;
      let current = sections[0].id;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top + scrollY <= line) current = s.id;
      }
      return current;
    };

    /* rAF : le navigateur scrolle bien plus souvent qu'il ne repeint. */
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setActive(compute());
      });
    };

    setActive(compute());
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [sections]);

  /*
   * Deux formes, une seule source de verite :
   * - lg+ : colonne laterale, trait d'accent qui s'allonge.
   * - sous lg : barre horizontale defilante sous le header. Un sommaire qui
   *   n'existe qu'en grand ecran n'est pas un sommaire.
   */
  return (
    <nav aria-label="Sections" className="lg:space-y-1">
      <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-px lg:mx-0 lg:block lg:overflow-visible lg:px-0">
        {sections.map((s) => {
          const isActive = s.id === active;
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              aria-current={isActive ? 'true' : undefined}
              className={cn(
                'group shrink-0 rounded-full border px-3 py-1.5 text-sm whitespace-nowrap transition-colors',
                // en colonne : plus de pastille, on revient au trait
                'lg:flex lg:items-center lg:gap-2.5 lg:rounded-md lg:border-0 lg:px-0 lg:py-1.5',
                isActive
                  ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)] lg:bg-transparent lg:text-ink'
                  : 'border-line text-ink-faint hover:text-ink-dim',
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  'hidden h-px shrink-0 transition-all duration-200 lg:block',
                  isActive ? 'w-6 bg-[var(--accent)]' : 'w-3 bg-line group-hover:w-4',
                )}
              />
              {t(s.label, lang)}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
