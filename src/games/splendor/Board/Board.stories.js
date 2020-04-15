import React from "react";
import { select, number } from "@storybook/addon-knobs";

import Board from "./";

export default {
  component: Board,
  title: "Splendor/Board",
  excludeStories: /.*Data$/,
};

export const Default = () => <Board />;
