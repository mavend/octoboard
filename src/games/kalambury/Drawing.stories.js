import React from "react";
import { number } from "@storybook/addon-knobs";
import lines from "games/kalambury/data/stories/lines";

import Drawing from "./Drawing";

export default {
  component: Drawing,
  title: "Kalambury/DrawArea/Drawing",
  excludeStories: /.*Data$/,
};

export const Default = () => (
  <Drawing
    lines={lines}
    remainingSeconds={number("remainingSeconds", 40)}
    totalTime={number("totalTime", 120)}
  />
);

export const Drawable = () => (
  <Drawing
    lines={lines}
    drawable={true}
    remainingSeconds={number("remainingSeconds", 40)}
    totalTime={number("totalTime", 120)}
  />
);
