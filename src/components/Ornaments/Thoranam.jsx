import './Ornaments.scss';

// A festive thoranam: a string of mango leaves and marigolds, repeated
// across the full width. Drawn as an SVG pattern so it scales to any screen.
export default function Thoranam() {
  return (
    <svg className="thoranam" aria-hidden="true" width="100%" height="64">
      <defs>
        <pattern id="thoranam-unit" width="56" height="64" patternUnits="userSpaceOnUse">
          {/* The cord the leaves and flowers hang from. */}
          <path d="M0 4 Q14 9 28 4 T56 4" fill="none" stroke="#c98a2e" strokeWidth="1.2" />

          {/* Mango leaf with its midrib. */}
          <path d="M14 5 C23 16 23 38 14 54 C5 38 5 16 14 5 Z" fill="#3f7d35" />
          <path d="M14 7 L14 50" stroke="#2c5c26" strokeWidth="0.8" />
          <path d="M14 5 C18 16 19 32 14 46" fill="none" stroke="#5c9a45" strokeWidth="0.8" />

          {/* Marigold with a bead below it. */}
          <circle cx="42" cy="15" r="8.5" fill="#f28c28" />
          <circle cx="42" cy="15" r="7" fill="none" stroke="#ffb347" strokeWidth="2.2" strokeDasharray="2 1.6" />
          <circle cx="42" cy="15" r="3.4" fill="#d9661a" />
          <line x1="42" y1="23.5" x2="42" y2="30" stroke="#c98a2e" strokeWidth="1" />
          <circle cx="42" cy="32" r="2.2" fill="#fff4dc" />
        </pattern>
      </defs>
      <rect width="100%" height="64" fill="url(#thoranam-unit)" />
    </svg>
  );
}
