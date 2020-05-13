import { Kalambury } from "./kalambury/Game";
import KalamburyBoard from "./kalambury/Board";

import { PictureMatch } from "./picture-match/Game";
import PictureMatchBoard from "./picture-match/Board";

import { Splendid } from "./splendid/Game";
import SplendidBoard from "./splendid/Board";

export const KalamburyComponent = { game: Kalambury, Board: KalamburyBoard };
export const PictureMatchComponent = { game: PictureMatch, Board: PictureMatchBoard };
export const SplendidComponent = { game: Splendid, Board: SplendidBoard };

export const gameComponents = [KalamburyComponent, PictureMatchComponent, SplendidComponent];
