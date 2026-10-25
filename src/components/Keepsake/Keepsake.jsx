import cardUrl from '../../assets/invitation-card.webp';
import Arrow from '../Arrow.jsx';
import { useInView } from '../../hooks/useInView.js';
import './Keepsake.scss';

// Full-size original, served from public/ so it downloads under this name.
const DOWNLOAD_URL = '/shrinivasan-sri-dharshini-invitation.jpg';

export default function Keepsake() {
  const [sectionRef, visible] = useInView();

  return (
    <section
      id="keepsake"
      ref={sectionRef}
      className="keepsake reveal"
      data-visible={visible}
      aria-labelledby="keepsake-title"
    >
      <p className="section-marker">
        <span>04</span>
        <span>A keepsake</span>
      </p>

      <div className="keepsake__layout reveal" data-visible={visible}>
        <a className="keepsake__card" href={DOWNLOAD_URL} download data-parallax="0.06">
          <img
            src={cardUrl}
            width="720"
            height="1019"
            loading="lazy"
            alt="The wedding invitation card: Shrinivasan and Sri Dharshini, illustrated in a border of painted flowers"
          />
        </a>

        <div className="keepsake__details">
          <p className="eyebrow">Carry our invitation with you</p>
          <h2 id="keepsake-title">
            Save it, share it,
            <br />
            <em>keep it close.</em>
          </h2>
          <p className="keepsake__intro">
            Download the invitation card to share with family and friends.
          </p>

          <a className="arrow-link keepsake__download" href={DOWNLOAD_URL} download>
            Download the invitation
            <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}
