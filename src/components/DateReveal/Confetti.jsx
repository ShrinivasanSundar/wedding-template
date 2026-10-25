const COLOURS = ['#f6dc96', '#d9a441', '#fff8e7', '#f48fb1', '#ff9933', '#e8455f'];

// Two poppers, one in each bottom corner, firing up and inward. Values are
// derived from the index so the burst is the same on every render.
const PIECES = Array.from({ length: 70 }, (_, i) => {
  const fromLeft = i % 2 === 0;
  const angle = ((25 + ((i * 53) % 55)) * Math.PI) / 180;
  const distance = 35 + ((i * 29) % 50);
  return {
    '--origin': fromLeft ? '0%' : '100%',
    '--dx': `${(fromLeft ? 1 : -1) * Math.cos(angle) * distance}vmin`,
    '--dy': `${-Math.sin(angle) * distance}vmin`,
    '--spin': `${((i * 97) % 720) - 360}deg`,
    '--colour': COLOURS[i % COLOURS.length],
    '--duration': `${1.9 + (i % 5) * 0.2}s`,
    '--delay': `${(i % 7) * 30}ms`,
    '--radius': i % 3 === 0 ? '50%' : '1px',
  };
});

// Plays once when mounted; the pieces end fully transparent.
export default function Confetti() {
  return (
    <div className="confetti" aria-hidden="true">
      {PIECES.map((style, i) => (
        <span key={i} style={style} />
      ))}
    </div>
  );
}
