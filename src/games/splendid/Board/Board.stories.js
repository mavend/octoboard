import React from "react";

import Board from "./";

export default {
  component: Board,
  title: "Splendid/Board",
  excludeStories: /.*Data$/,
};

export const Default = () => <Board />;
