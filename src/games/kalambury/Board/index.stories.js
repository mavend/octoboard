import React from "react";

import { kalamburyDecorator } from "../GameContextMock";
import Board from "./";

export default {
  component: Board,
  title: "Kalambury/Board",
  excludeStories: /.*Data$/,
  decorators: [kalamburyDecorator],
};

export const Default = () => <Board />;
