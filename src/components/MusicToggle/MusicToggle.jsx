import { useSyncExternalStore } from 'react';
import { isMusicPlaying, subscribeMusic, toggleMusic } from '../../music.js';
import './MusicToggle.scss';

// Floating button in the corner that turns the song on and off.
export default function MusicToggle() {
  const playing = useSyncExternalStore(subscribeMusic, isMusicPlaying);

  return (
    <button
      type="button"
      className="music-toggle"
      data-playing={playing}
      aria-pressed={playing}
      onClick={toggleMusic}
    >
      <span className="music-toggle__bars" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>
      {playing ? 'Music on' : 'Music off'}
    </button>
  );
}
