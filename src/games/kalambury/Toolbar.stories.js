import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, select, boolean } from "@storybook/addon-knobs";

import Toolbar from "./Toolbar";

export default {
  component: Toolbar,
  title: "Kalambury/DrawArea/Toolbar",
  excludeStories: /.*Data$/,
};

export const actionsData = {
  onColorChange: action("onColorChange"),
  onSizeChange: action("onSizeChange"),
  onClearAll: action("onClearAll"),
  onUndoDrawing: action("onUndoDrawing"),
  onForfeit: action("onForfeit"),
};

export const Default = () => (
  <Toolbar
    currentColor={select(
      "Color",
      [
        "#1b1c1d",
        "#db2828",
        "#ff8c21",
        "#ffd52b",
        "#21ba45",
        "#2185d0",
        "#a333c8",
        "#eb87bf",
        "#f4d0b5",
        "#a5673f",
        "#FFFFFF",
      ],
      "#1b1c1d"
    )}
    canUndo={boolean("Can Undo", true)}
    {...actionsData}
  />
);
