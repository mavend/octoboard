import React from "react";

import Tile from ".";
import { action } from "@storybook/addon-actions";

export default {
  component: Tile,
  title: "Scrambled/Tile",
  excludeStories: /.*Data$/,
};

export const Default = (args) => <Tile onClick={action("onClick")} {...args} />;

Default.args = {
  points: 5,
  letter: "L",
  replacement: "",
  raised: false,
  highlighted: false,
  disabled: false,
  preview: false,
};
