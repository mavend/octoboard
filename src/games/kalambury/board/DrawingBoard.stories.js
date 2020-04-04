import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, number } from "@storybook/addon-knobs";
import lines from "games/kalambury/data/stories/lines";

import DrawingBoard from "./DrawingBoard";

export default {
  component: DrawingBoard,
  title: "Kalambury/DrawingBoard",
  excludeStories: /.*Data$/,
};

export const Default = () => (
  <DrawingBoard
    lines={lines}
    G={{
      remainingSeconds: number("Remaining seconds", 100, {
        range: true,
        min: 0,
        max: 120,
        step: 1,
      }),
    }}
    moves={{ Forfeit: action("Forfeit") }}
    setLines={action("SetLines")}
  />
);
