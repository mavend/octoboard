import React from "react";
import { text, number, boolean, select } from "@storybook/addon-knobs";

import Tile from ".";
import { action } from "@storybook/addon-actions";

export default {
  component: Tile,
  title: "Scrambled/Tile",
  excludeStories: /.*Data$/,
};

export const Default = () => (
  <Tile
    letter={text("Letter", "L")}
    replacement={text("Replacement", "")}
    points={number("Points", 5)}
    raised={boolean("Raised?", false)}
    highlighted={boolean("Highlighted?", false)}
    disabled={boolean("Disabled?", false)}
    onClick={action("onClick")}
    preview={boolean("Preview", false)}
    bonus={select("Bonus", {
      Nothing: null,
      "Letter x3": { type: "letter", multiply: 3 },
      "Letter x2": { type: "letter", multiply: 2 },
      "Word x3": { type: "word", multiply: 3 },
      "Word x2": { type: "word", multiply: 2 },
    })}
  />
);
