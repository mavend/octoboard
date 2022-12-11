import React from "react";

import { BoardGameContextMock } from "../GameContextMock";
import Board from ".";

export const Default = () => (
  <BoardGameContextMock>
    <Board />
  </BoardGameContextMock>
);
export const DuringApproval = () => (
  <BoardGameContextMock
    overrideG={{
      pendingTiles: [{ id: 10, letter: "Z", points: 5, x: 2, y: 1 }],
      players: {
        0: {
          tilesCount: 0,
        },
        1: { tilesCount: 7 },
      },
    }}
    overrideCtx={{
      activePlayers: ["approve", "wait_for_approval"],
    }}
  >
    <Board />
  </BoardGameContextMock>
);

export default {
  component: Board,
  title: "Scrambled/Board",
  excludeStories: /.*Data$/,
  subcomponents: [BoardGameContextMock],
};
