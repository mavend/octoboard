import smallDeck from "./6.json";
import regularDeck from "./8.json";

export function getCardsDeck(picturesCount) {
  return picturesCount === 6 ? smallDeck : regularDeck;
}
