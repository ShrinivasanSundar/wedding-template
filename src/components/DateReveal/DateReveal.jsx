import { useEffect, useState } from 'react';
import ScratchCard from './ScratchCard.jsx';
import Confetti from './Confetti.jsx';
import { useInView } from '../../hooks/useInView.js';
import './DateReveal.scss';

// The muhurtham: 6:00 AM Indian Standard Time on 15 November 2026. Dates are
// always shown in IST, so visitors abroad see the same day; the countdown
// runs to this exact moment wherever they are.
const MUHURTHAM = new Date('2026-11-15T06:00:00+05:30');
const IST = 'Asia/Kolkata';
const DAY_MS = 24 * 60 * 60 * 1000;

const pad = (n) => String(n).padStart(2, '0');

const [day, month, year] = MUHURTHAM.toLocaleDateString('en-GB', { timeZone: IST }).split('/');

const CARDS = [
  { label: 'Date', value: day },
  { label: 'Month', value: month },
  { label: 'Year', value: year },
];

const FULL_DATE = MUHURTHAM.toLocaleDateString('en-GB', {
  timeZone: IST,
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

function Countdown() {
  const [now, setNow] = useState(Date.now);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const remaining = MUHURTHAM - now;

  if (remaining <= -DAY_MS) {
    return <p className="date-reveal__today">Our happily ever after has begun</p>;
  }
  if (remaining <= 0) {
    return <p className="date-reveal__today">Today is the day!</p>;
  }

  const units = [
    ['Days', Math.floor(remaining / DAY_MS)],
    ['Hours', pad(Math.floor(remaining / 3600000) % 24)],
    ['Minutes', pad(Math.floor(remaining / 60000) % 60)],
    ['Seconds', pad(Math.floor(remaining / 1000) % 60)],
  ];

  return (
    <>
      <div className="date-reveal__countdown" role="timer">
        {units.map(([unit, amount]) => (
          <div key={unit}>
            <strong>{amount}</strong>
            <span>{unit}</span>
          </div>
        ))}
      </div>
      <p className="date-reveal__until">until two hearts become one</p>
    </>
  );
}

export default function DateReveal() {
  const [revealed, setRevealed] = useState(() => CARDS.map(() => false));
  const allRevealed = revealed.every(Boolean);
  const [sectionRef, visible] = useInView();

  const reveal = (index) => setRevealed((current) => current.map((r, i) => r || i === index));

  return (
    <section ref={sectionRef} className="date-reveal reveal" data-visible={visible}>
      <p className="date-reveal__eyebrow">Save the Date</p>
      <h2 className="date-reveal__heading">A Day Written in the Stars</h2>
      <p className="date-reveal__intro">
        A new chapter, woven with two hearts and the blessings of family.
      </p>

      <div className="date-reveal__cards">
        {CARDS.map((card, i) => (
          <ScratchCard key={card.label} {...card} revealed={revealed[i]} onReveal={() => reveal(i)} />
        ))}
      </div>

      {allRevealed ? (
        <div className="date-reveal__result">
          <Confetti />
          <p className="date-reveal__full-date">{FULL_DATE}</p>
          <p className="date-reveal__time">Muhurtham 6:00–7:30 AM IST</p>
          <Countdown />
          <blockquote className="date-reveal__quote">
            A wedding is not just a day — it is the first page of a story two families write
            together. Come, be a part of our first chapter.
          </blockquote>
        </div>
      ) : (
        <p className="date-reveal__hint">&#10022; Scratch all three to reveal the date &#10022;</p>
      )}
    </section>
  );
}
