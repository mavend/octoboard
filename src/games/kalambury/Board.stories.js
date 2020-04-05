import React from "react";
import { action } from "@storybook/addon-actions";
import { boolean, number, text, select } from "@storybook/addon-knobs";

import Board from "./Board";

export default {
  component: Board,
  title: "Kalambury/Board",
  excludeStories: /.*Data$/,
};

export const Default = () => <Board />;
