import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, number } from "@storybook/addon-knobs";
import lines from "games/kalambury/data/stories/lines";

import Drawing from "./Drawing";

export default {
  component: Drawing,
  title: "Kalambury/DrawArea/Drawing",
  excludeStories: /.*Data$/,
};

export const actionsData = {
  onMouseDown: action("onMouseDown"),
};

export const Default = () => (
  <Drawing
    lines={lines}
    remainingSeconds={number("Remaining seconds", 100, {
      range: true,
      min: 0,
      max: 120,
      step: 1,
    })}
    {...actionsData}
  />
);
