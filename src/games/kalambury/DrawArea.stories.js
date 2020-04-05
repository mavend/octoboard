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

export const Default = () => <DrawArea lines={lines} setLines={action("setLines")} />;
