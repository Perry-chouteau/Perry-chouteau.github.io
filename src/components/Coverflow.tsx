import { useCallback, useEffect, useReducer, useRef } from 'react';
import type { ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Props = {
  children: ReactNode;
  /** Nombre de cartes DISTINCTES (les children sont dupliques `copies` fois). */
  size: number;
  copies?: number;
  /** Decale le depart pour que les carrousels ne tournent pas ensemble. */
  offset?: number;
  interval?: number;
};

/* Ecart lateral entre deux cartes, en % de la largeur d'une carte. */
const SPREAD = 52;
/* Cartes visibles de chaque cote du centre. 1 => trois cartes a l'ecran. */
const VISIBLE = 1;

/**
 * Carrousel infini, sans teleportation visible.
 *
 * Le probleme d'un carrousel "en anneau" a N cartes : la carte du bord doit
 * un jour repasser de l'autre cote, et ce trajet se voit — soit elle traverse
 * l'ecran, soit elle disparait pour reapparaitre ailleurs.
 *
 * Ici les cartes sont DUPLIQUEES (3 exemplaires). Chaque exemplaire reste dans
 * sa zone : aucun element ne traverse jamais. Quand l'index sort de la plage
 * centrale, on le ramene de `size` en coupant les transitions le temps d'une
 * frame — et comme l'exemplaire voisin est identique et occupe exactement la
 * meme place, le rendu est pixel pour pixel le meme. Le recalage est donc
 * strictement invisible.
 *
 * Les cartes hors champ ne sont pas eparpillees : elles sont empilees DERRIERE
 * la carte de bord (meme position, z-index inferieur). Elles emergent de
 * dessous au lieu d'arriver de nulle part — pas de trou, pas de traversee.
 */
export default function Coverflow({
  children,
  size,
  copies = 3,
  offset = 0,
  interval = 3800,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  /* L'index vit dans un ref : la mise en page est imperative (les cartes
     viennent d'Astro, on ne peut pas les re-rendre en JSX). */
  const active = useRef(size); /* 2e exemplaire : de la marge des deux cotes */
  /*
   * Au survol / au focus, on ne s'arrete PAS : on ralentit. Un carrousel fige
   * donne l'impression d'etre casse, et le visiteur qui pose sa souris dessus
   * veut juste avoir le temps de lire — pas reprendre les commandes.
   */
  const slow = useRef(false);
  /* Compte les deplacements : sert a annuler un recalage devenu obsolete. */
  const gen = useRef(0);
  const [, redraw] = useReducer((x: number) => x + 1, 0);

  const layout = useCallback((instant = false) => {
    const el = ref.current;
    if (!el) return;
    const items = [...el.querySelectorAll<HTMLElement>('[data-rail-item]')];
    if (!items.length) return;

    items.forEach((item, i) => {
      const rel = i - active.current;
      const dist = Math.abs(rel);
      const hidden = dist > VISIBLE;

      /*
       * Les cartes hors champ prennent la place de la carte de bord et passent
       * derriere elle : "cachees sous". Aucune ne se balade au loin, donc
       * aucune ne traverse quand l'ordre change.
       */
      const slot = Math.max(-VISIBLE, Math.min(VISIBLE, rel));
      const scale = dist === 0 ? 1 : Math.max(0.68, 1 - Math.min(dist, VISIBLE + 1) * 0.16);

      if (instant) item.style.transition = 'none';
      item.style.transform = `translateX(calc(-50% + ${slot * SPREAD}%)) scale(${scale})`;
      item.style.opacity = hidden ? '0' : dist === 0 ? '1' : '0.55';
      item.style.zIndex = String(100 - dist);
      item.style.pointerEvents = hidden ? 'none' : 'auto';
      item.style.filter = dist === 0 ? 'none' : 'saturate(0.7)';
    });

    if (instant) {
      /* Force l'application avant de rendre les transitions. */
      void el.offsetWidth;
      items.forEach((item) => (item.style.transition = ''));
    }
  }, []);

  const step = useCallback(
    (dir: 1 | -1) => {
      /*
       * Garde-fou : en cliquant plus vite que le recalage differe, l'index
       * finirait par sortir des exemplaires existants et il n'y aurait plus
       * rien a afficher. On recale alors immediatement — au milieu d'une
       * rafale, personne ne voit la coupure.
       */
      const marge = VISIBLE + 1;
      if (active.current < marge || active.current > size * copies - 1 - marge) {
        active.current = size + ((((active.current - size) % size) + size) % size);
        layout(true);
      }

      active.current += dir;
      const mine = ++gen.current;
      layout();
      redraw();

      /*
       * Recalage invisible : on reste toujours autour du 2e exemplaire.
       * L'index change de `size`, donc jamais la carte affichee (les deux
       * valeurs sont congruentes modulo size, et l'exemplaire voisin est le
       * meme element) — le rendu est identique au pixel pres.
       *
       * Fait APRES l'animation, et abandonne si un autre deplacement est
       * arrive entre-temps : couper les transitions au milieu d'un mouvement
       * se verrait immediatement.
       */
      const hors = active.current >= size * (copies - 1) || active.current < size;
      if (hors) {
        window.setTimeout(() => {
          if (gen.current !== mine) return;
          active.current = size + ((((active.current - size) % size) + size) % size);
          layout(true);
        }, 520);
      }
    },
    [layout, size, copies],
  );

  useEffect(() => layout(true), [layout]);

  useEffect(() => {
    if (size < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    /*
     * setTimeout qui se replanifie, et pas setInterval : le delai doit pouvoir
     * changer entre deux tours (double au survol).
     */
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      step(1);
      timer = setTimeout(tick, slow.current ? interval * 2 : interval);
    };
    timer = setTimeout(tick, offset + interval);

    return () => clearTimeout(timer);
  }, [size, interval, offset, step]);

  /* --- Gestes ----------------------------------------------------------- */

  /* Depart du glisser. null = pas de glisser en cours. */
  const drag = useRef<{ x: number; y: number } | null>(null);
  /* Un glisser vient de finir : le clic qui suit ne doit pas suivre le lien. */
  const dragged = useRef(false);
  /* Dernier pas declenche a la molette, pour ne pas defiler a la vitesse du trackpad. */
  const lastWheel = useRef(0);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    drag.current = { x: e.clientX, y: e.clientY };
    dragged.current = false;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const from = drag.current;
    if (!from) return;
    const dx = e.clientX - from.x;
    /*
     * Un geste plutot vertical, c'est un scroll de page : on lache. Sinon on
     * volerait le defilement au doigt sur mobile.
     */
    if (Math.abs(e.clientY - from.y) > Math.abs(dx)) {
      drag.current = null;
      return;
    }
    if (Math.abs(dx) < 45) return;
    step(dx < 0 ? 1 : -1);
    drag.current = null;
    dragged.current = true;
  };

  const onPointerUp = () => {
    drag.current = null;
  };

  const onClickCapture = (e: React.MouseEvent) => {
    /* Le glisser a servi a naviguer dans le carrousel, pas a ouvrir la carte. */
    if (dragged.current) {
      e.preventDefault();
      e.stopPropagation();
      dragged.current = false;
    }
  };

  const onWheel = (e: React.WheelEvent) => {
    /*
     * Seulement l'axe horizontal (trackpad, molette inclinable). Toucher au
     * vertical detournerait le scroll de la page — le pire defaut possible
     * pour un visiteur qui veut juste descendre.
     */
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY) || Math.abs(e.deltaX) < 12) return;
    const now = Date.now();
    if (now - lastWheel.current < 320) return;
    lastWheel.current = now;
    step(e.deltaX > 0 ? 1 : -1);
  };

  const current = ((active.current % size) + size) % size;

  return (
    <div
      onPointerEnter={() => (slow.current = true)}
      onPointerLeave={() => (slow.current = false)}
      onFocusCapture={() => (slow.current = true)}
      onBlurCapture={() => (slow.current = false)}
    >
      {/* Hauteur fixe : les cartes sont absolues, le conteneur ne peut pas se
          dimensionner sur elles. */}
      <div
        ref={ref}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onWheel={onWheel}
        onClickCapture={onClickCapture}
        /* pan-y : le glisser horizontal nous revient, le scroll vertical de la
           page reste au navigateur. */
        className="relative h-[21rem] touch-pan-y overflow-hidden [&>astro-slot]:contents sm:h-[24rem]"
      >
        {children}
      </div>

      {size > 1 && (
        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Précédent"
            className="grid size-8 place-items-center rounded-full border border-line text-ink-faint transition-colors hover:border-[var(--accent-line)] hover:text-ink"
          >
            <ChevronLeft className="size-4" />
          </button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: size }).map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? 'w-5 bg-[var(--accent)]' : 'w-1.5 bg-line'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Suivant"
            className="grid size-8 place-items-center rounded-full border border-line text-ink-faint transition-colors hover:border-[var(--accent-line)] hover:text-ink"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
}
