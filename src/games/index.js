import { Kalambury } from "./kalambury/Game";
import KalamburyBoard from "./kalambury/Board";

import { PictureMatch } from "./picture-match/Game";
import PictureMatchBoard from "./picture-match/Board";

import { Splendor } from "./splendor/Game";
import SplendorBoard from "./splendor/Board";

export const KalamburyComponent = { game: Kalambury, Board: KalamburyBoard };
export const PictureMatchComponent = { game: PictureMatch, Board: PictureMatchBoard };
export const SplendorComponent = { game: Splendor, Board: SplendorBoard };

export const gameComponents = [KalamburyComponent, PictureMatchComponent, PictureMatchComponent];
