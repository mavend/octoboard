import smallDeck from "./6";
import regularDeck from "./8";

export function getCardsDeck(picturesCount) {
  return picturesCount === 6 ? smallDeck : regularDeck;
}
