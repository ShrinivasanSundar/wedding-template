import gopuramUrl from '../../assets/02_gopuram.webp';
import Arrow from '../Arrow.jsx';
import { useInView } from '../../hooks/useInView.js';
import './Venue.scss';

const MAPS_URL = 'https://maps.app.goo.gl/a5yXc46rh5TDFsps9';

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
          <img data-parallax="0.08" src={gopuramUrl} alt="" width="591" height="463" loading="lazy" />
          <div className="venue__frame" />
          <span className="venue__caption">With love, in Reddiarchatram</span>
        </div>

        <div className="venue__details" data-parallax="-0.05">
          <p className="eyebrow">We look forward to welcoming you</p>
          <h2 id="venue-title">VRAN Annamalai Chettiyar Marriage Mahal</h2>
          <address>
            <span>Reddiarchatram</span>
            <span>Tamil Nadu</span>
          </address>
          <a className="arrow-link" href={MAPS_URL} target="_blank" rel="noreferrer">
            Find the venue
            <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}
