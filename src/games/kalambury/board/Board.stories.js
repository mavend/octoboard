import React from "react";

import Board from "./Board";

export default {
  component: Board,
  title: "Kalambury/Board",
  excludeStories: /.*Data$/,
};

export const Default = () => <Board />;
