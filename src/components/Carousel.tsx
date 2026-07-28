import { useEffect, useState } from 'react';
import { cn } from '../lib/cn';

type Props = {
  /** URLs deja optimisees par Astro (getImage) au build. */
  images: string[];
  alt: string;
  /** Decale le depart pour que toutes les cartes ne basculent pas ensemble. */
  offset?: number;
};

const INTERVAL = 3500;

/**
 * Apercu qui defile tout seul, DANS une carte cliquable.
 *
 * Aucun bouton, aucun controle : la carte entiere est un <a>, y mettre des
 * boutons volerait le clic et imbriquerait de l'interactif dans un lien
 * (invalide, et infernal au clavier). Les pastilles sont aria-hidden, elles
 * ne servent qu'a montrer combien d'images defilent.
 */
export default function Carousel({ images, alt, offset = 0 }: Props) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    /* Respecte le reglage systeme : personne ne veut d'un mur qui clignote. */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let interval: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      interval = setInterval(() => setI((v) => (v + 1) % images.length), INTERVAL);
    }, offset);

    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [images.length, offset]);

  return (
    <div className="relative size-full overflow-hidden">
      {images.map((src, idx) => (
        <img
          key={src}
          src={src}
          /* Une seule image porte l'alt : les autres sont le meme sujet. */
          alt={idx === 0 ? alt : ''}
          loading={idx === 0 ? 'eager' : 'lazy'}
          className={cn(
            'absolute inset-0 size-full object-cover transition-opacity duration-700 ease-out',
            idx === i ? 'opacity-100' : 'opacity-0',
          )}
        />
      ))}

      {images.length > 1 && (
        <div aria-hidden="true" className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {images.map((src, idx) => (
            <span
              key={src}
              className={cn(
                'size-1.5 rounded-full transition-colors duration-300',
                idx === i ? 'bg-white' : 'bg-white/40',
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
