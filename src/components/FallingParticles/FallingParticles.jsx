import './FallingParticles.scss';

const KINDS = [
  { name: 'marigold', glyph: '❀' },
  { name: 'lavender', glyph: '✿' },
];

// Deterministic spread so particles do not jump between renders.
const PARTICLES = Array.from({ length: 10 }, (_, i) => ({
  ...KINDS[i % KINDS.length],
  style: {
    '--x': `${(i * 41 + 7) % 100}%`,
    '--scale': 0.7 + (i % 4) * 0.2,
    '--fall': `${12 + (i % 6) * 2.5}s`,
    '--sway': `${3 + (i % 4)}s`,
    '--delay': `${-i * 1.9}s`,
    '--drift': `${((i % 5) - 2) * 4}vw`,
  },
}));

// Decorative overlay: marigold and lavender petals drifting down over the invitation.
export default function FallingParticles() {
  return (
    <div className="falling" aria-hidden="true">
      {PARTICLES.map(({ name, glyph, style }, i) => (
        <span key={i} className="falling__item" style={style}>
          <i className={`falling__shape falling__shape--${name}`}>{glyph}</i>
        </span>
      ))}
    </div>
  );
}
