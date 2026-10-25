import { useEffect } from 'react';

// Moves every element marked data-parallax="<speed>" as the page scrolls,
// relative to its parent: 0 scrolls with the page, 0.5 lags behind at half
// speed, negative values run ahead. Offsets are 0 when the parent is centred
// in the viewport, or with data-parallax-from="top" (for the first section,
// which starts at the top), when the page is scrolled to the top. Uses the
// CSS translate property so it adds to any transform an element already
// animates.
//
// Off when the visitor prefers reduced motion or pauses motion in the footer
// (which sets data-motion="off" on <html>).
export function useParallax(active) {
  useEffect(() => {
    if (!active) return;
    const elements = [...document.querySelectorAll('[data-parallax]')];
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;

    const update = () => {
      frame = 0;
      const paused = reduced.matches || document.documentElement.dataset.motion === 'off';
      const middle = window.innerHeight / 2;
      for (const el of elements) {
        if (paused) {
          el.style.translate = '';
          continue;
        }
        const box = el.parentElement.getBoundingClientRect();
        // Skip parents far off screen; their elements are out of sight.
        if (box.bottom < -middle || box.top > window.innerHeight + middle) continue;
        const distance =
          el.dataset.parallaxFrom === 'top' ? -box.top : middle - (box.top + box.height / 2);
        const offset = distance * Number(el.dataset.parallax);
        el.style.translate = `0 ${offset.toFixed(1)}px`;
      }
    };
    const schedule = () => {
      frame ||= requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('motionchange', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('motionchange', schedule);
      cancelAnimationFrame(frame);
    };
  }, [active]);
}
