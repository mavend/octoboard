import React from "react";
import { action } from "@storybook/addon-actions";

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
  onPhraseChange: action("onPhraseChange"),
  onForfeit: action("onForfeit"),
};

export const Default = (args) => <Toolbar currentColor={"#1b1c1d"} {...actionsData} {...args} />;

Default.args = {
  canUndo: true,
  canChangePhrase: true,
};
