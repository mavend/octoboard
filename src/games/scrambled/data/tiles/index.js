import { flattenDeep, fill } from "lodash";
import en from "./en";
import pl from "./pl";

const languages = { pl, en };

export const availableLaguages = Object.values(languages).map(({ key, name, letters, shorts }) => ({
  key,
  name,
  letters,
  shorts,
}));

export function getTiles(language = "en") {
  const tiles = languages[language].tiles;
  return flattenDeep(
    Object.keys(tiles).map((points) => {
      return tiles[points].map(([letter, count]) => {
        return fill(Array(count), letter).map((letter) => ({
          letter: letter,
          points: Number(points),
        }));
      });
    })
  ).map((val, idx) => {
    return { id: idx, ...val };
  });
}
