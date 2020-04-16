import React from "react";

import Board from "./";

export default {
  component: Board,
  title: "Splendor/Board",
  excludeStories: /.*Data$/,
};

export const Default = () => <Board />;
