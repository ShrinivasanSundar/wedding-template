import { useState } from 'react';
import templeUrl from '../../assets/temple-scene.webp';
import Arrow from '../Arrow.jsx';
import { useInView } from '../../hooks/useInView.js';
import './SiteFooter.scss';

// Pausing sets data-motion="off" on <html>, which index.scss and
// useParallax.js both check.
function useMotionToggle() {
  const [paused, setPaused] = useState(false);

  const toggle = () => {
    const next = !paused;
    document.documentElement.dataset.motion = next ? 'off' : 'on';
    window.dispatchEvent(new Event('motionchange'));
    setPaused(next);
  };

  return [paused, toggle];
}

export default function SiteFooter() {
  const [closingRef, visible] = useInView();
  const [paused, toggleMotion] = useMotionToggle();

  return (
    <footer className="site-footer">
      <section className="site-footer__closing" aria-labelledby="closing-title">
        <div
          className="site-footer__art"
          style={{ '--footer-image': `url(${templeUrl})` }}
          data-parallax="0.25"
          aria-hidden="true"
        />
        <div ref={closingRef} className="site-footer__content reveal" data-visible={visible} data-parallax="0.08">
          <svg className="site-footer__lotus" viewBox="0 0 100 75" fill="none" aria-hidden="true">
            <path d="M50 58C25 50 16 36 17 23c16 0 27 11 33 29C56 34 67 23 83 23c1 13-8 27-33 35Z" />
            <path d="M50 58C30 40 36 19 50 8c14 11 20 32 0 50Z" />
            <path d="M50 58C28 60 10 50 7 37c14-3 31 6 43 21 12-15 29-24 43-21-3 13-21 23-43 21Z" />
            <path d="M30 65h40M39 71h22" />
          </svg>
          <p className="site-footer__quote">
            A wedding is not just a day — it is the first page of a story two families write
            together.
          </p>
          <h2 id="closing-title">
            Come, be a part of
            <br />
            our <em>first chapter.</em>
          </h2>
          <p className="site-footer__signature">
            Ajithkumar <i>&amp;</i> Deepa
          </p>
          <p className="eyebrow">15 November 2026 · Reddiarchatram</p>
        </div>
      </section>

      <div className="site-footer__bar">
        <a className="site-footer__home" href="#invitation">
          With love &amp; blessings
          <Arrow />
        </a>
        <button
          type="button"
          className="site-footer__motion"
          aria-pressed={paused}
          onClick={toggleMotion}
        >
          <span className="site-footer__dot" data-paused={paused} aria-hidden="true" />
          {paused ? 'Play motion' : 'Pause motion'}
        </button>
        <a className="site-footer__top" href="#invitation">
          Back to top
          <Arrow />
        </a>
      </div>
    </footer>
  );
}
