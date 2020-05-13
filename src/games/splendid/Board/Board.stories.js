import React from "react";

import { splendidDecorator } from "../GameContextMock";
import Board from "./";

export default {
  component: Board,
  title: "Splendid/Board",
  excludeStories: /.*Data$/,
  decorators: [splendidDecorator],
};

export const Default = () => <Board />;
