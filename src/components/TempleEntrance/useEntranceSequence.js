import { useEffect, useState } from 'react';
import { TIMING } from './timing.js';

// idle → approaching → opening → transitioning → complete → dismissed
// Forward-only. Each phase advances on a timer, so the sequence cannot stall
// on a missed transitionend event.
const NEXT = {
  approaching: 'opening',
  opening: 'transitioning',
  transitioning: 'complete',
  complete: 'dismissed',
};

export function useEntranceSequence(onComplete) {
  const [phase, setPhase] = useState('idle');

  useEffect(() => {
    const next = NEXT[phase];
    if (!next) return;
    const id = setTimeout(() => {
      setPhase(next);
      if (next === 'complete') onComplete?.();
    }, TIMING[phase]);
    return () => clearTimeout(id);
  }, [phase]);

  const start = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Reduced motion skips the camera move and door swing: straight to the dissolve.
    setPhase((current) =>
      current === 'idle' ? (reduced ? 'transitioning' : 'approaching') : current,
    );
  };

  return { phase, start };
}
