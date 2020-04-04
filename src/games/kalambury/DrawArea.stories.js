import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, number } from "@storybook/addon-knobs";
import lines from "games/kalambury/data/stories/lines";

import DrawArea from "./DrawArea";

export default {
  component: DrawArea,
  title: "Kalambury/DrawArea",
  excludeStories: /.*Data$/,
};

export const actionsData = {
  onUpdate: action("onUpdate"),
  onForfeit: action("onForfeit"),
};

export const Default = () => (
  <DrawArea
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
