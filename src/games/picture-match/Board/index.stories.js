import React from "react";

import Board from "./";

export default {
  component: Board,
  title: "PictureMatch/Board",
  excludeStories: /.*Data$/,
};

export const Default = () => <Board />;
