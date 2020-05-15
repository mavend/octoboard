import React from "react";
import { text, number, boolean } from "@storybook/addon-knobs";

import Tile from ".";

export default {
  component: Tile,
  title: "Scrambled/Tile",
  excludeStories: /.*Data$/,
};

export const Default = () => (
  <Tile
    letter={text("Letter", "L")}
    points={number("Points", 5)}
    raised={boolean("Raised?", false)}
  />
);
