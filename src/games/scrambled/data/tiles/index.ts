import { flattenDeep, fill } from "lodash";
import en from "./en.json";
import pl from "./pl.json";

const languages = { pl, en };

export const availableLaguages = Object.values(languages).map(({ key, name, letters, shorts }) => ({
  key,
  name,
  letters,
  shorts,
}));

export interface Tile {
  id: number;
  letter: string;
  points: number;
}

export function getTiles(language = "en"): Tile[] {
  const tiles = languages[language].tiles;
  return flattenDeep(
    Object.keys(tiles).map((points) => {
      return tiles[points].map(([letter, count]) => {
        return fill(Array(count), letter).map((letter) => ({
          letter,
          points: Number(points),
        }));
      });
    })
  ).map((val, idx) => {
    return { id: idx, ...val };
  });
}
