import emblemUrl from '../../assets/logo-emblem.webp';
import botanicalsUrl from '../../assets/botanicals.webp';
import './Hero.scss';

export default function Hero() {
  const scrollToNext = (event) =>
    event.currentTarget.closest('section').nextElementSibling?.scrollIntoView();

  return (
    <section id="invitation" className="hero">
      {/* The leaves lag furthest behind the page, the text a little less. */}
      <div
        className="hero__art"
        style={{ '--hero-image': `url(${botanicalsUrl})` }}
        data-parallax="0.4"
        data-parallax-from="top"
        aria-hidden="true"
      />

      <div className="hero__content" data-parallax="0.18" data-parallax-from="top">
        <p className="section-marker hero__marker">
          <span>01</span>
          <span>The invitation</span>
        </p>

        <img
          className="hero__emblem"
          src={emblemUrl}
          width="640"
          height="649"
          alt="Lord Venkateswara and Goddess Lakshmi"
        />

        <h1 className="hero__title" lang="ta">
          திருமணம் அழைப்பிதழ்
        </h1>

        <blockquote className="hero__kural" lang="ta">
          <p>
            அன்பும் அறனும் உடைத்தாயின் இல்வாழ்க்கை
            <br />
            பண்பும் பயனும் அது.
          </p>
          <cite>(திருக்குறள் - 45)</cite>
        </blockquote>

        <p className="hero__invite">
          With the blessings of the Almighty and our beloved families, we joyfully invite you to
          grace the wedding of
        </p>

        <div className="hero__couple">
          <div>
            <h2 className="hero__name">Ajithkumar</h2>
            <p className="hero__parents">
              S/o <strong>Mr. Palanichamy</strong>
              <br />
              &amp; <strong>Mrs. Chellamani</strong>
            </p>
          </div>
          <span className="hero__divider" aria-hidden="true" />
          <div>
            <h2 className="hero__name">Deepa</h2>
            <p className="hero__parents">
              D/o <strong>Mr. Elumalai</strong>
              <br />
              &amp; <strong>Mrs. Kuppayammal</strong>
            </p>
          </div>
        </div>

        <button type="button" className="hero__scroll" onClick={scrollToNext}>
          Scroll to reveal
        </button>
      </div>
    </section>
  );
}
