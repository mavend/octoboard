import { Kalambury } from "./kalambury/Kalambury";
import KalamburyBoard from "./kalambury/Board";

import { Splendor } from "./splendor/Game";
import SplendorBoard from "./splendor/Board";

export const KalamburyComponent = { game: Kalambury, Board: KalamburyBoard };
export const SplendorComponent = { game: Splendor, Board: SplendorBoard };

export const gameComponents = [KalamburyComponent, SplendorComponent];
