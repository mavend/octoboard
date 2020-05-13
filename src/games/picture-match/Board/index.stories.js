import React from "react";

import { pictureMatchDecorator } from "../GameContextMock";
import Board from "./";

export default {
  component: Board,
  title: "PictureMatch/Board",
  excludeStories: /.*Data$/,
  decorators: [pictureMatchDecorator],
};

export const Default = () => <Board />;
