import botanicalsUrl from '../../assets/botanicals.webp';
import Arrow from '../Arrow.jsx';
import { useInView } from '../../hooks/useInView.js';
import './Venue.scss';

const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent(
    'Brahmana Kalyana Mandapam, Pillaiyar Kovil Street, Old Post Office Road, S.S. Colony, Madurai',
  );

export default function Venue() {
  const [sectionRef, visible] = useInView();

  return (
    <section
      id="venue"
      ref={sectionRef}
      className="venue reveal"
      data-visible={visible}
      aria-labelledby="venue-title"
    >
      <p className="section-marker">
        <span>03</span>
        <span>The gathering place</span>
      </p>

      <div className="venue__layout reveal" data-visible={visible}>
        <div className="venue__art" aria-hidden="true">
          <img data-parallax="0.08" src={botanicalsUrl} alt="" width="1920" height="1074" loading="lazy" />
          <div className="venue__frame" />
          <svg className="venue__lotus" viewBox="0 0 100 75" fill="none">
            <path d="M50 58C25 50 16 36 17 23c16 0 27 11 33 29C56 34 67 23 83 23c1 13-8 27-33 35Z" />
            <path d="M50 58C30 40 36 19 50 8c14 11 20 32 0 50Z" />
            <path d="M50 58C28 60 10 50 7 37c14-3 31 6 43 21 12-15 29-24 43-21-3 13-21 23-43 21Z" />
            <path d="M30 65h40M39 71h22" />
          </svg>
          <span className="venue__caption">With love, in Madurai</span>
        </div>

        <div className="venue__details" data-parallax="-0.05">
          <p className="eyebrow">We look forward to welcoming you</p>
          <h2 id="venue-title">Brahmana Kalyana Mandapam</h2>
          <p className="venue__tamil" lang="ta">
            பிராம்மண கல்யாண மண்டபம்
          </p>
          <address>
            <span>Pillaiyar Kovil Street</span>
            <span>Old Post Office Road, S.S. Colony</span>
            <span>Madurai, Tamil Nadu</span>
          </address>
          <a className="arrow-link" href={MAPS_URL} target="_blank" rel="noreferrer">
            Find the venue
            <Arrow />
          </a>
          <p className="venue__help">For directions &amp; assistance</p>
          <a className="venue__phone" href="tel:+919842397054">
            +91 98423 97054
            <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}
