// How long each phase lasts, in milliseconds. These drive both the state
// machine and the CSS transitions, so this is the only place to tune timing.
export const TIMING = {
  approaching: 1000, // camera moves to the doors
  opening: 1200, // doors swing open, light is revealed
  transitioning: 700, // golden dissolve through the doorway
  complete: 700, // entrance fades away over the invitation
};
