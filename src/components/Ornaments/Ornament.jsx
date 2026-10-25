import './Ornaments.scss';

// Rows of kolam dots, ending in small lotus buds.
const DOTS = Array.from({ length: 9 }, (_, i) => 22 + i * 11);

// A lit diya between two rows of kolam dots, placed on the seam between
// two sections.
export default function Ornament() {
  return (
    <div className="ornament" aria-hidden="true">
      <svg viewBox="0 0 320 64">
        {[1, -1].map((side) => (
          <g key={side} transform={side === -1 ? 'translate(320 0) scale(-1 1)' : undefined}>
            {DOTS.map((x, i) => (
              <circle key={x} cx={x} cy="44" r={i % 2 ? 1.3 : 1.9} fill="#e6ac4c" />
            ))}
            <path d="M126 44 C122 38 122 34 126 30 C130 34 130 38 126 44 Z" fill="#e6ac4c" />
          </g>
        ))}

        <ellipse className="ornament__glow" cx="160" cy="30" rx="26" ry="20" fill="url(#ornament-glow)" />
        <path className="ornament__flame" d="M160 15 C166 23 166 30 160 34 C154 30 154 23 160 15 Z" fill="#ffc24a" />
        <path d="M160 22 C163 27 163 30 160 32 C157 30 157 27 160 22 Z" fill="#fff1c7" />
        <path d="M136 38 H184 C181 50 171 55 160 55 C149 55 139 50 136 38 Z" fill="#e6ac4c" />
        <path d="M150 55 H170 L166 60 H154 Z" fill="#c98a2e" />

        <defs>
          <radialGradient id="ornament-glow">
            <stop offset="0" stopColor="#ffb347" stopOpacity="0.55" />
            <stop offset="1" stopColor="#ffb347" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
