import React from "react";

import { scrambledDecorator } from "../GameContextMock";
import Board from ".";

export default {
  component: Board,
  title: "Scrambled/Board",
  excludeStories: /.*Data$/,
  decorators: [scrambledDecorator],
};

export const Default = () => <Board />;
