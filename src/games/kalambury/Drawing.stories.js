import React from "react";
import lines from "games/kalambury/data/stories/lines";

import Drawing from "./Drawing";

export default {
  component: Drawing,
  title: "Kalambury/DrawArea/Drawing",
  excludeStories: /.*Data$/,
};

export const Default = () => <Drawing lines={lines} />;

export const Drawable = () => <Drawing lines={lines} drawable={true} />;
