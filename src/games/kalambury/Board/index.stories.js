import React from "react";

import Board from "./";

export default {
  component: Board,
  title: "Kalambury/Board",
  excludeStories: /.*Data$/,
};

export const Default = () => <Board />;
