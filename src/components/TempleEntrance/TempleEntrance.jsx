import { useState } from 'react';
import sceneUrl from '../../assets/temple-scene.webp';
import glowUrl from '../../assets/07_interior_glow.webp';
import { TIMING } from './timing.js';
import { useEntranceSequence } from './useEntranceSequence.js';
import './TempleEntrance.scss';

const STYLE_VARS = {
  '--t-approach': `${TIMING.approaching}ms`,
  '--t-open': `${TIMING.opening}ms`,
  '--t-through': `${TIMING.transitioning}ms`,
  '--t-exit': `${TIMING.complete}ms`,
  '--scene-image': `url(${sceneUrl})`,
  '--glow-image': `url(${glowUrl})`,
};

// Deterministic spread so particles do not jump between renders.
const particles = (count) =>
  Array.from({ length: count }, (_, i) => (
    <span
      key={i}
      style={{
        '--x': `${(i * 37 + 11) % 100}%`,
        '--size': `${2 + (i % 3)}px`,
        '--duration': `${9 + (i % 5) * 2.3}s`,
        '--delay': `${-i * 1.7}s`,
      }}
    />
  ));

export default function TempleEntrance({ onStart, onComplete }) {
  const { phase, start } = useEntranceSequence(onComplete);
  // The entrance stays hidden until the artwork has loaded. If it fails to
  // load, the entrance still appears so the visitor can enter.
  const [ready, setReady] = useState(false);

  if (phase === 'dismissed') return null;

  return (
    <div className="entrance" data-phase={phase} data-ready={ready} style={STYLE_VARS}>
      <div className="entrance__sky" />

      <div className="entrance__camera">
        <div className="entrance__scene">
          <img
            className="entrance__art"
            src={sceneUrl}
            alt=""
            onLoad={() => setReady(true)}
            onError={() => setReady(true)}
          />
          <p className="entrance__names">
            <span>Ajith</span>
            <span className="entrance__heart">{'♥︎'}</span>
            <span>Deepa</span>
          </p>
          <div className="entrance__spill" />
          <div className="entrance__doorway">
            <div className="entrance__light" />
            <div className="entrance__rays" />
            <div className="entrance__motes">{particles(6)}</div>
            <div className="entrance__door entrance__door--left" />
            <div className="entrance__door entrance__door--right" />
          </div>
        </div>
      </div>

      <div className="entrance__particles">{particles(12)}</div>
      <div className="entrance__veil" />

      <button
        type="button"
        className="entrance__trigger"
        aria-label="Enter the wedding invitation"
        disabled={phase !== 'idle' || !ready}
        onClick={() => {
          onStart?.();
          start();
        }}
      >
        <span className="entrance__ornament" />
        <span className="entrance__hint">
          <span className="entrance__hint-touch">Tap to Enter</span>
          <span className="entrance__hint-pointer">Click to Enter</span>
        </span>
      </button>
    </div>
  );
}
