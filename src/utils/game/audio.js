import useSound from "use-sound";

import popSfx from "../../assets/audio/pop.mp3";
import blinkSfx from "../../assets/audio/blink.mp3";

import whiteboardSounds from "../../assets/audio/kalambury/whiteboard.mp3";

export function useDefaultAudio() {
  const [playPop] = useSound(popSfx, { volume: 0.8 });
  const [playBlink] = useSound(blinkSfx);

  return { playPop, playBlink };
}

export function useWhiteboardAudio() {
  const [whiteboard] = useSound(whiteboardSounds, {
    sprite: {
      tap0: [24, 92],
      tap1: [155, 120],
      tap2: [313, 108],
      draw0: [469, 88],
      draw1: [600, 85],
      draw2: [730, 92],
      draw3: [861, 80],
      draw4: [992, 82],
      draw5: [1122, 96],
      draw6: [1253, 107],
      draw7: [1410, 87],
      squeak0: [1540, 179],
      squeak1: [1750, 117],
      squeak2: [1907, 137],
    },
  });

  return { whiteboard };
}
