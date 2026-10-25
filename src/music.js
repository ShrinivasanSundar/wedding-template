// The background song, shared by the temple entrance (which starts it) and
// the floating music button (which turns it on and off).
//
// Phones only let a page play sound in response to a tap, so the entrance's
// tap starts the song muted (prime), and once the doors have opened it
// restarts from the beginning with sound (start).
let audio;

const song = () => {
  audio ??= Object.assign(new Audio('/Mangalyam-Tantunanena.mp3'), { loop: true });
  return audio;
};

export function primeMusic() {
  const el = song();
  el.muted = true;
  el.play().catch(() => {});
}

export function startMusic() {
  const el = song();
  el.currentTime = 0;
  el.muted = false;
  el.play().catch(() => {});
}

export function toggleMusic() {
  const el = song();
  el.muted = false;
  if (el.paused) el.play().catch(() => {});
  else el.pause();
}

// For useSyncExternalStore: re-render when the song plays or pauses.
export function subscribeMusic(onChange) {
  const el = song();
  el.addEventListener('play', onChange);
  el.addEventListener('pause', onChange);
  return () => {
    el.removeEventListener('play', onChange);
    el.removeEventListener('pause', onChange);
  };
}

export const isMusicPlaying = () => !song().paused;
